import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/lib/navigation';

export default getRequestConfig(async ({ requestLocale }) => {
    // For static export or GitHub Pages, use default locale
    if (process.env.STATIC_EXPORT === 'true' || process.env.GITHUB_PAGES === 'true') {
        return {
            locale: 'en',
            messages: (await import(`../../messages/en.json`)).default
        };
    }

    let locale = await requestLocale;

    if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default
    };
});
