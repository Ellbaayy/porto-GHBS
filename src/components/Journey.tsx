import { journey } from "@/data/portfolio";
import { scenes } from "@/data/scenes";
import { Container } from "@/components/ui/Container";
import { Scene } from "@/components/Scene";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";

const sideA = journey.filter((j) => j.kind === "past");
const sideB = journey.filter((j) => j.kind !== "past");

export function Journey() {
  return (
    <section id="journey" className="scene-host region-paper3 relative isolate overflow-hidden py-20 md:py-28">
      <Scene scene={scenes.journey} />
      <Container>
        <SectionHeader title="My journey" meta="Two sides of the same tape" />

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6" gap={0.12}>
          <div data-stagger-item className="card-pop overflow-hidden">
            <div aria-hidden="true" className="grooves h-3 border-b-2 border-ink opacity-60" />
            <div className="p-6 md:p-8">
              <p className="font-display text-xl text-ink m-0 mb-6">Side A</p>
              <ol className="grid gap-7">
                {sideA.map((j) => (
                  <li key={`${j.year}-${j.heading}`}>
                    <span className="block font-display text-base text-muted tabular mb-1.5">
                      {j.year}
                    </span>
                    <strong className="text-lg text-ink">{j.heading}</strong>
                    {j.bullets && (
                      <ul className="mt-2 grid gap-1.5">
                        {j.bullets.map((b) => (
                          <li key={b} className="text-ink-2 text-base leading-relaxed">
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div data-stagger-item className="card-pop overflow-hidden">
            <div aria-hidden="true" className="grooves h-3 border-b-2 border-ink opacity-60" />
            <div className="p-6 md:p-8">
              <p className="font-display text-xl text-ink m-0 mb-6">Side B</p>
              <ol className="grid gap-7">
                {sideB.map((j) => (
                  <li key={`${j.year}-${j.heading}`}>
                    <span className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-display text-base text-accent tabular">
                        {j.year}
                      </span>
                      {j.kind === "active" ? <span className="chip">Now spinning</span> : null}
                    </span>
                    <strong className="text-lg text-ink">{j.heading}</strong>
                    {j.bullets && (
                      <ul className="mt-2 grid gap-1.5">
                        {j.bullets.map((b) => (
                          <li key={b} className="text-ink-2 text-base leading-relaxed">
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Stagger>

        <Reveal className="mt-12 md:mt-16 max-w-[52ch]">
          <p className="font-display text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.25] text-ink m-0 mb-5">
            Learn. Build. Experiment. Innovate.
          </p>
          <p className="text-ink-2 text-base leading-relaxed">
            I believe the best way to understand technology is not only by studying it, but by
            building with it. Every project is a chance to learn something new, test an idea,
            and turn a problem into a solution.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
