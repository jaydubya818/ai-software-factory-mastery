import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { NextRequest } from "next/server.js";
import { compatibleGuideRedirectPath, isCompatibleStandaloneHost } from "../lib/compatible-host.ts";
import { guideNavigationHref, absoluteGuideUrl, GUIDE_ROUTES, canonicalGuidePagePath, guideAssetPath, STANDALONE_GUIDE_ORIGIN } from "../lib/paths.ts";
import { legacyAnchorRedirects } from "../lib/legacy-routes.ts";
import { searchDocuments } from "../lib/search-client.ts";
import { publishedGuideDocuments } from "../lib/routes.generated.ts";
import { proxy } from "../proxy.ts";

const host = "ai-software-factory-mastery.vercel.app";
const local = { GUIDE_NATIVE_LOCAL: "1" };

test("compatible navigation stays on local/Preview origin and publishes old paths with queries/fragments", () => {
  assert.equal(guideNavigationHref("/guide/01-understand/02-the-factory-in-one-view?tag=a&tag=b#scope"), "/docs/01-understand/02-the-factory-in-one-view?tag=a&tag=b#scope");
  assert.equal(guideNavigationHref("/guide/search?q=a%2Fb&q=c#results"), "/search?q=a%2Fb&q=c#results");
  assert.equal(guideNavigationHref(GUIDE_ROUTES.atlas), "/visuals");
  assert.equal(guideNavigationHref(GUIDE_ROUTES.architecture), "/guide/architecture", "FDLC owns bare architecture; standalone redirect resolves the visited URL");
  assert.equal(absoluteGuideUrl(GUIDE_ROUTES.architecture), `${STANDALONE_GUIDE_ORIGIN}/architecture`);
  assert.equal(canonicalGuidePagePath("/docs/01-understand/02-the-factory-in-one-view"), "/guide/01-understand/02-the-factory-in-one-view");
  assert.equal(canonicalGuidePagePath("/visuals"), GUIDE_ROUTES.atlas);
  for (const href of ["#local", "https://example.com/guide/anything", "//example.com/guide/anything", "/framework", "/guide/search-index.json", "/guide/infographics/diagram.png", "/vc-ap-dd2962/_next/static/chunk.js"]) assert.equal(guideNavigationHref(href), href);
  assert.equal(guideAssetPath("search-index.json"), "/guide/search-index.json");
});

test("every published namespace page resolves to an old physical path only on the Guide host", () => {
  for (const [slug, route] of publishedGuideDocuments) {
    const expected = slug === "guide" ? null : slug === "appendix/glossary" ? "/glossary" : `/docs/${slug}`;
    assert.equal(compatibleGuideRedirectPath(host, route, "GET", {}), expected, route);
    assert.equal(compatibleGuideRedirectPath("www.fdlc.ai", route, "GET", {}), null, route);
    assert.equal(compatibleGuideRedirectPath("localhost:3024", route, "GET", local), null, route);
  }
  assert.equal(compatibleGuideRedirectPath(host, "/guide/architecture", "HEAD", {}), "/architecture");
  assert.equal(compatibleGuideRedirectPath(host, "/guide/understand", "GET", {}), "/docs/01-understand/01-why-software-engineering-is-changing");
});

test("compatible search and moved-anchor navigation retain old paths and exact fragments", () => {
  const document = { slug: "03-build/12-skills-as-packages", title: "Skills as packages", description: "Skills", section: "Build", group: null, chapter: 12, stage: null, contentType: "chapter", sections: [{ id: "what-a-good-skill-is", heading: "What a good skill is", text: "Skills" }] };
  const results = searchDocuments([document], "skills", 10);
  assert.ok(results.length > 0);
  for (const result of results) assert.ok(result.href.startsWith("/docs/03-build/12-skills-as-packages"));
  for (const target of Object.values(legacyAnchorRedirects).flatMap(Object.values)) {
    assert.equal(guideNavigationHref(target), target.replace(/^\/guide\//, "/docs/"), target);
  }
});

test("standalone ownership accepts only exact Guide aliases and explicitly local Guide127", () => {
  assert.equal(isCompatibleStandaloneHost(host), true);
  assert.equal(isCompatibleStandaloneHost("ai-software-factory-mastery-abc-jaydubya818.vercel.app"), true);
  assert.equal(isCompatibleStandaloneHost("127.0.0.1:3024", local), true);
  for (const value of [null, "www.fdlc.ai", "fdlc-abc-jaydubya818.vercel.app", "localhost:3024", "127.0.0.1", `${host}.evil.test`, `${host}@evil.test`, ` ${host}`, `${host}/anything`]) assert.equal(isCompatibleStandaloneHost(value, local), false, String(value));
  assert.equal(isCompatibleStandaloneHost("127.0.0.1:3024", {}), false);
  assert.equal(isCompatibleStandaloneHost("127.0.0.1:3024", { ...local, VERCEL: "1" }), false);
});

test("compatible redirects reject assets, unknown pages, unsafe paths, final mode and non-navigation methods", () => {
  for (const path of ["/guide/not-published", "/guide/search-index.json", "/guide/sitemap.xml", "/guide/infographics/anything", "/vc-ap-dd2962/_next/static/file.js", "/guide/%2e%2e/architecture", "/guide/../architecture", "/guide//architecture", "/guide/architecture?x=1", "/guide/architecture\n"]) assert.equal(compatibleGuideRedirectPath(host, path, "GET", {}), null, path);
  for (const method of ["POST", "PUT", "DELETE"]) assert.equal(compatibleGuideRedirectPath(host, "/guide/architecture", method, {}), null);
  assert.equal(compatibleGuideRedirectPath(host, "/guide/architecture", "GET", {}, "https://www.fdlc.ai"), null);
});

test("hosted architecture normalization belongs to the bridge, not a Guide hostname", () => {
  for (const candidateHost of [host, "ai-software-factory-mastery-fgd1o8awu-jaydubya818.vercel.app"]) {
    for (const environment of [{ VERCEL: "1" }, { VERCEL_ENV: "preview" }, { VERCEL_ENV: "production" }, { VERCEL_TARGET_ENV: "production" }]) {
      for (const method of ["GET", "HEAD"]) {
        assert.equal(compatibleGuideRedirectPath(candidateHost, "/guide/architecture", method, environment), null);
        assert.equal(compatibleGuideRedirectPath(candidateHost, "/guide/architecture/", method, environment), null);
        assert.equal(compatibleGuideRedirectPath(candidateHost, "/guide/search", method, environment), "/search");
      }
    }
  }
  assert.equal(compatibleGuideRedirectPath("127.0.0.1:6125", "/guide/architecture", "GET", local), "/architecture", "An actual uncomposed local Guide owns bare architecture");
});

test("proxy uses temporary no-store same-origin redirects, preserves queries, and ignores forwarded Host", () => {
  const request = new NextRequest(`https://${host}/guide/search?q=a%2Fb&q=c&tag=one`);
  const response = proxy(request);
  assert.equal(response.status, 307);
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.equal(response.headers.get("location"), `https://${host}/search?q=a%2Fb&q=c&tag=one`);
  const spoof = proxy(new NextRequest("https://www.fdlc.ai/guide/architecture", { headers: { "x-forwarded-host": host } }));
  assert.equal(spoof.status, 200);
  assert.equal(spoof.headers.get("location"), null);
});

test("hosted compatible proxy leaves Guide architecture inside its namespace", () => {
  const script = `import { NextRequest } from 'next/server.js'; import { proxy } from './proxy.ts'; const results=[]; for(const method of ['GET','HEAD']) for(const path of ['/guide/architecture','/guide/architecture/']) { const response=proxy(new NextRequest('https://${host}'+path+'?q=a%2Fb',{method})); results.push({status:response.status,location:response.headers.get('location')}); } process.stdout.write(JSON.stringify(results));`;
  const result = spawnSync(process.execPath, ["--experimental-strip-types", "--input-type=module", "--eval", script], {
    cwd: new URL("..", import.meta.url), encoding: "utf8",
    env: { ...process.env, NEXT_PUBLIC_SITE_URL: STANDALONE_GUIDE_ORIGIN, VERCEL: "1", VERCEL_ENV: "preview" },
  });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), Array.from({ length: 4 }, () => ({ status: 200, location: null })));
});

test("final build retains namespace links, canonicals, and existing retirement destinations", () => {
  const script = `import { guideNavigationHref,absoluteGuideUrl } from './lib/paths.ts'; import { compatibleGuideRedirectPath } from './lib/compatible-host.ts'; import { legacyGuideHostRedirect } from './lib/legacy-host.ts'; process.stdout.write(JSON.stringify({href:guideNavigationHref('/guide/architecture'),canonical:absoluteGuideUrl('/guide/architecture'),compat:compatibleGuideRedirectPath('${host}','/guide/architecture','GET',{}),retirement:legacyGuideHostRedirect('${host}','/architecture','GET',{GUIDE_LEGACY_REDIRECTS_ENABLED:'true'})}));`;
  const result = spawnSync(process.execPath, ["--experimental-strip-types", "--input-type=module", "--eval", script], { cwd: new URL("..", import.meta.url), encoding: "utf8", env: { ...process.env, NEXT_PUBLIC_SITE_URL: "https://www.fdlc.ai" } });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), { href: "/guide/architecture", canonical: "https://www.fdlc.ai/guide/architecture", compat: null, retirement: "https://www.fdlc.ai/guide/architecture" });
});
