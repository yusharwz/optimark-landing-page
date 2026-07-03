"use client";

import { useEffect, useState } from "react";
import { InteractiveDotGrid } from "@/components/InteractiveDotGrid";

// Mostly white so the hero stays clean, with a faint green settle toward the
// bottom for continuity into the features area.
const BG_GRADIENT =
  "linear-gradient(180deg, #ffffff 0%, #ffffff 55%, #f4f9ea 100%)";

/**
 * A single persistent background (soft gradient + interactive dot grid) shared
 * by the hero and features sections. It is `sticky` so it stays fixed in the
 * viewport while you scroll through both sections — the hero text fades out and
 * the features fade in over the *same* canvas, instead of a new section
 * sliding into view. Rendered behind content (z-0); content sits above it.
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
    // Outer is sticky but takes NO layout space (h-0) so it does not push the
    // hero down. The inner layer is a viewport-tall absolute box that sticks in
    // view while scrolling through the hero + features region.
    <div
      aria-hidden
      className="pointer-events-none sticky top-0 z-0 h-0"
    >
      <div
        className="absolute inset-x-0 top-0 h-screen w-full overflow-hidden"
        style={{ background: BG_GRADIENT }}
      >
        <InteractiveDotGrid
          className="absolute inset-0 h-full w-full"
          mousePosition={mousePos}
        />
      </div>
    </div>
  );
}
