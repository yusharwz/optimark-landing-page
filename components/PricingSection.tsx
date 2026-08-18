"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useFormatter, useTranslations } from "next-intl";
import { ArrowRight, Check, Sliders, X } from "lucide-react";
import { Button } from "@/components/base/buttons/button";
import { PRICING_TIERS } from "@/config/pricing";
import { GET_STARTED_URL, SITE } from "@/config/site";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { cx } from "@/utils/cx";

const SECTION_GRADIENT =
  "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(242, 248, 231, 1) 100%)";

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

const TOPUP_PACKAGES = [
  { tokens: 100, price: 100000 },
  { tokens: 300, price: 270000 },
  { tokens: 500, price: 425000 },
  { tokens: 1000, price: 800000 },
  { tokens: 2500, price: 1875000 },
];

interface PricingSectionProps {
  showEstimator?: boolean;
}

// Store that never changes: lets useSyncExternalStore report "mounted" (true on
// the client, false during SSR/hydration) without a setState-in-effect.
const noopSubscribe = () => () => {};

export function PricingSection({ showEstimator = true }: PricingSectionProps = {}) {
  const t = useTranslations("pricing");
  const format = useFormatter();
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({
    captions: 0,
    articles: 0,
    images: 0,
    seo: 0,
    marketplace: 0,
    ads: 0,
  });
  const [showNotification, setShowNotification] = useState(false);
  // Portal target: only available after mount (client), guards SSR.
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

  const recommendedPlan = useMemo(() => {
    const needsProFeatures =
      sliderValues.seo > 0 ||
      sliderValues.marketplace > 0 ||
      sliderValues.ads > 0 ||
      sliderValues.images > 0;

    const needsStarterFeatures =
      sliderValues.captions > 0 || sliderValues.articles > 0;

    let planByTokens = PRICING_TIERS[0];
    for (let i = PRICING_TIERS.length - 1; i >= 0; i--) {
      if (totalTokens <= PRICING_TIERS[i].tokens) {
        planByTokens = PRICING_TIERS[i];
      }
    }

    if (needsProFeatures) {
      const proIndex = PRICING_TIERS.findIndex((tier) => tier.id === "pro");
      if (totalTokens > PRICING_TIERS[proIndex].tokens) {
        return PRICING_TIERS.find((tier) => tier.id === "enterprise") || PRICING_TIERS[proIndex];
      }
      return PRICING_TIERS[proIndex];
    }

    if (needsStarterFeatures) {
      const starterIndex = PRICING_TIERS.findIndex((tier) => tier.id === "starter");
      if (totalTokens > PRICING_TIERS[starterIndex].tokens) {
        const proIndex = PRICING_TIERS.findIndex((tier) => tier.id === "pro");
        return PRICING_TIERS[proIndex];
      }
      return PRICING_TIERS[starterIndex];
    }

    return planByTokens;
  }, [totalTokens, sliderValues]);

  const additionalTokensNeeded = useMemo(() => {
    return Math.max(0, totalTokens - recommendedPlan.tokens);
  }, [totalTokens, recommendedPlan]);

  const recommendedTopup = useMemo(() => {
    if (additionalTokensNeeded === 0) return null;

    for (const pkg of TOPUP_PACKAGES) {
      if (additionalTokensNeeded <= pkg.tokens) {
        return pkg;
      }
    }

    const multiplier = Math.ceil(additionalTokensNeeded / 1000);
    return {
      tokens: multiplier * 1000,
      price: multiplier * 800000,
    };
  }, [additionalTokensNeeded]);

  const handleSliderChange = (id: string, value: number) => {
    setSliderValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleComingSoon = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <section className="relative overflow-hidden px-6 py-16 sm:px-12 lg:px-24 lg:py-24">
      {mounted &&
        showNotification &&
        createPortal(
          // Portaled to <body> so it escapes the pricing page's `z-10` wrapper
          // stacking context and layers above the fixed header (z-50).
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
          <h2 className="text-display text-4xl sm:text-5xl lg:text-[3.5rem]">
            {t("title")}
          </h2>
          <p className="text-lead mx-auto mt-6 max-w-2xl text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PRICING_TIERS.map((tier) => {
            // Only a live tier gets emphasised: a "Most Popular" badge on a
            // greyed-out card would contradict itself, so the badge and ring
            // follow availability rather than `isPopular` alone.
            const isEmphasised = Boolean(tier.isAvailable);

            return (
            <motion.div key={tier.id} variants={staggerItem} className="relative flex flex-col">
              {tier.isPopular && tier.isAvailable && (
                <div className="absolute -top-4 left-1/2 z-30 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#94C748] px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                    </span>
                    {t("mostPopular")}
                  </span>
                </div>
              )}

              <div
                onMouseMove={handleMouseMove}
                className={cx(
                  "group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                  isEmphasised
                    ? "border-[#94C748] ring-2 ring-[#94C748]/10"
                    : "border-[#E9EAEB]"
                )}
              >
                {/* Background Spotlight Glow */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
                  style={{
                    background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 68, 241, 0.08), transparent 80%)`,
                  }}
                />
                {/* Border Spotlight Glow */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-3xl border border-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
                  style={{
                    background: `radial-gradient(250px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 68, 241, 0.4), transparent 80%)`,
                    WebkitMaskImage: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
                    WebkitMaskComposite: `xor`,
                    maskComposite: `exclude`,
                    padding: "1px",
                  }}
                />

                <div className="relative z-20 flex h-full flex-col">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-[#1E280E]">
                      {t(`tiers.${tier.id}.name`)}
                    </h3>
                  </div>

                  <div className="mt-6 text-center">
                    {tier.price === 0 ? (
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-[#1E280E]">
                          {t("free")}
                        </span>
                      </div>
                    ) : (
                      // Never wraps: at the 4-column desktop width a card only
                      // has ~214px of content box, and "Rp 599.000 /bulan" has
                      // to survive there as one line.
                      <div className="flex items-baseline justify-center gap-x-1 whitespace-nowrap">
                        <span className="text-lg font-semibold text-[#535862]">Rp</span>
                        <span className="text-3xl font-bold text-[#1E280E]">
                          {format.number(tier.price)}
                        </span>
                        <span className="text-sm font-medium text-[#535862]">
                          {t("perMonth")}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FDF4FF] border border-[#F5D0FE] px-3 py-1.5">
                      <span className="text-sm font-medium text-[#D444F1]">
                        {t(tier.tokensOneTime ? "tokensOneTime" : "tokensPerMonth", {
                          count: format.number(tier.tokens),
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
                    {/* Only the Free tier is live: it funnels into the same
                        register/login flow as the header "Get Started". Paid
                        tiers stay greyed out until checkout ships. */}
                    {tier.isAvailable ? (
                      <Button href={GET_STARTED_URL} color="primary" size="lg" className="w-full">
                        {t(`tiers.${tier.id}.cta`)}
                      </Button>
                    ) : (
                      <Button isDisabled color="secondary" size="lg" className="w-full">
                        {t(`tiers.${tier.id}.cta`)}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
            );
          })}
        </motion.div>

        {showEstimator && (
          <motion.div variants={fadeInUp} className="mt-24">
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
                    <div
                      className="text-2xl font-bold"
                      style={{
                        color: recommendedPlan.isPopular ? "#94C748" : "#1E280E",
                      }}
                    >
                      {t(`tiers.${recommendedPlan.id}.name`)}
                    </div>
                  </div>

                  {additionalTokensNeeded > 0 && recommendedTopup && (
                    <div className="rounded-xl border border-[#FCD34D] bg-[#FFFBEB] p-4">
                      <div className="mb-1 text-xs font-bold uppercase tracking-wider text-[#B45309]">
                        {t("estimator.additionalTokens")}
                      </div>
                      <div className="text-lg font-bold text-[#92400E]">
                        +{additionalTokensNeeded} Tokens
                      </div>
                      <div className="text-xs text-[#A16207]">
                        {t("estimator.suggestedTopup", {
                          tokens: recommendedTopup.tokens.toLocaleString(),
                          price: (recommendedTopup.price / 1000).toFixed(0),
                        })}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 border-t border-[#E9EAEB] pt-4">
                    <div className="flex justify-between text-xs text-[#535862]">
                      <span>{t("estimator.planCost")}</span>
                      <span className="font-bold text-[#1E280E]">
                        {recommendedPlan.price === 0
                          ? t("free")
                          : `Rp ${(recommendedPlan.price / 1000).toFixed(0)}k/mo`}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-[#535862]">
                      <span>{t("estimator.topupCost")}</span>
                      <span className="font-bold text-[#1E280E]">
                        {recommendedTopup
                          ? `~Rp ${(recommendedTopup.price / 1000).toFixed(0)}k`
                          : t("estimator.notNeeded")}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-[#E9EAEB] pt-3 text-sm font-bold">
                      <span className="text-[#1E280E]">{t("estimator.totalPerMonth")}</span>
                      <span className="text-[#94C748]">
                        {recommendedPlan.price === 0 && !recommendedTopup
                          ? t("free")
                          : `~Rp ${((recommendedPlan.price + (recommendedTopup?.price || 0)) / 1000).toFixed(0)}k/mo`}
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
                      {totalTokens === 0
                        ? t("tiers.free.cta")
                        : t(`tiers.${recommendedPlan.id}.cta`)}
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
