import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line mt-10">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-14 py-7 flex justify-between items-center gap-4 text-[13px] text-muted">
        <span className="font-mono text-ink">{profile.initials} © 2026</span>
        <span>Designed &amp; built with care · President University · Indonesia</span>
      </div>
    </footer>
  );
}