/** Canonical site config for SEO, Search Console, and JSON-LD. */

/** Production domain for canonical URLs, OG tags, and sitemap (not preview deploy URLs). */
export const canonicalSiteUrl = "https://www.stickmananimations.com";

export const siteConfig = {
  name: "GK Animates",
  legalName: "GK Animates by Gene Kelly Boyle",
  tagline: "Animation portfolio — Stickman Epic Legends and motion design",
  description:
    "Professional animation portfolio by Gene Kelly Boyle. Character animation, motion graphics, stickman series, and short films on YouTube.",
  creator: "Gene Kelly Boyle",
  email: "genekellyboyle@gmail.com",
  locale: "en_US",
  themeColor: "#00BFA6",
  youtube: {
    channelId: "UC_WllVNTkI50BEXRYkmVGRw",
    handle: "@genekellyboyle",
    url: "https://www.youtube.com/@genekellyboyle",
  },
  keywords: [
    "Gene Kelly Boyle",
    "GK Animates",
    "animation portfolio",
    "stickman animation",
    "Stickman Epic Legends",
    "motion graphics",
    "character animation",
    "YouTube animator",
  ],
} as const;

function normalizeSiteUrl(url: string): string {
  const trimmed = url.replace(/\/$/, "");
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
}

/**
 * Canonical origin for metadata, sitemap, and JSON-LD.
 * Never uses VERCEL_URL — that is a per-deployment hostname (preview URLs break OG/social cards).
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  }
  if (process.env.VERCEL) {
    return canonicalSiteUrl;
  }
  return "http://localhost:3000";
}
