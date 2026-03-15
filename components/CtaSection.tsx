"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function CtaSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20 lg:py-28"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-[#1E280E] sm:text-4xl">
          Siap mengembangkan bisnis digital Anda?
        </h2>
        <p className="mt-4 text-lg text-[#535862]">
          Mulai gratis hari ini. Tidak perlu kartu kredit.
        </p>
        <motion.a
          href="#"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "mt-8 inline-flex h-14 items-center justify-center rounded-lg px-10 text-base font-semibold",
            "bg-[#5925DC] text-white shadow-lg shadow-[#5925DC]/25",
            "transition-colors hover:bg-[#4c1fc4]"
          )}
        >
          Coba Sekarang
        </motion.a>
      </div>
    </motion.section>
  );
}
