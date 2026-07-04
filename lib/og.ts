export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
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
  if (description) url.searchParams.set("description", description);
  url.searchParams.set("locale", locale);
  return url.toString();
}
