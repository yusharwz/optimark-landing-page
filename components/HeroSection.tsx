"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ArrowRight, Sparkles, Clock } from "lucide-react";
import { AiCaptionModal } from "./ai-caption";
import { BestTimeModal } from "./best-time";
import { heroBadge, heroTitle, heroDescription, heroImage } from "@/lib/animations";

/**
 * Hero background — a self-contained dark canvas scoped to this section only
 * (it does not leak into the features area below). A generated abstract image
 * (near-black base + green glow off the top-right) sits under a light
 * top/bottom darkening overlay that keeps the centered copy legible. `#090c05`
 * is the base fallback if the image fails to load. Swap `hero-bg.png` to change
 * the art.
 */
const HERO_BG =
  "linear-gradient(180deg, rgba(9,12,5,0.55) 0%, rgba(9,12,5,0.2) 42%, rgba(9,12,5,0.72) 100%)," +
  "url(/images/hero-bg.png) center/cover no-repeat," +
  "#090c05";

/**
 * The centered options toggle drives which animated demo renders below. Only
 * two real demos exist today (AI caption + best time to post), so the switcher
 * offers exactly those two choices.
 */
type DemoKind = "caption" | "bestTime";
type SwitcherId = "content" | "schedule";

const SWITCHER: { id: SwitcherId; demo: DemoKind; Icon: typeof Sparkles }[] = [
  { id: "content", demo: "caption", Icon: Sparkles },
  { id: "schedule", demo: "bestTime", Icon: Clock },
];

function HeroDemo({ demo }: { demo: DemoKind }) {
  // A fresh mount each time `demo`/key changes so the internal typewriter +
  // reveal animation replays whenever the user switches option.
  if (demo === "bestTime") {
    // Best time to post is rendered exactly as-is — natural height, untouched.
    return <BestTimeModal className="pointer-events-none w-full" />;
  }
  // Only the AI caption card is height-matched to best-time's footprint.
  return <AiCaptionModal className="pointer-events-none w-full lg:h-[460px]" />;
}

export function HeroSection() {
  const t = useTranslations("hero");
  const [activeId, setActiveId] = useState<SwitcherId>(SWITCHER[0].id);
  const active = SWITCHER.find((s) => s.id === activeId) ?? SWITCHER[0];

  return (
    <section className="relative z-10 flex min-h-screen flex-col overflow-hidden lg:h-screen">
      {/* Full-bleed dark background — scoped to the hero section only. The
          section is exactly one viewport tall on desktop (lg:h-screen), so the
          dark canvas covers the screen and ends right where the next section
          begins — no extra black past the fold. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: HERO_BG }}
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-4 pt-24 pb-8 text-center min-h-0 sm:px-6 lg:px-8 lg:pt-24">
        {/* Badge */}
        <motion.div
          variants={heroBadge}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs backdrop-blur-sm sm:text-sm"
        >
          <span className="font-medium text-white/70">{t("badge")}</span>
          <ArrowRight className="h-3.5 w-3.5 text-[#94C748]" />
        </motion.div>

        {/* Tagline (unchanged copy) */}
        <motion.h1
          variants={heroTitle}
          initial="hidden"
          animate="visible"
          className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl lg:text-[3rem] lg:leading-[1.12]"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          variants={heroDescription}
          initial="hidden"
          animate="visible"
          className="mt-4 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
        >
          {t("description")}
        </motion.p>

        {/* CTAs */}
        {/* <motion.div
          variants={heroButton}
          initial="hidden"
          animate="visible"
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://staging.app.optimark.ai/login"
            className="group inline-flex items-center gap-2 rounded-full bg-[#94C748] px-6 py-3 text-sm font-semibold text-[#1E280E] transition hover:brightness-95"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            className="group inline-flex items-center gap-3 text-sm font-semibold text-white/80 transition hover:text-white"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 transition group-hover:border-white/40">
              <Play className="h-3.5 w-3.5 fill-current" />
            </span>
            {t("ctaSecondary")}
          </button>
        </motion.div> */}

        {/* Options: centered segmented toggle (2 choices) */}
        <motion.div
          variants={heroDescription}
          initial="hidden"
          animate="visible"
          className="mt-5 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm"
        >
          {SWITCHER.map(({ id, Icon }) => {
            const isActive = id === activeId;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveId(id)}
                aria-pressed={isActive}
                className="relative rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5"
              >
                {isActive && (
                  <motion.span
                    layoutId="heroToggle"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={`relative z-10 flex items-center gap-2 whitespace-nowrap ${
                    isActive ? "text-[#1E280E]" : "text-white/70 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t(`switcher.${id}`)}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Examples: the animated workspace demo for the active option.
            `flex-1 min-h-0` makes this wrapper soak up whatever vertical space
            is left in the (fixed-height) hero, and the card is centered inside
            it. So the demo growing/shrinking — or switching between the two —
            never changes the section height; the leftover space just flexes. */}
        <motion.div
          variants={heroImage}
          initial="hidden"
          animate="visible"
          className="mt-6 flex w-full max-w-[720px] flex-1 items-start justify-center min-h-0"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full text-left shadow-2xl shadow-black/40"
            >
              <HeroDemo demo={active.demo} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
