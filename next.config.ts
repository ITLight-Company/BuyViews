import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";

const createNextIntlPlugin = withNextIntl();

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

console.log('Environment:', {
  GITHUB_PAGES: process.env.GITHUB_PAGES,
  NODE_ENV: process.env.NODE_ENV,
  isGitHubPages
});

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/BuyViews' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/BuyViews/' : '',
  
  // For GitHub Pages, use static export and skip API routes
  ...(isGitHubPages && {
    output: 'export',
    distDir: 'out',
  }),
  
  /* config options here */
};

console.log('Next.js config:', nextConfig);

export default createNextIntlPlugin(nextConfig);
