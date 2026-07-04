/** Loading placeholder for a single slot card (shown while "analyzing"). */
export function TimeSlotSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-xl border border-[#E9EAEB] bg-white p-3">
      <div className="h-2.5 w-1/2 animate-pulse rounded bg-gray-200" />
      <div className="mt-2 h-2.5 w-2/3 animate-pulse rounded bg-gray-200" />
      <div className="mt-4 space-y-1.5">
        <div className="h-2 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-2 w-5/6 animate-pulse rounded bg-gray-100" />
        <div className="h-2 w-3/4 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  );
}
