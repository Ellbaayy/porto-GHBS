import { learning, agentTopics } from "@/data/portfolio";
import { scenes } from "@/data/scenes";
import { Container } from "@/components/ui/Container";
import { Scene } from "@/components/Scene";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

export function Learning() {
  return (
    <section id="learning" className="scene-host region-leaf relative isolate overflow-hidden py-20 md:py-28">
      <Scene scene={scenes.learning} />
      <Container>
        <SectionHeader title="Currently learning" meta="The tracks I have on repeat right now" />

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-start">
          <Reveal>
            <ol className="border-t-2 border-ink">
              {learning.map((l, i) => (
                <li
                  key={l.area}
                  className="grid grid-cols-[3rem_1fr] sm:grid-cols-[3rem_1fr_1.2fr] gap-4 items-baseline py-4 border-b border-rule"
                >
                  <span className="font-display text-sm text-accent tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium text-ink">{l.area}</span>
                  <span className="text-ink-2 text-base col-start-2 sm:col-start-3">{l.focus}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal as="aside" className="card-pop overflow-hidden" delay={0.1}>
            <div aria-hidden="true" className="grooves h-3 border-b-2 border-ink opacity-60" />
            <div className="p-6">
              <h3 className="font-display text-xl text-ink m-0 mb-4 text-safe">
                Exploring AI Agents
              </h3>
              <p className="text-ink-2 text-base m-0 mb-5 leading-relaxed text-safe">
                I&apos;m exploring how AI agents can interact with tools, files, applications,
                and development environments to automate complex workflows.
              </p>
              <ul className="grid gap-2 mb-5">
                {agentTopics.map((t) => (
                  <li
                    key={t}
                    className="relative pl-4 text-sm text-ink text-safe before:content-[''] before:absolute before:left-0 before:top-[11px] before:w-2 before:h-[1px] before:bg-accent"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted border-t border-rule pt-4 mt-2 leading-relaxed text-safe">
                The long-term goal is to build systems where an AI agent understands a project,
                interacts with its files and tools, executes tasks, tests the result, and
                improves the implementation.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
