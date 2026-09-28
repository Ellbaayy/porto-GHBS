/**
 * In-memory fixed-window rate limiter.
 *
 * Scope: this guards the /api/chat route against casual abuse (someone
 * pointing a script at the endpoint and burning the Groq quota). It is
 * intentionally dependency-free and process-local.
 *
 * Limitation: state lives in the process, so on a multi-instance or
 * serverless deployment each instance keeps its own counter. That is an
 * acceptable trade for a portfolio chatbot; swap the Map for Redis if a
 * hard global limit is ever needed.
 */

type Bucket = {
  count: number;
  /** Epoch ms at which the window expires and the counter resets. */
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

/** Drop expired buckets so the Map cannot grow without bound. */
function sweep(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  ok: boolean;
  /** Requests still available in the current window. */
  remaining: number;
  /** Epoch ms at which the window resets. */
  resetAt: number;
  /** Seconds until reset, for the Retry-After header. */
  retryAfter: number;
};

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();

  // Sweep opportunistically. Cheap because the Map only ever holds
  // keys touched within the last window.
  if (buckets.size > 5000) sweep(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return {
      ok: true,
      remaining: limit - 1,
      resetAt,
      retryAfter: Math.ceil(windowMs / 1000),
    };
  }

  existing.count += 1;

  if (existing.count > limit) {
    return {
      ok: false,
      remaining: 0,
      resetAt: existing.resetAt,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  return {
    ok: true,
    remaining: limit - existing.count,
    resetAt: existing.resetAt,
    retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

/** Best-effort client identity from proxy headers, for rate-limit keying only. */
export function clientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for is a comma-separated chain; the first entry is the client.
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}
