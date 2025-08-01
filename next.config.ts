import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";

const createNextIntlPlugin = withNextIntl();

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const isStaticExport = process.env.STATIC_EXPORT === 'true';
const isCustomDomain = process.env.CUSTOM_DOMAIN === 'true';

console.log('Environment:', {
  GITHUB_PAGES: process.env.GITHUB_PAGES,
  STATIC_EXPORT: process.env.STATIC_EXPORT,
  CUSTOM_DOMAIN: process.env.CUSTOM_DOMAIN,
  NODE_ENV: process.env.NODE_ENV,
  isGitHubPages,
  isStaticExport,
  isCustomDomain
});

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },

  // For GitHub Pages
  ...(isGitHubPages && !isCustomDomain && {
    basePath: '/BuyViews',
    assetPrefix: '/BuyViews/',
    output: 'export',
    distDir: 'out',
  }),

  // For static export to custom domain (no basePath needed)
  ...(isStaticExport && {
    output: 'export',
    distDir: 'out',
  }),

  /* config options here */
};

console.log('Next.js config:', nextConfig);

export default createNextIntlPlugin(nextConfig);
