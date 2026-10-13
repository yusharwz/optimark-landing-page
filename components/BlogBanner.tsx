"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { BLOG_BANNER } from "@/config/blog";
import { cx } from "@/utils/cx";

export interface BlogBannerProps {
  className?: string;
  priority?: boolean;
}

export function BlogBanner({ className, priority = false }: BlogBannerProps) {
  const t = useTranslations("blog");

  return (
    <aside aria-label={t("bannerAlt")} className={cx("w-full", className)}>
      <a
        href={BLOG_BANNER.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("bannerAlt")}
        className={cx(
          "group relative block overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50 shadow-xs transition-all duration-300",
          "hover:border-[#94C748]/40 hover:shadow-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2",
        )}
      >
        <Image
          src={BLOG_BANNER.image}
          alt={t("bannerAlt")}
          width={BLOG_BANNER.width}
          height={BLOG_BANNER.height}
          priority={priority}
          sizes="(min-width: 1280px) 820px, (min-width: 1024px) 700px, 100vw"
          className="h-auto w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.01]"
        />
      </a>
    </aside>
  );
}
