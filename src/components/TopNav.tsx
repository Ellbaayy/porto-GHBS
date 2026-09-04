"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/portfolio";

const links = [
  { href: "#about", label: "About" },
  { href: "#tech", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export function TopNav() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <nav className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-14 py-6 flex items-center justify-between">
        <a
          href="#hero"
          onClick={close}
          className="font-display text-[20px] text-ink hover:text-accent transition-colors text-safe"
        >
          {profile.short}
        </a>

        {/* Desktop — edge aligned, CTA only */}
        <a
          href="#contact"
          className="hidden md:inline-flex btn-outline"
        >
          Say hello →
        </a>

        {/* Mobile — menu trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 text-ink hover:text-accent transition-colors text-safe"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {open && (
        <div>
          <ul className="max-w-[1240px] mx-auto px-6 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={close}
                  className="block py-3.5 font-body text-[15px] text-ink hover:text-accent transition-colors text-safe"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <a href="#contact" onClick={close} className="btn-outline">
                Say hello →
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
