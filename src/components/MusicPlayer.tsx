"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * MusicPlayer — background music for the site.
 *
 * Browsers block audible playback until the user interacts with the page,
 * so the first global gesture (click, tap, or scroll) starts the track
 * automatically; each one-shot listener is consumed on fire. If playback
 * is ever refused, the remaining listeners retry on the next gesture and
 * the button still lets the user start or mute manually.
 */
const START_EVENTS = ["pointerdown", "keydown", "touchstart"] as const;

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const startedRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const tryStart = () => {
      const el = audioRef.current;
      if (!el || startedRef.current) return;
      void el
        .play()
        .then(() => {
          startedRef.current = true;
        })
        .catch(() => {
          /* Playback refused — remaining listeners retry on next gesture. */
        });
    };
    START_EVENTS.forEach((e) => window.addEventListener(e, tryStart, { once: true }));
    return () => START_EVENTS.forEach((e) => window.removeEventListener(e, tryStart));
  }, []);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (!startedRef.current) {
      void el
        .play()
        .then(() => {
          startedRef.current = true;
        })
        .catch(() => {
          /* Stay paused — the next global gesture retries. */
        });
    }
    const nextMuted = !isMuted;
    el.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-50">
      <audio ref={audioRef} src="/audio/shining.mp3" loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={isMuted ? "Play background music" : "Mute background music"}
        aria-pressed={isMuted}
        className="flex items-center justify-center w-11 h-11 rounded-full bg-ink text-paper border border-rule shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:border-accent hover:-translate-y-0.5 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </div>
  );
}
