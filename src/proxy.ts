import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const url = request.nextUrl;
    const hostname = request.headers.get('host') || '';
    const { pathname } = url;

    // 1. Enforce non-www (301 permanent redirect)
    // if (hostname.startsWith('www.') && !hostname.startsWith('www.shop.')) {
    //     const newUrl = new URL(request.url);
    //     newUrl.host = hostname.replace('www.', '');
    //     return NextResponse.redirect(newUrl, { status: 301 });
    // }

    // 2. Remove trailing slashes (except root)
    if (pathname !== '/' && pathname.endsWith('/')) {
        const newUrl = new URL(request.url);
        newUrl.pathname = pathname.slice(0, -1);
        return NextResponse.redirect(newUrl, { status: 301 });
    }

    // 3. Shop subdomain rewrite (existing logic)
    if (hostname && hostname.startsWith('shop.')) {
        url.pathname = `/shop${url.pathname}`;
        const response = NextResponse.rewrite(url);
        // Add security headers
        addSecurityHeaders(response);
        return response;
    }

    // 4. Add security headers to all responses
    const response = NextResponse.next();
    addSecurityHeaders(response);
    return response;
}

function addSecurityHeaders(response: NextResponse) {
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-DNS-Prefetch-Control', 'on');
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - assets (public assets)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
    ],
};
