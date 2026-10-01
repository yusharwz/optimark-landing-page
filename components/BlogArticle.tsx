"use client";

import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Lightbulb } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { BlogSlug } from "@/config/blog";
import { buildBlogToc } from "@/lib/blog";
import type { BlogBlock } from "@/types/blog";
import { cx } from "@/utils/cx";

/**
 * Renders a post body from its message blocks.
 *
 * Translators supply text only — every class here is decided by this renderer.
 * That is deliberate: it keeps markup out of the JSON and keeps typography
 * consistent across posts. Sizes and spacing follow the Figma "Blog Post"
 * rich-text frame: 18/28 body, 24/32 h2, 20/30 h3 (one step smaller on phones).
 */
export function BlogArticle({ slug }: { slug: BlogSlug }) {
  const tPost = useTranslations(`blogPosts.${slug}`);
  const blocks = tPost.raw("blocks") as BlogBlock[];

  // Heading ids come from the same builder as the "Daftar Isi", so every TOC
  // link has a matching target.
  const toc = buildBlogToc(blocks);
  let headingIndex = 0;

  return (
    <div>
      {blocks.map((block, index) => {
        const id =
          block.type === "h2" || block.type === "h3" ? toc[headingIndex++]?.id : undefined;
        return (
          <Fragment key={index}>
            {renderBlock(block, blocks[index - 1], index === 0, id)}
          </Fragment>
        );
      })}
    </div>
  );
}

const body = "text-lg leading-7 tracking-tight text-[#535862]";

/**
 * Top margin per block, from the gaps in the design: 24px before a section
 * heading, 12px between blocks inside a section, 8px under an h3, and 20px
 * around a figure.
 */
function spacing(block: BlogBlock, previous: BlogBlock | undefined): string {
  if (!previous) return "";
  if (block.type === "h2" || block.type === "h3") return "mt-6";
  if (block.type === "figure" || previous.type === "figure") return "mt-5";
  if (previous.type === "h3") return "mt-2";
  return "mt-3";
}

function renderBlock(
  block: BlogBlock,
  previous: BlogBlock | undefined,
  first: boolean,
  id: string | undefined,
) {
  const mt = first ? "" : spacing(block, previous);
  // Headings scroll into view below the fixed header (and the TOC bar on
  // tablet/mobile), so they need room above them.
  const anchor = "scroll-mt-40 lg:scroll-mt-28";

  switch (block.type) {
    case "h2":
      return (
        <h2
          id={id}
          className={cx(
            anchor,
            mt,
            "text-xl leading-7.5 font-semibold tracking-tight text-[#1E280E] sm:text-2xl sm:leading-8",
          )}
        >
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3
          id={id}
          className={cx(
            anchor,
            mt,
            "text-lg leading-7 font-semibold tracking-tight text-[#1E280E] sm:text-xl sm:leading-7.5",
          )}
        >
          {block.text}
        </h3>
      );

    case "p":
      return <p className={cx(mt, body)}>{renderInline(block.text)}</p>;

    case "ul":
      return (
        <ul className={cx(mt, body, "flex flex-col gap-2")}>
          {block.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden className="w-4 shrink-0 text-center">
                •
              </span>
              <span className="min-w-0 flex-1">{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol className={cx(mt, body, "flex flex-col gap-2")}>
          {block.items.map((item, index) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden className="w-5 shrink-0">
                {index + 1}.
              </span>
              <span className="min-w-0 flex-1">{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );

    case "figure":
      return (
        <figure className={cx(mt, "flex flex-col gap-3")}>
          <div className="relative h-50 overflow-hidden rounded-2xl border-[0.5px] border-black/10 sm:h-90">
            <Image
              src={block.image}
              alt={block.caption ?? ""}
              fill
              sizes="(min-width: 768px) 680px, 100vw"
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="text-sm tracking-tight text-[#717680]">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "quote":
      return (
        <blockquote className={cx(mt, "flex flex-col gap-3 border-l-2 border-[#94C748] py-2 pl-5")}>
          <p className="text-xl leading-7.5 font-medium tracking-tight text-[#1E280E]">
            {block.text}
          </p>
          {block.cite && (
            <footer className="text-base tracking-tight text-[#717680]">— {block.cite}</footer>
          )}
        </blockquote>
      );

    case "callout":
      return (
        <aside className={cx(mt, "rounded-2xl border border-[#94C748]/25 bg-[#F8FDF1] p-6")}>
          <div className="flex items-center gap-2.5">
            <Lightbulb className="h-4 w-4 shrink-0 text-[#94C748]" aria-hidden />
            <p className="text-sm font-semibold text-[#1E280E]">{block.title}</p>
          </div>
          <p className="mt-2.5 text-base tracking-tight text-[#535862]">{block.text}</p>
        </aside>
      );
  }
}

const LINK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const linkClass =
  "rounded-sm text-[#59772B] underline underline-offset-2 transition-colors hover:text-[#3F5B17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748]";

/**
 * Turns `[label](href)` in copy into links. Site paths go through the locale-
 * aware Link so `/blog/...` keeps the reader's language; anything else opens in
 * a new tab.
 */
function renderInline(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK_PATTERN)) {
    const [whole, label, href] = match;
    const start = match.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    parts.push(
      href.startsWith("/") ? (
        <Link key={start} href={href} className={linkClass}>
          {label}
        </Link>
      ) : (
        <a key={start} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {label}
        </a>
      ),
    );
    last = start + whole.length;
  }
  if (parts.length === 0) return text;
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
