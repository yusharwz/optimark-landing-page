"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/base/buttons/button";

export function CtaSection() {
  const t = useTranslations("cta");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

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
      id="cta"
      ref={containerRef}
      className="relative min-h-[700px] overflow-hidden py-16 lg:min-h-[1200px] lg:py-32"
    >
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "url('/images/hero-swatch.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "400px 400px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto hidden h-[900px] max-w-6xl lg:block">
        <motion.div
          style={{ y: y1, opacity: opacity1, scale: scale1 }}
          className="absolute left-[10%] top-0 z-10 w-[884px]"
        >
          <Image
            src="/images/cta/1.svg"
            alt=""
            width={884}
            height={720}
            className="rounded-3xl shadow-2xl"
          />
        </motion.div>

        <motion.div
          style={{ y: y2, opacity: opacity2, scale: scale2 }}
          className="absolute left-[8%] top-[52px] z-20 w-[984px]"
        >
          <Image
            src="/images/cta/2.svg"
            alt=""
            width={984}
            height={720}
            className="rounded-3xl shadow-2xl"
          />
        </motion.div>

        <motion.div
          style={{ y: y3, opacity: opacity3, scale: scale3 }}
          className="absolute left-[5%] top-[102px] z-30 w-[1084px]"
        >
          <Image
            src="/images/cta/3.svg"
            alt=""
            width={1084}
            height={720}
            className="rounded-3xl shadow-2xl"
          />
        </motion.div>

        <motion.div
          style={{ y: y4, opacity: opacity4, scale: scale4 }}
          className="absolute left-0 top-[200px] z-40 w-[1184px]"
        >
          <div className="relative rounded-3xl border border-[#94C748] shadow-2xl">
            <div className="absolute inset-0 rounded-3xl bg-[#94C748]/12" />
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

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
      >
        <h2 className="text-display text-4xl sm:text-5xl lg:text-6xl">
          {t("title")}
        </h2>
        <p className="text-lead mx-auto mt-5 max-w-xl text-lg sm:text-xl">
          {t("description")}
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button href="/pricing" size="xl" className="mt-10 sm:px-10">
            {t("button")}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
