import type { Metadata } from "next";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://buyviews.com'),
  title: {
    default: 'BuyViews - Boost Your YouTube Views & Website Traffic',
    template: '%s | BuyViews'
  },
  description: 'Get real YouTube views and website traffic to grow your online presence. Safe, fast, and effective solutions with 24/7 support.',
  keywords: ['YouTube views', 'website traffic', 'social media growth', 'video promotion', 'online marketing'],
  authors: [{ name: 'BuyViews Team' }],
  creator: 'BuyViews',
  publisher: 'BuyViews',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buyviews.com',
    title: 'BuyViews - Boost Your YouTube Views & Website Traffic',
    description: 'Get real YouTube views and website traffic to grow your online presence. Safe, fast, and effective solutions with 24/7 support.',
    siteName: 'BuyViews',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuyViews - Boost Your YouTube Views & Website Traffic',
    description: 'Get real YouTube views and website traffic to grow your online presence. Safe, fast, and effective solutions with 24/7 support.',
    creator: '@buyviews',
  },
  alternates: {
    canonical: 'https://buyviews.com',
    languages: {
      'en-US': 'https://buyviews.com/en',
      'pl-PL': 'https://buyviews.com/pl',
      'de-DE': 'https://buyviews.com/de',
      'hi-IN': 'https://buyviews.com/hi',
    },
  },
};

// Root layout that redirects to locale-specific layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
