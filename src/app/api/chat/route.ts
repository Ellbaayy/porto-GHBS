import { NextRequest } from "next/server";
import { profile, interests, techStack, projects, achievements, learning, agentTopics, aboutInfo } from "@/data/portfolio";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

/** Requests allowed per client per window. */
const RATE_LIMIT = 8;
const RATE_WINDOW_MS = 60_000;

/** Max conversation turns accepted per request, and max characters per turn. */
const MAX_MESSAGES = 20;
const MAX_CHARS_PER_MESSAGE = 2000;

/**
 * Origins allowed to call this endpoint from a browser.
 *
 * Vercel's preview and production hostnames are derived at deploy time, so
 * they are matched by suffix rather than listed exhaustively. Requests with
 * no Origin header (curl, server-to-server) are allowed through — the rate
 * limiter is what protects against those.
 */
function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true;
  let host: string;
  try {
    host = new URL(origin).hostname;
  } catch {
    return false;
  }
  if (host === "localhost" || host === "127.0.0.1") return true;
  return host.endsWith(".vercel.app");
}

function jsonError(message: string, status: number, extra?: Record<string, string>) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json", ...extra },
  });
}


const systemPrompt = `You are "GHBS Assistant", an AI chatbot that represents ${profile.name}, a ${profile.summary}

Your job is to answer questions about Gesang, his skills, projects, learning journey, and contact info in a friendly, confident, and concise manner. Reply in the same language the user uses (Indonesian or English).

If a question is outside what you know about Gesang, politely say you don't have that info and suggest they reach out via email (${profile.email}) or Instagram (${profile.instagramHandle}).

KEY FACTS ABOUT GESANG:
- Name: ${profile.name}
- University: President University (Informatics student, AI concentration)
- Based in: Indonesia, open to remote work
- Interests: ${interests.join(", ")}
- Tech stack:
${techStack.map(c => `  • ${c.heading}: ${c.items.join(", ")}`).join("\n")}
- Currently learning: ${learning.map(l => `${l.area} (${l.focus})`).join("; ")}
- AI Agents topics he explores: ${agentTopics.join(", ")}
- Featured projects:
${projects.map(p => `  • ${p.title}: ${p.description} (Tech: ${p.stack.join(", ")})`).join("\n")}
- Achievements:
${achievements.map(a => `  • ${a.title} (${a.year}): ${a.desc}`).join("\n")}
- About: ${aboutInfo.map(a => `${a.label}: ${a.value}`).join("; ")}
- Contact: Email ${profile.email}, Instagram ${profile.instagramHandle}

PERSONALITY: Friendly, professional, slightly playful. Use emojis sparingly. Keep answers under 150 words unless asked for detail. Never invent facts not in this prompt.`;

export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req.headers.get("origin"))) {
    return jsonError("Forbidden origin", 403);
  }

  const limit = rateLimit(clientKey(req), RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.ok) {
    return jsonError("Too many requests. Please wait a moment.", 429, {
      "Retry-After": String(limit.retryAfter),
      "X-RateLimit-Limit": String(RATE_LIMIT),
      "X-RateLimit-Remaining": "0",
    });
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return jsonError(
      "GROQ_API_KEY is not configured. Add an API key in .env.local",
      500,
    );
  }

  let body: { messages?: { role: string; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return jsonError("No messages provided", 400);
  }
  if (messages.length > MAX_MESSAGES) {
    return jsonError("Conversation too long", 413);
  }
  if (
    messages.some(
      (m) =>
        typeof m?.content !== "string" ||
        m.content.length > MAX_CHARS_PER_MESSAGE,
    )
  ) {
    return jsonError("Message too long", 413);
  }

  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "qwen/qwen3.8-27b",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      stream: true,
      temperature: 0.7,
      max_tokens: 600,
    }),
  });

  if (!groqRes.ok) {
    // Log the upstream detail server-side; never echo it to the client, since
    // it can carry account and quota information.
    console.error("Groq API error", groqRes.status, await groqRes.text());
    return jsonError("The assistant is temporarily unavailable.", 502);
  }

  // Stream response back to client
  return new Response(groqRes.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-RateLimit-Limit": String(RATE_LIMIT),
      "X-RateLimit-Remaining": String(limit.remaining),
    },
  });
}
