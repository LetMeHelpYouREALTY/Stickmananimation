import type { Viewport } from "next";
import { rootMetadata } from "@/lib/seo/metadata";
import { Providers } from "./providers";
import "./globals.css";

export const metadata = rootMetadata;

export const viewport: Viewport = {
  themeColor: "#00BFA6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
