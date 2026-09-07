import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { searchDocuments } from "../lib/search-client.ts";
import { normalizeSearchText, readingMinutes } from "../lib/text.ts";

const index = JSON.parse(await readFile(new URL("../public/guide/search-index.json", import.meta.url), "utf8"));

test("hyphenated and spaced search forms resolve to the same subsection", () => {
  const hyphenated = searchDocuments(index, "multi-repository", 1)[0];
  const spaced = searchDocuments(index, "multi repository", 1)[0];
  assert.equal(hyphenated.href, spaced.href);
  assert.match(hyphenated.href, /#the-coordination-repository$/);
  assert.equal(normalizeSearchText("AI-native"), "ai native");
});

test("required canonical glossary terms resolve to their own stable anchors", () => {
  for (const term of ["Factory Version", "Execution Profile", "WorkOrder", "Attempt", "Verification Subject", "Evidence", "Human Authority", "Outcome", "Factory Deployed Engineer"]) {
    const hit = searchDocuments(index, term).find((result) => result.document.slug === "appendix/glossary" && result.section?.heading === term);
    assert.ok(hit, `${term} has a canonical glossary result`);
    assert.match(hit.href, new RegExp(`#term-${normalizeSearchText(term).replaceAll(" ", "-")}$`));
  }
});

test("reading estimates use one plausible prose rate", () => {
  assert.equal(readingMinutes("word ".repeat(225)), 1);
  assert.equal(readingMinutes("word ".repeat(226)), 2);
});
