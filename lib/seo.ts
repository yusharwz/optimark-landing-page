import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import type { AppLocale } from "@/lib/locale";
import { GET_STARTED_URL, SITE, SITE_URL, SOCIAL_LINKS } from "@/config/site";

/** Absolute URL of `path` (no locale prefix) in `locale`. */
export function localizedUrl(locale: AppLocale, path: string, origin: string = SITE_URL): string {
  if (
    path === "/perencana-konten" ||
    path === "/content-planner" ||
    path === "/features/perencana-konten" ||
    path === "/features/content-planner"
  ) {
    return locale === "en" ? `${origin}/en/content-planner` : `${origin}/perencana-konten`;
  }
  const cleanPath = path.startsWith("/features/") ? path.replace("/features/", "/") : path;
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const suffix = cleanPath === "/" ? "" : cleanPath;
  return `${origin}${prefix}${suffix}`;
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

/**
 * Dynamic robots configuration for optimal indexing and rich SERP snippets.
 */
export function defaultRobots(index: boolean = true): Metadata["robots"] {
  if (!index) {
    return {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    };
  }
  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };
}

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SOFTWARE_ID = `${SITE_URL}/#software`;

export function organizationJsonLd() {
  const sameAs = SOCIAL_LINKS.map((link) => link.href).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE.brandName,
    legalName: SITE.companyName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/avatar-optimark.png`,
    email: SITE.contactEmail,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SITE.contactEmail,
      availableLanguage: ["Indonesian", "English"],
    },
    ...(sameAs.length > 0 && { sameAs }),
  };
}

/** Site-level entity; only the home page emits it, as Google recommends. */
export function websiteJsonLd({ name, locale }: { name: string; locale: AppLocale }) {
  const homeUrl = localizedUrl(locale, "/");
  const blogUrl = localizedUrl(locale, "/blog");
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name,
    url: homeUrl,
    inLanguage: locale,
    publisher: { "@id": ORGANIZATION_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${blogUrl}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * The product itself. The offer is the free plan (config/pricing.ts) — the only
 * tier on sale today — so it stays true while paid pricing is parked.
 */
export function softwareApplicationJsonLd({
  name,
  description,
  locale,
}: {
  name: string;
  description: string;
  locale: AppLocale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_ID,
    name,
    description,
    url: localizedUrl(locale, "/"),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: locale,
    publisher: { "@id": ORGANIZATION_ID },
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "IDR",
      url: GET_STARTED_URL,
    },
  };
}

/** A plain page of the site; `type` narrows it (AboutPage, ContactPage, …). */
export function webPageJsonLd({
  type = "WebPage",
  name,
  description,
  url,
  locale,
  about,
}: {
  type?: "WebPage" | "AboutPage" | "ContactPage";
  name: string;
  description: string;
  url: string;
  locale: AppLocale;
  about?: { "@id": string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url,
    inLanguage: locale,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
    ...(about && { about }),
  };
}

export function faqPageJsonLd({
  url,
  locale,
  items,
}: {
  url: string;
  locale: AppLocale;
  items: { question: string; answer: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url,
    inLanguage: locale,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
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

/** BlogPosting / Article schema for blog posts */
export function blogPostingJsonLd({
  headline,
  description,
  url,
  locale,
  publishedAt,
  updatedAt,
  cover,
  author,
  keywords,
}: {
  headline: string;
  description: string;
  url: string;
  locale: AppLocale;
  publishedAt: string;
  updatedAt?: string | null;
  cover?: string;
  author: { name: string; url: string };
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    inLanguage: locale,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    url,
    mainEntityOfPage: url,
    ...(cover && { image: cover.startsWith("http") ? cover : `${SITE_URL}${cover}` }),
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(", ") }),
    author: {
      "@type": "Person",
      name: author.name,
      url: author.url,
    },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export const articleJsonLd = blogPostingJsonLd;
