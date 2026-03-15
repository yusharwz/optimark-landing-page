"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const platforms = [
  { name: "Instagram", icon: "/images/connect/instagram.svg" },
  { name: "Facebook", icon: "/images/connect/facebook.svg" },
  { name: "TikTok", icon: "/images/connect/tiktok.svg" },
  { name: "Threads", icon: "/images/connect/threads.svg" },
  { name: "Blibli", icon: "/images/connect/blibli.svg" },
  { name: "Shopee", icon: "/images/connect/shopee.svg" },
  { name: "TikTok Shop", icon: "/images/connect/tiktokshop.svg" },
  { name: "Shopee", icon: "/images/connect/shopee.svg" },
];

export function ConnectSection() {
  return (
    <section className="border-t border-b border-[#E9EAEB] bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center">
          {/* Text Section */}
          <div className="flex shrink-0 items-center justify-center lg:w-64 border-x border-[#E9EAEB] py-8">
            <div className="w-full text-center">
              <h2 className="text-lg font-bold text-[#1E280E] lg:text-xl mx-8">
                Hubungkan ke berbagai akun
              </h2>
            </div>
          </div>

          {/* Platform Cards */}
          <div className="flex w-full flex-1 flex-wrap items-center lg:flex-nowrap">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-1 h-full items-center justify-center border-r border-[#E9EAEB]"
              >
                <div className="flex flex-col items-center gap-5 py-8">
                  <Image
                    src={platform.icon}
                    alt={platform.name}
                    width={48}
                    height={48}
                    className="h-12 w-auto"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
