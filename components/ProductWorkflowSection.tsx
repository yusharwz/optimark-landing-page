"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { WORKFLOW_STEP_ICONS, WORKFLOW_STEP_IDS } from "@/config/product-overview";

export function ProductWorkflowSection() {
  const t = useTranslations("productOverview.workflow");

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
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {WORKFLOW_STEP_IDS.map((step, index) => {
            const Icon = WORKFLOW_STEP_ICONS[step];
            return (
              <div
                key={step}
                className="relative flex h-full flex-col rounded-3xl border border-gray-200/80 bg-white p-7"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#94C748]/12">
                    <Icon className="h-5 w-5 text-[#94C748]" strokeWidth={1.75} aria-hidden />
                  </div>
                  <span aria-hidden className="text-detail text-xs font-semibold tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-display mt-6 text-lg">{t(`steps.${step}.title`)}</h3>
                <p className="text-lead mt-3 flex-1 text-sm">{t(`steps.${step}.description`)}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
