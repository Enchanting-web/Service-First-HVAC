import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack ignores unrelated lockfiles above it.
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;

// Bindings for `next dev` only. Do not run during `next build` (Appwrite and
// other Node hosts) — this pulls in Wrangler/miniflare and can fail CI.
if (process.argv.includes("dev")) {
  initOpenNextCloudflareForDev();
}
