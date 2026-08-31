"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Check, Sliders, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/base/buttons/button";
import { TOKEN_PACKAGES, type TokenPackage } from "@/config/pricing";
import { SITE } from "@/config/site";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { cx } from "@/utils/cx";

interface SliderConfig {
  id: string;
  label: string;
  max: number;
  tokensPerUnit: number;
  hint: string;
}

const SLIDER_CONFIGS: SliderConfig[] = [
  {
    id: "captions",
    label: "Social media captions & copy / month",
    max: 200,
    tokensPerUnit: 2,
    hint: "e.g. 30 posts/mo ≈ 60 tokens",
  },
  {
    id: "articles",
    label: "Blog articles & long-form content / month",
    max: 40,
    tokensPerUnit: 5,
    hint: "e.g. 8 articles/mo ≈ 40 tokens",
  },
  {
    id: "images",
    label: "AI-generated images & visuals / month",
    max: 50,
    tokensPerUnit: 10,
    hint: "e.g. 20 images/mo ≈ 200 tokens",
  },
  {
    id: "seo",
    label: "Keyword research & SEO audits / month",
    max: 20,
    tokensPerUnit: 5,
    hint: "e.g. 10 audits/mo ≈ 50 tokens",
  },
  {
    id: "marketplace",
    label: "Marketplace intelligence queries / month",
    max: 50,
    tokensPerUnit: 3,
    hint: "e.g. 20 queries/mo ≈ 60 tokens",
  },
  {
    id: "ads",
    label: "Ad campaigns optimized / month",
    max: 10,
    tokensPerUnit: 15,
    hint: "e.g. 4 campaigns/mo ≈ 60 tokens",
  },
];

const noopSubscribe = () => () => {};

export function PricingSection({ showEstimator = true }: { showEstimator?: boolean } = {}) {
  const t = useTranslations("pricing");
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({
    captions: 0,
    articles: 0,
    images: 0,
    seo: 0,
    marketplace: 0,
    ads: 0,
  });
  const [showNotification, setShowNotification] = useState(false);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const totalTokens = useMemo(() => {
    return SLIDER_CONFIGS.reduce((sum, config) => {
      return sum + (sliderValues[config.id] || 0) * config.tokensPerUnit;
    }, 0);
  }, [sliderValues]);

  const recommendedPackage = useMemo<TokenPackage>(() => {
    if (totalTokens === 0) return TOKEN_PACKAGES[0];
    for (const pkg of TOKEN_PACKAGES) {
      if (pkg.tokens >= totalTokens) {
        return pkg;
      }
    }
    return TOKEN_PACKAGES[TOKEN_PACKAGES.length - 1];
  }, [totalTokens]);

  const handleSliderChange = (id: string, value: number) => {
    setSliderValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleComingSoon = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const commonFeatures = [
    t("noSubscription"),
    t("neverExpires"),
    t("accessAllFeatures"),
    t("prioritySupport"),
  ];

  type UsageKey = "captions" | "articles" | "images" | "seo" | "marketplace" | "ads";
  const usageItems: Array<{ key: UsageKey; rate: string }> = [
    { key: "captions", rate: t("usageGuide.captionsRate") },
    { key: "articles", rate: t("usageGuide.articlesRate") },
    { key: "images", rate: t("usageGuide.imagesRate") },
    { key: "seo", rate: t("usageGuide.seoRate") },
    { key: "marketplace", rate: t("usageGuide.marketplaceRate") },
    { key: "ads", rate: t("usageGuide.adsRate") },
  ];

  return (
    <section className="relative overflow-hidden px-6 py-16 sm:px-12 lg:px-24 lg:py-24">
      {mounted &&
        showNotification &&
        createPortal(
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed left-1/2 top-8 z-[60] -translate-x-1/2"
          >
            <div className="flex items-center gap-3 rounded-full border border-[#94C748]/20 bg-white px-6 py-3 shadow-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#94C748]/10">
                <span className="text-xl">🚀</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1E280E]">{t("comingSoonTitle")}</p>
                <p className="text-xs text-[#535862]">{t("comingSoonDescription")}</p>
              </div>
            </div>
          </motion.div>,
          document.body,
        )}

      <motion.div
        className="relative z-10 mx-auto max-w-7xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={fadeInUp} className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#94C748]/30 bg-[#94C748]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1E280E]">
            <Zap className="h-3.5 w-3.5 text-[#94C748]" />
            {t("badge")}
          </div>
          <h2 className="text-display text-4xl sm:text-5xl lg:text-[3.5rem]">
            {t("title")}
          </h2>
          <p className="text-lead mx-auto mt-6 max-w-2xl text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Token Packages Grid */}
        <motion.div
          variants={staggerContainer}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {TOKEN_PACKAGES.map((pkg) => (
            <motion.div key={pkg.id} variants={staggerItem} className="relative flex flex-col">
              {(pkg.isPopular || pkg.isBestValue || pkg.savings) && (
                <div className="absolute -top-3.5 left-1/2 z-30 -translate-x-1/2">
                  <span
                    className={cx(
                      "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold text-white shadow-md whitespace-nowrap",
                      pkg.isPopular
                        ? "bg-[#94C748]"
                        : pkg.isBestValue
                        ? "bg-[#D444F1]"
                        : "bg-[#1E280E]"
                    )}
                  >
                    {pkg.isPopular ? (
                      <>
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                        </span>
                        {t("mostPopular")}
                      </>
                    ) : pkg.isBestValue ? (
                      <>
                        <Sparkles className="h-3 w-3 fill-current" />
                        {t("bestValue")}
                      </>
                    ) : (
                      t("savings", { percent: pkg.savings ?? "" })
                    )}
                  </span>
                </div>
              )}

              <div
                onMouseMove={handleMouseMove}
                className={cx(
                  "group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                  pkg.isPopular
                    ? "border-[#94C748] ring-2 ring-[#94C748]/10"
                    : pkg.isBestValue
                    ? "border-[#D444F1] ring-2 ring-[#D444F1]/10"
                    : "border-[#E9EAEB]"
                )}
              >
                {/* Background Spotlight Glow */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
                  style={{
                    background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(148, 199, 72, 0.08), transparent 80%)`,
                  }}
                />

                <div className="relative z-20 flex h-full flex-col">
                  {/* Token Count Header */}
                  <div className="text-center pt-2">
                    <div className="text-3xl font-extrabold text-[#1E280E]">
                      {pkg.tokens.toLocaleString()}
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#535862]">
                      Tokens
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-5 text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-xl font-bold text-[#535862]">Rp</span>
                      <span className="text-4xl font-extrabold text-[#1E280E]">
                        {(pkg.price / 1000).toLocaleString()}K
                      </span>
                    </div>
                    <div className="mt-1 text-xs font-semibold text-[#94C748]">
                      Rp {pkg.pricePerToken.toLocaleString()} {t("perToken")}
                    </div>
                    {pkg.savings && !pkg.isPopular && !pkg.isBestValue && (
                      <div className="mt-1.5 inline-block rounded-full bg-[#94C748]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#1E280E]">
                        {t("savings", { percent: pkg.savings })}
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="mt-6 flex-1 space-y-3 border-t border-[#F2F4F7] pt-6">
                    {commonFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#1E280E]">
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#94C748]/10 mt-0.5">
                          <Check className="h-3 w-3 text-[#94C748]" strokeWidth={3} />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="mt-6">
                    <Button
                      onClick={handleComingSoon}
                      color={pkg.isPopular || pkg.isBestValue ? "primary" : "secondary"}
                      size="md"
                      className="w-full text-xs font-bold"
                    >
                      {t("buyTokens")}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Token Usage Reference Card */}
        <motion.div variants={fadeInUp} className="mt-16 rounded-3xl border border-[#E9EAEB] bg-white p-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-[#1E280E]">
              {t("usageGuide.title")}
            </h3>
            <p className="mt-2 text-sm text-[#535862]">
              {t("usageGuide.subtitle")}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {usageItems.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between rounded-2xl border border-[#F2F4F7] bg-[#F9FAFB] p-4"
              >
                <span className="text-sm font-medium text-[#1E280E]">
                  {t(`usageGuide.${item.key}`)}
                </span>
                <span className="shrink-0 rounded-full bg-[#94C748]/15 px-3 py-1 text-xs font-bold text-[#1E280E]">
                  {item.rate}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {showEstimator && (
          <motion.div variants={fadeInUp} className="mt-20">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
                <Sliders className="h-4 w-4" />
                {t("estimator.badge")}
              </div>
              <h2 className="text-3xl font-bold text-[#1E280E] sm:text-4xl">
                {t("estimator.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[#535862]">
                {t("estimator.subtitle")}
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-[1fr,340px]">
              <div className="rounded-2xl border border-[#E9EAEB] bg-white p-8 shadow-sm">
                <h3 className="text-xl font-bold text-[#1E280E]">
                  {t("estimator.slidersTitle")}
                </h3>
                <p className="mt-2 text-sm text-[#535862]">
                  {t("estimator.slidersSubtitle")}
                </p>

                <div className="mt-8 space-y-6">
                  {SLIDER_CONFIGS.map((config) => (
                    <div key={config.id}>
                      <div className="mb-2 flex items-baseline justify-between">
                        <label
                          htmlFor={`slider-${config.id}`}
                          className="text-sm font-semibold text-[#1E280E]"
                        >
                          {config.label}
                        </label>
                        <span className="text-sm font-bold text-[#94C748]">
                          {sliderValues[config.id]}
                        </span>
                      </div>
                      <input
                        id={`slider-${config.id}`}
                        type="range"
                        min="0"
                        max={config.max}
                        value={sliderValues[config.id]}
                        onChange={(e) =>
                          handleSliderChange(config.id, parseInt(e.target.value))
                        }
                        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#F2F4F7] outline-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#94C748] [&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(148,199,72,0.15)] [&::-webkit-slider-thumb]:transition-shadow hover:[&::-webkit-slider-thumb]:shadow-[0_0_0_6px_rgba(148,199,72,0.18)]"
                      />
                      <p className="mt-1 text-xs text-[#98A2B3]">{config.hint}</p>
                    </div>
                  ))}
                </div>

                {totalTokens > 0 && (
                  <div className="mt-8 rounded-xl border border-[#E9EAEB] bg-[#F9FAFB] p-4">
                    <div className="mb-3 text-xs font-bold uppercase tracking-wider text-[#98A2B3]">
                      {t("estimator.breakdown")}
                    </div>
                    <div className="space-y-2">
                      {SLIDER_CONFIGS.map((config) => {
                        const tokens = sliderValues[config.id] * config.tokensPerUnit;
                        if (tokens === 0) return null;
                        return (
                          <div
                            key={config.id}
                            className="flex justify-between text-xs text-[#535862]"
                          >
                            <span>
                              {config.label.split(" / ")[0]} ×{sliderValues[config.id]}
                            </span>
                            <strong className="font-bold text-[#1E280E]">
                              {tokens} tokens
                            </strong>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-[#E9EAEB] bg-white shadow-sm lg:sticky lg:top-24">
                <div
                  className="rounded-t-2xl p-6"
                  style={{
                    background: "linear-gradient(135deg, #1e7a48 0%, #2D9E5F 100%)",
                  }}
                >
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-white/70">
                    {t("estimator.estimatedTokens")}
                  </div>
                  <div className="text-5xl font-bold text-white">
                    {totalTokens.toLocaleString()}
                  </div>
                </div>

                <div className="space-y-4 p-6">
                  <div className="rounded-xl border border-[#E9EAEB] bg-[#F9FAFB] p-4">
                    <div className="mb-1 text-xs font-bold uppercase tracking-wider text-[#98A2B3]">
                      {t("estimator.recommendedPlan")}
                    </div>
                    <div className="text-2xl font-bold text-[#94C748]">
                      {recommendedPackage.tokens.toLocaleString()} Tokens
                    </div>
                    <div className="text-xs text-[#535862] mt-0.5">
                      Rp {(recommendedPackage.price / 1000).toLocaleString()}K (Rp {recommendedPackage.pricePerToken} {t("perToken")})
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-[#E9EAEB] pt-4">
                    <div className="flex justify-between text-xs text-[#535862]">
                      <span>{t("estimator.planCost")}</span>
                      <span className="font-bold text-[#1E280E]">
                        Rp {(recommendedPackage.price / 1000).toLocaleString()}K
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-[#E9EAEB] pt-3 text-sm font-bold">
                      <span className="text-[#1E280E]">{t("estimator.totalPerMonth")}</span>
                      <span className="text-[#94C748]">
                        Rp {(recommendedPackage.price / 1000).toLocaleString()}K
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleComingSoon}
                    color="primary"
                    size="lg"
                    className="w-full"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {t("buyTokens")}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div variants={fadeInUp} className="mt-16 text-center">
          <p className="text-sm text-[#535862]">
            {t("customPlan")}{" "}
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="font-semibold text-[#D444F1] underline decoration-[#D444F1]/30 underline-offset-4 transition-colors hover:decoration-[#D444F1]"
            >
              {t("contactUs")}
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
