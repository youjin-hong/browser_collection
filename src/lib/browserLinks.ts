import type { BrowserId } from "@/lib/types";

/**
 * Official site / download links, keyed by BCD browser id.
 * Not part of @mdn/browser-compat-data — curated manually since BCD has no
 * such field. Omit an id if there's no separate install (e.g. it's a system
 * component bundled with the OS and has no standalone download page).
 */
export const OFFICIAL_LINKS: Partial<Record<BrowserId, string>> = {
  chrome: "https://www.google.com/chrome/",
  firefox: "https://www.mozilla.org/firefox/new/",
  safari: "https://www.apple.com/safari/",
  edge: "https://www.microsoft.com/edge",
  opera: "https://www.opera.com/",
  ie: "https://www.microsoft.com/en-us/edge/internet-explorer",
  chrome_android: "https://play.google.com/store/apps/details?id=com.android.chrome",
  firefox_android: "https://play.google.com/store/apps/details?id=org.mozilla.firefox",
  safari_ios: "https://www.apple.com/safari/",
  webview_android:
    "https://play.google.com/store/apps/details?id=com.google.android.webview",
  samsunginternet_android:
    "https://play.google.com/store/apps/details?id=com.sec.android.app.sbrowser",
  opera_android: "https://play.google.com/store/apps/details?id=com.opera.browser",
  oculus: "https://www.meta.com/help/quest/articles/getting-started/getting-started-with-quest-2/browser-on-quest/",
  bun: "https://bun.sh",
  deno: "https://deno.com",
  nodejs: "https://nodejs.org",
  // webview_ios has no standalone entry point (WKWebView is embedded-only) — omitted.
};

export function getOfficialLink(id: BrowserId): string | undefined {
  return OFFICIAL_LINKS[id];
}
