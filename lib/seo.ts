import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import type { AppLocale } from "@/lib/locale";
import { SITE, SITE_URL, SOCIAL_LINKS } from "@/config/site";

/** Absolute URL of `path` (no locale prefix) in `locale`. */
export function localizedUrl(locale: AppLocale, path: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const suffix = path === "/" ? "" : path;
  return `${SITE_URL}${prefix}${suffix}`;
}

/**
 * Self-referencing canonical plus hreflang for every locale, with
 * `x-default` pointing at the Indonesian (default) URL.
 */
export function localeAlternates(locale: AppLocale, path: string): Metadata["alternates"] {
  return {
    canonical: localizedUrl(locale, path),
    languages: {
      ...Object.fromEntries(routing.locales.map((loc) => [loc, localizedUrl(loc, path)])),
      "x-default": localizedUrl(routing.defaultLocale, path),
    },
  };
}

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function organizationJsonLd() {
  const sameAs = SOCIAL_LINKS.map((link) => link.href).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE.brandName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/avatar-optimark.png`,
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function collectionPageJsonLd({
  name,
  description,
  url,
  locale,
  items,
}: {
  name: string;
  description: string;
  url: string;
  locale: AppLocale;
  items: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    inLanguage: locale,
    publisher: { "@id": ORGANIZATION_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

/** Serialises JSON-LD for a <script> tag; `<` is escaped so copy can never close it early. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function profilePageJsonLd({
  url,
  name,
  jobTitle,
  description,
  image,
  knowsAbout,
  sameAs,
}: {
  url: string;
  name: string;
  jobTitle: string;
  description: string;
  image?: string;
  knowsAbout: string[];
  sameAs?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url,
    mainEntity: {
      "@type": "Person",
      name,
      jobTitle,
      description,
      url,
      ...(image && { image: `${SITE_URL}${image}` }),
      knowsAbout,
      worksFor: { "@id": ORGANIZATION_ID },
      ...(sameAs && { sameAs: [sameAs] }),
    },
  };
}

/** Bios can hold several paragraphs; meta and schema descriptions use the first. */
export function firstParagraph(text: string): string {
  return text.split("\n\n")[0];
}
