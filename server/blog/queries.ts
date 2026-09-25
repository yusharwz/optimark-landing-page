import "server-only";

import type { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import type { AppLocale } from "@/lib/locale";
import type { BlogBlock } from "@/types/blog";

/**
 * Read side of the blog, backed by the database.
 *
 * NOT WIRED IN YET. The pages still read the sample posts in config/blog.ts.
 * Switching them over is a deliberate, separate step, because every page is
 * statically prerendered at `next build` — and the Docker build has no
 * database. Pages that query here will need to render on demand or with ISR
 * (`export const revalidate = …`) instead of at build time; see the note in
 * the 2026-09-25 work log.
 *
 * Every function returns plain domain objects, never raw Prisma rows, so the
 * components can switch from config to database without changing shape.
 */

export type BlogPersonSummary = {
  slug: string;
  name: string;
  role: string;
  avatarUrl: string | null;
};

export type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  categoryName: string;
  coverImageUrl: string | null;
  readMinutes: number;
  featured: boolean;
  publishedAt: Date;
  contentUpdatedAt: Date | null;
  author: BlogPersonSummary;
  reviewer: BlogPersonSummary | null;
};

export type BlogPostDetail = BlogPostSummary & {
  metaTitle: string;
  metaDescription: string;
  body: BlogBlock[];
};

export type BlogPersonProfile = BlogPersonSummary & {
  bio: string;
  linkedinUrl: string | null;
};

/** Only posts a reader may see: published, with a publish date in the past. */
function publishedWhere() {
  return { status: "PUBLISHED" as const, publishedAt: { lte: new Date() } };
}

/** Relations every post query needs, narrowed to the requested locale. */
function postInclude(locale: AppLocale) {
  const personInclude = { translations: { where: { locale } } };
  return {
    translations: { where: { locale } },
    category: { include: { translations: { where: { locale } } } },
    author: { include: personInclude },
    reviewer: { include: personInclude },
  } as const;
}

type PersonRow = {
  slug: string;
  name: string;
  avatarUrl: string | null;
  translations: { role: string }[];
};

function toPersonSummary(person: PersonRow): BlogPersonSummary {
  return {
    slug: person.slug,
    name: person.name,
    role: person.translations[0]?.role ?? "",
    avatarUrl: person.avatarUrl,
  };
}

/**
 * Published posts that have copy in `locale`, newest first, optionally
 * narrowed further (by author, reviewer, …) inside the same query.
 */
async function findPublishedPosts(
  locale: AppLocale,
  where: Prisma.BlogPostWhereInput = {},
): Promise<BlogPostSummary[]> {
  const rows = await db.blogPost.findMany({
    where: { ...publishedWhere(), translations: { some: { locale } }, ...where },
    include: postInclude(locale),
    orderBy: { publishedAt: "desc" },
  });

  return rows.map((row) => {
    const copy = row.translations[0];
    return {
      slug: row.slug,
      title: copy.title,
      excerpt: copy.excerpt,
      categorySlug: row.category.slug,
      categoryName: row.category.translations[0]?.name ?? row.category.slug,
      coverImageUrl: row.coverImageUrl,
      readMinutes: row.readMinutes,
      featured: row.featured,
      // Guaranteed by publishedWhere(); the type cannot express that.
      publishedAt: row.publishedAt!,
      contentUpdatedAt: row.contentUpdatedAt,
      author: toPersonSummary(row.author),
      reviewer: row.reviewer ? toPersonSummary(row.reviewer) : null,
    };
  });
}

/** Published posts for the index, newest first. */
export function listPublishedPosts(locale: AppLocale): Promise<BlogPostSummary[]> {
  return findPublishedPosts(locale);
}

/** One published post with its full body, or null when missing/unpublished. */
export async function getPublishedPost(
  slug: string,
  locale: AppLocale,
): Promise<BlogPostDetail | null> {
  const row = await db.blogPost.findFirst({
    where: { slug, ...publishedWhere() },
    include: postInclude(locale),
  });

  const copy = row?.translations[0];
  if (!row || !copy) return null;

  return {
    slug: row.slug,
    title: copy.title,
    excerpt: copy.excerpt,
    metaTitle: copy.metaTitle,
    metaDescription: copy.metaDescription,
    body: copy.body as BlogBlock[],
    categorySlug: row.category.slug,
    categoryName: row.category.translations[0]?.name ?? row.category.slug,
    coverImageUrl: row.coverImageUrl,
    readMinutes: row.readMinutes,
    featured: row.featured,
    publishedAt: row.publishedAt!,
    contentUpdatedAt: row.contentUpdatedAt,
    author: toPersonSummary(row.author),
    reviewer: row.reviewer ? toPersonSummary(row.reviewer) : null,
  };
}

/** Author/reviewer profile, or null when no such person exists. */
export async function getPerson(
  slug: string,
  locale: AppLocale,
): Promise<BlogPersonProfile | null> {
  const person = await db.blogPerson.findUnique({
    where: { slug },
    include: { translations: { where: { locale } } },
  });
  if (!person) return null;

  return {
    ...toPersonSummary(person),
    bio: person.translations[0]?.bio ?? "",
    linkedinUrl: person.linkedinUrl,
  };
}

/** Published posts a person wrote (`author`) or reviewed (`reviewer`). */
export function listPostsByPerson(
  slug: string,
  as: "author" | "reviewer",
  locale: AppLocale,
): Promise<BlogPostSummary[]> {
  return findPublishedPosts(
    locale,
    as === "author" ? { author: { slug } } : { reviewer: { slug } },
  );
}
