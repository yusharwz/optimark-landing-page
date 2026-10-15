"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageCircle,
  Send,
  Share2,
} from "lucide-react";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { NativeSelect } from "@/components/base/select/select-native";
import { TextArea } from "@/components/base/textarea/textarea";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { ALL_FEATURE_IDS, type AnyFeatureId } from "@/config/features";
import { SITE, SOCIAL_LINKS, WHATSAPP_URL } from "@/config/site";
import { heroBadge, heroDescription, heroTitle } from "@/lib/animations";

const ROLE_IDS = ["owner", "marketing", "agency", "creator", "other"] as const;
const TEAM_SIZE_IDS = ["solo", "small", "medium", "large", "xlarge"] as const;

type RoleId = (typeof ROLE_IDS)[number];
type TeamSizeId = (typeof TEAM_SIZE_IDS)[number];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * "Hubungi Kami" page body, structured after talenta.co/hubungi-kami: a
 * qualifying form up top, then a `#support-cta` block of direct channels.
 *
 * Where the reference books a meeting, this form carries a free-text question
 * and sends it to support instead.
 *
 * There is no backend to receive submissions yet, so "Send to Support" hands
 * the composed message to the visitor's email app, addressed to the support
 * inbox. When a real destination exists (API route, CRM, ticketing), replace
 * the body of `submit` — the form, validation, and success state stay as-is.
 */
export function ContactSection() {
  const t = useTranslations("contact");
  const tf = useTranslations("contact.form");
  const ts = useTranslations("contact.support");
  const tFeatures = useTranslations("features");

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState<RoleId>("owner");
  const [teamSize, setTeamSize] = useState<TeamSizeId>("solo");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<AnyFeatureId[]>([]);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState<"required" | "invalidEmail" | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const toggleInterest = (id: AnyFeatureId, selected: boolean) =>
    setInterests((current) =>
      selected ? [...current, id] : current.filter((item) => item !== id),
    );

  const composeBody = () => {
    const empty = tf("composedEmpty");
    const interestList = ALL_FEATURE_IDS.filter((id) => interests.includes(id))
      .map((id) => tFeatures(`items.${id}.title`))
      .join(", ");

    return [
      tf("composedIntro"),
      "",
      `${tf("composedName")}: ${name.trim()}`,
      `${tf("composedCompany")}: ${company.trim() || empty}`,
      `${tf("composedRole")}: ${tf(`roles.${role}`)}`,
      `${tf("composedTeamSize")}: ${tf(`teamSizes.${teamSize}`)}`,
      `${tf("composedPhone")}: ${phone.trim()}`,
      `${tf("composedEmail")}: ${email.trim()}`,
      `${tf("composedInterest")}: ${interestList || empty}`,
      "",
      `${tf("composedQuestion")}:`,
      question.trim(),
    ].join("\n");
  };

  const submit = () => {
    if (!name.trim() || !phone.trim() || !email.trim() || !question.trim()) {
      setError("required");
      return;
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("invalidEmail");
      return;
    }
    setError(null);

    const subject = tf("composedSubject", { name: name.trim() });
    window.location.href = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(composeBody())}`;

    setSentTo(email.trim());
  };

  const reset = () => {
    setName("");
    setCompany("");
    setRole("owner");
    setTeamSize("solo");
    setPhone("");
    setEmail("");
    setInterests([]);
    setQuestion("");
    setSentTo(null);
  };

  return (
    <>
      {/* Heading + form */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(242,248,231,0.6) 100%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-4 pb-20 pt-16 sm:px-6 lg:pb-24 lg:pt-20">
          <div className="text-center">
            <motion.span
              variants={heroBadge}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#94C748]/20 bg-[#94C748]/10 px-4 py-1.5 text-xs font-semibold text-[#1E280E]"
            >
              <MessageCircle className="h-3.5 w-3.5 text-[#94C748]" aria-hidden />
              {t("badge")}
            </motion.span>

            <motion.h1
              variants={heroTitle}
              initial="hidden"
              animate="visible"
              className="text-display mx-auto mt-5 max-w-2xl text-3xl sm:text-4xl lg:text-5xl"
            >
              {t("title")}
            </motion.h1>

            <motion.p
              variants={heroDescription}
              initial="hidden"
              animate="visible"
              className="text-lead mx-auto mt-5 max-w-xl text-base lg:text-lg"
            >
              {t("description")}
            </motion.p>
          </div>

          <Reveal y={30} duration={0.7} className="mt-10">
            <div className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
              {sentTo ? (
                <div role="status" className="py-6 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-[#94C748]" aria-hidden />
                  <h2 className="text-display mt-5 text-xl lg:text-2xl">{tf("sentTitle")}</h2>
                  <p className="text-lead mx-auto mt-3 max-w-md text-sm lg:text-base">
                    {tf("sentDescription", { email: sentTo })}
                  </p>
                  <div className="mt-7">
                    <Button color="secondary" size="lg" onClick={reset}>
                      {tf("sentAgain")}
                    </Button>
                  </div>
                </div>
              ) : (
                <form
                  noValidate
                  onSubmit={(event) => {
                    event.preventDefault();
                    submit();
                  }}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label={tf("nameLabel")}
                      placeholder={tf("namePlaceholder")}
                      name="name"
                      autoComplete="name"
                      isRequired
                      value={name}
                      onChange={setName}
                    />
                    <Input
                      label={tf("companyLabel")}
                      placeholder={tf("companyPlaceholder")}
                      name="company"
                      autoComplete="organization"
                      value={company}
                      onChange={setCompany}
                    />

                    <NativeSelect
                      label={tf("roleLabel")}
                      name="role"
                      value={role}
                      onChange={(event) => setRole(event.target.value as RoleId)}
                      options={ROLE_IDS.map((id) => ({ value: id, label: tf(`roles.${id}`) }))}
                    />
                    <NativeSelect
                      label={tf("teamSizeLabel")}
                      name="teamSize"
                      value={teamSize}
                      onChange={(event) => setTeamSize(event.target.value as TeamSizeId)}
                      options={TEAM_SIZE_IDS.map((id) => ({
                        value: id,
                        label: tf(`teamSizes.${id}`),
                      }))}
                    />

                    <Input
                      label={tf("phoneLabel")}
                      placeholder={tf("phonePlaceholder")}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      isRequired
                      value={phone}
                      onChange={setPhone}
                    />
                    <Input
                      label={tf("emailLabel")}
                      placeholder={tf("emailPlaceholder")}
                      name="email"
                      type="email"
                      autoComplete="email"
                      isRequired
                      value={email}
                      onChange={setEmail}
                    />
                  </div>

                  <fieldset className="mt-7">
                    <legend className="text-sm font-medium text-secondary">
                      {tf("interestLabel")}
                    </legend>
                    <p className="text-detail mt-1 text-xs">{tf("interestHint")}</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {ALL_FEATURE_IDS.map((id) => (
                        <Checkbox
                          key={id}
                          label={tFeatures(`items.${id}.title`)}
                          isSelected={interests.includes(id)}
                          onChange={(selected) => toggleInterest(id, selected)}
                        />
                      ))}
                    </div>
                  </fieldset>

                  <div className="mt-7">
                    <TextArea
                      label={tf("questionLabel")}
                      placeholder={tf("questionPlaceholder")}
                      name="question"
                      isRequired
                      rows={5}
                      value={question}
                      onChange={setQuestion}
                    />
                  </div>

                  {error && (
                    <p role="alert" className="mt-5 flex items-center gap-2 text-sm text-red-700">
                      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
                      {tf(error)}
                    </p>
                  )}

                  <div className="mt-8">
                    <Button
                      type="submit"
                      size="xl"
                      iconLeading={Send}
                      className="w-full justify-center text-white"
                    >
                      {tf("submit")}
                    </Button>
                    <p className="text-detail mt-4 text-center text-xs">
                      {tf.rich("consent", {
                        terms: (chunks) => (
                          <Link
                            href="/terms-of-service"
                            className="font-medium text-[#1E280E] underline underline-offset-2 hover:text-[#94C748]"
                          >
                            {chunks}
                          </Link>
                        ),
                        privacy: (chunks) => (
                          <Link
                            href="/privacy-policy"
                            className="font-medium text-[#1E280E] underline underline-offset-2 hover:text-[#94C748]"
                          >
                            {chunks}
                          </Link>
                        ),
                      })}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Direct channels — mirrors the reference page's #support-cta block. */}
      <section id="support-cta" className="relative scroll-mt-28 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal y={30} duration={0.7} className="mx-auto max-w-2xl text-center">
            <h2 className="text-display text-2xl sm:text-3xl lg:text-4xl">{ts("title")}</h2>
            <p className="text-lead mt-4 text-base lg:text-lg">{ts("description")}</p>
          </Reveal>

          <Reveal
            stagger
            staggerAmount={0.1}
            y={30}
            duration={0.6}
            className="mt-12 grid gap-6 md:grid-cols-3"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-3xl border border-gray-200/80 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#94C748]/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#94C748]/12">
                <MessageCircle className="h-5 w-5 text-[#94C748]" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="text-display mt-6 text-lg">{ts("whatsappTitle")}</h3>
              <p className="text-lead mt-2 flex-1 text-sm">{ts("whatsappDescription")}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E280E] transition-colors group-hover:text-[#94C748]">
                {ts("whatsappAction")}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </a>

            <a
              href={`mailto:${SITE.contactEmail}`}
              className="group flex h-full flex-col rounded-3xl border border-gray-200/80 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#94C748]/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#94C748]/12">
                <Mail className="h-5 w-5 text-[#94C748]" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="text-display mt-6 text-lg">{ts("emailTitle")}</h3>
              <p className="text-lead mt-2 flex-1 text-sm">{ts("emailDescription")}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 break-all text-sm font-semibold text-[#1E280E] transition-colors group-hover:text-[#94C748]">
                {SITE.contactEmail}
              </span>
            </a>

            <div className="flex h-full flex-col rounded-3xl border border-gray-200/80 bg-white p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#94C748]/12">
                <Share2 className="h-5 w-5 text-[#94C748]" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="text-display mt-6 text-lg">{ts("socialTitle")}</h3>
              <p className="text-lead mt-2 flex-1 text-sm">{ts("socialDescription")}</p>
              {SOCIAL_LINKS.length > 0 && (
                <div className="mt-6 flex items-center gap-2">
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
                        alt={`Ikon ${social.name}`}
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px] object-contain"
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </Reveal>

          <p className="text-detail mt-12 text-center text-xs">{t("company")}</p>
        </div>
      </section>
    </>
  );
}
