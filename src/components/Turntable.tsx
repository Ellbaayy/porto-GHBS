"use client";

import { useEffect, useRef, useState } from "react";
import { getAudioElement, getAudioGraph } from "@/lib/audio";

/**
 * Turntable — a fixed vinyl medallion, bottom-center on large screens.
 *
 * Purely presentational (aria-hidden, pointer-events-none): the disc
 * spins proportionally to real scroll position (transform-only, GPU),
 * the center label flips SIDE A / SIDE B with the section in view, and
 * a canvas ring meters the same live frequency data as the music pill.
 * Under reduced-motion the disc rests and the ring stays flat, while the
 * section label keeps updating. Controls live in MusicPlayer.
 */
const SIDE_A = new Set(["hero", "about", "tech"]);
const SECTION_IDS = ["hero", "about", "tech", "projects", "learning", "journey", "contact"];
const TICKS = 28;
const SPIN_FACTOR = 0.08;

export function Turntable() {
  const discRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const watchRef = useRef<number | null>(null);
  const [side, setSide] = useState<"A" | "B">("A");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* Spin follows scroll position — deterministic, no autonomous motion. */
    let spinQueued = false;
    const applySpin = () => {
      spinQueued = false;
      const disc = discRef.current;
      if (disc) disc.style.transform = `rotate(${window.scrollY * SPIN_FACTOR}deg)`;
    };
    const onScroll = () => {
      if (reduced || spinQueued) return;
      spinQueued = true;
      requestAnimationFrame(applySpin);
    };
    if (!reduced) {
      applySpin();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* Label follows the section in view. */
    const ratios = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
        let best = "";
        let bestRatio = 0;
        ratios.forEach((r, id) => {
          if (r > bestRatio) {
            bestRatio = r;
            best = id;
          }
        });
        if (best) setSide(SIDE_A.has(best) ? "A" : "B");
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    /* Equalizer ring reads the shared graph; flat when silent. */
    const drawFlat = () => {
      const canvas = ringRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const size = canvas.clientWidth * dpr;
      if (canvas.width !== size) {
        canvas.width = size;
        canvas.height = size;
      }
      drawRing(ctx, size, dpr, null);
    };

    const tick = () => {
      const el = getAudioElement();
      const graph = getAudioGraph();
      const canvas = ringRef.current;
      const ctx = canvas?.getContext("2d");
      if (!el || !graph || !canvas || !ctx || el.paused || el.muted || document.hidden) {
        rafRef.current = null;
        return;
      }
      const { analyser, data } = graph;
      analyser.getByteFrequencyData(data);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const size = canvas.clientWidth * dpr;
      if (canvas.width !== size) {
        canvas.width = size;
        canvas.height = size;
      }
      drawRing(ctx, size, dpr, data);
      rafRef.current = requestAnimationFrame(tick);
    };

    const watch = () => {
      const el = getAudioElement();
      if (
        !reduced &&
        getAudioGraph() &&
        el &&
        !el.paused &&
        !el.muted &&
        rafRef.current == null
      ) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    if (reduced) {
      drawFlat();
    } else {
      watchRef.current = window.setInterval(watch, 1000);
      watch();
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      if (watchRef.current != null) window.clearInterval(watchRef.current);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-6 left-1/2 z-30 hidden -translate-x-1/2 lg:block"
    >
      <div className="relative h-28 w-28 rounded-full border-[1.5px] border-ink bg-paper shadow-pop-sm">
        <div ref={discRef} className="absolute inset-[10px] rounded-full will-change-transform" style={{ background: "repeating-radial-gradient(circle at center, var(--color-ink) 0 1px, transparent 1px 5px)" }} />
        <canvas ref={ringRef} className="absolute inset-[4px] h-[calc(100%-8px)] w-[calc(100%-8px)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full border-[1.5px] border-ink bg-rind px-2.5 py-1 font-display text-xs tracking-[0.12em] text-paper">
            SIDE {side}
          </span>
        </div>
      </div>
    </div>
  );
}

function drawRing(
  ctx: CanvasRenderingContext2D,
  size: number,
  dpr: number,
  data: Uint8Array<ArrayBuffer> | null,
) {
  const bins = data?.length ?? 0;
  const binsPerTick = bins > 0 ? Math.max(1, Math.floor(bins / TICKS)) : 0;
  ctx.clearRect(0, 0, size, size);
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 4 * dpr;
  let accent = "#c9263f";
  try {
    const v = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    if (v) accent = v;
  } catch {
    /* keep hex fallback */
  }
  ctx.strokeStyle = accent;
  ctx.globalAlpha = 0.85;
  ctx.lineWidth = Math.max(1.5, 2 * dpr);
  ctx.lineCap = "round";
  for (let i = 0; i < TICKS; i++) {
    let level = 0.1;
    if (data && binsPerTick > 0) {
      let sum = 0;
      for (let j = 0; j < binsPerTick; j++) sum += data[(i * binsPerTick + j) % bins] ?? 0;
      level = 0.1 + (sum / binsPerTick / 255) * 0.9;
    }
    const angle = (i / TICKS) * Math.PI * 2 - Math.PI / 2;
    const inner = radius - level * 7 * dpr;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
    ctx.lineTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}
