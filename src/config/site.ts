/** Canonical site config for SEO, Search Console, and JSON-LD. */

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

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
