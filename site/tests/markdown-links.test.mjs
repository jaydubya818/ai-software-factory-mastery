import assert from "node:assert/strict";
import test from "node:test";
import { htmlFor } from "./helpers/render.mjs";

// resolveDocumentHref in lib/content.ts rewrites the relative *.md links the
// Markdown sources use into site routes. These tests pin that rewrite so a
// change to the slug scheme or the anchor normalizer cannot silently turn
// every cross-reference in the book into a dead link.

function articleBody(html) {
  const article = html.match(/<article class="document-article"[\s\S]*?<\/article>/)?.[0];
  assert.ok(article, "chapter pages should render an article body");
  return article;
}

function hrefs(html) {
  return [...articleBody(html).matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
}

test("rewrites sibling and cross-part .md links to site routes", async () => {
  // ./01-what-this-guide-covers.md, relative to guide/00-front-matter/00-how-to-read-this-guide.md
  const frontMatter = hrefs(await htmlFor("/docs/00-front-matter/00-how-to-read-this-guide"));
  assert.ok(
    frontMatter.includes("/docs/00-front-matter/01-what-this-guide-covers"),
    "a sibling .md link should resolve to the sibling document route",
  );
  // ../appendix/glossary.md, resolved across directories
  assert.ok(frontMatter.includes("/docs/appendix/glossary"), "a ../ link into the appendix should resolve");

  // ../03-build/15-agent-architecture.md from a stage page
  const stage = hrefs(await htmlFor("/docs/stages/05-apply-skills"));
  assert.ok(
    stage.some((href) => href.startsWith("/docs/03-build/15-agent-architecture")),
    "a ../ link into another part should resolve to that chapter route",
  );
});

test("normalizes link fragments onto the ids headings actually render with", async () => {
  const links = hrefs(await htmlFor("/docs/03-build/15-agent-architecture"));
  const deepLinks = links.filter((href) => href.startsWith("/docs/03-build/13-coding-harnesses-and-agent-protocols#"));
  assert.ok(deepLinks.length >= 1, "chapter 15 should deep link into chapter 13");

  // Every fragment those links use must exist as a heading on the target page.
  const target = await htmlFor("/docs/03-build/13-coding-harnesses-and-agent-protocols");
  const headingIds = new Set([...target.matchAll(/<h[23] id="([^"]+)"/g)].map((match) => match[1]));

  for (const href of deepLinks) {
    const fragment = href.split("#")[1];
    assert.ok(headingIds.has(fragment), `#${fragment} is linked but no heading renders it`);
  }
});

test("leaves external links intact and opens them safely", async () => {
  const html = await htmlFor("/docs/01-understand/02-the-factory-in-one-view");
  const links = hrefs(html);
  const external = links.filter((href) => href.startsWith("https://"));

  assert.ok(external.length > 0, "this chapter cites external sources");

  const article = articleBody(html);
  for (const [, attributes] of article.matchAll(/<a ([^>]*href="https:\/\/[^"]*"[^>]*)>/g)) {
    assert.match(attributes, /target="_blank"/, "external links should open in a new tab");
    assert.match(attributes, /rel="noreferrer"/, "external links must not leak the referrer");
  }
});
