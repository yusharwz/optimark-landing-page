"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import {
  ABOUT_COMMITMENT_ICONS,
  ABOUT_COMMITMENT_IDS,
  ABOUT_PRINCIPLE_ICONS,
  ABOUT_PRINCIPLE_IDS,
} from "@/config/about";

export function AboutPrinciplesSection() {
  const t = useTranslations("about.principles");
  const tc = useTranslations("about.commitments");

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
          staggerAmount={0.1}
          y={30}
          duration={0.6}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {ABOUT_PRINCIPLE_IDS.map((id) => {
            const Icon = ABOUT_PRINCIPLE_ICONS[id];
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

        {/* Commitments */}
        <Reveal y={30} duration={0.7} className="mt-16">
          <div className="rounded-3xl border border-gray-200/80 bg-white p-8 lg:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <h3 className="text-display text-xl lg:text-2xl">{tc("title")}</h3>
                <p className="text-lead mt-3 text-sm lg:text-base">{tc("description")}</p>
              </div>
              <Link
                href="/pricing"
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[#1E280E] transition-colors hover:text-[#94C748] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2"
              >
                {tc("linkLabel")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              {ABOUT_COMMITMENT_IDS.map((id) => {
                const Icon = ABOUT_COMMITMENT_ICONS[id];
                return (
                  <div key={id} className="flex gap-4">
                    <Icon
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#94C748]"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <div>
                      <dt className="text-display text-sm">{tc(`items.${id}.title`)}</dt>
                      <dd className="text-lead mt-1.5 text-sm">{tc(`items.${id}.description`)}</dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
