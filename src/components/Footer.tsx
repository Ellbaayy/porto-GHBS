import { profile } from "@/data/portfolio";
import { scenes } from "@/data/scenes";
import { Scene } from "@/components/Scene";

export function Footer() {
  return (
    <footer className="scene-host region-peach relative isolate z-[1] overflow-hidden border-t-2 border-ink mt-10">
      <Scene scene={scenes.footer} />
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-14 py-14 md:py-20">
        <div className="max-w-[60ch]">
          <p className="font-display text-[clamp(1.5rem,2.5vw,2rem)] text-ink">
            Yours,
          </p>
          <p className="font-display text-[clamp(1.5rem,2.5vw,2rem)] text-accent mt-1">
            Gesang Hemas Bayu Sekti
          </p>
          <p className="mt-6 text-sm text-muted">
            P.S. Replies welcome at{" "}
            <a href={`mailto:${profile.email}`} className="text-ink hover:text-accent transition-colors">
              {profile.email}
            </a>
            . More of me on{" "}
            <a
              href="https://instagram.com/ellbaayy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink hover:text-accent transition-colors"
            >
              {profile.instagramHandle}
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
