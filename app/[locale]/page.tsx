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
import { SCROLL_UP_THRESHOLD } from "@/config/site";
import { resolveLocale } from "@/lib/locale";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale: localeParam } = await params;
  setRequestLocale(resolveLocale(localeParam));

  return (
    <div className="min-h-screen bg-white">
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
