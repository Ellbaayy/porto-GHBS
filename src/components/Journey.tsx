import { journey } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const dotColors = ["#ff6b4a", "#4a6fff", "#c44bff", "#c79e1a"]; // coral, cobalt, plum, lemon-deep
const bulletColors = ["var(--coral)", "var(--cobalt)", "var(--plum)", "var(--lemon-deep)"];
const yearColors = [
  { bg: "bg-coral-soft", text: "text-coral-deep" },
  { bg: "bg-cobalt-soft", text: "text-cobalt-deep" },
  { bg: "bg-plum-soft", text: "text-plum-deep" },
  { bg: "bg-lemon", text: "text-ink" },
];

export function Journey() {
  return (
    <section id="journey" className="py-16 md:py-28">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-14">
        <header className="section-head mb-12 md:mb-14">
          <span className="section-num section-num-lemon">05</span>
          <h2 className="section-title text-[clamp(28px,4vw,44px)]">My journey</h2>
        </header>

        <ol className="relative grid gap-2 pl-6 border-l-2 border-line">
          {journey.map((j, i) => {
            const isActive = j.kind === "active";
            const isFuture = j.kind === "future";
            const dotColor = isActive
              ? "var(--coral)"
              : isFuture
                ? "var(--ink)"
                : dotColors[i % dotColors.length];
            const bulletColor = bulletColors[i % bulletColors.length];

            return (
              <li
                key={i}
                className="relative py-[18px] pl-4 timeline-dot"
                style={
                  {
                    "--dot-color": dotColor,
                    "--dot-ring": isActive ? "var(--coral-soft)" : "transparent",
                    "--bullet-color": bulletColor,
                  } as React.CSSProperties
                }
              >
                <span
                  className={cn(
                    "inline-block font-mono text-[13px] px-2.5 py-1 rounded-md mb-2.5",
                    isFuture
                      ? "bg-ink text-white"
                      : isActive
                        ? "bg-coral text-white"
                        : `${yearColors[i % yearColors.length].bg} ${yearColors[i % yearColors.length].text}`,
                  )}
                >
                  {j.year}
                </span>
                <div className="text-ink">
                  <strong className="text-[17px] text-ink">{j.heading}</strong>
                  {j.bullets && (
                    <ul className="mt-1.5 grid gap-1">
                      {j.bullets.map((b) => (
                        <li
                          key={b}
                          className="relative pl-[18px] text-ink-soft text-[15px] before:content-[''] before:absolute before:left-0 before:top-[11px] before:w-2 before:h-[1.5px] before:bg-[var(--bullet-color)]"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {/* Philosophy */}
        <div className="mt-12 md:mt-20 p-8 md:p-14 bg-cobalt text-white text-center rounded-[28px] shadow-[0_30px_60px_-30px_rgba(74,111,255,0.5)]">
          <p className="font-serif italic text-[clamp(28px,3.5vw,44px)] leading-[1.2] text-white m-0 mb-[18px]">
            &ldquo;Learn. Build. Experiment. Innovate.&rdquo;
          </p>
          <p className="max-w-[60ch] mx-auto text-white/85 text-[15px]">
            I believe the best way to understand technology is not only by studying it, but by
            building with it. Every project is an opportunity to learn something new, experiment
            with an idea, and turn a problem into a solution.
          </p>
        </div>
      </div>
    </section>
  );
}