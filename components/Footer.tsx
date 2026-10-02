"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SITE, SOCIAL_LINKS } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { ALL_FEATURE_IDS, featureHref } from "@/config/features";

const FOOTER_GRADIENT = "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(242,248,231,1) 100%)";

export function Footer() {
  const t = useTranslations("footer");
  const tf = useTranslations("features");

  return (
    <footer
      className="relative overflow-hidden border-t border-[#E9EAEB]"
      style={{ background: FOOTER_GRADIENT }}
    >
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
                alt={SITE.brandName}
                width={36}
                height={36}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-lg font-semibold tracking-tight text-[#1E280E]">
                {SITE.brandName}
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#535862]">{t("tagline")}</p>

            {SOCIAL_LINKS.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-[#717680]">{t("followUs")}</span>
                  <div className="flex items-center gap-2">
                    {SOCIAL_LINKS.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        whileHover={{ y: -2 }}
                        className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#E9EAEB] bg-white/70 shadow-[0_1px_0_rgba(16,24,40,0.02)] transition-all hover:border-[#94C748] hover:bg-white hover:shadow-sm"
                      >
                        <Image
                          src={social.icon}
                          alt={social.name}
                          width={18}
                          height={18}
                          className="h-[18px] w-[18px] object-contain opacity-90 transition-opacity group-hover:opacity-100"
                        />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <h3 className="text-sm font-semibold tracking-wide text-[#1E280E]">
                {t("features")}
              </h3>
              <ul className="mt-4 space-y-3">
                {/*
                  One column for every feature page. It replaces the old
                  Produk + Platform pair, which listed the same three
                  features twice under two different names.
                */}
                {ALL_FEATURE_IDS.map((id) => (
                  <li key={id}>
                    <Link
                      href={featureHref(id)}
                      className="text-sm text-[#535862] transition-colors hover:text-[#1E280E]"
                    >
                      {tf(`items.${id}.title`)}
                    </Link>
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
                {t("resources")}
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="/pricing"
                    className="text-sm text-[#535862] transition-colors hover:text-[#1E280E]"
                  >
                    {t("links.pricing")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-sm text-[#535862] transition-colors hover:text-[#1E280E]"
                  >
                    {t("links.faq")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-[#535862] transition-colors hover:text-[#1E280E]"
                  >
                    {t("links.blog")}
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h3 className="text-sm font-semibold tracking-wide text-[#1E280E]">{t("company")}</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-[#535862] transition-colors hover:text-[#1E280E]"
                  >
                    {t("links.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-[#535862] transition-colors hover:text-[#1E280E]"
                  >
                    {t("links.privacy")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-sm text-[#535862] transition-colors hover:text-[#1E280E]"
                  >
                    {t("links.terms")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-[#535862] transition-colors hover:text-[#1E280E]"
                  >
                    {t("links.contact")}
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-linear-to-r from-transparent via-[#E9EAEB] to-transparent lg:mt-16" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
          <p className="text-[#717680]">{t("copyright", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}
