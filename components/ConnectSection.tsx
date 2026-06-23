"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CONNECT_PLATFORMS } from "@/config/site";

export function ConnectSection() {
  const t = useTranslations("connect");

  return (
    <section className="overflow-x-hidden border-b border-t border-[#E9EAEB] bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="flex shrink-0 items-center justify-center border-[#E9EAEB] py-6 lg:w-64 lg:border-x lg:py-8">
            <h2 className="text-center text-base font-bold text-[#1E280E] sm:text-lg lg:mx-8 lg:text-xl">
              {t("title")}
            </h2>
          </div>

          <div className="flex w-full flex-1 shrink-0 items-center lg:flex-nowrap">
            <div className="grid w-full grid-cols-4 gap-3 py-6 sm:gap-4 sm:py-8 lg:flex lg:flex-1 lg:grid-cols-none lg:gap-0 lg:py-0">
              {CONNECT_PLATFORMS.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className="flex min-w-0 items-center justify-center rounded-lg border border-[#E9EAEB] bg-zinc-50/80 p-3 sm:p-4 lg:min-w-0 lg:flex-1 lg:rounded-none lg:border-0 lg:border-r lg:border-[#E9EAEB] lg:bg-transparent lg:py-8"
                >
                  <Image
                    src={platform.icon}
                    alt={platform.name}
                    width={48}
                    height={48}
                    className="h-8 w-8 object-contain sm:h-10 sm:w-10 lg:h-12 lg:w-auto"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
