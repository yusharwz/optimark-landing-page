"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
import { heroBadge, heroTitle, heroDescription, heroImage } from "@/lib/animations";

export function HeroSection() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(SplitText) 
  const contentRef = useRef<HTMLDivElement>(null);
  let split, animation;

  useGSAP(
    () => {
      const section = sectionRef.current;
      const content = contentRef.current;
      if (!section || !content) return;

      // Pin + scrub only on desktop with motion allowed. matchMedia auto-reverts
      // the effect (and any pinning) when the query stops matching.
      const mm = gsap.matchMedia();
      gsap.to("h1", { duration: 5 ,text: `${t("title")}`});
      split = SplitText.create("p", { type: "lines" });
      animation = gsap.from(split.lines, {
        rotationX: -100,
        transformOrigin: "50% 50% -160px",
        opacity: 0,
        duration: 5, 
        ease: "power3",
        stagger: 0.02
      });


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
        className="relative mx-auto flex w-full max-w-7xl flex-col px-4 pb-24 pt-24 sm:px-6 lg:px-8 lg:pb-32 lg:pt-28"
      >
        <div className="flex flex-col-reverse gap-12 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex-3 space-y-6 text-center lg:space-y-8 lg:text-left">
            <motion.div
              variants={heroBadge}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm"
            >
              <span className="font-medium text-[#5925DC]">{t("badge")}</span>
            </motion.div>

            <motion.div
              variants={heroTitle}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <h1 className="text-display text-balance text-3xl tracking-tight sm:text-4xl lg:text-[3.5rem] lg:leading-[1.1]">
              </h1>
              <motion.div variants={heroDescription}>
                <p className="text-lead mx-auto max-w-xl text-base sm:text-lg lg:mx-0">
                  {t("description")}
                </p>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            variants={heroImage}
            initial="hidden"
            animate="visible"
            className="mt-8 flex-2 lg:mt-0"
          >
            <BrowserMockup alt={t("imageAlt")} />
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
