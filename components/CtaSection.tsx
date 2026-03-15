"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/base/buttons/button";

export function CtaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Vertical stack animations - images appear from bottom with much longer scroll travel
  const y1 = useTransform(scrollYProgress, [0, 0.4], [300, -100]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const scale1 = useTransform(scrollYProgress, [0, 0.4], [0.8, 1]);

  const y2 = useTransform(scrollYProgress, [0.15, 0.55], [300, -100]);
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const scale2 = useTransform(scrollYProgress, [0.15, 0.55], [0.8, 1]);

  const y3 = useTransform(scrollYProgress, [0.3, 0.7], [300, -100]);
  const opacity3 = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);
  const scale3 = useTransform(scrollYProgress, [0.3, 0.7], [0.8, 1]);

  const y4 = useTransform(scrollYProgress, [0.45, 0.85], [300, -100]);
  const opacity4 = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);
  const scale4 = useTransform(scrollYProgress, [0.45, 0.85], [0.8, 1]);

  const contentY = useTransform(scrollYProgress, [0.4, 0.7], [50, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-16 lg:py-32 min-h-[700px] lg:min-h-[1200px]"
    >
      {/* Swatch background */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "url('/images/hero-swatch.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "400px 400px",
        }}
        aria-hidden
      />

      {/* Vertically stacked images */}
      <div className="relative mx-auto hidden h-[900px] max-w-6xl lg:block">
        {/* Image 1 - top, narrowest */}
        <motion.div
          style={{ y: y1, opacity: opacity1, scale: scale1 }}
          className="absolute top-0 left-[10%] w-[884px] z-10"
        >
          <Image
            src="/images/cta/1.svg"
            alt=""
            width={884}
            height={720}
            className="rounded-3xl shadow-2xl"
          />
        </motion.div>

        {/* Image 2 - second from top */}
        <motion.div
          style={{ y: y2, opacity: opacity2, scale: scale2 }}
          className="absolute top-[52px] left-[8%] w-[984px] z-20"
        >
          <Image
            src="/images/cta/2.svg"
            alt=""
            width={984}
            height={720}
            className="rounded-3xl shadow-2xl"
          />
        </motion.div>

        {/* Image 3 - third from top */}
        <motion.div
          style={{ y: y3, opacity: opacity3, scale: scale3 }}
          className="absolute top-[102px] left-[5%] w-[1084px] z-30"
        >
          <Image
            src="/images/cta/3.svg"
            alt=""
            width={1084}
            height={720}
            className="rounded-3xl shadow-2xl"
          />
        </motion.div>

        {/* Image 4 - bottom, widest, with green tint */}
        <motion.div
          style={{ y: y4, opacity: opacity4, scale: scale4 }}
          className="absolute top-[200px] left-0 w-[1184px] z-40"
        >
          <div className="relative rounded-3xl shadow-2xl border border-[#94C748]">
            <div className="absolute inset-0 bg-[#94C748]/12 rounded-3xl" />
            <Image
              src="/images/cta/4.svg"
              alt=""
              width={1184}
              height={720}
              className="rounded-3xl"
            />
          </div>
        </motion.div>

      </div>

      {/* Mobile single image */}
      <div className="relative mx-auto mt-4 block w-full max-w-xl px-4 lg:hidden">
        <div className="relative overflow-hidden rounded-3xl border border-[#94C748] bg-[#F3F9E8]">
          <Image
            src="/images/cta-figma/cta-image.png"
            alt=""
            width={1184}
            height={720}
            className="h-auto w-full"
          />
        </div>
      </div>

      {/* CTA Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
      >
        <h2 className="text-2xl font-semibold text-[#1E280E] sm:text-3xl lg:text-4xl">
          Siap mengembangkan bisnis digital Anda?
        </h2>
        <p className="mt-3 text-base text-[#535862] sm:mt-4 sm:text-lg">
          Mulai gratis hari ini. Tidak perlu kartu kredit.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button href="#" size="xl" className="mt-8">
            Coba Sekarang
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
