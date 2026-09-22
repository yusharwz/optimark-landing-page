"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { ABOUT_STORY_STEP_IDS } from "@/config/about";

/**
 * The origin story, paired with the Masalah → Aksi → Hasil sequence from
 * DESIGN.md §3.2 rendered as a connected rail beside it.
 */
export function AboutStorySection() {
  const t = useTranslations("about.story");
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
            <ol className="relative space-y-6">
              {ABOUT_STORY_STEP_IDS.map((step, index) => (
                <li
                  key={step}
                  className="relative rounded-2xl border border-gray-200/80 bg-white p-6 transition-colors duration-200 hover:border-[#94C748]/40"
                >
                  {/* Rail connecting each step to the next. */}
                  {index < ABOUT_STORY_STEP_IDS.length - 1 && (
                    <span aria-hidden className="absolute -bottom-6 left-9 h-6 w-px bg-gray-200" />
                  )}

                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#94C748]/12 text-xs font-semibold text-[#1E280E]"
                    >
                      {index + 1}
                    </span>
                    <span className="text-detail text-xs font-semibold uppercase tracking-[0.1em]">
                      {t(`steps.${step}.label`)}
                    </span>
                  </div>

                  <p className="text-lead mt-4 text-base">{t(`steps.${step}.text`)}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
