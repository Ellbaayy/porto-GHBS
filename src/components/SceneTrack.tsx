"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { sceneOrder } from "@/data/scenes";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Continuous scene panorama: all region photos stacked into one tall film
 * that drifts upward as the page scrolls (scrubbed, linear). Scrolling down
 * a section physically climbs the next frame, so every background flows into
 * the next instead of cutting — vertical direction, matching the scroll.
 *
 * - One orchestrated motion only (the rail); everything else stays quiet.
 * - Per-frame region tints keep the peach/ember/rose/leaf identity.
 * - Seam gradients on each frame's edges hide the cuts between photos.
 * - Warm paper veil (contrast) + a sun-fade grade unify the frames.
 * - Under reduced-motion the track is CSS-hidden and the per-section
 *   `Scene` fallbacks take over instead.
 * - Without JS the track renders at its start position (hero frame).
 */
export function SceneTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rail = railRef.current;
        if (!rail) return;
        gsap.fromTo(
          rail,
          { y: 0 },
          {
            y: () => -(rail.scrollHeight - window.innerHeight),
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: trackRef },
  );

  return (
    <div
      ref={trackRef}
      aria-hidden="true"
      className="scene-track pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div ref={railRef} className="absolute inset-x-0 top-0 flex h-max w-full flex-col will-change-transform">
        {sceneOrder.map((frame) => (
          <figure key={frame.src} className="relative h-screen w-full shrink-0">
            <Image
              src={frame.src}
              alt=""
              fill
              sizes="100vw"
              loading="lazy"
              decoding="async"
              className="object-cover"
            />
            {/* seam blend — soften the cut into the neighbouring frame */}
            <div className="absolute inset-x-0 top-0 h-[12vh] max-h-48 bg-gradient-to-b from-paper to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[12vh] max-h-48 bg-gradient-to-t from-paper to-transparent" />
            {/* region tint per frame, matching the section palette */}
            <div className={cn("absolute inset-0", frame.tint)} />
          </figure>
        ))}
      </div>
      {/* warm paper veil for text contrast */}
      <div className="absolute inset-0 bg-paper/50" />
      {/* sun-fade grade — one world, one summer film */}
      <div className="absolute inset-0 bg-sunfade/70 mix-blend-multiply" />
    </div>
  );
}
