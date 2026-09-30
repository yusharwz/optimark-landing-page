"use client";

import { useLocale, useTranslations } from "next-intl";
import { BadgeCheck, ChevronRight, FileText, Info } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { BlogPersonAvatar } from "@/components/BlogPersonAvatar";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import {
  getPostsByAuthor,
  getPostsByReviewer,
  type BlogAuthorId,
  type BlogReviewerId,
} from "@/config/blog";
import { resolveLocale } from "@/lib/locale";

type Props = { kind: "author"; id: BlogAuthorId } | { kind: "reviewer"; id: BlogReviewerId };

/**
 * Author and reviewer profile page — kept deliberately minimal while the
 * profiles are placeholders: avatar, name, role, article count, bio, and the
 * articles they wrote or reviewed.
 *
 * The fuller Mekari-style reviewer layout (experience, education, credential
 * grid) is worth building once real editorial profiles exist to fill it.
 */
export function BlogProfileView(props: Props) {
  const t = useTranslations("blog.profile");
  const tPeople = useTranslations("blogPeople");
  const locale = resolveLocale(useLocale());

  const isAuthor = props.kind === "author";
  const person =
    props.kind === "author" ? (`authors.${props.id}` as const) : (`reviewers.${props.id}` as const);
  const name = tPeople(`${person}.name`);
  const role = tPeople(`${person}.role`);
  const bio = tPeople(`${person}.bio`);
  const posts = isAuthor ? getPostsByAuthor(props.id) : getPostsByReviewer(props.id);

  const crumbLink =
    "rounded transition-colors hover:text-[#94C748] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748]";

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(242,248,231,0.55) 100%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-4 pb-14 pt-16 sm:px-6 lg:pt-20">
          <nav aria-label="Breadcrumb">
            <ol className="text-detail flex flex-wrap items-center gap-1.5 text-xs">
              <li>
                <Link href="/" className={crumbLink}>
                  {t("breadcrumbHome")}
                </Link>
              </li>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
              <li>
                <Link href="/blog" className={crumbLink}>
                  {t("breadcrumbBlog")}
                </Link>
              </li>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
              <li aria-current="page" className="font-medium text-[#1E280E]">
                {name}
              </li>
            </ol>
          </nav>

          {/* Placeholder banner — remove with `blog.profile.sampleNotice` once
              the real editorial team is in config/blog.ts. */}
          <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-amber-300/50 bg-amber-50/70 px-4 py-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
            <p className="text-sm text-amber-900">{t("sampleNotice")}</p>
          </div>

          <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <BlogPersonAvatar id={props.id} name={name} size="xl" kind={props.kind} />
            <div className="min-w-0">
              {!isAuthor && (
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#94C748]/30 bg-[#94C748]/10 px-3 py-1 text-xs font-semibold text-[#1E280E]">
                  <BadgeCheck className="h-3.5 w-3.5 text-[#94C748]" aria-hidden />
                  {t("reviewerBadge")}
                </span>
              )}
              <h1 className="text-display text-3xl sm:text-4xl">{name}</h1>
              <p className="text-lead mt-2 text-base">{role}</p>
              <p className="text-detail mt-3 inline-flex items-center gap-1.5 text-sm">
                <FileText className="h-4 w-4" aria-hidden />
                {isAuthor
                  ? t("articleCount", { count: posts.length })
                  : t("reviewedCount", { count: posts.length })}
              </p>
            </div>
          </div>

          <p className="text-lead mt-8 text-base lg:text-lg">{bio}</p>
        </div>
      </section>

      <section className="relative border-t border-gray-200/80 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-display text-2xl lg:text-3xl">
            {isAuthor ? t("articlesBy", { name }) : t("reviewedArticles")}
          </h2>

          {posts.length === 0 ? (
            <p className="text-lead mt-10 rounded-2xl border border-dashed border-gray-200/80 bg-gray-50/50 p-10 text-center text-sm">
              {t("empty")}
            </p>
          ) : (
            <Reveal
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
