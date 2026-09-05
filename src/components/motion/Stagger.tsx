"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  gap?: number;
  delay?: number;
  ref?: React.Ref<HTMLDivElement>;
};

/**
 * Staggered entrance for direct-marked children (`data-stagger-item`).
 * Triggered once when the container enters the viewport.
 *
 * Anti-stuck by design: content is rendered visible by default and the
 * trigger is an IntersectionObserver (layout- and orientation-agnostic),
 * so cards can never be stranded at opacity: 0 regardless of what
 * ScrollTrigger, resize, or rotation events do on mobile.
 *
 * Content stays visible without JS and under reduced-motion.
 */
export function Stagger({ children, className, y = 12, gap = 0.05, delay = 0, ref }: StaggerProps) {
  const innerRef = useRef<HTMLDivElement>(null);

  const setRefs = (node: HTMLDivElement | null) => {
    innerRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          const items = el.querySelectorAll("[data-stagger-item]");
          if (items.length === 0) return;
          gsap.fromTo(
            items,
            { opacity: 0, y },
            { opacity: 1, y: 0, duration: 0.4, delay, stagger: gap, ease: "power2.out" },
          );
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [y, gap, delay]);

  return (
    <div ref={setRefs} className={className}>
      {children}
    </div>
  );
}
