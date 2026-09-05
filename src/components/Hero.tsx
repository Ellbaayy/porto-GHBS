import Image from "next/image";
import { profile, heroStats } from "@/data/portfolio";
import { scenes } from "@/data/scenes";
import { Container } from "@/components/ui/Container";
import { Scene } from "@/components/Scene";
import { Stagger } from "@/components/motion/Stagger";
import { KineticTitle } from "@/components/motion/KineticTitle";
import { WatermelonWreath } from "@/components/WatermelonWreath";

export function Hero() {
  return (
    <section id="hero" className="scene-host region-peach relative isolate overflow-hidden pt-32 md:pt-40 pb-16 md:pb-24">
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
              className="h-full w-full rounded-full object-cover border-2 border-ink"
            />
            <WatermelonWreath className="pointer-events-none absolute -inset-[24%]" />
          </figure>
          <div className="max-w-[65ch] md:order-1">
            <p className="chip mb-6 text-safe">Debut tape, 2026</p>
            <KineticTitle
              lines={["GESANG HEMAS", "BAYU SEKTI"]}
              className="font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] text-ink text-safe"
            />

            <Stagger className="mt-8" gap={0.07}>
              <p data-stagger-item className="text-[clamp(1.1rem,1.6vw,1.35rem)] leading-relaxed text-ink-2 text-safe">
                {profile.summary}
              </p>

              <p data-stagger-item className="mt-6 text-ink-2 leading-relaxed text-safe">
                Informatics student at President University, working toward becoming an AI
                engineer. I build systems, not slides. Here is what I am about.
              </p>

              <div data-stagger-item className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#projects" className="btn-tape">
                  See the projects
                </a>
                <a href="#contact" className="btn-outline">
                  Get in touch
                </a>
              </div>

              <dl data-stagger-item className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
                {heroStats.map((s) => (
                  <div key={s.label}>
                    <dt className="text-sm text-muted text-safe">{s.label}</dt>
                    <dd className="font-display text-2xl text-ink m-0 tabular text-safe">
                      {s.display}
                    </dd>
                    <dd className="text-sm text-ink-2 m-0 text-safe">{s.foot}</dd>
                  </div>
                ))}
              </dl>
            </Stagger>
          </div>
        </div>
      </Container>
    </section>
  );
}
