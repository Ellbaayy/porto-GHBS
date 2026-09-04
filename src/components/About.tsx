import { aboutInfo, interests } from "@/data/portfolio";
import { scenes } from "@/data/scenes";
import { Container } from "@/components/ui/Container";
import { Scene } from "@/components/Scene";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";

export function About() {
  return (
    <section id="about" className="scene-host region-warm relative isolate overflow-hidden py-20 md:py-28">
      <Scene scene={scenes.about} />
      <Container>
        <SectionHeader title="About me" meta="who & where" />

        <Reveal className="max-w-[65ch] letter-body">
          <p className="font-display text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.3] text-ink mb-6">
            Hi, I&apos;m Gesang — an Informatics student at President University with a
            strong interest in Artificial Intelligence and software development.
          </p>

          <p className="text-ink-2 mb-5">
            I&apos;m passionate about turning AI from an idea into a practical solution. My
            work sits at the intersection of Machine Learning, Computer Vision, AI Agents,
            and Data Science — with a foundation in web development and IoT.
          </p>

          <p className="text-ink-2 mb-5">
            I spend my time building projects, experimenting with new technologies, and
            entering competitions. The through-line: learn by building, and build things
            that create real impact.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-y border-rule py-8">
          {aboutInfo.map((it) => (
            <div key={it.label} data-stagger-item>
              <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-muted mb-2">
                {it.label}
              </span>
              <p className="m-0 text-ink font-medium text-[14px] leading-snug">{it.value}</p>
            </div>
          ))}
        </Stagger>

        <Stagger className="mt-10" gap={0.03}>
          <span data-stagger-item className="block font-mono text-[11px] uppercase tracking-[0.08em] text-muted mb-4">
            Areas of interest
          </span>
          <ul className="flex flex-wrap gap-2.5">
            {interests.map((tag) => (
              <li
                key={tag}
                data-stagger-item
                className="text-[13px] px-3.5 py-1.5 border border-rule rounded-md text-ink-2 hover:border-accent hover:text-accent transition-colors cursor-default"
              >
                {tag}
              </li>
            ))}
            </ul>
        </Stagger>
      </Container>
    </section>
  );
}
