import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { htmlFor, render } from "./helpers/render.mjs";

async function generatedDocuments() {
  const source = await readFile(new URL("../lib/content.generated.ts", import.meta.url), "utf8");
  const json = source.replace(/^[\s\S]*?export const documents = /, "").replace(/ as const;\s*$/, "");
  return JSON.parse(json);
}

function docLinks(html) {
  return [...new Set([...html.matchAll(/href="(\/docs\/[^"#?]+)/g)].map((match) => decodeURIComponent(match[1])))];
}

const chapterSlugs = {
  1: "01-understand/01-why-software-engineering-is-changing",
  2: "01-understand/02-the-factory-in-one-view",
  3: "01-understand/03-first-principles-trust-evidence-and-authority",
  19: "03-build/19-the-12-layer-production-ai-agent-stack",
  36: "06-improve/36-where-this-is-going",
};

test("generated content reflects the book structure", async () => {
  const documents = await generatedDocuments();
  const chapters = documents.filter((document) => document.chapter !== null && document.chapter > 0);
  assert.equal(chapters.length, 36, "36 numbered chapters");
  assert.deepEqual(chapters.map((document) => document.chapter), Array.from({ length: 36 }, (_, index) => index + 1));
  assert.ok(documents.some((document) => document.slug === "00-front-matter/00-how-to-read-this-guide" && document.chapter === 0));
  assert.ok(documents.some((document) => document.slug === "guide" && document.contentType === "overview"));
  assert.ok(documents.some((document) => document.slug === "appendix/glossary"));
  assert.equal(documents.filter((document) => document.contentType === "lab").length, 0, "labs removed");
  assert.equal(documents.filter((document) => document.contentType === "stage").length, 8, "8 stages");
  assert.ok(documents.filter((document) => document.contentType === "case study").length >= 3);
  const removedHiringMetadata = String.fromCharCode(104, 97, 115, 73, 110, 116, 101, 114, 118, 105, 101, 119, 81, 117, 101, 115, 116, 105, 111, 110, 115);
  for (const key of ["readingMinutes", "hasQuickRead", removedHiringMetadata, "hasWhiteboardExercise", "audience", "risk", "status", "lifecycle", "topics", "architectureLayers"]) {
    assert.ok(!(key in documents[0]), `${key} should not be generated`);
  }
  for (const chapter of chapters) {
    assert.ok(Array.isArray(chapter.infographics), `${chapter.slug} has infographics`);
    assert.ok(chapter.summary.length > 0, `${chapter.slug} has a summary`);
    assert.ok(chapter.part, `${chapter.slug} has a part`);
    assert.doesNotMatch(chapter.content, /graphic goes here/i, `${chapter.slug} has no publishing placeholder`);
  }
});

test("renders the book landing page", async () => {
  const html = await htmlFor("/");

  assert.match(html, /The AI Software Factory Guide/);
  assert.match(html, /Start with Chapter 1/);
  assert.match(html, /How to read this guide/);
  assert.match(html, /Intent → Plan → Define Agent → Execute through Harness → Apply Skills → Evaluate → Improve → Deliver Software/);
  assert.match(html, /Agent Factory/);
  assert.match(html, /Mission Control/);
  for (const part of ["Understand", "Design", "Build", "Prove", "Operate", "Improve"]) assert.match(html, new RegExp(part));
  assert.match(html, new RegExp(`href="/docs/${chapterSlugs[1]}"`));
  assert.match(html, /href="\/visuals"/);
  assert.match(html, /href="\/topics"/);
  assert.doesNotMatch(html, /learning path|reading time|Quick Read|course progress|min read|Choose your path|status-badge/i);
});

test("renders every primary surface", async () => {
  const routes = [
    ["/guide", /Table of contents/],
    ["/visuals", /These ten maps are narrower/],
    ["/architecture", /Trace the factory from intent to evidence\./],
    ["/topics", /The reference shelf\./],
    ["/coverage", /Coverage is not proof\./],
    ["/search", /Search the whole system\./],
  ];

  for (const [route, expected] of routes) assert.match(await htmlFor(route), expected);
});

test("guide table of contents lists front matter and all 36 chapters with summaries", async () => {
  const html = await htmlFor("/guide");
  const documents = await generatedDocuments();
  const chapters = documents.filter((document) => document.chapter !== null);

  for (const chapter of chapters) {
    assert.match(html, new RegExp(`href="/docs/${chapter.slug}"`), `TOC links ${chapter.slug}`);
  }
  assert.match(html, /How to read this guide/);
  assert.match(html, /Why software engineering is changing/);
  assert.match(html, /Where this is going/);
  assert.match(html, /Part I — Understand/);
  assert.match(html, /Part VI — Improve/);
  assert.match(html, /Appendices/);
  assert.match(html, /href="\/docs\/appendix\/glossary"/);
  assert.equal(docLinks(html).filter((link) => /^\/docs\/0[1-6]-/.test(link)).length, 36);
  assert.doesNotMatch(html, /reading time|mark complete|selected path|learning path/i);
});

test("chapter 2 renders with part label, chapter number, TOC, and prev/next", async () => {
  const html = await htmlFor(`/docs/${chapterSlugs[2]}`);

  assert.match(html, /<title>The factory in one view · The AI Software Factory Guide<\/title>/i);
  assert.match(html, /Part I — Understand/);
  assert.match(html, /Chapter 2/);
  assert.match(html, /2\. The factory in one view/);
  for (const heading of ["The problem", "How it works", "How to build it", "Failure modes", "In Mission Control", "Retain this", "Go deeper"]) {
    assert.match(html, new RegExp(heading), `renders ${heading}`);
  }
  assert.match(html, /On this page/);
  assert.doesNotMatch(html, /Infographic placeholder|graphic goes here/, "unfilled infographic callouts are hidden from readers");
  assert.match(html, /<!-- infographic: |class="mermaid|language-mermaid/, "the mermaid fallback still renders");
  assert.match(html, new RegExp(`href="/docs/${chapterSlugs[1]}"`), "previous links to chapter 1");
  assert.match(html, new RegExp(`href="/docs/${chapterSlugs[3]}"`), "next links to chapter 3");
  assert.doesNotMatch(html, /At a glance|mode-switcher|Mark chapter complete|\d+ min read|status-badge|document-status/i);
});

test("reading sequence runs front matter → chapters → appendices", async () => {
  const frontMatter = await htmlFor("/docs/00-front-matter/00-how-to-read-this-guide");
  assert.match(frontMatter, /Front matter/);
  assert.match(frontMatter, new RegExp(`href="/docs/${chapterSlugs[1]}"`), "front matter links forward to chapter 1");

  const stageOne = await htmlFor("/docs/stages/01-builder-intent");
  assert.match(stageOne, /Stage 1/);
  assert.match(stageOne, /href="\/docs\/stages\/02-plan"/, "stage 1 links forward to stage 2");
  const stageEight = await htmlFor("/docs/stages/08-deliver-software");
  assert.match(stageEight, new RegExp(`href="/docs/${chapterSlugs[1]}"`), "stage 8 links forward to chapter 1");

  const last = await htmlFor(`/docs/${chapterSlugs[36]}`);
  assert.match(last, /Chapter 36/);
  assert.match(last, /href="\/docs\/appendix\//, "chapter 36 links forward into the appendix");

  const glossary = await htmlFor("/docs/appendix/glossary");
  assert.match(glossary, /Canonical Glossary/);
});

test("legacy routes redirect or disappear", async () => {
  const learn = await render("/learn");
  assert.ok(learn.status === 404 || (learn.status >= 300 && learn.status < 400), `/learn should be gone or redirect, got ${learn.status}`);

  const glossary = await render("/glossary");
  assert.ok(glossary.status >= 300 && glossary.status < 400, `/glossary should redirect, got ${glossary.status}`);
  assert.match(glossary.headers.get("location") ?? "", /\/docs\/appendix\/glossary$/);

  const old = await render("/docs/00-overview/02-canonical-glossary");
  assert.equal(old.status, 404);
});

test("reference shelf lists the appendices with a plain search box", async () => {
  const html = await htmlFor("/topics");
  assert.match(html, /Search the guide/);
  for (const slug of ["appendix/glossary", "appendix/coverage-and-maturity", "appendix/changelog", "appendix/reviewer-guide", "appendix/architecture-communication", "appendix/research/initial-canon", "appendix/mission-control/02-verification-first-software-factory"]) {
    assert.match(html, new RegExp(`href="/docs/${slug}"`), `lists ${slug}`);
  }
  assert.match(html, /Mission Control case studies/);
  assert.doesNotMatch(html, /topic-more-filters-toggle|All personas|All statuses|All risk levels|All guide areas/i);
});

test("atlas links resolve to existing chapters", async () => {
  const html = await htmlFor("/visuals");
  const documents = await generatedDocuments();
  const slugs = new Set(documents.map((document) => document.slug));
  const links = docLinks(html);
  assert.ok(links.length >= 10, "atlas has at least ten chapter links");
  for (const link of links) assert.ok(slugs.has(link.replace(/^\/docs\//, "")), `${link} resolves`);
  assert.match(html, new RegExp(`href="/docs/${chapterSlugs[19]}"`), "12-layer stack links to chapter 19");
  assert.match(html, /href="\/docs\/03-build\/13-coding-harnesses-and-agent-protocols"/);
  assert.match(html, /href="\/docs\/02-design\/07-governance-policy-and-risk-proportional-approval"/);
  assert.match(html, /href="\/docs\/05-operate\/28-observability-telemetry-and-forensics"/);
  assert.match(html, /href="\/docs\/02-design\/08-economics-metrics-and-human-attention"/);
  assert.match(html, /href="\/docs\/03-build\/15-agent-architecture"/);
  assert.match(html, /href="\/docs\/03-build\/18-agent-and-loop-engineering"/);
});

test("every internal /docs link on rendered pages resolves to a generated document", async () => {
  const documents = await generatedDocuments();
  const slugs = new Set(documents.map((document) => document.slug));
  const routes = ["/", "/guide", "/visuals", "/architecture", "/topics", "/coverage", "/search", `/docs/${chapterSlugs[2]}`, `/docs/${chapterSlugs[19]}`, "/docs/appendix/glossary"];
  const broken = [];
  for (const route of routes) {
    for (const link of docLinks(await htmlFor(route))) {
      if (!slugs.has(link.replace(/^\/docs\//, ""))) broken.push(`${route} -> ${link}`);
    }
  }
  assert.deepEqual(broken, []);
});

test("keeps requested exclusions out of public routes", async () => {
  const documents = await generatedDocuments();
  const routes = ["/", "/guide", "/visuals", "/architecture", "/topics", ...documents.map((document) => `/docs/${document.slug}`)];
  const terms = [
    [65, 100, 111, 98, 101],
    [87, 111, 114, 107, 100, 97, 121],
    [72, 111, 112, 112, 101, 114],
    [87, 111, 114, 107, 98, 101, 110, 99, 104],
    [77, 101, 116, 97, 32, 70, 97, 99, 116, 111, 114, 121],
    [73, 110, 116, 101, 114, 118, 105, 101, 119],
  ].map((codes) => String.fromCharCode(...codes));
  const excluded = new RegExp(`\\b(?:${terms.join("|")})\\b`, "i");

  for (const route of routes) assert.doesNotMatch(await htmlFor(route), excluded);
});

test("home and TOC expose the eight clickable stages", async () => {
  const home = await htmlFor("/");
  for (const slug of ["01-builder-intent", "02-plan", "03-define-agent", "04-execute-through-harness", "05-apply-skills", "06-evaluate", "07-improve", "08-deliver-software"]) {
    assert.match(home, new RegExp(`href="/docs/stages/${slug}"`), `home links to stage ${slug}`);
  }
  const toc = await htmlFor("/guide");
  assert.match(toc, /8 stages/);
  assert.match(toc, /href="\/docs\/stages\/06-evaluate"/);
});
