"use client";

import { motion, type Variants } from "framer-motion";
import { AlignLeft, Check, Hash, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";

type ResultPanelProps = {
  lines?: string[];
  hashtags?: string;
  /** When true, the generated content + icons fade/slide in (staggered). */
  revealed?: boolean;
};

const REFINE_CHIPS = [
  { icon: AlignLeft, label: "Lebih pendek" },
  { icon: Sparkles, label: "Lebih persuasif" },
  { icon: Hash, label: "Tambah hashtag" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/**
 * Right column: the generated caption. Before `revealed` it is an empty purple
 * box (content is present but at opacity 0, so height stays stable). On reveal,
 * lines / hashtags / icons cascade in. The "Terapkan" button is disabled until
 * generation finishes.
 */
export function ResultPanel({
  lines = [
    "🌱 Pagi lebih ringan, lebih semangat sejak rutin minum FlimtyFiber! ✨",
    "Pencernaan lancar, nggak gampang lapar, perut nggak begah — semua karena 1 kebiasaan kecil setiap pagi.",
    "Mau coba juga? Cek link di bio! 👆",
  ],
  hashtags = "#FlimtyFiber #FlimtyID #HidupSehat #FiberHarian #PencernaanLancar #MorningRoutine #BodyGoals",
  revealed = false,
}: ResultPanelProps) {
  return (
    <div className="flex flex-col p-4">
      <p className="text-xs text-[#535862]">Hasil Generate</p>

      <motion.div
        className="mt-2 min-h-[140px] space-y-2 rounded-xl bg-[#FDF4FF] p-3"
        variants={container}
        initial="hidden"
        animate={revealed ? "show" : "hidden"}
      >
        {lines.map((line, i) => (
          <motion.p
            key={i}
            variants={item}
            className="ai-caption__line text-xs leading-relaxed text-[#414651]"
          >
            {line}
          </motion.p>
        ))}

        <motion.p
          variants={item}
          className="ai-caption__hashtags text-xs leading-relaxed text-[#414651]"
        >
          {hashtags}
        </motion.p>

        <motion.div variants={item} className="flex items-center gap-2.5 pt-0.5">
          <ThumbsUp className="h-3.5 w-3.5 text-[#A4A7AE]" />
          <ThumbsDown className="h-3.5 w-3.5 text-[#A4A7AE]" />
        </motion.div>

        <motion.div variants={item} className="flex flex-wrap gap-1">
          {REFINE_CHIPS.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1 rounded-full border border-[#E9EAEB] bg-white px-2 py-1 text-[10px] text-[#414651]"
            >
              <Icon className="h-3 w-3 text-[#BA24D5]" />
              {label}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <div className="mt-2.5 flex justify-end">
        <button
          type="button"
          disabled={!revealed}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            revealed
              ? "bg-[#94C748] text-[#1E280E] hover:brightness-95"
              : "cursor-not-allowed bg-gray-100 text-gray-400"
          }`}
        >
          <Check className="h-3.5 w-3.5" />
          Terapkan
        </button>
      </div>
    </div>
  );
}
