"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/base/buttons/button";
import { gsap, useGSAP } from "@/lib/gsap";

export function CtaSection() {
  const t = useTranslations("cta");
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current) return;

      gsap.fromTo(
        contentRef.current,
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="cta"
      ref={containerRef}
      // Transparent: the shared fixed dot canvas (HeroFeaturesBackground) shows
      // through so this section blends seamlessly with its neighbors. No local
      // decorative blurs — they would get clipped at the section edges.
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div
        ref={contentRef}
        className="relative mx-auto max-w-4xl px-6 text-center sm:px-12 lg:px-24"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#94C748]/10 px-4 py-1.5 text-xs font-semibold text-emerald-700 border border-[#94C748]/20">
          Optimark
        </span>
        <h2 className="text-display text-4xl sm:text-5xl lg:text-6xl mt-6 leading-tight max-w-3xl mx-auto">
          {t("title")}
        </h2>
        <p className="text-lead mx-auto mt-6 max-w-xl text-base sm:text-lg lg:text-xl">
          {t("description")}
        </p>
        <div className="mt-10">
          <Button href="/pricing" size="xl" className="sm:px-10 text-white">
            {t("button")}
          </Button>
        </div>
      </div>
    </section>
  );
}
