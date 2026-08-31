"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/base/buttons/button";
import { GET_STARTED_URL, SITE } from "@/config/site";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function PricingFreeTrial() {
  const t = useTranslations("pricingTrial");
  const features = t.raw("features") as string[];

  return (
    <section className="relative overflow-hidden px-6 py-16 sm:px-12 lg:px-24 lg:py-24">
      <motion.div
        className="relative z-10 mx-auto max-w-7xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={fadeInUp} className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#94C748]/30 bg-[#94C748]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1E280E]">
            <Sparkles className="h-3.5 w-3.5 text-[#94C748]" />
            {t("badge")}
          </div>
          <h2 className="text-display text-4xl sm:text-5xl lg:text-[3.5rem]">
            {t("title")}
          </h2>
          <p className="text-lead mx-auto mt-6 max-w-2xl text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mx-auto mt-14 w-full max-w-md rounded-3xl border border-[#94C748] bg-white p-8 shadow-md ring-2 ring-[#94C748]/10"
        >
          <div className="rounded-2xl border border-[#94C748]/25 bg-[#94C748]/6 px-6 py-6 text-center">
            <div className="text-[#94C748] supports-[background-clip:text]:text-transparent bg-linear-to-br from-[#94C748] to-[#5C9E2F] bg-clip-text text-6xl font-extrabold leading-none sm:text-7xl">
              {t("tokenAmount")}
            </div>
            <div className="mt-2 text-base font-bold uppercase tracking-wider text-[#1E280E]">
              {t("tokenLabel")}
            </div>
            <div className="mt-1 text-xs text-[#535862]">{t("tokenGrant")}</div>
          </div>

          <p className="mt-4 text-center text-sm text-[#535862]">{t("priceNote")}</p>

          <div className="mt-6 border-t border-[#F2F4F7] pt-6">
            <p className="text-xs font-bold uppercase tracking-wider text-[#98A2B3]">
              {t("featuresHeader")}
            </p>
            <ul className="mt-4 space-y-3">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 text-sm text-[#1E280E]"
                >
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#94C748]/10">
                    <Check className="h-3 w-3 text-[#94C748]" strokeWidth={3} />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            href={GET_STARTED_URL}
            color="primary"
            size="lg"
            className="mt-8 w-full"
          >
            <span className="flex items-center justify-center gap-2">
              {t("cta")}
              <ArrowRight className="h-4 w-4" />
            </span>
          </Button>

          <p className="mt-3 text-center text-xs text-[#98A2B3]">
            {t("footnote")}
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-10 text-center text-sm text-[#535862]"
        >
          {t("contactLine")}{" "}
          <a
            href={`mailto:${SITE.contactEmail}`}
            className="font-semibold text-[#D444F1] underline decoration-[#D444F1]/30 underline-offset-4 hover:decoration-[#D444F1]"
          >
            {t("contactCta")}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
