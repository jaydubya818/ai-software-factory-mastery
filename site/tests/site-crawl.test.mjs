import assert from "node:assert/strict";
import test from "node:test";
import { htmlFor, render } from "./helpers/render.mjs";

test("every internal link reachable from the canonical Guide landing resolves", async () => {
  const seen = new Set(["/guide"]);
  const queue = ["/guide"];
  const broken = [];
  while (queue.length) {
    const route = queue.shift();
    const response = await render(route);
    if (response.status !== 200) { broken.push(`${route} → ${response.status}`); continue; }
    const html = await response.text();
    for (const match of html.matchAll(/href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
      const href = match[1].replace(/\/$/, "") || "/";
      if (!href.startsWith("/guide")) continue;
      if (href.startsWith("/_next/") || /\.(png|svg|jpg|jpeg|webp|xml|txt|json|ico|css|js)$/.test(href)) continue;
      if (!seen.has(href)) { seen.add(href); queue.push(href); }
    }
  }
  assert.ok(seen.size > 60, `expected to crawl the whole Guide, crawled ${seen.size}`);
  assert.deepEqual(broken, [], "every canonical internal link must render");
});

test("unpublished repository files link out to GitHub instead of a dead route", async () => {
  const html = await htmlFor("/guide/06-improve/42-mission-control-as-a-living-case-study");
  assert.doesNotMatch(html, /href="\.\.?\/[^"]*\.md/, "no raw relative .md links survive");
  assert.match(html, /github\.com\/jaydubya818\/ai-software-factory-mastery\/blob\/main\/guide\/appendix\/mission-control\/evidence/);
});

test("Guide discovery, search, and public assets are published under /guide", async () => {
  const { readdir, readFile } = await import("node:fs/promises");
  const sitemap = await readFile(new URL("../public/guide/sitemap.xml", import.meta.url), "utf8");
  assert.match(sitemap, /<loc>https:\/\/ai-software-factory-mastery\.vercel\.app\/guide\/glossary<\/loc>/);
  assert.doesNotMatch(sitemap, /\/docs\//);
  const robots = await readFile(new URL("../public/guide/robots.txt", import.meta.url), "utf8");
  assert.match(robots, /Sitemap: https:\/\/ai-software-factory-mastery\.vercel\.app\/guide\/sitemap\.xml/);
  const rootRobots = await readFile(new URL("../public/robots.txt", import.meta.url), "utf8");
  assert.match(rootRobots, /Sitemap: https:\/\/ai-software-factory-mastery\.vercel\.app\/guide\/sitemap\.xml/);
  const rootSitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  assert.match(rootSitemap, /<sitemapindex/);
  assert.match(rootSitemap, /<loc>https:\/\/ai-software-factory-mastery\.vercel\.app\/guide\/sitemap\.xml<\/loc>/);
  assert.doesNotMatch(rootSitemap, /<url>/, "the root compatibility file delegates instead of duplicating canonical entries");
  const index = JSON.parse(await readFile(new URL("../public/guide/search-index.json", import.meta.url), "utf8"));
  assert.ok(index.length > 50 && index[0].sections.length > 0, "section-level search index");
  const infographics = await readdir(new URL("../public/guide/infographics", import.meta.url));
  assert.equal(infographics.length, 186, "all generated infographic assets are namespaced");
  for (const asset of ["og.png", "og-v2.png", "icon.svg"]) {
    await readFile(new URL(`../public/guide/${asset}`, import.meta.url));
  }
});
