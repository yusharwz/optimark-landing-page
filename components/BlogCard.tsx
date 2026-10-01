"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BlogPersonAvatar } from "@/components/BlogPersonAvatar";
import {
  BLOG_CATEGORY_ICONS,
  BLOG_CATEGORY_STYLES,
  authorHref,
  blogHref,
  type BlogPost,
} from "@/config/blog";
import { formatBlogDate } from "@/lib/blog";
import type { AppLocale } from "@/lib/locale";
import { cx } from "@/utils/cx";

type BlogCardProps = {
  post: BlogPost;
  locale: AppLocale;
  size?: "md" | "lg";
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2";

export function BlogCard({ post, locale, size = "md" }: BlogCardProps) {
  const t = useTranslations("blog");
  // Each post is its own namespace, so the slug selects the namespace rather
  // than being looked up as a key inside `blogPosts`.
  const tPost = useTranslations(`blogPosts.${post.slug}`);
  const tPeople = useTranslations("blogPeople");

  const style = BLOG_CATEGORY_STYLES[post.category];
  const Icon = BLOG_CATEGORY_ICONS[post.category];
  const title = tPost("title");
  const authorName = tPeople(`authors.${post.author}.name`);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const [truncated, setTruncated] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const check = () => setTruncated(el.scrollHeight > el.clientHeight + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [title]);

  return (
    <article className={cx("flex h-full flex-col", size === "lg" ? "gap-4" : "gap-3")}>
      {/* Cover */}
      <Link
        href={blogHref(post.slug)}
        tabIndex={-1}
        aria-hidden
        className={cx(
          "group relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[0.5px] border-black/10",
          size === "lg" ? "h-50" : "h-37.5",
        )}
        style={post.cover ? undefined : { background: style.cover }}
      >
        {post.cover ? (
          <Image
            src={post.cover}
            alt=""
            fill
            sizes={
              size === "lg"
                ? "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                : "(min-width: 1024px) 260px, (min-width: 640px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/70 bg-white/70 shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
            <Icon className="h-6 w-6" style={{ color: style.accent }} strokeWidth={1.75} />
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex flex-col gap-2">
          <span className="w-fit text-sm font-semibold tracking-tight text-[#769F3A] transition-colors hover:text-[#59772B]">
            {t(`categories.${post.category}`)}
          </span>

          <div className="group/title relative">
            <h3
              ref={titleRef}
              className="line-clamp-2 text-lg font-semibold tracking-tight text-[#1E280E]"
            >
              <Link
                href={blogHref(post.slug)}
                className={cx(
                  "rounded transition-colors hover:text-[#769F3A] active:text-[#769F3A]",
                  focusRing,
                )}
              >
                {title}
              </Link>
            </h3>
            {truncated && (
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 top-full z-20 mt-1 hidden whitespace-nowrap rounded-md bg-[#0A0D12] px-1.5 py-1 text-xs font-medium text-white shadow-sm [@media(hover:hover)]:group-hover/title:block"
              >
                {title}
              </span>
            )}
          </div>

          <p className="flex items-center gap-2.5 text-sm tracking-tight text-[#717680]">
            <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt, locale)}</time>
            <span aria-hidden className="h-1 w-1 rounded-full bg-[#A4A7AE]" />
            <span>{t("readTime", { minutes: post.readMinutes })}</span>
          </p>
        </div>

        <Link
          href={authorHref(post.author)}
          className={cx(
            "mt-auto flex w-fit items-center gap-1.5 rounded text-sm tracking-tight text-[#535862] transition-colors hover:text-[#252B37] active:text-[#252B37]",
            focusRing,
          )}
        >
          <BlogPersonAvatar id={post.author} name={authorName} size="xs" className="ring-0" />
          <span className="truncate">{authorName}</span>
        </Link>
      </div>
    </article>
  );
}
