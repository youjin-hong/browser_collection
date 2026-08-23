import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

import bcd from "@mdn/browser-compat-data" with { type: "json" };

import type { Browser, BrowsersData, Release } from "../src/lib/types.ts";

const require = createRequire(import.meta.url);
const bcdEntry = require.resolve("@mdn/browser-compat-data");
const bcdDir = path.dirname(bcdEntry);
const bcdPkg = JSON.parse(
  fs.readFileSync(path.join(bcdDir, "package.json"), "utf8"),
) as { version: string };

function compareVersions(a: string, b: string): number {
  const aParts = a.split(".").map(Number);
  const bParts = b.split(".").map(Number);
  const len = Math.max(aParts.length, bParts.length);
  for (let i = 0; i < len; i++) {
    const diff = (aParts[i] ?? 0) - (bParts[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

const browsers: Browser[] = Object.entries(bcd.browsers)
  .map(([id, raw]) => {
    const releases: Release[] = Object.entries(raw.releases)
      .map(([version, release]) => ({
        version,
        ...release,
      }))
      .sort((a, b) => compareVersions(a.version, b.version));

    return {
      id,
      name: raw.name,
      type: raw.type,
      upstream: raw.upstream,
      accepts_flags: raw.accepts_flags,
      accepts_webextensions: raw.accepts_webextensions,
      pref_url: raw.pref_url,
      preview_name: raw.preview_name,
      releases,
    } as Browser;
  })
  .sort((a, b) => a.id.localeCompare(b.id));

const data: BrowsersData = {
  meta: {
    bcdVersion: bcdPkg.version,
    generatedAt: new Date().toISOString(),
  },
  browsers,
};

const outPath = path.resolve(import.meta.dirname, "../src/data/browsers.generated.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(data, null, 2) + "\n");

console.log(
  `Synced ${browsers.length} browsers from @mdn/browser-compat-data@${bcdPkg.version} -> ${path.relative(process.cwd(), outPath)}`,
);
