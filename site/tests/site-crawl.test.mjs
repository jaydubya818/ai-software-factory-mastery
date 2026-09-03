import assert from "node:assert/strict";
import test from "node:test";
import { htmlFor, render } from "./helpers/render.mjs";

// Crawl the built site the way a browser would: start at the home page, follow every
// internal href, and require every one to render. This catches links the Markdown
// checker cannot see — links produced by the renderer, by navigation, and by rewrites.

test("every internal link reachable from the home page resolves", async () => {
  const seen = new Set(["/"]);
  const queue = ["/"];
  const broken = [];
  while (queue.length) {
    const route = queue.shift();
    const response = await render(route);
    if (response.status !== 200) { broken.push(`${route} → ${response.status}`); continue; }
    const html = await response.text();
    for (const match of html.matchAll(/href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
      const href = match[1].replace(/\/$/, "") || "/";
      if (href.startsWith("/_next/") || /\.(png|svg|jpg|jpeg|webp|xml|txt|json|ico|css|js)$/.test(href)) continue;
      if (!seen.has(href)) { seen.add(href); queue.push(href); }
    }
  }
  assert.ok(seen.size > 60, `expected to crawl the whole site, crawled ${seen.size}`);
  assert.deepEqual(broken, [], "every internal link must render");
});

test("unpublished repository files link out to GitHub instead of a dead route", async () => {
  const html = await htmlFor("/docs/06-improve/42-mission-control-as-a-living-case-study");
  assert.doesNotMatch(html, /href="\.\.?\/[^"]*\.md/, "no raw relative .md links survive");
  assert.match(html, /github\.com\/jaydubya818\/ai-software-factory-mastery\/blob\/main\/guide\/appendix\/mission-control\/evidence/);
});

test("robots, sitemap, and search index are published", async () => {
  const { readFile } = await import("node:fs/promises");
  const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  assert.match(sitemap, /<loc>[^<]+\/docs\/appendix\/glossary<\/loc>/);
  const robots = await readFile(new URL("../public/robots.txt", import.meta.url), "utf8");
  assert.match(robots, /Sitemap: /);
  const index = JSON.parse(await readFile(new URL("../public/search-index.json", import.meta.url), "utf8"));
  assert.ok(index.length > 50 && index[0].sections.length > 0, "section-level search index");
});
