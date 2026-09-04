import Image from "next/image";
import { cn } from "@/lib/utils";
import type { SceneSpec } from "@/data/scenes";

/**
 * Full-bleed decorative scene backdrop for a region.
 *
 * Render as the FIRST child of a `relative isolate overflow-hidden` section —
 * content that follows in DOM order paints above it. The photo is purely
 * decorative (empty alt + aria-hidden); the uniform scrim, the
 * region-tinted gradient, and the `.text-safe` shadow on floating text
 * keep text contrast at readable levels.
 *
 * Uses next/image `fill` so the browser picks a width-appropriate variant
 * (local WebP sources are re-encoded by the optimizer, sharp is installed).
 *
 * The `scene-section-img` class hides this under normal motion (the global
 * `SceneTrack` panorama takes over) and shows it again as the static
 * fallback under `prefers-reduced-motion`.
 */
export function Scene({ scene, className }: { scene: SceneSpec; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("scene-section-img pointer-events-none absolute inset-0", className)}
    >
      <Image
        src={scene.src}
        alt=""
        fill
        sizes="100vw"
        priority={scene.eager}
        loading={scene.eager ? undefined : "lazy"}
        decoding="async"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-paper/35" />
      <div className={cn("absolute inset-0", scene.tint)} />
    </div>
  );
}
