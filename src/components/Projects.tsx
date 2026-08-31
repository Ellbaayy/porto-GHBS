"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects, achievements } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const tagPalettes = [
  { bg: "bg-coral-soft", text: "text-coral-deep" },
  { bg: "bg-cobalt-soft", text: "text-cobalt-deep" },
  { bg: "bg-plum-soft", text: "text-plum-deep" },
  { bg: "bg-lemon-soft", text: "text-lemon-deep" },
];

const yearPalettes = [
  { bg: "bg-coral-soft", text: "text-coral-deep" },
  { bg: "bg-cobalt-soft", text: "text-cobalt-deep" },
  { bg: "bg-plum-soft", text: "text-plum-deep" },
];

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
    <section id="projects" className="py-16 md:py-28">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-14">
        <header className="section-head mb-12 md:mb-14">
          <span className="section-num section-num-sage">03</span>
          <h2 className="section-title text-[clamp(28px,4vw,44px)]">Featured projects</h2>
          <span className="section-meta">04 selected · 2025 – 2026</span>
        </header>

        {/* Horizontal scroll gallery */}
        <div className="grid grid-cols-[56px_1fr_56px] gap-3 items-stretch">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => scrollBy(-1)}
            disabled={atStart}
            className={cn(
              "w-14 h-14 self-center rounded-full border border-line bg-bg-soft",
              "text-ink font-mono text-[20px] flex items-center justify-center",
              "hover:bg-cobalt hover:text-white hover:border-cobalt transition",
              "disabled:opacity-35 disabled:cursor-not-allowed",
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={scrollerRef}
            className="gallery-scroll grid grid-flow-col auto-cols-[minmax(320px,360px)] gap-5 overflow-x-auto snap-x snap-mandatory py-2 px-2 pb-6"
          >
            {projects.map((p, i) => (
              <article
                key={p.index}
                data-card
                className={cn(
                  "snap-start bg-bg-soft border border-line rounded-[18px] p-7",
                  "min-h-[360px] flex flex-col relative",
                  "hover:-translate-y-1 hover:border-cobalt hover:shadow-[0_20px_40px_-28px_rgba(20,19,15,0.35)]",
                  "transition",
                )}
              >
                <span
                  className={cn(
                    "absolute top-6 right-6 font-mono text-[11px] uppercase tracking-[0.08em] px-2.5 py-1 rounded-full",
                    tagPalettes[i % tagPalettes.length].bg,
                    tagPalettes[i % tagPalettes.length].text,
                  )}
                >
                  {p.tag}
                </span>
                <span className="font-mono text-[12px] text-muted tracking-[0.08em] mb-3.5">
                  {p.index}
                </span>
                <h3 className="font-serif text-[26px] leading-[1.15] font-normal text-ink m-0 mb-3.5">
                  {p.title}
                </h3>
                <p className="text-ink-soft text-[14px] leading-relaxed m-0 mb-[18px] flex-1">
                  {p.description}
                </p>
                <ul className="flex flex-wrap gap-1.5 mt-auto">
                  {p.stack.map((t) => (
                    <li
                      key={t}
                      className="font-mono text-[11px] px-2 py-1 rounded-md bg-bg-soft text-ink-soft border border-line"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next project"
            onClick={() => scrollBy(1)}
            disabled={atEnd}
            className={cn(
              "w-14 h-14 self-center rounded-full border border-line bg-bg-soft",
              "text-ink font-mono text-[20px] flex items-center justify-center",
              "hover:bg-cobalt hover:text-white hover:border-cobalt transition",
              "disabled:opacity-35 disabled:cursor-not-allowed",
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Achievements */}
        <div className="mt-14 md:mt-20 pt-7 border-t border-line">
          <h3 className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted font-medium m-0 mb-6">
            Achievements
          </h3>
          <ul className="grid gap-[18px]">
            {achievements.map((a, i) => {
              const palette = yearPalettes[i % yearPalettes.length];
              return (
                <li
                  key={i}
                  className="grid grid-cols-[90px_1fr] sm:gap-[22px] gap-2.5 items-start py-[18px] border-b border-line last:border-b-0"
                >
                  <span
                    className={cn(
                      "font-mono text-[13px] px-2.5 py-1 rounded-md w-fit",
                      palette.bg,
                      palette.text,
                    )}
                  >
                    {a.year}
                  </span>
                  <div>
                    <strong className="block text-[17px] mb-1 text-ink">{a.title}</strong>
                    <p className="m-0 text-muted text-[14px]">{a.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}