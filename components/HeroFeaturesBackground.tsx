"use client";

import { useEffect, useState } from "react";

// Mostly white so the hero stays clean, with a faint green settle toward the
// bottom for continuity into the features area.
const BG_GRADIENT =
  "linear-gradient(180deg, #ffffff 0%, #ffffff 55%, #f4f9ea 100%)";

const GLOW_SIZE = 480;

/**
 * A single persistent background (soft gradient + cursor glow) shared by every
 * section of the landing page. It is `fixed` so it stays pinned in the
 * viewport while the content scrolls past (parallax) — sections render
 * transparent above it so the whole page reads as one continuous canvas.
 * Opaque sections (Connect, Footer) simply paint over it.
 */
export function HeroFeaturesBackground() {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // The layer is behind content (pointer-events: none), so track the pointer
    // at the window level. The layer is viewport-aligned (fixed, inset-0), so
    // client coordinates map directly onto it.
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    const onLeave = () => setMousePos(null);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    // Viewport-fixed layer behind all content: takes no layout space and stays
    // glued to the screen while the page scrolls over it.
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ background: BG_GRADIENT }}
    >
      {/* Soft dark spot trailing the cursor */}
      <div
        className="absolute rounded-full transition-[transform,opacity] duration-300 ease-out"
        style={{
          width: GLOW_SIZE,
          height: GLOW_SIZE,
          opacity: mousePos ? 1 : 0,
          transform: mousePos
            ? `translate(${mousePos.x - GLOW_SIZE / 2}px, ${mousePos.y - GLOW_SIZE / 2}px)`
            : undefined,
          background:
            "radial-gradient(circle, rgba(20, 30, 14, 0.06) 0%, rgba(30, 40, 14, 0.03) 45%, transparent 70%)",
        }}
      />
    </div>
  );
}
