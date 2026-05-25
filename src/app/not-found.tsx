import { buildPageMetadata } from "@/lib/seo/metadata";
import NotFound from "@/views/not-found";

export const metadata = buildPageMetadata({
  title: "Page Not Found",
  description: "The page you requested could not be found.",
  noIndex: true,
});

export default function NotFoundPage() {
  return <NotFound />;
}
