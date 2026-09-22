"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/base/buttons/button";
import { InteractiveDotGrid } from "@/components/InteractiveDotGrid";
import { GET_STARTED_URL, WHATSAPP_URL } from "@/config/site";
import { heroBadge, heroButton, heroDescription, heroTitle } from "@/lib/animations";

export function AboutHeroSection() {
  const t = useTranslations("about");

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(242,248,231,0.55) 100%)",
        }}
      />

      <div aria-hidden className="pointer-events-none absolute right-0 top-8 opacity-30">
        <InteractiveDotGrid dotSize={1.5} dotGap={24} gridWidth={600} gridHeight={520} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <motion.span
          variants={heroBadge}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#94C748]/20 bg-[#94C748]/10 px-4 py-1.5 text-xs font-semibold text-[#1E280E]"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#94C748]" aria-hidden />
          {t("badge")}
        </motion.span>

        <motion.h1
          variants={heroTitle}
          initial="hidden"
          animate="visible"
          className="text-display mt-5 max-w-3xl text-3xl sm:text-4xl lg:text-5xl"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          variants={heroDescription}
          initial="hidden"
          animate="visible"
          className="text-lead mt-6 max-w-2xl text-base lg:text-lg"
        >
          {t("description")}
        </motion.p>

        <motion.div
          variants={heroButton}
          initial="hidden"
          animate="visible"
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Button href={GET_STARTED_URL} size="xl" className="text-white">
            {t("ctaPrimary")}
          </Button>
          <Button href={WHATSAPP_URL} color="secondary" size="xl">
            {t("ctaSecondary")}
          </Button>
          <span className="text-detail w-full text-xs sm:w-auto sm:pl-2">{t("ctaNote")}</span>
        </motion.div>
      </div>
    </section>
  );
}
