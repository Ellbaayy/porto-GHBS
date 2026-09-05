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
 *
 * Anti-stuck by design: content is rendered visible by default and the
 * tween is only built inside `onEnter`. If the ScrollTrigger never fires
 * (mobile, layout quirks), the cards simply stay visible instead of being
 * stranded at opacity: 0.
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

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = innerRef.current?.querySelectorAll("[data-stagger-item]");
        if (!items || items.length === 0) return;
        ScrollTrigger.create({
          trigger: innerRef.current,
          start: "top 88%",
          once: true,
          onEnter: () =>
            gsap.fromTo(
              items,
              { opacity: 0, y },
              { opacity: 1, y: 0, duration: 0.4, delay, stagger: gap, ease: "power2.out" },
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
    { scope: innerRef, dependencies: [y, gap, delay] },
  );

  return (
    <div ref={setRefs} className={className}>
      {children}
    </div>
  );
}
