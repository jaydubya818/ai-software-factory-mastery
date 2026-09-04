import { legacyDocumentRedirects, retiredFdlcSummaryRedirects } from "./legacy-routes.ts";
import { FDLC_ORIGIN, GUIDE_ROUTES, guideDocumentPath } from "./paths.ts";
import { publishedGuideDocuments } from "./routes.generated.ts";

export const LEGACY_GUIDE_HOST = "ai-software-factory-mastery.vercel.app";

type LegacyGuideRedirectEnvironment = {
  [key: string]: string | undefined;
  GUIDE_LEGACY_REDIRECTS_ENABLED?: string;
};

const navigationMethods = new Set(["GET", "HEAD"]);
const redirectPaths = new Map<string, string>();

function addRedirect(source: string, destination: string) {
  redirectPaths.set(source, destination);
}

for (const route of Object.values(GUIDE_ROUTES)) addRedirect(route, route);

for (const [slug, canonicalRoute] of publishedGuideDocuments) {
  addRedirect(canonicalRoute, canonicalRoute);
  addRedirect(`/docs/${slug}`, canonicalRoute);
  addRedirect(`/guide/${slug}`, canonicalRoute);
}

for (const [legacySlug, canonicalSlug] of Object.entries(legacyDocumentRedirects)) {
  const canonicalRoute = guideDocumentPath(canonicalSlug);
  addRedirect(`/docs/${legacySlug}`, canonicalRoute);
  addRedirect(`/guide/${legacySlug}`, canonicalRoute);
}

for (const [summary, canonicalSlug] of Object.entries(retiredFdlcSummaryRedirects)) {
  addRedirect(`/guide/${summary}`, guideDocumentPath(canonicalSlug));
}

for (const [source, destination] of Object.entries({
  "/": GUIDE_ROUTES.home,
  "/architecture": GUIDE_ROUTES.architecture,
  "/atlas": GUIDE_ROUTES.atlas,
  "/coverage": GUIDE_ROUTES.coverage,
  "/glossary": GUIDE_ROUTES.glossary,
  "/search": GUIDE_ROUTES.search,
  "/topics": GUIDE_ROUTES.topics,
  "/visuals": GUIDE_ROUTES.atlas,
})) {
  addRedirect(source, destination);
}

function normalizeHost(host: string | null) {
  if (!host) return null;
  return host.trim().toLowerCase().replace(/:\d+$/, "");
}

function normalizePublishedPath(pathname: string) {
  return pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

/** Require an explicit server-side cutover flag before retiring the old host. */
export function legacyGuideRedirectsEnabled(
  environment: LegacyGuideRedirectEnvironment = process.env,
) {
  return environment.GUIDE_LEGACY_REDIRECTS_ENABLED === "true";
}

/** Return a cross-origin redirect only for an enabled, known old-host navigation. */
export function legacyGuideHostRedirect(
  host: string | null,
  pathname: string,
  method = "GET",
  environment: LegacyGuideRedirectEnvironment = process.env,
) {
  if (!legacyGuideRedirectsEnabled(environment)) return null;
  if (normalizeHost(host) !== LEGACY_GUIDE_HOST || !navigationMethods.has(method.toUpperCase())) return null;

  const destination = redirectPaths.get(normalizePublishedPath(pathname));
  return destination ? new URL(destination, `${FDLC_ORIGIN}/`).toString() : null;
}

export const legacyGuideRedirectPaths: ReadonlyMap<string, string> = redirectPaths;
