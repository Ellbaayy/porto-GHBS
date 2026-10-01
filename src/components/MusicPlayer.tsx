"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { ensureAudioGraph, getAudioGraph, resumeAudio } from "@/lib/audio";

/**
 * MusicPlayer — background music for the site, with a live equalizer.
 *
 * Playback is entirely opt-in: nothing starts on load or on a stray click.
 * The button is a real play/pause toggle and the only thing that starts or
 * stops the track, so the user stays in control of when it plays.
 *
 * Equalizer: frequency data comes from the shared audio engine
 * (@/lib/audio — element -> AnalyserNode -> speakers, same-origin file
 * so no CORS is involved). Twelve bars mirror the real data each
 * animation frame — the motion is data-driven, never a decorative pulse.
 * When the track is paused the bars rest flat; under reduced-motion they
 * stay static.
 */
const BAR_COUNT = 12;

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
    const graph = getAudioGraph();
    if (!graph) return;
    if (rafRef.current != null) return;
    const { analyser, data } = graph;
    const tick = () => {
      const el = audioRef.current;
      if (!el || el.paused) {
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

  const maybeStartLoop = useCallback(() => {
    const el = audioRef.current;
    if (!el || el.paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      flattenBars();
      return;
    }
    if (getAudioGraph()) startLoop();
  }, [flattenBars, startLoop]);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      /* Graph stays alive on purpose — see disposeAudioGraph docs. */
    };
  }, []);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
      stopLoop();
      return;
    }
    ensureAudioGraph(el);
    resumeAudio();
    void el
      .play()
      .then(() => {
        setIsPlaying(true);
        maybeStartLoop();
      })
      .catch(() => {
        /* Playback refused — stay paused and flat until the user tries again. */
        setIsPlaying(false);
        stopLoop();
      });
  };

  return (
    <div className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-50">
      {/* preload="metadata": the 5MB track streams when the user presses play, not on page load. */}
      <audio ref={audioRef} src="/audio/shining.mp3" loop preload="metadata" />
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
          aria-label={isPlaying ? "Pause background music" : "Play background music"}
          aria-pressed={isPlaying}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-ink text-paper border-[1.5px] border-ink hover:-translate-y-0.5 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
