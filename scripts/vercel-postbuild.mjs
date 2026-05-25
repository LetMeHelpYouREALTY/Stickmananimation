/**
 * Vercel project settings may still point Output Directory at "dist" (legacy Vite).
 * Copy the Next.js build output so the deploy step finds routes-manifest.json.
 */
import { cpSync, rmSync, existsSync } from "node:fs";

if (!existsSync(".next/routes-manifest.json")) {
  console.error("vercel-postbuild: .next/routes-manifest.json not found");
  process.exit(1);
}

rmSync("dist", { recursive: true, force: true });
cpSync(".next", "dist", { recursive: true });
console.log("vercel-postbuild: copied .next → dist for Vercel output directory");
