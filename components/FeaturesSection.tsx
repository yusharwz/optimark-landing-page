"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  BarChart3,
  Megaphone,
  Sparkles,
} from "lucide-react";
import { FeatureCard } from "@/components/base/feature-card";

const features = [
  {
    id: "perencana",
    title: "Perencana Konten",
    description:
      "Membantu menjadwalkan dan mengelola postingan konten secara otomatis di berbagai platform media sosial.",
    icon: Calendar,
    badge: "Available Now",
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
  return (
    <section className="bg-[#F5F5F5] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-semibold text-[#1E280E] sm:text-4xl">
            Semua kebutuhan bisnis Anda ada disini
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#535862]">
            Kami menyediakan berbagai fitur unggulan untuk membantu strategi pemasaran digital
            menjadi lebih efektif dan efisien.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                badge={feature.badge}
                comingSoon={feature.comingSoon}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
