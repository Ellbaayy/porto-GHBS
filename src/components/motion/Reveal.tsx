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
 *
 * Anti-stuck by design: content is rendered visible by default and the
 * tween is only built inside `onEnter`. If the ScrollTrigger never fires
 * (mobile, layout quirks), the content simply stays visible instead of
 * being stranded at opacity: 0.
 *
 * Content stays visible without JS and under reduced-motion.
 */
export function Reveal({ children, className, y = 12, delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 88%",
          once: true,
          onEnter: () =>
            gsap.fromTo(
              ref.current,
              { opacity: 0, y },
              { opacity: 1, y: 0, duration: 0.45, delay, ease: "power2.out" },
            ),
        });
      });
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
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
