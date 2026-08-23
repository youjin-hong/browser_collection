export type BrowserId =
  | "bun"
  | "chrome"
  | "chrome_android"
  | "deno"
  | "edge"
  | "firefox"
  | "firefox_android"
  | "ie"
  | "nodejs"
  | "oculus"
  | "opera"
  | "opera_android"
  | "safari"
  | "safari_ios"
  | "samsunginternet_android"
  | "webview_android"
  | "webview_ios";

export type BrowserType = "desktop" | "mobile" | "server" | "xr";

export type ReleaseStatus =
  | "retired"
  | "current"
  | "beta"
  | "nightly"
  | "esr"
  | "planned";

export type Engine =
  | "Blink"
  | "EdgeHTML"
  | "Gecko"
  | "Presto"
  | "Trident"
  | "WebKit"
  | "V8";

export interface Release {
  version: string;
  status: ReleaseStatus;
  release_date?: string;
  release_notes?: string;
  engine?: Engine;
  engine_version?: string;
}

export interface Browser {
  id: BrowserId;
  name: string;
  type: BrowserType;
  upstream?: BrowserId;
  accepts_flags: boolean;
  accepts_webextensions: boolean;
  pref_url?: string;
  preview_name?: string;
  releases: Release[];
}

export interface BrowsersData {
  meta: {
    bcdVersion: string;
    generatedAt: string;
  };
  browsers: Browser[];
}
