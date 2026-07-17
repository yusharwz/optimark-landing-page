"use client";

import { useEffect, useState } from "react";
import { InteractiveDotGrid } from "@/components/InteractiveDotGrid";

// Mostly white so the hero stays clean, with a faint green settle toward the
// bottom for continuity into the features area.
const BG_GRADIENT =
  "linear-gradient(180deg, #ffffff 0%, #ffffff 55%, #f4f9ea 100%)";

/**
 * A single persistent background (soft gradient + interactive dot grid) shared
 * by every section of the landing page. It is `fixed` so it stays pinned in
 * the viewport while the content scrolls past (parallax) — sections render
 * transparent above it so the whole page reads as one continuous canvas.
 * Opaque sections (Connect, Footer) simply paint over it.
 */
export function HeroFeaturesBackground() {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // The layer is behind content (pointer-events: none), so track the pointer
    // at the window level. The layer is viewport-aligned (sticky, top-0), so
    // client coordinates map directly onto the canvas.
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
    // Viewport-fixed layer behind all content: takes no layout space and the
    // dots stay glued to the screen while the page scrolls over them.
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ background: BG_GRADIENT }}
    >
      <InteractiveDotGrid
        className="absolute inset-0 h-full w-full"
        mousePosition={mousePos}
      />
    </div>
  );
}
