import type { ReleaseStatus } from "@/lib/types";

const STYLES: Record<ReleaseStatus, string> = {
  current: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  beta: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300",
  nightly: "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300",
  esr: "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300",
  planned: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  retired: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
};

const LABELS: Record<ReleaseStatus, string> = {
  current: "Current",
  beta: "Beta",
  nightly: "Nightly",
  esr: "ESR",
  planned: "Planned",
  retired: "Retired",
};

export default function StatusBadge({ status }: { status: ReleaseStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
