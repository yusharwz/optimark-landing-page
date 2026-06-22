"use client";

import { useTranslations } from "next-intl";
import type { PrivacyBlock, PrivacyListItem } from "@/types/privacy-policy";
import { cx } from "@/utils/cx";

const paragraphClass = "text-base text-[#535862] sm:text-lg lg:mx-0";
const listClass = "text-base text-[#535862] sm:text-lg lg:mx-0";

function Paragraph({ block, index }: { block: Extract<PrivacyBlock, { type: "p" }>; index: number }) {
  if (block.html) {
    return (
      <p
        key={index}
        className={paragraphClass}
        dangerouslySetInnerHTML={{ __html: block.html }}
      />
    );
  }

  return (
    <p key={index} className={paragraphClass}>
      {block.text}
    </p>
  );
}

function ListItem({ item, index }: { item: PrivacyListItem; index: number }) {
  if (typeof item === "string") {
    return <li key={index}>{item}</li>;
  }

  return (
    <li key={index}>
      <span dangerouslySetInnerHTML={{ __html: item.html }} />
      {item.subitems ? (
        <ol className="pl-6">
          {item.subitems.map((sub, subIndex) => (
            <li key={subIndex}>{sub}</li>
          ))}
        </ol>
      ) : null}
    </li>
  );
}

export function PrivacyPolicyContent() {
  const t = useTranslations("privacyPolicy");
  const blocks = t.raw("blocks") as PrivacyBlock[];

  return (
    <section className="space-y-4">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={index} className="text-2xl font-semibold text-[#1E280E]">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={index} className="text-xl font-semibold text-[#1E280E]">
                {block.text}
              </h3>
            );
          case "p":
            return <Paragraph key={index} block={block} index={index} />;
          case "ul":
            return (
              <ul
                key={index}
                className={cx(listClass, index > 0 && "space-y-2")}
              >
                {block.items.map((item, itemIndex) => (
                  <ListItem key={itemIndex} item={item} index={itemIndex} />
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </section>
  );
}
