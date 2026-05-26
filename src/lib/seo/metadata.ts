import type { Metadata } from "next";
import { getSiteUrl, siteConfig } from "@/config/site";

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  ogImage?: string;
};

export function buildPageMetadata(options: PageMetadataOptions = {}): Metadata {
  const siteUrl = getSiteUrl();
  const title = options.title
    ? `${options.title} | ${siteConfig.name}`
    : `${siteConfig.legalName} | Animation Portfolio`;
  const description = options.description ?? siteConfig.description;
  const canonicalPath = options.path ?? "/";
  const canonical = `${siteUrl}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`;
  const ogImage = options.ogImage ?? `${siteUrl}/channels4-profile.jpg`;

  const verification: Metadata["verification"] = {};
  if (process.env.GOOGLE_SITE_VERIFICATION) {
    verification.google = process.env.GOOGLE_SITE_VERIFICATION;
  }

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.creator, url: siteConfig.youtube.url }],
    creator: siteConfig.creator,
    publisher: siteConfig.legalName,
    alternates: { canonical },
    robots: options.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: ogImage, alt: `${siteConfig.name} — ${siteConfig.creator}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    verification: Object.keys(verification).length > 0 ? verification : undefined,
  };
}

export const rootMetadata = buildPageMetadata();
