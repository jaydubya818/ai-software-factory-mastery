import { type NextRequest, NextResponse } from "next/server.js";
import { legacyGuideHostRedirect } from "./lib/legacy-host.ts";
import { compatibleGuideRedirectPath } from "./lib/compatible-host.ts";

export function proxy(request: NextRequest) {
  const destination = legacyGuideHostRedirect(
    request.headers.get("host") ?? request.nextUrl.host,
    request.nextUrl.pathname,
    request.method,
  );

  if (destination) return NextResponse.redirect(destination, 308);
  const compatiblePath = compatibleGuideRedirectPath(
    request.headers.get("host") ?? request.nextUrl.host,
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
