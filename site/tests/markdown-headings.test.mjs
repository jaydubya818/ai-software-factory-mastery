import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownHeadings, remarkHeadingIds } from "../lib/markdown-headings.ts";

function ids(markdown) {
  return markdownHeadings(markdown).map((heading) => heading.id);
}

test("heading IDs are unique across depths and Mermaid blocks, preserving first anchors", () => {
  const markdown = "## Added\n\n### Changed\n\n```mermaid\nflowchart LR\nA --> B\n```\n\n### Added\n\n## Changed\n\n### Added";
  const expected = ["added", "changed", "added-1", "changed-1", "added-2"];
  assert.deepEqual(ids(markdown), expected);
  assert.deepEqual(ids(markdown), expected, "allocation must reset for each document/render");
  const html = renderToStaticMarkup(createElement(ReactMarkdown, {
    remarkPlugins: [remarkGfm, remarkHeadingIds],
  }, markdown));
  assert.deepEqual([...html.matchAll(/<h[23] id="([^"]+)"/g)].map((match) => match[1]), expected);
});

test("duplicate suffixes never steal an existing natural heading anchor", () => {
  assert.deepEqual(ids("## Added\n## Added\n### Added 1\n## Added\n### Added 2\n## Added 1"),
    ["added", "added-3", "added-1", "added-4", "added-2", "added-1-1"]);
  assert.deepEqual(ids("## Résumé\n## Resume\n## résumé-1"), ["resume", "resume-2", "resume-1"]);
  assert.deepEqual(ids("## !!!\n## ???\n## Section 1"), ["section", "section-2", "section-1"]);
});

test("heading parsing uses rendered text and skips code while retaining source section boundaries", () => {
  const markdown = [
    "## [Visible `label`](https://example.com/hidden) &amp; **bold**",
    "First section text.",
    "~~~markdown", "## Not a heading", "~~~",
    "```mermaid", "## Also not a heading", "```",
    "Second heading\n--------------", "Second section text.",
  ].join("\n\n");
  const headings = markdownHeadings(markdown);
  assert.deepEqual(headings.map(({ id, text }) => ({ id, text })), [
    { id: "visible-label-bold", text: "Visible label & bold" },
    { id: "second-heading", text: "Second heading" },
  ]);
  assert.match(markdown.slice(headings[0].position.end.offset, headings[1].position.start.offset), /First section text/);
  assert.match(markdown.slice(headings[1].position.end.offset), /Second section text/);
});
