"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/base/buttons/button";
import { Check, X, Sliders, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

interface Feature {
  name: string;
  included: boolean;
}

interface PricingTier {
  id: string;
  name: string;
  price: number;
  tokensPerMonth: number;
  features: Feature[];
  isPopular?: boolean;
  ctaText: string;
  ctaLink: string;
}

// Hardcoded pricing tiers (TBD: will be fetched from Back Office API)
const PRICING_TIERS: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    tokensPerMonth: 50,
    ctaText: "Get Started",
    ctaLink: "#",
    features: [
      { name: "1 business workspace", included: true },
      { name: "Manual content scheduling", included: true },
      { name: "Basic performance dashboard", included: true },
      { name: "AI content writing", included: false },
      { name: "Marketplace intelligence", included: false },
      { name: "SEO & article automation", included: false },
      { name: "Ad campaign management", included: false },
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: 199000,
    tokensPerMonth: 200,
    ctaText: "Choose Starter",
    ctaLink: "#",
    features: [
      { name: "Up to 3 business workspaces", included: true },
      { name: "Instagram & Facebook connect", included: true },
      { name: "AI-written captions & copy", included: true },
      { name: "AI article writer", included: true },
      { name: "Smart post scheduling", included: true },
      { name: "Full performance dashboard", included: true },
      { name: "Marketplace intelligence", included: false },
      { name: "SEO tools", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 499000,
    tokensPerMonth: 600,
    ctaText: "Choose Pro",
    ctaLink: "#",
    isPopular: true,
    features: [
      { name: "Up to 5 business workspaces", included: true },
      { name: "Instagram & Facebook connect", included: true },
      { name: "AI content, articles & visuals", included: true },
      { name: "Smart post scheduling", included: true },
      { name: "Rank tracker & keyword research", included: true },
      { name: "Site audit & content optimizer", included: true },
      { name: "Backlink analysis", included: true },
      { name: "Marketplace intelligence", included: true },
      { name: "Google Ads & campaign management", included: true },
    ],
  },
  {
    id: "business",
    name: "Business",
    price: 999000,
    tokensPerMonth: 1500,
    ctaText: "Choose Business",
    ctaLink: "#",
    features: [
      { name: "Up to 10 business workspaces", included: true },
      { name: "Instagram & Facebook connect", included: true },
      { name: "Everything in Pro", included: true },
      { name: "Auto-generated client reports", included: true },
      { name: "Payment gateway integration", included: true },
      { name: "Support desk & ticketing", included: true },
      { name: "Priority support", included: true },
    ],
  },
];

// Slider configuration for usage calculator
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

// Top-up packages
const TOPUP_PACKAGES = [
  { tokens: 100, price: 100000 },
  { tokens: 300, price: 270000 },
  { tokens: 500, price: 425000 },
  { tokens: 1000, price: 800000 },
  { tokens: 2500, price: 1875000 },
];

export function PricingSection() {
  // State for slider values
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({
    captions: 0,
    articles: 0,
    images: 0,
    seo: 0,
    marketplace: 0,
    ads: 0,
  });

  // State for notification
  const [showNotification, setShowNotification] = useState(false);

  // Calculate total tokens needed
  const totalTokens = useMemo(() => {
    return SLIDER_CONFIGS.reduce((sum, config) => {
      return sum + (sliderValues[config.id] || 0) * config.tokensPerUnit;
    }, 0);
  }, [sliderValues]);

  // Get recommended plan based on tokens and features
  const recommendedPlan = useMemo(() => {
    // Check if user needs Pro-only features
    const needsProFeatures =
      sliderValues.seo > 0 ||
      sliderValues.marketplace > 0 ||
      sliderValues.ads > 0 ||
      sliderValues.images > 0;

    // Check if user needs Starter-only features
    const needsStarterFeatures =
      sliderValues.captions > 0 || sliderValues.articles > 0;

    // Find plan by token capacity
    let planByTokens = PRICING_TIERS[0]; // Default to Free
    for (let i = PRICING_TIERS.length - 1; i >= 0; i--) {
      if (totalTokens <= PRICING_TIERS[i].tokensPerMonth) {
        planByTokens = PRICING_TIERS[i];
      }
    }

    // Override based on features needed
    if (needsProFeatures) {
      const proIndex = PRICING_TIERS.findIndex((t) => t.id === "pro");
      if (totalTokens > PRICING_TIERS[proIndex].tokensPerMonth) {
        return PRICING_TIERS.find((t) => t.id === "business") || PRICING_TIERS[proIndex];
      }
      return PRICING_TIERS[proIndex];
    }

    if (needsStarterFeatures) {
      const starterIndex = PRICING_TIERS.findIndex((t) => t.id === "starter");
      if (totalTokens > PRICING_TIERS[starterIndex].tokensPerMonth) {
        const proIndex = PRICING_TIERS.findIndex((t) => t.id === "pro");
        return PRICING_TIERS[proIndex];
      }
      return PRICING_TIERS[starterIndex];
    }

    return planByTokens;
  }, [totalTokens, sliderValues]);

  // Calculate additional tokens needed
  const additionalTokensNeeded = useMemo(() => {
    return Math.max(0, totalTokens - recommendedPlan.tokensPerMonth);
  }, [totalTokens, recommendedPlan]);

  // Get recommended top-up package
  const recommendedTopup = useMemo(() => {
    if (additionalTokensNeeded === 0) return null;

    for (const pkg of TOPUP_PACKAGES) {
      if (additionalTokensNeeded <= pkg.tokens) {
        return pkg;
      }
    }

    // If more than 2500 tokens needed, calculate multiple 1000-token packages
    const multiplier = Math.ceil(additionalTokensNeeded / 1000);
    return {
      tokens: multiplier * 1000,
      price: multiplier * 800000,
    };
  }, [additionalTokensNeeded]);

  // Handle slider change
  const handleSliderChange = (id: string, value: number) => {
    setSliderValues((prev) => ({ ...prev, [id]: value }));
  };

  // Handle button click - show coming soon notification
  const handleComingSoon = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };
  return (
    <section className="relative overflow-hidden px-6 py-16 sm:px-12 lg:px-24 lg:py-24">
      {/* Coming Soon Notification */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed left-1/2 top-8 z-50 -translate-x-1/2"
        >
          <div className="flex items-center gap-3 rounded-full border border-[#5925DC]/20 bg-white px-6 py-3 shadow-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5925DC]/10">
              <span className="text-xl">🚀</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1E280E]">Coming Soon!</p>
              <p className="text-xs text-[#535862]">Fitur ini akan segera hadir</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Background gradient matching landing page */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(242, 248, 231, 1) 100%)",
        }}
      />

      {/* Decorative swatch background */}
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
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center">
          <h1 className="text-4xl font-bold text-[#1E280E] sm:text-5xl lg:text-[3.5rem]">
            Pilih Paket yang Tepat untuk Bisnis Anda
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#535862]">
            Mulai gratis dan tingkatkan ke paket berbayar kapan pun Anda siap. Semua paket
            termasuk update gratis.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={staggerContainer}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={tier.id}
              variants={staggerItem}
              className="relative flex flex-col"
            >
              {/* Popular Badge */}
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#5925DC] px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                    </span>
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card */}
              <div
                className={`flex h-full flex-col rounded-2xl border bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl ${
                  tier.isPopular
                    ? "border-[#5925DC] ring-2 ring-[#5925DC]/10"
                    : "border-[#E9EAEB]"
                }`}
              >
                {/* Tier Name */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#1E280E]">{tier.name}</h3>
                </div>

                {/* Price */}
                <div className="mt-6 text-center">
                  {tier.price === 0 ? (
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-[#1E280E]">Gratis</span>
                    </div>
                  ) : (
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-2xl font-semibold text-[#535862]">Rp</span>
                      <span className="text-5xl font-bold text-[#1E280E]">
                        {(tier.price / 1000).toFixed(0)}K
                      </span>
                      <span className="text-lg font-medium text-[#535862]">/bulan</span>
                    </div>
                  )}
                </div>

                {/* Tokens */}
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F3FF] px-3 py-1.5">
                    <span className="text-sm font-medium text-[#5925DC]">
                      {tier.tokensPerMonth.toLocaleString("id-ID")} tokens/bulan
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="mt-8 flex-1 space-y-4">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
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
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-8">
                  <Button
                    onClick={handleComingSoon}
                    color={tier.isPopular ? "primary" : "secondary"}
                    size="lg"
                    className="w-full"
                  >
                    {tier.ctaText}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Usage Calculator */}
        <motion.div variants={fadeInUp} className="mt-24">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#F4F3FF] px-4 py-2 text-sm font-semibold text-[#5925DC]">
              <Sliders className="h-4 w-4" />
              Usage Estimator
            </div>
            <h2 className="text-3xl font-bold text-[#1E280E] sm:text-4xl">
              Not Sure Which Plan to Pick?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#535862]">
              Estimate your monthly AI usage and we&apos;ll recommend the most cost-efficient plan
              for you.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr,340px]">
            {/* Sliders Card */}
            <div className="rounded-2xl border border-[#E9EAEB] bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#1E280E]">
                How active is your marketing?
              </h3>
              <p className="mt-2 text-sm text-[#535862]">
                Adjust the sliders to match your typical monthly activity. Rough estimates are
                fine.
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
                      onChange={(e) => handleSliderChange(config.id, parseInt(e.target.value))}
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#F2F4F7] outline-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#94C748] [&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(148,199,72,0.15)] [&::-webkit-slider-thumb]:transition-shadow hover:[&::-webkit-slider-thumb]:shadow-[0_0_0_6px_rgba(148,199,72,0.18)]"
                    />
                    <p className="mt-1 text-xs text-[#98A2B3]">{config.hint}</p>
                  </div>
                ))}
              </div>

              {/* Token Breakdown */}
              {totalTokens > 0 && (
                <div className="mt-8 rounded-xl border border-[#E9EAEB] bg-[#F9FAFB] p-4">
                  <div className="mb-3 text-xs font-bold uppercase tracking-wider text-[#98A2B3]">
                    Token Breakdown
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
                          <strong className="font-bold text-[#1E280E]">{tokens} tokens</strong>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Result Card */}
            <div className="rounded-2xl border border-[#E9EAEB] bg-white shadow-sm lg:sticky lg:top-24">
              <div
                className="rounded-t-2xl p-6"
                style={{
                  background: "linear-gradient(135deg, #1e7a48 0%, #2D9E5F 100%)",
                }}
              >
                <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-white/70">
                  Estimated Tokens / Month
                </div>
                <div className="text-5xl font-bold text-white">
                  {totalTokens.toLocaleString("id-ID")}
                </div>
                <div className="mt-1 text-xs text-white/60">
                  ≈ Rp {totalTokens.toLocaleString("id-ID")},000 in AI value
                </div>
              </div>

              <div className="space-y-4 p-6">
                {/* Recommended Plan */}
                <div className="rounded-xl border border-[#E9EAEB] bg-[#F9FAFB] p-4">
                  <div className="mb-1 text-xs font-bold uppercase tracking-wider text-[#98A2B3]">
                    Recommended Plan
                  </div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: recommendedPlan.isPopular ? "#5925DC" : "#1E280E" }}
                  >
                    {recommendedPlan.name}
                  </div>
                  <div className="text-xs text-[#535862]">
                    {recommendedPlan.id === "free" && "Start with the basics"}
                    {recommendedPlan.id === "starter" && "Great for daily content workflows"}
                    {recommendedPlan.id === "pro" && "Best for active, growing businesses"}
                    {recommendedPlan.id === "business" && "For brands and agencies at scale"}
                  </div>
                </div>

                {/* Top-up Warning */}
                {additionalTokensNeeded > 0 && recommendedTopup && (
                  <div className="rounded-xl border border-[#FCD34D] bg-[#FFFBEB] p-4">
                    <div className="mb-1 text-xs font-bold uppercase tracking-wider text-[#B45309]">
                      Additional Tokens Needed
                    </div>
                    <div className="text-lg font-bold text-[#92400E]">
                      +{additionalTokensNeeded} Tokens
                    </div>
                    <div className="text-xs text-[#A16207]">
                      Suggested: {recommendedTopup.tokens.toLocaleString("id-ID")} Token pack (~Rp{" "}
                      {(recommendedTopup.price / 1000).toFixed(0)}k)
                    </div>
                  </div>
                )}

                {/* Cost Breakdown */}
                <div className="space-y-3 border-t border-[#E9EAEB] pt-4">
                  <div className="flex justify-between text-xs text-[#535862]">
                    <span>Plan cost</span>
                    <span className="font-bold text-[#1E280E]">
                      {recommendedPlan.price === 0
                        ? "Free"
                        : `Rp ${(recommendedPlan.price / 1000).toFixed(0)}k/mo`}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-[#535862]">
                    <span>Est. top-up</span>
                    <span className="font-bold text-[#1E280E]">
                      {recommendedTopup
                        ? `~Rp ${(recommendedTopup.price / 1000).toFixed(0)}k`
                        : "Not needed"}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-[#E9EAEB] pt-3 text-sm font-bold">
                    <span className="text-[#1E280E]">Total / month</span>
                    <span className="text-[#94C748]">
                      {recommendedPlan.price === 0 && !recommendedTopup
                        ? "Free"
                        : `~Rp ${((recommendedPlan.price + (recommendedTopup?.price || 0)) / 1000).toFixed(0)}k/mo`}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  onClick={handleComingSoon}
                  color="primary"
                  size="lg"
                  className="w-full"
                >
                  <span className="flex items-center justify-center gap-2">
                    {totalTokens === 0 ? "Get Started Free" : `Choose ${recommendedPlan.name}`}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 text-center"
        >
          <p className="text-sm text-[#535862]">
            Butuh paket custom?{" "}
            <a
              href="mailto:admin@usahakreatif.co.id"
              className="font-semibold text-[#5925DC] underline decoration-[#5925DC]/30 underline-offset-4 transition-colors hover:decoration-[#5925DC]"
            >
              Hubungi kami
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
