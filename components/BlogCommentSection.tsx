"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Reply,
  ShieldCheck,
  ThumbsUp,
  User,
} from "lucide-react";
import type { BlogSlug } from "@/config/blog";
import { COMMENT_CONFIG, DEFAULT_MOCKUP_COMMENTS } from "@/config/comments";
import { formatCommentContentWithUgcLinks, formatCommentDate } from "@/lib/comments";
import { resolveLocale } from "@/lib/locale";
import type { BlogComment, CommentApiResponse } from "@/types/comment";
import { cx } from "@/utils/cx";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB318] focus-visible:ring-offset-2";

const STORAGE_KEY = "optimark_comment_user_data";

interface BlogCommentSectionProps {
  slug: BlogSlug;
  className?: string;
  initialComments?: BlogComment[];
}

export function BlogCommentSection({ slug, className, initialComments }: BlogCommentSectionProps) {
  const t = useTranslations("blog.comments");
  const locale = resolveLocale(useLocale());

  const [comments, setComments] = useState<BlogComment[]>(
    initialComments || DEFAULT_MOCKUP_COMMENTS.map((c) => ({ ...c, slug })),
  );
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Form states
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [authorWebsite, setAuthorWebsite] = useState("");
  const [content, setContent] = useState("");
  const [saveData, setSaveData] = useState(true);
  const [hpWebsite, setHpWebsite] = useState(""); // Honeypot bot protection

  // Feedback states
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Likes state
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});

  // Form ref for reply scrolling
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const renderedAtRef = useRef<number>(Date.now());

  // Restore saved name/email/website from localStorage if previously stored
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setAuthorName(parsed.name);
        if (parsed.email) setAuthorEmail(parsed.email);
        if (parsed.website) setAuthorWebsite(parsed.website);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Fetch comments
  useEffect(() => {
    let isMounted = true;
    async function fetchComments() {
      try {
        setLoading(true);
        const endpoint = `${COMMENT_CONFIG.internalApiEndpoint}?slug=${encodeURIComponent(slug)}`;
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error("Failed to load comments");
        const json: CommentApiResponse = await res.json();
        if (isMounted && json.success && Array.isArray(json.data)) {
          setComments(json.data);
          const initialLikes: Record<string, number> = {};
          json.data.forEach((c) => {
            initialLikes[c.id] = c.likes ?? 0;
          });
          setLikesMap(initialLikes);
        }
      } catch (err) {
        console.error("Failed to load comments:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchComments();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Handle Like
  const handleLike = (commentId: string) => {
    const isAlreadyLiked = likedComments[commentId];
    setLikedComments((prev) => ({ ...prev, [commentId]: !isAlreadyLiked }));
    setLikesMap((prev) => {
      const current = prev[commentId] ?? 0;
      return {
        ...prev,
        [commentId]: isAlreadyLiked ? Math.max(0, current - 1) : current + 1,
      };
    });
  };

  // Handle Reply
  const handleReply = (targetAuthor: string) => {
    if (textareaRef.current) {
      setContent((prev) => `@${targetAuthor} ${prev}`);
      textareaRef.current.focus();
      textareaRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!authorName.trim() || !authorEmail.trim() || !content.trim()) {
      setErrorMessage(t("errorRequired"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(authorEmail.trim())) {
      setErrorMessage(t("errorEmail"));
      return;
    }

    // Persist to localStorage if checkbox checked
    if (saveData) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            name: authorName.trim(),
            email: authorEmail.trim(),
            website: authorWebsite.trim(),
          }),
        );
      } catch {
        // Ignore storage error
      }
    }

    startTransition(async () => {
      try {
        const payload = {
          slug,
          authorName: authorName.trim(),
          authorEmail: authorEmail.trim(),
          authorWebsite: authorWebsite.trim() || undefined,
          content: content.trim(),
          hpWebsite: hpWebsite.trim(),
          renderedAt: renderedAtRef.current,
        };

        const res = await fetch(COMMENT_CONFIG.internalApiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data: CommentApiResponse = await res.json();

        if (!res.ok || !data.success) {
          setErrorMessage(data.error || t("errorGeneric"));
          return;
        }

        setSuccessMessage(t("pendingAlert"));
        setContent("");

        if (data.data && !Array.isArray(data.data)) {
          const pendingComment = data.data;
          setComments((prev) => [pendingComment, ...prev]);
        }

        renderedAtRef.current = Date.now();
      } catch (err) {
        console.error("Comment submit error:", err);
        setErrorMessage(t("errorGeneric"));
      }
    });
  };

  return (
    <section
      id="comments"
      aria-labelledby="comments-heading"
      className={cx("flex flex-col scroll-mt-24", className)}
    >
      {/* Main Card Container Matching Image 1 Design */}
      <div className="rounded-2xl sm:rounded-3xl border border-[#E5E7EB] bg-white p-4 sm:p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        {/* Form Header with Flanking Lines */}
        <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
          <div className="h-px flex-1 bg-[#E5E7EB]" />
          <h3
            id="comments-heading"
            className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#111827] text-center"
          >
            {t("formTitle")}
          </h3>
          <div className="h-px flex-1 bg-[#E5E7EB]" />
        </div>

        {/* Feedback alerts */}
        {successMessage && (
          <div
            role="status"
            className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-emerald-900"
          >
            <CheckCircle2 className="size-5 shrink-0 text-emerald-600 mt-0.5" />
            <p className="leading-snug">{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-900"
          >
            <AlertCircle className="size-5 shrink-0 text-red-600 mt-0.5" />
            <p className="leading-snug">{errorMessage}</p>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Honeypot anti-spam field */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="hp_website">Leave this empty</label>
            <input
              type="text"
              id="hp_website"
              name="hp_website"
              value={hpWebsite}
              onChange={(e) => setHpWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* 3-Column Inputs on Desktop */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            <input
              type="text"
              required
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder={t("namePlaceholder")}
              maxLength={COMMENT_CONFIG.maxNameLength}
              className={cx(
                "h-11 rounded-lg border border-[#E5E7EB] bg-white px-3.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-colors focus:border-[#5BB318] focus:ring-1 focus:ring-[#5BB318]",
                focusRing,
              )}
            />
            <input
              type="email"
              required
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className={cx(
                "h-11 rounded-lg border border-[#E5E7EB] bg-white px-3.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-colors focus:border-[#5BB318] focus:ring-1 focus:ring-[#5BB318]",
                focusRing,
              )}
            />
            <input
              type="url"
              value={authorWebsite}
              onChange={(e) => setAuthorWebsite(e.target.value)}
              placeholder={t("websitePlaceholder")}
              className={cx(
                "h-11 rounded-lg border border-[#E5E7EB] bg-white px-3.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-colors focus:border-[#5BB318] focus:ring-1 focus:ring-[#5BB318]",
                focusRing,
              )}
            />
          </div>

          {/* Full-width Textarea */}
          <div>
            <textarea
              ref={textareaRef}
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t("commentPlaceholder")}
              maxLength={COMMENT_CONFIG.maxContentLength}
              className={cx(
                "w-full rounded-lg border border-[#E5E7EB] bg-white p-3.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-colors focus:border-[#5BB318] focus:ring-1 focus:ring-[#5BB318]",
                focusRing,
              )}
            />
          </div>

          {/* Save Data Checkbox */}
          <div className="flex items-center">
            <label className="flex items-center gap-2.5 text-xs sm:text-sm text-[#374151] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={saveData}
                onChange={(e) => setSaveData(e.target.checked)}
                className="size-4 rounded border-[#D1D5DB] text-[#5BB318] focus:ring-[#5BB318]"
              />
              <span>{t("saveDataLabel")}</span>
            </label>
          </div>

          {/* Anti-spam notice */}
          <div className="flex items-start gap-2 rounded-lg bg-[#F9FAFB] p-2.5 text-xs leading-relaxed text-[#6B7280]">
            <ShieldCheck className="size-4 shrink-0 text-[#5BB318] mt-0.5" />
            <p>{t("moderationNotice")}</p>
          </div>

          {/* Pill Submit Button */}
          <div className="flex justify-start pt-1">
            <button
              type="submit"
              disabled={isPending}
              className={cx(
                "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#5BB318] hover:bg-[#4E9F15] text-white px-7 py-3 text-sm font-semibold shadow-xs transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
                focusRing,
              )}
            >
              {isPending ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>{t("submitting")}</span>
                </>
              ) : (
                <>
                  <span>{t("submit")}</span>
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Divider */}
        <hr className="border-[#E5E7EB] my-8 sm:my-10" />

        {/* Comments Section Header */}
        <div className="mb-6">
          <h4 className="text-lg sm:text-xl font-bold tracking-tight text-[#111827]">
            {t("title")} ({comments.length})
          </h4>
        </div>

        {/* Comment List */}
        <div className="flex flex-col">
          {loading ? (
            <div className="flex h-24 items-center justify-center">
              <span className="size-6 animate-spin rounded-full border-2 border-[#5BB318] border-t-transparent" />
            </div>
          ) : comments.length === 0 ? (
            <p className="text-sm text-[#6B7280] py-4 text-center">{t("empty")}</p>
          ) : (
            <div className="flex flex-col divide-y divide-[#E5E7EB]">
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  locale={locale}
                  likes={likesMap[comment.id] ?? (comment.likes || 0)}
                  isLiked={!!likedComments[comment.id]}
                  onLike={() => handleLike(comment.id)}
                  onReply={() => handleReply(comment.authorName)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CommentItem({
  comment,
  locale,
  likes,
  isLiked,
  onLike,
  onReply,
}: {
  comment: BlogComment;
  locale: "id" | "en";
  likes: number;
  isLiked: boolean;
  onLike: () => void;
  onReply: () => void;
}) {
  const t = useTranslations("blog.comments");
  const isPending = comment.status === "PENDING";
  const formattedHtml = formatCommentContentWithUgcLinks(comment.content);

  return (
    <article className="flex items-start gap-3 sm:gap-3.5 py-5 sm:py-6 first:pt-0 last:pb-0">
      {/* Mint green avatar circle with dark green user silhouette icon matching Image 1 */}
      <div
        aria-hidden="true"
        className="flex size-9 sm:size-11 shrink-0 items-center justify-center rounded-full bg-[#E6F4EA] text-[#2E7D32]"
      >
        <User className="size-4.5 sm:size-5.5 fill-[#2E7D32]" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        {/* Header Line: Author + Date */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {comment.authorWebsite ? (
            <a
              href={comment.authorWebsite}
              target="_blank"
              rel="ugc nofollow"
              className="text-sm sm:text-base font-bold tracking-tight text-[#111827] hover:underline"
            >
              {comment.authorName}
            </a>
          ) : (
            <span className="text-sm sm:text-base font-bold tracking-tight text-[#111827]">
              {comment.authorName}
            </span>
          )}

          <time dateTime={comment.createdAt} className="text-xs sm:text-sm text-[#6B7280]">
            {formatCommentDate(comment.createdAt, locale)}
          </time>

          {isPending && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] sm:text-xs font-medium text-amber-700">
              <Clock className="size-3" />
              {t("pendingBadge")}
            </span>
          )}
        </div>

        {/* Comment Body with Rel="ugc nofollow" hyperlinks */}
        <div
          className="text-sm sm:text-[15px] leading-relaxed text-[#374151] break-words overflow-hidden"
          dangerouslySetInnerHTML={{ __html: formattedHtml }}
        />

        {/* Action Controls: Thumbs-up (Like) and Reply */}
        <div className="mt-1 flex items-center gap-4">
          <button
            type="button"
            onClick={onLike}
            className={cx(
              "flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-colors",
              isLiked ? "text-[#4E9F15] font-bold" : "text-[#5BB318] hover:text-[#4E9F15]",
            )}
          >
            <ThumbsUp
              className={cx(
                "size-3.5",
                isLiked ? "fill-[#5BB318] text-[#5BB318]" : "fill-[#5BB318]/20 text-[#5BB318]",
              )}
            />
            <span>{likes}</span>
          </button>

          <button
            type="button"
            onClick={onReply}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-colors"
          >
            <Reply className="size-3.5" />
            <span>{t("reply")}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
