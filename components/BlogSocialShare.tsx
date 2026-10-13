"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Check, Facebook, Linkedin, Mail, Link2 } from "lucide-react";
import { cx } from "@/utils/cx";

export interface BlogSocialShareProps {
  url: string;
  title: string;
  className?: string;
  variant?: "default" | "compact" | "sidebar" | "vertical-dock";
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2";

const buttonBase =
  "relative flex items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2";

const normalButton =
  "border-[#E9EAEB] bg-white text-[#535862] hover:border-[#94C748] hover:bg-[#F8FDF1] hover:text-[#59772B] hover:shadow-xs";

const copiedButton = "border-[#94C748] bg-[#EAF4DA] text-[#59772B] shadow-xs";

/**
 * Resolves a public canonical URL for third-party scrapers (Facebook, LinkedIn).
 * When running in development (localhost / 127.0.0.1), maps the current path to
 * the production domain https://optimark.ai so scrapers can read Open Graph tags.
 */
function resolveCanonicalShareUrl(propUrl: string): string {
  if (propUrl && propUrl.startsWith("https://optimark.ai")) {
    return propUrl;
  }
  if (typeof window !== "undefined") {
    const { hostname, pathname } = window.location;
    if (hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".local")) {
      return `https://optimark.ai${pathname}`;
    }
    return window.location.href;
  }
  return propUrl || "https://optimark.ai";
}

async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}

export function BlogSocialShare({
  url,
  title,
  className,
  variant = "default",
}: BlogSocialShareProps) {
  const t = useTranslations("blog.post.share");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const shareUrls = useMemo(() => {
    const publicUrl = resolveCanonicalShareUrl(url);
    const encodedUrl = encodeURIComponent(publicUrl);
    const encodedTitle = encodeURIComponent(title);
    const mailBody = encodeURIComponent(`${title}\n\n${publicUrl}`);

    const isMobile =
      typeof navigator !== "undefined" &&
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    return {
      publicUrl,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}&title=${encodedTitle}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(`${title}\n\n${publicUrl}`)}`,
      email: isMobile
        ? `mailto:?subject=${encodedTitle}&body=${mailBody}`
        : `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodedTitle}&body=${mailBody}`,
    };
  }, [url, title]);

  const handleCopyLink = async () => {
    const targetUrl =
      typeof window !== "undefined" && window.location.href
        ? window.location.href
        : shareUrls.publicUrl;
    const ok = await copyTextToClipboard(targetUrl);
    if (ok) {
      showToast(t("copied"));
    }
  };

  const handleFacebookClick = () => {
    copyTextToClipboard(title);
    showToast(t("titleCopied"));
  };

  const handleLinkedInClick = () => {
    copyTextToClipboard(title);
    showToast(t("titleCopied"));
  };

  // 1. Vertical floating dock matching Image 3 design
  if (variant === "vertical-dock") {
    return (
      <div
        role="complementary"
        aria-label={t("title")}
        className={cx(
          "relative flex flex-col items-center rounded-3xl border border-[#E9EAEB] bg-white p-3 shadow-[0_10px_25px_rgba(0,0,0,0.06)] transition-all",
          className,
        )}
      >
        <span className="pb-2 text-xs font-bold tracking-tight text-[#111827]">Share</span>
        <div className="flex flex-col items-center gap-2.5">
          {/* Facebook */}
          <a
            href={shareUrls.facebook}
            onClick={handleFacebookClick}
            target="_blank"
            rel="noopener noreferrer"
            title={t("facebook")}
            aria-label={t("facebook")}
            className={cx(
              "flex size-10.5 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#F2F4F7] transition-all hover:scale-108 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-95",
              focusRing,
            )}
          >
            <div className="flex size-7.5 items-center justify-center rounded-full bg-[#1877F2] text-white">
              <Facebook className="size-4 fill-white text-white" aria-hidden="true" />
            </div>
          </a>

          {/* X / Twitter */}
          <a
            href={shareUrls.twitter}
            target="_blank"
            rel="noopener noreferrer"
            title={t("twitter")}
            aria-label={t("twitter")}
            className={cx(
              "flex size-10.5 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#F2F4F7] text-[#111827] transition-all hover:scale-108 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-95",
              focusRing,
            )}
          >
            <XIcon className="size-4" />
          </a>

          {/* LinkedIn */}
          <a
            href={shareUrls.linkedin}
            onClick={handleLinkedInClick}
            target="_blank"
            rel="noopener noreferrer"
            title={t("linkedin")}
            aria-label={t("linkedin")}
            className={cx(
              "flex size-10.5 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#F2F4F7] text-[#0A66C2] transition-all hover:scale-108 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-95",
              focusRing,
            )}
          >
            <Linkedin className="size-4 fill-[#0A66C2]" aria-hidden="true" />
          </a>

          {/* Email */}
          <a
            href={shareUrls.email}
            target="_blank"
            rel="noopener noreferrer"
            title={t("email")}
            aria-label={t("email")}
            className={cx(
              "flex size-10.5 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#F2F4F7] text-[#374151] transition-all hover:scale-108 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-95",
              focusRing,
            )}
          >
            <Mail className="size-4" aria-hidden="true" />
          </a>

          {/* Copy Link */}
          <div>
            <button
              type="button"
              onClick={handleCopyLink}
              title={toastMessage === t("copied") ? t("copied") : t("copy")}
              aria-label={toastMessage === t("copied") ? t("copied") : t("copy")}
              className={cx(
                "flex size-10.5 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#F2F4F7] transition-all hover:scale-108 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-95",
                toastMessage === t("copied") ? "text-[#5BB318] bg-[#F2F9ED]" : "text-[#5BB318]",
                focusRing,
              )}
            >
              {toastMessage === t("copied") ? (
                <Check className="size-4 text-[#5BB318] animate-in zoom-in-75" aria-hidden="true" />
              ) : (
                <Link2 className="size-4.5 rotate-[-45deg]" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Feedback notification toast popup */}
        {toastMessage && (
          <div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#1E280E] px-3 py-1.5 text-xs font-semibold text-white shadow-xl animate-in fade-in zoom-in-95">
            {toastMessage}
          </div>
        )}
      </div>
    );
  }

  // 2. Compact row variant (beside author on top)
  if (variant === "compact") {
    return (
      <div className={cx("relative flex items-center gap-1.5", className)}>
        <span className="text-xs font-medium text-[#717680]">{t("title")}:</span>
        <div className="flex items-center gap-1">
          <a
            href={shareUrls.facebook}
            onClick={handleFacebookClick}
            target="_blank"
            rel="noopener noreferrer"
            title={t("facebook")}
            aria-label={t("facebook")}
            className={cx(buttonBase, normalButton, "size-8")}
          >
            <Facebook className="size-3.5" aria-hidden="true" />
          </a>
          <a
            href={shareUrls.twitter}
            target="_blank"
            rel="noopener noreferrer"
            title={t("twitter")}
            aria-label={t("twitter")}
            className={cx(buttonBase, normalButton, "size-8")}
          >
            <XIcon className="size-3.5" />
          </a>
          <a
            href={shareUrls.linkedin}
            onClick={handleLinkedInClick}
            target="_blank"
            rel="noopener noreferrer"
            title={t("linkedin")}
            aria-label={t("linkedin")}
            className={cx(buttonBase, normalButton, "size-8")}
          >
            <Linkedin className="size-3.5" aria-hidden="true" />
          </a>
          <a
            href={shareUrls.email}
            target="_blank"
            rel="noopener noreferrer"
            title={t("email")}
            aria-label={t("email")}
            className={cx(buttonBase, normalButton, "size-8")}
          >
            <Mail className="size-3.5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={handleCopyLink}
            title={toastMessage === t("copied") ? t("copied") : t("copy")}
            aria-label={toastMessage === t("copied") ? t("copied") : t("copy")}
            className={cx(
              buttonBase,
              toastMessage === t("copied") ? copiedButton : normalButton,
              "size-8",
            )}
          >
            {toastMessage === t("copied") ? (
              <Check className="size-3.5 animate-in zoom-in-50" aria-hidden="true" />
            ) : (
              <Link2 className="size-3.5" aria-hidden="true" />
            )}
          </button>
        </div>

        {toastMessage && (
          <span className="pointer-events-none absolute -bottom-8 right-0 whitespace-nowrap rounded-md bg-[#1E280E] px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg animate-in fade-in slide-in-from-top-1">
            {toastMessage}
          </span>
        )}
      </div>
    );
  }

  // 3. Sidebar variant
  if (variant === "sidebar") {
    return (
      <aside aria-label={t("title")} className={cx("relative flex flex-col gap-2 pt-4", className)}>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#717680]">
          {t("title")}
        </p>
        <div className="flex flex-col gap-1.5">
          <a
            href={shareUrls.facebook}
            onClick={handleFacebookClick}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("facebook")}
            className={cx(
              buttonBase,
              normalButton,
              "group/btn h-9 w-full justify-start gap-2.5 rounded-xl px-3 text-xs font-medium",
            )}
          >
            <Facebook className="size-4 shrink-0" aria-hidden="true" />
            <span>Facebook</span>
          </a>
          <a
            href={shareUrls.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("twitter")}
            className={cx(
              buttonBase,
              normalButton,
              "group/btn h-9 w-full justify-start gap-2.5 rounded-xl px-3 text-xs font-medium",
            )}
          >
            <XIcon className="size-4 shrink-0" />
            <span>X</span>
          </a>
          <a
            href={shareUrls.linkedin}
            onClick={handleLinkedInClick}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("linkedin")}
            className={cx(
              buttonBase,
              normalButton,
              "group/btn h-9 w-full justify-start gap-2.5 rounded-xl px-3 text-xs font-medium",
            )}
          >
            <Linkedin className="size-4 shrink-0" aria-hidden="true" />
            <span>LinkedIn</span>
          </a>
          <a
            href={shareUrls.email}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("email")}
            className={cx(
              buttonBase,
              normalButton,
              "group/btn h-9 w-full justify-start gap-2.5 rounded-xl px-3 text-xs font-medium",
            )}
          >
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            <span>Email</span>
          </a>
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label={toastMessage === t("copied") ? t("copied") : t("copy")}
            className={cx(
              buttonBase,
              toastMessage === t("copied") ? copiedButton : normalButton,
              "group/btn h-9 w-full justify-start gap-2.5 rounded-xl px-3 text-xs font-medium",
            )}
          >
            {toastMessage === t("copied") ? (
              <>
                <Check className="size-4 shrink-0 text-[#59772B]" aria-hidden="true" />
                <span className="font-semibold text-[#59772B]">{t("copied")}</span>
              </>
            ) : (
              <>
                <Link2 className="size-4 shrink-0" aria-hidden="true" />
                <span>{t("copy")}</span>
              </>
            )}
          </button>
        </div>

        {toastMessage && (
          <div className="pointer-events-none mt-2 rounded-lg bg-[#1E280E] px-3 py-1.5 text-center text-xs font-semibold text-white shadow-md animate-in fade-in">
            {toastMessage}
          </div>
        )}
      </aside>
    );
  }

  // 4. Default row variant for end-of-article
  return (
    <div
      aria-label={t("title")}
      className={cx(
        "relative flex flex-col gap-3 rounded-2xl border border-[#E9EAEB] bg-[#FAFAFA] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold tracking-tight text-[#1E280E] sm:text-base">
          {t("title")}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <a
          href={shareUrls.facebook}
          onClick={handleFacebookClick}
          target="_blank"
          rel="noopener noreferrer"
          title={t("facebook")}
          aria-label={t("facebook")}
          className={cx(buttonBase, normalButton, "size-10 sm:size-10.5")}
        >
          <Facebook className="size-4 sm:size-4.5" aria-hidden="true" />
        </a>
        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          title={t("twitter")}
          aria-label={t("twitter")}
          className={cx(buttonBase, normalButton, "size-10 sm:size-10.5")}
        >
          <XIcon className="size-4 sm:size-4.5" />
        </a>
        <a
          href={shareUrls.linkedin}
          onClick={handleLinkedInClick}
          target="_blank"
          rel="noopener noreferrer"
          title={t("linkedin")}
          aria-label={t("linkedin")}
          className={cx(buttonBase, normalButton, "size-10 sm:size-10.5")}
        >
          <Linkedin className="size-4 sm:size-4.5" aria-hidden="true" />
        </a>
        <a
          href={shareUrls.email}
          target="_blank"
          rel="noopener noreferrer"
          title={t("email")}
          aria-label={t("email")}
          className={cx(buttonBase, normalButton, "size-10 sm:size-10.5")}
        >
          <Mail className="size-4 sm:size-4.5" aria-hidden="true" />
        </a>
        <button
          type="button"
          onClick={handleCopyLink}
          title={toastMessage === t("copied") ? t("copied") : t("copy")}
          aria-label={toastMessage === t("copied") ? t("copied") : t("copy")}
          className={cx(
            buttonBase,
            toastMessage === t("copied") ? copiedButton : normalButton,
            "h-10 px-3.5 sm:h-10.5 sm:px-4",
            "gap-2 text-xs font-semibold sm:text-sm",
          )}
        >
          {toastMessage === t("copied") ? (
            <>
              <Check className="size-4 text-[#59772B] animate-in zoom-in-50" aria-hidden="true" />
              <span>{t("copied")}</span>
            </>
          ) : (
            <>
              <Link2 className="size-4" aria-hidden="true" />
              <span>{t("copy")}</span>
            </>
          )}
        </button>
      </div>

      {toastMessage && (
        <div className="pointer-events-none absolute -top-10 right-4 whitespace-nowrap rounded-lg bg-[#1E280E] px-3 py-1.5 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-bottom-1">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
