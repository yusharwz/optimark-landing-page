import type { BlogBlock } from "@/types/blog";

export function markdownToBlocks(markdown: string): BlogBlock[] {
  if (!markdown) return [];

  const lines = markdown.split("\n");
  const blocks: BlogBlock[] = [];
  let currentParagraph: string[] = [];
  let currentUl: string[] = [];
  let currentOl: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ").trim();
      if (text) {
        blocks.push({ type: "p", text });
      }
      currentParagraph = [];
    }
  };

  const flushUl = () => {
    if (currentUl.length > 0) {
      blocks.push({ type: "ul", items: [...currentUl] });
      currentUl = [];
    }
  };

  const flushOl = () => {
    if (currentOl.length > 0) {
      blocks.push({ type: "ol", items: [...currentOl] });
      currentOl = [];
    }
  };

  const flushAll = () => {
    flushParagraph();
    flushUl();
    flushOl();
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushAll();
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushAll();
      blocks.push({ type: "h3", text: trimmed.replace(/^###\s+/, "") });
    } else if (trimmed.startsWith("## ")) {
      flushAll();
      blocks.push({ type: "h2", text: trimmed.replace(/^##\s+/, "") });
    } else if (trimmed.startsWith("# ")) {
      flushAll();
      blocks.push({ type: "h2", text: trimmed.replace(/^#\s+/, "") });
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      flushParagraph();
      flushOl();
      currentUl.push(trimmed.replace(/^[-*]\s+/, ""));
    } else if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph();
      flushUl();
      currentOl.push(trimmed.replace(/^\d+\.\s+/, ""));
    } else if (trimmed.startsWith("> ")) {
      flushAll();
      const quoteText = trimmed.replace(/^>\s+/, "");
      if (quoteText.startsWith("**") && quoteText.includes(":**")) {
        const titleMatch = quoteText.match(/^\*\*(.*?):\*\*\s*(.*)$/);
        if (titleMatch) {
          blocks.push({
            type: "callout",
            title: titleMatch[1].trim(),
            text: titleMatch[2].trim(),
          });
          continue;
        }
      }
      blocks.push({ type: "quote", text: quoteText });
    } else if (trimmed.includes("![") && /!\[(.*?)\]\((.*?)\)/.test(trimmed)) {
      const imgMatch = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
      if (imgMatch && imgMatch.index !== undefined) {
        const before = trimmed.substring(0, imgMatch.index).trim();
        const after = trimmed.substring(imgMatch.index + imgMatch[0].length).trim();
        if (before) currentParagraph.push(before);
        flushAll();
        blocks.push({
          type: "figure",
          caption: imgMatch[1] || undefined,
          image: imgMatch[2],
        });
        if (after) currentParagraph.push(after);
      } else {
        currentParagraph.push(trimmed);
      }
    } else if (/<img[^>]+src=["']/i.test(trimmed)) {
      const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
      const altMatch = trimmed.match(/alt=["']([^"']*)["']/i);
      if (srcMatch) {
        flushAll();
        blocks.push({
          type: "figure",
          caption: altMatch ? altMatch[1] : undefined,
          image: srcMatch[1],
        });
      } else {
        currentParagraph.push(trimmed);
      }
    } else {
      flushUl();
      flushOl();
      currentParagraph.push(trimmed);
    }
  }

  flushAll();
  return blocks;
}
