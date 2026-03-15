"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  MessageCircle,
  Share2,
  Youtube,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const platforms = [
  { name: "Instagram", icon: MessageCircle, color: "text-[#E4405F]" },
  { name: "Facebook", icon: Share2, color: "text-[#1877F2]" },
  { name: "TikTok", icon: Youtube, color: "text-[#000000]" },
  { name: "Threads", icon: MessageSquare, color: "text-[#000000]" },
];

export function ConnectSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border-t border-[#E9EAEB] bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-[#1E280E] sm:text-4xl">
            Hubungkan ke berbagai akun
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#535862]">
            Kelola semua platform media sosial Anda dari satu dashboard.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          {platforms.map((platform) => (
            <motion.div
              key={platform.name}
              whileHover={{ scale: 1.05 }}
              className={cn(
                "flex h-20 w-20 items-center justify-center rounded-2xl",
                "border border-[#E9EAEB] bg-[#FAFAFA]",
                "transition-colors hover:border-[#D5D7DA] hover:bg-white"
              )}
            >
              <platform.icon
                className={cn("h-10 w-10", platform.color)}
                strokeWidth={1.5}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-3 rounded-xl border border-[#E9EAEB] bg-[#FAFAFA] px-6 py-4">
            <Image
              src="/images/avatar-optimark.png"
              alt="Optimark"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-[#1E280E]">optimark.ai</p>
              <p className="text-xs text-[#535862]">Terhubung</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-[#E9EAEB] bg-[#FAFAFA] px-6 py-4">
            <Image
              src="/images/logo-instagram.png"
              alt="Instagram"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-[#1E280E]">Instagram</p>
              <p className="text-xs text-[#535862]">Siap dihubungkan</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
