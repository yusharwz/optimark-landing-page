"use client";

import { useTranslations } from "next-intl";
import { FEATURE_ICONS, FEATURE_IDS, FEATURE_META, FEATURE_ROUTES, type FeatureId } from "@/config/features";
import { Reveal } from "@/components/motion/Reveal";
import { BentoFeatureCard } from "@/components/BentoFeatureCard";
import { AiContentIllustration, SeoAnalyzerIllustration } from "@/components/BentoCardIllustrations";

// The hero/large tile of the bento grid (spans both rows on the left).
const FEATURED_ID: FeatureId = "ai";

export function BentoFeaturesSection() {
  const t = useTranslations("features");

  // Featured tile first so the grid places it in the tall left column.
  const orderedIds = [
    FEATURED_ID,
    ...FEATURE_IDS.filter((id) => id !== FEATURED_ID),
  ];

  return (
    // Transparent: the shared HeroFeaturesBackground (dot grid + soft gradient)
    // shows through so the hero-to-features transition keeps one continuous
    // canvas. The white cards float above it.
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal y={20} start="top 90%" className="mb-14 text-center lg:mb-20">
          <h2 className="text-display text-4xl sm:text-5xl lg:text-[3.5rem]">
            {t("title")}
          </h2>
          <p className="text-lead mx-auto mt-5 max-w-xl text-lg">
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal
          stagger
          y={20}
          className="grid grid-cols-1 gap-4 sm:auto-rows-fr sm:grid-cols-2 sm:grid-rows-2 lg:gap-6"
        >
          {orderedIds.map((id) => {
            const meta = FEATURE_META[id];
            const badge = meta.hasBadge
              ? t("availableNow")
              : meta.comingSoon
                ? t("comingSoon")
                : undefined;

            let illustration: React.ReactNode = undefined;
            if (id === "ai") {
              illustration = <AiContentIllustration />;
            } else if (id === "seo") {
              illustration = <SeoAnalyzerIllustration />;
            }

            return (
              <BentoFeatureCard
                key={id}
                icon={FEATURE_ICONS[id]}
                title={t(`items.${id}.title`)}
                description={t(`items.${id}.description`)}
                badge={badge}
                coverImage={meta.coverImage}
                illustration={illustration}
                featured={id === FEATURED_ID}
                href={`/features/${FEATURE_ROUTES[id]}`}
                className={id === FEATURED_ID ? "sm:row-span-2" : undefined}
              />
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
