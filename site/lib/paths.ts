export const STANDALONE_GUIDE_ORIGIN = "https://ai-software-factory-mastery.vercel.app";
export const FDLC_ORIGIN = "https://www.fdlc.ai";
export const GUIDE_CANONICAL_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL ?? STANDALONE_GUIDE_ORIGIN).replace(/\/$/, "");
export const GUIDE_ROOT = "/guide";

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
  return new URL(pathname, `${GUIDE_CANONICAL_ORIGIN}/`).toString();
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
