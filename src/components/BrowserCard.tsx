import Link from "next/link";

import EngineBadge from "@/components/EngineBadge";
import StatusBadge from "@/components/StatusBadge";
import TypeBadge from "@/components/TypeBadge";
import { latestRelease } from "@/lib/browsers";
import type { Browser } from "@/lib/types";

export default function BrowserCard({ browser }: { browser: Browser }) {
  const latest = latestRelease(browser);

  return (
    <Link
      href={`/browsers/${browser.id}`}
      className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-4 transition hover:border-zinc-400 hover:shadow-sm dark:border-zinc-800 dark:hover:border-zinc-600"
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {browser.name}
        </h2>
        <TypeBadge type={browser.type} />
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        {latest?.engine && <EngineBadge engine={latest.engine} />}
        {latest && <StatusBadge status={latest.status} />}
        {browser.upstream && <span>upstream: {browser.upstream}</span>}
      </div>

      {latest && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Latest: v{latest.version}
          {latest.release_date ? ` · ${latest.release_date}` : ""}
        </p>
      )}
    </Link>
  );
}
