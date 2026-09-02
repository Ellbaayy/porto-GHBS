"use client";

import { useEffect, useMemo, useRef } from "react";

/* ------------------------------------------------------------------
   AmbientBackground — banyak objek geometris kecil yang melayang
   (float) dan bereaksi halus terhadap scroll (parallax depth).
   Murni dekoratif: pointer-events-none, di belakang konten (z-0),
   objek paling pekat di tepi layar biar teks di tengah tetap kebaca.
------------------------------------------------------------------- */

type Shape = "dot" | "ring" | "diamond" | "square" | "cross";

type Particle = {
  id: number;
  shape: Shape;
  left: number; // % posisi awal
  top: number; // % posisi awal
  size: number; // px
  parallax: number; // kecepatan relatif thd scroll (depth)
  opacity: number;
  drift: number; // px amplitudo float vertikal
  duration: number; // detik satu siklus float
  delay: number; // detik
  color: string;
  blur?: boolean;
};

const COLORS = [
  "var(--lemon-deep)", // cream terang
  "var(--ink)", // cream
  "var(--coral-deep)", // karamel muda
  "var(--ink-soft)", // taupe terang
  "var(--accent)", // caramel
  "var(--coral)", // karamel
];

// Generator deterministik (seeded) — supaya konsisten antara server & client
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildParticles(): Particle[] {
  const rand = mulberry32(20260902);
  const shapes: Shape[] = ["dot", "dot", "dot", "ring", "ring", "diamond", "square", "cross"];
  const parts: Particle[] = [];

  for (let i = 0; i < 64; i++) {
    // Bias ke tepi: 58% objek di 0–18% / 82–100% kiri; sisanya di tengah tapi redup
    const edge = rand() < 0.58;
    let left: number;
    if (edge) left = rand() < 0.5 ? rand() * 18 : 82 + rand() * 18;
    else left = 18 + rand() * 64;

    // Dua "depth": 0 = jauh (kecil, lambat, redup), 1 = dekat (lebih besar, cepat, terang)
    const depth = rand() < 0.62 ? 0 : 1;
    const big = rand() < 0.2;
    const size = depth === 0
      ? (shapes[i % shapes.length] === "dot" ? 1.5 + rand() * 5 : 6 + rand() * 10)
      : (shapes[i % shapes.length] === "dot" ? 3 + rand() * 8 : big ? 24 + rand() * 22 : 9 + rand() * 13);

    parts.push({
      id: i,
      shape: shapes[i % shapes.length],
      left,
      top: rand() * 100,
      size: Math.round(size),
      parallax: depth === 0 ? 0.012 + rand() * 0.06 : 0.09 + rand() * 0.16,
      opacity: edge
        ? depth === 0
          ? 0.22 + rand() * 0.16
          : 0.42 + rand() * 0.3
        : depth === 0
          ? 0.07 + rand() * 0.06
          : 0.14 + rand() * 0.12,
      drift: 6 + rand() * 22,
      duration: 7 + rand() * 12,
      delay: rand() * -14, // negatif = langsung mulai di tengah siklus
      color: COLORS[i % COLORS.length],
      blur: depth === 0 ? rand() < 0.3 : rand() < 0.15,
    });
  }
  return parts;
}

export function AmbientBackground() {
  const particles = useMemo(buildParticles, []);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = layerRefs.current;
    let raf = 0;
    let y = 0;

    const onScroll = () => {
      y = window.scrollY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const apply = () => {
      raf = 0;
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (!el) continue;
        // gerak ke atas saat scroll ke bawah → efek kedalaman (parallax)
        el.style.transform = `translate3d(0, ${-y * particles[i].parallax}px, 0)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [particles]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {particles.map((p, i) => {
        let inner: React.ReactNode = null;
        const sizeStyle = { width: p.size, height: p.size };

        if (p.shape === "dot") {
          inner = <span style={{ ...sizeStyle, background: p.color, borderRadius: 999 }} />;
        } else if (p.shape === "ring") {
          inner = (
            <span
              style={{
                ...sizeStyle,
                borderRadius: 999,
                border: `1.5px solid ${p.color}`,
              }}
            />
          );
        } else if (p.shape === "diamond") {
          inner = (
            <span
              style={{
                ...sizeStyle,
                borderRadius: 3,
                border: `1.5px solid ${p.color}`,
                transform: "rotate(45deg)",
              }}
            />
          );
        } else if (p.shape === "square") {
          inner = (
            <span
              style={{ ...sizeStyle, borderRadius: 2, background: p.color, opacity: 0.7 }}
            />
          );
        } else {
          // cross: dua batang tipis
          inner = (
            <span className="relative block" style={sizeStyle}>
              <span
                className="absolute left-1/2 top-0 -translate-x-1/2"
                style={{ width: 1.5, height: p.size, background: p.color }}
              />
              <span
                className="absolute top-1/2 left-0 -translate-y-1/2"
                style={{ width: p.size, height: 1.5, background: p.color }}
              />
            </span>
          );
        }

        return (
          <div
            key={p.id}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            className="absolute will-change-transform"
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
          >
            <span
              className="block animate-float"
              style={{
                opacity: p.opacity,
                filter: p.blur ? "blur(1px)" : undefined,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                // float naik-turun lembut + goyang kecil
                ["--drift" as never]: `${p.drift}px`,
              }}
            >
              {inner}
            </span>
          </div>
        );
      })}
    </div>
  );
}
