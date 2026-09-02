import assert from "node:assert/strict";
import test from "node:test";
import { htmlFor, render } from "./helpers/render.mjs";

// The catch-all /docs/[...slug] route joins the URL segments and looks the
// result up in the generated document list. These cases pin the lookup
// boundary: which shapes resolve to a document and which must fall through to
// notFound(), including inputs shaped like a directory escape.

test("serves the book map and front matter under their slugs", async () => {
  // guide/README.md is republished as /docs/guide.
  const map = await htmlFor("/docs/guide");
  assert.match(map, /<title>The AI Software Factory Guide/i);

  const howToRead = await htmlFor("/docs/00-front-matter/00-how-to-read-this-guide");
  assert.match(howToRead, /<title>How to read this guide/i);
});

test("returns 404 for slugs that match no document", async () => {
  const unknownRoutes = [
    "/docs/does-not-exist",
    // A part directory is not itself a document.
    "/docs/01-understand",
    // Trailing README must not resolve; it is rewritten at generation time.
    "/docs/README",
  ];

  for (const route of unknownRoutes) {
    const response = await render(route);
    assert.equal(response.status, 404, `${route} should not resolve to a document`);
  }
});

test("does not serve chapter content for traversal-shaped slugs", async () => {
  const traversalRoutes = [
    "/docs/01-understand/../../etc/passwd",
    "/docs/%2e%2e%2f%2e%2e%2fetc%2fpasswd",
    "/docs/..%2f..%2fREADME",
  ];

  for (const route of traversalRoutes) {
    const response = await render(route);
    const body = await response.text();

    assert.equal(response.status, 404, `${route} should not resolve to a document`);
    assert.doesNotMatch(body, /<article class="document-article"/);
    assert.doesNotMatch(body, /root:x:0:0/);
  }
});

test("exposes adjacent-chapter navigation with correct endpoints", async () => {
  const html = await htmlFor("/docs/01-understand/02-the-factory-in-one-view");
  const pagination = html.match(/<nav class="document-pagination"[\s\S]*?<\/nav>/)?.[0];

  assert.ok(pagination, "chapter pages should render adjacent-document navigation");
  assert.match(pagination, /Previous/);
  assert.match(pagination, /Next/);

  // Every pagination target must itself be a resolvable document.
  for (const [, href] of pagination.matchAll(/href="(\/docs\/[^"]+)"/g)) {
    const response = await render(href);
    assert.equal(response.status, 200, `${href} is linked as adjacent but does not resolve`);
  }
});

test("marks the open chapter as the current page in the sidebar", async () => {
  const slug = "/docs/01-understand/02-the-factory-in-one-view";
  const html = await htmlFor(slug);
  const current = [...html.matchAll(/<a aria-current="page" href="([^"]+)"/g)].map((match) => match[1]);

  // Exactly one nav entry per rendered nav copy (sidebar + mobile disclosure).
  assert.deepEqual(current, [slug, slug]);
});
