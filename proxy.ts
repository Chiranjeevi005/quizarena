import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "@/auth/auth.config";
import { ROUTES } from "@/lib/routes";

const { auth } = NextAuth(authConfig);

/**
 * QuizArena — Production-Grade Middleware
 *
 * Handles:
 * - Route protection (authenticated vs public)
 * - Redirect management (no loops)
 * - Auth callback pass-through
 * - Static asset bypass
 * - Onboarding flow gating
 * - Standardized Next.js middleware implementation
 */

// Routes that require authentication
const PROTECTED_ROUTES: string[] = [
  ROUTES.PROTECTED.DASHBOARD,
  ROUTES.PROTECTED.PROFILE,
  ROUTES.PROTECTED.SETTINGS,
  ROUTES.PROTECTED.CHALLENGES,
  ROUTES.PROTECTED.LEADERBOARD,
  ROUTES.PROTECTED.ANALYTICS,
  ROUTES.PROTECTED.SUBSCRIPTION,
  ROUTES.ONBOARDING.ROOT,
];

// Routes that should redirect logged-in users away
const AUTH_ONLY_ROUTES: string[] = [ROUTES.AUTH.SIGN_IN, ROUTES.AUTH.SIGN_UP];

// API prefixes that should pass through
const PUBLIC_API_PREFIXES = ["/api/auth", "/api/webhooks", "/api/me", "/api/user"];

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));
}

function isAuthOnlyRoute(pathname: string): boolean {
  return AUTH_ONLY_ROUTES.includes(pathname);
}

function isPublicApiRoute(pathname: string): boolean {
  return PUBLIC_API_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes("/_next/image") ||
    /\.(ico|png|jpg|jpeg|gif|svg|css|js|woff2?)$/.test(pathname)
  );
}

/**
 * Safe redirect URL — prevents open redirect attacks
 */
function getSafeRedirectUrl(request: NextRequest, defaultRoute: string): string {
  const url = request.nextUrl;
  const callbackUrl = url.searchParams.get("callbackUrl");

  if (callbackUrl) {
    try {
      const parsed = new URL(callbackUrl, url.origin);
      // Ensure origin matches and it's NOT an auth-only route (to prevent loops)
      if (parsed.origin === url.origin && !isAuthOnlyRoute(parsed.pathname)) {
        return callbackUrl;
      }
    } catch {
      // fall through to default
    }
  }
  return defaultRoute;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass static assets and internal paths
  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  // Bypass public API routes
  if (isPublicApiRoute(pathname)) {
    return NextResponse.next();
  }

  // Get session
  const session = await auth();
  const isAuthenticated = !!session?.user;
  const isOnboardingCompleted = session?.user?.onboardingCompleted ?? false;

  // Protected route guard (for unauthenticated users)
  if (isProtectedRoute(pathname) && !isAuthenticated) {
    const loginUrl = new URL(ROUTES.AUTH.SIGN_IN, request.url);
    const intendedDestination = pathname + request.nextUrl.search;
    const safeRedirect = getSafeRedirectUrl(request, intendedDestination);
    loginUrl.searchParams.set("callbackUrl", safeRedirect);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated user logic
  if (isAuthenticated) {
    // Auth-only routes (login/register) -> redirect to dashboard
    if (isAuthOnlyRoute(pathname)) {
      const redirectUrl = getSafeRedirectUrl(request, ROUTES.PROTECTED.DASHBOARD);
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // Onboarding routes
    const isOnboardingRoute = pathname.startsWith(ROUTES.ONBOARDING.ROOT);
    if (isOnboardingRoute) {
      // If onboarding is complete, redirect to dashboard
      if (isOnboardingCompleted) {
        const redirectUrl = getSafeRedirectUrl(request, ROUTES.PROTECTED.DASHBOARD);
        return NextResponse.redirect(new URL(redirectUrl, request.url));
      }
      // Otherwise, allow access to onboarding flow
      return NextResponse.next();
    }

    // For all other protected routes (dashboard, profile, etc.)
    // Redirect to onboarding if not completed
    if (isProtectedRoute(pathname) && !isOnboardingCompleted) {
      const onboardingUrl = new URL(ROUTES.ONBOARDING.ROOT, request.url);
      // Preserve the original intended destination as a callbackUrl for after onboarding
      const intendedDestination = pathname + request.nextUrl.search;
      onboardingUrl.searchParams.set(
        "callbackUrl",
        getSafeRedirectUrl(request, intendedDestination)
      );
      return NextResponse.redirect(onboardingUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run middleware on all routes except static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

export default proxy;
