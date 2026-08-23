import EngineBadge from "@/components/EngineBadge";
import StatusBadge from "@/components/StatusBadge";
import type { Release } from "@/lib/types";

export default function ReleaseTimeline({ releases }: { releases: Release[] }) {
  const ordered = [...releases].reverse();

  return (
    <ol className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800">
      {ordered.map((release) => (
        <li key={release.version} className="flex flex-wrap items-center gap-3 py-3">
          <span className="w-16 shrink-0 font-mono text-sm font-medium text-zinc-900 dark:text-zinc-100">
            v{release.version}
          </span>
          <StatusBadge status={release.status} />
          {release.engine && (
            <EngineBadge engine={release.engine} />
          )}
          {release.engine_version && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              engine {release.engine_version}
            </span>
          )}
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {release.release_date ?? "날짜 미상"}
          </span>
          {release.release_notes && (
            <a
              href={release.release_notes}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-600 underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              릴리즈 노트
            </a>
          )}
        </li>
      ))}
    </ol>
  );
}
