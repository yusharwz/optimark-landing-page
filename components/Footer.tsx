"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const PRODUCT_STATUS = [
  { label: "Perencana Konten", status: "Coming Soon" },
  { label: "SEO Analyzer", status: "Coming Soon" },
  { label: "Ads Manager", status: "Coming Soon" },
  { label: "AI Content Maker", status: "Coming Soon" },
] as const;

const LINKS = {
  platform: [
    { label: "Fitur Unggulan", href: "/#features" },
    { label: "Mulai Sekarang", href: "/#cta" },
  ],
  company: [
    { label: "Kebijakan Privasi", href: "/privacy-policy" },
    { label: "Kontak", href: "mailto:admin@usahakreatif.co.id" },
  ],
} as const;

const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com", icon: "/images/connect/instagram.svg" },
  { name: "Facebook", href: "https://facebook.com", icon: "/images/connect/facebook.svg" },
  { name: "TikTok", href: "https://tiktok.com", icon: "/images/connect/tiktok.svg" },
] as const;

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-[#E9EAEB]"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(242,248,231,1) 100%)",
      }}
    >
      {/* Decorative swatch background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url('/images/hero-swatch.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "400px 400px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <Link href="/" className="group inline-flex items-center gap-3">
              <Image
                src="/images/optimark-logo.svg"
                alt="Optimark"
                width={36}
                height={36}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-lg font-semibold tracking-tight text-[#1E280E]">
                Optimark
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#535862]">
              Platform all-in-one digital marketing untuk bantu bisnis Anda berkembang.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#717680]">
                  Ikuti kami
                </span>
                <div className="flex items-center gap-2">
                  {SOCIALS.map((s) => (
                    <motion.a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      whileHover={{ y: -2 }}
                      className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#E9EAEB] bg-white/70 shadow-[0_1px_0_rgba(16,24,40,0.02)] transition-all hover:border-[#94C748] hover:bg-white hover:shadow-sm"
                    >
                      <Image
                        src={s.icon}
                        alt={s.name}
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px] object-contain opacity-90 transition-opacity group-hover:opacity-100"
                      />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <h3 className="text-sm font-semibold tracking-wide text-[#1E280E]">
                Produk
              </h3>
              <ul className="mt-4 space-y-3">
                {PRODUCT_STATUS.map((p) => (
                  <li
                    key={p.label}
                    className="flex items-center justify-between gap-3 text-sm text-[#535862]"
                  >
                    <span>{p.label}</span>
                    <span
                      className="shrink-0 rounded-full border border-[#E9EAEB] bg-white/60 px-1.5 py-0.5 text-[10px] font-medium text-[#717680]"
                    >
                      {p.status}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-sm font-semibold tracking-wide text-[#1E280E]">
                Platform
              </h3>
              <ul className="mt-4 space-y-3">
                {LINKS.platform.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[#535862] transition-colors hover:text-[#1E280E]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h3 className="text-sm font-semibold tracking-wide text-[#1E280E]">
                Perusahaan
              </h3>
              <ul className="mt-4 space-y-3">
                {LINKS.company.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-[#535862] transition-colors hover:text-[#1E280E]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px w-full bg-linear-to-r from-transparent via-[#E9EAEB] to-transparent lg:mt-16" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
          <p className="text-[#717680]">
            © {new Date().getFullYear()} OPTIMARK, PT Usaha Kreatif Indonesia.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
