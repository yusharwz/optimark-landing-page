"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BentoFeatureCard } from "@/components/BentoFeatureCard";
import { Reveal } from "@/components/motion/Reveal";
import { Calendar, BarChart3, Sparkles, Zap } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

// Features mapping matching the exact items in the homepage FeaturesSection
// AI Content Maker is the featured tile (tall, left column of the bento grid),
// so it is listed first.
const features = [
  {
    id: "ai",
    routeId: "ai-content-maker",
    title: "AI Content Maker",
    description: "Buat konten berkualitas dengan bantuan AI untuk hasil yang relevan.",
    icon: Sparkles,
    comingSoon: true,
    featured: true,
  },
  {
    id: "perencana",
    routeId: "perencana-konten",
    title: "Perencana Konten",
    description:
      "Membantu menjadwalkan dan mengelola postingan konten secara otomatis di berbagai platform media sosial.",
    icon: Calendar,
    badge: "Available Now",
    coverImage: "/images/features-perencanaan-konten.svg",
  },
  {
    id: "seo",
    routeId: "seo-analyzer",
    title: "SEO Analyzer",
    description:
      "Analisis kata kunci dan optimasi konten dengan teknologi analisis kata kunci terbaru.",
    icon: BarChart3,
    comingSoon: true,
  },
];

export default function FeaturesPage() {
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

      <main className="relative z-10 pt-32 pb-24 px-6 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#94C748]/10 px-4 py-1.5 text-xs font-semibold text-[#1E280E] border border-[#94C748]/20">
              <Zap className="h-3 w-3 text-[#94C748]" />
              🤖 AI Automation Suite
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#1E280E] sm:text-5xl lg:text-[3.5rem] leading-tight">
              Satu Platform AI untuk Mengotomatisasi Seluruh Pemasaran Anda
            </h1>
            <p className="mt-6 text-lg text-[#535862] leading-relaxed">
              Optimark menyatukan empat modul kecerdasan buatan (AI) untuk membantu Anda merancang, mengoptimalkan, dan menjadwalkan seluruh aktivitas pemasaran digital secara otomatis.
            </p>
          </motion.div>

          {/* Bento grid, matching the homepage features section */}
          <Reveal
            stagger
            y={20}
            className="grid grid-cols-1 gap-4 sm:auto-rows-fr sm:grid-cols-2 sm:grid-rows-2 lg:gap-6"
          >
            {features.map((feat) => (
              <BentoFeatureCard
                key={feat.id}
                href={`/features/${feat.routeId}`}
                icon={feat.icon}
                title={feat.title}
                description={feat.description}
                badge={feat.badge ?? (feat.comingSoon ? "Coming soon" : undefined)}
                coverImage={feat.coverImage}
                className={feat.featured ? "sm:row-span-2" : undefined}
              />
            ))}
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
