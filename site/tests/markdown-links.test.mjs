import assert from "node:assert/strict";
import test from "node:test";
import { htmlFor } from "./helpers/render.mjs";

// resolveDocumentHref in lib/content.ts rewrites the relative *.md links the
// Markdown sources use into site routes. Nothing asserted on that rewrite, so
// a change to the slug scheme or the anchor normalizer could silently turn
// every cross-reference in the curriculum into a dead link.

function articleBody(html) {
  const article = html.match(/<article class="document-article"[\s\S]*?<\/article>/)?.[0];
  assert.ok(article, "chapter pages should render an article body");
  return article;
}

function hrefs(html) {
  return [...articleBody(html).matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
}

test("rewrites sibling and cross-section .md links to site routes", async () => {
  const links = hrefs(await htmlFor("/docs/00-overview/start-here"));

  // ./07-topic-index.md, relative to guide/00-overview/README.md
  assert.ok(
    links.includes("/docs/00-overview/07-topic-index"),
    "a sibling .md link should resolve to the sibling chapter route",
  );

  const blueprint = hrefs(
    await htmlFor("/docs/00-overview/03-platform-blueprint-and-operating-playbook"),
  );
  // ../05-runtime-architecture/06-...md, resolved across section directories
  assert.ok(
    blueprint.includes(
      "/docs/05-runtime-architecture/06-ai-software-factory-reference-architecture",
    ),
    "a ../ link into another section should resolve to that chapter route",
  );
});

test("normalizes link fragments onto the ids headings actually render with", async () => {
  // The source writes ./06-reading-paths.md#executive-path--20-minutes, spelled
  // with the double dash an em dash in the heading produces. normalizeAnchor
  // has to collapse it the same way the heading slug does or the deep link
  // lands at the top of the page instead of the section.
  const links = hrefs(await htmlFor("/docs/00-overview/start-here"));
  const readingPathLinks = links.filter((href) =>
    href.startsWith("/docs/00-overview/06-reading-paths#"),
  );

  assert.ok(readingPathLinks.length >= 4, "start-here should deep link into the reading paths");
  assert.ok(
    readingPathLinks.includes("/docs/00-overview/06-reading-paths#executive-path-20-minutes"),
    "the double dash in the source fragment should collapse to a single dash",
  );

  // Every fragment those links use must exist as a heading on the target page.
  const target = await htmlFor("/docs/00-overview/06-reading-paths");
  const headingIds = new Set(
    [...target.matchAll(/<h[23] id="([^"]+)"/g)].map((match) => match[1]),
  );

  for (const href of readingPathLinks) {
    const fragment = href.split("#")[1];
    assert.ok(headingIds.has(fragment), `#${fragment} is linked but no heading renders it`);
  }
});

test("leaves external links intact and opens them safely", async () => {
  const links = hrefs(
    await htmlFor("/docs/00-overview/01-ai-software-factory-and-mission-control"),
  );
  const external = links.filter((href) => href.startsWith("https://"));

  assert.ok(external.length > 0, "this chapter cites external sources");
  // Absolute URLs must survive the .md rewrite untouched, including the ones
  // whose paths end in .md on the remote repository.
  assert.ok(external.some((href) => href.endsWith(".md")));

  const article = articleBody(
    await htmlFor("/docs/00-overview/01-ai-software-factory-and-mission-control"),
  );
  for (const [, attributes] of article.matchAll(/<a ([^>]*href="https:\/\/[^"]*"[^>]*)>/g)) {
    assert.match(attributes, /target="_blank"/, "external links should open in a new tab");
    assert.match(attributes, /rel="noreferrer"/, "external links must not leak the referrer");
  }
});
