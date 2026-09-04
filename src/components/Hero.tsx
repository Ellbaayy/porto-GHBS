import Image from "next/image";
import { profile, heroStats } from "@/data/portfolio";
import { scenes } from "@/data/scenes";
import { Container } from "@/components/ui/Container";
import { Scene } from "@/components/Scene";
import { Stagger } from "@/components/motion/Stagger";
import { WatermelonWreath } from "@/components/WatermelonWreath";

export function Hero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden pt-32 md:pt-40 pb-16 md:pb-24">
      <Scene scene={scenes.hero} />
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-center">
          <figure className="relative justify-self-center w-44 h-44 md:w-60 md:h-60 md:order-2 shrink-0">
            <Image
              src="/images/misc/bayu-tw.jpeg"
              alt="Portrait of Gesang Hemas Bayu Sekti"
              width={480}
              height={480}
              sizes="(max-width: 768px) 176px, 240px"
              priority
              className="h-full w-full rounded-full object-cover"
            />
            <WatermelonWreath className="pointer-events-none absolute -inset-[14%]" />
          </figure>
          <Stagger className="max-w-[65ch] md:order-1" gap={0.07}>
          <p data-stagger-item className="letter-salutation">Hello, I&apos;m Gesang Hemas Bayu Sekti.</p>

          <div data-stagger-item className="rule mt-8 mb-8 max-w-[10rem]" />

          <p data-stagger-item className="letter-body text-[clamp(1.1rem,1.6vw,1.35rem)] leading-relaxed text-ink-2">
            {profile.summary}
          </p>

          <p data-stagger-item className="letter-body mt-6 text-ink-2 leading-relaxed">
            Informatics student at President University, working toward becoming an AI
            engineer — building systems, not slides. Here is what I&apos;m about.
          </p>

          <div data-stagger-item className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
            <a href="#projects" className="cta-link">
              See the work →
            </a>
            <span className="font-mono text-xs text-muted tabular">
              {heroStats[0].display} projects · {heroStats[1].display} · finalist {heroStats[2].display}
            </span>
          </div>
        </Stagger>
        </div>
      </Container>
    </section>
  );
}
