import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/navigation';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import "../globals.css";
import "../custom-styles.css";

const inter = Inter({ subsets: ['latin'] });

export const dynamic = 'force-static';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
        notFound();
    }

    // For static export or GitHub Pages, import messages directly to avoid using headers()
    const messages = (process.env.STATIC_EXPORT === 'true' || process.env.GITHUB_PAGES === 'true')
        ? (await import(`../../../messages/${locale}.json`)).default
        : await getMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            <div className={`${inter.className} flex flex-col min-h-screen bg-background text-foreground`}>
                <Header locale={locale} />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        </NextIntlClientProvider>
    );
}
