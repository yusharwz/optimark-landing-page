import type { BlogComment } from "@/types/comment";

/**
 * CMS and Comment API configuration.
 *
 * Plug-and-play CMS integration:
 * When a headless CMS is ready, configure `CMS_COMMENT_API_URL` (server-side)
 * or `NEXT_PUBLIC_COMMENT_API_URL` (client-side) in .env / .env.local.
 * If unset, the internal Next.js route `/api/blog/comments` handles submission,
 * anti-spam verification, and moderation storage.
 */
export const COMMENT_CONFIG = {
  cmsApiUrl:
    process.env.CMS_COMMENT_API_URL ||
    process.env.NEXT_PUBLIC_COMMENT_API_URL ||
    `${process.env.CMS_API_URL?.replace(/\/+$/, "") || "http://localhost:3001"}/api/public/comments`,
  internalApiEndpoint: "/api/blog/comments",

  // Anti-spam thresholds
  minTimeSeconds: 2,
  minContentLength: 3,
  maxContentLength: 1000,
  maxNameLength: 60,

  // Moderation
  requireModeration: true,
} as const;

export const DEFAULT_MOCKUP_COMMENTS: BlogComment[] = [
  {
    id: "cm-001",
    slug: "default",
    authorName: "Rizky Pratama",
    content:
      "Artikel yang sangat membantu! Penjelasannya lengkap dan mudah dipahami. Setelah mengikuti langkah-langkahnya, website saya akhirnya sudah muncul di Google. Terima kasih tim Optimark!",
    createdAt: "2025-10-12T10:00:00Z",
    status: "APPROVED",
    likes: 5,
  },
  {
    id: "cm-002",
    slug: "default",
    authorName: "Siti Nurhaliza",
    content:
      "Informasinya sangat jelas dan praktis. Apakah ada tips tambahan untuk website baru yang masih belum terindeks sama sekali?",
    createdAt: "2025-10-08T14:30:00Z",
    status: "APPROVED",
    likes: 2,
  },
];

export const INITIAL_APPROVED_COMMENTS: Record<string, BlogComment[]> = {
  default: DEFAULT_MOCKUP_COMMENTS,
};
