"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
 * Content stays visible without JS and under reduced-motion.
 */
export function Stagger({ children, className, y = 12, gap = 0.05, delay = 0, ref }: StaggerProps) {
  const innerRef = useRef<HTMLDivElement>(null);

  const setRefs = (node: HTMLDivElement | null) => {
    innerRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = innerRef.current?.querySelectorAll("[data-stagger-item]");
        if (!items || items.length === 0) return;
        gsap.from(items, {
          opacity: 0,
          y,
          duration: 0.4,
          delay,
          stagger: gap,
          ease: "power2.out",
          scrollTrigger: { trigger: innerRef.current, start: "top 88%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: innerRef, dependencies: [y, gap, delay] },
  );

  return (
    <div ref={setRefs} className={className}>
      {children}
    </div>
  );
}
