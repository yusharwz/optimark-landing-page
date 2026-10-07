import type { BlogSlug } from "@/config/blog";

/**
 * Shape of the per-post copy in `messages/{locale}/blog-posts.json`.
 *
 * Post bodies are structured blocks rather than raw HTML, so translators supply
 * text, never markup or styling.
 */
export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "figure"; image: string; caption?: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; title: string; text: string };

export interface BlogPostMessages {
  title: string;
  excerpt: string;
  coverAlt: string;
  metaTitle: string;
  metaDescription: string;
  blocks: BlogBlock[];
}

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
