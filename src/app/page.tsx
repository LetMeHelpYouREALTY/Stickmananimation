import { HomePageJsonLd } from "@/components/seo/HomePageJsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import Home from "@/views/Home";

export const metadata = buildPageMetadata({
  title: "Animation Portfolio",
  description: siteConfig.description,
  path: "/",
});

export default function Page() {
  return (
    <>
      <HomePageJsonLd />
      <Home />
    </>
  );
}
