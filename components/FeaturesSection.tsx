"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { FeatureCard } from "@/components/base/feature-card";
import { FEATURE_ICONS, FEATURE_IDS, FEATURE_META } from "@/config/features";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const SECTION_GRADIENT =
  "linear-gradient(180deg, rgba(255, 255, 255, 1) 49%, rgba(242, 248, 231, 1) 100%)";

export function FeaturesSection() {
  const t = useTranslations("features");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden px-6 py-16 sm:px-12 lg:px-24 lg:py-24"
      style={{ background: SECTION_GRADIENT }}
    >
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16"
      >
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-[#1E280E] sm:text-5xl lg:text-[3.5rem]"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-lg text-[#535862]"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 sm:grid-cols-2 lg:gap-10"
        >
          {FEATURE_IDS.map((id) => {
            const meta = FEATURE_META[id];
            const badge = meta.hasBadge
              ? t("availableNow")
              : meta.comingSoon
                ? t("comingSoon")
                : undefined;

            return (
              <motion.div key={id} variants={staggerItem} className="h-full">
                <FeatureCard
                  icon={FEATURE_ICONS[id]}
                  title={t(`items.${id}.title`)}
                  description={t(`items.${id}.description`)}
                  badge={badge}
                  coverImage={meta.coverImage}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
