import assert from "node:assert/strict";
import test from "node:test";

import { NextRequest } from "next/server.js";
import { documents } from "../lib/content.generated.ts";
import {
  legacyDocumentRedirects,
  retiredFdlcSummaryRedirects,
} from "../lib/legacy-routes.ts";
import {
  LEGACY_GUIDE_HOST,
  legacyGuideHostRedirect,
  legacyGuideRedirectPaths,
  legacyGuideRedirectsEnabled,
} from "../lib/legacy-host.ts";
import { FDLC_ORIGIN, GUIDE_ROUTES, guideContentPath, guideDocumentPath } from "../lib/paths.ts";
import { proxy } from "../proxy.ts";

const absolute = (pathname) => new URL(pathname, `${FDLC_ORIGIN}/`).toString();
const enabledEnvironment = { GUIDE_LEGACY_REDIRECTS_ENABLED: "true" };

test("keeps the retired hostname serving in compatibility mode by default", () => {
  for (const environment of [
    {},
    { GUIDE_LEGACY_REDIRECTS_ENABLED: "false" },
    { GUIDE_LEGACY_REDIRECTS_ENABLED: "TRUE" },
  ]) {
    assert.equal(legacyGuideRedirectsEnabled(environment), false);
    assert.equal(
      legacyGuideHostRedirect(LEGACY_GUIDE_HOST, GUIDE_ROUTES.home, "GET", environment),
      null,
    );
  }

  assert.equal(legacyGuideRedirectsEnabled(enabledEnvironment), true);
});

test("allowlists every published Guide route on the retired hostname", () => {
  const expectedRoutes = new Set([
    ...Object.values(GUIDE_ROUTES),
    ...documents.map((document) => guideContentPath(document.slug)),
  ]);

  for (const route of expectedRoutes) {
    assert.equal(
      legacyGuideHostRedirect(LEGACY_GUIDE_HOST, route, "GET", enabledEnvironment),
      absolute(route),
      route,
    );
  }
});

test("allowlists canonical documents and every known document alias", () => {
  for (const document of documents) {
    const target = absolute(guideContentPath(document.slug));
    assert.equal(legacyGuideHostRedirect(LEGACY_GUIDE_HOST, `/docs/${document.slug}`, "GET", enabledEnvironment), target);
    assert.equal(legacyGuideHostRedirect(LEGACY_GUIDE_HOST, `/guide/${document.slug}`, "GET", enabledEnvironment), target);
  }

  for (const [legacySlug, canonicalSlug] of Object.entries(legacyDocumentRedirects)) {
    const target = absolute(guideDocumentPath(canonicalSlug));
    assert.equal(legacyGuideHostRedirect(LEGACY_GUIDE_HOST, `/docs/${legacySlug}`, "GET", enabledEnvironment), target);
    assert.equal(legacyGuideHostRedirect(LEGACY_GUIDE_HOST, `/guide/${legacySlug}`, "GET", enabledEnvironment), target);
  }

  for (const [summary, canonicalSlug] of Object.entries(retiredFdlcSummaryRedirects)) {
    assert.equal(
      legacyGuideHostRedirect(LEGACY_GUIDE_HOST, `/guide/${summary}`, "GET", enabledEnvironment),
      absolute(guideDocumentPath(canonicalSlug)),
    );
  }
});

test("maps old static aliases directly to their final FDLC Guide routes", () => {
  const aliases = {
    "/": GUIDE_ROUTES.home,
    "/architecture": GUIDE_ROUTES.architecture,
    "/atlas": GUIDE_ROUTES.atlas,
    "/coverage": GUIDE_ROUTES.coverage,
    "/glossary": GUIDE_ROUTES.glossary,
    "/search": GUIDE_ROUTES.search,
    "/topics": GUIDE_ROUTES.topics,
    "/visuals": GUIDE_ROUTES.atlas,
  };

  for (const [source, destination] of Object.entries(aliases)) {
    assert.equal(
      legacyGuideHostRedirect(LEGACY_GUIDE_HOST, source, "GET", enabledEnvironment),
      absolute(destination),
      source,
    );
  }
});

test("normalizes host case, an optional port, and a canonical trailing slash", () => {
  assert.equal(
    legacyGuideHostRedirect(
      "AI-SOFTWARE-FACTORY-MASTERY.VERCEL.APP:443",
      "/guide/",
      "GET",
      enabledEnvironment,
    ),
    absolute(GUIDE_ROUTES.home),
  );
});

test("does not redirect unknown paths, lookalike hosts, or non-navigation methods", () => {
  for (const pathname of ["/admin", "/docs/not-a-document", "/guide/not-a-document", "/guidebook"]) {
    assert.equal(legacyGuideHostRedirect(LEGACY_GUIDE_HOST, pathname, "GET", enabledEnvironment), null, pathname);
  }

  for (const host of [null, "www.fdlc.ai", `${LEGACY_GUIDE_HOST}.example.com`]) {
    assert.equal(legacyGuideHostRedirect(host, GUIDE_ROUTES.home, "GET", enabledEnvironment), null, String(host));
  }

  for (const method of ["POST", "PUT", "PATCH", "DELETE"]) {
    assert.equal(
      legacyGuideHostRedirect(LEGACY_GUIDE_HOST, GUIDE_ROUTES.home, method, enabledEnvironment),
      null,
      method,
    );
  }
});

test("the proxy serves the old host when the retirement flag is absent", () => {
  const previous = process.env.GUIDE_LEGACY_REDIRECTS_ENABLED;
  delete process.env.GUIDE_LEGACY_REDIRECTS_ENABLED;

  try {
    const request = new NextRequest(`https://${LEGACY_GUIDE_HOST}/guide/architecture?token=secret`);
    const response = proxy(request);

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("x-middleware-next"), "1");
    assert.equal(response.headers.get("location"), null);
  } finally {
    if (previous === undefined) delete process.env.GUIDE_LEGACY_REDIRECTS_ENABLED;
    else process.env.GUIDE_LEGACY_REDIRECTS_ENABLED = previous;
  }
});

test("the enabled proxy drops the entire query when crossing origins", () => {
  const previous = process.env.GUIDE_LEGACY_REDIRECTS_ENABLED;
  process.env.GUIDE_LEGACY_REDIRECTS_ENABLED = "true";
  const request = new NextRequest(
    `https://${LEGACY_GUIDE_HOST}/docs/03-build/10-the-agent-factory?token=secret&return=%2Fguide%3Ftab%3Dproof`,
  );

  try {
    const response = proxy(request);

    assert.equal(response.status, 308);
    assert.equal(response.headers.get("location"), absolute("/guide/03-build/11-the-agent-factory"));
  } finally {
    if (previous === undefined) delete process.env.GUIDE_LEGACY_REDIRECTS_ENABLED;
    else process.env.GUIDE_LEGACY_REDIRECTS_ENABLED = previous;
  }
});

test("the runtime allowlist contains no wildcard entries", () => {
  assert.ok(legacyGuideRedirectPaths.size > documents.length);
  for (const source of legacyGuideRedirectPaths.keys()) assert.doesNotMatch(source, /[*:]/, source);
});
