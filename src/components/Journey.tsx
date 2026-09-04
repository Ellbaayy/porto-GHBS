import { journey } from "@/data/portfolio";
import { scenes } from "@/data/scenes";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Scene } from "@/components/Scene";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";

export function Journey() {
  return (
    <section id="journey" className="scene-host region-paper3 relative isolate overflow-hidden py-20 md:py-28">
      <Scene scene={scenes.journey} />
      <Container>
        <SectionHeader title="My journey" meta="so far" />

        <Stagger gap={0.1}>
          <ol className="relative grid border-l border-rule pl-6">
          {journey.map((j) => {
            const isActive = j.kind === "active";
            const isFuture = j.kind === "future";
            return (
              <li key={`${j.year}-${j.heading}`} data-stagger-item className="relative py-[22px]">
                <span
                  aria-hidden="true"
                  className="absolute -left-[27px] top-[30px] w-2 h-2 rounded-full"
                  style={{
                    background: isActive ? "var(--accent)" : isFuture ? "var(--ink)" : "var(--muted)",
                  }}
                />
                <span
                  className={cn(
                    "inline-block font-mono text-[13px] tabular mb-2.5",
                    isActive ? "text-accent" : isFuture ? "text-ink" : "text-muted",
                  )}
                >
                  {j.year}
                  {isActive ? " · now" : ""}
                </span>
                <div>
                  <strong className="text-[17px] text-ink">{j.heading}</strong>
                  {j.bullets && (
                    <ul className="mt-2 grid gap-1.5">
                      {j.bullets.map((b) => (
                        <li key={b} className="text-ink-2 text-[15px] leading-relaxed">
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
        </Stagger>

        <Reveal className="mt-12 md:mt-16 max-w-[52ch]">
          <p className="font-display text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.25] text-ink m-0 mb-5">
            Learn. Build. Experiment. Innovate.
          </p>
          <p className="text-ink-2 text-[15px] leading-relaxed">
            I believe the best way to understand technology is not only by studying it, but by
            building with it. Every project is a chance to learn something new, test an idea,
            and             turn a problem into a solution.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
