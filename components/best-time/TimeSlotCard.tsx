export type TimeSlot = {
  /** e.g. "Senin, 8 Juni" */
  date: string;
  /** e.g. "09:00" */
  time: string;
  /** Short highlight label, e.g. "Paling optimal". */
  tag: string;
  /** Supporting sentence under the tag. */
  description: string;
};

type TimeSlotCardProps = TimeSlot & {
  selected?: boolean;
  onSelect?: () => void;
};

/**
 * One recommended posting slot. Idle: neutral border. Selected: purple ring +
 * tint and the time turns purple. Clicking toggles the selection in the parent.
 */
export function TimeSlotCard({
  date,
  time,
  tag,
  description,
  selected = false,
  onSelect,
}: TimeSlotCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex h-full w-full flex-col rounded-xl border p-3 text-left transition ${
        selected
          ? "border-[#D444F1] bg-[#FDF4FF]"
          : "border-[#E9EAEB] bg-white hover:border-[#D5D7DA]"
      }`}
    >
      <span className="text-xs text-[#717680]">{date}</span>
      <span
        className={`mt-0.5 text-2xl font-bold leading-tight ${
          selected ? "text-[#BA24D5]" : "text-[#1E280E]"
        }`}
      >
        {time}
      </span>
      <span className="mt-1 text-xs font-semibold text-[#BA24D5]">{tag}</span>
      <span className="mt-1.5 text-xs leading-relaxed text-[#717680]">
        {description}
      </span>
    </button>
  );
}
