import type { BlogSlug } from "@/config/blog";

/**
 * Shape of the per-post copy in `messages/{locale}/blog-posts.json`.
 *
 * Post bodies are structured blocks rather than raw HTML so the renderer keeps
 * full control of the Clarity Ladder classes (see DESIGN.md §2.2) — translators
 * supply text, never markup or styling.
 */
export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  /** `text` may contain inline links as `[label](href)`; see BlogArticle. */
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  /** `image` is a path under `public/`; the caption is the translated part. */
  | { type: "figure"; image: string; caption?: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; title: string; text: string };

export interface BlogPostMessages {
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  blocks: BlogBlock[];
}

/** One "Daftar Isi" entry, derived from the post's h2/h3 blocks. */
export interface BlogTocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Keyed by the literal slugs in `config/blog.ts` rather than by `string`: an
 * index signature here would widen every namespace key next-intl derives to
 * `blogPosts.${string}`, which breaks `Translator` annotations elsewhere.
 */
export type BlogPostsMessages = Record<BlogSlug, BlogPostMessages>;
