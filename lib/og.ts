import { getSiteUrl } from "@/config/site";

/**
 * Canonical origin for absolute URLs.
 */
export function getBaseUrl(): string {
  return getSiteUrl();
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
