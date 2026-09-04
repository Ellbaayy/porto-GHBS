"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  as?: "div" | "aside" | "section" | "span" | "p";
};

/**
 * Fade-up reveal when the element enters the viewport.
 * Content stays visible without JS and under reduced-motion.
 */
export function Reveal({ children, className, y = 12, delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          opacity: 0,
          y,
          duration: 0.45,
          delay,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [y, delay] },
  );

  const Tag = as as "div";

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
