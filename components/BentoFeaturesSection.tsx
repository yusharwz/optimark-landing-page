"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
  EXTRA_FEATURE_ICONS,
  EXTRA_FEATURE_IDS,
  FEATURE_ICONS,
  FEATURE_IDS,
  FEATURE_META,
  featureHref,
  type FeatureId,
} from "@/config/features";
import { BentoFeatureCard } from "@/components/BentoFeatureCard";
import { AiImageShowcase, AiVideoShowcase } from "@/components/BentoShowcaseMedia";
import {
  AiContentIllustration,
  SeoAnalyzerIllustration,
  ContentPlannerIllustration,
} from "@/components/BentoCardIllustrations";
import { gsap, useGSAP } from "@/lib/gsap";
import { cx } from "@/utils/cx";

// The hero/large tile of the bento grid (spans both rows on the left).
const FEATURED_ID: FeatureId = "ai";

export function BentoFeaturesSection() {
  const t = useTranslations("features");
  const containerRef = useRef<HTMLDivElement>(null);

  // Featured tile first so the grid places it in the tall left column.
  const orderedIds = [FEATURED_ID, ...FEATURE_IDS.filter((id) => id !== FEATURED_ID)];

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const mm = gsap.matchMedia();

      // Desktop animations
      mm.add("(min-width: 1024px)", () => {
        // Header Reveal
        gsap.fromTo(
          ".bento-header > *",
          { opacity: 0, y: 30, rotateX: -10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".bento-header",
              start: "top 90%",
              once: true,
            },
          },
        );

        // 3D Grid Reveal
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 85%",
            once: true,
          },
        });

        tl.fromTo(
          ".bento-card-ai",
          { opacity: 0, x: -80, rotateY: 15, scale: 0.95 },
          { opacity: 1, x: 0, rotateY: 0, scale: 1, duration: 1.0, ease: "power4.out" },
        )
          .fromTo(
            ".bento-card-perencana",
            { opacity: 0, x: 80, rotateY: -15, scale: 0.95 },
            { opacity: 1, x: 0, rotateY: 0, scale: 1, duration: 1.0, ease: "power4.out" },
            "-=0.8",
          )
          .fromTo(
            ".bento-card-seo",
            { opacity: 0, y: 60, rotateX: 15, scale: 0.95 },
            { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.0, ease: "power4.out" },
            "-=0.8",
          );

        // Secondary row (AI Image / AI Video) follows the main grid in.
        gsap.fromTo(
          ".bento-secondary > *",
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ".bento-secondary",
              start: "top 90%",
              once: true,
            },
          },
        );
      });

      // Mobile / tablet animations
      mm.add("(max-width: 1023px)", () => {
        // Header Reveal
        gsap.fromTo(
          ".bento-header > *",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".bento-header",
              start: "top 90%",
              once: true,
            },
          },
        );

        // Grid Reveal (main grid + secondary row share one selector set)
        gsap.fromTo(
          ".bento-secondary > *",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".bento-secondary",
              start: "top 92%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          ".bento-grid > *",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".bento-grid",
              start: "top 90%",
              once: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    // Transparent: the shared HeroFeaturesBackground (dot grid + soft gradient)
    // shows through so the hero-to-features transition keeps one continuous
    // canvas. The white cards float above it.
    <section
      ref={containerRef}
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:pt-36 lg:pb-16"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="bento-header mb-14 text-center lg:mb-10">
          <h2 className="text-display text-4xl sm:text-5xl lg:text-[3.5rem]">{t("title")}</h2>
          <p className="text-lead mx-auto mt-5 max-w-xl text-lg">{t("subtitle")}</p>
        </div>

        <div
          className="bento-grid grid grid-cols-1 gap-4 lg:auto-rows-fr lg:grid-cols-2 lg:grid-rows-2 lg:gap-6"
          style={{ perspective: "1200px" }}
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
            } else if (id === "perencana") {
              illustration = <ContentPlannerIllustration />;
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
                highlight={id === "ai"}
                href={featureHref(id)}
                ctaLabel={t("learnMore")}
                className={cx(id === FEATURED_ID ? "lg:row-span-2" : undefined, `bento-card-${id}`)}
              />
            );
          })}
        </div>

        {/* Secondary modules — no room in the tall-tile grid above, so they get
            their own two-up row. */}
        <div className="bento-secondary mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-6 lg:gap-6">
          {EXTRA_FEATURE_IDS.map((id) => (
            <BentoFeatureCard
              key={id}
              icon={EXTRA_FEATURE_ICONS[id]}
              title={t(`items.${id}.title`)}
              description={t(`items.${id}.description`)}
              badge={t("availableNow")}
              showcase={id === "aiImage" ? <AiImageShowcase /> : <AiVideoShowcase />}
              href={featureHref(id)}
              ctaLabel={t("learnMore")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
