"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import BrowserCard from "@/components/BrowserCard";
import FilterBar from "@/components/FilterBar";
import SearchInput from "@/components/SearchInput";
import { filterBrowsers, getAllEngines, getAllTypes } from "@/lib/browsers";
import type { Browser } from "@/lib/types";

export default function BrowserGrid({ browsers }: { browsers: Browser[] }) {
  const searchParams = useSearchParams();
  const types = useMemo(() => getAllTypes(), []);
  const engines = useMemo(() => getAllEngines(), []);

  const filtered = useMemo(
    () =>
      filterBrowsers(browsers, {
        type: searchParams.get("type"),
        engine: searchParams.get("engine"),
        q: searchParams.get("q"),
      }),
    [browsers, searchParams],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="sm:max-w-xs sm:flex-1">
          <SearchInput />
        </div>
        <FilterBar types={types} engines={engines} />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          조건에 맞는 브라우저가 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((browser) => (
            <BrowserCard key={browser.id} browser={browser} />
          ))}
        </div>
      )}
    </div>
  );
}
