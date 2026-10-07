import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { type AnyFeatureId, featureHref } from "@/config/features";
import type { AppLocale } from "@/lib/locale";
import { buildOgImageUrl } from "@/lib/og";
import {
  SOFTWARE_ID,
  breadcrumbJsonLd,
  localeAlternates,
  localizedUrl,
  webPageJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

/**
 * Metadata and JSON-LD for the `/features/*` pages. The pages themselves are
 * client components and cannot export metadata, so each feature route has a
 * thin server layout that calls these two.
 */
export async function featureMetadata(id: AnyFeatureId, locale: AppLocale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "features.items" });
  const title = `${t(`${id}.title`)} - OPTIMARK`;
  const description = t(`${id}.description`);
  const ogImage = buildOgImageUrl({ title, description, locale });

  return {
    title,
    description,
    alternates: localeAlternates(locale, featureHref(id)),
    openGraph: {
      title,
      description,
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
  const t = await getTranslations({ locale, namespace: "features.items" });
  const tHeader = await getTranslations({ locale, namespace: "header" });
  const url = localizedUrl(locale, featureHref(id));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: tHeader("nav.home"), url: localizedUrl(locale, "/") },
          { name: t(`${id}.title`), url },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          name: t(`${id}.title`),
          description: t(`${id}.description`),
          url,
          locale,
          about: { "@id": SOFTWARE_ID },
        })}
      />
    </>
  );
}
