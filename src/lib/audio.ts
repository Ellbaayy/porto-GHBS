/**
 * Shared audio engine — one AudioContext + AnalyserNode for the whole page.
 *
 * MusicPlayer owns the lifecycle (ensure on first gesture, dispose on
 * unmount). Turntable and AudioBackdrop only *read* via getAudioGraph(),
 * so the track is analyzed once and every visualizer stays in sync.
 *
 * Everything is created lazily inside a user gesture (autoplay policy),
 * guarded against double-build (createMediaElementSource can bind an
 * element exactly once), and degrades to null when Web Audio is missing.
 */

export const AUDIO_FFT_SIZE = 128;

type AudioGraph = {
  ctx: AudioContext;
  analyser: AnalyserNode;
  data: Uint8Array<ArrayBuffer>;
};

let graph: AudioGraph | null = null;
let audioEl: HTMLAudioElement | null = null;
/* An element can bind to createMediaElementSource exactly once per page
   lifetime — even across remounts — so remember bound elements and never
   attempt a second bind (it would throw and leave visualizers flat). */
const bound = new WeakSet<HTMLAudioElement>();

export function ensureAudioGraph(el: HTMLAudioElement) {
  audioEl = el;
  if (graph) {
    if (graph.ctx.state === "suspended") {
      void graph.ctx.resume().catch(() => {
        /* stays suspended — music still plays through the element */
      });
    }
    return;
  }
  if (bound.has(el)) return;
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    const source = ctx.createMediaElementSource(el);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = AUDIO_FFT_SIZE;
    analyser.smoothingTimeConstant = 0.8;
    source.connect(analyser);
    analyser.connect(ctx.destination);
    graph = { ctx, analyser, data: new Uint8Array(analyser.frequencyBinCount) };
    bound.add(el);
  } catch {
    /* Web Audio unavailable — music still plays, visualizers stay flat. */
  }
}

export function getAudioGraph(): AudioGraph | null {
  return graph;
}

/** The element the graph is bound to (for play-state checks by readers). */
export function getAudioElement(): HTMLAudioElement | null {
  return audioEl;
}

export function resumeAudio() {
  const ctx = graph?.ctx;
  if (ctx && ctx.state === "suspended") {
    void ctx.resume().catch(() => {
      /* stays suspended — music still plays through the element */
    });
  }
}

/* The graph intentionally lives for the whole page lifetime: an element
   can never rebind to createMediaElementSource, so closing the context
   on unmount would strand every visualizer flat on remount. Frame loops
   are owned (and cleaned up) by each visual consumer instead. The browser
   reclaims the context on unload. */
