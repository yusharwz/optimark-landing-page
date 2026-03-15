import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ConnectSection } from "@/components/ConnectSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSection />
        <div id="features">
          <FeaturesSection />
        </div>
        <ConnectSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
