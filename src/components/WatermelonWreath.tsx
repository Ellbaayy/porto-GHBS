/**
 * WatermelonWreath — a typographic medallion ring plus watermelon stickers
 * around the hero photo.
 *
 * Render absolutely over a square photo container (e.g. `-inset-[24%]`).
 * Purely decorative (aria-hidden); the photo itself carries the alt text.
 *
 * Two readable arcs (top + bottom, never mirrored) in Righteous display
 * type, sentence case: "Viva la vida" in cream, "Watermelon" in rind
 * green + "Sugar" in flesh red. Genuine display presence plus a thin
 * same-color stroke (painted behind the fill) for extra punch; the double
 * drop-shadow keeps the lettering legible over the brightest photo frames.
 *
 * Eight watermelon slices circle the photo's edge just inside the letter
 * ring. Each faces a pseudo-random direction (deterministic from the
 * index, so SSR and client match) for a hand-stuck sticker feel. Slices
 * render beneath the lettering, so the ring stays readable where they meet.
 */
const SLICE_COUNT = 8;
const SLICE_ORBIT = 72;
/** Extra facing rotation per slice: outward, sideways, and inward mix. */
const SLICE_FACING = [20, 160, 285, 75, 200, 330, 120, 250];

export function WatermelonWreath({ className }: { className?: string }) {
  const step = 360 / SLICE_COUNT;
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{
        filter:
          "drop-shadow(0 2px 3px rgb(0 0 0 / 0.65)) drop-shadow(0 0 10px rgb(0 0 0 / 0.4))",
      }}
    >
      <defs>
        <path id="wm-ring-top" d="M 12 100 A 88 88 0 1 1 188 100" fill="none" />
        <path id="wm-ring-bottom" d="M 12 100 A 88 88 0 0 0 188 100" fill="none" />
      </defs>
      {Array.from({ length: SLICE_COUNT }).map((_, i) => (
        <g key={i} transform={`rotate(${i * step} 100 100)`}>
          <g
            transform={`translate(100 ${100 - SLICE_ORBIT}) rotate(${SLICE_FACING[i % SLICE_FACING.length]}) scale(0.62)`}
          >
            <path
              d="M -12 -8 Q 0 -16 12 -8 L 4 12 Q 0 14 -4 12 Z"
              fill="#c9263f"
            />
            <path
              d="M -12 -8 Q 0 -16 12 -8"
              fill="none"
              stroke="#f2e8ce"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            <path
              d="M -12 -8 Q 0 -16 12 -8"
              fill="none"
              stroke="#4a8b57"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <ellipse cx="-4" cy="-1" rx="1.3" ry="1.9" fill="#23262b" />
            <ellipse cx="4" cy="-1" rx="1.3" ry="1.9" fill="#23262b" />
            <ellipse cx="0" cy="6" rx="1.3" ry="1.9" fill="#23262b" />
          </g>
        </g>
      ))}
      <text
        className="font-display"
        fontSize="13"
        fontWeight={400}
        fontStyle="normal"
        letterSpacing="1.5"
        fill="#fff8ea"
        stroke="currentColor"
        strokeWidth={1.1}
        paintOrder="stroke"
        style={{ color: "#f8f4ea" }}
      >
        <textPath href="#wm-ring-top" startOffset="50%" textAnchor="middle">
          Viva la vida
        </textPath>
      </text>
      <text
        className="font-display"
        fontSize="13"
        fontWeight={400}
        fontStyle="normal"
        letterSpacing="1.5"
        stroke="currentColor"
        strokeWidth={1.1}
        paintOrder="stroke"
      >
        <textPath href="#wm-ring-bottom" startOffset="50%" textAnchor="middle">
          <tspan fill="#4a8b57" style={{ color: "#4a8b57" }}>
            Watermelon
          </tspan>
          <tspan fill="#c9263f" style={{ color: "#c9263f" }} dx="5">
            Sugar
          </tspan>
        </textPath>
      </text>
    </svg>
  );
}
