"use client";

import { useEffect, useRef, useState } from "react";

/**
 * BootScreen — vinyl boot splash shown once before the site is entered.
 *
 * Dismisses through two independent paths, whichever fires first:
 * `window load` (after a short minimum show time) or an absolute timeout
 * (~2.2s), so the overlay can never strand the visitor. After the fade
 * it unmounts completely. Under reduced-motion the spin is CSS-disabled
 * and the overlay leaves almost immediately. No-JS safe: the overlay is
 * client-only, so SSR/HTML content stays reachable without JavaScript.
 */
const MIN_SHOW_MS = 900;
const MAX_SHOW_MS = 2200;
const EXIT_MS = 380;

export function BootScreen() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const timers = useRef<number[]>([]);
  const left = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const leave = () => {
      if (left.current) return;
      left.current = true;
      setLeaving(true);
      timers.current.push(
        window.setTimeout(() => {
          setGone(true);
          document.body.style.overflow = prevOverflow;
        }, EXIT_MS),
      );
    };

    const schedule = () => {
      timers.current.push(window.setTimeout(leave, reduced ? 150 : MIN_SHOW_MS));
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }
    timers.current.push(window.setTimeout(leave, MAX_SHOW_MS));

    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
      window.removeEventListener("load", schedule);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`boot-screen${leaving ? " boot-screen--leaving" : ""}`}
    >
      <div className="boot-disc">
        <span className="boot-label">GHBS</span>
      </div>
      <p className="chip mt-8">Debut tape, 2026</p>
      <div className="boot-progress" />
    </div>
  );
}
