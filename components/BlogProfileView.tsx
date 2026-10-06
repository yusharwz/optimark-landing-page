"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckVerified02,
  ChevronDown,
  ChevronUp,
  File04,
} from "@untitledui/icons";
import { BlogCard } from "@/components/BlogCard";
import { BlogPersonAvatar } from "@/components/BlogPersonAvatar";
import { Link } from "@/i18n/navigation";
import {
  BLOG_CATEGORY_IDS,
  BLOG_PERSON_LINKEDIN,
  getPostsByAuthor,
  getPostsByReviewer,
  type BlogAuthorId,
  type BlogCategoryId,
  type BlogReviewerId,
} from "@/config/blog";
import { SITE } from "@/config/site";
import { resolveLocale } from "@/lib/locale";
import { scrollToElement } from "@/lib/lenis";
import { cx } from "@/utils/cx";

type Props = { kind: "author"; id: BlogAuthorId } | { kind: "reviewer"; id: BlogReviewerId };

type Filter = BlogCategoryId | "all";

type HistoryEntry = { title: string; org: string; period: string; logo: string };

const PAGE_SIZE = 8;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2";

/**
 * Writer and reviewer profile, per the Figma "Writer Profile" and "Reviewer
 * Profile" canvases: a profile card beside (desktop) or above (tablet/mobile)
 * the list of their articles, which can be filtered by category and paged.
 */
export function BlogProfileView(props: Props) {
  const t = useTranslations("blog.profile");
  const tPeople = useTranslations("blogPeople");

  const isReviewer = props.kind === "reviewer";
  const person = isReviewer
    ? (`reviewers.${props.id}` as const)
    : (`authors.${props.id as BlogAuthorId}` as const);
  const fullName = tPeople(`${person}.fullName`);
  const posts = isReviewer
    ? getPostsByReviewer(props.id as BlogReviewerId)
    : getPostsByAuthor(props.id as BlogAuthorId);

  const listTitle = isReviewer
    ? t("reviewedArticles")
    : t("articlesBy", { name: fullName.split(" ")[0] });

  return (
    <section className="relative pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <nav aria-label="Breadcrumb" className="py-4">
          <ol className="flex min-w-0 items-center gap-1.5 text-sm font-medium tracking-tight">
            <li className="shrink-0">
              <Link
                href="/"
                className="rounded text-[#717680] transition-colors hover:text-[#535862] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748]"
              >
                {t("breadcrumbHome")}
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
                {t("breadcrumbBlog")}
              </Link>
            </li>
            <li aria-hidden className="shrink-0 text-[#D5D7DA]">
              /
            </li>
            <li aria-current="page" className="min-w-0 truncate text-[#535862]">
              {fullName}
            </li>
          </ol>
        </nav>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
          <ProfileCard {...props} />
          <ArticleList title={listTitle} posts={posts} showReviewer={isReviewer} />
        </div>
      </div>
    </section>
  );
}

function ProfileCard(props: Props) {
  const t = useTranslations("blog.profile");
  const tPeople = useTranslations("blogPeople");

  const isReviewer = props.kind === "reviewer";
  const person = isReviewer
    ? (`reviewers.${props.id}` as const)
    : (`authors.${props.id as BlogAuthorId}` as const);
  const fullName = tPeople(`${person}.fullName`);
  const bio = tPeople(`${person}.bio`);
  const linkedin = BLOG_PERSON_LINKEDIN[props.id];
  const expertise = (tPeople.raw(`${person}.expertise`) as string[]).join(", ");

  return (
    <aside className="flex w-full shrink-0 flex-col gap-5 rounded-2xl bg-[#FAFAFA] p-6 lg:w-120">
      <div className="flex flex-col items-start gap-3">
        <BlogPersonAvatar
          id={props.id}
          name={fullName}
          size="xl"
          kind={props.kind}
          className="h-37.5 w-37.5 ring-0 sm:h-37.5 sm:w-37.5"
        />
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-2xl leading-8 font-semibold tracking-tight text-[#1E280E]">
              {fullName}
            </h1>
            {isReviewer && (
              <span className="inline-flex items-center gap-1 rounded-full border border-[#C7D7FE] bg-[#EEF4FF] px-2 py-0.5 text-sm font-medium tracking-tight text-[#3538CD]">
                <CheckVerified02 aria-hidden className="size-3" />
                {t("expertReviewer")}
              </span>
            )}
          </div>
          <p className="text-sm tracking-tight text-[#1E280E]">
            <span className="font-semibold">{tPeople(`${person}.position`)}</span>{" "}
            {t("worksAt", { company: SITE.companyName })}
          </p>
        </div>
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={t("linkedin", { name: fullName })}
            className={cx(
              "inline-flex h-8 items-center gap-1 rounded-full border border-[#E9EAEB] bg-white/70 px-3 text-sm font-medium tracking-tight text-[#1E280E] transition-colors hover:border-[#D5D7DA] hover:bg-white",
              focusRing,
            )}
          >
            <Image src="/images/connect/linkedin.svg" alt="" width={16} height={16} />
            LinkedIn
          </a>
        )}
      </div>

      <hr className="border-[#E9EAEB]" />

      <div className="flex flex-col gap-2">
        <h2 className="text-xl leading-7.5 font-semibold tracking-tight text-[#1E280E]">
          {t("profile")}
        </h2>
        <div className="flex flex-col gap-5.5 text-md tracking-tight text-[#1E280E]">
          {bio.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
          <p>
            <span className="font-semibold">{t("role")}</span> {tPeople(`${person}.role`)}
            <br />
            <span className="font-semibold">{t("expertise")}</span> {expertise}
          </p>
        </div>
      </div>

      {isReviewer && (
        <>
          <hr className="border-[#E9EAEB]" />
          <HistorySection
            title={t("experience")}
            entries={
              tPeople.raw(`reviewers.${props.id as BlogReviewerId}.experience`) as HistoryEntry[]
            }
          />
          <hr className="border-[#E9EAEB]" />
          <HistorySection
            title={t("education")}
            entries={
              tPeople.raw(`reviewers.${props.id as BlogReviewerId}.education`) as HistoryEntry[]
            }
          />
        </>
      )}
    </aside>
  );
}

/** "Pengalaman" / "Pendidikan": collapsed by default, toggled by Tampilkan/Sembunyikan. */
function HistorySection({ title, entries }: { title: string; entries: HistoryEntry[] }) {
  const t = useTranslations("blog.profile");
  const [open, setOpen] = useState(false);
  const panelId = `history-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl leading-7.5 font-semibold tracking-tight text-[#1E280E]">{title}</h2>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className={cx(
            "inline-flex items-center rounded text-sm font-semibold tracking-tight text-[#769F3A] transition-colors hover:text-[#59772B]",
            focusRing,
          )}
        >
          <span className="px-0.5">{open ? t("hide") : t("show")}</span>
          {open ? (
            <ChevronUp aria-hidden className="size-4.5" />
          ) : (
            <ChevronDown aria-hidden className="size-4.5" />
          )}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {entries.map((entry, index) => (
              <li
                key={`${entry.title}-${entry.period}`}
                className={cx("flex items-center gap-3", index === 0 ? "pt-4" : "pt-5")}
              >
                <span className="relative flex size-11.5 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-[#F5F5F5]">
                  <Image
                    src={entry.logo}
                    alt={entry.org}
                    width={46}
                    height={46}
                    className="size-full object-contain"
                  />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p className="text-md font-semibold tracking-tight text-[#232933]">
                    {entry.title}
                  </p>
                  <p className="flex flex-wrap items-center gap-x-2 text-sm tracking-tight text-[#535862]">
                    <span>{entry.org}</span>
                    <span aria-hidden className="h-1 w-1 rounded-full bg-[#A4A7AE]" />
                    <span>{entry.period}</span>
                  </p>
                </div>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function ArticleList({
  title,
  posts,
  showReviewer,
}: {
  title: string;
  posts: ReturnType<typeof getPostsByAuthor>;
  showReviewer: boolean;
}) {
  const t = useTranslations("blog.profile");
  const locale = resolveLocale(useLocale());
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => (filter === "all" ? posts : posts.filter((post) => post.category === filter)),
    [filter, posts],
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changeFilter = (value: Filter) => {
    setFilter(value);
    setPage(1);
  };

  const goToPage = (next: number) => {
    setPage(next);
    if (listRef.current) scrollToElement(listRef.current, 112);
  };

  return (
    <div ref={listRef} className="flex min-w-0 flex-1 flex-col gap-6">
      <div className="flex items-start justify-between gap-4 border-b border-[#E9EAEB] pb-5">
        <h2 className="text-xl leading-7.5 font-semibold tracking-tight text-[#1E280E]">{title}</h2>
        <CategoryFilter value={filter} onChange={changeFilter} />
      </div>

      {visible.length === 0 ? (
        <div className="flex h-62.5 flex-col items-center justify-center gap-4 px-8 text-center">
          <span className="flex items-center rounded-lg border border-[#D5D7DA] bg-white p-2.5 shadow-xs">
            <File04 aria-hidden className="size-5 text-[#414651]" />
          </span>
          <p className="text-md tracking-tight text-[#535862]">{t("empty")}</p>
        </div>
      ) : (
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
          {visible.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale} showReviewer={showReviewer} />
          ))}
        </div>
      )}

      {pageCount > 1 && <Pagination page={page} pageCount={pageCount} onChange={goToPage} />}
    </div>
  );
}

function CategoryFilter({ value, onChange }: { value: Filter; onChange: (value: Filter) => void }) {
  const t = useTranslations("blog.profile");
  const tBlog = useTranslations("blog");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const options: Filter[] = ["all", ...BLOG_CATEGORY_IDS];
  const label = (option: Filter) =>
    option === "all" ? t("allCategories") : tBlog(`categories.${option}`);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t("filterLabel")}: ${label(value)}`}
        className={cx(
          "inline-flex items-center gap-1 rounded-lg border border-[#D5D7DA] bg-white px-3 py-2 text-sm font-semibold tracking-tight text-[#535862] shadow-xs transition-colors hover:bg-[#FAFAFA]",
          focusRing,
        )}
      >
        <span className="px-0.5">{label(value)}</span>
        <ChevronDown aria-hidden className="size-4.5 text-[#A4A7AE]" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label={t("filterLabel")}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-30 mt-1 w-44 rounded-xl border border-black/8 bg-white py-2 shadow-lg"
          >
            {options.map((option) => {
              const selected = option === value;
              return (
                <div key={option} className="px-2">
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={selected}
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                    className={cx(
                      "flex w-full items-center gap-2 rounded-[10px] py-2 pl-2 pr-2.5 text-left text-sm font-medium tracking-tight text-[#1E280E] transition-colors hover:bg-[#FAFAFA]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#94C748]",
                      selected && "bg-[#FAFAFA]",
                    )}
                  >
                    <span className="flex-1">{label(option)}</span>
                    {selected && <Check aria-hidden className="size-4 text-[#94C748]" />}
                  </button>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Page numbers with ellipses, e.g. 1 2 3 … 8 9 10. */
function pageItems(page: number, pageCount: number): (number | "gap")[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);
  if (page <= 3 || page >= pageCount - 2) {
    return [1, 2, 3, "gap", pageCount - 2, pageCount - 1, pageCount];
  }
  return [1, "gap", page - 1, page, page + 1, "gap", pageCount];
}

function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}) {
  const t = useTranslations("blog.profile");
  const arrow = cx(
    "flex size-10 items-center justify-center rounded-lg border bg-white shadow-xs transition-colors",
    "disabled:cursor-not-allowed disabled:border-[#E9EAEB] disabled:text-[#D5D7DA]",
    "enabled:border-[#D5D7DA] enabled:text-[#414651] enabled:hover:bg-[#FAFAFA]",
    focusRing,
  );

  return (
    <nav
      aria-label={t("pagination")}
      className="flex items-center justify-between gap-8 border-t border-[#E9EAEB] pt-5 sm:justify-center"
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label={t("previous")}
        className={arrow}
      >
        <ArrowLeft aria-hidden className="size-5" />
      </button>

      <p className="text-sm font-medium tracking-tight text-[#414651] sm:hidden">
        {t("pageOf", { page, total: pageCount })}
      </p>

      <ol className="hidden items-center gap-0.5 sm:flex">
        {pageItems(page, pageCount).map((item, index) =>
          item === "gap" ? (
            <li
              key={`gap-${index}`}
              aria-hidden
              className="flex size-10 items-center justify-center text-sm font-medium text-[#717680]"
            >
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => onChange(item)}
                aria-label={t("goToPage", { page: item })}
                aria-current={item === page ? "page" : undefined}
                className={cx(
                  "flex size-10 items-center justify-center rounded-lg text-sm font-medium tracking-tight transition-colors",
                  item === page
                    ? "bg-[#FAFAFA] text-[#535862]"
                    : "text-[#717680] hover:bg-[#FAFAFA] hover:text-[#535862]",
                  focusRing,
                )}
              >
                {item}
              </button>
            </li>
          ),
        )}
      </ol>

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount}
        aria-label={t("next")}
        className={arrow}
      >
        <ArrowRight aria-hidden className="size-5" />
      </button>
    </nav>
  );
}
