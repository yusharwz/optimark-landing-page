"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/base/buttons/button";
import { Check, X } from "lucide-react";
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
    tokensPerMonth: 1000,
    ctaText: "Mulai Gratis",
    ctaLink: "#",
    features: [
      { name: "Perencana Konten", included: true },
      { name: "1 Akun Media Sosial", included: true },
      { name: "Penjadwalan Konten Dasar", included: true },
      { name: "SEO Analyzer", included: false },
      { name: "Ads Manager", included: false },
      { name: "AI Content Maker", included: false },
      { name: "Analytics Dashboard", included: false },
      { name: "Priority Support", included: false },
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: 99000,
    tokensPerMonth: 10000,
    ctaText: "Pilih Starter",
    ctaLink: "#",
    isPopular: true,
    features: [
      { name: "Perencana Konten", included: true },
      { name: "5 Akun Media Sosial", included: true },
      { name: "Penjadwalan Konten Advanced", included: true },
      { name: "SEO Analyzer", included: true },
      { name: "Ads Manager", included: true },
      { name: "AI Content Maker", included: true },
      { name: "Analytics Dashboard", included: true },
      { name: "Priority Support", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 249000,
    tokensPerMonth: 50000,
    ctaText: "Pilih Pro",
    ctaLink: "#",
    features: [
      { name: "Perencana Konten", included: true },
      { name: "15 Akun Media Sosial", included: true },
      { name: "Penjadwalan Konten Advanced", included: true },
      { name: "SEO Analyzer", included: true },
      { name: "Ads Manager", included: true },
      { name: "AI Content Maker", included: true },
      { name: "Analytics Dashboard", included: true },
      { name: "Priority Support", included: true },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 499000,
    tokensPerMonth: 150000,
    ctaText: "Hubungi Kami",
    ctaLink: "#",
    features: [
      { name: "Perencana Konten", included: true },
      { name: "Unlimited Akun Media Sosial", included: true },
      { name: "Penjadwalan Konten Advanced", included: true },
      { name: "SEO Analyzer", included: true },
      { name: "Ads Manager", included: true },
      { name: "AI Content Maker", included: true },
      { name: "Analytics Dashboard", included: true },
      { name: "Priority Support", included: true },
    ],
  },
];

export function PricingSection() {
  return (
    <section className="relative overflow-hidden px-6 py-16 sm:px-12 lg:px-24 lg:py-24">
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
                    href={tier.ctaLink}
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
