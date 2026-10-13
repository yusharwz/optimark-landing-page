"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeatureNavSection } from "@/components/FeatureNavSection";
import { SeoFaqSection } from "@/components/SeoFaqSection";
import { InteractiveDotGrid } from "@/components/InteractiveDotGrid";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { Link } from "@/i18n/navigation";
import { cx } from "@/utils/cx";

/**
 * Per-feature accent. Written out as whole class strings because Tailwind only
 * sees literals — an interpolated `bg-${color}-500/10` would never be emitted.
 */
const ACCENTS = {
  fuchsia: {
    badge: "bg-fuchsia-500/10 border-fuchsia-500/20",
    icon: "text-fuchsia-500",
    card: "bg-fuchsia-500/10 text-fuchsia-500",
  },
  indigo: {
    badge: "bg-indigo-500/10 border-indigo-500/20",
    icon: "text-indigo-500",
    card: "bg-indigo-500/10 text-indigo-500",
  },
  amber: {
    badge: "bg-amber-500/10 border-amber-500/20",
    icon: "text-amber-500",
    card: "bg-amber-500/10 text-amber-500",
  },
  emerald: {
    badge: "bg-emerald-500/10 border-emerald-500/20",
    icon: "text-emerald-500",
    card: "bg-emerald-500/10 text-emerald-500",
  },
} as const;

/** Message keys under `featureDetail` that this layout can render. */
export type FeatureDetailId = "aiImage" | "aiVideo";

interface FeatureDetailLayoutProps {
  /** Namespace under `featureDetail` holding badge/title/description/checks/cards. */
  id: FeatureDetailId;
  /** Icon shown inside the hero badge. */
  icon: LucideIcon;
  /** One icon per entry in `featureDetail.<id>.cards`. */
  cardIcons: LucideIcon[];
  accent: keyof typeof ACCENTS;
  /** Product visual for the hero — a real modal, an image grid, a clip. */
  mockup: ReactNode;
}

/**
 * Shared shell for the secondary feature detail pages (AI Image, AI Video).
 * All copy comes from the
 * `featureDetail.<id>` message namespace; the page only supplies the visual.
 */
export function FeatureDetailLayout({
  id,
  icon: Icon,
  cardIcons,
  accent,
  mockup,
}: FeatureDetailLayoutProps) {
  const t = useTranslations("featureDetail");
  const tone = ACCENTS[accent];

  const checks = t.raw(`${id}.checks`) as string[];
  const deepFeatures = (t.raw(`${id}.cards`) as { title: string; description: string }[]).map(
    (card, i) => ({ ...card, icon: cardIcons[i] }),
  );

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Header />

      {/* Decorative Swatch Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(242, 248, 231, 0.4) 100%)",
        }}
      />

      <main className="relative z-10 pt-32 pb-24 px-6 sm:px-12 lg:px-24">
        {/* Decorative Grid */}
        <div className="absolute right-0 top-10 pointer-events-none opacity-30 hidden lg:block">
          <InteractiveDotGrid
            className="opacity-30"
            dotSize={1.5}
            dotGap={24}
            gridWidth={600}
            gridHeight={600}
          />
        </div>

        <div className="mx-auto max-w-7xl">
          {/* Back button */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#535862] hover:text-[#94C748] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("back")}
            </Link>
          </motion.div>

          {/* Hero */}
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              <span
                className={cx(
                  "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold text-[#1E280E]",
                  tone.badge,
                )}
              >
                <Icon className={cx("h-3 w-3", tone.icon)} />
                {t(`${id}.badge`)}
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#1E280E] sm:text-5xl lg:text-[3.5rem] leading-tight">
                {t(`${id}.title`)}
              </h1>
              <p className="mt-6 text-lg text-[#535862] leading-relaxed">
                {t(`${id}.description`)}
              </p>

              <div className="mt-8 space-y-4">
                {checks.map((check) => (
                  <div key={check} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#94C748]" />
                    <span className="text-[#1E280E] font-medium">{check}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative min-w-0"
            >
              {mockup}
            </motion.div>
          </div>

          {/* Deep feature list */}
          <div className="mt-28">
            <h2 className="text-3xl font-bold text-[#1E280E] text-center mb-16">
              {t(`${id}.deepTitle`)}
            </h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-8 md:grid-cols-3"
            >
              {deepFeatures.map((feat, idx) => (
                <motion.div
                  key={idx}
                  variants={staggerItem}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className={cx(
                      "flex h-10 w-10 items-center justify-center rounded-lg mb-6",
                      tone.card,
                    )}
                  >
                    {feat.icon && <feat.icon className="h-5 w-5" />}
                  </div>
                  <h3 className="text-lg font-bold text-[#1E280E]">{feat.title}</h3>
                  <p className="mt-3 text-sm text-[#535862] leading-relaxed">{feat.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* SEO Content FAQ Section */}
          <SeoFaqSection
            pageKey={id === "aiImage" ? "ai-image" : "ai-video"}
            className="pt-16 sm:pt-24 pb-0"
            containerClassName="px-0"
          />
        </div>
      </main>

      <FeatureNavSection current={id} />
      <Footer />
    </div>
  );
}
