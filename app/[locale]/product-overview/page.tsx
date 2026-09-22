import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/lib/locale";
import { buildOgImageUrl } from "@/lib/og";
import { Header } from "@/components/Header";
import { ProductOverviewHeroSection } from "@/components/ProductOverviewHeroSection";
import { ProductModulesSection } from "@/components/ProductModulesSection";
import { ProductWorkflowSection } from "@/components/ProductWorkflowSection";
import { ProductAudienceSection } from "@/components/ProductAudienceSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

/**
 * Parked draft. This page was briefly the contents of `/blog` before that route
 * went back to being an actual blog; it lives here so the work is not lost
 * while its fate is decided.
 *
 * Kept out of the nav and the sitemap and marked noindex on purpose. Either
 * promote it to a real route or delete it together with the `productOverview`
 * message namespace and the four `Product*Section` components.
 */

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "productOverviewMetadata" });

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

export default async function ProductOverviewPage({ params }: Props) {
  const { locale: localeParam } = await params;
  setRequestLocale(resolveLocale(localeParam));

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="relative pt-24">
        <ProductOverviewHeroSection />
        <ProductModulesSection />
        <ProductWorkflowSection />
        <ProductAudienceSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
