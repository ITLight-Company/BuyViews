import createMiddleware from 'next-intl/middleware';
import { routing } from './src/lib/navigation';

export default createMiddleware(routing);

export const config = {
    matcher: [
        // Enable for all internationalized pathnames
        '/',
        '/(de|en|hi|pl)/:path*',

        // Enable for all pages except certain paths
        '/((?!api|_next|_vercel|.*\\..*).*)'
    ]
};
