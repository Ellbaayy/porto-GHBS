import { techStack } from "@/data/portfolio";
import { scenes } from "@/data/scenes";
import { Container } from "@/components/ui/Container";
import { Scene } from "@/components/Scene";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger } from "@/components/motion/Stagger";

export function TechStack() {
  return (
    <section id="tech" className="scene-host region-rose relative isolate overflow-hidden py-20 md:py-28">
      <Scene scene={scenes.tech} />
      <Container>
        <SectionHeader title="What I work with" meta="The tools and techniques I reach for" />

        <Stagger className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1.2fr] gap-x-8 gap-y-10 border-t-2 border-ink" gap={0.08}>
          {techStack.map((col) => (
            <div key={col.heading} data-stagger-item className="pt-6">
              <h3 className="font-display text-xl text-ink m-0 mb-5">
                {col.heading}
              </h3>
              <ul className="flex flex-col">
                {col.items.map((it) => (
                  <li
                    key={it}
                    className="py-2 border-b border-rule last:border-b-0"
                  >
                    <span className="text-base text-ink">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
