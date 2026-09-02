import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);

async function render(pathname = "/") {
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

async function htmlFor(pathname) {
  const response = await render(pathname);
  assert.equal(response.status, 200, `${pathname} should render successfully`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("renders the guide-first landing page", async () => {
  const html = await htmlFor("/");

  assert.match(html, /Build, operate, and master the/);
  assert.match(html, /whole/);
  assert.match(html, /Read the complete guide/);
  assert.match(html, /Open the visual guide/);
  assert.match(html, /Agent Factory/);
  assert.match(html, /AI Software Factory/);
  assert.match(html, /Mission Control/);
  assert.match(html, /Follow the decisions required to build a real factory/);
  assert.match(html, /Control flows down\. Evidence flows back up\./);
  assert.match(html, /Ten maps for retaining the system/);
  assert.match(html, /Reliable autonomy comes from a trustworthy system/);
  assert.doesNotMatch(html, /Choose your path|Four paths\. One system|Continue learning|course progress/i);
});

test("renders every primary guide surface", async () => {
  const routes = [
    ["/guide", /Six parts\. One end-to-end operating system\./],
    ["/visuals", /Ten original, readable system maps/],
    ["/architecture", /Trace the factory from intent to evidence\./],
    ["/topics", /Find the exact concept without navigating a course\./],
    ["/coverage", /Coverage is not proof\./],
    ["/search", /Search the whole system\./],
  ];

  for (const [route, expected] of routes) assert.match(await htmlFor(route), expected);
});

test("renders the complete six-part guide without course mechanics", async () => {
  const html = await htmlFor("/guide");

  for (const part of ["Understand", "Design", "Build", "Prove", "Operate", "Improve"]) assert.match(html, new RegExp(part));
  assert.match(html, /Production AI Agent Engineering Stack/);
  assert.match(html, /Engineering Attention Altitude and Governed Control/);
  assert.match(html, /Architecture Communication/);
  assert.doesNotMatch(html, /reading time|mark complete|selected path|interview mode/i);
});

test("renders all ten first-party visual maps", async () => {
  const html = await htmlFor("/visuals");
  const expected = [
    "From governed intent to confirmed outcome",
    "The twelve disciplines around the agent",
    "Orchestration connects intelligence to controlled execution",
    "Choose the simplest architecture that can safely solve the problem",
    "Memory is a governed write, retrieval, update, and forgetting system",
    "Every attempt ends in verify, correct, retry, stop, or escalate",
    "Govern the system through seven connected control pillars",
    "Observe behavior without confusing telemetry with authority",
    "Use protocols for connection",
    "Move your attention to the level the risk and evidence justify",
  ];
  for (const title of expected) assert.match(html, new RegExp(title));
  assert.match(html, /No screenshots with tiny labels/);
});

test("renders full chapters as one readable source", async () => {
  const html = await htmlFor("/docs/00-overview/05-software-factory-stack-boundaries");

  assert.match(html, /<title>Software Factory Stack Boundaries · AI Software Factory Mastery<\/title>/i);
  assert.match(html, /At a glance/);
  assert.match(html, /Name a layer by the responsibility it owns/);
  assert.match(html, /Independent quality and evidence path/);
  assert.match(html, /Related guide chapters/);
  assert.doesNotMatch(html, /mode-switcher|Mark chapter complete|Interview practice|\d+ min read/i);
});

test("legacy mode URLs still render the complete chapter without mode UI", async () => {
  const html = await htmlFor("/docs/00-overview/02-canonical-glossary?mode=interview");
  assert.match(html, /Canonical Glossary/);
  assert.match(html, /Business Understanding/);
  assert.match(html, /Harness Engineering/);
  assert.match(html, /Temporal Memory/);
  assert.doesNotMatch(html, /Interview mode|Mark interview complete|Questions and framing|mode-switcher/i);
});

test("reference index uses only search and one area selector", async () => {
  const html = await htmlFor("/topics");
  assert.match(html, /Search the guide/);
  assert.match(html, /All guide areas/);
  assert.match(html, /chapters/);
  assert.doesNotMatch(html, /topic-more-filters-toggle|All personas|All statuses|All risk levels/i);
});

test("coverage distinguishes guide maturity from implementation proof", async () => {
  const html = await htmlFor("/coverage");
  assert.match(html, /See where the guide carries weight\./);
  assert.match(html, /What is covered\. What is not proven\./);
  assert.match(html, /Lifecycle coverage/);
  assert.match(html, /Architecture coverage/);
  assert.match(html, /Audience coverage/);
  assert.doesNotMatch(html, /href="\/topics\?status=|Interview material|curriculum feedback/i);
});

test("renders the new production engineering and attention chapters", async () => {
  const stack = await htmlFor("/docs/06-ai-engineering/11-production-ai-agent-engineering-stack");
  const attention = await htmlFor("/docs/03-operating-model/07-engineering-attention-altitude-and-control");

  assert.match(stack, /The twelve disciplines/);
  assert.match(stack, /Building the agent is one layer/);
  assert.match(stack, /Diagnose failures by owner/);
  assert.match(attention, /Five attention levels/);
  assert.match(attention, /Direct control and governed control/);
  assert.match(attention, /Evaluated coverage and out-of-distribution work/);
});

test("keeps requested exclusions out of public routes", async () => {
  const routes = ["/", "/guide", "/visuals", "/architecture", "/topics", "/docs/00-overview/02-canonical-glossary"];
  const terms = [
    [87, 111, 114, 107, 100, 97, 121],
    [72, 111, 112, 112, 101, 114],
    [87, 111, 114, 107, 98, 101, 110, 99, 104],
  ].map((codes) => String.fromCharCode(...codes));
  const excluded = new RegExp(`\\b(?:${terms.join("|")})\\b`, "i");

  for (const route of routes) assert.doesNotMatch(await htmlFor(route), excluded);
});
