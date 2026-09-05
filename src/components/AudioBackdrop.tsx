"use client";

import { useEffect, useRef } from "react";
import { getAudioElement, getAudioGraph } from "@/lib/audio";

/**
 * AudioBackdrop — the page breathes with the track.
 *
 * A fixed canvas above the panorama and below the content paints a thin
 * waveform ribbon along the bottom edge, driven by the same live
 * frequency data as the music pill. The frame loop only runs while the
 * track is actually playing (and stops on mute, pause, hidden tab, or
 * reduced-motion), so silence costs nothing.
 */
const BARS = 96;
const RIBBON_PX = 130;

export function AudioBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const watchRef = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let accent = "#c9263f";
    try {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      if (v) accent = v;
    } catch {
      /* keep hex fallback */
    }

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    fit();
    window.addEventListener("resize", fit);

    const tick = () => {
      const el = getAudioElement();
      const graph = getAudioGraph();
      if (!el || !graph || el.paused || el.muted || document.hidden) {
        rafRef.current = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      const { analyser, data } = graph;
      analyser.getByteFrequencyData(data);
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const maxH = RIBBON_PX * dpr;
      const slot = w / BARS;
      const binsPerBar = Math.max(1, Math.floor(data.length / BARS));
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.28;
      const barW = Math.max(1, slot * 0.55);
      for (let i = 0; i < BARS; i++) {
        let sum = 0;
        for (let j = 0; j < binsPerBar; j++) sum += data[(i * binsPerBar + j) % data.length] ?? 0;
        const level = sum / binsPerBar / 255;
        const barH = Math.max(1, level * maxH);
        const x = i * slot + (slot - barW) / 2;
        ctx.fillRect(x, h - barH, barW, barH);
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(tick);
    };

    const watch = () => {
      const el = getAudioElement();
      if (getAudioGraph() && el && !el.paused && !el.muted && rafRef.current == null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    const onVisibility = () => {
      if (!document.hidden) watch();
    };
    document.addEventListener("visibilitychange", onVisibility);
    watchRef.current = window.setInterval(watch, 1000);
    watch();

    return () => {
      window.removeEventListener("resize", fit);
      document.removeEventListener("visibilitychange", onVisibility);
      if (watchRef.current != null) window.clearInterval(watchRef.current);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
