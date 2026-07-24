"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Info } from "lucide-react";
import { TimeSlotCard, type TimeSlot } from "./TimeSlotCard";
import { TimeSlotSkeleton } from "./TimeSlotSkeleton";

type TimeResultPanelProps = {
  heading?: string;
  slots?: TimeSlot[];
  /** loading → skeleton cards; done → real, selectable cards. */
  status?: "loading" | "done";
  /** Index of the selected slot, or null when nothing is picked yet. */
  selectedIndex?: number | null;
  onSelect?: (index: number) => void;
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/**
 * Bottom section: the recommended posting slots in a 3-up row. While `status`
 * is "loading" it shows skeleton placeholders; when "done" the real cards
 * cascade in and the user picks one (purple highlight) to enable "Simpan".
 */
export function TimeResultPanel({
  heading,
  slots,
  status = "done",
  selectedIndex = null,
  onSelect,
}: TimeResultPanelProps) {
  const t = useTranslations("bestTimeModal");
  const resolvedSlots = slots ?? (t.raw("slots") as TimeSlot[]);
  const loading = status === "loading";
  const hasSelection = selectedIndex !== null;

  return (
    <div className="border-t border-[#E9EAEB] p-5">
      <div className="flex items-center gap-1.5">
        <p className="text-sm font-semibold text-[#1E280E]">{heading ?? t("heading")}</p>
        <Info className="h-3.5 w-3.5 text-[#A4A7AE]" />
      </div>

      {loading ? (
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <TimeSlotSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {resolvedSlots.map((slot, i) => (
            <motion.div key={`${slot.date}-${slot.time}`} variants={item} className="h-full">
              <TimeSlotCard
                {...slot}
                selected={selectedIndex === i}
                onSelect={() => onSelect?.(i)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          className="rounded-lg border border-[#D5D7DA] bg-white px-4 py-2 text-sm font-semibold text-[#414651] transition hover:bg-gray-50"
        >
          {t("cancel")}
        </button>
        <button
          type="button"
          disabled={!hasSelection || loading}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            hasSelection && !loading
              ? "bg-[#94C748] text-[#1E280E] hover:brightness-95"
              : "cursor-not-allowed bg-gray-100 text-gray-400"
          }`}
        >
          {t("save")}
        </button>
      </div>
    </div>
  );
}
