import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/lib/locale";
import { buildOgImageUrl } from "@/lib/og";
import {
  SOFTWARE_ID,
  breadcrumbJsonLd,
  localeAlternates,
  localizedUrl,
  webPageJsonLd,
} from "@/lib/seo";
import { getSeoKeywords } from "@/config/seo";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
// import { PricingSection } from "@/components/PricingSection"; // TEMP — restore setelah launch
import { PricingFreeTrial } from "@/components/PricingFreeTrial";
import { Footer } from "@/components/Footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  // const t = await getTranslations({ locale, namespace: "pricingMetadata" }); // TEMP — restore setelah launch
  const t = await getTranslations({ locale, namespace: "pricingTrialMetadata" });

  const ogImage = buildOgImageUrl({
    title: t("title"),
    description: t("description"),
    locale,
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: getSeoKeywords("pricing", locale),
    alternates: localeAlternates(locale, "/pricing"),
    openGraph: {
      title: t("title"),
      description: t("description"),
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

export default async function PricingPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "pricingTrialMetadata" });
  const tCrumb = await getTranslations({ locale, namespace: "header" });
  const url = localizedUrl(locale, "/pricing");

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: tCrumb("nav.home"), url: localizedUrl(locale, "/") },
          { name: tCrumb("nav.pricing"), url },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          type: "WebPage",
          name: t("title"),
          description: t("description"),
          url,
          locale,
          about: { "@id": SOFTWARE_ID },
        })}
      />
      <Header />
      <main className="relative pt-24">
        <div className="relative z-10">
          {/* TEMP — restore setelah launch: <PricingSection showEstimator={true} /> */}
          <PricingFreeTrial />
        </div>
      </main>
      <Footer />
    </div>
  );
}
