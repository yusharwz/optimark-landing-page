import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HeroFeaturesBackground } from "@/components/HeroFeaturesBackground";
import { BentoFeaturesSection } from "@/components/BentoFeaturesSection";
// import { PricingSection } from "@/components/PricingSection"; // TEMP — restore setelah launch
import { ConnectSection } from "@/components/ConnectSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ImageShowcaseSection } from "@/components/ImageShowcaseSection";
import { VideoShowcaseSection } from "@/components/VideoShowcaseSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { ScrollUpButton } from "@/components/ScrollUpButton";
import { SCROLL_UP_THRESHOLD, SITE } from "@/config/site";
import { resolveLocale } from "@/lib/locale";
import { localeAlternates, softwareApplicationJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  return { alternates: localeAlternates(resolveLocale(localeParam), "/") };
}

export default async function Home({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "metadata" });

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={websiteJsonLd({ name: SITE.brandName, locale })} />
      <JsonLd
        data={softwareApplicationJsonLd({
          name: SITE.brandName,
          description: t("description"),
          locale,
        })}
      />
      <Header />
      <main>
        <div className="relative">
          <HeroFeaturesBackground />
          <HeroSection />
          <div id="features" className="relative z-20">
            <BentoFeaturesSection />
          </div>
        </div>
        <ConnectSection />
        <HowItWorksSection />
        <ImageShowcaseSection />
        <VideoShowcaseSection />
        <CtaSection />
      </main>
      <Footer />
      <ScrollUpButton threshold={SCROLL_UP_THRESHOLD} />
    </div>
  );
}
