/**
 * WatermelonWreath — a playful ring of watermelon-slice stickers.
 *
 * Render absolutely over a square photo container (e.g. `-inset-[14%]`)
 * so the slices straddle the photo's edge like stickers stuck around it.
 * Purely decorative (aria-hidden); the photo itself carries the alt text.
 *
 * Each slice is drawn pointing outward: pale band + green rind arc on the
 * wide end, red flesh with seeds tapering inward. Alternate slices get a
 * slight tilt/size jitter for a hand-placed sticker feel. Deterministic
 * from the index (no Math.random) so SSR and client match.
 */
export function WatermelonWreath({
  count = 12,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const step = 360 / count;
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ filter: "drop-shadow(0 4px 10px rgb(0 0 0 / 0.4))" }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const angle = i * step;
        const tilt = i % 2 === 0 ? 8 : -8;
        const scale = i % 3 === 0 ? 0.88 : 1;
        return (
          <g key={i} transform={`rotate(${angle} 100 100)`}>
            <g transform={`translate(100 22) rotate(${tilt}) scale(${scale})`}>
              {/* flesh */}
              <path
                d="M -12 -8 Q 0 -16 12 -8 L 4 12 Q 0 14 -4 12 Z"
                fill="#e5484d"
              />
              {/* pale band */}
              <path
                d="M -12 -8 Q 0 -16 12 -8"
                fill="none"
                stroke="#eef3d8"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
              {/* green rind */}
              <path
                d="M -12 -8 Q 0 -16 12 -8"
                fill="none"
                stroke="#2f9e44"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* seeds */}
              <ellipse cx="-4" cy="-1" rx="1.3" ry="1.9" fill="#23262b" />
              <ellipse cx="4" cy="-1" rx="1.3" ry="1.9" fill="#23262b" />
              <ellipse cx="0" cy="6" rx="1.3" ry="1.9" fill="#23262b" />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
