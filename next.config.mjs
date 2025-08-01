import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    basePath: process.env.NODE_ENV === 'production' ? '/BuyViews' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/BuyViews/' : '',
    
    // For GitHub Pages, use static export
    ...(isGitHubPages && {
        output: 'export',
        distDir: 'out',
    }),
};

export default withNextIntl(nextConfig);
