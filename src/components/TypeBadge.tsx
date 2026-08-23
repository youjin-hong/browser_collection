import type { BrowserType } from "@/lib/types";

const LABELS: Record<BrowserType, string> = {
  desktop: "Desktop",
  mobile: "Mobile",
  server: "Server",
  xr: "XR",
};

export default function TypeBadge({ type }: { type: BrowserType }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-300 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
      {LABELS[type]}
    </span>
  );
}
