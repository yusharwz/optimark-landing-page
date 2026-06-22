"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InteractiveDotGrid } from "@/components/InteractiveDotGrid";
import {
  Calendar,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Clock,
  Layout,
  Instagram,
  Facebook,
} from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function ContentPlannerPage() {
  const deepFeatures = [
    {
      title: "Kalender Visual Serbaguna",
      description: "Lihat dan jadwalkan semua postingan media sosial Anda dalam satu kalender terpadu. Ubah waktu postingan dengan mudah.",
      icon: Layout,
    },
    {
      title: "Koneksi Multi-Akun Instan",
      description: "Hubungkan profil Facebook Pages dan Instagram Business secara aman lewat integrasi OAuth resmi tanpa batas akun.",
      icon: Share2,
    },
    {
      title: "Waktu Posting Optimal (Smart Queue)",
      description: "Optimark menganalisis kapan audiens Anda paling aktif dan menyarankan waktu publikasi otomatis demi memaksimalkan impresi.",
      icon: Clock,
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
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#94C748]/10 px-4 py-1.5 text-xs font-semibold text-[#1E280E] border border-[#94C748]/20">
                <Calendar className="h-3 w-3 text-[#94C748]" />
                Modul Unggulan - Tersedia Sekarang
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#1E280E] sm:text-5xl lg:text-[3.5rem] leading-tight">
                Perencana Konten Otomatis & Cerdas
              </h1>
              <p className="mt-6 text-lg text-[#535862] leading-relaxed">
                Kelola, jadwalkan, dan publikasikan konten Anda ke berbagai halaman Facebook dan profil Instagram Business dari satu dashboard pusat yang intuitif. Hemat jam kerja tim marketing Anda setiap minggu.
              </p>

              {/* Checkmarks */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#94C748]" />
                  <span className="text-[#1E280E] font-medium">Auto-publishing tanpa perlu konfirmasi manual</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#94C748]" />
                  <span className="text-[#1E280E] font-medium">Workspace terpisah untuk setiap brand/klien Anda</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#94C748]" />
                  <span className="text-[#1E280E] font-medium">Asset library terpusat untuk menyimpan draft visual</span>
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
                  <span className="text-xs font-semibold text-gray-400 ml-4">optimark.io/scheduler</span>
                </div>
                <div className="flex gap-2">
                  <span className="h-5 w-5 rounded bg-blue-50 flex items-center justify-center"><Facebook className="h-3 w-3 text-blue-600" /></span>
                  <span className="h-5 w-5 rounded bg-pink-50 flex items-center justify-center"><Instagram className="h-3 w-3 text-pink-600" /></span>
                </div>
              </div>

              {/* Body Calendar representation */}
              <div className="my-6 grid grid-cols-3 gap-3 flex-1">
                {[
                  { day: "Senin", title: "Promo Gajian", time: "10:00", active: true, channel: "IG" },
                  { day: "Selasa", title: "Tips Bisnis #3", time: "14:15", active: true, channel: "FB" },
                  { day: "Rabu", title: "Drafting...", time: "09:00", active: false, channel: "IG" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl border p-4 flex flex-col justify-between transition-all ${
                      item.active
                        ? "border-[#94C748]/30 bg-[#94C748]/5 shadow-sm"
                        : "border-gray-100 bg-gray-50/50"
                    }`}
                  >
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400">{item.day}</div>
                      <div className={`text-xs font-bold mt-2 ${item.active ? "text-[#1E280E]" : "text-gray-400"}`}>
                        {item.title}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[10px] font-semibold text-gray-500">{item.time} WIB</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                        item.channel === "IG" ? "bg-pink-100 text-pink-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        {item.channel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating micro interaction */}
              <div className="rounded-xl bg-gray-900 p-4 text-white flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#94C748] animate-pulse" />
                  <div className="text-xs">
                    <div className="font-bold">Post Terjadwal Sukses!</div>
                    <div className="text-[10px] text-gray-400">Terpublikasi ke 2 halaman sosial</div>
                  </div>
                </div>
                <span className="text-xs bg-[#94C748] text-gray-900 px-2.5 py-1 rounded font-bold">Aktif</span>
              </div>
            </motion.div>
          </div>

          {/* Deep Feature List */}
          <div className="mt-28">
            <h2 className="text-3xl font-bold text-[#1E280E] text-center mb-16">
              Teknologi Cerdas di Balik Postingan Anda
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
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#94C748]/10 text-[#94C748] mb-6">
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
