"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { heroBadge, heroTitle, heroDescription, heroImage } from "@/lib/animations";
import { AiCaptionModal } from "./ai-caption";

export function HeroSection() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const content = contentRef.current;
      if (!section || !content) return;

      // Pin + scrub only on desktop with motion allowed. matchMedia auto-reverts
      // the effect (and any pinning) when the query stops matching.
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=80%", // scroll distance over which the hero fades out
              scrub: true,
              pin: true,
              pinSpacing: true, // hold the hero in place; features waits below
              anticipatePin: 1,
            },
          });

          // Only the hero *content* recedes (fade + shrink + drift up). The dot
          // grid lives in the shared HeroFeaturesBackground and stays put, so
          // the features text simply fades in over the same background.
          tl.to(content, { opacity: 0, scale: 0.94, y: -60, ease: "power1.in" }, 0);
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex min-h-screen items-center overflow-hidden"
    >
      <div
        ref={contentRef}
        className="relative mx-auto flex w-full max-w-7xl flex-col px-4 pt-24 pb-16 sm:px-6 lg:px-8 lg:pt-16 lg:pb-16"
      >
        <div className="mx-auto grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="mx-auto w-full max-w-xl space-y-6 text-center lg:mx-0 lg:max-w-md lg:space-y-8 lg:text-left">
            <motion.div
              variants={heroBadge}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 rounded-full border border-[#F5D0FE] bg-[#FDF4FF] px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm"
            >
              <span className="font-medium text-[#D444F1]">{t("badge")}</span>
            </motion.div>

            <motion.div
              variants={heroTitle}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <h1 className="text-display text-balance text-3xl tracking-tight sm:text-4xl lg:text-[3.75rem] lg:leading-[1.1]">
                {t("title")}
              </h1>
              <motion.div variants={heroDescription}>
                <p className="text-lead text-base sm:text-lg">
                  {t("description")}
                </p>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            variants={heroImage}
            initial="hidden"
            animate="visible"
            className="mt-8 flex w-full justify-center lg:mt-0 lg:justify-end"
          >
            <AiCaptionModal className="pointer-events-none w-full shadow-2xl"></AiCaptionModal>
            {/* <BrowserMockup alt={t("imageAlt")} /> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BrowserMockup({ alt }: { alt: string }) {
  return (
    <div className="relative mx-auto max-w-2xl">
      <Image
        src="/images/hero-illustration.svg"
        alt={alt}
        width={800}
        height={640}
        priority
        className="h-auto w-full"
      />
    </div>
  );
}
