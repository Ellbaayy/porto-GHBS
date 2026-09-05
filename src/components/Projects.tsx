"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { projects, achievements } from "@/data/portfolio";
import { scenes } from "@/data/scenes";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Scene } from "@/components/Scene";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger } from "@/components/motion/Stagger";

const liftCard = (el: HTMLElement, y: number) => {
  if (
    !window.matchMedia("(prefers-reduced-motion: no-preference)").matches ||
    !window.matchMedia("(pointer: fine)").matches
  )
    return;
  gsap.to(el, { y, duration: 0.22, ease: "power2.out", overwrite: "auto" });
};

export function Projects() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateBounds = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth - 4;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateBounds();
    el.addEventListener("scroll", updateBounds, { passive: true });
    window.addEventListener("resize", updateBounds);
    return () => {
      el.removeEventListener("scroll", updateBounds);
      window.removeEventListener("resize", updateBounds);
    };
  }, [updateBounds]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : 340;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="projects" className="scene-host region-paper2 relative isolate overflow-hidden py-20 md:py-28">
      <Scene scene={scenes.projects} />
      <Container>
        <SectionHeader title="Selected projects" meta="four pieces of work" />

        <div className="grid grid-cols-1 sm:grid-cols-[40px_1fr_40px] gap-3 items-stretch">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => scrollBy(-1)}
            disabled={atStart}
            className={cn(
              "hidden sm:flex w-10 h-10 self-center rounded-md border border-rule text-safe",
              "sm:col-start-1",
              "text-ink items-center justify-center",
              "hover:text-accent hover:border-accent transition-colors",
              "disabled:opacity-35 disabled:cursor-not-allowed",
            )}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <Stagger
            ref={scrollerRef}
            className="gallery-scroll grid grid-cols-1 sm:grid-cols-none sm:grid-flow-col sm:auto-cols-[minmax(280px,320px)] gap-5 min-w-0 sm:overflow-x-auto sm:snap-x sm:snap-mandatory py-2 px-2 pb-6 sm:col-start-2"
            gap={0.08}
          >
            {projects.map((p) => (
              <article
                key={p.index}
                data-card
                data-stagger-item
                onMouseEnter={(e) => liftCard(e.currentTarget, -4)}
                onMouseLeave={(e) => liftCard(e.currentTarget, 0)}
                className={cn(
                  "snap-start border border-rule rounded-lg p-6 min-h-[320px] flex flex-col relative",
                  "shadow-[0_10px_30px_rgb(0_0_0/0.35)]",
                  "hover:border-accent transition-colors",
                )}
              >
                <span className="font-mono text-[12px] text-muted tabular mb-4 text-safe">
                  {p.index} / {p.tag}
                </span>
                <h3 className="font-display text-[24px] leading-[1.15] text-ink m-0 mb-3 text-safe">
                  {p.title}
                </h3>
                <p className="text-ink-2 text-[14px] leading-relaxed m-0 mb-[18px] flex-1 text-safe">
                  {p.description}
                </p>
                <ul className="flex flex-wrap gap-1.5 mt-auto">
                  {p.stack.map((t) => (
                    <li
                      key={t}
                      className="font-mono text-[11px] px-2 py-1 rounded border border-rule text-ink-2 text-safe"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </Stagger>

          <button
            type="button"
            aria-label="Next project"
            onClick={() => scrollBy(1)}
            disabled={atEnd}
            className={cn(
              "hidden sm:flex w-10 h-10 self-center rounded-md border border-rule text-safe",
              "sm:col-start-3",
              "text-ink items-center justify-center",
              "hover:text-accent hover:border-accent transition-colors",
              "disabled:opacity-35 disabled:cursor-not-allowed",
            )}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <Stagger className="mt-14 md:mt-20 pt-7 border-t border-rule" gap={0.1}>
          <h3 data-stagger-item className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted font-medium m-0 mb-6 text-safe">
            Achievements
          </h3>
          <ul>
            {achievements.map((a, i) => (
              <li
                key={i}
                data-stagger-item
                className="grid grid-cols-[80px_1fr] gap-5 items-start py-5 border-b border-rule last:border-b-0 text-safe"
              >
                <span className="font-mono text-[13px] text-accent tabular">{a.year}</span>
                <div>
                  <strong className="block text-[16px] mb-1 text-ink">{a.title}</strong>
                  <p className="m-0 text-muted text-[14px]">{a.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </Stagger>
      </Container>
    </section>
  );
}
