import data from "@/data/browsers.generated.json";
import type { Browser, BrowserId, BrowserType, Engine } from "@/lib/types";

const typedData = data as {
  meta: { bcdVersion: string; generatedAt: string };
  browsers: Browser[];
};

export const dataMeta = typedData.meta;

export function getAllBrowsers(): Browser[] {
  return typedData.browsers;
}

export function getBrowserById(id: BrowserId): Browser | undefined {
  return typedData.browsers.find((b) => b.id === id);
}

export function getAllTypes(): BrowserType[] {
  return Array.from(new Set(typedData.browsers.map((b) => b.type))).sort();
}

export function getAllEngines(): Engine[] {
  const engines = new Set<Engine>();
  for (const b of typedData.browsers) {
    const latest = b.releases[b.releases.length - 1];
    if (latest?.engine) engines.add(latest.engine);
  }
  return Array.from(engines).sort();
}

export function latestRelease(browser: Browser) {
  return browser.releases[browser.releases.length - 1];
}

export function filterBrowsers(
  browsers: Browser[],
  filters: { type?: string | null; engine?: string | null; q?: string | null },
): Browser[] {
  return browsers.filter((b) => {
    if (filters.type && b.type !== filters.type) return false;
    if (filters.engine) {
      const engine = latestRelease(b)?.engine;
      if (engine !== filters.engine) return false;
    }
    if (filters.q) {
      const q = filters.q.trim().toLowerCase();
      if (q && !b.name.toLowerCase().includes(q) && !b.id.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });
}
