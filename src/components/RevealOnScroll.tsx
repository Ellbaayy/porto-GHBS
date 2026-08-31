"use client";

import { useEffect } from "react";

export function RevealOnScroll() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("section, .reveal, [data-reveal]");
    // Add base reveal classes and alternating direction classes
    targets.forEach((el, idx) => {
      el.classList.add("reveal");
      if (idx % 2 === 0) {
        el.classList.add("reveal-left");
      } else {
        el.classList.add("reveal-right");
      }
    });

    if (!("IntersectionObserver" in window)) {
      // If no IntersectionObserver, just show everything
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}