import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);

async function render(pathname = "/") {
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function htmlFor(pathname) {
  const response = await render(pathname);
  assert.equal(response.status, 200, `${pathname} should render successfully`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("renders the finished reader-first landing page", async () => {
  const html = await htmlFor("/");

  assert.match(html, /<title>AI Software Factory Mastery<\/title>/i);
  assert.match(html, /Build the system[\s\S]{0,40}around[\s\S]{0,40}the agent\./);
  assert.match(html, /Four paths\. One system\./);
  assert.match(html, /Canonical architecture explorer/);
  assert.match(html, /How work moves through the factory\./);
  assert.match(html, /The agent executes\./);
  assert.match(html, /Agent Factory/);
  assert.match(html, /href="\/docs\/agent-factory\/01-capability-supply-chain-and-registries"[^>]*>[\s\S]*?Agent Factory/);
  assert.match(html, /href="\/docs\/01-vision\/01-what-is-an-ai-software-factory"[^>]*>[\s\S]*?AI Software Factory/);
  assert.match(html, /href="\/docs\/09-mission-control-case-studies\/03-capability-workflow-and-admission-map"[^>]*>[\s\S]*?Mission Control/);
  assert.match(html, /Reliable autonomy comes from a trustworthy system/);
  assert.match(html, /property="og:image" content="http:\/\/localhost:3000\/og-v2\.png"/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("renders each primary discovery route", async () => {
  const routes = [
    ["/architecture", /Trace the factory from intent to evidence\./],
    ["/learn", /Executive.*Architect.*Builder.*Deep Study/s],
    ["/topics", /Find the chapter behind the question\./],
    ["/coverage", /Coverage is not proof\./],
    ["/search", /Search the whole system\./],
  ];

  for (const [route, expected] of routes) {
    const html = await htmlFor(route);
    assert.match(html, expected);
  }
});

test("renders the complete architecture hub and canonical reference contracts", async () => {
  const architecture = await htmlFor("/architecture");
  const runtime = await htmlFor("/docs/05-runtime-architecture/09-orchestration-component-model-and-runtime-contracts");
  const governance = await htmlFor("/docs/08-security-and-governance/06-agentic-governance-control-framework");
  const knowledge = await htmlFor("/docs/06-ai-engineering/08-knowledge-context-and-retrieval-pipeline-specification");

  assert.match(architecture, /Lifecycle/);
  assert.match(architecture, /Planes/);
  assert.match(architecture, /Components/);
  assert.match(architecture, /Governance/);
  assert.match(architecture, /Inventory/);
  assert.match(architecture, /Patterns/);
  assert.match(architecture, /Monitoring/);
  assert.match(architecture, /Data flow/);
  assert.match(architecture, /Evidence/);
  assert.match(architecture, /Start broad\. End at the contract\./);
  assert.match(architecture, /Architecture is not proof/);
  assert.match(runtime, /twelve component families/i);
  assert.match(runtime, /Stop-condition table/);
  assert.match(governance, /ten testable control families/i);
  assert.match(knowledge, /permission and tenant[\s\S]{0,120}before ranking/i);
});

test("renders the expanded autonomous-factory discovery and maturity system", async () => {
  const topics = await htmlFor("/topics");
  const coverage = await htmlFor("/coverage");
  const capability = await htmlFor("/docs/agent-factory/01-capability-supply-chain-and-registries");
  const delivery = await htmlFor("/docs/verification-delivery-engineering/03-progressive-delivery-production-verification-and-rollback");

  assert.match(topics, /Filter curriculum topics/);
  assert.match(topics, /Persona/);
  assert.match(topics, /Lifecycle/);
  assert.match(topics, /Maturity/);
  assert.match(topics, /Risk/);
  assert.match(coverage, /What is covered\. What is not proven\./);
  assert.match(coverage, /Operationally proven/);
  assert.match(capability, /registry is an authority surface/i);
  assert.match(capability, /Status:\s*(?:<!-- -->)?review ready/i);
  assert.match(delivery, /deployment is a state transition, not success/i);
});

test("renders Markdown chapters with document-specific metadata", async () => {
  const html = await htmlFor("/docs/00-overview/05-software-factory-stack-boundaries");

  assert.match(html, /<title>Software Factory Stack Boundaries · AI Software Factory Mastery<\/title>/i);
  assert.match(html, /Quick Read/);
  assert.match(html, /Complete chapter/);
  assert.match(html, /Mark chapter complete/);
  assert.match(html, /Name a layer by the responsibility it owns/);
  assert.match(html, /Independent quality and evidence path/);
  assert.equal((html.match(/<h1>Software Factory Stack Boundaries<\/h1>/g) ?? []).length, 1);
});

test("renders distinct metadata for multiple chapter routes", async () => {
  const architecture = await htmlFor("/docs/05-runtime-architecture/01-control-plane-and-execution-plane");
  const evaluation = await htmlFor("/docs/06-ai-engineering/04-evaluation-engineering-trace-replay-and-run-comparison");

  assert.match(architecture, /<title>Control Plane and Execution Plane · AI Software Factory Mastery<\/title>/i);
  assert.match(architecture, /Separate durable authority and policy from long running, failure prone execution\./i);
  assert.doesNotMatch(architecture, /og-v2\.png/i);
  assert.match(evaluation, /<title>Evaluation Engineering, Trace Replay, and Run Comparison · AI Software Factory Mastery<\/title>/i);
  assert.match(evaluation, /Agent behavior changes when the model, prompt, tools, harness, context, environment, repository, or evaluator changes\./i);
  assert.doesNotMatch(evaluation, /og-v2\.png/i);
});

test("renders the review-ready agent architecture chapter as a self-contained resource", async () => {
  const html = await htmlFor("/docs/06-ai-engineering/01-agent-architecture-mcp-tools-context-and-memory");

  assert.match(html, /<title>Agent Architecture, MCP, Tools, Context, and Memory · AI Software Factory Mastery<\/title>/i);
  assert.match(html, /Status:\s*(?:<!-- -->)?review ready/i);
  assert.match(html, /Protocol version note/);
  assert.match(html, /MCP is an interoperability boundary/);
  assert.match(html, /Govern the MCP connection, not only the tool call/);
  assert.match(html, /The lab passes only if another reviewer can reconstruct the exact configuration/);
  assert.doesNotMatch(html, /todo 024/i);
});

test("renders focused chapter modes from the same canonical source", async () => {
  const architecture = await htmlFor("/docs/06-ai-engineering/01-agent-architecture-mcp-tools-context-and-memory");
  const study = await htmlFor("/docs/00-overview/05-software-factory-stack-boundaries");
  const interview = await htmlFor("/docs/11-interview-mastery/01-executive-and-interview-mastery");

  assert.match(architecture, /\?mode=architecture/);
  assert.match(architecture, /Boundaries and contracts/);
  assert.match(study, /The chapter in one pass\./);
  assert.match(interview, /Interview practice/);
  assert.match(interview, /Explain the chapter’s thesis/);
});

test("renders the learning, topic, and coverage product surfaces", async () => {
  const learn = await htmlFor("/learn");
  const topics = await htmlFor("/topics");
  const coverage = await htmlFor("/coverage");

  assert.match(learn, /Selected path/);
  assert.match(learn, /Four paths\. One canonical system\./);
  assert.match(topics, /System map/);
  assert.match(topics, /Architecture/);
  assert.match(coverage, /Metadata-derived dashboard/);
  assert.match(coverage, /Lifecycle coverage/);
  assert.match(coverage, /Architecture coverage/);
});

test("keeps requested exclusions out of public routes", async () => {
  const routes = ["/", "/architecture", "/learn", "/topics", "/docs/00-overview/02-canonical-glossary"];
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
