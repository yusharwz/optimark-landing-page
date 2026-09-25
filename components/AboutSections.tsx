"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Eye, Target } from "lucide-react";
import { Button } from "@/components/base/buttons/button";
import { InteractiveDotGrid } from "@/components/InteractiveDotGrid";
import { Reveal } from "@/components/motion/Reveal";
import {
  ABOUT_CAPABILITY_ICONS,
  ABOUT_CAPABILITY_IDS,
  ABOUT_WORKFLOW_ICONS,
  ABOUT_WORKFLOW_IDS,
} from "@/config/about";
import { GET_STARTED_URL } from "@/config/site";
import { heroBadge, heroButton, heroDescription, heroTitle } from "@/lib/animations";

/**
 * About page sections, one per section of the approved "OPTIMARK About Us"
 * handoff (1–9), in the same order. Copy: `about` namespace. Per the handoff,
 * no statistics, client counts, awards, or certifications appear here.
 */

/** Section anchor the hero's secondary CTA scrolls to. */
const WHAT_WE_DO_ID = "what-we-do";

const eyebrowClass = "text-detail text-xs font-semibold uppercase tracking-[0.12em]";

/* 1 ─ Hero ───────────────────────────────────────────────────────────────── */

export function AboutHero() {
  const t = useTranslations("about.hero");

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(242,248,231,0.6) 100%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute right-0 top-4 opacity-30">
        <InteractiveDotGrid dotSize={1.5} dotGap={24} gridWidth={620} gridHeight={520} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
        <motion.p
          variants={heroBadge}
          initial="hidden"
          animate="visible"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-[#94C748]"
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          variants={heroTitle}
          initial="hidden"
          animate="visible"
          className="text-display mt-4 max-w-3xl text-4xl sm:text-5xl lg:text-6xl"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          variants={heroDescription}
          initial="hidden"
          animate="visible"
          className="text-lead mt-6 max-w-2xl text-base lg:text-lg"
        >
          {t("description")}
        </motion.p>

        <motion.div
          variants={heroButton}
          initial="hidden"
          animate="visible"
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Button href={GET_STARTED_URL} size="xl" iconTrailing={ArrowRight} className="text-white">
            {t("ctaPrimary")}
          </Button>
          {/* A scroll, not a `#hash` link: Button routes hrefs through the Next
              router, and Lenis does not handle anchor jumps. Native smooth
              scroll works alongside Lenis (same as ScrollUpButton), and the
              target's `scroll-mt-28` clears the fixed header. */}
          <Button
            color="secondary"
            size="xl"
            onClick={() =>
              document.getElementById(WHAT_WE_DO_ID)?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {t("ctaSecondary")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

/* 2 ─ Who We Are ─────────────────────────────────────────────────────────── */

export function AboutWhoWeAre() {
  const t = useTranslations("about.who");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section className="relative py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <Reveal y={30} duration={0.7} className="lg:col-span-4">
          <h2 className="text-display text-3xl lg:text-4xl">{t("title")}</h2>
        </Reveal>
        <Reveal y={30} duration={0.7} delay={0.1} className="space-y-5 lg:col-span-8">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lead text-base lg:text-lg">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* 3 + 4 ─ Vision & Mission ───────────────────────────────────────────────── */

export function AboutVisionMission() {
  const tv = useTranslations("about.vision");
  const tm = useTranslations("about.mission");
  const missions = tm.raw("items") as string[];

  return (
    <section className="relative py-20 lg:py-24" style={{ backgroundColor: "#F8FDF1" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal
          stagger
          staggerAmount={0.12}
          y={30}
          duration={0.7}
          className="grid gap-6 lg:grid-cols-2"
        >
          <div className="flex flex-col rounded-3xl border border-gray-200/80 bg-white p-8 lg:p-10">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#94C748]/12">
              <Eye className="h-5 w-5 text-[#94C748]" strokeWidth={1.75} aria-hidden />
            </span>
            <h2 className="text-display mt-6 text-2xl">{tv("title")}</h2>
            <p className="text-display mt-5 text-xl font-medium leading-snug lg:text-2xl">
              {tv("text")}
            </p>
          </div>

          <div className="flex flex-col rounded-3xl border border-gray-200/80 bg-white p-8 lg:p-10">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#94C748]/12">
              <Target className="h-5 w-5 text-[#94C748]" strokeWidth={1.75} aria-hidden />
            </span>
            <h2 className="text-display mt-6 text-2xl">{tm("title")}</h2>
            <p className="text-lead mt-5 text-base">{tm("intro")}</p>
            <ul className="mt-4 space-y-3">
              {missions.map((mission) => (
                <li key={mission} className="text-lead flex gap-3 text-base">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#94C748]"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span>{mission}</span>
                </li>
              ))}
            </ul>
            <p className="text-detail mt-6 border-t border-gray-200/80 pt-5 text-sm">
              {tm("closing")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 5 ─ What We Do ─────────────────────────────────────────────────────────── */

export function AboutWhatWeDo() {
  const t = useTranslations("about.whatWeDo");

  return (
    <section id={WHAT_WE_DO_ID} className="relative scroll-mt-28 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal y={30} duration={0.7} className="max-w-2xl">
          <h2 className="text-display text-3xl lg:text-4xl">{t("title")}</h2>
          <p className="text-lead mt-4 text-base lg:text-lg">{t("intro")}</p>
        </Reveal>

        {/* Six-card grid, per the handoff note on "What We Do". */}
        <Reveal
          stagger
          staggerAmount={0.08}
          y={30}
          duration={0.6}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ABOUT_CAPABILITY_IDS.map((id) => {
            const Icon = ABOUT_CAPABILITY_ICONS[id];
            return (
              <div
                key={id}
                className="rounded-3xl border border-gray-200/80 bg-white p-7 transition-colors duration-200 hover:border-[#94C748]/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#94C748]/12">
                  <Icon className="h-5 w-5 text-[#94C748]" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="text-display mt-6 text-lg">{t(`items.${id}.title`)}</h3>
                <p className="text-lead mt-3 text-sm lg:text-base">
                  {t(`items.${id}.description`)}
                </p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* 6 ─ How OPTIMARK Helps Businesses ──────────────────────────────────────── */

export function AboutHowItHelps() {
  const t = useTranslations("about.howItHelps");

  return (
    <section className="relative py-20 lg:py-24" style={{ backgroundColor: "#F8FDF1" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal y={30} duration={0.7} className="max-w-2xl">
          <h2 className="text-display text-3xl lg:text-4xl">{t("title")}</h2>
          <p className="text-lead mt-4 text-base lg:text-lg">{t("intro")}</p>
        </Reveal>

        <Reveal
          as="ol"
          stagger
          staggerAmount={0.08}
          y={30}
          duration={0.6}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ABOUT_WORKFLOW_IDS.map((id, index) => {
            const Icon = ABOUT_WORKFLOW_ICONS[id];
            return (
              <li
                key={id}
                className="flex gap-4 rounded-2xl border border-gray-200/80 bg-white p-6"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#94C748]/12">
                  <Icon className="h-5 w-5 text-[#94C748]" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <p className="text-detail text-xs font-semibold tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-display mt-0.5 text-base">{t(`steps.${id}.title`)}</h3>
                  <p className="text-lead mt-1.5 text-sm">{t(`steps.${id}.description`)}</p>
                </div>
              </li>
            );
          })}
        </Reveal>

        <Reveal y={20} duration={0.6} className="mt-10 max-w-3xl">
          <p className="text-lead text-base lg:text-lg">{t("closing")}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* 7 + 8 ─ Developed by UKI · Our Commitment ──────────────────────────────── */

export function AboutUkiCommitment() {
  const tu = useTranslations("about.uki");
  const tc = useTranslations("about.commitment");
  const ukiParagraphs = tu.raw("paragraphs") as string[];
  const commitments = tc.raw("items") as string[];

  return (
    <section className="relative py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal y={30} duration={0.7}>
          <p className={eyebrowClass}>{tu("eyebrow")}</p>
          <h2 className="text-display mt-3 text-3xl lg:text-4xl">{tu("title")}</h2>
          <div className="mt-6 space-y-5">
            {ukiParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-lead text-base lg:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal y={30} duration={0.7} delay={0.1}>
          <div className="rounded-3xl border border-gray-200/80 bg-white p-8 lg:p-10">
            <h2 className="text-display text-2xl lg:text-3xl">{tc("title")}</h2>
            <p className="text-lead mt-4 text-base">{tc("intro")}</p>
            <ul className="mt-5 space-y-3">
              {commitments.map((item) => (
                <li key={item} className="text-lead flex gap-3 text-base">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#94C748]"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-detail mt-6 border-t border-gray-200/80 pt-5 text-sm">
              {tc("closing")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 9 ─ Closing tagline ────────────────────────────────────────────────────── */

export function AboutClosing() {
  const t = useTranslations("about.closing");

  return (
    // Same dark band and glow as CtaSection, so the page ends on the site's
    // familiar closing note — but with the handoff's own tagline.
    <section
      className="relative overflow-hidden py-24 sm:py-28"
      style={{ backgroundColor: "#15200f" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[130px]"
        style={{ background: "#7bad3e" }}
      />
      <Reveal y={30} duration={0.8} className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#94C748]">OPTIMARK</p>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          {t("title")}
        </h2>
        <div className="mt-10">
          <Button href={GET_STARTED_URL} size="xl" className="text-white sm:px-10">
            {t("cta")}
          </Button>
        </div>
        <p className="mt-4 text-xs text-[#aab4a6]">{t("note")}</p>
      </Reveal>
    </section>
  );
}
