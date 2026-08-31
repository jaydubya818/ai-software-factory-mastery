import assert from "node:assert/strict";
import test from "node:test";
import { htmlFor } from "./helpers/render.mjs";

test("renders the finished reader-first landing page", async () => {
  const html = await htmlFor("/");

  assert.match(html, /<title>AI Software Factory Mastery<\/title>/i);
  assert.match(html, /Build the system around the agent\./);
  assert.match(html, /Four paths\. One system\./);
  assert.match(html, /The worker is not the system\./);
  assert.match(html, /Reliable autonomy comes from a trustworthy system/);
  assert.match(html, /property="og:image" content="http:\/\/localhost:3000\/og\.png"/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("renders each primary discovery route", async () => {
  const routes = [
    ["/learn", /Executive.*Architect.*Builder.*Deep Study/s],
    ["/topics", /Find the chapter behind the question\./],
    ["/search", /Search the whole system\./],
  ];

  for (const [route, expected] of routes) {
    const html = await htmlFor(route);
    assert.match(html, expected);
  }
});

test("renders Markdown chapters with document-specific metadata", async () => {
  const html = await htmlFor("/docs/00-overview/05-software-factory-stack-boundaries");

  assert.match(html, /<title>Software Factory Stack Boundaries · AI Software Factory Mastery<\/title>/i);
  assert.match(html, /Quick Read included/);
  assert.match(html, /Name a layer by the responsibility it owns/);
  assert.match(html, /Independent quality and evidence path/);
  assert.equal((html.match(/<h1>Software Factory Stack Boundaries<\/h1>/g) ?? []).length, 1);
});

test("renders distinct metadata for multiple chapter routes", async () => {
  const architecture = await htmlFor("/docs/05-runtime-architecture/01-control-plane-and-execution-plane");
  const evaluation = await htmlFor("/docs/06-ai-engineering/04-evaluation-engineering-trace-replay-and-run-comparison");

  assert.match(architecture, /<title>Control Plane and Execution Plane · AI Software Factory Mastery<\/title>/i);
  assert.match(architecture, /Separate durable authority and policy from long running, failure prone execution\./i);
  assert.match(evaluation, /<title>Evaluation Engineering, Trace Replay, and Run Comparison · AI Software Factory Mastery<\/title>/i);
  assert.match(evaluation, /Agent behavior changes when the model, prompt, tools, harness, context, environment, repository, or evaluator changes\./i);
});

test("renders the review-ready agent architecture chapter as a self-contained resource", async () => {
  const html = await htmlFor("/docs/06-ai-engineering/01-agent-architecture-mcp-tools-context-and-memory");

  assert.match(html, /<title>Agent Architecture, MCP, Tools, Context, and Memory · AI Software Factory Mastery<\/title>/i);
  assert.match(html, /Status:\s*(?:<!-- -->)?review ready/i);
  assert.match(html, /Protocol version note/);
  assert.match(html, /MCP is an interoperability boundary/);
  assert.match(html, /Govern the MCP connection, not only the tool call/);
  assert.match(html, /The lab passes only if another reviewer can reconstruct the exact configuration/);
  assert.doesNotMatch(html, /todo 024|draft for study/i);
});

test("keeps requested exclusions out of public routes", async () => {
  const routes = ["/", "/learn", "/topics", "/docs/00-overview/02-canonical-glossary"];
  const terms = [
    [87, 111, 114, 107, 100, 97, 121],
    [72, 111, 112, 112, 101, 114],
    [87, 111, 114, 107, 98, 101, 110, 99, 104],
  ].map((codes) => String.fromCharCode(...codes));
  const excluded = new RegExp(`\\b(?:${terms.join("|")})\\b`, "i");

  for (const route of routes) {
    assert.doesNotMatch(await htmlFor(route), excluded);
  }
});
