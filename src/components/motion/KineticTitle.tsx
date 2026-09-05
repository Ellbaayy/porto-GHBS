"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * KineticTitle — the single hero moment (MOTION tier 2: GSAP entrance).
 *
 * Each line is wrapped in an overflow-hidden mask; on load the lines slide
 * up with a stagger. Rendered fully visible by default (no-JS and
 * reduced-motion safe): the animation only runs under
 * `prefers-reduced-motion: no-preference`, via fromTo, so content can
 * never be stranded hidden.
 */
export function KineticTitle({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = el.querySelectorAll("[data-kinetic-line]");
    if (targets.length === 0) return;
    gsap.fromTo(
      targets,
      { yPercent: 110 },
      { yPercent: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", delay: 0.1 },
    );
  }, []);

  return (
    <h1 ref={ref} className={className}>
      {lines.map((line) => (
        <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <span data-kinetic-line className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}
