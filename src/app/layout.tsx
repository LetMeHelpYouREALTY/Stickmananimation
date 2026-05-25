import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'GK Animates by Gene Kelly Boyle | Animation Portfolio',
  description:
    'Professional animation portfolio showcasing the work of Gene Kelly Boyle, animator and storyteller. Explore character animations, motion graphics, and short films.',
  icons: {
    icon: '/channels4-profile.jpg',
    apple: '/channels4-profile.jpg',
  },
  openGraph: {
    title: 'GK Animates by Gene Kelly Boyle',
    description: 'Animation portfolio — Stickman Epic Legends and more.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#00BFA6',
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
