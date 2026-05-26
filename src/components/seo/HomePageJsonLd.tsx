import { getSiteUrl, siteConfig } from "@/config/site";
import { prepareStorage } from "@/lib/server/runtime";
import { storage } from "@/lib/server/storage";
import { JsonLd } from "./JsonLd";

export async function HomePageJsonLd() {
  const siteUrl = getSiteUrl();
  let featuredVideos: Awaited<ReturnType<typeof storage.getFeaturedVideos>> = [];

  try {
    await prepareStorage();
    featuredVideos = await storage.getFeaturedVideos();
  } catch {
    // Build or missing DATABASE_URL — emit site-level schema only
  }

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteUrl,
    logo: `${siteUrl}/channels4-profile.jpg`,
    email: siteConfig.email,
    sameAs: [siteConfig.youtube.url],
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: siteConfig.creator,
    url: siteUrl,
    email: siteConfig.email,
    jobTitle: "Animator",
    worksFor: { "@id": `${siteUrl}/#organization` },
    sameAs: [siteConfig.youtube.url],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.description,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en-US",
  };

  const videoObjects = featuredVideos.slice(0, 8).map((video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description ?? `${video.title} — animation by ${siteConfig.creator}`,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.publishedAt.toISOString(),
    contentUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
    embedUrl: `https://www.youtube.com/embed/${video.videoId}`,
    publisher: { "@id": `${siteUrl}/#organization` },
  }));

  return <JsonLd data={[organization, person, website, ...videoObjects]} />;
}
