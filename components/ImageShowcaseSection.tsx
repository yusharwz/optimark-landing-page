"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/base/buttons/button";
import { Reveal } from "@/components/motion/Reveal";
import { cx } from "@/utils/cx";

const TOP_CARDS = [
  { id: "advertising", src: "/images/image-bento/9ee5f6fa037c488e.jpg" },
  { id: "productShots", src: "/images/image-bento/8b85ce886cb54924.webp" },
  { id: "brandCampaigns", src: "/images/image-bento/ab6f807561e640fa.jpg" },
] as const;

const WIDE_CARD = {
  id: "editorial",
  src: "/images/image-bento/f740fcffd24d4cc3.jpg",
} as const;

export function ImageShowcaseSection() {
  const t = useTranslations("imageShowcase");

  return (
    <section
      id="image-showcase"
      className="relative overflow-hidden px-6 py-16 sm:px-12 lg:px-24 lg:py-24"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Header: title + subtitle left, CTA right (per reference design) */}
        <Reveal className="mb-8 flex flex-col gap-5 lg:mb-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 lg:flex-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a8a2c]">
              {t("eyebrow")}
            </span>
            <h2 className="text-display mt-3 text-3xl leading-tight sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="text-lead mt-3 max-w-xl text-base">{t("subtitle")}</p>
          </div>
          <div className="shrink-0">
            <Button
              href="/pricing"
              size="lg"
              className="text-white"
              iconTrailing={<ArrowRight className="size-5" />}
            >
              {t("cta")}
            </Button>
          </div>
        </Reveal>

        {/* Top row: three cards */}
        <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {TOP_CARDS.map((card) => (
            <ImageCard
              key={card.id}
              src={card.src}
              title={t(`items.${card.id}.title`)}
              description={t(`items.${card.id}.description`)}
              className="aspect-[4/5]"
            />
          ))}
        </Reveal>

        {/* Wide feature card */}
        <Reveal className="mt-4">
          <ImageCard
            src={WIDE_CARD.src}
            title={t(`items.${WIDE_CARD.id}.title`)}
            description={t(`items.${WIDE_CARD.id}.description`)}
            className="aspect-[16/9] lg:aspect-[21/9]"
          />
        </Reveal>
      </div>
    </section>
  );
}

type ImageCardProps = {
  src: string;
  title: string;
  description: string;
  className?: string;
};

function ImageCard({ src, title, description, className }: ImageCardProps) {
  return (
    <div
      className={cx(
        "group relative w-full overflow-hidden rounded-3xl border border-gray-200 shadow-md",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={title}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Bottom gradient so the overlay text stays readable */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7">
        <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
          {title}
        </h3>
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/80">
          {description}
        </p>
      </div>
    </div>
  );
}
