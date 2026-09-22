"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Info, Newspaper } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { Reveal } from "@/components/motion/Reveal";
import { BLOG_CATEGORY_IDS, BLOG_POSTS, type BlogCategoryId } from "@/config/blog";
import { heroBadge, heroDescription, heroTitle } from "@/lib/animations";
import { resolveLocale } from "@/lib/locale";
import { cx } from "@/utils/cx";

type Filter = BlogCategoryId | "all";

export function BlogIndexSection() {
  const t = useTranslations("blog");
  const locale = resolveLocale(useLocale());
  const [filter, setFilter] = useState<Filter>("all");

  const featured = useMemo(() => BLOG_POSTS.find((post) => post.featured), []);

  // The featured post keeps its wide card at the top and is dropped from the
  // grid — but only while "all" is selected. Filtering is an explicit request
  // for a category, so every matching post shows in the grid there.
  const posts = useMemo(() => {
    if (filter === "all") {
      return BLOG_POSTS.filter((post) => post.slug !== featured?.slug);
    }
    return BLOG_POSTS.filter((post) => post.category === filter);
  }, [filter, featured]);

  const filters: Filter[] = ["all", ...BLOG_CATEGORY_IDS];

  const countFor = (value: Filter) =>
    value === "all"
      ? BLOG_POSTS.length
      : BLOG_POSTS.filter((post) => post.category === value).length;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(242,248,231,0.55) 100%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 lg:px-8 lg:pb-16 lg:pt-20">
          <motion.span
            variants={heroBadge}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#94C748]/20 bg-[#94C748]/10 px-4 py-1.5 text-xs font-semibold text-[#1E280E]"
          >
            <Newspaper className="h-3.5 w-3.5 text-[#94C748]" aria-hidden />
            {t("badge")}
          </motion.span>

          <motion.h1
            variants={heroTitle}
            initial="hidden"
            animate="visible"
            className="text-display mt-5 max-w-3xl text-3xl sm:text-4xl lg:text-5xl"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            variants={heroDescription}
            initial="hidden"
            animate="visible"
            className="text-lead mt-5 max-w-2xl text-base lg:text-lg"
          >
            {t("description")}
          </motion.p>

          {/*
            Placeholder banner. The posts are samples so the layout can be
            reviewed; remove this block together with `blog.sampleNotice` and
            `blog.post.sampleNotice` once real articles land.
          */}
          <div className="mt-7 inline-flex max-w-2xl items-start gap-2.5 rounded-2xl border border-amber-300/50 bg-amber-50/70 px-4 py-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
            <p className="text-sm text-amber-900">{t("sampleNotice")}</p>
          </div>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal y={30} duration={0.7}>
              <h2 className="text-detail text-xs font-semibold uppercase tracking-[0.12em]">
                {t("featuredLabel")}
              </h2>
              <div className="mt-4">
                <BlogCard post={featured} locale={locale} variant="featured" />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Filters + grid */}
      <section className="relative pb-20 pt-14 lg:pb-24 lg:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-display text-2xl lg:text-3xl">{t("latestLabel")}</h2>

            <div
              role="group"
              aria-label={t("filterLabel")}
              className="scrollbar-hide -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
            >
              {filters.map((value) => {
                const active = filter === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFilter(value)}
                    aria-pressed={active}
                    className={cx(
                      "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2",
                      active
                        ? "border-[#94C748] bg-[#94C748]/10 font-semibold text-[#1E280E]"
                        : "border-gray-200/80 bg-white text-[#535862] hover:border-gray-300 hover:text-[#1E280E]",
                    )}
                  >
                    {value === "all" ? t("allCategories") : t(`categories.${value}`)}
                    <span
                      className={cx(
                        "rounded-full px-1.5 py-0.5 text-xs",
                        active ? "bg-[#94C748]/20 text-[#1E280E]" : "bg-gray-100 text-[#717680]",
                      )}
                    >
                      {countFor(value)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {posts.length === 0 ? (
            <p className="text-lead mt-10 rounded-2xl border border-dashed border-gray-200/80 bg-gray-50/50 p-10 text-center text-sm">
              {t("empty")}
            </p>
          ) : (
            // Keyed on the filter so the grid re-mounts and the reveal replays
            // when the reader switches topic.
            <Reveal
              key={filter}
              stagger
              staggerAmount={0.1}
              y={30}
              duration={0.6}
              className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} locale={locale} />
              ))}
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
