import type { Engine } from "@/lib/types";

const STYLES: Record<Engine, string> = {
  Blink: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  WebKit: "bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300",
  Gecko: "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300",
  EdgeHTML: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
  Trident: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
  Presto: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-950 dark:text-fuchsia-300",
  V8: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
};

export default function EngineBadge({ engine }: { engine: Engine }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STYLES[engine]}`}
    >
      {engine}
    </span>
  );
}
