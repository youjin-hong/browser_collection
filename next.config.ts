import type { NextConfig } from "next";

// Must match the GitHub repository name exactly for project-page deploys
// (https://<user>.github.io/<repoName>/).
const repoName = "browser_collection";
const isCI = process.env.GITHUB_ACTIONS === "true";
const basePath = isCI ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
};

export default nextConfig;
