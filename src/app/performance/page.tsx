import { buildPageMetadata } from "@/lib/seo/metadata";
import PerformanceDemo from "@/views/PerformanceDemo";

export const metadata = buildPageMetadata({
  title: "Performance Demo",
  description: "Core Web Vitals monitoring demo for GK Animates.",
  path: "/performance",
  noIndex: true,
});

export default function PerformancePage() {
  return <PerformanceDemo />;
}
