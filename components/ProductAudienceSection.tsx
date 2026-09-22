"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { AUDIENCE_ICONS, AUDIENCE_IDS } from "@/config/product-overview";

export function ProductAudienceSection() {
  const t = useTranslations("productOverview.audience");
  const tt = useTranslations("productOverview.transparency");
  const points = tt.raw("points") as string[];

  return (
    <section className="relative py-20 lg:py-24">
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
          className="mt-12 grid gap-6 lg:grid-cols-3"
        >
          {AUDIENCE_IDS.map((id) => {
            const Icon = AUDIENCE_ICONS[id];
            return (
              <div
                key={id}
                className="flex h-full flex-col rounded-3xl border border-gray-200/80 bg-white p-7 transition-colors duration-200 hover:border-[#94C748]/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#94C748]/12">
                  <Icon className="h-5 w-5 text-[#94C748]" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="text-display mt-6 text-lg">{t(`items.${id}.title`)}</h3>
                <p className="text-lead mt-3 flex-1 text-sm lg:text-base">
                  {t(`items.${id}.description`)}
                </p>
                <p className="text-detail mt-5 border-t border-gray-200/80 pt-4 text-xs">
                  {t(`items.${id}.detail`)}
                </p>
              </div>
            );
          })}
        </Reveal>

        {/* Transparency band */}
        <Reveal y={30} duration={0.7} className="mt-16">
          <div className="rounded-3xl border border-[#94C748]/25 bg-[#F8FDF1] p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <h3 className="text-display text-xl lg:text-2xl">{tt("title")}</h3>
                <p className="text-lead mt-4 text-sm lg:text-base">{tt("description")}</p>
                <Link
                  href="/pricing"
                  className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[#1E280E] transition-colors hover:text-[#94C748] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2"
                >
                  {tt("linkLabel")}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>

              <ul className="space-y-4 lg:border-l lg:border-[#94C748]/20 lg:pl-12">
                {points.map((point) => (
                  <li key={point} className="text-lead flex gap-3 text-sm lg:text-base">
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#94C748]"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
