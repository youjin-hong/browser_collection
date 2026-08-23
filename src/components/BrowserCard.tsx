import Link from "next/link";

import EngineBadge from "@/components/EngineBadge";
import StatusBadge from "@/components/StatusBadge";
import TypeBadge from "@/components/TypeBadge";
import { latestRelease } from "@/lib/browsers";
import { getOfficialLink } from "@/lib/browserLinks";
import type { Browser } from "@/lib/types";

export default function BrowserCard({ browser }: { browser: Browser }) {
  const latest = latestRelease(browser);
  const officialLink = getOfficialLink(browser.id);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-4 transition hover:border-zinc-400 hover:shadow-sm dark:border-zinc-800 dark:hover:border-zinc-600">
      <div className="flex items-start justify-between gap-2">
        <Link
          href={`/browsers/${browser.id}`}
          className="text-lg font-semibold text-zinc-900 hover:underline dark:text-zinc-50"
        >
          {browser.name}
        </Link>
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

      <div className="mt-1 flex items-center gap-4 text-sm">
        <Link
          href={`/browsers/${browser.id}`}
          className="font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          상세 보기
        </Link>
        {officialLink && (
          <a
            href={officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-600 underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            브라우저 열기 ↗
          </a>
        )}
      </div>
    </div>
  );
}
