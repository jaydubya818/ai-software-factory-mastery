export const STANDALONE_GUIDE_ORIGIN = "https://ai-software-factory-mastery.vercel.app";
export const FDLC_ORIGIN = "https://www.fdlc.ai";
export const GUIDE_CANONICAL_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL ?? STANDALONE_GUIDE_ORIGIN).replace(/\/$/, "");
export const GUIDE_ROOT = "/guide";
export const GUIDE_COMPATIBLE_MODE = GUIDE_CANONICAL_ORIGIN === STANDALONE_GUIDE_ORIGIN;

export const GUIDE_ROUTES = {
  home: GUIDE_ROOT,
  search: `${GUIDE_ROOT}/search`,
  glossary: `${GUIDE_ROOT}/glossary`,
  atlas: `${GUIDE_ROOT}/atlas`,
  architecture: `${GUIDE_ROOT}/architecture`,
  topics: `${GUIDE_ROOT}/topics`,
  coverage: `${GUIDE_ROOT}/coverage`,
} as const;

export const MISSION_CONTROL_MATURITY_URL =
  "https://github.com/jaydubya818/MissionControl/blob/main/docs/product/software-factory-capability-maturity.md";

function trimSlashes(value: string) {
  return value.replace(/^\/+|\/+$/g, "");
}

export function guideDocumentPath(slug: string) {
  const normalized = trimSlashes(slug);
  return normalized ? `${GUIDE_ROOT}/${normalized}` : GUIDE_ROOT;
}

/** Resolve generated corpus slugs that have a friendlier canonical surface. */
export function guideContentPath(slug: string) {
  if (slug === "guide") return GUIDE_ROUTES.home;
  if (slug === "appendix/glossary") return GUIDE_ROUTES.glossary;
  return guideDocumentPath(slug);
}

export function guideAssetPath(asset: string) {
  const normalized = trimSlashes(asset);
  return normalized ? `${GUIDE_ROOT}/${normalized}` : GUIDE_ROOT;
}

const standalonePagePaths: Readonly<Record<string, string>> = {
  "/guide": "/guide", "/guide/guide": "/guide",
  "/guide/atlas": "/visuals", "/guide/architecture": "/architecture",
  "/guide/topics": "/topics", "/guide/coverage": "/coverage",
  "/guide/glossary": "/glossary", "/guide/appendix/glossary": "/glossary",
  "/guide/search": "/search",
};

/** Page paths only. SDK/public assets never participate in compatibility redirects. */
export function standaloneGuidePagePath(pathname: string) {
  if (!pathname.startsWith("/") || /[\\%?#]/u.test(pathname)
    || [...pathname].some((character) => character.charCodeAt(0) <= 32)
    || pathname.startsWith("//")) return null;
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  if (Object.hasOwn(standalonePagePaths, path)) return standalonePagePaths[path];
  if (!path.startsWith("/guide/") || path.includes(".") || path.startsWith("/guide/infographics/")) return null;
  return `/docs/${path.slice("/guide/".length)}`;
}

/** Keep local/Preview links on their candidate; FDLC owns bare /architecture. */
export function guideNavigationHref(href: string, canonicalOrigin = GUIDE_CANONICAL_ORIGIN) {
  if (canonicalOrigin !== STANDALONE_GUIDE_ORIGIN || !href.startsWith("/") || href.startsWith("//")) return href;
  const url = new URL(href, STANDALONE_GUIDE_ORIGIN);
  const pathname = standaloneGuidePagePath(href.split(/[?#]/, 1)[0]);
  // The bridge request path (or explicit standalone local mode) may normalize
  // this alias, but deployed Guide Previews retain /guide/architecture because
  // FDLC owns the bare route. A never-followed copied alias is not old-compatible.
  return pathname && pathname !== "/architecture" ? `${pathname}${url.search}${url.hash}` : href;
}

/** Normalize both route trees before computing the active navigation item. */
export function canonicalGuidePagePath(pathname: string) {
  if (pathname.startsWith("/docs/")) return `${GUIDE_ROOT}/${pathname.slice("/docs/".length)}`;
  return Object.entries(standalonePagePaths).find(([source, target]) => source !== "/guide/guide" && source !== "/guide/appendix/glossary" && target === pathname)?.[0] ?? pathname;
}

/**
 * Root discovery files exist only while the Guide is its own canonical origin.
 * The composed site owns root discovery; Guide discovery stays namespaced there.
 */
export function standaloneDiscoveryFiles(origin = GUIDE_CANONICAL_ORIGIN) {
  if (origin !== STANDALONE_GUIDE_ORIGIN) return null;
  const sitemapUrl = `${origin}${guideAssetPath("sitemap.xml")}`;
  return {
    robots: `User-agent: *\nAllow: /guide/\nSitemap: ${sitemapUrl}\n`,
    sitemap: `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${sitemapUrl}</loc></sitemap>\n</sitemapindex>\n`,
  };
}

export function absoluteGuideUrl(pathname: string) {
  const physicalPath = GUIDE_COMPATIBLE_MODE ? standaloneGuidePagePath(pathname) ?? pathname : pathname;
  return new URL(physicalPath, `${GUIDE_CANONICAL_ORIGIN}/`).toString();
}

export function fdlcUrl(pathname = "/") {
  const normalized = `/${trimSlashes(pathname)}`;
  if (GUIDE_CANONICAL_ORIGIN !== STANDALONE_GUIDE_ORIGIN) return normalized;
  return new URL(normalized, `${FDLC_ORIGIN}/`).toString();
}

export type GuideSearchParams = Record<string, string | string[] | undefined>;

/** Preserve repeated and encoded query values when retiring a route. */
export function withSearchParams(pathname: string, searchParams: GuideSearchParams) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      for (const entry of value) query.append(key, entry);
    } else if (value !== undefined) {
      query.append(key, value);
    }
  }
  const serialized = query.toString();
  return serialized ? `${pathname}?${serialized}` : pathname;
}
