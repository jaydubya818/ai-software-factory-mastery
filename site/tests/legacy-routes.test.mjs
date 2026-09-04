import assert from "node:assert/strict";
import test from "node:test";

import { documents } from "../lib/content.generated.ts";
import {
  legacyAnchorDestination,
  legacyAnchorRedirects,
  legacyDocumentRedirects,
  retiredFdlcSummaryRedirects,
} from "../lib/legacy-routes.ts";
import { render } from "./helpers/render.mjs";

test("every renumbered chapter redirects directly to its canonical /guide route", async () => {
  assert.equal(Object.keys(legacyDocumentRedirects).length, 28);

  for (const [legacySlug, canonicalSlug] of Object.entries(legacyDocumentRedirects)) {
    for (const prefix of ["/docs", "/guide"]) {
      const response = await render(`${prefix}/${legacySlug}`);
      assert.equal(response.status, 308, `${prefix}/${legacySlug} redirects permanently`);
      assert.equal(response.headers.get("location"), `/guide/${canonicalSlug}`);
    }
  }
});

test("all six retired FDLC Guide summaries redirect directly to canonical chapters", async () => {
  assert.deepEqual(Object.keys(retiredFdlcSummaryRedirects).sort(), ["build", "design", "improve", "operate", "prove", "understand"]);

  for (const [summary, canonicalSlug] of Object.entries(retiredFdlcSummaryRedirects)) {
    const response = await render(`/guide/${summary}`);
    assert.equal(response.status, 308);
    assert.equal(response.headers.get("location"), `/guide/${canonicalSlug}`);
  }
});

test("every moved anchor targets a published heading under /guide", () => {
  const bySlug = new Map(documents.map((document) => [document.slug, document]));
  const redirects = Object.values(legacyAnchorRedirects).flatMap((mapping) => Object.values(mapping));
  assert.equal(redirects.length, 72);

  for (const target of redirects) {
    const [path, fragment] = target.replace(/^\/guide\//, "").split("#");
    const document = bySlug.get(path);
    assert.ok(document, `${path} is published`);
    assert.ok(document.headings.some((heading) => heading.id === fragment), `${target} targets a rendered heading`);
  }
});

test("fragment remapping preserves repeated and encoded query values", () => {
  const destination = legacyAnchorDestination(
    "03-build/11-the-agent-factory",
    "#what-a-good-skill-is",
    "?ref=first&ref=second&return=%2Fguide%2Fsearch%3Fq%3Dskills",
  );

  assert.equal(
    destination,
    "/guide/03-build/12-skills-as-packages?ref=first&ref=second&return=%2Fguide%2Fsearch%3Fq%3Dskills#what-a-good-skill-is",
  );
});

test("fragment remapping safely ignores unknown or malformed anchors", () => {
  assert.equal(legacyAnchorDestination("03-build/11-the-agent-factory", "#not-moved", "?ref=test"), null);
  assert.equal(legacyAnchorDestination("03-build/11-the-agent-factory", "#%E0%A4%A", "?ref=test"), null);
});
