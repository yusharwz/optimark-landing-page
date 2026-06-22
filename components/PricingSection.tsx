"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/base/buttons/button";
import { Check, X } from "lucide-react";
import { PRICING_TIERS } from "@/config/pricing";
import { SITE } from "@/config/site";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const SECTION_GRADIENT =
  "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(242, 248, 231, 1) 100%)";

export function PricingSection() {
  const t = useTranslations("pricing");

  return (
    <section className="relative overflow-hidden px-6 py-16 sm:px-12 lg:px-24 lg:py-24">
      <div className="absolute inset-0" style={{ background: SECTION_GRADIENT }} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "url('/images/hero-swatch.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "400px 400px",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={fadeInUp} className="text-center">
          <h2 className="text-4xl font-bold text-[#1E280E] sm:text-5xl lg:text-[3.5rem]">
            {t("title")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#535862]">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PRICING_TIERS.map((tier) => (
            <motion.div key={tier.id} variants={staggerItem} className="relative flex flex-col">
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#5925DC] px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                    </span>
                    {t("mostPopular")}
                  </span>
                </div>
              )}

              <div
                className={`flex h-full flex-col rounded-2xl border bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl ${
                  tier.isPopular
                    ? "border-[#5925DC] ring-2 ring-[#5925DC]/10"
                    : "border-[#E9EAEB]"
                }`}
              >
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#1E280E]">
                    {t(`tiers.${tier.id}.name`)}
                  </h3>
                </div>

                <div className="mt-6 text-center">
                  {tier.price === 0 ? (
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-[#1E280E]">
                        {t("free")}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-2xl font-semibold text-[#535862]">Rp</span>
                      <span className="text-5xl font-bold text-[#1E280E]">
                        {(tier.price / 1000).toFixed(0)}K
                      </span>
                      <span className="text-lg font-medium text-[#535862]">
                        {t("perMonth")}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F3FF] px-3 py-1.5">
                    <span className="text-sm font-medium text-[#5925DC]">
                      {t("tokensPerMonth", {
                        count: tier.tokensPerMonth.toLocaleString(),
                      })}
                    </span>
                  </div>
                </div>

                <ul className="mt-8 flex-1 space-y-4">
                  {tier.featureKeys.map((feature) => (
                    <li key={feature.key} className="flex items-start gap-3">
                      {feature.included ? (
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#94C748]/10">
                          <Check className="h-3.5 w-3.5 text-[#94C748]" strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F2F4F7]">
                          <X className="h-3.5 w-3.5 text-[#98A2B3]" strokeWidth={2} />
                        </div>
                      )}
                      <span
                        className={`text-sm ${
                          feature.included ? "text-[#1E280E]" : "text-[#98A2B3]"
                        }`}
                      >
                        {t(`features.${feature.key}`)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    href="#"
                    color={tier.isPopular ? "primary" : "secondary"}
                    size="lg"
                    className="w-full"
                  >
                    {t(`tiers.${tier.id}.cta`)}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-16 text-center">
          <p className="text-sm text-[#535862]">
            {t("customPlan")}{" "}
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="font-semibold text-[#5925DC] underline decoration-[#5925DC]/30 underline-offset-4 transition-colors hover:decoration-[#5925DC]"
            >
              {t("contactUs")}
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
