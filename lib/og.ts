import { SITE_URL } from "@/config/site";

/**
 * Canonical origin for absolute URLs.
 *
 * This used to walk `NEXT_PUBLIC_SITE_URL` → Vercel env vars → localhost. The
 * Vercel branches were dead (this deploys to Docker), and the localhost
 * fallback was actively harmful: .env is excluded from the image, so the
 * container build never saw the variable and silently baked
 * `http://localhost:3000` into every prerendered page.
 */
export function getBaseUrl(): string {
  return SITE_URL;
}

export function buildOgImageUrl({
  title,
  description,
  locale,
}: {
  title: string;
  description?: string;
  locale: string;
}): string {
  const url = new URL("/api/og", getBaseUrl());
  url.searchParams.set("title", title);
  // Keep the image URL short; WhatsApp/Facebook crawlers can be sensitive to very long URLs.
  if (description) {
    url.searchParams.set("description", description.slice(0, 160));
  }
  url.searchParams.set("locale", locale);
  return url.toString();
}
