import { Header } from "@/components/Header";
import { PricingSection } from "@/components/PricingSection";
import { HeroFeaturesBackground } from "@/components/HeroFeaturesBackground";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Pilihan Paket Harga - Optimark",
  description:
    "Pilih paket langganan Optimark yang sesuai untuk bisnis Anda. Dapatkan akses ke Perencana Konten AI, SEO Analyzer, Ads Manager, dan banyak lagi.",
};

export default function PricingPage() {
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
