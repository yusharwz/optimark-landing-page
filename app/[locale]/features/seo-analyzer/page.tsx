"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InteractiveDotGrid } from "@/components/InteractiveDotGrid";
import {
  BarChart3,
  CheckCircle2,
  ArrowLeft,
  Search,
  FileCheck,
  TrendingUp,
  Activity,
} from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { useTranslations } from "next-intl";

export default function SeoAnalyzerPage() {
  const t = useTranslations("featureDetail");
  const cardIcons = [Search, FileCheck, TrendingUp];
  const checks = t.raw("seo.checks") as string[];
  const deepFeatures = (
    t.raw("seo.cards") as { title: string; description: string }[]
  ).map((card, i) => ({ ...card, icon: cardIcons[i] }));

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
        <div className="absolute right-0 top-10 pointer-events-none opacity-30">
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

          {/* Hero Section */}
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-[#1E280E] border border-blue-500/20">
                <BarChart3 className="h-3 w-3 text-blue-500" />
                {t("seo.badge")}
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#1E280E] sm:text-5xl lg:text-[3.5rem] leading-tight">
                {t("seo.title")}
              </h1>
              <p className="mt-6 text-lg text-[#535862] leading-relaxed">
                {t("seo.description")}
              </p>

              {/* Checkmarks */}
              <div className="mt-8 space-y-4">
                {checks.map((check) => (
                  <div key={check} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#94C748]" />
                    <span className="text-[#1E280E] font-medium">{check}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Premium Mockup (Visual Demonstration) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl overflow-hidden min-h-[400px] flex flex-col justify-between"
            >
              {/* Header Mockup */}
              <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="text-xs font-semibold text-gray-400 ml-4">optimark.io/seo-editor</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#94C748]">
                  <Activity className="h-4 w-4 animate-pulse" />
                  Analisis Aktif
                </div>
              </div>

              {/* Body Representation of SEO Auditor */}
              <div className="my-6 space-y-4 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500">Artikel: &quot;Cara Pemasaran Digital Terbaik 2026&quot;</span>
                  <span className="text-xs font-bold bg-[#94C748]/10 text-[#94C748] px-2 py-0.5 rounded-full border border-[#94C748]/20">
                    Skor: 92/100
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-3 text-xs flex items-center justify-between">
                    <span className="text-emerald-700">✓ Kata kunci utama ada di judul halaman (H1)</span>
                    <span className="font-semibold text-emerald-600">Terpenuhi</span>
                  </div>
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-3 text-xs flex items-center justify-between">
                    <span className="text-emerald-700">✓ Meta deskripsi mengandung kata kunci terarah</span>
                    <span className="font-semibold text-emerald-600">Terpenuhi</span>
                  </div>
                  <div className="rounded-xl border border-amber-100 bg-amber-50/30 p-3 text-xs flex items-center justify-between">
                    <span className="text-amber-700">! Tambahkan setidaknya 2 sub-heading H2 / H3</span>
                    <span className="font-semibold text-amber-600">Rekomendasi</span>
                  </div>
                </div>
              </div>

              {/* Top Keywords Tracker widget */}
              <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400">Target Keyword</span>
                  <div className="text-xs font-bold text-[#1E280E] mt-0.5">&quot;digital marketing ukm&quot;</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Peringkat Est.</span>
                  <div className="text-xs font-bold text-blue-600 mt-0.5">Halaman 1 (#3)</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Deep Feature List */}
          <div className="mt-28">
            <h2 className="text-3xl font-bold text-[#1E280E] text-center mb-16">
              {t("seo.deepTitle")}
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
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 mb-6">
                    <feat.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1E280E]">{feat.title}</h3>
                  <p className="mt-3 text-sm text-[#535862] leading-relaxed">
                    {feat.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
