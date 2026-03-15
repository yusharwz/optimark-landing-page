"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Send, Archive, Calendar } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Swatch background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "url('/images/hero-swatch.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "400px 400px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">
          {/* Content */}
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#D9D6FE] bg-[#F4F3FF] px-4 py-2"
            >
              <span className="text-sm font-medium text-[#5925DC]">
                Platform all-in-one digital marketing
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <h1 className="text-4xl font-bold tracking-tight text-[#1E280E] sm:text-5xl lg:text-[3rem] lg:leading-[1.1]">
                Semua tools digital marketing dalam satu platform
              </h1>
              <p className="max-w-xl text-xl text-[#535862]">
                Jadwalkan konten, tingkatkan visibilitas SEO, optimalkan iklan,
                dan buat konten lebih cepat dengan bantuan AI.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a
                href="#"
                className={cn(
                  "inline-flex h-12 items-center justify-center rounded-lg px-8 text-base font-semibold",
                  "bg-[#5925DC] text-white shadow-sm",
                  "transition-colors hover:bg-[#4c1fc4] focus:outline-none focus:ring-2 focus:ring-[#5925DC] focus:ring-offset-2"
                )}
              >
                Coba Gratis
              </a>
            </motion.div>
          </div>

          {/* Browser mockup + app preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 lg:mt-0 flex-1"
          >
            <BrowserMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BrowserMockup() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E9EAEB] bg-white shadow-xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-[#E9EAEB] bg-[#F5F5F5] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#FF6058]" />
          <span className="h-3 w-3 rounded-full bg-[#FFC130]" />
          <span className="h-3 w-3 rounded-full bg-[#27CA40]" />
        </div>
        <div className="ml-4 flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#E9EAEB] bg-white px-4 py-2">
          <span className="text-sm text-[#1877F2]">🔒</span>
          <span className="text-sm text-[#5F6368]">
            optimark.ai<span className="text-[#A4A7AE]">/</span>
          </span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="border-b border-[#E9EAEB] bg-white px-4 py-2">
        <span className="rounded-t-lg bg-white px-4 py-2 text-sm font-medium text-[#1E280E] shadow-sm">
          OPTIMARK
        </span>
      </div>

      {/* App preview area */}
      <div className="flex items-start gap-6 p-6 bg-[#FAFAFA]">
        {/* Icon boxes - decorative */}
        <div className="flex flex-col gap-4">
          <div className="h-16 w-16 rounded-2xl border border-[#E9EAEB] bg-white shadow-sm" />
          <div className="h-16 w-16 rounded-2xl border border-[#E9EAEB] bg-white shadow-sm" />
        </div>

        {/* Content preview cards */}
        <div className="flex-1 space-y-3">
          <div className="rounded-xl border border-[#E9EAEB] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-medium text-[#1E280E]">
                <span className="rounded bg-[#5925DC]/10 p-1">✨</span>
                Buat Postingan
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Send, label: "Posting Sekarang" },
              { icon: Archive, label: "Simpan Draft" },
              { icon: Calendar, label: "Jadwalkan Postingan" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-lg border border-[#E9EAEB] bg-white px-3 py-2.5 shadow-sm"
              >
                <item.icon className="h-4 w-4 text-[#535862]" />
                <span className="text-xs font-medium text-[#1E280E]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
