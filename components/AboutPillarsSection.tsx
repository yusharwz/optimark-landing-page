"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { ALL_FEATURE_IDS, ALL_FEATURE_ICONS, featureHref } from "@/config/features";

/**
 * The product modules, read straight from the feature config so this page can
 * never list a module the rest of the site does not have a page for.
 */
export function AboutPillarsSection() {
  const t = useTranslations("about.pillars");
  const tf = useTranslations("features");

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
          staggerAmount={0.08}
          y={30}
          duration={0.6}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ALL_FEATURE_IDS.map((id) => {
            const Icon = ALL_FEATURE_ICONS[id];
            return (
              <Link
                key={id}
                href={featureHref(id)}
                className="group flex h-full flex-col rounded-3xl border border-gray-200/80 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#94C748]/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#94C748]/12">
                  <Icon className="h-5 w-5 text-[#94C748]" strokeWidth={1.75} aria-hidden />
                </div>

                <h3 className="text-display mt-6 text-lg transition-colors group-hover:text-[#94C748]">
                  {tf(`items.${id}.title`)}
                </h3>
                <p className="text-lead mt-3 line-clamp-4 flex-1 text-sm">
                  {tf(`items.${id}.description`)}
                </p>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E280E] transition-colors group-hover:text-[#94C748]">
                  {t("linkLabel")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
