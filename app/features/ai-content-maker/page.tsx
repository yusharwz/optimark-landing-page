"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InteractiveDotGrid } from "@/components/InteractiveDotGrid";
import {
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  PenTool,
  Bookmark,
  MessageSquare,
} from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function AiContentMakerPage() {
  const deepFeatures = [
    {
      title: "Custom Brand Voice Engine",
      description: "Tentukan deskripsi brand, tagline, dan kepribadian (Witty, Professional, Casual). AI kami akan otomatis menulis konten sesuai jati diri brand Anda.",
      icon: Bookmark,
    },
    {
      title: "Caption Generator Terarah",
      description: "Buat caption Instagram & Facebook secara cepat lengkap dengan saran hashtag relevan, emoji interaktif, dan ajakan bertindak (CTA).",
      icon: MessageSquare,
    },
    {
      title: "SEO Long-form Writer",
      description: "Hasilkan draf artikel blog panjang berstruktur lengkap dengan heading tag H2/H3 yang sudah dioptimalkan untuk SEO kata kunci Anda.",
      icon: PenTool,
    },
  ];

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
              href="/features"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#535862] hover:text-[#94C748] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Semua Fitur
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
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-[#1E280E] border border-amber-500/20">
                <Sparkles className="h-3 w-3 text-amber-500" />
                Segera Hadir - Content Creator AI
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#1E280E] sm:text-5xl lg:text-[3.5rem] leading-tight">
                Tulis Konten Otentik Sesuai Karakter Brand Anda
              </h1>
              <p className="mt-6 text-lg text-[#535862] leading-relaxed">
                Menghasilkan ide konten dan salinan tertulis yang relevan kini semudah sekali klik. Optimark melatih AI kami berdasarkan profil bisnis dan panduan brand voice Anda agar tulisan yang dihasilkan terasa sangat natural dan personal.
              </p>

              {/* Checkmarks */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#94C748]" />
                  <span className="text-[#1E280E] font-medium">Bebas writer&apos;s block dengan puluhan template prompt</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#94C748]" />
                  <span className="text-[#1E280E] font-medium">Penyesuaian gaya bahasa (tone of voice) yang sangat fleksibel</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#94C748]" />
                  <span className="text-[#1E280E] font-medium">Auto-generate hashtag viral berbasis tren terkini</span>
                </div>
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
                  <span className="text-xs font-semibold text-gray-400 ml-4">optimark.io/brand-voice-engine</span>
                </div>
                <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 animate-spin" />
                  AI Writing...
                </span>
              </div>

              {/* Body Representation of Brand Voice Editor */}
              <div className="my-6 space-y-4 flex-1">
                {/* Brand Voice Switcher Mockup */}
                <div className="flex gap-2">
                  {[
                    { label: "Witty/Lucu", active: false },
                    { label: "Professional", active: true },
                    { label: "Casual/Santai", active: false },
                  ].map((btn, idx) => (
                    <span
                      key={idx}
                      className={`text-[10px] px-2.5 py-1 rounded-full border font-bold transition-all ${
                        btn.active
                          ? "bg-gray-900 border-gray-900 text-white"
                          : "bg-white border-gray-200 text-gray-500"
                      }`}
                    >
                      {btn.label}
                    </span>
                  ))}
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Hasil Salinan AI</span>
                  <p className="text-xs font-medium text-gray-700 mt-2 leading-relaxed italic">
                    &quot;Mencari solusi cerdas untuk menghemat waktu marketing bisnis Anda? Optimark hadir memberikan otomatisasi penjadwalan konten ke media sosial serta analisa performa real-time. Kelola brand Anda tanpa stres! 🚀 #DigitalAutomation&quot;
                  </p>
                </div>
              </div>

              {/* Options & Action */}
              <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <span className="text-xs text-gray-400">Pilihan: 250 Karakter | 1 Hashtag</span>
                <button className="text-xs bg-[#94C748] text-gray-900 px-4 py-2 rounded-xl font-bold hover:shadow-lg transition-shadow">
                  Salin Caption
                </button>
              </div>
            </motion.div>
          </div>

          {/* Deep Feature List */}
          <div className="mt-28">
            <h2 className="text-3xl font-bold text-[#1E280E] text-center mb-16">
              Kemampuan Utama AI Content Maker
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
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 mb-6">
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
