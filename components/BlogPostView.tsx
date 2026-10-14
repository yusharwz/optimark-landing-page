"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { CheckVerified02, ChevronRight } from "@untitledui/icons";
import { BlogArticle } from "@/components/BlogArticle";
import { BlogBanner } from "@/components/BlogBanner";
import { BlogCard } from "@/components/BlogCard";
import { BlogCommentSection } from "@/components/BlogCommentSection";
import { BlogPersonAvatar } from "@/components/BlogPersonAvatar";
import { BlogSocialShare } from "@/components/BlogSocialShare";
import { BlogToc } from "@/components/BlogToc";
import { ReadingProgress } from "@/components/ReadingProgress";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import {
  authorHref,
  blogCategoryHref,
  blogHref,
  blogTagHref,
  getBlogPost,
  getRelatedPosts,
  reviewerHref,
  type BlogAuthorId,
  type BlogReviewerId,
  type BlogSlug,
  type BlogPost,
} from "@/config/blog";
import { formatBlogDate } from "@/lib/blog";
import { resolveLocale } from "@/lib/locale";
import { localizedUrl } from "@/lib/seo";
import { cx } from "@/utils/cx";

const ARTICLE_ID = "blog-article";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2";

export function BlogPostView({
  slug,
  initialPost,
  relatedPosts: initialRelated,
}: {
  slug: BlogSlug;
  initialPost?: BlogPost;
  relatedPosts?: BlogPost[];
}) {
  const t = useTranslations("blog");
  const tPost = useTranslations("blog.post");
  const tBlogPosts = useTranslations("blogPosts");
  const tPeople = useTranslations("blogPeople");
  const locale = resolveLocale(useLocale());

  const post = initialPost || getBlogPost(slug);
  const related = initialRelated || getRelatedPosts(slug);

  if (!post) return null;

  let title = post.title;
  if (!title || title === post.slug) {
    try {
      if (tBlogPosts.has(`${slug}.title` as never)) {
        title = tBlogPosts(`${slug}.title` as never);
      } else {
        title = post.title && post.title !== post.slug ? post.title : post.slug;
      }
    } catch {
      title = post.title && post.title !== post.slug ? post.title : post.slug;
    }
  }

  const tags = post.tags;

  let authorName = post.authorName;
  if (!authorName) {
    try {
      authorName = (tPeople as unknown as (k: string) => string)(`authors.${post.author}.name`);
    } catch {
      authorName = typeof post.author === "string" ? post.author : "Optimark Team";
    }
  }

  let reviewerName = post.reviewerName;
  if (!reviewerName && post.reviewer) {
    try {
      reviewerName = (tPeople as unknown as (k: string) => string)(
        `reviewers.${post.reviewer}.name`,
      );
    } catch {
      reviewerName = typeof post.reviewer === "string" ? post.reviewer : "Reviewer";
    }
  }

  const shareUrl = localizedUrl(locale, blogHref(slug));

  return (
    <>
      <ReadingProgress targetId={ARTICLE_ID} />

      <section className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-36 h-120 opacity-8 lg:-top-24"
          style={{
            backgroundImage: "url('/images/hero-swatch.png')",
            backgroundSize: "400px 400px",
            maskImage: "linear-gradient(to bottom, black 60%, transparent)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <nav aria-label="Breadcrumb" className="py-4">
            <ol className="flex min-w-0 items-center gap-1.5 text-sm font-medium tracking-tight">
              <li className="shrink-0">
                <Link
                  href="/"
                  className="rounded text-[#717680] transition-colors hover:text-[#535862] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748]"
                >
                  {t("profile.breadcrumbHome")}
                </Link>
              </li>
              <li aria-hidden className="shrink-0 text-[#D5D7DA]">
                /
              </li>
              <li className="shrink-0">
                <Link
                  href="/blog"
                  className="rounded text-[#717680] transition-colors hover:text-[#535862] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748]"
                >
                  {t("profile.breadcrumbBlog")}
                </Link>
              </li>
              <li aria-hidden className="shrink-0 text-[#D5D7DA]">
                /
              </li>
              <li aria-current="page" className="min-w-0 truncate text-[#535862]">
                {title}
              </li>
            </ol>
          </nav>

          <div className="mx-auto flex max-w-170 flex-col gap-8 py-8 sm:py-12">
            <div className="flex flex-col gap-4">
              <p className="flex items-center gap-2.5 text-sm tracking-tight">
                <Link
                  href={blogCategoryHref(post.category)}
                  className={cx(
                    "rounded font-semibold text-[#769F3A] transition-colors hover:text-[#59772B]",
                    focusRing,
                  )}
                >
                  {(t as unknown as (k: string) => string)(`categories.${post.category}`) ||
                    post.category}
                </Link>
                <Dot />
                <span className="text-[#717680]">
                  {t("readTime", { minutes: post.readMinutes })}
                </span>
              </p>

              <h1 className="text-[2rem] leading-10 font-semibold tracking-tight text-[#1E280E] sm:text-[2.5rem] sm:leading-12">
                {title}
              </h1>

              <dl className="flex items-center gap-2.5 text-sm tracking-tight text-[#535862]">
                <div className="sm:flex sm:gap-1">
                  <dt className="font-semibold">{tPost("published")}</dt>
                  <dd>
                    <time dateTime={post.publishedAt}>
                      {formatBlogDate(post.publishedAt, locale, "long")}
                    </time>
                  </dd>
                </div>
                {post.updatedAt && (
                  <>
                    <Dot />
                    <div className="sm:flex sm:gap-1">
                      <dt className="font-semibold">{tPost("updated")}</dt>
                      <dd>
                        <time dateTime={post.updatedAt}>
                          {formatBlogDate(post.updatedAt, locale, "long")}
                        </time>
                      </dd>
                    </div>
                  </>
                )}
              </dl>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E9EAEB] pt-6">
              <div className="flex flex-wrap gap-4 sm:gap-8">
                <Byline
                  label={tPost("writtenBy")}
                  href={authorHref(post.author)}
                  person={post.author}
                  avatarUrl={post.authorAvatar}
                  name={authorName}
                />
                {post.reviewer && (
                  <Byline
                    label={tPost("reviewedBy")}
                    href={reviewerHref(post.reviewer)}
                    person={post.reviewer}
                    avatarUrl={post.reviewerAvatar}
                    name={reviewerName || "Reviewer"}
                    kind="reviewer"
                    badge={<ExpertBadge label={tPost("expertReviewer")} />}
                  />
                )}
              </div>
              <BlogSocialShare url={shareUrl} title={title} variant="compact" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-16 pt-6 sm:pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:grid lg:grid-cols-[minmax(12rem,1fr)_minmax(0,42.5rem)_minmax(4.5rem,1fr)] lg:gap-x-8 xl:gap-x-12 2xl:gap-x-16">
          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-6">
              <BlogToc slug={slug} content={post.content} />
            </div>
          </aside>

          <div className="mx-auto flex max-w-170 flex-col gap-8 lg:mx-0 lg:max-w-none">
            {post.cover && (
              <div className="relative h-50 overflow-hidden rounded-2xl border-[0.5px] border-black/10 sm:h-75">
                <Image
                  src={post.cover}
                  alt={post.coverAlt || title}
                  fill
                  preload
                  sizes="(min-width: 768px) 680px, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            <article id={ARTICLE_ID} className="flex flex-col gap-6">
              {post.excerpt && (
                <div className="rounded-2xl border border-[#94C748]/40 bg-[#F9FBF6] p-5 sm:p-6 shadow-xs">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="size-2 rounded-full bg-[#769F3A]" />
                    <h2 className="text-xs font-bold uppercase tracking-wider text-[#59772B]">
                      {locale === "en" ? "Executive Summary" : "Ringkasan Eksekutif"}
                    </h2>
                  </div>
                  <p className="text-base leading-relaxed text-[#344054] sm:text-lg font-medium italic">
                    &ldquo;{post.excerpt}&rdquo;
                  </p>
                </div>
              )}
              <BlogArticle slug={slug} content={post.content} />
            </article>

            <BlogSocialShare url={shareUrl} title={title} variant="default" className="my-2" />

            <BlogBanner className="my-2" />

            <footer className="flex flex-col gap-8 border-t border-[#E9EAEB] pt-8">
              <div className="flex flex-col gap-4">
                <ProfileCard
                  label={tPost("writtenBy")}
                  href={authorHref(post.author)}
                  person={post.author}
                  avatarUrl={post.authorAvatar}
                  name={authorName}
                  ariaLabel={tPost("viewProfile", { name: authorName })}
                />
                {post.reviewer && (
                  <ProfileCard
                    label={tPost("reviewedBy")}
                    href={reviewerHref(post.reviewer)}
                    person={post.reviewer}
                    avatarUrl={post.reviewerAvatar}
                    name={reviewerName || "Reviewer"}
                    kind="reviewer"
                    badge={<ExpertBadge label={tPost("expertReviewer")} />}
                    ariaLabel={tPost("viewProfile", { name: reviewerName || "Reviewer" })}
                  />
                )}
              </div>

              {tags.length > 0 && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-semibold tracking-tight text-[#1E280E]">
                    {tPost("tags")}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {tags.map((tag) => {
                      let tagLabel = tag;
                      try {
                        tagLabel = (t as unknown as (k: string) => string)(`tags.${tag}`) || tag;
                      } catch {}
                      return (
                        <li key={tag}>
                          <Link
                            href={blogTagHref(tag)}
                            className={cx(
                              "inline-flex rounded-full border border-[#E9EAEB] bg-[#FAFAFA] px-2 py-0.5 text-sm font-medium tracking-tight text-[#535862] transition-colors hover:border-[#D4E9B6] hover:bg-[#EAF4DA] hover:text-[#59772B]",
                              focusRing,
                            )}
                          >
                            {tagLabel}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Comments Section (AC-01) */}
              <div className="border-t border-[#E9EAEB] pt-8">
                <BlogCommentSection slug={slug} />
              </div>
            </footer>
          </div>

          {/* Right Column: Sticky Vertical Share Dock (Image 3) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col items-center">
              <BlogSocialShare url={shareUrl} title={title} variant="vertical-dock" />
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="relative pb-16 pt-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="flex items-center justify-between gap-4 border-b border-[#E9EAEB] pb-5">
              <h2 className="text-display text-display-xs sm:text-display-sm">
                {tPost("relatedTitle")}
              </h2>
              <Link
                href="/blog"
                className="rounded text-md font-semibold tracking-tight text-[#769F3A] transition-colors hover:text-[#59772B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748]"
              >
                {t("viewAll")}
              </Link>
            </div>
            <Reveal
              stagger
              staggerAmount={0.1}
              y={30}
              duration={0.6}
              className="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} locale={locale} size="lg" />
              ))}
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}

function Dot() {
  return <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-[#A4A7AE]" />;
}

function ExpertBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full border border-[#C7D7FE] bg-[#EEF4FF] py-0.5 pl-1.5 pr-2 text-xs font-medium text-[#3538CD]">
      <CheckVerified02 aria-hidden className="size-3" />
      {label}
    </span>
  );
}

function Byline({
  label,
  href,
  person,
  name,
  avatarUrl,
  kind = "author",
  badge,
}: {
  label: string;
  href?: string;
  person?: BlogAuthorId | BlogReviewerId | string;
  name: string;
  avatarUrl?: string | null;
  kind?: "author" | "reviewer";
  badge?: ReactNode;
}) {
  const content = (
    <>
      <BlogPersonAvatar
        id={person}
        name={name}
        avatarUrl={avatarUrl}
        size="xs"
        kind={kind}
        className="ring-0"
      />
      <span className="underline-offset-2 group-hover:underline">{name}</span>
    </>
  );

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm tracking-tight text-[#717680]">{label}</p>
      <div className="flex flex-wrap items-center gap-1.5">
        {href ? (
          <Link
            href={href}
            className={cx(
              "group flex items-center gap-1.5 rounded text-sm tracking-tight text-[#1E280E] transition-colors hover:text-[#252B37]",
              focusRing,
            )}
          >
            {content}
          </Link>
        ) : (
          <div className="flex items-center gap-1.5 text-sm tracking-tight text-[#1E280E]">
            {content}
          </div>
        )}
        {badge}
      </div>
    </div>
  );
}

function ProfileCard({
  label,
  href,
  person,
  name,
  avatarUrl,
  kind = "author",
  badge,
  ariaLabel,
}: {
  label: string;
  href: string;
  person: BlogAuthorId | BlogReviewerId | string;
  name: string;
  avatarUrl?: string | null;
  kind?: "author" | "reviewer";
  badge?: ReactNode;
  ariaLabel: string;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cx(
        "group flex flex-col gap-3 rounded-2xl border border-[#E9EAEB] bg-[#FAFAFA] p-4 transition-colors hover:border-[#D5D7DA] hover:bg-[#F5F5F5] sm:flex-row sm:items-start",
        focusRing,
      )}
    >
      <BlogPersonAvatar
        id={person}
        name={name}
        avatarUrl={avatarUrl}
        size="lg"
        kind={kind}
        className="h-14 w-14 ring-0"
      />
      <div className="flex min-w-0 flex-1 items-center gap-4 sm:self-stretch">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="text-sm tracking-tight text-[#535862]">{label}</p>
          <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2">
            <p className="text-lg font-semibold tracking-tight text-[#1E280E]">{name}</p>
            {badge}
          </div>
        </div>
        <ChevronRight
          aria-hidden
          className="size-6 shrink-0 text-[#A4A7AE] transition-transform group-hover:translate-x-0.5"
        />
      </div>
    </Link>
  );
}
