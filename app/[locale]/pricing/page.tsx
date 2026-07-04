import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/lib/locale";
import { Header } from "@/components/Header";
import { PricingSection } from "@/components/PricingSection";
import { HeroFeaturesBackground } from "@/components/HeroFeaturesBackground";
import { Footer } from "@/components/Footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "pricingMetadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PricingPage({ params }: Props) {
  const { locale: localeParam } = await params;
  setRequestLocale(resolveLocale(localeParam));

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="relative pt-24">
        <HeroFeaturesBackground />
        <div className="relative z-10">
          {/* We keep showEstimator={false} as requested until business team provides update */}
          <PricingSection showEstimator={false} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

