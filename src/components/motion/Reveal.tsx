"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  as?: "div" | "aside" | "section" | "span" | "p";
};

/**
 * Fade-up reveal when the element enters the viewport.
 *
 * Anti-stuck by design: content is rendered visible by default and the
 * trigger is an IntersectionObserver (layout- and orientation-agnostic),
 * so the content can never be stranded at opacity: 0 regardless of what
 * ScrollTrigger, resize, or rotation events do on mobile.
 *
 * Content stays visible without JS and under reduced-motion.
 */
export function Reveal({ children, className, y = 12, delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          gsap.fromTo(
            el,
            { opacity: 0, y },
            { opacity: 1, y: 0, duration: 0.45, delay, ease: "power2.out" },
          );
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [y, delay]);

  const Tag = as as "div";

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
