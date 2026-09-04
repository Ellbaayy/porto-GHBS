import { learning, agentTopics } from "@/data/portfolio";
import { scenes } from "@/data/scenes";
import { Container } from "@/components/ui/Container";
import { Scene } from "@/components/Scene";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

export function Learning() {
  return (
    <section id="learning" className="scene-host region-cobalt relative isolate overflow-hidden py-20 md:py-28">
      <Scene scene={scenes.learning} />
      <Container>
        <SectionHeader title="Currently learning" meta="in progress" />

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-start">
          <Reveal className="overflow-x-auto">
            <table className="w-full border-collapse text-[15px]">
              <thead>
                <tr>
                  <th className="text-left py-3.5 pr-4 font-mono text-[11px] uppercase tracking-[0.08em] text-cobalt font-medium border-b border-rule">
                    Area
                  </th>
                  <th className="text-left py-3.5 font-mono text-[11px] uppercase tracking-[0.08em] text-cobalt font-medium border-b border-rule">
                    Focus
                  </th>
                </tr>
              </thead>
              <tbody>
                {learning.map((l) => (
                  <tr key={l.area} className="border-b border-rule last:border-b-0">
                    <td className="py-4 pr-4 font-medium text-ink align-top">{l.area}</td>
                    <td className="py-4 text-ink-2 align-top">{l.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal as="aside" className="border border-rule rounded-lg p-6 bg-paper" delay={0.1}>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted font-medium m-0 mb-4">
              Exploring AI Agents
            </h3>
            <p className="text-ink-2 text-[15px] m-0 mb-5 leading-relaxed">
              I&apos;m exploring how AI agents can interact with tools, files, applications,
              and development environments to automate complex workflows.
            </p>
            <ul className="grid gap-2 mb-5">
              {agentTopics.map((t) => (
                <li
                  key={t}
                  className="relative pl-4 text-[14px] text-ink before:content-[''] before:absolute before:left-0 before:top-[11px] before:w-2 before:h-[1px] before:bg-accent"
                >
                  {t}
                </li>
              ))}
            </ul>
            <p className="text-[13px] text-muted border-t border-rule pt-4 mt-2 leading-relaxed">
              The long-term goal is to build systems where an AI agent understands a project,
              interacts with its files and tools, executes tasks, tests the result, and
              improves the implementation.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
