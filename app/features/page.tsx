"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/base/feature-card";
import {
  Calendar,
  BarChart3,
  Megaphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

// Features mapping matching the exact items in the homepage FeaturesSection
const features = [
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
  {
    id: "ads",
    routeId: "ads-manager",
    title: "Ads Manager",
    description:
      "Kelola dan optimalkan kampanye iklan untuk meningkatkan traffic dan konversi secara signifikan.",
    icon: Megaphone,
    comingSoon: true,
  },
  {
    id: "ai",
    routeId: "ai-content-maker",
    title: "AI Content Maker",
    description: "Buat konten berkualitas dengan bantuan AI untuk hasil yang relevan.",
    icon: Sparkles,
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

          {/* Grid Layout of Features utilizing the exact homepage FeatureCard component */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-8 sm:grid-cols-2 lg:gap-10"
          >
            {features.map((feat) => (
              <motion.div
                key={feat.id}
                variants={staggerItem}
                whileHover="hover"
                className="h-full cursor-pointer"
              >
                <Link href={`/features/${feat.routeId}`} className="block h-full transition-transform hover:-translate-y-1.5 duration-300">
                  <FeatureCard
                    icon={feat.icon}
                    title={feat.title}
                    description={feat.description}
                    badge={feat.badge}
                    comingSoon={feat.comingSoon}
                    coverImage={feat.coverImage}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
