import Link from "next/link";
import { notFound } from "next/navigation";

import EngineBadge from "@/components/EngineBadge";
import ReleaseTimeline from "@/components/ReleaseTimeline";
import StatusBadge from "@/components/StatusBadge";
import TypeBadge from "@/components/TypeBadge";
import { getAllBrowsers, getBrowserById, latestRelease } from "@/lib/browsers";
import type { BrowserId } from "@/lib/types";

export function generateStaticParams() {
  return getAllBrowsers().map((b) => ({ id: b.id }));
}

export const dynamicParams = false;

export default async function BrowserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const browser = getBrowserById(id as BrowserId);

  if (!browser) {
    notFound();
  }

  const latest = latestRelease(browser);
  const upstream = browser.upstream ? getBrowserById(browser.upstream) : undefined;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-12">
      <Link
        href="/"
        className="text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        ← 카탈로그로 돌아가기
      </Link>

      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {browser.name}
          </h1>
          <TypeBadge type={browser.type} />
          {latest?.engine && <EngineBadge engine={latest.engine} />}
          {latest && <StatusBadge status={latest.status} />}
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400 sm:grid-cols-4">
          <div>
            <dt className="text-xs text-zinc-400 dark:text-zinc-500">Flags</dt>
            <dd>{browser.accepts_flags ? "지원" : "미지원"}</dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-400 dark:text-zinc-500">WebExtensions</dt>
            <dd>{browser.accepts_webextensions ? "지원" : "미지원"}</dd>
          </div>
          {browser.preview_name && (
            <div>
              <dt className="text-xs text-zinc-400 dark:text-zinc-500">Preview</dt>
              <dd>{browser.preview_name}</dd>
            </div>
          )}
          {upstream && (
            <div>
              <dt className="text-xs text-zinc-400 dark:text-zinc-500">Upstream</dt>
              <dd>
                <Link href={`/browsers/${upstream.id}`} className="underline hover:text-zinc-900 dark:hover:text-zinc-100">
                  {upstream.name}
                </Link>
              </dd>
            </div>
          )}
          {browser.pref_url && (
            <div>
              <dt className="text-xs text-zinc-400 dark:text-zinc-500">Flags URL</dt>
              <dd className="font-mono">{browser.pref_url}</dd>
            </div>
          )}
        </dl>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          출시 이력 ({browser.releases.length}개)
        </h2>
        <ReleaseTimeline releases={browser.releases} />
      </section>
    </div>
  );
}
