"use client";

import { profile } from "@/data/portfolio";
import { useHeaderVisibility } from "./HeaderVisibility";
import { cn } from "@/lib/utils";

export function TopNav() {
  const { hidden } = useHeaderVisibility();

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-transform duration-300 ease-out",
        hidden ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <nav className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-14 py-6 flex items-center justify-between">
        <a
          href="#hero"
          className="font-display text-xl text-ink hover:text-accent transition-colors text-safe"
        >
          {profile.short}
        </a>

        <a href="#contact" className="btn-outline">
          Say hello
        </a>
      </nav>
    </header>
  );
}
