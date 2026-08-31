"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#tech", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 backdrop-blur-md transition-colors",
        scrolled
          ? "bg-bg/90 border-b border-line"
          : "bg-bg/70 border-b border-transparent",
      )}
    >
      <nav className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-14 py-[18px] flex items-center gap-7">
        <a
          href="#hero"
          className="font-mono text-[15px] tracking-[0.04em] text-ink hover:opacity-70 transition"
        >
          {profile.initials}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-[22px] ml-auto text-[14px] text-ink-soft">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative py-1.5 hover:text-ink transition-colors group"
              >
                {l.label}
                <span className="absolute left-0 -bottom-0.5 h-[1.5px] bg-accent transition-all w-0 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-block text-[13px] px-[14px] py-2 border border-line-strong rounded-full text-ink-soft hover:border-accent hover:bg-accent-soft hover:text-accent-deep transition"
        >
          {profile.instagramHandle}
        </a>
      </nav>
    </header>
  );
}