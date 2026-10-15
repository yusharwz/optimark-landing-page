"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/base/buttons/button";
import { InteractiveDotGrid } from "@/components/InteractiveDotGrid";
import { useCallback, useState } from "react";
import { FEATURE_ICONS, FEATURE_IDS, FEATURE_META } from "@/config/features";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export function BentoHeroSection() {
  const t = useTranslations("hero");
  const tFeatures = useTranslations("features");
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
  }, []);

  const topFeatures = FEATURE_IDS.slice(0, 4);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-white px-4 py-16 sm:px-6 lg:px-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <InteractiveDotGrid
          className="absolute inset-0 h-full w-full"
          mousePosition={mousePos}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Hero Content */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-12 text-center lg:mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm"
          >
            <span className="font-medium text-[#5925DC]">{t("badge")}</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mb-6 text-balance text-4xl font-bold tracking-tight text-[#1E280E] sm:text-5xl lg:text-[4rem] lg:leading-[1.1]"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mb-8 max-w-2xl text-lg text-[#535862]"
          >
            {t("description")}
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Button
              href="#"
              color="primary"
              size="lg"
              className="px-8"
            >
              {t("cta")}
            </Button>
          </motion.div>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid auto-rows-fr gap-4 lg:grid-cols-6 lg:gap-6"
        >
          {/* Large Hero Image Card - Takes 2 rows on desktop */}
          <motion.div
            variants={staggerItem}
            className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-brand-50 to-white p-8 shadow-lg lg:col-span-3 lg:row-span-2"
          >
            <div className="relative h-full min-h-[400px]">
              <Image
                src="/images/hero-illustration.svg"
                alt={t("imageAlt")}
                fill
                priority
                className="object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Feature Cards - Bento style */}
          {topFeatures.map((id, index) => {
            const meta = FEATURE_META[id];
            const Icon = FEATURE_ICONS[id];
            const badge = meta.hasBadge
              ? tFeatures("availableNow")
              : meta.comingSoon
                ? tFeatures("comingSoon")
                : undefined;

            // Vary the grid spans for visual interest
            const gridClass = index === 0
              ? "lg:col-span-3 lg:row-span-1"
              : index === 1
                ? "lg:col-span-2 lg:row-span-1"
                : index === 2
                  ? "lg:col-span-1 lg:row-span-1"
                  : "lg:col-span-3 lg:row-span-1";

            return (
              <motion.div
                key={id}
                variants={staggerItem}
                className={`group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl ${gridClass}`}
              >
                {badge && (
                  <span className="absolute right-4 top-4 rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700">
                    {badge}
                  </span>
                )}

                {meta.coverImage && (
                  <div className="absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20">
                    <Image
                      src={meta.coverImage}
                      alt={tFeatures(`items.${id}.title`) || "Fitur Optimark"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-4 inline-flex rounded-2xl bg-brand-100 p-3 text-brand-600 transition-colors group-hover:bg-brand-200">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-[#1E280E]">
                      {tFeatures(`items.${id}.title`)}
                    </h3>
                    <p className="text-sm text-[#535862]">
                      {tFeatures(`items.${id}.description`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
