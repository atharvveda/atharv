import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

async function proxy(request: NextRequest, auth: any) {
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

    // 3. Doctor Subdomain
    if (hostname.startsWith('doctor.')) {
        const { userId, sessionClaims } = await auth();

        if (!userId || sessionClaims?.publicMetadata?.role !== 'admin') {
            // Redirect to main site root
            const mainDomain = hostname.replace('doctor.', '');
            const protocol = request.nextUrl.protocol;
            return NextResponse.redirect(`${protocol}//${mainDomain}/`);
        }

        // Rewrite to /doctor/... path
        // This avoids collision with other routes
        // Verify path doesn't already start with /doctor to avoid double nesting if user types it manually (though they shouldn't)
        if (!pathname.startsWith('/doctor')) {
            url.pathname = `/doctor${pathname}`;
            const response = NextResponse.rewrite(url);
            addSecurityHeaders(response);
            return response;
        }
    }

    // 4. Patient Subdomain
    if (hostname.startsWith('patient.')) {
        const { userId, sessionClaims } = await auth();

        if (!userId || sessionClaims?.publicMetadata?.role !== 'patient') {
            const mainDomain = hostname.replace('patient.', '');
            const protocol = request.nextUrl.protocol;
            return NextResponse.redirect(`${protocol}//${mainDomain}/`);
        }

        // Rewrite to /patient/... path
        if (!pathname.startsWith('/patient')) {
            url.pathname = `/patient${pathname}`;
            const response = NextResponse.rewrite(url);
            addSecurityHeaders(response);
            return response;
        }
    }

    // 4.5 Protect Direct Path Access (e.g. Localhost or Main Domain bypass)
    if (pathname.startsWith('/doctor')) {
        const { userId, sessionClaims } = await auth();
        // Allow if role is admin OR if role is missing (to allow for initial setup/registration)
        const role = sessionClaims?.publicMetadata?.role;
        if (!userId || (role && role !== 'admin')) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (pathname.startsWith('/patient')) {
        const { userId, sessionClaims } = await auth();
        // Allow if role is patient OR if role is missing (to allow for auto-registration on dashboard)
        const role = sessionClaims?.publicMetadata?.role;
        if (!userId || (role && role !== 'patient')) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // 5. Shop subdomain (existing logic)
    if (hostname && hostname.startsWith('shop.')) {
        url.pathname = `/shop${url.pathname}`;
        const response = NextResponse.rewrite(url);
        // Add security headers
        addSecurityHeaders(response);
        return response;
    }

    // 6. Add security headers to all responses
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

export default clerkMiddleware(async (auth, req) => {
    // Skip proxy logic for API routes to avoid rewriting attempts
    // but keep middleware running to ensure auth() context is available
    if (req.nextUrl.pathname.startsWith('/api')) {
        return NextResponse.next();
    }
    return proxy(req, auth);
});

export const config = {
    matcher: [
        // Standard Clerk matcher to ensure auth works on API routes + Pages
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
