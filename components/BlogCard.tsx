"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BLOG_CATEGORY_ICONS, BLOG_CATEGORY_STYLES, blogHref, type BlogPost } from "@/config/blog";
import { formatBlogDate } from "@/lib/blog";
import type { AppLocale } from "@/lib/locale";
import { cx } from "@/utils/cx";

type BlogCardProps = {
  post: BlogPost;
  locale: AppLocale;
  /** Wide two-column treatment for the one featured post on the index. */
  variant?: "default" | "featured";
};

/**
 * A post card. Posts ship without photography, so the cover is a gradient wash
 * plus the category icon (see BLOG_CATEGORY_STYLES) rather than an <Image> that
 * would 404 — it keeps the grid even while real art is still pending.
 */
export function BlogCard({ post, locale, variant = "default" }: BlogCardProps) {
  const t = useTranslations("blog");
  // Each post is its own namespace, so the slug selects the namespace rather
  // than being looked up as a key inside `blogPosts`.
  const tPost = useTranslations(`blogPosts.${post.slug}`);
  const tPeople = useTranslations("blogPeople");

  const style = BLOG_CATEGORY_STYLES[post.category];
  const Icon = BLOG_CATEGORY_ICONS[post.category];
  const featured = variant === "featured";

  return (
    <Link
      href={blogHref(post.slug)}
      className={cx(
        "group flex overflow-hidden rounded-3xl border border-gray-200/80 bg-white transition-all duration-200",
        "hover:-translate-y-1 hover:border-[#94C748]/40 hover:shadow-lg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2",
        featured ? "flex-col lg:flex-row" : "h-full flex-col",
      )}
    >
      {/* Cover */}
      <div
        className={cx(
          "relative flex shrink-0 items-center justify-center overflow-hidden",
          featured ? "min-h-[13rem] lg:w-[45%]" : "h-40",
        )}
        style={{ background: style.cover }}
        aria-hidden
      >
        <div
          className="flex items-center justify-center rounded-2xl border border-white/70 bg-white/70 shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:scale-105"
          style={{ height: featured ? "4.5rem" : "3.5rem", width: featured ? "4.5rem" : "3.5rem" }}
        >
          <Icon
            className={featured ? "h-8 w-8" : "h-6 w-6"}
            style={{ color: style.accent }}
            strokeWidth={1.75}
          />
        </div>
      </div>

      {/* Body */}
      <div className={cx("flex flex-1 flex-col p-6", featured && "lg:p-8")}>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: style.accentSoft, color: style.accent }}
          >
            {t(`categories.${post.category}`)}
          </span>
          <span className="text-detail inline-flex items-center gap-1.5 text-xs">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {t("readTime", { minutes: post.readMinutes })}
          </span>
        </div>

        <h3
          className={cx(
            "text-display mt-4 transition-colors group-hover:text-[#94C748]",
            featured ? "text-2xl lg:text-3xl" : "text-lg",
          )}
        >
          {tPost("title")}
        </h3>

        <p
          className={cx(
            "text-lead mt-3 flex-1",
            featured ? "text-base lg:text-lg" : "line-clamp-3 text-sm",
          )}
        >
          {tPost("excerpt")}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-gray-200/80 pt-4">
          <span className="text-detail min-w-0 truncate text-xs">
            <span className="font-medium text-[#1E280E]">
              {tPeople(`authors.${post.author}.name`)}
            </span>
            {" · "}
            <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt, locale)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E280E] transition-colors group-hover:text-[#94C748]">
            {t("readMore")}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
