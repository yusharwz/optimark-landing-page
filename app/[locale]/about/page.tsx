import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/lib/locale";
import { buildOgImageUrl } from "@/lib/og";
import { breadcrumbJsonLd, localeAlternates, localizedUrl, webPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import {
  AboutClosing,
  AboutHero,
  AboutHowItHelps,
  AboutUkiCommitment,
  AboutVisionMission,
  AboutWhatWeDo,
  AboutWhoWeAre,
} from "@/components/AboutSections";
import { Footer } from "@/components/Footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "aboutMetadata" });

  const ogImage = buildOgImageUrl({
    title: t("title"),
    description: t("description"),
    locale,
  });

  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates(locale, "/about"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
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

/** Section order follows the approved About Us handoff (1–9). */
export default async function AboutPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "aboutMetadata" });
  const tCrumb = await getTranslations({ locale, namespace: "header" });
  const url = localizedUrl(locale, "/about");

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: tCrumb("nav.home"), url: localizedUrl(locale, "/") },
          { name: tCrumb("nav.about"), url },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          type: "AboutPage",
          name: t("title"),
          description: t("description"),
          url,
          locale,
        })}
      />
      <Header />
      <main className="relative pt-24">
        <AboutHero />
        <AboutWhoWeAre />
        <AboutVisionMission />
        <AboutWhatWeDo />
        <AboutHowItHelps />
        <AboutUkiCommitment />
        <AboutClosing />
      </main>
      <Footer />
    </div>
  );
}
