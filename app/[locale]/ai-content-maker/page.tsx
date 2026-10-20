"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { AiCaptionModal } from "@/components/ai-caption";
import { BestTimeModal } from "@/components/best-time";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeatureNavSection } from "@/components/FeatureNavSection";
import { SeoFaqSection } from "@/components/SeoFaqSection";
import { InteractiveDotGrid } from "@/components/InteractiveDotGrid";
import {
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  CalendarCheck,
  Clock,
  PenTool,
  MessageSquare,
  Wand2,
} from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { useTranslations } from "next-intl";

export default function AiContentMakerPage() {
  const t = useTranslations("featureDetail");
  const cardIcons = [MessageSquare, Wand2, Clock, CalendarCheck, PenTool];
  const mockups = [
    {
      key: "caption",
      node: <AiCaptionModal className="pointer-events-none shadow-2xl" />,
    },
    {
      key: "best-time",
      node: <BestTimeModal className="shadow-2xl" />,
    },
  ];
  const [[slide, direction], setSlideState] = useState<[number, number]>([0, 0]);
  const paginate = (dir: number) =>
    setSlideState(([s]) => [(s + dir + mockups.length) % mockups.length, dir]);
  const nextSlide = () => paginate(1);
  const prevSlide = () => paginate(-1);
  const goToSlide = (i: number) => setSlideState(([s]) => [i, i > s ? 1 : -1]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
  };

  const checks = t.raw("ai.checks") as string[];
  const deepFeatures = (t.raw("ai.cards") as { title: string; description: string }[]).map(
    (card, i) => ({ ...card, icon: cardIcons[i] }),
  );

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
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#94C748]/10 px-4 py-1.5 text-xs font-semibold text-[#1E280E] border border-[#94C748]/20">
                <Sparkles className="h-3 w-3 text-[#94C748]" />
                {t("ai.badge")}
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#1E280E] sm:text-5xl lg:text-[3.5rem] leading-tight">
                {t("ai.title")}
              </h1>
              <p className="mt-6 text-lg text-[#535862] leading-relaxed">{t("ai.description")}</p>

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

            {/* Premium Mockup Carousel (Visual Demonstration) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full">
                <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                  <motion.div
                    key={slide}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      const swipe = info.offset.x;
                      const velocity = info.velocity.x;
                      if (swipe < -60 || velocity < -400) nextSlide();
                      else if (swipe > 60 || velocity > 400) prevSlide();
                    }}
                    className="flex w-full cursor-grab touch-pan-y select-none items-center justify-center p-1 sm:p-2 active:cursor-grabbing"
                  >
                    {mockups[slide].node}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dots */}
              <div className="mt-4 flex justify-center gap-2">
                {mockups.map((m, i) => (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => goToSlide(i)}
                    aria-label={`Tampilkan preview ${i + 1}`}
                    aria-current={slide === i}
                    className={`h-2 rounded-full transition-all ${
                      slide === i ? "w-6 bg-[#94C748]" : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Deep Feature List */}
          <div className="mt-28">
            <h2 className="text-3xl font-bold text-[#1E280E] text-center mb-16">
              {t("ai.deepTitle")}
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
                  <p className="mt-3 text-sm text-[#535862] leading-relaxed">{feat.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* SEO Content FAQ Section */}
          <SeoFaqSection
            pageKey="ai-content-maker"
            className="pt-16 sm:pt-24 pb-0"
            containerClassName="px-0"
          />
        </div>
      </main>

      <FeatureNavSection current="ai" />
      <Footer />
    </div>
  );
}
