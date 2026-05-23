"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  Calendar,
  BarChart3,
  Megaphone,
  Sparkles,
  LucideIcon,
} from "lucide-react";
import { FeatureCard } from "@/components/base/feature-card";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  featureCardHover,
} from "@/lib/animations";
import { useRef } from "react";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  comingSoon?: boolean;
  coverImage?: string;
}

const features: Feature[] = [
  {
    id: "perencana",
    title: "Perencana Konten",
    description:
      "Membantu menjadwalkan dan mengelola postingan konten secara otomatis di berbagai platform media sosial.",
    icon: Calendar,
    badge: "Available Now",
    coverImage: "/images/features-perencanaan-konten.svg",
  },
  {
    id: "seo",
    title: "SEO Analyzer",
    description:
      "Analisis kata kunci dan optimasi konten dengan teknologi analisis kata kunci terbaru.",
    icon: BarChart3,
    comingSoon: true,
  },
  {
    id: "ads",
    title: "Ads Manager",
    description:
      "Kelola dan optimalkan kampanye iklan untuk meningkatkan traffic dan konversi secara signifikan.",
    icon: Megaphone,
    comingSoon: true,
  },
  {
    id: "ai",
    title: "AI Content Maker",
    description: "Buat konten berkualitas dengan bantuan AI untuk hasil yang relevan.",
    icon: Sparkles,
    comingSoon: true,
  },
];

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative overflow-hidden px-6 py-16 sm:px-12 lg:px-24 lg:py-24" style={{ background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 49%, rgba(242, 248, 231, 1) 100%)' }}>
      <motion.div style={{ y, opacity }} className="mx-auto flex max-w-7xl flex-col gap-16 relative z-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-[#1E280E] sm:text-5xl lg:text-[3.5rem]"
          >
            Otomatisasikan Pertumbuhan Bisnis Anda dengan Teknologi AI
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-lg text-[#535862]"
          >
            Optimark menyatukan empat modul kecerdasan buatan (AI) untuk membantu Anda merancang, mengoptimalkan, dan menjadwalkan seluruh aktivitas pemasaran digital secara otomatis.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 sm:grid-cols-2 lg:gap-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={staggerItem}
              whileHover="hover"
              className="h-full"
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                badge={feature.badge}
                comingSoon={feature.comingSoon}
                coverImage={feature.coverImage}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
