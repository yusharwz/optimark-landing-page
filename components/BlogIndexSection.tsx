"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { SearchMd } from "@untitledui/icons";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import {
  BLOG_BANNER,
  BLOG_CATEGORY_IDS,
  BLOG_POSTS,
  BLOG_SECTION_ORDER,
  type BlogCategoryId,
  type BlogPost,
} from "@/config/blog";
import { heroDescription, heroTitle } from "@/lib/animations";
import { resolveLocale, type AppLocale } from "@/lib/locale";
import { cx } from "@/utils/cx";

type Filter = BlogCategoryId | "all";

/** How many posts the "latest" block and each per-topic block show on the overview. */
const LATEST_LIMIT = 6;
const TOPIC_LIMIT = 3;

export function BlogIndexSection() {
  const t = useTranslations("blog");
  const tPosts = useTranslations("blogPosts");
  const locale = resolveLocale(useLocale());

  const [filter, setFilter] = useState<Filter>("all");
  // `draft` is what is in the box; `query` is what was submitted with "Cari".
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(locale);
    return BLOG_POSTS.filter((post) => {
      if (filter !== "all" && post.category !== filter) return false;
      if (!needle) return true;
      const haystack = `${tPosts(`${post.slug}.title`)} ${tPosts(`${post.slug}.excerpt`)}`;
      return haystack.toLocaleLowerCase(locale).includes(needle);
    });
  }, [filter, query, locale, tPosts]);

  // With no topic and no search the page is an overview: the newest posts, then
  // a short row per topic. Anything narrower is a single full list.
  const isOverview = filter === "all" && !query.trim();

  const selectFilter = (value: Filter) => {
    setFilter(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(draft);
  };

  const filters: Filter[] = ["all", ...BLOG_CATEGORY_IDS];

  const listTitle = query.trim()
    ? t("searchResults", { query: query.trim() })
    : filter === "all"
      ? t("latestLabel")
      : t(`categories.${filter}`);

  return (
    <section className="relative pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <nav aria-label="Breadcrumb" className="py-4">
          <ol className="flex items-center gap-1.5 text-sm font-medium tracking-tight">
            <li>
              <Link
                href="/"
                className="rounded text-[#717680] transition-colors hover:text-[#535862] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748]"
              >
                {t("profile.breadcrumbHome")}
              </Link>
            </li>
            <li aria-hidden className="text-[#D5D7DA]">
              /
            </li>
            <li aria-current="page" className="text-[#535862]">
              {t("profile.breadcrumbBlog")}
            </li>
          </ol>
        </nav>

        <div className="pt-6">
          <motion.h1
            variants={heroTitle}
            initial="hidden"
            animate="visible"
            className="text-display text-display-xs sm:text-display-md"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            variants={heroDescription}
            initial="hidden"
            animate="visible"
            className="text-lead mt-2 text-md sm:text-lg"
          >
            {t("description")}
          </motion.p>

          {/*
            Placeholder banner. The posts are samples so the layout can be
            reviewed; remove this block together with `blog.sampleNotice` and
            `blog.post.sampleNotice` once real articles land.
          */}
          {/* <div className="mt-6 inline-flex max-w-2xl items-start gap-2.5 rounded-2xl border border-amber-300/50 bg-amber-50/70 px-4 py-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
            <p className="text-sm text-amber-900">{t("sampleNotice")}</p>
          </div> */}
        </div>

        <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/*
            Sidebar. Desktop: the whole column (search + categories) sticks
            beside the posts while scrolling. Below lg the aside dissolves
            (`contents`) so the search form can stick under the header across
            the full page height, per the Figma "Scrolled" state; the category
            tabs scroll away with the content.
          */}
          <aside className="flex shrink-0 flex-col gap-6 max-lg:contents lg:sticky lg:top-24 lg:w-75 lg:self-start">
            <form
              role="search"
              onSubmit={onSearch}
              className="flex items-start gap-2 max-lg:sticky max-lg:top-20 max-lg:z-30 max-lg:bg-white max-lg:py-2 sm:max-lg:top-22"
            >
              <Input
                aria-label={t("searchLabel")}
                placeholder={t("searchPlaceholder")}
                icon={SearchMd}
                iconClassName="size-4"
                value={draft}
                onChange={setDraft}
                className="flex-1"
              />
              <Button type="submit" size="sm" className="w-19 shrink-0">
                {t("searchButton")}
              </Button>
            </form>

            <div className="flex flex-col gap-3 max-lg:-mt-6">
              <p className="text-sm font-semibold tracking-tight text-[#769F3A]">
                {t("filterLabel")}
              </p>
              <div
                role="group"
                aria-label={t("filterLabel")}
                className="scrollbar-hide -mx-1 flex gap-0.5 overflow-x-auto px-1 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
              >
                {filters.map((value) => {
                  const active = filter === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => selectFilter(value)}
                      aria-pressed={active}
                      className={cx(
                        "flex h-9 shrink-0 items-center rounded-lg px-3 text-sm font-semibold tracking-tight transition-colors duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748]",
                        active
                          ? "bg-[#EAF4DA] text-[#535862]"
                          : "text-[#717680] hover:bg-gray-50 hover:text-[#535862]",
                      )}
                    >
                      {value === "all" ? t("allCategories") : t(`categories.${value}`)}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Posts */}
          <div className="flex min-w-0 flex-1 flex-col gap-16">
            {isOverview ? (
              <>
                <PostSection
                  title={t("latestLabel")}
                  posts={BLOG_POSTS.slice(0, LATEST_LIMIT)}
                  locale={locale}
                />
                <Banner />
                {BLOG_SECTION_ORDER.map((category) => {
                  const posts = BLOG_POSTS.filter((post) => post.category === category);
                  if (posts.length === 0) return null;
                  return (
                    <PostSection
                      key={category}
                      title={t(`categories.${category}`)}
                      posts={posts.slice(0, TOPIC_LIMIT)}
                      locale={locale}
                      action={
                        <button
                          type="button"
                          onClick={() => selectFilter(category)}
                          className="rounded text-md font-semibold tracking-tight text-[#769F3A] transition-colors hover:text-[#5E7F2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748]"
                        >
                          {t("viewAll")}
                        </button>
                      }
                    />
                  );
                })}
              </>
            ) : (
              // Keyed on the view so the grid re-mounts and the reveal replays
              // when the reader switches topic or searches again.
              <PostSection
                key={`${filter}:${query}`}
                title={listTitle}
                posts={matches}
                locale={locale}
                emptyText={
                  query.trim() ? t("searchEmpty", { query: query.trim() }) : t("empty")
                }
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Banner() {
  const image = (
    <Image
      src={BLOG_BANNER.image}
      alt=""
      fill
      sizes="(min-width: 1024px) 820px, 100vw"
      className="object-cover"
    />
  );
  const className = "relative block h-50 overflow-hidden rounded-2xl";

  return BLOG_BANNER.href ? (
    <a href={BLOG_BANNER.href} className={className}>
      {image}
    </a>
  ) : (
    <div aria-hidden className={className}>
      {image}
    </div>
  );
}

function PostSection({
  title,
  posts,
  locale,
  action,
  emptyText,
}: {
  title: string;
  posts: BlogPost[];
  locale: AppLocale;
  action?: ReactNode;
  emptyText?: string;
}) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 border-b border-[#E9EAEB] pb-5">
        <h2 className="text-display text-display-xs sm:text-display-sm">{title}</h2>
        {action}
      </div>

      {posts.length === 0 ? (
        <p className="text-lead rounded-2xl border border-dashed border-gray-200/80 bg-gray-50/50 p-10 text-center text-sm">
          {emptyText}
        </p>
      ) : (
        <Reveal
          stagger
          staggerAmount={0.1}
          y={30}
          duration={0.6}
          className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale} />
          ))}
        </Reveal>
      )}
    </section>
  );
}
