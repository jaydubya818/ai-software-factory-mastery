import { type NextRequest, NextResponse } from "next/server.js";
import { legacyGuideHostRedirect } from "./lib/legacy-host.ts";
import { compatibleGuideRedirectPath } from "./lib/compatible-host.ts";

export function proxy(request: NextRequest) {
  // Vercel can rewrite the Host header to the deployment origin while retaining
  // the public alias in nextUrl. Route retirement decisions must use the URL the
  // visitor actually requested, never the client-controlled forwarded Host.
  const requestedHost = request.nextUrl.host || request.headers.get("host");
  const destination = legacyGuideHostRedirect(
    requestedHost,
    request.nextUrl.pathname,
    request.method,
  );

  if (destination) return NextResponse.redirect(destination, 308);
  const compatiblePath = compatibleGuideRedirectPath(
    requestedHost,
    request.nextUrl.pathname,
    request.method,
  );
  if (!compatiblePath) return NextResponse.next();
  const target = request.nextUrl.clone();
  target.pathname = compatiblePath;
  const response = NextResponse.redirect(target, 307);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: [
    "/",
    "/guide/:path*",
    "/docs/:path*",
    "/architecture",
    "/atlas",
    "/coverage",
    "/glossary",
    "/search",
    "/topics",
    "/visuals",
  ],
};
