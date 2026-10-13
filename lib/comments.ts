import { COMMENT_CONFIG } from "@/config/comments";
import type { CommentSubmissionPayload } from "@/types/comment";

/**
 * Escapes raw text to prevent XSS.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Validates whether a URL protocol is safe for hyperlinks.
 */
function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Converts URLs and markdown links inside comments into safe <a> tags
 * with mandatory `rel="ugc nofollow"` per AC-02.
 *
 * All user text is escaped against XSS before link substitution.
 */
export function formatCommentContentWithUgcLinks(content: string): string {
  if (!content) return "";

  // 1. First escape user text to make it XSS-safe
  let safeText = escapeHtml(content);

  // 2. Support markdown links: [text](https://example.com)
  const mdLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  safeText = safeText.replace(mdLinkRegex, (_match, linkText, url) => {
    if (!isSafeUrl(url)) return escapeHtml(linkText);
    return `<a href="${url}" target="_blank" rel="ugc nofollow" class="text-[#769F3A] underline underline-offset-2 hover:text-[#59772B] break-all">${linkText}</a>`;
  });

  // 3. Match raw URLs (https://... or http://...)
  const rawUrlRegex =
    /(^|[\s(])((https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*))/gi;
  safeText = safeText.replace(rawUrlRegex, (_match, prefix, fullUrl) => {
    if (!isSafeUrl(fullUrl)) return `${prefix}${fullUrl}`;
    return `${prefix}<a href="${fullUrl}" target="_blank" rel="ugc nofollow" class="text-[#769F3A] underline underline-offset-2 hover:text-[#59772B] break-all">${fullUrl}</a>`;
  });

  // 4. Convert newlines to <br />
  return safeText.replace(/\n/g, "<br />");
}

/**
 * Comprehensive anti-spam and moderation validation.
 * Rejects honeypot bots, rapid scripted submissions, invalid formatting, and spam patterns.
 */
export function validateCommentSubmission(payload: CommentSubmissionPayload): {
  valid: boolean;
  error?: string;
  isSpam?: boolean;
} {
  // 1. Honeypot check (hidden field filled by bots)
  if (payload.hpWebsite && payload.hpWebsite.trim().length > 0) {
    return { valid: false, error: "Spam detected.", isSpam: true };
  }

  // 2. Time-to-submit check (minimum 2s between render and submit)
  if (payload.renderedAt && typeof payload.renderedAt === "number") {
    const elapsedSeconds = (Date.now() - payload.renderedAt) / 1000;
    if (elapsedSeconds < COMMENT_CONFIG.minTimeSeconds) {
      return {
        valid: false,
        error: "Pengiriman terlalu cepat. Harap coba beberapa saat lagi.",
        isSpam: true,
      };
    }
  }

  // 3. Name validation
  const name = payload.authorName?.trim() || "";
  if (name.length < 2 || name.length > COMMENT_CONFIG.maxNameLength) {
    return {
      valid: false,
      error: `Nama harus antara 2 dan ${COMMENT_CONFIG.maxNameLength} karakter.`,
    };
  }

  // 4. Email validation
  const email = payload.authorEmail?.trim() || "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { valid: false, error: "Format email tidak valid." };
  }

  // 5. Content validation
  const content = payload.content?.trim() || "";
  if (
    content.length < COMMENT_CONFIG.minContentLength ||
    content.length > COMMENT_CONFIG.maxContentLength
  ) {
    return {
      valid: false,
      error: `Komentar harus antara ${COMMENT_CONFIG.minContentLength} dan ${COMMENT_CONFIG.maxContentLength} karakter.`,
    };
  }

  // 6. Anti-spam heuristic (excessive links or obvious spam words)
  const linkCount = (content.match(/https?:\/\//gi) || []).length;
  if (linkCount > 3) {
    return {
      valid: false,
      error: "Komentar mengandung terlalu banyak tautan (maksimal 3).",
      isSpam: true,
    };
  }

  return { valid: true };
}

export function formatCommentDate(isoDate: string, locale: "id" | "en" = "id"): string {
  try {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return isoDate;
  }
}
