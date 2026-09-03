import assert from "node:assert/strict";
import test from "node:test";

import { documents } from "../lib/content.generated.ts";
import { legacyAnchorRedirects, legacyDocumentRedirects } from "../lib/legacy-routes.ts";
import { render } from "./helpers/render.mjs";

test("every renumbered production chapter redirects to its canonical route", async () => {
  assert.equal(Object.keys(legacyDocumentRedirects).length, 28);

  for (const [legacySlug, canonicalSlug] of Object.entries(legacyDocumentRedirects)) {
    const response = await render(`/docs/${legacySlug}`);
    assert.ok(response.status >= 300 && response.status < 400, `${legacySlug} redirects`);
    assert.match(response.headers.get("location") ?? "", new RegExp(`/docs/${canonicalSlug}$`));
  }
});

test("every moved anchor targets a published heading", () => {
  const bySlug = new Map(documents.map((document) => [document.slug, document]));
  const redirects = Object.values(legacyAnchorRedirects).flatMap((mapping) => Object.values(mapping));
  assert.equal(redirects.length, 72);

  for (const target of redirects) {
    const [path, fragment] = target.replace(/^\/docs\//, "").split("#");
    const document = bySlug.get(path);
    assert.ok(document, `${path} is published`);
    assert.ok(document.headings.some((heading) => heading.id === fragment), `${target} targets a rendered heading`);
  }
});
