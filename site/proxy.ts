import { type NextRequest, NextResponse } from "next/server.js";
import { legacyGuideHostRedirect } from "./lib/legacy-host.ts";

export function proxy(request: NextRequest) {
  const destination = legacyGuideHostRedirect(
    request.headers.get("host") ?? request.nextUrl.host,
    request.nextUrl.pathname,
    request.method,
  );

  return destination ? NextResponse.redirect(destination, 308) : NextResponse.next();
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
