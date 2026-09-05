import { legacyDocumentRedirects, retiredFdlcSummaryRedirects } from "./legacy-routes.ts";
import { GUIDE_CANONICAL_ORIGIN, STANDALONE_GUIDE_ORIGIN, standaloneGuidePagePath } from "./paths.ts";
import { publishedGuideDocuments } from "./routes.generated.ts";

const publishedSlugs = new Set(publishedGuideDocuments.map(([slug]) => slug as string));
const previewHost = /^ai-software-factory-mastery-[a-z0-9]+(?:-[a-z0-9]+)*-jaydubya818\.vercel\.app$/;

/** Host itself is the ownership boundary; forwarded headers are never consulted. */
export function isCompatibleStandaloneHost(host: string | null, environment: Record<string, string | undefined> = process.env) {
  if (!host || host !== host.trim() || /[\s/\\?#@]/u.test(host)) return false;
  let url: URL;
  try { url = new URL(`http://${host}`); } catch { return false; }
  if (url.hostname === "ai-software-factory-mastery.vercel.app" || previewHost.test(url.hostname)) return true;
  return url.hostname === "127.0.0.1" && Boolean(url.port)
    && (environment.GUIDE_NATIVE_LOCAL === "1" || environment.GUIDE_STANDALONE_VINEXT === "1")
    && environment.VERCEL !== "1" && environment.VERCEL_ENV === undefined;
}

export function compatibleGuideRedirectPath(host: string | null, pathname: string, method: string, environment: Record<string, string | undefined> = process.env, canonicalOrigin = GUIDE_CANONICAL_ORIGIN) {
  if (canonicalOrigin !== STANDALONE_GUIDE_ORIGIN || !["GET", "HEAD"].includes(method) || !isCompatibleStandaloneHost(host, environment)) return null;
  const destination = standaloneGuidePagePath(pathname);
  if (!destination || destination === pathname || pathname === "/guide/") return null;
  if (!destination.startsWith("/docs/")) return destination;
  const slug = destination.slice("/docs/".length);
  const canonicalSlug = legacyDocumentRedirects[slug] ?? retiredFdlcSummaryRedirects[slug] ?? slug;
  if (!publishedSlugs.has(canonicalSlug)) return null;
  return canonicalSlug === "guide" ? "/guide" : canonicalSlug === "appendix/glossary" ? "/glossary" : `/docs/${canonicalSlug}`;
}
