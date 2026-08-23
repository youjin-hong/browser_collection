import { Suspense } from "react";

import BrowserGrid from "@/components/BrowserGrid";
import { dataMeta, getAllBrowsers } from "@/lib/browsers";

export default function Home() {
  const browsers = getAllBrowsers();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Browser Collection
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          MDN 호환성 표(
          <a
            href="https://github.com/mdn/browser-compat-data"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-zinc-800 dark:hover:text-zinc-200"
          >
            browser-compat-data
          </a>
          )에 등록된 {browsers.length}개 브라우저/런타임 카탈로그.
        </p>
      </header>

      <Suspense>
        <BrowserGrid browsers={browsers} />
      </Suspense>

      <footer className="mt-8 text-xs text-zinc-400 dark:text-zinc-600">
        Data: @mdn/browser-compat-data v{dataMeta.bcdVersion} · Generated{" "}
        {new Date(dataMeta.generatedAt).toISOString().slice(0, 10)}
      </footer>
    </div>
  );
}
