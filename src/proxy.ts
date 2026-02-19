import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

// ─── Subdomain → Role Mapping (add new subdomains here) ───────────────────────
// Each entry maps a subdomain prefix to the required Clerk role.
// To add a new portal (e.g. admin.atharvveda.us), just add: "admin": "admin"
const KNOWN_SUBDOMAINS: Record<string, string> = {
    patient: "patient",
    doctor: "admin",
    // Future: "admin": "superadmin", "labs": "lab_tech", "staff": "staff"
};

async function proxy(request: NextRequest, auth: any) {
    const url = request.nextUrl.clone();
    const hostname = request.headers.get('host') || '';
    const cleanHost = hostname.split(':')[0]; // Strip port for localhost
    const { pathname } = url;

    // ─── 0. Dev & Preview Bypass ──────────────────────────────────────────────
    // On localhost or Vercel preview deployments, skip subdomain routing entirely
    // so that all routes are accessible directly by path for development/testing.
    if (cleanHost.includes('localhost') || cleanHost.includes('vercel.app')) {
        // Still enforce trailing slash removal in dev
        if (pathname !== '/' && pathname.endsWith('/')) {
            const newUrl = new URL(request.url);
            newUrl.pathname = pathname.slice(0, -1);
            return NextResponse.redirect(newUrl, { status: 301 });
        }
        const response = NextResponse.next();
        addSecurityHeaders(response);
        return response;
    }

    // ─── 1. Trailing Slash Removal (301 SEO canonical) ────────────────────────
    if (pathname !== '/' && pathname.endsWith('/')) {
        const newUrl = new URL(request.url);
        newUrl.pathname = pathname.slice(0, -1);
        return NextResponse.redirect(newUrl, { status: 301 });
    }

    // ─── 2. Dynamic Subdomain Detection ───────────────────────────────────────
    const subdomain = cleanHost.split('.')[0];
    const requiredRole = KNOWN_SUBDOMAINS[subdomain];

    if (requiredRole) {
        // ── 2a. Clerk RBAC: Enforce role for this subdomain ───────────────────
        const { userId, sessionClaims } = await auth();

        if (!userId || sessionClaims?.publicMetadata?.role !== requiredRole) {
            // Unauthorized → redirect to main domain root
            const mainDomain = cleanHost.replace(`${subdomain}.`, '');
            const protocol = request.nextUrl.protocol;
            return NextResponse.redirect(`${protocol}//${mainDomain}/`);
        }

        // ── 2b. Rewrite to /{subdomain}{pathname} ────────────────────────────
        // Prevent double-prefix: only rewrite if path doesn't already start
        // with the subdomain prefix (e.g. /patient/patient/dashboard)
        if (!pathname.startsWith(`/${subdomain}`)) {
            url.pathname = `/${subdomain}${pathname}`;
            const response = NextResponse.rewrite(url);
            addSecurityHeaders(response);
            return response;
        }

        // Path already prefixed — pass through with security headers
        const response = NextResponse.next();
        addSecurityHeaders(response);
        return response;
    }

    // ─── 3. Direct Path Protection (main domain bypass guard) ─────────────────
    // Block direct access to /doctor/* or /patient/* on the main domain
    // unless the user has the correct role.
    for (const [sub, role] of Object.entries(KNOWN_SUBDOMAINS)) {
        if (pathname.startsWith(`/${sub}`)) {
            const { userId, sessionClaims } = await auth();
            const userRole = sessionClaims?.publicMetadata?.role;
            // Allow if role matches OR role is missing (initial setup/registration)
            if (!userId || (userRole && userRole !== role)) {
                return NextResponse.redirect(new URL('/', request.url));
            }
            break; // Only one prefix can match
        }
    }

    // ─── 4. Shop Subdomain ────────────────────────────────────────────────────
    if (subdomain === 'shop') {
        url.pathname = `/shop${pathname}`;
        const response = NextResponse.rewrite(url);
        addSecurityHeaders(response);
        return response;
    }

    // ─── 5. Default: public website (atharvveda.us) ───────────────────────────
    const response = NextResponse.next();
    addSecurityHeaders(response);
    return response;
}

// ─── Security Headers ─────────────────────────────────────────────────────────
function addSecurityHeaders(response: NextResponse) {
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-DNS-Prefetch-Control', 'on');
}

// ─── Clerk Middleware Wrapper ─────────────────────────────────────────────────
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
        // Skip _next internals, static assets, and common file extensions
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Ensure API/tRPC routes go through Clerk for auth context
        '/(api|trpc)(.*)',
    ],
};
