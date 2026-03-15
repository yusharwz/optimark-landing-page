"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Send, Archive, Calendar } from "lucide-react";
import { Button } from "@/components/base/buttons/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Swatch background */}
      <div
        className="absolute inset-0 opacity-10"
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
                Jadwalkan konten, tingkatkan visibilitas SEO, optimalkan iklan, dan buat konten
                lebih cepat dengan bantuan AI.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                href="#"
                color="primary"
                size="lg"
              >
                Coba Gratis
              </Button>
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
    <div className="relative mx-auto max-w-xl">
      <Image
        src="/images/hero-illustration.svg"
        alt="Ilustrasi dashboard Optimark"
        width={800}
        height={640}
        priority
        className="h-auto w-full"
      />
    </div>
  );
}
