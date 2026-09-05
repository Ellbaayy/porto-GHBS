"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * MusicPlayer — background music for the site, with a live equalizer.
 *
 * Browsers block audible playback until the user interacts with the page,
 * so the first global gesture (click, tap, or scroll) starts the track
 * automatically; each one-shot listener is consumed on fire. If playback
 * is ever refused, the remaining listeners retry on the next gesture and
 * the button still lets the user start or mute manually.
 *
 * Equalizer: the track is routed element -> AnalyserNode -> speakers
 * (Web Audio API, same-origin file so no CORS is involved). Twelve bars
 * mirror the real frequency data each animation frame — the motion is
 * data-driven, never a decorative pulse. When the track is muted or
 * paused the bars rest flat; under reduced-motion they stay static.
 */
const START_EVENTS = ["pointerdown", "keydown", "touchstart"] as const;
const BAR_COUNT = 12;
const FFT_SIZE = 128;

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const startedRef = useRef(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const rafRef = useRef<number | null>(null);
  const graphRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);

  const flattenBars = useCallback(() => {
    barsRef.current.forEach((bar) => {
      if (bar) bar.style.transform = "scaleY(0.08)";
    });
  }, []);

  const stopLoop = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    flattenBars();
  }, [flattenBars]);

  const startLoop = useCallback(() => {
    const analyser = analyserRef.current;
    const data = dataRef.current;
    if (!analyser || !data) return;
    if (rafRef.current != null) return;
    const tick = () => {
      const el = audioRef.current;
      if (!el || el.paused || el.muted) {
        rafRef.current = null;
        flattenBars();
        return;
      }
      analyser.getByteFrequencyData(data);
      const binsPerBar = Math.floor(data.length / BAR_COUNT);
      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = barsRef.current[i];
        if (!bar) continue;
        let sum = 0;
        for (let j = 0; j < binsPerBar; j++) sum += data[i * binsPerBar + j] ?? 0;
        const avg = binsPerBar > 0 ? sum / binsPerBar : 0;
        bar.style.transform = `scaleY(${0.08 + (avg / 255) * 0.92})`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [flattenBars]);

  /** Build the element -> analyser -> speakers graph once, inside a gesture. */
  const ensureGraph = useCallback((el: HTMLAudioElement) => {
    if (graphRef.current) return;
    try {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      const ctx = new Ctor();
      const source = ctx.createMediaElementSource(el);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = FFT_SIZE;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      ctxRef.current = ctx;
      analyserRef.current = analyser;
      dataRef.current = new Uint8Array(analyser.frequencyBinCount);
      graphRef.current = true;
    } catch {
      /* Web Audio unavailable — music still plays, bars stay flat. */
    }
  }, []);

  const resumeGraph = useCallback(() => {
    const ctx = ctxRef.current;
    if (ctx && ctx.state === "suspended") {
      void ctx.resume().catch(() => {
        /* stays suspended — music still plays through the element */
      });
    }
  }, []);

  const maybeStartLoop = useCallback(() => {
    const el = audioRef.current;
    if (!el || el.paused || el.muted) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      flattenBars();
      return;
    }
    if (analyserRef.current) startLoop();
  }, [flattenBars, startLoop]);

  useEffect(() => {
    const tryStart = () => {
      const el = audioRef.current;
      if (!el || startedRef.current) return;
      ensureGraph(el);
      resumeGraph();
      void el
        .play()
        .then(() => {
          startedRef.current = true;
          maybeStartLoop();
        })
        .catch(() => {
          /* Playback refused — remaining listeners retry on next gesture. */
        });
    };
    START_EVENTS.forEach((e) => window.addEventListener(e, tryStart, { once: true }));
    return () => {
      START_EVENTS.forEach((e) => window.removeEventListener(e, tryStart));
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      const ctx = ctxRef.current;
      if (ctx) void ctx.close().catch(() => {});
      ctxRef.current = null;
      analyserRef.current = null;
      graphRef.current = false;
    };
  }, [ensureGraph, maybeStartLoop, resumeGraph]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (!startedRef.current) {
      ensureGraph(el);
      resumeGraph();
      void el
        .play()
        .then(() => {
          startedRef.current = true;
          maybeStartLoop();
        })
        .catch(() => {
          /* Stay paused — the next global gesture retries. */
        });
    }
    const nextMuted = !isMuted;
    el.muted = nextMuted;
    setIsMuted(nextMuted);
    if (nextMuted) {
      stopLoop();
    } else {
      resumeGraph();
      maybeStartLoop();
    }
  };

  return (
    <div className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-50">
      <audio ref={audioRef} src="/audio/shining.mp3" loop preload="auto" />
      <div className="flex items-center gap-3 rounded-full bg-paper border-[1.5px] border-ink shadow-pop-sm pl-4 pr-1.5 py-1.5">
        <div aria-hidden="true" className="flex items-end gap-[3px] h-6">
          {Array.from({ length: BAR_COUNT }).map((_, i) => (
            <span
              key={i}
              ref={(node) => {
                barsRef.current[i] = node;
              }}
              className="w-[3px] h-full rounded-full bg-accent origin-bottom"
              style={{ transform: "scaleY(0.08)" }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={toggle}
          aria-label={isMuted ? "Play background music" : "Mute background music"}
          aria-pressed={isMuted}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-ink text-paper border-[1.5px] border-ink hover:-translate-y-0.5 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
