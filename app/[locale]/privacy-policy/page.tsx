import type { Metadata } from "next";
import { PrivacyPolicyView } from "@/components/PrivacyPolicyView";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/lib/locale";
import { buildOgImageUrl } from "@/lib/og";
import {
  breadcrumbJsonLd,
  defaultRobots,
  localeAlternates,
  localizedUrl,
  webPageJsonLd,
} from "@/lib/seo";
import { getSeoKeywords } from "@/config/seo";
import { JsonLd } from "@/components/JsonLd";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "privacyMetadata" });

  const ogImage = buildOgImageUrl({
    title: t("title"),
    description: t("description"),
    locale,
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: getSeoKeywords("privacy-policy", locale),
    robots: defaultRobots(true),
    alternates: localeAlternates(locale, "/privacy-policy"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: localizedUrl(locale, "/privacy-policy"),
      images: [
        {
          url: ogImage,
          secureUrl: ogImage,
          width: 1200,
          height: 630,
          alt: t("title"),
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [ogImage],
    },
  };
}

export default async function PrivacyPolicy({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "privacyMetadata" });
  const tHeader = await getTranslations({ locale, namespace: "header" });
  const url = localizedUrl(locale, "/privacy-policy");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: tHeader("nav.home"), url: localizedUrl(locale, "/") },
          { name: t("title"), url },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          name: t("title"),
          description: t("description"),
          url,
          locale,
        })}
      />
      <PrivacyPolicyView />
    </>
  );
}
