import assert from "node:assert/strict";
import test from "node:test";
import { htmlFor } from "./helpers/render.mjs";

// Heading ids are produced twice from two different inputs: the table of
// contents uses ids that scripts/generate-content.mjs slugified from the raw
// Markdown heading line, while the heading itself is slugified by
// app/components/Markdown.tsx from the text react-markdown actually rendered.
// The two agree today only because both collapse every run of non-alphanumeric
// characters to one dash. Inline markup that carries extra words -- a link, an
// image, a footnote reference -- renders as less text than it spells, and the
// two ids diverge into a table of contents that scrolls nowhere.

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
      [...html.matchAll(/href="\/docs\/([^"#]+)"/g)].map((match) => match[1]),
    ),
  ];
}

test("every table-of-contents entry targets a heading that exists", async () => {
  // The book map lists every document, so the corpus is discovered rather
  // than hard-coded and newly added chapters are covered automatically.
  const slugs = documentSlugs(await htmlFor("/docs/guide"));
  assert.ok(slugs.length > 40, `expected the full book, found ${slugs.length}`);

  const broken = [];
  let checkedAnchors = 0;

  for (const slug of slugs) {
    const html = await htmlFor(`/docs/${slug}`);
    const headingIds = renderedHeadingIds(html);

    for (const anchor of tableOfContentsIds(html)) {
      checkedAnchors += 1;
      if (!headingIds.has(anchor)) broken.push(`${slug} -> #${anchor}`);
    }
  }

  assert.ok(checkedAnchors > 100, `expected a meaningful anchor corpus, got ${checkedAnchors}`);
  assert.deepEqual(broken, [], "table-of-contents anchors must match rendered heading ids");
});
