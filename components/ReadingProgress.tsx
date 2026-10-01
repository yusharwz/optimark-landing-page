"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

/**
 * A 2px brand bar pinned to the very top of the viewport, above the header,
 * that fills as the reader moves through `targetId` (the article body).
 *
 * Writes the width straight to the DOM from a rAF-throttled scroll handler, so
 * scrolling never re-renders React.
 */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const t = useTranslations("blog.post");
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    const bar = barRef.current;
    if (!target || !bar) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = target.getBoundingClientRect();
      // 0 when the article top reaches the viewport top, 1 when its bottom
      // reaches the viewport bottom.
      const distance = rect.height - window.innerHeight;
      const progress = distance > 0 ? -rect.top / distance : rect.top <= 0 ? 1 : 0;
      const clamped = Math.min(1, Math.max(0, progress));
      bar.style.transform = `scaleX(${clamped})`;
      bar.parentElement?.setAttribute("aria-valuenow", String(Math.round(clamped * 100)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [targetId]);

  return (
    <div
      role="progressbar"
      aria-label={t("readingProgress")}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      className="pointer-events-none fixed inset-x-0 top-0 z-60 h-0.5"
    >
      {/* Inline transform, not a scale-x-* class: Tailwind 4 scale utilities
          use the `scale` property, which would compound with the transform. */}
      <div
        ref={barRef}
        className="h-full origin-left bg-[#94C748]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
