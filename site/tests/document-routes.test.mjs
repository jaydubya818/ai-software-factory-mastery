import assert from "node:assert/strict";
import test from "node:test";
import { htmlFor, render } from "./helpers/render.mjs";

test("serves front matter canonically and merges the old book-map route into /guide", async () => {
  const map = await render("/guide/guide");
  assert.equal(map.status, 308);
  assert.equal(map.headers.get("location"), "/guide");

  const howToRead = await htmlFor("/guide/00-front-matter/00-how-to-read-this-guide");
  assert.match(howToRead, /<title>How to read this guide · The AI Software Factory Guide · FDLC<\/title>/i);
  assert.match(howToRead, /rel="canonical" href="https:\/\/ai-software-factory-mastery\.vercel\.app\/docs\/00-front-matter\/00-how-to-read-this-guide"/);
});

test("returns 404 for slugs that match no canonical document", async () => {
  const unknownRoutes = [
    "/guide/does-not-exist",
    "/guide/01-understand",
    "/guide/README",
  ];

  for (const route of unknownRoutes) {
    const response = await render(route);
    const html = await response.text();

    assert.equal(response.status, 404, `${route} should not resolve to a document`);
    assert.match(html, /<h1>That page is not in the guide\.<\/h1>/, `${route} should render the custom 404`);
    assert.match(html, /href="\/search"/, `${route} should offer a recovery path`);
  }
});

test("does not serve chapter content for traversal-shaped slugs", async () => {
  const traversalRoutes = [
    "/guide/01-understand/../../etc/passwd",
    "/guide/%2e%2e%2f%2e%2e%2fetc%2fpasswd",
    "/guide/..%2f..%2fREADME",
  ];

  for (const route of traversalRoutes) {
    const response = await render(route);
    const body = await response.text();

    assert.equal(response.status, 404, `${route} should not resolve to a document`);
    assert.doesNotMatch(body, /<article class="document-article"/);
    assert.doesNotMatch(body, /root:x:0:0/);
  }
});

test("exposes adjacent-chapter navigation with canonical endpoints", async () => {
  const html = await htmlFor("/guide/01-understand/02-the-factory-in-one-view");
  const pagination = html.match(/<nav class="document-pagination"[\s\S]*?<\/nav>/)?.[0];

  assert.ok(pagination, "chapter pages should render adjacent-document navigation");
  assert.match(pagination, /Previous/);
  assert.match(pagination, /Next/);

  const links = [...pagination.matchAll(/href="(\/docs\/[^"]+)"/g)];
  assert.equal(links.length, 2, "both adjacent pages use rollback-compatible paths");
  for (const [, href] of links) {
    const response = await render(href);
    assert.equal(response.status, 200, `${href} is linked as adjacent but does not resolve`);
  }
});

test("marks the open chapter as the current page in both sidebar copies", async () => {
  const route = "/guide/01-understand/02-the-factory-in-one-view";
  const html = await htmlFor(route);
  const current = [...html.matchAll(/<a aria-current="page" href="([^"]+)"/g)].map((match) => match[1]);

  assert.deepEqual(current, [route.replace("/guide/", "/docs/"), route.replace("/guide/", "/docs/")]);
});

test("same-origin retired document routes preserve repeated and encoded query values", async () => {
  const response = await render("/docs/03-build/10-the-agent-factory?role=buyer&role=seller&q=a%2Fb");
  assert.equal(response.status, 308);
  assert.equal(
    response.headers.get("location"),
    "/docs/03-build/11-the-agent-factory?role=buyer&role=seller&q=a%2Fb",
  );
});

test("book-map, glossary, summary, and static aliases preserve their queries", async () => {
  const matrix = [
    ["/guide/guide?from=map&tag=a&tag=b", "/guide?from=map&tag=a&tag=b"],
    ["/guide/appendix/glossary?from=chapter", "/glossary?from=chapter"],
    ["/guide/understand?utm_source=old%2Fportal", "/docs/01-understand/01-why-software-engineering-is-changing?utm_source=old%2Fportal"],
  ];

  for (const [source, target] of matrix) {
    const response = await render(source);
    assert.equal(response.status, 308, source);
    assert.equal(response.headers.get("location"), target, source);
  }
});

test("compatible document and glossary paths render repaired content without a redirect", async () => {
  const chapter = await htmlFor("/docs/01-understand/02-the-factory-in-one-view?role=buyer&role=seller");
  assert.match(chapter, /<article class="document-article"/);
  assert.match(chapter, /rel="canonical" href="https:\/\/ai-software-factory-mastery\.vercel\.app\/docs\/01-understand\/02-the-factory-in-one-view"/);
  assert.match(await htmlFor("/glossary?term=proof%20package"), /Canonical Glossary/);
});
