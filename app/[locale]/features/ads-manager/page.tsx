"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InteractiveDotGrid } from "@/components/InteractiveDotGrid";
import {
  Megaphone,
  CheckCircle2,
  ArrowLeft,
  Coins,
  Split,
  Percent,
} from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function AdsManagerPage() {
  const deepFeatures = [
    {
      title: "Smart Budget Allocation",
      description: "Algoritma cerdas Optimark akan mendistribusikan budget harian Anda secara dinamis ke set iklan dengan tingkat konversi tertinggi.",
      icon: Coins,
    },
    {
      title: "A/B Testing Otomatis",
      description: "Uji coba hingga 5 variasi materi kreatif iklan (gambar, teks, headline) sekaligus. Kami akan otomatis mematikan variasi dengan performa buruk.",
      icon: Split,
    },
    {
      title: "Perhitungan ROAS Real-Time",
      description: "Dapatkan laporan laba bersih kampanye Anda (Return on Ad Spend) secara real-time tanpa perlu membuka Ads Manager bawaan yang rumit.",
      icon: Percent,
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
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#535862] hover:text-[#94C748] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Beranda
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
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-[#1E280E] border border-purple-500/20">
                <Megaphone className="h-3 w-3 text-purple-500" />
                Segera Hadir - Modul Ads Cerdas
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#1E280E] sm:text-5xl lg:text-[3.5rem] leading-tight">
                Kelola Iklan Lebih Pintar, ROI Lebih Tinggi
              </h1>
              <p className="mt-6 text-lg text-[#535862] leading-relaxed">
                Hentikan pemborosan budget iklan Anda. Integrasikan akun Meta Marketing (Facebook & Instagram Ads) Anda, dan biarkan AI Optimark memantau, mendistribusikan budget, serta mengoptimalkan kampanye Anda 24/7.
              </p>

              {/* Checkmarks */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#94C748]" />
                  <span className="text-[#1E280E] font-medium">Pengoptimalan budget lintas set iklan (CBO) otomatis</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#94C748]" />
                  <span className="text-[#1E280E] font-medium">Rekomendasi audiens potensial (Lookalike & Retargeting)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#94C748]" />
                  <span className="text-[#1E280E] font-medium">Dashboard performa ringkas & mudah dipahami pengusaha</span>
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
                  <span className="text-xs font-semibold text-gray-400 ml-4">optimark.io/ads-manager</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 border border-emerald-500/20">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  </span>
                  Optimasi AI Aktif
                </div>
              </div>

              {/* Body Stats Representation */}
              <div className="my-6 grid grid-cols-2 gap-4 flex-1">
                <div className="rounded-xl border border-gray-100 p-4 flex flex-col justify-between bg-gray-50/30">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Total Spent</span>
                    <div className="text-lg font-bold text-[#1E280E] mt-1">Rp 1.450.000</div>
                  </div>
                  <span className="text-[9px] text-gray-400 mt-2">Periode: 7 Hari Terakhir</span>
                </div>

                <div className="rounded-xl border border-[#94C748]/30 p-4 flex flex-col justify-between bg-[#94C748]/5">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Average ROAS</span>
                    <div className="text-2xl font-black text-[#1E280E] mt-1">4.2x</div>
                  </div>
                  <span className="text-[9px] text-emerald-600 font-bold mt-2">↑ 18% dari minggu lalu</span>
                </div>
              </div>

              {/* CPC & Conversion Progress */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Efisiensi Biaya per Klik (CPC)</span>
                    <span className="font-bold text-emerald-600">-24.3%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#94C748] rounded-full" style={{ width: "75%" }} />
                  </div>
                </div>

                <div className="rounded-xl bg-gray-900 p-4 text-white flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-xs">
                      <div className="font-bold">A/B Test Rekomendasi</div>
                      <div className="text-[10px] text-gray-400">Gunakan Headline B (CTR 5.8%)</div>
                    </div>
                  </div>
                  <span className="text-xs bg-[#94C748] text-gray-900 px-2.5 py-1 rounded font-bold">Terapkan</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Deep Feature List */}
          <div className="mt-28">
            <h2 className="text-3xl font-bold text-[#1E280E] text-center mb-16">
              Mengapa Menggunakan Ads Manager Optimark?
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
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 mb-6">
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
