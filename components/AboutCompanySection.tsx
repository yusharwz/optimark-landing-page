"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Building2, Mail, MessageCircle, Package } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SITE, SOCIAL_LINKS, WHATSAPP_URL } from "@/config/site";

/**
 * Company identity and the ways to reach a person.
 *
 * Deliberately no office address: the one in the legal documents is still a
 * placeholder ("alamat perusahaan - menyusul"), and a wrong address on an
 * About page is worse than no address. Add it here once it is confirmed.
 */
export function AboutCompanySection() {
  const t = useTranslations("about.company");

  return (
    <section className="relative border-t border-gray-200/80 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal y={30} duration={0.7}>
            <span className="text-detail text-xs font-semibold uppercase tracking-[0.12em]">
              {t("badge")}
            </span>
            <h2 className="text-display mt-4 text-2xl sm:text-3xl lg:text-4xl">{t("title")}</h2>
            <p className="text-lead mt-5 text-base lg:text-lg">{t("description")}</p>

            <div className="mt-8 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200/80 bg-white transition-colors duration-200 hover:border-[#94C748] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2"
                >
                  <Image
                    src={social.icon}
                    alt=""
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px] object-contain opacity-90"
                  />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal y={30} duration={0.7} delay={0.1}>
            <dl className="divide-y divide-gray-200/80 overflow-hidden rounded-3xl border border-gray-200/80 bg-white">
              <Row icon={Building2} label={t("legalEntityLabel")} value={t("legalEntityValue")} />
              <Row icon={Package} label={t("productLabel")} value={t("productValue")} />
              <Row
                icon={Mail}
                label={t("emailLabel")}
                value={SITE.contactEmail}
                href={`mailto:${SITE.contactEmail}`}
              />
              <Row
                icon={MessageCircle}
                label={t("whatsappLabel")}
                value={t("whatsappValue")}
                href={WHATSAPP_URL}
                external
              />
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

type RowProps = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

function Row({ icon: Icon, label, value, href, external }: RowProps) {
  const body = (
    <>
      <dt className="text-detail flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.1em]">
        <Icon className="h-4 w-4 text-[#94C748]" strokeWidth={1.75} />
        {label}
      </dt>
      <dd className="text-display mt-2 text-sm sm:text-base">{value}</dd>
    </>
  );

  if (!href) {
    return <div className="p-6">{body}</div>;
  }

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="block p-6 transition-colors duration-200 hover:bg-[#F8FDF1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#94C748]"
    >
      {body}
    </a>
  );
}
