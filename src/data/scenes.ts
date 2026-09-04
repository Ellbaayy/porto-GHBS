export type SceneKey =
  | "hero"
  | "about"
  | "tech"
  | "projects"
  | "learning"
  | "journey"
  | "contact"
  | "footer";

export interface SceneSpec {
  /** Public path to the scene image (object-cover full-screen; optimizer serves size variants). */
  src: string;
  /**
   * Region-tinted gradient laid over the uniform scrim.
   * Each region gets its own hue so the photos read as one warm-dark family.
   */
  tint: string;
  /** Hero only: eager load + high fetch priority for LCP. */
  eager?: boolean;
}

export const scenes: Record<SceneKey, SceneSpec> = {
  hero: {
    src: "/images/watermelon/tw-1.jpeg",
    tint: "bg-gradient-to-b from-paper/55 via-paper/20 to-paper/80",
    eager: true,
  },
  about: {
    src: "/images/watermelon/tw-2.jpeg",
    tint: "bg-gradient-to-b from-region-warm/50 via-paper/30 to-paper/75",
  },
  tech: {
    src: "/images/watermelon/tw-3.jpeg",
    tint: "bg-gradient-to-b from-region-coral/50 via-paper/30 to-paper/75",
  },
  projects: {
    src: "/images/watermelon/tw-4.jpeg",
    tint: "bg-gradient-to-b from-paper-2/60 via-paper/30 to-paper/75",
  },
  learning: {
    src: "/images/watermelon/tw-5.jpeg",
    tint: "bg-gradient-to-b from-region-cobalt/55 via-paper/30 to-paper/75",
  },
  journey: {
    src: "/images/watermelon/tw-6.jpeg",
    tint: "bg-gradient-to-b from-paper-3/60 via-paper/30 to-paper/75",
  },
  contact: {
    src: "/images/watermelon/tw-7.jpeg",
    tint: "bg-gradient-to-b from-region-coral/50 via-paper/30 to-paper/75",
  },
  footer: {
    src: "/images/watermelon/tw-8.jpeg",
    tint: "bg-gradient-to-b from-region-plum/50 via-paper/30 to-paper/80",
  },
};

/**
 * Panorama order for the continuous scene track: hero → footer.
 * Key insertion order above already matches section order.
 */
export const sceneOrder: SceneSpec[] = (
  Object.keys(scenes) as SceneKey[]
).map((key) => scenes[key]);
