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
      className="relative overflow-hidden bg-white py-24 sm:py-32 border-t border-[#E9EAEB]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.96), rgba(255,255,255,0.96)), url('/images/hero-swatch.png')",
        backgroundRepeat: "no-repeat, repeat",
        backgroundSize: "cover, 400px 400px",
      }}
    >
      {/* Decorative green gradient blurs */}
      <div className="pointer-events-none absolute -top-40 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#94C748]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 -z-10 h-96 w-96 rounded-full bg-[#94C748]/5 blur-3xl" />

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
