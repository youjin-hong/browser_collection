"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { Engine } from "@/lib/types";

const TYPE_LABELS: Record<string, string> = {
  desktop: "Desktop",
  mobile: "Mobile",
  server: "Server",
  xr: "XR",
};

export default function FilterBar({
  types,
  engines,
}: {
  types: string[];
  engines: Engine[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeType = searchParams.get("type");
  const activeEngine = searchParams.get("engine");
  const hasFilters = Boolean(activeType || activeEngine || searchParams.get("q"));

  function toggleParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function clearAll() {
    router.replace(pathname, { scroll: false });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Type</span>
        {types.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => toggleParam("type", type)}
            className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${
              activeType === type
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-300 text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300"
            }`}
          >
            {TYPE_LABELS[type] ?? type}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Engine</span>
        {engines.map((engine) => (
          <button
            key={engine}
            type="button"
            onClick={() => toggleParam("engine", engine)}
            className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${
              activeEngine === engine
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-300 text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300"
            }`}
          >
            {engine}
          </button>
        ))}

        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="ml-1 text-xs font-medium text-zinc-500 underline hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            필터 초기화
          </button>
        )}
      </div>
    </div>
  );
}
