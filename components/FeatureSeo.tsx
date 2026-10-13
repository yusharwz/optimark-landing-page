import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { type AnyFeatureId, featureHref } from "@/config/features";
import { getSeoData, type SeoPageKey } from "@/config/seo";
import type { AppLocale } from "@/lib/locale";
import { buildOgImageUrl } from "@/lib/og";
import {
  SOFTWARE_ID,
  breadcrumbJsonLd,
  defaultRobots,
  localeAlternates,
  localizedUrl,
  webPageJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

const FEATURE_SEO_KEYS: Record<AnyFeatureId, SeoPageKey> = {
  ai: "ai-content-maker",
  perencana: "perencana-konten",
  seo: "seo-analyzer",
  aiImage: "ai-image",
  aiVideo: "ai-video",
};

/**
 * Metadata and JSON-LD for the `/features/*` pages. The pages themselves are
 * client components and cannot export metadata, so each feature route has a
 * thin server layout that calls these two.
 */
export async function featureMetadata(id: AnyFeatureId, locale: AppLocale): Promise<Metadata> {
  const seoKey = FEATURE_SEO_KEYS[id];
  const seo = getSeoData(seoKey, locale);
  const title = seo.metaTitle;
  const description = seo.metaDescription;
  const keywords = seo.keywords;
  const ogImage = buildOgImageUrl({ title, description, locale });

  const canonicalUrl = localizedUrl(locale, featureHref(id, locale));

  return {
    title,
    description,
    keywords,
    robots: defaultRobots(true),
    alternates: localeAlternates(locale, featureHref(id, locale)),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: ogImage,
          secureUrl: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export async function FeatureJsonLd({ id, locale }: { id: AnyFeatureId; locale: AppLocale }) {
  const seoKey = FEATURE_SEO_KEYS[id];
  const seo = getSeoData(seoKey, locale);
  const tHeader = await getTranslations({ locale, namespace: "header" });
  const url = localizedUrl(locale, featureHref(id, locale));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: tHeader("nav.home"), url: localizedUrl(locale, "/") },
          { name: seo.metaTitle, url },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          name: seo.metaTitle,
          description: seo.metaDescription,
          url,
          locale,
          about: { "@id": SOFTWARE_ID },
        })}
      />
    </>
  );
}
