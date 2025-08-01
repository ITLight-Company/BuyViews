import createMiddleware from 'next-intl/middleware';
import { routing } from './src/lib/navigation';

// Skip middleware for static export or GitHub Pages
const middleware = (process.env.STATIC_EXPORT === 'true' || process.env.GITHUB_PAGES === 'true')
    ? function () { return; }
    : createMiddleware(routing);

export default middleware;

export const config = {
    matcher: [
        // Enable for all internationalized pathnames
        '/',
        '/(de|en|hi|pl)/:path*',

        // Enable for all pages except certain paths
        '/((?!api|_next|_vercel|.*\\..*).*)'
    ]
};
