import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/lib/locale";
import { buildOgImageUrl } from "@/lib/og";
import { BLOG_AUTHOR_IDS, isBlogAuthorId } from "@/config/blog";
import { Header } from "@/components/Header";
import { BlogProfileView } from "@/components/BlogProfileView";
import { Footer } from "@/components/Footer";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => BLOG_AUTHOR_IDS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);
  if (!isBlogAuthorId(slug)) return {};

  const tProfile = await getTranslations({ locale, namespace: "blog.profile" });
  const tPerson = await getTranslations({ locale, namespace: `blogPeople.authors.${slug}` });

  const title = tProfile("authorMetaTitle", { name: tPerson("name") });
  const description = tPerson("bio");
  const ogImage = buildOgImageUrl({ title, description, locale });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      images: [
        {
          url: ogImage,
          secureUrl: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default async function BlogAuthorPage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  setRequestLocale(resolveLocale(localeParam));

  if (!isBlogAuthorId(slug)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="relative pt-24">
        <BlogProfileView kind="author" id={slug} />
      </main>
      <Footer />
    </div>
  );
}
