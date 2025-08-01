import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import './globals.css'
import './custom-styles.css'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.buyviews.eu'),
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
    url: 'https://www.buyviews.eu',
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
    canonical: 'https://www.buyviews.eu',
    languages: {
      'en-US': 'https://www.buyviews.eu/en',
      'pl-PL': 'https://www.buyviews.eu/pl',
      'de-DE': 'https://www.buyviews.eu/de',
      'hi-IN': 'https://www.buyviews.eu/hi',
    },
  },
};

// Root layout that provides default English content
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // For static export, provide default English messages explicitly
  const messages = process.env.STATIC_EXPORT === 'true'
    ? (await import('../../messages/en.json')).default
    : await getMessages({ locale: 'en' });

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Header locale="en" />
          <main>
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
