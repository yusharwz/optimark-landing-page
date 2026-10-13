import type { Metadata } from "next";
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
import { Header } from "@/components/Header";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "contactMetadata" });

  const ogImage = buildOgImageUrl({
    title: t("title"),
    description: t("description"),
    locale,
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: getSeoKeywords("contact", locale),
    robots: defaultRobots(true),
    alternates: localeAlternates(locale, "/contact"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: localizedUrl(locale, "/contact"),
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

export default async function ContactPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contactMetadata" });
  const tCrumb = await getTranslations({ locale, namespace: "footer" });
  const tHeader = await getTranslations({ locale, namespace: "header" });
  const url = localizedUrl(locale, "/contact");

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: tHeader("nav.home"), url: localizedUrl(locale, "/") },
          { name: tCrumb("links.contact"), url },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          type: "ContactPage",
          name: t("title"),
          description: t("description"),
          url,
          locale,
        })}
      />
      <Header />
      <main className="relative pt-24">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
