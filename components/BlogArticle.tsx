"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { Lightbulb } from "lucide-react";
import type { BlogSlug } from "@/config/blog";
import type { BlogBlock } from "@/types/blog";

/**
 * Renders a post body from its message blocks.
 *
 * Translators supply text only — every class here, including the Clarity Ladder
 * levels (DESIGN.md §2.2), is decided by this renderer. That is deliberate: it
 * keeps markup out of the JSON and keeps typography consistent across posts.
 */
export function BlogArticle({ slug }: { slug: BlogSlug }) {
  const tPost = useTranslations(`blogPosts.${slug}`);
  const blocks = tPost.raw("blocks") as BlogBlock[];

  return (
    <div className="mt-10">
      {blocks.map((block, index) => (
        <Fragment key={index}>{renderBlock(block)}</Fragment>
      ))}
    </div>
  );
}

function renderBlock(block: BlogBlock) {
  switch (block.type) {
    case "h2":
      return <h2 className="text-display mt-12 text-2xl lg:text-3xl">{block.text}</h2>;

    case "p":
      return <p className="text-lead mt-5 text-base lg:text-lg">{block.text}</p>;

    case "ul":
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="text-lead flex gap-3 text-base lg:text-lg">
              <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#94C748]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol className="mt-5 space-y-3">
          {block.items.map((item, index) => (
            <li key={item} className="text-lead flex gap-3 text-base lg:text-lg">
              <span
                aria-hidden
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#94C748]/12 text-xs font-semibold text-[#1E280E]"
              >
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );

    case "quote":
      return (
        <blockquote className="mt-10 border-l-2 border-[#94C748] pl-6">
          <p className="text-display text-lg leading-relaxed lg:text-xl">{block.text}</p>
        </blockquote>
      );

    case "callout":
      return (
        <aside className="mt-10 rounded-2xl border border-[#94C748]/25 bg-[#F8FDF1] p-6">
          <div className="flex items-center gap-2.5">
            <Lightbulb className="h-4 w-4 shrink-0 text-[#94C748]" aria-hidden />
            <p className="text-display text-sm">{block.title}</p>
          </div>
          <p className="text-lead mt-2.5 text-sm lg:text-base">{block.text}</p>
        </aside>
      );
  }
}
