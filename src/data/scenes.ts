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
   * Region-tinted gradient laid over the warm paper veil.
   * Each region gets its own sunset hue so the photos read as one warm family.
   */
  tint: string;
  /** Hero only: eager load + high fetch priority for LCP. */
  eager?: boolean;
}

export const scenes: Record<SceneKey, SceneSpec> = {
  hero: {
    src: "/images/watermelon/tw-1.jpeg",
    tint: "bg-gradient-to-b from-paper/70 via-paper/20 to-paper/90",
    eager: true,
  },
  about: {
    src: "/images/watermelon/tw-2.jpeg",
    tint: "bg-gradient-to-b from-region-ember/60 via-paper/20 to-paper/90",
  },
  tech: {
    src: "/images/watermelon/tw-3.jpeg",
    tint: "bg-gradient-to-b from-region-rose/60 via-paper/20 to-paper/90",
  },
  projects: {
    src: "/images/watermelon/tw-4.jpeg",
    tint: "bg-gradient-to-b from-paper-2/70 via-paper/20 to-paper/90",
  },
  learning: {
    src: "/images/watermelon/tw-5.jpeg",
    tint: "bg-gradient-to-b from-region-leaf/60 via-paper/20 to-paper/90",
  },
  journey: {
    src: "/images/watermelon/tw-6.jpeg",
    tint: "bg-gradient-to-b from-paper-3/70 via-paper/20 to-paper/90",
  },
  contact: {
    src: "/images/watermelon/tw-7.jpeg",
    tint: "bg-gradient-to-b from-region-rose/60 via-paper/20 to-paper/90",
  },
  footer: {
    src: "/images/watermelon/tw-8.jpeg",
    tint: "bg-gradient-to-b from-region-peach/60 via-paper/20 to-paper/90",
  },
};

/**
 * Panorama order for the continuous scene track: hero to footer.
 * Key insertion order above already matches section order.
 */
export const sceneOrder: SceneSpec[] = (
  Object.keys(scenes) as SceneKey[]
).map((key) => scenes[key]);
