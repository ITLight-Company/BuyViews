import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },
    images: {
        formats: ['image/webp', 'image/avif'],
    },
    // Optimize for production
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    // SEO optimizations
    headers: async () => [
        {
            source: '/:path*',
            headers: [
                {
                    key: 'X-Frame-Options',
                    value: 'DENY',
                },
                {
                    key: 'X-Content-Type-Options',
                    value: 'nosniff',
                },
                {
                    key: 'Referrer-Policy',
                    value: 'origin-when-cross-origin',
                },
            ],
        },
    ],
};

export default withNextIntl(nextConfig);
