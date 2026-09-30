"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BadgeCheck, Check, Clock, Info, Link2 } from "lucide-react";
import { Button } from "@/components/base/buttons/button";
import { BlogArticle } from "@/components/BlogArticle";
import { BlogCard } from "@/components/BlogCard";
import { BlogPersonAvatar } from "@/components/BlogPersonAvatar";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import {
  BLOG_CATEGORY_ICONS,
  BLOG_CATEGORY_STYLES,
  authorHref,
  getBlogPost,
  getRelatedPosts,
  reviewerHref,
  type BlogSlug,
} from "@/config/blog";
import { GET_STARTED_URL } from "@/config/site";
import { formatBlogDate } from "@/lib/blog";
import { heroDescription, heroTitle } from "@/lib/animations";
import { resolveLocale } from "@/lib/locale";

const COPIED_RESET_MS = 2000;

export function BlogPostView({ slug }: { slug: BlogSlug }) {
  const t = useTranslations("blog");
  const tPost = useTranslations("blog.post");
  const tCopy = useTranslations(`blogPosts.${slug}`);
  const tPeople = useTranslations("blogPeople");
  const locale = resolveLocale(useLocale());
  const [copied, setCopied] = useState(false);

  const post = getBlogPost(slug);
  const related = getRelatedPosts(slug);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), COPIED_RESET_MS);
    return () => window.clearTimeout(timer);
  }, [copied]);

  // The page is prerendered, so the canonical URL is not known to this
  // component — read the address bar instead of rebuilding it from config.
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      // Clipboard access denied (insecure context or a refused permission).
      // Nothing to recover from: the URL is already in the address bar.
    }
  };

  if (!post) return null;

  const style = BLOG_CATEGORY_STYLES[post.category];
  const Icon = BLOG_CATEGORY_ICONS[post.category];
  const authorName = tPeople(`authors.${post.author}.name`);
  const reviewerName = tPeople(`reviewers.${post.reviewer}.name`);

  return (
    <>
      {/* Article header */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(242,248,231,0.5) 100%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-4 pb-10 pt-16 sm:px-6 lg:pt-20">
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#535862] transition-colors hover:text-[#94C748] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {tPost("back")}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: style.accentSoft, color: style.accent }}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden />
              {t(`categories.${post.category}`)}
            </span>
            <span className="text-detail inline-flex items-center gap-1.5 text-xs">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {t("readTime", { minutes: post.readMinutes })}
            </span>
          </div>

          <motion.h1
            variants={heroTitle}
            initial="hidden"
            animate="visible"
            className="text-display mt-5 text-3xl sm:text-4xl lg:text-[2.75rem]"
          >
            {tCopy("title")}
          </motion.h1>

          <motion.p
            variants={heroDescription}
            initial="hidden"
            animate="visible"
            className="text-lead mt-5 text-base lg:text-lg"
          >
            {tCopy("excerpt")}
          </motion.p>

          {/* Placeholder banner — remove together with the sample posts. */}
          <div className="mt-7 flex items-start gap-2.5 rounded-2xl border border-amber-300/50 bg-amber-50/70 px-4 py-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
            <p className="text-sm text-amber-900">{tPost("sampleNotice")}</p>
          </div>

          {/* Byline: who wrote it and who checked it, each linking to their
              profile. The reviewer line is what gives the article its
              expert-checked standing, so it sits beside the author, not in
              the footer. */}
          <div className="mt-8 border-t border-gray-200/80 pt-5">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href={authorHref(post.author)}
                className="group flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2"
              >
                <BlogPersonAvatar id={post.author} name={authorName} size="sm" />
                <span className="leading-tight">
                  <span className="text-detail block text-xs">{tPost("writtenBy")}</span>
                  <span className="block text-sm font-semibold text-[#1E280E] transition-colors group-hover:text-[#94C748]">
                    {authorName}
                  </span>
                </span>
              </Link>

              <Link
                href={reviewerHref(post.reviewer)}
                className="group flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2"
              >
                <BlogPersonAvatar id={post.reviewer} name={reviewerName} size="sm" kind="reviewer" />
                <span className="leading-tight">
                  <span className="text-detail inline-flex items-center gap-1 text-xs">
                    {tPost("reviewedBy")}
                    <BadgeCheck className="h-3.5 w-3.5 text-[#94C748]" aria-hidden />
                  </span>
                  <span className="block text-sm font-semibold text-[#1E280E] transition-colors group-hover:text-[#94C748]">
                    {reviewerName}
                  </span>
                </span>
              </Link>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            {/* Published · Updated, as on Mekari's article header. "Updated"
                only shows once a post has actually been edited. */}
            <dl className="text-detail flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <div className="flex gap-1.5">
                <dt>{tPost("published")}</dt>
                <dd className="font-medium text-[#1E280E]">
                  <time dateTime={post.publishedAt}>
                    {formatBlogDate(post.publishedAt, locale)}
                  </time>
                </dd>
              </div>
              {post.updatedAt && (
                <>
                  <span aria-hidden>·</span>
                  <div className="flex gap-1.5">
                    <dt>{tPost("updated")}</dt>
                    <dd className="font-medium text-[#1E280E]">
                      <time dateTime={post.updatedAt}>
                        {formatBlogDate(post.updatedAt, locale)}
                      </time>
                    </dd>
                  </div>
                </>
              )}
            </dl>

            <button
              type="button"
              onClick={copyLink}
              aria-label={tPost("shareLabel")}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gray-200/80 bg-white px-4 text-sm font-medium text-[#535862] transition-colors duration-200 hover:border-[#94C748] hover:text-[#1E280E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2"
            >
              {copied ? (
                <Check className="h-4 w-4 text-[#94C748]" aria-hidden />
              ) : (
                <Link2 className="h-4 w-4" aria-hidden />
              )}
              {copied ? tPost("copied") : tPost("copyLink")}
            </button>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="relative mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        {post.cover && (
          <div className="relative mb-10 aspect-video overflow-hidden rounded-3xl border-[0.5px] border-black/10">
            <Image
              src={post.cover}
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 720px, 100vw"
              className="object-cover"
            />
          </div>
        )}
        <BlogArticle slug={slug} />

        {/* About the author */}
        <aside className="mt-14 flex flex-col gap-5 rounded-3xl border border-gray-200/80 bg-white p-6 sm:flex-row sm:items-start sm:p-8">
          <BlogPersonAvatar id={post.author} name={authorName} size="lg" />
          <div className="min-w-0">
            <p className="text-detail text-xs font-semibold uppercase tracking-[0.12em]">
              {tPost("aboutAuthor")}
            </p>
            <p className="text-display mt-1.5 text-lg">{authorName}</p>
            <p className="text-detail text-sm">{tPeople(`authors.${post.author}.role`)}</p>
            <p className="text-lead mt-3 text-sm lg:text-base">
              {tPeople(`authors.${post.author}.bio`)}
            </p>
            <Link
              href={authorHref(post.author)}
              className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[#1E280E] transition-colors hover:text-[#94C748] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2"
            >
              {tPost("viewProfile")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </aside>
      </article>

      {/* In-article CTA */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal y={30} duration={0.7}>
            <div className="rounded-3xl border border-[#94C748]/25 bg-[#F8FDF1] p-8 text-center lg:p-10">
              <h2 className="text-display text-2xl lg:text-3xl">{tPost("ctaTitle")}</h2>
              <p className="text-lead mx-auto mt-4 max-w-xl text-base">{tPost("ctaDescription")}</p>
              <div className="mt-7">
                <Button href={GET_STARTED_URL} size="xl" className="text-white">
                  {tPost("ctaButton")}
                </Button>
              </div>
              <p className="text-detail mt-4 text-xs">{tPost("ctaNote")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="relative border-t border-gray-200/80 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-display text-2xl lg:text-3xl">{tPost("relatedTitle")}</h2>
            <Reveal
              stagger
              staggerAmount={0.1}
              y={30}
              duration={0.6}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} locale={locale} />
              ))}
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
