"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cx } from "@/utils/cx";

type BentoFeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Optional pill shown top-right (e.g. "Available now" / "Coming soon"). */
  badge?: string;
  /** Decorative cover image tucked into the top-right corner. */
  coverImage?: string;
  /** When set, the whole card becomes a link to this route. */
  href?: string;
  className?: string;
};

const CARD_CLASS =
  "group relative grid grid-cols-[65fr_35fr] items-start gap-6 overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";

/**
 * The bento-style feature card used on both the homepage features section and
 * the features page. Pass `href` to make the entire card a locale-aware link.
 */
export function BentoFeatureCard({
  icon: Icon,
  title,
  description,
  badge,
  coverImage,
  href,
  className,
}: BentoFeatureCardProps) {
  const content = (
    <>
      {/* {badge && (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700">
          {badge}
        </span>
      )} */}

      <div className="relative">
        <div className="mb-6 inline-flex rounded-2xl bg-brand-100 p-4 text-brand-600 transition-colors group-hover:bg-brand-200">
          <Icon className="h-8 w-8" />
        </div>
        <h3 className="text-display mb-3 text-2xl">{title}</h3>
        <p className="text-detail text-base">{description}</p>
      </div>

      {coverImage && (
        <div className="relative h-full min-h-[200px] w-full transition-all duration-300 group-hover:scale-105">
          <Image src={coverImage} alt="" fill className="object-contain" />
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cx(CARD_CLASS, "cursor-pointer", className)}>
        {content}
      </Link>
    );
  }

  return <div className={cx(CARD_CLASS, className)}>{content}</div>;
}
