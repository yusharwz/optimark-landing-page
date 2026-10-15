/**
 * SEO Database & Metadata Configuration (Optimark)
 * Sourced directly from official Google Sheets Sitemap Optimark:
 * - Marketing (ID) (gid=0)
 * - Marketing (EN) (gid=51481601)
 *
 * All canonical tags and links are updated to direct paths (without deprecated /features/ prefix)
 * in accordance with architectural decisions.
 */

import type { AppLocale } from "@/lib/locale";
import { getSiteUrl } from "@/config/site";

export interface SeoItemData {
  page?: string;
  category?: string;
  linkBefore?: string;
  linkAfter?: string;
  link?: string;
  mainKeyword: string;
  sv: number | string | null;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  keywords: string[];
}

export type SeoPageKey =
  | "home"
  | "features"
  | "ai-content-maker"
  | "perencana-konten"
  | "seo-analyzer"
  | "ai-image"
  | "ai-video"
  | "pricing"
  | "faq"
  | "blog"
  | "about"
  | "contact"
  | "privacy-policy"
  | "terms-of-service";

export interface PageSeoConfig {
  id: SeoItemData;
  en: SeoItemData;
}

export const SEO_CONFIG: Record<SeoPageKey, PageSeoConfig> = {
  home: {
    id: {
      page: "Homepage",
      linkBefore: "https://optimark.ai/",
      mainKeyword: "platform ai digital marketing",
      sv: 10,
      secondaryKeywords: [
        "platform marketing digital ai",
        "ai marketing tools indonesia",
        "software digital marketing",
      ],
      metaTitle: "Optimark - Platform AI Digital Marketing All-in-One",
      metaDescription:
        "Optimark membantu bisnis mengelola SEO, content marketing, media sosial, serta visual content dengan AI dalam satu platform digital marketing.",
      canonical: "https://optimark.ai",
      keywords: [
        "platform ai digital marketing",
        "platform marketing digital ai",
        "ai marketing tools indonesia",
        "software digital marketing",
      ],
    },
    en: {
      page: "Homepage",
      link: "https://optimark.ai/en",
      mainKeyword: "all in one digital marketing platform",
      sv: 200,
      secondaryKeywords: [
        "ai digital marketing platform",
        "digital marketing tools",
        "marketing automation ai",
      ],
      metaTitle: "Optimark - All-in-One AI Digital Marketing Platform",
      metaDescription:
        "Optimark helps businesses manage SEO, content marketing, social media, and visual content with AI in one digital marketing platform.",
      canonical: "https://optimark.ai/en",
      keywords: [
        "all in one digital marketing platform",
        "ai digital marketing platform",
        "digital marketing tools",
        "marketing automation ai",
      ],
    },
  },
  features: {
    id: {
      page: "Fitur",
      linkBefore: "https://optimark.ai/#features",
      mainKeyword: "fitur digital marketing AI",
      sv: null,
      secondaryKeywords: ["tools seo ai", "konten otomatis ai", "scheduling media sosial ai"],
      metaTitle: "Fitur Optimark - Tools SEO, Konten, dan Scheduling Berbasis AI",
      metaDescription:
        "Jelajahi fitur Optimark mulai dari riset SEO, pembuatan konten otomatis, penjadwalan, hingga publishing dalam satu platform AI.",
      canonical: "https://optimark.ai/#features",
      keywords: [
        "fitur digital marketing AI",
        "tools seo ai",
        "konten otomatis ai",
        "scheduling media sosial ai",
      ],
    },
    en: {
      page: "Features",
      link: "https://optimark.ai/en#features",
      mainKeyword: "ai digital marketing features",
      sv: null,
      secondaryKeywords: ["ai seo tools", "automated ai content", "ai social scheduling"],
      metaTitle: "Optimark Features - AI SEO, Content & Scheduling Tools",
      metaDescription:
        "Explore Optimark features: AI keyword research, automated content creation, social media scheduling, and visual content generation.",
      canonical: "https://optimark.ai/en#features",
      keywords: [
        "ai digital marketing features",
        "ai seo tools",
        "automated ai content",
        "ai social scheduling",
      ],
    },
  },
  "ai-content-maker": {
    id: {
      page: "Fitur",
      category: "AI Content Maker",
      linkBefore: "https://optimark.ai/ai-content-maker",
      mainKeyword: "ai content maker",
      sv: 350,
      secondaryKeywords: [
        "ai content maker untuk bisnis",
        "ai content maker gratis",
        "ai content generator",
      ],
      metaTitle: "AI Content Maker - Buat Konten Otomatis dengan AI | Optimark",
      metaDescription:
        "Buat artikel, copy marketing, caption, dan ide konten dengan AI Content Maker Optimark. Sesuaikan konten dengan kebutuhan dan gaya brand Anda.",
      canonical: "https://optimark.ai/ai-content-maker",
      keywords: [
        "ai content maker",
        "ai content maker untuk bisnis",
        "ai content maker gratis",
        "ai content generator",
      ],
    },
    en: {
      page: "Features",
      category: "AI Content Maker",
      link: "https://optimark.ai/en/ai-content-maker",
      mainKeyword: "ai content maker",
      sv: 350,
      secondaryKeywords: [
        "ai content maker for business",
        "free ai content generator",
        "ai copywriting tool",
      ],
      metaTitle: "AI Content Maker - Create Content with AI | Optimark",
      metaDescription:
        "Create articles, marketing copy, captions, and content ideas with Optimark AI Content Maker. Customize your content to match your brand and business needs.",
      canonical: "https://optimark.ai/en/ai-content-maker",
      keywords: [
        "ai content maker",
        "ai content maker for business",
        "free ai content generator",
        "ai copywriting tool",
      ],
    },
  },
  "perencana-konten": {
    id: {
      page: "Fitur",
      category: "Perencanaan Konten",
      linkBefore: "https://optimark.ai/perencana-konten",
      mainKeyword: "perencanaan konten",
      sv: 150,
      secondaryKeywords: ["ai social media scheduler", "tools manajemen konten"],
      metaTitle: "Perencanaan Konten - Atur Jadwal Konten dengan AI | Optimark",
      metaDescription:
        "Rencanakan dan kelola konten media sosial dengan lebih teratur menggunakan Optimark dalam satu platform untuk mendukung aktivitas marketing bisnis.",
      canonical: "https://optimark.ai/perencana-konten",
      keywords: [
        "perencanaan konten",
        "ai social media scheduler",
        "tools manajemen konten",
        "social media content planner",
      ],
    },
    en: {
      page: "Features",
      category: "Content Planner",
      link: "https://optimark.ai/en/content-planner",
      mainKeyword: "ai content planner",
      sv: 150,
      secondaryKeywords: [
        "social media content planner",
        "ai social media scheduler",
        "content planning tools",
      ],
      metaTitle: "Content Planner - Plan & Schedule Content with AI | Optimark",
      metaDescription:
        "Plan and manage your social media content with Optimark Content Planner. Organize content and schedules in one platform for your marketing needs.",
      canonical: "https://optimark.ai/en/content-planner",
      keywords: [
        "ai content planner",
        "social media content planner",
        "ai social media scheduler",
        "content planning tools",
      ],
    },
  },
  "seo-analyzer": {
    id: {
      page: "Fitur",
      category: "SEO Analyzer",
      linkBefore: "https://optimark.ai/seo-analyzer",
      mainKeyword: "ai seo analyzer",
      sv: 1000,
      secondaryKeywords: ["tools audit seo", "riset kata kunci ai", "cek seo website"],
      metaTitle: "AI SEO Analyzer - Audit SEO Website dengan AI | Optimark",
      metaDescription:
        "Audit SEO website, riset kata kunci, dan temukan peluang optimasi dengan AI SEO Analyzer Optimark untuk membantu meningkatkan performa traffic organik.",
      canonical: "https://optimark.ai/seo-analyzer",
      keywords: ["ai seo analyzer", "tools audit seo", "riset kata kunci ai", "cek seo website"],
    },
    en: {
      page: "Features",
      category: "SEO Analyzer",
      link: "https://optimark.ai/en/seo-analyzer",
      mainKeyword: "ai seo analyzer tool",
      sv: 1100,
      secondaryKeywords: ["website seo audit", "ai keyword research", "check website seo"],
      metaTitle: "AI SEO Analyzer - Audit Your Website with AI | Optimark",
      metaDescription:
        "Audit your website, analyze keywords, and discover SEO opportunities with Optimark AI SEO Analyzer to improve your organic search performance.",
      canonical: "https://optimark.ai/en/seo-analyzer",
      keywords: [
        "ai seo analyzer tool",
        "website seo audit",
        "ai keyword research",
        "check website seo",
      ],
    },
  },
  "ai-image": {
    id: {
      page: "Fitur",
      category: "AI Image",
      linkBefore: "https://optimark.ai/ai-image",
      mainKeyword: "ai image generator tools",
      sv: 1300,
      secondaryKeywords: [
        "ai image generator",
        "generator visual marketing ai",
        "ai image generator untuk bisnis",
      ],
      metaTitle: "AI Image Generator - Buat Gambar dengan AI | Optimark",
      metaDescription:
        "Buat gambar dengan AI untuk kebutuhan konten dan marketing. AI Image Optimark membantu mengubah ide menjadi gambar sesuai kebutuhan bisnis Anda.",
      canonical: "https://optimark.ai/ai-image",
      keywords: [
        "ai image generator tools",
        "ai image generator",
        "generator visual marketing ai",
        "ai image generator untuk bisnis",
      ],
    },
    en: {
      page: "Features",
      category: "AI Image",
      link: "https://optimark.ai/en/ai-image",
      mainKeyword: "ai image generator tools",
      sv: 1300,
      secondaryKeywords: [
        "ai image generator",
        "ai marketing visual generator",
        "ai image generator for business",
      ],
      metaTitle: "AI Image Generator - Create Images with AI | Optimark",
      metaDescription:
        "Create images with AI for your content and marketing needs. Optimark AI Image helps turn your ideas into images for your business.",
      canonical: "https://optimark.ai/en/ai-image",
      keywords: [
        "ai image generator tools",
        "ai image generator",
        "ai marketing visual generator",
        "ai image generator for business",
      ],
    },
  },
  "ai-video": {
    id: {
      page: "Fitur",
      category: "AI Video",
      linkBefore: "https://optimark.ai/ai-video",
      mainKeyword: "ai video editor online",
      sv: 450,
      secondaryKeywords: [
        "ai video generator",
        "ai video maker untuk konten",
        "ai video generator untuk bisnis",
      ],
      metaTitle: "AI Video Generator - Buat Video dengan AI | Optimark",
      metaDescription:
        "Buat video dengan AI untuk kebutuhan konten dan marketing bisnis. AI Video Optimark membantu mengubah ide menjadi video yang siap digunakan.",
      canonical: "https://optimark.ai/ai-video",
      keywords: [
        "ai video editor online",
        "ai video generator",
        "ai video maker untuk konten",
        "ai video generator untuk bisnis",
      ],
    },
    en: {
      page: "Features",
      category: "AI Video",
      link: "https://optimark.ai/en/ai-video",
      mainKeyword: "ai video generator tools",
      sv: 2800,
      secondaryKeywords: [
        "ai video editor online",
        "ai video maker for content",
        "ai video generator for business",
      ],
      metaTitle: "AI Video Generator - Create Videos with AI | Optimark",
      metaDescription:
        "Create videos with AI for your content and marketing needs. Optimark AI Video helps turn your ideas into videos ready for your business content.",
      canonical: "https://optimark.ai/en/ai-video",
      keywords: [
        "ai video generator tools",
        "ai video editor online",
        "ai video maker for content",
        "ai video generator for business",
      ],
    },
  },
  pricing: {
    id: {
      page: "Harga",
      linkBefore: "https://optimark.ai/pricing",
      mainKeyword: "harga paket optimark",
      sv: null,
      secondaryKeywords: ["paket optimark", "harga langganan optimark"],
      metaTitle: "Harga & Paket Optimark untuk Digital Marketing | Optimark",
      metaDescription:
        "Pilih paket Optimark sesuai kebutuhan bisnis Anda untuk mengelola SEO, konten, media sosial, gambar, dan video berbasis AI dalam satu platform.",
      canonical: "https://optimark.ai/pricing",
      keywords: ["harga paket optimark", "paket optimark", "harga langganan optimark"],
    },
    en: {
      page: "Pricelist",
      link: "https://optimark.ai/en/pricing",
      mainKeyword: "optimark pricing",
      sv: 10,
      secondaryKeywords: ["optimark plans", "ai digital marketing pricing"],
      metaTitle: "Optimark Pricing - Plans for AI Digital Marketing",
      metaDescription:
        "Choose an Optimark plan based on your business needs and manage SEO, content, social media, images, and videos with AI in one platform.",
      canonical: "https://optimark.ai/en/pricing",
      keywords: ["optimark pricing", "optimark plans", "ai digital marketing pricing"],
    },
  },
  faq: {
    id: {
      page: "FAQ",
      linkBefore: "https://optimark.ai/faq",
      mainKeyword: "pertanyaan seputar optimark",
      sv: null,
      secondaryKeywords: ["faq optimark", "bantuan optimark"],
      metaTitle: "Pertanyaan Seputar Platform Digital Marketing AI - Optimark",
      metaDescription:
        "Temukan jawaban atas pertanyaan umum seputar fitur, harga, dan cara penggunaan platform Optimark.",
      canonical: "https://optimark.ai/faq",
      keywords: ["pertanyaan seputar optimark", "faq optimark", "bantuan optimark"],
    },
    en: {
      page: "FAQ",
      link: "https://optimark.ai/en/faq",
      mainKeyword: "optimark faq",
      sv: null,
      secondaryKeywords: ["optimark questions", "optimark help"],
      metaTitle: "Frequently Asked Questions About AI Digital Marketing Platform - Optimark",
      metaDescription:
        "Find answers to common questions about Optimark features, pricing, and how to use the platform.",
      canonical: "https://optimark.ai/en/faq",
      keywords: ["optimark faq", "optimark questions", "optimark help"],
    },
  },
  blog: {
    id: {
      page: "Blog",
      linkBefore: "https://optimark.ai/blog",
      mainKeyword: "blog Optimark",
      sv: null,
      secondaryKeywords: ["tips digital marketing", "strategi content marketing", "belajar seo"],
      metaTitle: "Blog Optimark | Tips & Strategi Digital Marketing",
      metaDescription:
        "Temukan tips dan strategi digital marketing untuk bisnis, mulai dari SEO, content marketing, social media, hingga visual content berbasis AI.",
      canonical: "https://optimark.ai/blog",
      keywords: [
        "blog Optimark",
        "tips digital marketing",
        "strategi content marketing",
        "belajar seo",
      ],
    },
    en: {
      page: "Blog",
      link: "https://optimark.ai/en/blog",
      mainKeyword: "Optimark blog",
      sv: null,
      secondaryKeywords: ["digital marketing tips", "content marketing strategies", "learn seo"],
      metaTitle: "Optimark Blog | Digital Marketing Tips & Strategies",
      metaDescription:
        "Discover digital marketing tips and strategies for businesses, covering SEO, content marketing, social media, and AI-powered visual content.",
      canonical: "https://optimark.ai/en/blog",
      keywords: [
        "Optimark blog",
        "digital marketing tips",
        "content marketing strategies",
        "learn seo",
      ],
    },
  },
  about: {
    id: {
      page: "Tentang Kami",
      linkBefore: "https://optimark.ai/about",
      mainKeyword: "tentang optimark",
      sv: null,
      secondaryKeywords: ["profil optimark", "tentang kami optimark"],
      metaTitle: "Tentang Optimark - Platform AI Digital Marketing All-in-One",
      metaDescription:
        "Optimark adalah platform AI digital marketing all-in-one yang membantu bisnis mengelola SEO, konten, media sosial, gambar, dan video dalam satu platform.",
      canonical: "https://optimark.ai/about",
      keywords: ["tentang optimark", "profil optimark", "tentang kami optimark"],
    },
    en: {
      page: "About Us",
      link: "https://optimark.ai/en/about",
      mainKeyword: "about optimark",
      sv: null,
      secondaryKeywords: ["optimark profile", "about us optimark"],
      metaTitle: "About Optimark - All-in-One AI Digital Marketing Platform",
      metaDescription:
        "Optimark is an all-in-one AI digital marketing platform that helps businesses manage SEO, content, social media, images, and videos in one platform.",
      canonical: "https://optimark.ai/en/about",
      keywords: ["about optimark", "optimark profile", "about us optimark"],
    },
  },
  contact: {
    id: {
      page: "Kontak",
      linkBefore: "https://optimark.ai/contact",
      mainKeyword: "kontak optimark",
      sv: null,
      secondaryKeywords: ["hubungi optimark", "customer support optimark"],
      metaTitle: "Kontak Optimark - Hubungi Tim Marketing Kami",
      metaDescription:
        "Hubungi tim Optimark untuk pertanyaan produk, dukungan, kerja sama bisnis, atau kebutuhan digital marketing Anda.",
      canonical: "https://optimark.ai/contact",
      keywords: ["kontak optimark", "hubungi optimark", "customer support optimark"],
    },
    en: {
      page: "Contact Us",
      link: "https://optimark.ai/en/contact",
      mainKeyword: "contact optimark",
      sv: null,
      secondaryKeywords: ["contact optimark", "support optimark", "business partnership"],
      metaTitle: "Contact Optimark - Contact Our Marketing Team",
      metaDescription:
        "Contact the Optimark team for product questions, support, business partnerships, or digital marketing needs for your business.",
      canonical: "https://optimark.ai/en/contact",
      keywords: ["contact optimark", "support optimark", "business partnership"],
    },
  },
  "privacy-policy": {
    id: {
      page: "Privacy & Policy",
      linkBefore: "https://optimark.ai/privacy-policy",
      mainKeyword: "kebijakan privasi optimark",
      sv: null,
      secondaryKeywords: ["perlindungan data pengguna", "privasi optimark"],
      metaTitle: "Kebijakan Privasi Optimark - Perlindungan Data Pengguna",
      metaDescription:
        "Pelajari kebijakan Optimark dalam mengumpulkan, menggunakan, dan melindungi data pribadi serta informasi pengguna.",
      canonical: "https://optimark.ai/privacy-policy",
      keywords: ["kebijakan privasi optimark", "perlindungan data pengguna", "privasi optimark"],
    },
    en: {
      page: "Privacy & Policy",
      link: "https://optimark.ai/en/privacy-policy",
      mainKeyword: "optimark privacy policy",
      sv: null,
      secondaryKeywords: ["user data protection", "optimark privacy"],
      metaTitle: "Optimark Privacy Policy - User Data Protection",
      metaDescription:
        "Learn how Optimark collects, uses, and protects personal data and user information when using our platform and services.",
      canonical: "https://optimark.ai/en/privacy-policy",
      keywords: ["optimark privacy policy", "user data protection", "optimark privacy"],
    },
  },
  "terms-of-service": {
    id: {
      page: "Terms Of Service",
      linkBefore: "https://optimark.ai/terms-of-service",
      mainKeyword: "syarat dan ketentuan optimark",
      sv: null,
      secondaryKeywords: ["ketentuan layanan optimark", "terms of service optimark"],
      metaTitle: "Syarat dan Ketentuan Optimark - Ketentuan Layanan",
      metaDescription:
        "Pelajari syarat dan ketentuan penggunaan Optimark, termasuk layanan, langganan, token, hak pengguna, dan tanggung jawab dalam menggunakan platform.",
      canonical: "https://optimark.ai/terms-of-service",
      keywords: [
        "syarat dan ketentuan optimark",
        "ketentuan layanan optimark",
        "terms of service optimark",
      ],
    },
    en: {
      page: "Terms Of Service",
      link: "https://optimark.ai/en/terms-of-service",
      mainKeyword: "optimark terms of service",
      sv: null,
      secondaryKeywords: [
        "optimark terms of service",
        "service terms",
        "user rights and responsibilities",
      ],
      metaTitle: "Optimark Terms of Service - Service Terms",
      metaDescription:
        "Learn about the terms and conditions for using Optimark, including services, subscriptions, tokens, user rights, and responsibilities.",
      canonical: "https://optimark.ai/en/terms-of-service",
      keywords: ["optimark terms of service", "service terms", "user rights and responsibilities"],
    },
  },
};

export function getSeoData(key: SeoPageKey, locale: AppLocale): SeoItemData {
  const raw = SEO_CONFIG[key]?.[locale] ?? SEO_CONFIG[key]?.id;
  if (!raw) return raw;
  const siteUrl = getSiteUrl();
  return {
    ...raw,
    canonical: raw.canonical ? raw.canonical.replace(/^https?:\/\/optimark\.ai/, siteUrl) : raw.canonical,
    link: raw.link ? raw.link.replace(/^https?:\/\/optimark\.ai/, siteUrl) : raw.link,
    linkBefore: raw.linkBefore ? raw.linkBefore.replace(/^https?:\/\/optimark\.ai/, siteUrl) : raw.linkBefore,
  };
}

export function getSeoKeywords(key: SeoPageKey, locale: AppLocale): string[] {
  return getSeoData(key, locale).keywords;
}
