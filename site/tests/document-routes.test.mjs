import assert from "node:assert/strict";
import test from "node:test";
import { htmlFor, render } from "./helpers/render.mjs";

// The catch-all /docs/[...slug] route joins the URL segments and looks the
// result up in the generated document list. These cases pin the lookup
// boundary: which shapes resolve to a chapter and which must fall through to
// notFound(), including inputs shaped like a directory escape.

test("serves README chapters under their rewritten slugs", async () => {
  // guide/README.md is republished as /docs/curriculum.
  const curriculum = await htmlFor("/docs/curriculum");
  assert.match(
    curriculum,
    /<title>AI Software Factory Mastery Curriculum · AI Software Factory Mastery<\/title>/i,
  );

  // guide/<section>/README.md is republished as /docs/<section>/start-here.
  const sectionIndex = await htmlFor("/docs/00-overview/start-here");
  assert.match(sectionIndex, /<title>Start Here · AI Software Factory Mastery<\/title>/i);
});

test("returns 404 for slugs that match no chapter", async () => {
  const unknownRoutes = [
    "/docs/does-not-exist",
    // A section directory is not itself a document; only its start-here is.
    "/docs/00-overview",
    // Trailing README must not resolve; it is rewritten at generation time.
    "/docs/00-overview/README",
  ];

  for (const route of unknownRoutes) {
    const response = await render(route);
    assert.equal(response.status, 404, `${route} should not resolve to a chapter`);
  }
});

test("does not serve chapter content for traversal-shaped slugs", async () => {
  const traversalRoutes = [
    "/docs/00-overview/../../etc/passwd",
    "/docs/%2e%2e%2f%2e%2e%2fetc%2fpasswd",
    "/docs/..%2f..%2fREADME",
  ];

  for (const route of traversalRoutes) {
    const response = await render(route);
    const body = await response.text();

    assert.equal(response.status, 404, `${route} should not resolve to a chapter`);
    // A traversal that reached the filesystem or a real chapter would leak an
    // article body; the not-found page carries neither.
    assert.doesNotMatch(body, /<article class="document-article"/);
    assert.doesNotMatch(body, /root:x:0:0/);
  }
});

test("exposes adjacent-chapter navigation with correct endpoints", async () => {
  const html = await htmlFor("/docs/00-overview/06-reading-paths");
  const pagination = html.match(
    /<nav class="document-pagination"[\s\S]*?<\/nav>/,
  )?.[0];

  assert.ok(pagination, "chapter pages should render adjacent-document navigation");
  assert.match(pagination, /<span>Previous<\/span>/);
  assert.match(pagination, /<span>Next<\/span>/);

  // Every pagination target must itself be a resolvable chapter.
  for (const [, href] of pagination.matchAll(/href="(\/docs\/[^"]+)"/g)) {
    const response = await render(href);
    assert.equal(response.status, 200, `${href} is linked as adjacent but does not resolve`);
  }
});

test("marks the open chapter as the current page in the sidebar", async () => {
  const slug = "/docs/00-overview/06-reading-paths";
  const html = await htmlFor(slug);
  const current = [...html.matchAll(/<a aria-current="page" href="([^"]+)"/g)].map(
    (match) => match[1],
  );

  // Exactly one nav entry per rendered nav copy (sidebar + mobile disclosure).
  assert.deepEqual(current, [slug, slug]);
});
