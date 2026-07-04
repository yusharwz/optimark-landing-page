"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BentoFeatureCard } from "@/components/BentoFeatureCard";
import { AiContentIllustration, SeoAnalyzerIllustration } from "@/components/BentoCardIllustrations";
import { Reveal } from "@/components/motion/Reveal";
import { Calendar, BarChart3, Sparkles, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { gsap, useGSAP } from "@/lib/gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { useTranslations } from "next-intl";

// Structural mapping only — copy (title/description/badge) comes from i18n.
// AI Content Maker is the featured tile (tall, left column of the bento grid),
// so it is listed first.
type FeatureItem = {
  id: "ai" | "perencana" | "seo";
  routeId: string;
  icon: LucideIcon;
  comingSoon?: boolean;
  featured?: boolean;
  coverImage?: string;
};

const features: FeatureItem[] = [
  {
    id: "ai",
    routeId: "ai-content-maker",
    icon: Sparkles,
    comingSoon: true,
    featured: true,
  },
  {
    id: "perencana",
    routeId: "perencana-konten",
    icon: Calendar,
    coverImage: "/images/features-perencanaan-konten.svg",
  },
  {
    id: "seo",
    routeId: "seo-analyzer",
    icon: BarChart3,
    comingSoon: true,
  },
];

export default function FeaturesPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("features");
  const tp = useTranslations("featuresPage");
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(SplitText);
  let split;

  useGSAP(
    () => {
      SplitText.create("p", {
        type: "words,lines",
        linesClass: "line",
        autoSplit: true,
        mask: "lines",
        onSplit: (self) => {
          split = gsap.from(self.lines, {
            duration: 4,
            yPercent: 100,
            opacity: 0,
            stagger: 0.1,
            ease: "expo.out",
          });
          return split;
        }
      })
    },
    { scope: sectionRef },
  );

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Header />

      {/* Lightweight CSS Gradient Background (Replaces heavy InteractiveDotGrid) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(242, 248, 231, 0.4) 100%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "url('/images/hero-swatch.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "400px 400px",
        }}
      />

      <main ref={sectionRef} className="relative z-10 pt-32 pb-24 px-6 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#94C748]/10 px-4 py-1.5 text-xs font-semibold text-[#D444F1] border border-[#94C748]/20">
              <Zap className="h-3 w-3 text-[#D444F1]" />
              {tp("badge")}
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#1E280E] sm:text-5xl lg:text-[3.5rem] leading-tight">
              {tp("title")}
            </h1>
            <p className="mt-6 text-lg text-[#535862] leading-relaxed">
              {tp("subtitle")}
            </p>
          </motion.div>

          {/* Bento grid, matching the homepage features section */}
          <Reveal
            stagger
            y={20}
            className="grid grid-cols-1 gap-4 sm:auto-rows-fr sm:grid-cols-2 sm:grid-rows-2 lg:gap-6"
          >
            {features.map((feat) => {
              let illustration: React.ReactNode = undefined;
              if (feat.id === "ai") {
                illustration = <AiContentIllustration />;
              } else if (feat.id === "seo") {
                illustration = <SeoAnalyzerIllustration />;
              }

              return (
                <BentoFeatureCard
                  key={feat.id}
                  href={`/features/${feat.routeId}`}
                  icon={feat.icon}
                  title={t(`items.${feat.id}.title`)}
                  description={t(`items.${feat.id}.description`)}
                  badge={feat.comingSoon ? t("comingSoon") : t("availableNow")}
                  coverImage={feat.coverImage}
                  illustration={illustration}
                  featured={feat.featured}
                  highlight={feat.id === "ai"}
                  className={feat.featured ? "sm:row-span-2" : undefined}
                />
              );
            })}
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
