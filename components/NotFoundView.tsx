"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { ArrowRight, BookOpen, Globe, Home, Users } from "lucide-react";
import { Logo } from "@/components/Logo";
import { resolveLocale } from "@/lib/locale";

export function NotFoundView() {
  const currentLocale = resolveLocale(useLocale());
  const t = useTranslations("notFound");
  const router = useRouter();
  const pathname = usePathname();

  const isEn = currentLocale === "en";

  const toggleLocale = () => {
    const nextLocale = isEn ? "id" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  const homeLabel = t("links.home") || (isEn ? "Home" : "Beranda");
  const blogLabel = t("links.blog") || (isEn ? "Blog Articles" : "Artikel Blog");
  const aboutLabel = t("links.about") || (isEn ? "About Us" : "Tentang Kami");
  const mainTitle = t("title") || (isEn ? "Page Not Found" : "Halaman Tidak Ditemukan");
  const mainSubtitle =
    t("subtitle") ||
    (isEn
      ? "The page you are looking for might have been moved, renamed, or is temporarily unavailable."
      : "Sepertinya halaman yang Anda cari sudah dipindahkan, diubah namanya, atau tidak tersedia.");

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#F4FAF3] text-[#1E280E] antialiased selection:bg-[#5BB318]/20">
      {/* Decorative Background Mesh & Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Soft Radial Mint Glow */}
        <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(91,179,24,0.18),transparent_70%)] blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-[400px] w-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(148,199,72,0.15),transparent_70%)] blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-[400px] w-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(91,179,24,0.12),transparent_70%)] blur-3xl" />

        {/* Subtle Tech Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `radial-gradient(#5BB318 0.75px, transparent 0.75px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <Link
          href="/"
          className="transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB318]"
          aria-label="Optimark Home"
        >
          <Logo size="md" />
        </Link>

        {/* Language Switcher */}
        <button
          type="button"
          onClick={toggleLocale}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#D5E7D1] bg-white/95 px-4 py-2 text-xs font-semibold text-[#1E280E] shadow-xs backdrop-blur-md transition-all duration-200 hover:border-[#5BB318] hover:bg-white hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB318]"
          aria-label={isEn ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
        >
          <Globe className="size-3.5 text-[#5BB318]" />
          <span>{isEn ? "ID (Bahasa)" : "EN (English)"}</span>
        </button>
      </header>

      {/* Main Interactive 404 Hero Stage */}
      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-4 py-8 text-center sm:px-6 sm:py-12">
        {/* Animated 404 Scene (Code-based SVG & CSS keyframes, NO static canvas image) */}
        <div className="relative mb-6 flex items-center justify-center select-none sm:mb-8">
          {/* Animated SVG Composition */}
          <svg
            className="h-44 w-auto sm:h-56 md:h-64"
            viewBox="0 0 520 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="404 Robot Illustration"
          >
            <defs>
              {/* Radial Gradients */}
              <radialGradient id="robotGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#5BB318" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#5BB318" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="numGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2E4A10" />
                <stop offset="60%" stopColor="#5BB318" />
                <stop offset="100%" stopColor="#94C748" />
              </linearGradient>
              <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F0F7EE" />
              </linearGradient>
              <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E280E" />
                <stop offset="100%" stopColor="#2D3B17" />
              </linearGradient>
            </defs>

            {/* Pulsing Concentric Radar Rings */}
            <circle
              cx="260"
              cy="120"
              r="95"
              stroke="#5BB318"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="anim-pulse-ring"
            />
            <circle
              cx="260"
              cy="120"
              r="78"
              fill="url(#robotGlow)"
              className="anim-pulse-glow"
            />

            {/* Orbiting Particle 1 */}
            <g className="anim-orbit-1">
              <circle cx="260" cy="35" r="5" fill="#5BB318" />
              <circle cx="260" cy="35" r="8" stroke="#5BB318" strokeOpacity="0.4" strokeWidth="1" />
            </g>

            {/* Orbiting Particle 2 */}
            <g className="anim-orbit-2">
              <circle cx="260" cy="205" r="3.5" fill="#94C748" />
            </g>

            {/* Digit "4" (Left) */}
            <text
              x="50"
              y="170"
              fontSize="160"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              fill="url(#numGrad)"
              letterSpacing="-4"
            >
              4
            </text>

            {/* Digit "4" (Right) */}
            <text
              x="365"
              y="170"
              fontSize="160"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              fill="url(#numGrad)"
              letterSpacing="-4"
            >
              4
            </text>

            {/* Center Robot Mascot (Inside '0') with Floating Loop */}
            <g className="anim-floating-robot">
              {/* Antenna Sprout with Sway Loop */}
              <g className="anim-sprout-sway" transform-origin="260 70">
                <line x1="260" y1="70" x2="260" y2="48" stroke="#5BB318" strokeWidth="3" strokeLinecap="round" />
                {/* Sprout Leaf Left */}
                <path
                  d="M260 52 C252 50 250 42 254 38 C258 40 260 48 260 52 Z"
                  fill="#5BB318"
                />
                {/* Sprout Leaf Right */}
                <path
                  d="M260 48 C268 46 270 38 266 34 C262 36 260 44 260 48 Z"
                  fill="#94C748"
                />
              </g>

              {/* Robot Head Body */}
              <rect
                x="215"
                y="68"
                width="90"
                height="82"
                rx="24"
                fill="url(#bodyGrad)"
                stroke="#D5E7D1"
                strokeWidth="2.5"
                filter="drop-shadow(0 8px 16px rgba(78, 159, 21, 0.12))"
              />

              {/* Robot Ears */}
              <rect x="208" y="98" width="7" height="22" rx="3.5" fill="#5BB318" />
              <rect x="305" y="98" width="7" height="22" rx="3.5" fill="#5BB318" />

              {/* Digital Screen Face */}
              <rect
                x="226"
                y="80"
                width="68"
                height="46"
                rx="14"
                fill="url(#screenGrad)"
                stroke="#3D7C10"
                strokeWidth="1.5"
              />

              {/* Animated Eyes (Cute Expressive with Blinking Loop) */}
              <g className="anim-robot-eyes" transform-origin="260 98">
                {/* Left Eye */}
                <circle cx="248" cy="98" r="6" fill="#94C748" />
                <circle cx="250" cy="96" r="2" fill="#FFFFFF" />

                {/* Right Eye */}
                <circle cx="272" cy="98" r="6" fill="#94C748" />
                <circle cx="274" cy="96" r="2" fill="#FFFFFF" />

                {/* Curved Happy/Curious Mouth */}
                <path
                  d="M256 112 Q260 116 264 112"
                  stroke="#94C748"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>

              {/* Robot Chest Gear / Optimark Petal Emblem */}
              <circle cx="260" cy="165" r="14" fill="#FFFFFF" stroke="#D5E7D1" strokeWidth="2" />
              <g transform="translate(260 165) scale(0.65)">
                <circle cx="0" cy="-7" r="3" fill="#5BB318" />
                <circle cx="5" cy="-5" r="3" fill="#94C748" />
                <circle cx="7" cy="0" r="3" fill="#5BB318" />
                <circle cx="5" cy="5" r="3" fill="#94C748" />
                <circle cx="0" cy="7" r="3" fill="#5BB318" />
                <circle cx="-5" cy="5" r="3" fill="#94C748" />
                <circle cx="-7" cy="0" r="3" fill="#5BB318" />
                <circle cx="-5" cy="-5" r="3" fill="#94C748" />
                <circle cx="0" cy="0" r="2.5" fill="#2E4A10" />
              </g>
            </g>
          </svg>
        </div>

        {/* Badge Indicator */}
        <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-[#D5E7D1] bg-[#EAF5E7] px-3.5 py-1 text-xs font-bold text-[#3D7C10] shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5BB318] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5BB318]" />
          </span>
          <span>404 Error</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl md:text-5xl">
          {mainTitle}
        </h1>

        {/* Subtitle Description */}
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
          {mainSubtitle}
        </p>

        {/* The 3 Core Action Navigation Buttons (Beranda, Artikel Blog, About Us) */}
        <div className="mt-8 flex w-full max-w-md flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4">
          {/* Button 1: Beranda / Home (Primary Highlighted CTA) */}
          <Link
            href="/"
            className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#5BB318] px-6 py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(91,179,24,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4E9F15] hover:shadow-[0_10px_25px_rgba(78,159,21,0.45)] active:translate-y-0 sm:w-auto"
          >
            <Home className="size-4 shrink-0" aria-hidden="true" />
            <span>{homeLabel}</span>
            <ArrowRight
              className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>

          {/* Button 2: Artikel Blog / Blog Articles */}
          <Link
            href="/blog"
            className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#D5E7D1] bg-white px-6 py-3.5 text-sm font-bold text-[#1E280E] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#5BB318] hover:bg-[#F4FAF3] hover:text-[#3D7C10] hover:shadow-sm active:translate-y-0 sm:w-auto"
          >
            <BookOpen className="size-4 shrink-0 text-[#5BB318]" aria-hidden="true" />
            <span>{blogLabel}</span>
          </Link>

          {/* Button 3: About Us / Tentang Kami */}
          <Link
            href="/about"
            className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#D5E7D1] bg-white px-6 py-3.5 text-sm font-bold text-[#1E280E] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#5BB318] hover:bg-[#F4FAF3] hover:text-[#3D7C10] hover:shadow-sm active:translate-y-0 sm:w-auto"
          >
            <Users className="size-4 shrink-0 text-[#5BB318]" aria-hidden="true" />
            <span>{aboutLabel}</span>
          </Link>
        </div>
      </main>

      {/* Footer Copyright */}
      <footer className="relative z-10 mx-auto w-full max-w-7xl px-5 py-6 text-center text-xs text-[#6B7280]">
        <p>© {new Date().getFullYear()} Optimark AI. All rights reserved.</p>
      </footer>

      {/* Self-contained CSS Keyframes for Seamless Looping Animations */}
      <style jsx>{`
        .anim-floating-robot {
          animation: floatRobot 3.8s ease-in-out infinite;
        }
        .anim-sprout-sway {
          animation: swaySprout 2.4s ease-in-out infinite alternate;
        }
        .anim-robot-eyes {
          animation: blinkEyes 4.2s infinite;
        }
        .anim-pulse-ring {
          animation: pulseRing 3.2s ease-in-out infinite;
          transform-origin: 260px 120px;
        }
        .anim-pulse-glow {
          animation: pulseGlow 3.2s ease-in-out infinite alternate;
          transform-origin: 260px 120px;
        }
        .anim-orbit-1 {
          animation: orbitOne 6s linear infinite;
          transform-origin: 260px 120px;
        }
        .anim-orbit-2 {
          animation: orbitTwo 8s linear infinite reverse;
          transform-origin: 260px 120px;
        }

        @keyframes floatRobot {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(0.8deg);
          }
        }

        @keyframes swaySprout {
          0% {
            transform: rotate(-7deg);
          }
          100% {
            transform: rotate(7deg);
          }
        }

        @keyframes blinkEyes {
          0%,
          92%,
          100% {
            transform: scaleY(1);
          }
          96% {
            transform: scaleY(0.1);
          }
        }

        @keyframes pulseRing {
          0% {
            transform: scale(0.96);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.35;
          }
          100% {
            transform: scale(0.96);
            opacity: 0.8;
          }
        }

        @keyframes pulseGlow {
          0% {
            transform: scale(0.92);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.08);
            opacity: 0.85;
          }
        }

        @keyframes orbitOne {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orbitTwo {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
