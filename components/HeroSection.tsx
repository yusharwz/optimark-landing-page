"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/base/buttons/button";
import { InteractiveDotGrid } from "@/components/InteractiveDotGrid";
import { useCallback, useRef, useState } from "react";
import {
  heroBadge,
  heroTitle,
  heroDescription,
  heroButton,
  heroImage,
} from "@/lib/animations";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive dot grid background (replaces hero-swatch.png) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y }}
        aria-hidden
      >
        <InteractiveDotGrid
          className="absolute inset-0 w-full h-full"
          mousePosition={mousePos}
        />
      </motion.div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-4 pb-24 pt-24 sm:px-6 lg:px-8 lg:pb-32 lg:pt-28">
        <div className="flex flex-col-reverse gap-12 lg:flex-row lg:items-center lg:gap-20">
          {/* Content */}
          <div className="flex-[3] space-y-6 text-center lg:space-y-8 lg:text-left">
            <motion.div
              variants={heroBadge}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm"
            >
              <span className="font-semibold text-brand-700">
                🚀 Platform Automasi Pemasaran Digital Berbasis AI
              </span>
            </motion.div>
 
            <motion.div
              variants={heroTitle}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <h1 className="text-balance text-3xl font-bold tracking-tight text-[#1E280E] sm:text-4xl lg:text-[3.5rem] lg:leading-[1.1]">
                Otomatisasikan Seluruh Pemasaran Digital Anda dengan Kekuatan AI
              </h1>
              <motion.div variants={heroDescription}>
                <p className="mx-auto max-w-xl text-base text-[#535862] sm:text-lg lg:mx-0">
                  Optimark mengotomatiskan perencanaan konten media sosial, riset SEO, pembuatan materi kreatif, hingga pengoptimalan iklan Facebook & Instagram Anda secara cerdas dalam satu platform terintegrasi.
                </p>
              </motion.div>
            </motion.div>

            <motion.div variants={heroButton} initial="hidden" animate="visible">
              <Button
                href="#"
                color="primary"
                size="lg"
                className="mt-4 w-full sm:w-auto sm:px-8"
              >
                Coba Gratis
              </Button>
            </motion.div>
          </div>

          {/* Browser mockup + app preview */}
          <motion.div
            style={{ y, scale }}
            variants={heroImage}
            initial="hidden"
            animate="visible"
            className="mt-8 flex-[2] lg:mt-0"
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
