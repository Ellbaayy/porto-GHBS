"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type HeaderVisibility = {
  hidden: boolean;
};

const SHOW_EDGE_PX = 90;
const DIR_THRESHOLD_PX = 6;

const Ctx = createContext<HeaderVisibility>({ hidden: false });

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      if (y <= 0) {
        setHidden(false);
        return;
      }
      if (delta > DIR_THRESHOLD_PX) setHidden(true);
      else if (delta < -DIR_THRESHOLD_PX) setHidden(false);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.clientY <= SHOW_EDGE_PX) setHidden(false);
    };

    ticking = true;
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <Ctx.Provider value={{ hidden }}>{children}</Ctx.Provider>;
}

export function useHeaderVisibility() {
  return useContext(Ctx);
}