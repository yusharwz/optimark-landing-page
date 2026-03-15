"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Send, Archive, Calendar } from "lucide-react";
import { Button } from "@/components/base/buttons/button";
import { useRef } from "react";
import {
  heroBadge,
  heroTitle,
  heroDescription,
  heroButton,
  heroImage,
} from "@/lib/animations";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section ref={containerRef} className="relative overflow-hidden min-h-screen">
      {/* Swatch background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/images/hero-swatch.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "400px 400px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="flex flex-col lg:flex-row lg:items-center gap-20">
          {/* Content */}
          <div className="flex-[3] space-y-8">
            <motion.div
              variants={heroBadge}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 rounded-full border border-[#D9D6FE] bg-[#F4F3FF] px-4 py-2"
            >
              <span className="text-sm font-medium text-[#5925DC]">
                Platform all-in-one digital marketing
              </span>
            </motion.div>

            <motion.div
              variants={heroTitle}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <h1 className="text-4xl font-bold tracking-tight text-[#1E280E] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
                Semua tools digital marketing dalam satu platform
              </h1>
              <motion.div variants={heroDescription}>
                <p className="max-w-xl text-xl text-[#535862]">
                  Jadwalkan konten, tingkatkan visibilitas SEO, optimalkan iklan, dan buat konten
                  lebih cepat dengan bantuan AI.
                </p>
              </motion.div>
            </motion.div>

            <motion.div variants={heroButton} initial="hidden" animate="visible">
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
            style={{ y, opacity, scale }}
            variants={heroImage}
            initial="hidden"
            animate="visible"
            className="mt-12 lg:mt-0 flex-[2]"
          >
            <BrowserMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BrowserMockup() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, 2]);

  return (
    <motion.div style={{ y, rotate }} className="relative mx-auto max-w-2xl">
      <Image
        src="/images/hero-illustration.svg"
        alt="Ilustrasi dashboard Optimark"
        width={800}
        height={640}
        priority
        className="h-auto w-full"
      />
    </motion.div>
  );
}
