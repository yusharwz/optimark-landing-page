"use client";

import { useMemo, useState, useEffect, type FormEvent, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SearchMd } from "@untitledui/icons";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Reveal } from "@/components/motion/Reveal";
import { BlogBanner } from "@/components/BlogBanner";
import { Link } from "@/i18n/navigation";
import {
  BLOG_CATEGORY_IDS,
  BLOG_POSTS,
  BLOG_SECTION_ORDER,
  blogCategoryHref,
  blogTagHref,
  getPopularTags,
  getPostsByTag,
  type BlogCategoryId,
  type BlogPost,
  type BlogTagId,
} from "@/config/blog";
import { heroDescription, heroTitle } from "@/lib/animations";
import { resolveLocale, type AppLocale } from "@/lib/locale";
import { cx } from "@/utils/cx";

type Filter = BlogCategoryId | "all";

const sidebarItem = (active: boolean) =>
  cx(
    "flex h-9 shrink-0 items-center rounded-lg px-3 text-sm font-semibold tracking-tight transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748]",
    active ? "bg-[#EAF4DA] text-[#535862]" : "text-[#717680] hover:bg-gray-50 hover:text-[#535862]",
  );

const LATEST_LIMIT = 6;
const TOPIC_LIMIT = 3;
const FIRST_ROW = 3;

/**
 * The blog listing. Three modes: the /blog overview, one category
 * (`category`), or one tag (`tag`). The tag page drops the hero and lists
 * related tags in the sidebar instead of the categories.
 */
export function BlogIndexSection({
  category,
  tag,
  initialPosts,
}: {
  category?: BlogCategoryId;
  tag?: BlogTagId;
  initialPosts?: BlogPost[];
} = {}) {
  const t = useTranslations("blog");
  const tPosts = useTranslations("blogPosts");
  const locale = resolveLocale(useLocale());

  const allPosts = initialPosts && initialPosts.length > 0 ? initialPosts : BLOG_POSTS;

  const filter: Filter = category ?? "all";
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(draft);
    }, 250);
    return () => clearTimeout(timer);
  }, [draft]);

  const matches = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(locale);
    return allPosts.filter((post) => {
      if (filter !== "all" && post.category !== filter) return false;
      if (tag && !post.tags.includes(tag)) return false;
      if (!needle) return true;
      let title = post.title || "";
      let excerpt = post.excerpt || "";
      if (!title || !excerpt) {
        try {
          const tp = tPosts as unknown as (k: string) => string;
          title = title || tp(`${post.slug}.title`);
          excerpt = excerpt || tp(`${post.slug}.excerpt`);
        } catch {}
      }
      const haystack = `${title} ${excerpt} ${post.slug}`;
      return haystack.toLocaleLowerCase(locale).includes(needle);
    });
  }, [allPosts, filter, tag, query, locale, tPosts]);

  const isOverview = filter === "all" && !tag && !query.trim();
  const popularTags = tag ? getPopularTags(tag) : [];

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(draft);
  };

  const filters: Filter[] = ["all", ...BLOG_CATEGORY_IDS];

  const listTitle = query.trim()
    ? t("searchResults", { query: query.trim() })
    : tag
      ? t(`tags.${tag}`)
      : filter === "all"
        ? t("latestLabel")
        : t(`categories.${filter}`);
  const crumb = tag ? t(`tags.${tag}`) : category ? t(`categories.${category}`) : null;

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
            {crumb ? (
              <>
                <li>
                  <Link
                    href="/blog"
                    className="rounded text-[#717680] transition-colors hover:text-[#535862] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748]"
                  >
                    {t("profile.breadcrumbBlog")}
                  </Link>
                </li>
                <li aria-hidden className="text-[#D5D7DA]">
                  /
                </li>
                <li aria-current="page" className="min-w-0 truncate text-[#535862]">
                  {crumb}
                </li>
              </>
            ) : (
              <li aria-current="page" className="text-[#535862]">
                {t("profile.breadcrumbBlog")}
              </li>
            )}
          </ol>
        </nav>

        {!tag && (
          <div className="pt-6">
            <motion.h1
              variants={heroTitle}
              initial="hidden"
              animate="visible"
              className="text-display text-display-xs sm:text-display-md"
            >
              {category ? t(`categoryPages.${category}.title`) : t("title")}
            </motion.h1>
            <motion.p
              variants={heroDescription}
              initial="hidden"
              animate="visible"
              className="text-lead mt-2 max-w-3xl text-md sm:text-lg"
            >
              {category ? t(`categoryPages.${category}.description`) : t("description")}
            </motion.p>
          </div>
        )}

        <div className={cx("flex flex-col gap-10 lg:flex-row lg:gap-16", tag ? "mt-6" : "mt-12")}>
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
                {tag ? t("popularTags") : t("filterLabel")}
              </p>
              <nav
                aria-label={tag ? t("popularTags") : t("filterLabel")}
                className={
                  tag
                    ? "flex flex-wrap gap-2"
                    : "scrollbar-hide -mx-1 flex gap-0.5 overflow-x-auto px-1 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
                }
              >
                {tag
                  ? popularTags.map((value) => (
                      <Link
                        key={value}
                        href={blogTagHref(value)}
                        className="rounded-md bg-[#F5F5F5] px-3 py-1.5 text-sm font-medium tracking-tight text-[#414651] transition-colors hover:bg-[#EAF4DA] hover:text-[#59772B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748]"
                      >
                        {t(`tags.${value}`)} ({getPostsByTag(value).length})
                      </Link>
                    ))
                  : filters.map((value) => {
                      const active = filter === value;
                      return (
                        <Link
                          key={value}
                          href={value === "all" ? "/blog" : blogCategoryHref(value)}
                          aria-current={active ? "page" : undefined}
                          className={sidebarItem(active)}
                        >
                          {value === "all" ? t("allCategories") : t(`categories.${value}`)}
                        </Link>
                      );
                    })}
              </nav>
            </div>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-16">
            {isOverview ? (
              <>
                <PostSection
                  title={t("latestLabel")}
                  posts={allPosts.slice(0, LATEST_LIMIT)}
                  locale={locale}
                  eagerFirstRow
                />
                <BlogBanner />
                {BLOG_SECTION_ORDER.map((id) => {
                  const posts = allPosts.filter((post) => post.category === id);
                  if (posts.length === 0) return null;
                  return (
                    <PostSection
                      key={id}
                      title={t(`categories.${id}`)}
                      posts={posts.slice(0, TOPIC_LIMIT)}
                      locale={locale}
                      action={
                        <Link
                          href={blogCategoryHref(id)}
                          className="rounded text-md font-semibold tracking-tight text-[#769F3A] transition-colors hover:text-[#5E7F2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748]"
                        >
                          {t("viewAll")}
                        </Link>
                      }
                    />
                  );
                })}
              </>
            ) : (
              <PostSection
                key={`${filter}:${tag}:${query}`}
                title={listTitle}
                posts={matches}
                locale={locale}
                headingLevel={tag && !query.trim() ? 1 : 2}
                badge={
                  tag && !query.trim() ? t("articleCount", { count: matches.length }) : undefined
                }
                emptyText={
                  query.trim()
                    ? t("searchEmpty", { query: query.trim() })
                    : tag
                      ? undefined
                      : t("empty")
                }
                eagerFirstRow
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PostSection({
  title,
  posts,
  locale,
  action,
  emptyText,
  eagerFirstRow = false,
  headingLevel = 2,
  badge,
}: {
  title: string;
  posts: BlogPost[];
  locale: AppLocale;
  action?: ReactNode;
  emptyText?: string;
  eagerFirstRow?: boolean;
  headingLevel?: 1 | 2;
  badge?: string;
}) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 border-b border-[#E9EAEB] pb-5">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <Heading className="text-display text-display-xs sm:text-display-sm">{title}</Heading>
          {badge && (
            <span className="rounded-full border border-[#D4E9B6] bg-[#EAF4DA] px-2 py-0.5 text-sm font-medium tracking-tight text-[#59772B]">
              {badge}
            </span>
          )}
        </div>
        {action}
      </div>

      {posts.length === 0 ? (
        emptyText && (
          <p className="text-lead rounded-2xl border border-dashed border-gray-200/80 bg-gray-50/50 p-10 text-center text-sm">
            {emptyText}
          </p>
        )
      ) : (
        <Reveal
          stagger
          staggerAmount={0.1}
          y={30}
          duration={0.6}
          className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post, index) => (
            <BlogCard
              key={post.slug}
              post={post}
              locale={locale}
              eager={eagerFirstRow && index < FIRST_ROW}
            />
          ))}
        </Reveal>
      )}
    </section>
  );
}
