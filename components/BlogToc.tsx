"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { BlogSlug } from "@/config/blog";
import { buildBlogToc } from "@/lib/blog";
import { scrollToElement } from "@/lib/lenis";
import type { BlogBlock, BlogTocItem } from "@/types/blog";
import { cx } from "@/utils/cx";

/** How far below the viewport top a heading counts as "being read". */
const ACTIVE_OFFSET = 160;

function useToc(slug: BlogSlug): BlogTocItem[] {
  const tPost = useTranslations(`blogPosts.${slug}`);
  return buildBlogToc(tPost.raw("blocks") as BlogBlock[]);
}

/**
 * The heading currently being read: the last one whose top has scrolled past
 * ACTIVE_OFFSET. Before the first heading nothing is active.
 */
function useActiveHeading(items: BlogTocItem[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const ids = items.map((item) => item.id).join("|");

  useEffect(() => {
    const targets = ids
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (targets.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string | null = null;
      for (const el of targets) {
        if (el.getBoundingClientRect().top - ACTIVE_OFFSET <= 0) current = el.id;
        else break;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}

function goTo(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  // Leave room for the fixed header (taller on tablet/mobile with the TOC bar).
  scrollToElement(target, window.matchMedia("(min-width: 1024px)").matches ? 112 : 160);
  history.replaceState(null, "", `#${id}`);
}

function TocList({
  items,
  active,
  onSelect,
}: {
  items: BlogTocItem[];
  active: string | null;
  onSelect?: () => void;
}) {
  return (
    <ul className="flex flex-col">
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                goTo(item.id);
                onSelect?.();
              }}
              aria-current={isActive ? "location" : undefined}
              className={cx(
                "block border-l-2 text-sm tracking-tight transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#94C748]",
                item.level === 2 ? "py-2 pl-3" : "py-1.5 pl-6",
                isActive
                  ? "border-[#94C748] font-semibold text-[#1E280E]"
                  : cx(
                      "border-[#E9EAEB] hover:text-[#252B37]",
                      item.level === 2 ? "text-[#535862]" : "text-[#717680]",
                    ),
              )}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Desktop "Daftar Isi": a sticky column beside the article. */
export function BlogToc({ slug, className }: { slug: BlogSlug; className?: string }) {
  const t = useTranslations("blog.post");
  const items = useToc(slug);
  const active = useActiveHeading(items);
  if (items.length === 0) return null;

  return (
    <nav aria-label={t("toc")} className={cx("flex flex-col gap-4", className)}>
      <p className="text-sm font-semibold tracking-tight text-[#94C748]">{t("toc")}</p>
      <TocList items={items} active={active} />
    </nav>
  );
}

/**
 * Tablet/mobile "Daftar Isi": a collapsible bar that sits inside the header
 * card (passed to Header as `subnav`), so it stays pinned under the top nav.
 * Picking an entry scrolls there and folds the panel back up.
 */
export function BlogTocBar({ slug }: { slug: BlogSlug }) {
  const t = useTranslations("blog.post");
  const items = useToc(slug);
  const active = useActiveHeading(items);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (items.length === 0) return null;

  return (
    <div ref={rootRef} className="bg-[#FAFAFA]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="blog-toc-panel"
        className="flex w-full items-center justify-between px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#94C748]"
      >
        <span className="text-md font-semibold tracking-tight text-[#1E280E]">{t("toc")}</span>
        <ChevronDown
          aria-hidden
          className={cx(
            "h-5 w-5 text-[#717680] transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="blog-toc-panel"
            aria-label={t("toc")}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              {/* Lenis would otherwise swallow wheel/touch scrolling inside the panel. */}
              <div
                data-lenis-prevent
                className="max-h-[60vh] overflow-y-auto rounded-xl border border-[#E9EAEB] bg-white p-3"
              >
                <TocList items={items} active={active} onSelect={() => setOpen(false)} />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
