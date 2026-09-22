"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Building2, FileText, Mail, ShieldCheck, Target } from "lucide-react";
import { Button } from "@/components/base/buttons/button";
import { InteractiveDotGrid } from "@/components/InteractiveDotGrid";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import {
  ABOUT_V2_REASON_ICONS,
  ABOUT_V2_REASON_IDS,
  ABOUT_V2_SECURITY_ICONS,
  ABOUT_V2_SECURITY_IDS,
} from "@/config/about-v2";
import { CLIENT_AREA_URL, GET_STARTED_URL, SITE } from "@/config/site";
import { featureHref } from "@/config/features";
import { heroBadge, heroButton, heroDescription, heroTitle } from "@/lib/animations";

/**
 * An alternative About page, structured after javafx.co.id/about:
 * hero → who we are → vision & mission → product highlight → why choose us →
 * legal identity → data security.
 *
 * Two deliberate departures from the reference. It carries no licence or
 * certification badges, because Optimark holds none of the regulator
 * credentials a futures broker does, and the security section states the
 * privacy policy's own caveat rather than implying a guarantee.
 */

const HIGHLIGHT_KEYS = ["entity", "product", "market", "model"] as const;
const STAT_KEYS = ["score", "modules", "platforms"] as const;

export function AboutV2Hero() {
  const t = useTranslations("aboutV2.hero");

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

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <motion.span
          variants={heroBadge}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#94C748]/20 bg-[#94C748]/10 px-4 py-1.5 text-xs font-semibold text-[#1E280E]"
        >
          {t("badge")}
        </motion.span>

        <motion.h1
          variants={heroTitle}
          initial="hidden"
          animate="visible"
          className="text-display mt-5 max-w-4xl text-3xl sm:text-4xl lg:text-5xl"
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
          <Button href={GET_STARTED_URL} size="xl" className="text-white">
            {t("ctaPrimary")}
          </Button>
          <Button href={CLIENT_AREA_URL} color="secondary" size="xl">
            {t("ctaSecondary")}
          </Button>
          <span className="text-detail w-full text-xs sm:w-auto sm:pl-2">{t("ctaNote")}</span>
        </motion.div>
      </div>
    </section>
  );
}

export function AboutV2Who() {
  const t = useTranslations("aboutV2.who");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal y={30} duration={0.7}>
            <span className="text-detail text-xs font-semibold uppercase tracking-[0.12em]">
              {t("badge")}
            </span>
            <h2 className="text-display mt-4 text-2xl sm:text-3xl lg:text-4xl">{t("title")}</h2>
            <div className="mt-6 space-y-5">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-lead text-base lg:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal y={30} duration={0.7} delay={0.1}>
            <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-gray-200/80 bg-gray-200/80 sm:grid-cols-2">
              {HIGHLIGHT_KEYS.map((key) => (
                <div key={key} className="bg-white p-6">
                  <dt className="text-detail text-xs font-semibold uppercase tracking-[0.1em]">
                    {t(`highlights.${key}.label`)}
                  </dt>
                  <dd className="text-display mt-2 text-base">{t(`highlights.${key}.value`)}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function AboutV2VisionMission() {
  const t = useTranslations("aboutV2.visionMission");
  const missions = t.raw("missions") as string[];

  return (
    <section className="relative py-20 lg:py-24" style={{ backgroundColor: "#F8FDF1" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal y={30} duration={0.7}>
          <span className="text-detail text-xs font-semibold uppercase tracking-[0.12em]">
            {t("badge")}
          </span>
        </Reveal>

        <Reveal
          stagger
          staggerAmount={0.12}
          y={30}
          duration={0.7}
          className="mt-6 grid gap-6 lg:grid-cols-2"
        >
          <div className="rounded-3xl border border-gray-200/80 bg-white p-8 lg:p-10">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#94C748]/12">
              <Target className="h-5 w-5 text-[#94C748]" strokeWidth={1.75} aria-hidden />
            </div>
            <h2 className="text-display mt-6 text-xl lg:text-2xl">{t("visionLabel")}</h2>
            <p className="text-lead mt-4 text-base lg:text-lg">{t("vision")}</p>
          </div>

          <div className="rounded-3xl border border-gray-200/80 bg-white p-8 lg:p-10">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#94C748]/12">
              <ShieldCheck className="h-5 w-5 text-[#94C748]" strokeWidth={1.75} aria-hidden />
            </div>
            <h2 className="text-display mt-6 text-xl lg:text-2xl">{t("missionLabel")}</h2>
            <ol className="mt-5 space-y-4">
              {missions.map((mission, index) => (
                <li key={mission} className="text-lead flex gap-3 text-sm lg:text-base">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#94C748]/12 text-xs font-semibold text-[#1E280E]"
                  >
                    {index + 1}
                  </span>
                  <span>{mission}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutV2Highlight() {
  const t = useTranslations("aboutV2.highlight");

  return (
    <section className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal y={30} duration={0.7}>
          <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white">
            <div className="grid gap-10 p-8 lg:grid-cols-2 lg:gap-16 lg:p-12">
              <div>
                <span className="text-detail text-xs font-semibold uppercase tracking-[0.12em]">
                  {t("badge")}
                </span>
                <h2 className="text-display mt-4 text-2xl sm:text-3xl">{t("title")}</h2>
                <p className="text-lead mt-5 text-base lg:text-lg">{t("description")}</p>
                <Link
                  href={featureHref("seo")}
                  className="mt-7 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[#1E280E] transition-colors hover:text-[#94C748] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2"
                >
                  {t("linkLabel")}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>

              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {STAT_KEYS.map((key) => (
                  <div
                    key={key}
                    className="rounded-2xl border border-[#94C748]/25 bg-[#F8FDF1] p-6"
                  >
                    <dt className="text-display text-2xl lg:text-3xl">{t(`stats.${key}.value`)}</dt>
                    <dd className="text-detail mt-1.5 text-sm">{t(`stats.${key}.label`)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutV2Reasons() {
  const t = useTranslations("aboutV2.reasons");

  return (
    <section className="relative py-20 lg:py-24" style={{ backgroundColor: "#F8FDF1" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal y={30} duration={0.7} className="max-w-2xl">
          <span className="text-detail text-xs font-semibold uppercase tracking-[0.12em]">
            {t("badge")}
          </span>
          <h2 className="text-display mt-4 text-2xl sm:text-3xl lg:text-4xl">{t("title")}</h2>
          <p className="text-lead mt-5 text-base lg:text-lg">{t("description")}</p>
        </Reveal>

        <Reveal
          stagger
          staggerAmount={0.08}
          y={30}
          duration={0.6}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ABOUT_V2_REASON_IDS.map((id) => {
            const Icon = ABOUT_V2_REASON_ICONS[id];
            return (
              <div
                key={id}
                className="rounded-3xl border border-gray-200/80 bg-white p-7 transition-colors duration-200 hover:border-[#94C748]/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#94C748]/12">
                  <Icon className="h-5 w-5 text-[#94C748]" strokeWidth={1.75} aria-hidden />
                </div>
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

export function AboutV2Legal() {
  const t = useTranslations("aboutV2.legal");

  return (
    <section className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal y={30} duration={0.7}>
            <span className="text-detail text-xs font-semibold uppercase tracking-[0.12em]">
              {t("badge")}
            </span>
            <h2 className="text-display mt-4 text-2xl sm:text-3xl lg:text-4xl">{t("title")}</h2>
            <p className="text-lead mt-5 text-base lg:text-lg">{t("description")}</p>
            <p className="text-detail mt-5 text-sm">{t("note")}</p>
          </Reveal>

          <Reveal y={30} duration={0.7} delay={0.1}>
            <dl className="divide-y divide-gray-200/80 overflow-hidden rounded-3xl border border-gray-200/80 bg-white">
              <div className="p-6">
                <dt className="text-detail flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.1em]">
                  <Building2 className="h-4 w-4 text-[#94C748]" strokeWidth={1.75} />
                  {t("entityLabel")}
                </dt>
                <dd className="text-display mt-2 text-base">{t("entityValue")}</dd>
              </div>

              <div className="p-6">
                <dt className="text-detail flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.1em]">
                  <ShieldCheck className="h-4 w-4 text-[#94C748]" strokeWidth={1.75} />
                  {t("brandLabel")}
                </dt>
                <dd className="text-display mt-2 text-base">{t("brandValue")}</dd>
              </div>

              <a
                href={`mailto:${SITE.contactEmail}`}
                className="block p-6 transition-colors duration-200 hover:bg-[#F8FDF1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#94C748]"
              >
                <dt className="text-detail flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.1em]">
                  <Mail className="h-4 w-4 text-[#94C748]" strokeWidth={1.75} />
                  {t("emailLabel")}
                </dt>
                <dd className="text-display mt-2 text-base">{SITE.contactEmail}</dd>
              </a>

              <Link
                href="/terms-of-service"
                className="block p-6 transition-colors duration-200 hover:bg-[#F8FDF1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#94C748]"
              >
                <dt className="text-detail flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.1em]">
                  <FileText className="h-4 w-4 text-[#94C748]" strokeWidth={1.75} />
                  {t("termsLabel")}
                </dt>
                <dd className="text-display mt-2 text-base">{t("termsValue")}</dd>
              </Link>

              <Link
                href="/privacy-policy"
                className="block p-6 transition-colors duration-200 hover:bg-[#F8FDF1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#94C748]"
              >
                <dt className="text-detail flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.1em]">
                  <FileText className="h-4 w-4 text-[#94C748]" strokeWidth={1.75} />
                  {t("privacyLabel")}
                </dt>
                <dd className="text-display mt-2 text-base">{t("privacyValue")}</dd>
              </Link>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function AboutV2Security() {
  const t = useTranslations("aboutV2.security");

  return (
    <section className="relative border-t border-gray-200/80 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal y={30} duration={0.7} className="max-w-2xl">
          <span className="text-detail text-xs font-semibold uppercase tracking-[0.12em]">
            {t("badge")}
          </span>
          <h2 className="text-display mt-4 text-2xl sm:text-3xl lg:text-4xl">{t("title")}</h2>
          <p className="text-lead mt-5 text-base lg:text-lg">{t("description")}</p>
        </Reveal>

        <Reveal
          stagger
          staggerAmount={0.08}
          y={30}
          duration={0.6}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ABOUT_V2_SECURITY_IDS.map((id) => {
            const Icon = ABOUT_V2_SECURITY_ICONS[id];
            return (
              <div key={id} className="rounded-3xl border border-gray-200/80 bg-white p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#94C748]/12">
                  <Icon className="h-5 w-5 text-[#94C748]" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="text-display mt-6 text-base">{t(`items.${id}.title`)}</h3>
                <p className="text-lead mt-3 text-sm">{t(`items.${id}.description`)}</p>
              </div>
            );
          })}
        </Reveal>

        <Reveal y={30} duration={0.7} className="mt-10">
          <div className="rounded-2xl border border-gray-200/80 bg-gray-50/60 p-6 lg:p-8">
            <p className="text-lead text-sm">{t("disclaimer")}</p>
            <Link
              href="/privacy-policy"
              className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[#1E280E] transition-colors hover:text-[#94C748] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2"
            >
              {t("linkLabel")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
