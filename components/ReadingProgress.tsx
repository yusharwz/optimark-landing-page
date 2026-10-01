"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

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
      <div
        ref={barRef}
        className="h-full origin-left bg-[#94C748]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
