import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import type { AppLocale } from "@/lib/locale";
import { GET_STARTED_URL, SITE, SITE_URL, SOCIAL_LINKS } from "@/config/site";

/** Absolute URL of `path` (no locale prefix) in `locale`. */
export function localizedUrl(locale: AppLocale, path: string): string {
  if (
    path === "/perencana-konten" ||
    path === "/content-planner" ||
    path === "/features/perencana-konten" ||
    path === "/features/content-planner"
  ) {
    return locale === "en" ? `${SITE_URL}/en/content-planner` : `${SITE_URL}/perencana-konten`;
  }
  const cleanPath = path.startsWith("/features/") ? path.replace("/features/", "/") : path;
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const suffix = cleanPath === "/" ? "" : cleanPath;
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
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name,
    url: localizedUrl(locale, "/"),
    inLanguage: locale,
    publisher: { "@id": ORGANIZATION_ID },
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
