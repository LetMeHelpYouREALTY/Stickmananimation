import type { NextConfig } from "next";

// Vercel project may still use Output Directory "dist" from the legacy Vite app.
// Build into dist on Vercel so routes-manifest.json is where the platform expects it.
const nextConfig: NextConfig = {
  ...(process.env.VERCEL === "1" ? { distDir: "dist" } : {}),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "files.keepingcurrentmatters.com" },
    ],
  },
};

export default nextConfig;
