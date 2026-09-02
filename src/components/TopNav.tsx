"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/portfolio";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#tech", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export function TopNav() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu when a link is picked
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <nav className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-14 py-[18px] flex items-center gap-7">
        <a
          href="#hero"
          onClick={close}
          className="font-mono text-[16px] font-bold tracking-[0.04em] text-ink hover:opacity-70 transition"
        >
          {profile.initials}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-[22px] ml-auto text-[14px] font-medium text-ink">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative py-1.5 hover:text-accent transition-colors group"
              >
                {l.label}
                <span className="absolute left-0 -bottom-0.5 h-[2px] bg-accent transition-all w-0 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto md:ml-0 flex items-center gap-2">
          <a
            href="https://instagram.com/ellbaayy"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex text-[13px] px-[14px] py-2 border border-line-strong rounded-full text-ink hover:border-accent hover:bg-accent-soft hover:text-ink transition"
          >
            {profile.instagramHandle}
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-line-strong text-ink hover:border-accent transition"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown panel — solid tipis biar menu tetap kebaca */}
      {open && (
        <div className="md:hidden bg-bg/95 backdrop-blur-md">
          <ul className="max-w-[1240px] mx-auto px-6 py-4 flex flex-col">
            {links.map((l) => (
              <li key={l.href} className="last:border-b-0">
                <a
                  href={l.href}
                  onClick={close}
                  className="block py-3.5 text-[15px] font-medium text-ink hover:text-accent transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href="https://instagram.com/ellbaayy"
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="inline-flex text-[13px] px-[14px] py-2 border border-line-strong rounded-full text-ink hover:border-accent hover:bg-accent-soft hover:text-ink transition"
              >
                {profile.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
