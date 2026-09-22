"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CONNECT_PLATFORMS } from "@/config/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { BrandIcon, BrandIconDefs } from "@/components/BrandIcon";

export function ConnectSection() {
  const t = useTranslations("connect");
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 55%",
          end: "bottom 25%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(".connect-icon-gray", {
        opacity: 0,
        duration: 1.8,
        stagger: 0.35,
        ease: "power2.inOut",
      })
      .to(".connect-icon-color", {
        opacity: 1,
        duration: 1.8,
        stagger: 0.35,
        ease: "power2.inOut",
      }, "<");
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative z-10 overflow-x-hidden border-b border-t border-[#E9EAEB] bg-white">
      {/* Shared gradient/clip defs for colored brand icons */}
      <BrandIconDefs />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          {/* The headline now carries a full sentence of supporting copy, which
              the old 16rem side column could not hold without wrapping to ~8
              lines — so the copy sits above the logo strip instead of beside
              it, and the strip runs the full width. */}
          <div className="mx-auto max-w-2xl pt-12 text-center lg:pt-16">
            <h2 className="text-display text-2xl sm:text-3xl lg:text-4xl">{t("title")}</h2>
            <p className="text-lead mt-4 text-base sm:text-lg">{t("description")}</p>
          </div>

          <div className="mt-8 flex w-full shrink-0 items-center lg:mt-12 lg:flex-nowrap">
            <div className="grid w-full grid-cols-4 gap-3 pb-8 sm:gap-4 lg:flex lg:flex-1 lg:grid-cols-none lg:gap-0 lg:border-t lg:border-[#E9EAEB] lg:pb-0">
              {CONNECT_PLATFORMS.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className="flex min-w-0 items-center justify-center rounded-lg border border-[#E9EAEB] bg-zinc-50/80 p-3 sm:p-4 lg:min-w-0 lg:flex-1 lg:rounded-none lg:border-0 lg:border-r lg:border-[#E9EAEB] lg:bg-transparent lg:py-8 lg:last:border-r-0"
                >
                  <div className="relative h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex items-center justify-center">
                    <div className="connect-icon-gray absolute inset-0 opacity-100 flex items-center justify-center pointer-events-none">
                      <BrandIcon
                        name={platform.name}
                        isColor={false}
                        className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 object-contain"
                      />
                    </div>
                    <div className="connect-icon-color absolute inset-0 opacity-0 flex items-center justify-center pointer-events-none">
                      <BrandIcon
                        name={platform.name}
                        isColor={true}
                        className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 object-contain"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
