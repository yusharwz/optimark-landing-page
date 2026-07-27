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
      // Opaque dark-green band that paints over the shared fixed canvas, with a
      // single soft green orb glow centered behind the content (blurred + low
      // opacity). overflow-hidden clips the blur to the section edges.
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ backgroundColor: "#15200f" }}
    >
      {/* Centered green glow orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 500,
          height: 500,
          background: "#7bad3e",
          opacity: 0.22,
          filter: "blur(130px)",
        }}
      />
      <div
        ref={contentRef}
        className="relative mx-auto max-w-4xl px-6 text-center sm:px-12 lg:px-24"
      >
        <h2
          className="text-display text-4xl sm:text-5xl lg:text-6xl mt-6 leading-tight max-w-3xl mx-auto"
          style={{ color: "#ffffff" }}
        >
          {t("title")}
        </h2>
        <p
          className="text-lead mx-auto mt-6 max-w-xl text-base sm:text-lg lg:text-xl"
          style={{ color: "#aab4a6" }}
        >
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
