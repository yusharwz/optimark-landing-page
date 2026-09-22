import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/lib/locale";
import { buildOgImageUrl } from "@/lib/og";
import { Header } from "@/components/Header";
import {
  AboutV2Highlight,
  AboutV2Hero,
  AboutV2Legal,
  AboutV2Reasons,
  AboutV2Security,
  AboutV2VisionMission,
  AboutV2Who,
} from "@/components/AboutV2Sections";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

/**
 * A second, alternative About page for comparison while the direction is still
 * being decided. It is deliberately absent from the nav and the sitemap, and
 * marked noindex, so it does not compete with `/about` in search.
 *
 * Once a direction is picked, promote one of the two to `/about` and delete
 * the other along with its message namespace.
 */

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "aboutV2Metadata" });

  const ogImage = buildOgImageUrl({
    title: t("title"),
    description: t("description"),
    locale,
  });

  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: false },
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
  };
}

export default async function AboutV2Page({ params }: Props) {
  const { locale: localeParam } = await params;
  setRequestLocale(resolveLocale(localeParam));

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="relative pt-24">
        <AboutV2Hero />
        <AboutV2Who />
        <AboutV2VisionMission />
        <AboutV2Highlight />
        <AboutV2Reasons />
        <AboutV2Legal />
        <AboutV2Security />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
