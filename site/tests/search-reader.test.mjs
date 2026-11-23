import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { searchDocuments } from "../lib/search-client.ts";
import { matchingWords, normalizeSearchText, readingMinutes, searchTerms } from "../lib/text.ts";

const index = JSON.parse(await readFile(new URL("../public/guide/search-index.json", import.meta.url), "utf8"));

test("the public search index excludes withdrawn editorial material", () => {
  assert.doesNotMatch(JSON.stringify(index), /zach|software-factory-as-code/i);
});

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

test("ordinary questions prefer definitions and matching respects word boundaries", () => {
  assert.match(searchDocuments(index, "what is a factory version", 1)[0].href, /#term-factory-version$/);
  assert.deepEqual(searchDocuments(index, "the"), []);
  assert.equal(searchDocuments(index, "station").some((item) => item.section?.id === "term-remote-development-workstation"), false);
  const text = "The café and the cafeteria.";
  const marked = matchingWords(text, searchTerms("the cafe")).map(({start, end}) => text.slice(start, end));
  assert.deepEqual(marked, ["café"]);
});
