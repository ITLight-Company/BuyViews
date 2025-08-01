import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'pl', 'de', 'hi'],
    defaultLocale: 'en',
    pathnames: {
        '/': '/',
        '/youtube': {
            en: '/youtube',
            pl: '/youtube',
            de: '/youtube',
            hi: '/youtube'
        },
        '/website': {
            en: '/website',
            pl: '/strona',
            de: '/website',
            hi: '/website'
        }
    }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
