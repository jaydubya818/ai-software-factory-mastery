import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { htmlFor } from "./helpers/render.mjs";

// Generated TOC and search anchors must agree with the actual rendered corpus,
// including repeated headings and headings with inline Markdown markup.

function tableOfContentsIds(html) {
  const aside = html.match(
    /<aside class="table-of-contents"[\s\S]*?<\/aside>/,
  )?.[0];
  if (!aside) return [];
  return [...aside.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
}

function renderedHeadingIds(html) {
  // Section labels in the sidebar are h2 elements without an id, so keying on
  // the id attribute selects only headings emitted by the Markdown renderer.
  return new Set(
    [...html.matchAll(/<h[23] id="([^"]+)"/g)].map((match) => match[1]),
  );
}

function documentSlugs(html) {
  return [
    ...new Set(
      [...html.matchAll(/href="\/docs\/((?:00-front-matter|stages|0[1-6]-(?:understand|design|build|prove|operate|improve)|appendix)\/[^"#]+)"/g)]
        .map((match) => match[1]),
    ),
  ];
}

test("every table-of-contents entry targets a heading that exists", async () => {
  // The book map lists every document, so the corpus is discovered rather
  // than hard-coded and newly added chapters are covered automatically.
  const slugs = documentSlugs(await htmlFor("/guide"));
  assert.ok(slugs.length > 40, `expected the full book, found ${slugs.length}`);

  const broken = [];
  const searchIndex = JSON.parse(await readFile(new URL("../public/guide/search-index.json", import.meta.url), "utf8"));
  let checkedAnchors = 0;

  for (const slug of slugs) {
    const html = await htmlFor(`/guide/${slug}`);
    const headingIds = renderedHeadingIds(html);
    const allIds = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(allIds).size, allIds.length, `${slug} must have document-wide unique IDs`);

    for (const anchor of tableOfContentsIds(html)) {
      checkedAnchors += 1;
      if (!headingIds.has(anchor)) broken.push(`${slug} -> #${anchor}`);
    }
    for (const section of searchIndex.find((document) => document.slug === slug)?.sections ?? []) {
      if (section.id && !headingIds.has(section.id)) broken.push(`search: ${slug} -> #${section.id}`);
    }
  }

  assert.ok(checkedAnchors > 100, `expected a meaningful anchor corpus, got ${checkedAnchors}`);
  assert.deepEqual(broken, [], "table-of-contents anchors must match rendered heading ids");
});

test("changelog repeated headings have distinct TOC and search destinations", async () => {
  const html = await htmlFor("/guide/appendix/changelog");
  const headingIds = renderedHeadingIds(html);
  const index = JSON.parse(await readFile(new URL("../public/guide/search-index.json", import.meta.url), "utf8"));
  const sections = index.find((document) => document.slug === "appendix/changelog").sections;
  for (const label of ["added", "changed"]) {
    const expected = [label, ...Array.from({ length: 7 }, (_, index) => `${label}-${index + 1}`)];
    for (const id of expected) {
      assert.ok(headingIds.has(id), id);
      assert.ok(sections.some((section) => section.id === id), `search ${id}`);
    }
  }
  for (const id of tableOfContentsIds(html)) assert.ok(headingIds.has(id), `TOC ${id}`);
});
