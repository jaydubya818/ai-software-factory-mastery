import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { htmlFor, render } from "./helpers/render.mjs";

async function generatedDocuments() {
  const source = await readFile(new URL("../lib/content.generated.ts", import.meta.url), "utf8");
  const json = source.replace(/^[\s\S]*?export const documents = /, "").replace(/ as const;\s*$/, "");
  return JSON.parse(json);
}

function documentLinks(html) {
  const pattern = /href="(\/docs\/(?:00-front-matter|stages|0[1-6]-(?:understand|design|build|prove|operate|improve)|appendix)\/[^"#?]+)/g;
  return [...new Set([...html.matchAll(pattern)].map((match) => decodeURIComponent(match[1])))];
}

const chapterSlugs = {
  1: "01-understand/01-why-software-engineering-is-changing",
  2: "01-understand/02-the-factory-in-one-view",
  3: "01-understand/03-first-principles-trust-evidence-and-authority",
  25: "03-build/25-the-12-layer-production-ai-agent-stack",
  44: "06-improve/44-where-this-is-going",
};

test("generated content reflects the book structure", async () => {
  const documents = await generatedDocuments();
  const chapters = documents.filter((document) => document.chapter !== null && document.chapter > 0);
  const removedQuestionMetadata = String.fromCharCode(104, 97, 115, 73, 110, 116, 101, 114, 118, 105, 101, 119, 81, 117, 101, 115, 116, 105, 111, 110, 115);
  assert.equal(chapters.length, 44, "44 numbered chapters");
  assert.deepEqual(chapters.map((document) => document.chapter), Array.from({ length: 44 }, (_, index) => index + 1));
  assert.ok(documents.some((document) => document.slug === "00-front-matter/00-how-to-read-this-guide" && document.chapter === 0));
  assert.ok(documents.some((document) => document.slug === "guide" && document.contentType === "overview"));
  assert.ok(documents.some((document) => document.slug === "appendix/glossary"));
  assert.ok(documents.some((document) => document.slug === "appendix/governed-factory-admission"));
  assert.equal(documents.filter((document) => document.contentType === "lab").length, 0, "labs removed");
  assert.equal(documents.filter((document) => document.contentType === "stage").length, 8, "8 stages");
  assert.ok(documents.filter((document) => document.contentType === "case study").length >= 3);
  for (const key of ["readingMinutes", "hasQuickRead", removedQuestionMetadata, "hasWhiteboardExercise", "audience", "risk", "status", "lifecycle", "topics", "architectureLayers"]) {
    assert.ok(!(key in documents[0]), `${key} should not be generated`);
  }
  for (const chapter of chapters) {
    assert.ok(Array.isArray(chapter.infographics), `${chapter.slug} has infographics`);
    assert.ok(chapter.summary.length > 0, `${chapter.slug} has a summary`);
    assert.ok(chapter.part, `${chapter.slug} has a part`);
  }
});

test("governed Factory admission keeps execution and authority boundaries explicit", async () => {
  const html = await htmlFor("/guide/appendix/governed-factory-admission");
  assert.match(html, /Factory Version.*WorkOrder.*Task.*Attempt.*Unpublished Candidate.*Verification Subject.*Verifier Attempt.*Human Decision/is);
  assert.match(html, /Readiness is a conclusion over authoritative records.*must not set.*READY/is);
  assert.match(html, /Producer completion ≠ independent verification ≠ human acceptance ≠ publication ≠ release ≠ observed outcome/);
  assert.match(html, /SYNTHETIC_FACTORY_ADMISSION_QUALIFIED/);
  assert.match(html, /zero external model calls.*zero provider calls.*zero model transmissions.*zero publications.*zero Production mutations/is);
});

test("renders the canonical FDLC Guide landing and preserves role entry paths", async () => {
  const html = await htmlFor("/guide");

  assert.match(html, /<title>Table of Contents · The AI Software Factory Guide · FDLC<\/title>/i);
  assert.match(html, /The practical guide to the Factory Development Lifecycle/);
  assert.match(html, /Start with chapter 1/i);
  assert.match(html, /How to read this guide/);
  assert.match(html, /Intent → Plan → Define Agent → Execute through Harness → Apply Skills → Evaluate → Improve → Deliver Software/);
  for (const role of ["executive", "architect", "builder", "operator"]) assert.match(html, new RegExp(role));
  assert.match(html, new RegExp(`href="/docs/${chapterSlugs[1]}"`));
  assert.match(html, /href="\/visuals"/);
  assert.match(html, /href="\/topics"/);
  assert.doesNotMatch(html, /learning path|reading time|Quick Read|course progress|min read|Choose your path|status-badge/i);
});

test("each primary-navigation copy identifies exactly one current Guide surface", async () => {
  const matrix = [
    ["/guide", "/guide"],
    [`/guide/${chapterSlugs[2]}`, "/guide"],
    ["/guide/stages/04-execute-through-harness", "/guide"],
    ["/guide/atlas", "/visuals"],
    ["/guide/architecture", "/visuals"],
    ["/guide/topics", "/topics"],
    ["/guide/coverage", "/topics"],
    ["/guide/appendix/principles", "/topics"],
    ["/guide/glossary", "/glossary"],
    ["/guide/search", "/search"],
    ["/visuals", "/visuals"],
    ["/architecture", "/visuals"],
    ["/topics", "/topics"],
    ["/coverage", "/topics"],
    ["/glossary", "/glossary"],
    ["/search", "/search"],
    [`/docs/${chapterSlugs[2]}`, "/guide"],
  ];

  for (const [route, expectedHref] of matrix) {
    const html = await htmlFor(route);
    const header = html.match(/<header class="app-header">[\s\S]*?<\/header>/)?.[0];
    assert.ok(header, `${route} renders the shared header`);
    const current = [...header.matchAll(/<a\b[^>]*aria-current="page"[^>]*>/g)]
      .map((match) => match[0].match(/href="([^"]+)"/)?.[1]);
    assert.deepEqual(current, [expectedHref, expectedHref], `${route} has one current item in desktop and mobile navigation`);
  }
});

test("Guide pages retain the FDLC global shell and canonical Guide dropdown routes", async () => {
  const html = await htmlFor(`/guide/${chapterSlugs[2]}`);
  const header = html.match(/<header class="app-header">[\s\S]*?<\/header>/)?.[0];
  assert.ok(header, "renders the persistent FDLC global header");
  assert.doesNotMatch(header, /brand-copy|<small>The Guide<\/small>/, "Guide identity does not replace the global shell");
  for (const [label, href] of [
    ["Framework", "https://www.fdlc.ai/framework"],
    ["Architecture", "https://www.fdlc.ai/architecture"],
    ["Mission Control", "https://www.fdlc.ai/mission-control"],
    ["FDE", "https://www.fdlc.ai/deploy"],
    ["Maturity", "https://www.fdlc.ai/maturity"],
  ]) assert.match(header, new RegExp(`href="${href}"[^>]*>${label}<`), label);
  for (const [label, href] of [
    ["Overview", "/guide"],
    ["Atlas", "/visuals"],
    ["Reference", "/topics"],
    ["Glossary", "/glossary"],
    ["Search", "/search"],
  ]) assert.equal([...header.matchAll(new RegExp(`href="${href}"[^>]*>${label}<`, "g"))].length, 2, `${label} exists in desktop and mobile navigation`);
  assert.match(header, /<button aria-controls="guide-navigation" aria-expanded="false" aria-current="page"/);
  assert.match(header, /<button aria-controls="mobile-guide-navigation" aria-expanded="true" aria-current="page" class="is-active"/);
  for (const id of ["guide-navigation", "more-navigation", "mobile-navigation", "mobile-guide-navigation"]) {
    assert.equal([...header.matchAll(new RegExp(`id="${id}"`, "g"))].length, 1, `${id} is unique`);
  }
});

test("Guide keeps the global navigation centered like the FDLC shell", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.site-header\s*\{[\s\S]*?grid-template-columns:\s*1fr auto 1fr;/);
  assert.match(css, /\.header-tools\s*\{\s*justify-self:\s*end;/);
});

test("all Guide surfaces share the five-item More menu on desktop and mobile", async () => {
  for (const route of ["/guide", `/guide/${chapterSlugs[2]}`, "/guide/atlas", "/guide/topics", "/guide/glossary", "/guide/search"]) {
    const html = await htmlFor(route);
    const header = html.match(/<header class="app-header">[\s\S]*?<\/header>/)?.[0];
    assert.ok(header, route);
    const more = header.match(/id="more-navigation"[^>]*>([\s\S]*?)<\/div>/)?.[1];
    const mobileMore = header.match(/<span>More<\/span>([\s\S]*?)<\/nav>/)?.[1];
    for (const menu of [more, mobileMore]) {
      assert.ok(menu, route);
      assert.deepEqual([...menu.matchAll(/<a\b[^>]*>([^<]+)<\/a>/g)].map((match) => match[1]), ["FDLC in 5 Minutes", "Manifesto", "Start", "Enterprise", "About"], route);
    }
    assert.doesNotMatch(header, /href="[^"]*\/(?:spec|specification|benchmarks)"/, route);
  }
});

test("renders every canonical primary surface with an explicit canonical", async () => {
  const routes = [
    ["/guide", /Table of contents/, "/guide"],
    ["/guide/atlas", /These ten maps are narrower detail/, "/visuals"],
    ["/guide/architecture", /Trace the factory from intent to evidence\./, "/architecture"],
    ["/guide/topics", /The reference shelf\./, "/topics"],
    ["/guide/coverage", /Coverage is not proof\./, "/coverage"],
    ["/guide/search", /Search the whole system\./, "/search"],
    ["/guide/glossary", /Canonical Glossary/, "/glossary"],
  ];

  for (const [route, expected, canonicalPath] of routes) {
    const html = await htmlFor(route);
    assert.match(html, expected);
    const absoluteRoute = `https://ai-software-factory-mastery\\.vercel\\.app${canonicalPath.replaceAll("/", "\\/")}`;
    assert.match(html, new RegExp(`rel="canonical" href="${absoluteRoute}"`));
    assert.match(html, new RegExp(`property="og:url" content="${absoluteRoute}"`));
    assert.match(html, /property="og:image" content="https:\/\/ai-software-factory-mastery\.vercel\.app\/guide\/og-v2\.png"/);
  }
});

test("guide table of contents lists front matter and all 44 chapters with summaries", async () => {
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
  assert.match(html, /href="\/glossary"/);
  assert.equal(documentLinks(html).filter((link) => /^\/docs\/0[1-6]-/.test(link)).length, 44);
  assert.doesNotMatch(html, /reading time|mark complete|selected path|interview mode|learning path/i);
});

test("chapter 2 renders with one final title, canonical, TOC, and prev/next", async () => {
  const html = await htmlFor(`/guide/${chapterSlugs[2]}`);

  assert.match(html, /<title>The factory in one view · The AI Software Factory Guide · FDLC<\/title>/i);
  assert.match(html, new RegExp(`rel="canonical" href="https://ai-software-factory-mastery\\.vercel\\.app/docs/${chapterSlugs[2]}"`));
  assert.match(html, new RegExp(`property="og:url" content="https://ai-software-factory-mastery\\.vercel\\.app/docs/${chapterSlugs[2]}"`));
  assert.match(
    html,
    /"isPartOf":\{"@type":"Book","name":"The AI Software Factory Guide","url":"https:\/\/ai-software-factory-mastery\.vercel\.app\/guide"\}/,
    "JSON-LD identifies the canonical Guide root as the parent Book",
  );
  assert.match(html, /Part I — Understand/);
  assert.match(html, /Chapter 2/);
  assert.match(html, /2\. The factory in one view/);
  for (const heading of ["The problem", "How it works", "How to build it", "Failure modes", "In Mission Control", "Retain this", "Go deeper"]) {
    assert.match(html, new RegExp(heading), `renders ${heading}`);
  }
  assert.match(html, /On this page/);
  assert.doesNotMatch(html, /Infographic placeholder|graphic goes here/, "unfilled infographic callouts are hidden from readers");
  assert.match(html, /\/guide\/infographics\/|class="mermaid|language-mermaid/, "the visual fallback still renders");
  assert.match(html, new RegExp(`href="/docs/${chapterSlugs[1]}"`), "previous links to chapter 1");
  assert.match(html, new RegExp(`href="/docs/${chapterSlugs[3]}"`), "next links to chapter 3");
  assert.doesNotMatch(html, /At a glance|mode-switcher|Mark chapter complete|Interview practice|\d+ min read|status-badge|document-status/i);
});

test("linked Markdown headings render valid, non-nested anchors", async () => {
  const html = await htmlFor(`/guide/${chapterSlugs[25]}`);
  const headingAnchors = [...html.matchAll(/<a class="heading-anchor"[^>]*>([\s\S]*?)<\/a>/g)];

  assert.ok(headingAnchors.length > 0, "plain headings retain their permalink anchors");
  for (const [, content] of headingAnchors) {
    assert.doesNotMatch(content, /<a\b/i, "a heading permalink must not contain another anchor");
  }
  assert.match(
    html,
    /<h3 id="1-business-understanding-chapter-6">1\. Business Understanding — <a href="\/docs\/02-design\/06-intent-and-specification-engineering">Chapter 6<\/a><\/h3>/,
    "linked headings retain their inline destination without an outer anchor",
  );
});

test("ordinary code blocks retain keyboard-accessible regions alongside Mermaid dispatch", async () => {
  const html = await htmlFor("/guide/02-design/06-intent-and-specification-engineering");
  const blocks = [...html.matchAll(/<pre\b[^>]*>/g)].map((match) => match[0]);
  assert.ok(blocks.length > 0, "ordinary fenced code remains a pre element");
  for (const block of blocks) {
    assert.match(block, /role="region"/);
    assert.match(block, /aria-label="Scrollable code example"/);
    assert.match(block, /tabindex="0"/);
  }
  assert.match(html, /class="mermaid-diagram"/, "Mermaid keeps its separate renderer");
  assert.doesNotMatch(html, /<pre[^>]*>\s*<code class="language-mermaid"/);
});

test("reading sequence runs front matter → stages → chapters → appendices", async () => {
  const frontMatter = await htmlFor("/guide/00-front-matter/00-how-to-read-this-guide");
  assert.match(frontMatter, /Front matter/);
  assert.match(frontMatter, new RegExp(`href="/docs/${chapterSlugs[1]}"`), "front matter links forward to chapter 1");

  const stageOne = await htmlFor("/guide/stages/01-builder-intent");
  assert.match(stageOne, /Stage 1/);
  assert.match(stageOne, /href="\/docs\/stages\/02-plan"/, "stage 1 links forward to stage 2");
  const stageEight = await htmlFor("/guide/stages/08-deliver-software");
  assert.match(stageEight, new RegExp(`href="/docs/${chapterSlugs[1]}"`), "stage 8 links forward to chapter 1");

  const last = await htmlFor(`/guide/${chapterSlugs[44]}`);
  assert.match(last, /Chapter 44/);
  assert.match(last, /href="\/docs\/appendix\//, "chapter 44 links forward into the appendix");

  const glossary = await htmlFor("/guide/glossary");
  assert.match(glossary, /Canonical Glossary/);
});

test("compatible static aliases resolve directly and old public tool paths render", async () => {
  const matrix = [
    ["/", "/guide"],
    ["/atlas", "/visuals"],
    ["/docs/appendix/glossary", "/glossary"],
    ["/docs/guide", "/guide"],
  ];

  for (const [source, target] of matrix) {
    const response = await render(source);
    assert.equal(response.status, 308, source);
    assert.equal(response.headers.get("location"), target, source);
  }

  for (const route of ["/visuals", "/architecture", "/topics", "/coverage", "/search", "/glossary"]) {
    assert.equal((await render(route)).status, 200, route);
  }

  assert.equal((await render("/docs/00-overview/02-canonical-glossary")).status, 404);
});

test("reference shelf lists the appendices with a plain search box", async () => {
  const html = await htmlFor("/guide/topics");
  assert.match(html, /Search the guide/);
  for (const slug of ["appendix/coverage-and-maturity", "appendix/changelog", "appendix/reviewer-guide", "appendix/architecture-communication", "appendix/operator-surfaces", "appendix/research/initial-canon", "appendix/mission-control/02-verification-first-software-factory"]) {
    assert.match(html, new RegExp(`href="/docs/${slug}"`), `lists ${slug}`);
  }
  assert.match(html, /href="\/glossary"/);
  assert.match(html, /Mission Control case studies/);
  assert.doesNotMatch(html, /topic-more-filters-toggle|All personas|All statuses|All risk levels|All guide areas/i);
});

test("atlas links resolve to existing chapters", async () => {
  const html = await htmlFor("/guide/atlas");
  const documents = await generatedDocuments();
  const slugs = new Set(documents.map((document) => document.slug));
  const links = documentLinks(html);
  assert.ok(links.length >= 10, "atlas has at least ten chapter links");
  for (const link of links) assert.ok(slugs.has(link.replace(/^\/docs\//, "")), `${link} resolves`);
  assert.match(html, new RegExp(`href="/docs/${chapterSlugs[25]}"`), "12-layer stack links to chapter 25");
});

test("every canonical document link on primary surfaces resolves to generated content", async () => {
  const documents = await generatedDocuments();
  const slugs = new Set(documents.map((document) => document.slug));
  const routes = ["/guide", "/guide/atlas", "/guide/architecture", "/guide/topics", "/guide/coverage", "/guide/search", `/guide/${chapterSlugs[2]}`, `/guide/${chapterSlugs[25]}`, "/guide/glossary"];
  const broken = [];
  for (const route of routes) {
    for (const link of documentLinks(await htmlFor(route))) {
      if (!slugs.has(link.replace(/^\/docs\//, ""))) broken.push(`${route} -> ${link}`);
    }
  }
  assert.deepEqual(broken, []);
});

test("keeps requested exclusions out of canonical public routes", async () => {
  const documents = await generatedDocuments();
  const contentRoutes = documents
    .filter(({ slug }) => slug !== "guide" && slug !== "appendix/glossary")
    .map(({ slug }) => `/guide/${slug}`);
  const routes = ["/guide", "/guide/atlas", "/guide/architecture", "/guide/topics", "/guide/coverage", "/guide/search", "/guide/glossary", ...contentRoutes];
  const terms = [
    [65, 100, 111, 98, 101],
    [87, 111, 114, 107, 100, 97, 121],
    [72, 111, 112, 112, 101, 114],
    [87, 111, 114, 107, 98, 101, 110, 99, 104],
    [77, 101, 116, 97, 32, 70, 97, 99, 116, 111, 114, 121],
    [73, 110, 116, 101, 114, 118, 105, 101, 119],
  ].map((codes) => String.fromCharCode(...codes));
  const excluded = new RegExp(terms.join("|"), "i");

  for (const route of routes) assert.doesNotMatch(await htmlFor(route), excluded);
});

test("Mission Control case-study content carries a bounded current-status notice", async () => {
  for (const route of [
    "/guide/06-improve/42-mission-control-as-a-living-case-study",
    "/guide/appendix/mission-control/01-implementation-maturity-and-evidence-map",
  ]) {
    const html = await htmlFor(route);
    assert.match(html, /Implementation status · September 2026/);
    assert.match(html, /human-governed delivery kernel through verified pull request and acceptance/);
    assert.match(html, /MissionControl\/blob\/main\/docs\/product\/software-factory-capability-maturity\.md/);
  }
});

test("architecture explorer does not publish the retired nine-step lifecycle", async () => {
  const html = await htmlFor("/guide/architecture");
  assert.doesNotMatch(html, />Lifecycle<\/button>/);
  assert.doesNotMatch(html, />09<\/span>[\s\S]*?<h3>Learn<\/h3>/);
  assert.doesNotMatch(html, /Use lifecycle for sequence/);
  assert.match(html, />Planes<\/button>/);
});

test("generated documents contain no infographic production notes", async () => {
  const documents = await generatedDocuments();
  const productionNote = new RegExp([103, 114, 97, 112, 104, 105, 99, 32, 103, 111, 101, 115, 32, 104, 101, 114, 101].map((code) => String.fromCharCode(code)).join(""), "i");
  for (const document of documents) assert.doesNotMatch(document.content, productionNote, document.slug);
});

test("landing and TOC expose the eight clickable stages", async () => {
  const home = await htmlFor("/guide");
  for (const slug of ["01-builder-intent", "02-plan", "03-define-agent", "04-execute-through-harness", "05-apply-skills", "06-evaluate", "07-improve", "08-deliver-software"]) {
    assert.match(home, new RegExp(`href="/docs/stages/${slug}"`), `landing links to stage ${slug}`);
  }
  assert.match(home, /8 stages/);
});
