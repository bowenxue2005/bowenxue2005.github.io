import type { NextConfig } from "next";

// These two were previously injected only by the GitHub Pages workflow
// (actions/configure-pages with static_site_generator: next), so a local
// `next build` ran in a different mode than CI and could not catch
// export-only errors. Declaring them here makes local builds match the
// deploy exactly.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
