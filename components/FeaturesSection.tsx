"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  BarChart3,
  Megaphone,
  Sparkles,
  Send,
  Archive,
  CalendarDays,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    id: "perencana",
    title: "Perencana Konten",
    description:
      "Membantu menjadwalkan dan mengelola postingan konten secara otomatis di berbagai platform media sosial.",
    icon: Calendar,
    comingSoon: false,
    actions: [
      { icon: Star, label: "Buat Postingan" },
      { icon: Send, label: "Posting Sekarang" },
      { icon: Archive, label: "Simpan Draft" },
      { icon: CalendarDays, label: "Jadwalkan Postingan" },
    ],
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
    description:
      "Buat konten berkualitas dengan bantuan AI untuk hasil yang relevan.",
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
            Kami menyediakan berbagai fitur unggulan untuk membantu strategi
            pemasaran digital menjadi lebih efektif dan efisien.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.article
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex flex-col overflow-hidden rounded-3xl border border-[#E9EAEB] bg-white shadow-sm",
                "transition-shadow hover:shadow-md"
              )}
            >
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5925DC]/10 shadow-sm">
                  <feature.icon className="h-6 w-6 text-[#5925DC]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1E280E]">
                  {feature.title}
                </h3>
                <p className="mt-2 flex-1 text-base text-[#535862]">
                  {feature.description}
                </p>

                {feature.comingSoon && (
                  <span className="mt-4 inline-flex w-fit items-center rounded-full bg-[#E9EAEB] px-3 py-1 text-xs font-medium text-[#535862]">
                    Coming soon
                  </span>
                )}

                {!feature.comingSoon && feature.actions && (
                  <div className="mt-6 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {feature.actions.map((action) => (
                        <div
                          key={action.label}
                          className="flex items-center gap-2 rounded-lg border border-[#E9EAEB] bg-[#FAFAFA] px-3 py-2 text-xs font-medium text-[#1E280E]"
                        >
                          <action.icon className="h-3.5 w-3.5 text-[#535862]" />
                          {action.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
