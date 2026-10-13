export interface FaqItem {
  question: string;
  answer: string;
}

export interface PageSeoFaq {
  title: string;
  items: FaqItem[];
}

export type SeoFaqKey =
  | "home"
  | "ai-content-maker"
  | "perencana-konten"
  | "seo-analyzer"
  | "ai-image"
  | "ai-video";

export const SEO_FAQ_DATA: Record<
  SeoFaqKey,
  {
    id: PageSeoFaq;
    en: PageSeoFaq;
  }
> = {
  home: {
    id: {
      title: "Pertanyaan Umum tentang Optimark",
      items: [
        {
          question: "Apa itu Optimark?",
          answer:
            "Optimark adalah platform AI yang menyediakan berbagai tools untuk membantu proses content marketing, SEO, media sosial, serta pembuatan aset visual dan video.",
        },
        {
          question: "Apa saja tools yang tersedia di Optimark?",
          answer:
            "Optimark menyediakan AI Content Maker, Content Planner, SEO Analyzer, AI Image, dan AI Video.",
        },
        {
          question: "Apakah Optimark bisa digunakan untuk membuat artikel SEO?",
          answer:
            "Ya. AI Content Maker dirancang untuk membantu membuat konten dan artikel yang dapat digunakan dalam strategi SEO.",
        },
        {
          question: "Apakah Optimark hanya untuk SEO?",
          answer:
            "Tidak. Optimark mencakup berbagai kebutuhan digital marketing, mulai dari pembuatan konten dan SEO hingga social media planning, image generation, dan video generation.",
        },
        {
          question: "Siapa yang dapat menggunakan Optimark?",
          answer:
            "Optimark dapat digunakan oleh bisnis, digital marketer, agency, content creator, dan tim marketing yang ingin meningkatkan efisiensi dalam membuat dan mengelola konten digital.",
        },
      ],
    },
    en: {
      title: "Frequently Asked Questions about Optimark",
      items: [
        {
          question: "What is Optimark?",
          answer:
            "Optimark is an AI platform providing various tools to streamline content marketing, SEO, social media, as well as visual and video asset creation.",
        },
        {
          question: "What tools are available in Optimark?",
          answer:
            "Optimark provides AI Content Maker, Content Planner, SEO Analyzer, AI Image, and AI Video.",
        },
        {
          question: "Can Optimark be used to create SEO articles?",
          answer:
            "Yes. AI Content Maker is designed to help craft content and articles that can be utilized in your SEO strategy.",
        },
        {
          question: "Is Optimark only for SEO?",
          answer:
            "No. Optimark covers a comprehensive range of digital marketing needs, from content creation and SEO to social media planning, image generation, and video generation.",
        },
        {
          question: "Who can use Optimark?",
          answer:
            "Optimark can be used by businesses, digital marketers, agencies, content creators, and marketing teams looking to boost efficiency in creating and managing digital content.",
        },
      ],
    },
  },
  "ai-content-maker": {
    id: {
      title: "Pertanyaan Umum tentang AI Content Maker",
      items: [
        {
          question: "Apa itu AI Content Maker dan apa fungsinya?",
          answer:
            "AI Content Maker adalah tools berbasis artificial intelligence yang membantu bisnis membuat berbagai jenis konten secara lebih cepat dan efisien. Optimark AI Content Maker dapat digunakan untuk membuat artikel, konten SEO, caption, dan berbagai kebutuhan content marketing dalam satu platform.",
        },
        {
          question: "Apa itu AI Content Generator dan bagaimana cara kerjanya?",
          answer:
            "AI Content Generator adalah tools yang menggunakan artificial intelligence untuk menghasilkan konten berdasarkan instruksi, topik, atau informasi yang diberikan pengguna. Optimark membantu mengubah ide dan brief menjadi draft konten yang dapat dikembangkan dan disesuaikan dengan kebutuhan bisnis.",
        },
        {
          question: "Apakah AI Content Maker bisa digunakan untuk membuat artikel SEO?",
          answer:
            "Ya. Optimark AI Content Maker dapat membantu membuat artikel SEO berdasarkan topik dan keyword yang ingin ditargetkan. AI membantu mengembangkan struktur dan isi artikel sehingga proses pembuatan konten untuk kebutuhan SEO menjadi lebih cepat dan terarah.",
        },
        {
          question: "Apakah AI Content Maker cocok untuk bisnis di Indonesia?",
          answer:
            "Ya. AI Content Maker Optimark dapat digunakan oleh bisnis dan marketer di Indonesia untuk membuat konten berbahasa Indonesia, artikel SEO, konten marketing, hingga materi untuk media sosial. Tools ini membantu mempercepat produksi konten sekaligus mendukung strategi digital marketing.",
        },
        {
          question: "Apa saja konten yang bisa dibuat dengan AI Content Maker?",
          answer:
            "AI Content Maker Optimark dapat membantu membuat berbagai jenis konten, seperti artikel SEO, konten long-form, caption, dan konten marketing. Dengan berbagai kebutuhan konten dalam satu platform, bisnis dapat menyederhanakan proses produksi dan mengembangkan konten sesuai kebutuhan marketing.",
        },
      ],
    },
    en: {
      title: "Frequently Asked Questions about AI Content Maker",
      items: [
        {
          question: "What is AI Content Maker and what is its function?",
          answer:
            "AI Content Maker is an artificial intelligence-based tool that helps businesses create various types of content faster and more efficiently. Optimark AI Content Maker can be used to produce articles, SEO content, captions, and various content marketing needs within a single platform.",
        },
        {
          question: "What is an AI Content Generator and how does it work?",
          answer:
            "An AI Content Generator uses artificial intelligence to generate content based on instructions, topics, or briefs provided by the user. Optimark transforms ideas and briefs into structured content drafts that can be tailored to business needs.",
        },
        {
          question: "Can AI Content Maker be used to create SEO articles?",
          answer:
            "Yes. Optimark AI Content Maker helps craft SEO articles based on targeted topics and keywords. AI assists in structuring and developing article copy, making SEO content production faster and more focused.",
        },
        {
          question: "Is AI Content Maker suitable for businesses in Indonesia?",
          answer:
            "Yes. Optimark AI Content Maker is built for businesses and marketers in Indonesia to create Indonesian-language content, SEO articles, marketing copy, and social media materials, accelerating production and supporting digital growth.",
        },
        {
          question: "What types of content can be created with AI Content Maker?",
          answer:
            "Optimark AI Content Maker can generate a wide range of content formats including SEO articles, long-form content, captions, and marketing collateral, simplifying production workflows.",
        },
      ],
    },
  },
  "perencana-konten": {
    id: {
      title: "Pertanyaan Umum tentang Perencanaan Konten",
      items: [
        {
          question: "Apa itu Perencanaan Konten Media Sosial?",
          answer:
            "Perencanaan konten media sosial adalah proses menyusun, mengatur, dan menjadwalkan konten yang akan dipublikasikan di berbagai platform media sosial. Optimark membantu bisnis mengelola rencana konten melalui kalender konten dalam satu platform.",
        },
        {
          question: "Apa itu Social Media Content Planner?",
          answer:
            "Social Media Content Planner adalah tools yang membantu bisnis merencanakan dan mengatur konten media sosial secara lebih terstruktur. Optimark memungkinkan Anda membuat jadwal konten, mengelola aset, dan memantau rencana publikasi dari satu dashboard.",
        },
        {
          question: "Apa fungsi AI Social Media Scheduler?",
          answer:
            "AI Social Media Scheduler membantu menjadwalkan publikasi konten media sosial secara lebih efisien. Optimark menyediakan fitur Smart Queue yang dapat membantu menentukan waktu publikasi berdasarkan aktivitas audiens sehingga konten dapat dijadwalkan sesuai kebutuhan.",
        },
        {
          question: "Apakah Optimark bisa digunakan untuk menjadwalkan posting media sosial?",
          answer:
            "Ya. Optimark dapat membantu bisnis menjadwalkan dan mempublikasikan konten ke akun media sosial yang terhubung. Dengan fitur penjadwalan dan kalender konten, tim marketing dapat mengatur publikasi tanpa harus mengelola setiap posting secara manual.",
        },
        {
          question: "Apa manfaat menggunakan tools perencanaan konten untuk bisnis?",
          answer:
            "Tools perencanaan konten membantu bisnis mengatur jadwal publikasi, menjaga konsistensi konten, dan mempermudah pengelolaan aktivitas media sosial. Dengan Optimark, proses perencanaan dan penjadwalan konten dapat dilakukan dalam satu platform sehingga workflow marketing menjadi lebih terstruktur.",
        },
      ],
    },
    en: {
      title: "Frequently Asked Questions about Content Planning",
      items: [
        {
          question: "What is Social Media Content Planning?",
          answer:
            "Social media content planning is the process of organizing, structuring, and scheduling content to be published across various social platforms. Optimark helps businesses manage content roadmaps via a unified content calendar.",
        },
        {
          question: "What is a Social Media Content Planner?",
          answer:
            "A Social Media Content Planner is a tool that helps businesses plan and organize social media posts systematically. Optimark lets you create content schedules, manage assets, and track publishing plans from a single dashboard.",
        },
        {
          question: "What is the function of an AI Social Media Scheduler?",
          answer:
            "An AI Social Media Scheduler automates social media post scheduling efficiently. Optimark features Smart Queue to help determine optimal publishing times based on audience activity.",
        },
        {
          question: "Can Optimark be used to schedule social media posts?",
          answer:
            "Yes. Optimark enables businesses to schedule and publish content directly to connected social accounts, eliminating the need to manage each post manually.",
        },
        {
          question: "What are the benefits of content planning tools for businesses?",
          answer:
            "Content planning tools help businesses maintain publishing consistency, save time, and streamline social media operations within a structured marketing workflow.",
        },
      ],
    },
  },
  "seo-analyzer": {
    id: {
      title: "Pertanyaan Umum tentang SEO Analyzer",
      items: [
        {
          question: "Apa itu SEO Analyzer dan apa fungsinya?",
          answer:
            "SEO Analyzer adalah tools yang membantu menganalisis dan mengevaluasi performa SEO sebuah website. Optimark SEO Analyzer menggabungkan audit SEO, optimasi konten, riset keyword, pelacakan peringkat, analisis backlink, dan analisis kompetitor dalam satu workspace.",
        },
        {
          question: "Bagaimana cara melakukan audit SEO website?",
          answer:
            "Audit SEO website dilakukan dengan menganalisis berbagai elemen yang memengaruhi performa SEO, seperti struktur konten, penggunaan keyword, heading, meta description, internal link, dan berbagai faktor on-page lainnya. Optimark SEO Analyzer memberikan skor SEO serta rekomendasi perbaikan yang dapat digunakan untuk membantu mengoptimalkan website.",
        },
        {
          question: "Apakah SEO Analyzer bisa digunakan untuk riset kata kunci dengan AI?",
          answer:
            "Ya. Optimark menyediakan fitur riset kata kunci yang membantu menemukan keyword berdasarkan topik, termasuk informasi mengenai search intent, estimasi volume pencarian, tingkat kesulitan, dan pratinjau SERP. Fitur ini membantu menemukan peluang keyword yang lebih relevan untuk strategi SEO.",
        },
        {
          question: "Apa manfaat menggunakan tools SEO untuk bisnis?",
          answer:
            "Tools SEO membantu bisnis memahami performa website, menemukan peluang keyword, mengidentifikasi masalah SEO, dan memantau perkembangan visibilitas di mesin pencari. Dengan Optimark SEO Analyzer, berbagai aktivitas tersebut dapat dilakukan dalam satu workspace sehingga proses analisis dan optimasi SEO menjadi lebih terstruktur.",
        },
        {
          question: "Apakah SEO Analyzer bisa memantau peringkat dan kompetitor?",
          answer:
            "Ya. Optimark SEO Analyzer dapat digunakan untuk memantau peringkat keyword berdasarkan kota dan perangkat, melihat perubahan ranking, memantau profil backlink, serta menganalisis kompetitor. SEO Analyzer juga membantu memantau visibilitas brand pada mesin pencari dan platform berbasis AI.",
        },
      ],
    },
    en: {
      title: "Frequently Asked Questions about SEO Analyzer",
      items: [
        {
          question: "What is SEO Analyzer and what is its function?",
          answer:
            "SEO Analyzer is a tool that audits and evaluates the SEO performance of a website. Optimark SEO Analyzer combines website auditing, content optimization, keyword research, rank tracking, backlink analysis, and competitor intelligence in one workspace.",
        },
        {
          question: "How to perform a website SEO audit?",
          answer:
            "A website SEO audit analyzes factors affecting search performance, including content structure, keyword density, headings, meta descriptions, and internal links. Optimark SEO Analyzer generates SEO scores and actionable recommendations.",
        },
        {
          question: "Can SEO Analyzer be used for AI keyword research?",
          answer:
            "Yes. Optimark provides keyword research to uncover high-impact keywords with search intent analysis, estimated search volumes, keyword difficulty, and live SERP previews.",
        },
        {
          question: "What are the benefits of SEO tools for businesses?",
          answer:
            "SEO tools help businesses discover keyword opportunities, resolve technical SEO issues, and track search visibility systematically within a unified platform.",
        },
        {
          question: "Can SEO Analyzer track rankings and competitors?",
          answer:
            "Yes. Optimark SEO Analyzer tracks keyword rankings by city and device, monitors backlink profiles, and analyzes competitor movements across search engines and AI search platforms.",
        },
      ],
    },
  },
  "ai-image": {
    id: {
      title: "Pertanyaan Umum tentang AI Image",
      items: [
        {
          question: "Apa itu AI Image Generator dan apa fungsinya?",
          answer:
            "AI Image Generator adalah tools berbasis artificial intelligence yang membantu membuat gambar berdasarkan deskripsi atau instruksi yang diberikan pengguna. Optimark AI Image membantu bisnis menghasilkan visual untuk berbagai kebutuhan digital marketing dengan lebih cepat dan praktis.",
        },
        {
          question: "Apa itu generator visual marketing AI?",
          answer:
            "Generator visual marketing AI adalah tools yang menggunakan AI untuk membantu membuat visual yang dapat digunakan dalam aktivitas pemasaran. Optimark AI Image dapat membantu menghasilkan gambar untuk konten website, media sosial, campaign, dan berbagai kebutuhan marketing lainnya.",
        },
        {
          question: "Apakah AI Image Generator bisa digunakan untuk membuat gambar bisnis?",
          answer:
            "Ya. Optimark AI Image Generator dapat digunakan untuk membuat berbagai visual yang disesuaikan dengan kebutuhan bisnis. Anda dapat memberikan deskripsi mengenai konsep, objek, gaya, atau kebutuhan visual yang ingin dibuat untuk menghasilkan gambar dengan bantuan AI.",
        },
        {
          question: "Apakah AI Image cocok untuk kebutuhan marketing?",
          answer:
            "Ya. AI Image dapat membantu bisnis mempercepat pembuatan visual marketing untuk berbagai channel digital, seperti media sosial, website, artikel, campaign, dan materi promosi. Hal ini membantu tim marketing menghasilkan lebih banyak aset visual tanpa harus membuat setiap gambar dari awal.",
        },
        {
          question: "Apa manfaat menggunakan AI Image Generator untuk bisnis?",
          answer:
            "AI Image Generator membantu bisnis mempercepat proses produksi visual, mengembangkan berbagai ide kreatif, dan menyediakan aset gambar untuk kebutuhan content marketing. Dengan Optimark, pembuatan visual dapat menjadi bagian dari workflow digital marketing dalam satu platform.",
        },
      ],
    },
    en: {
      title: "Frequently Asked Questions about AI Image",
      items: [
        {
          question: "What is an AI Image Generator and what is its function?",
          answer:
            "An AI Image Generator is an AI-powered tool that creates images based on text prompts or instructions. Optimark AI Image helps businesses generate visual assets for digital marketing quickly and effortlessly.",
        },
        {
          question: "What is an AI visual marketing generator?",
          answer:
            "An AI visual marketing generator creates high-converting visuals for promotional campaigns, websites, social media, and advertising materials using artificial intelligence.",
        },
        {
          question: "Can AI Image Generator be used for business imagery?",
          answer:
            "Yes. Optimark AI Image can generate professional visual assets tailored to your brand concepts, photography styles, and business needs.",
        },
        {
          question: "Is AI Image suitable for marketing requirements?",
          answer:
            "Yes. It empowers marketing teams to rapidly produce image assets for social channels, blogs, and ad campaigns without needing to design every asset from scratch.",
        },
        {
          question: "What are the advantages of an AI Image Generator for businesses?",
          answer:
            "It speeds up creative visual workflows, unlocks fresh design concepts, and supplies marketing assets seamlessly within your digital workflow.",
        },
      ],
    },
  },
  "ai-video": {
    id: {
      title: "Pertanyaan Umum tentang AI Video",
      items: [
        {
          question: "Apa itu AI Video Generator dan apa fungsinya?",
          answer:
            "AI Video Generator adalah tools berbasis artificial intelligence yang membantu membuat video berdasarkan instruksi, konsep, atau materi yang diberikan pengguna. Optimark AI Video membantu bisnis menghasilkan video untuk berbagai kebutuhan content marketing dengan proses yang lebih praktis.",
        },
        {
          question: "Apa itu AI Video Maker untuk konten?",
          answer:
            "AI Video Maker untuk konten adalah tools yang menggunakan AI untuk membantu membuat dan mengembangkan video untuk kebutuhan digital content. Optimark AI Video dapat digunakan untuk membantu menghasilkan video yang dapat mendukung aktivitas website, media sosial, campaign, dan pemasaran digital.",
        },
        {
          question: "Apakah AI Video Generator bisa digunakan untuk membuat video marketing?",
          answer:
            "Ya. Optimark AI Video Generator dapat membantu membuat video untuk berbagai kebutuhan marketing, seperti konten media sosial, promosi produk, campaign, dan komunikasi brand. AI membantu mempercepat proses produksi sehingga tim marketing dapat mengembangkan aset video dengan lebih efisien.",
        },
        {
          question: "Apakah AI Video cocok untuk kebutuhan bisnis?",
          answer:
            "Ya. AI Video dapat digunakan oleh bisnis untuk mengembangkan berbagai jenis konten video sesuai kebutuhan brand dan marketing. Penggunaan AI membantu bisnis mempercepat proses pembuatan video dan menghasilkan lebih banyak variasi konten untuk berbagai channel digital.",
        },
        {
          question: "Apa manfaat menggunakan AI Video Generator untuk bisnis?",
          answer:
            "AI Video Generator membantu bisnis menghemat waktu dalam proses produksi video, mengembangkan ide konten, dan membuat aset video untuk kebutuhan pemasaran digital. Dengan Optimark, pembuatan video menjadi bagian dari workflow digital marketing dalam satu platform.",
        },
      ],
    },
    en: {
      title: "Frequently Asked Questions about AI Video",
      items: [
        {
          question: "What is an AI Video Generator and what is its function?",
          answer:
            "An AI Video Generator uses artificial intelligence to produce videos based on user prompts, scripts, or concepts. Optimark AI Video enables businesses to generate videos for content marketing seamlessly.",
        },
        {
          question: "What is an AI Video Maker for content?",
          answer:
            "An AI Video Maker leverages AI to craft dynamic video content for websites, social media campaigns, and digital advertising channels.",
        },
        {
          question: "Can AI Video Generator create marketing videos?",
          answer:
            "Yes. Optimark AI Video creates marketing videos, product promos, campaign reels, and brand explainers, drastically speeding up video production.",
        },
        {
          question: "Is AI Video suitable for business demands?",
          answer:
            "Yes. Businesses can produce high-quality video content aligned with their brand voice, scaling output across multiple digital marketing channels.",
        },
        {
          question: "What are the benefits of an AI Video Generator for businesses?",
          answer:
            "It saves video production time, scales creative experimentation, and integrates video production directly into your marketing workflows.",
        },
      ],
    },
  },
};

export function getSeoFaq(key: SeoFaqKey, locale: "id" | "en" = "id"): PageSeoFaq {
  const entry = SEO_FAQ_DATA[key];
  if (!entry) {
    return { title: "", items: [] };
  }
  return entry[locale] || entry.id;
}
