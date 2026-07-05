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
      {/* Shared defs defined once to avoid duplicating IDs */}
      <BrandIconDefs />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="flex shrink-0 items-center justify-center border-[#E9EAEB] py-6 lg:w-64 lg:border-x lg:py-8">
            <h2 className="text-center text-base font-bold text-[#1E280E] sm:text-lg lg:mx-8 lg:text-xl">
              {t("title")}
            </h2>
          </div>

          <div className="flex w-full flex-1 shrink-0 items-center lg:flex-nowrap">
            <div className="grid w-full grid-cols-4 gap-3 py-6 sm:gap-4 sm:py-8 lg:flex lg:flex-1 lg:grid-cols-none lg:gap-0 lg:py-0">
              {CONNECT_PLATFORMS.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className="flex min-w-0 items-center justify-center rounded-lg border border-[#E9EAEB] bg-zinc-50/80 p-3 sm:p-4 lg:min-w-0 lg:flex-1 lg:rounded-none lg:border-0 lg:border-r lg:border-[#E9EAEB] lg:bg-transparent lg:py-8"
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
