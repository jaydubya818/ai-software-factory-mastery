"use client";

import Link from "next/link";
import { useState } from "react";

type NodeId = "human" | "control" | "contract" | "outer" | "inner" | "environment" | "compute" | "candidate" | "verification" | "decision" | "delivery" | "production" | "feedback" | "agent-factory" | "agents" | "skills" | "tools" | "models" | "evals";
type Lane = "governance" | "execution" | "assurance" | "supply";
type FlowLens = "control" | "evidence";
type FactoryNode = { id: NodeId; label: string; eyebrow: string; description: string; href: string; lane: Lane };
type NodeDetail = { owns: string[]; excludes: string[]; inputs: string[]; outputs: string[]; authority: string; failures: string[]; evidence: string[] };

const nodes: FactoryNode[] = [
  { id: "human", label: "Human intent", eyebrow: "Purpose · policy · decisions", description: "Names the outcome, constraints, accountable owner, risk, and acceptable evidence before execution begins.", href: "/docs/00-overview/04-intent-to-delivery-lifecycle", lane: "governance" },
  { id: "control", label: "Control plane", eyebrow: "Governed orchestration", description: "Owns durable state, policy, admission, authority, dispatch eligibility, approvals, and recovery decisions.", href: "/docs/05-runtime-architecture/01-control-plane-and-execution-plane", lane: "governance" },
  { id: "contract", label: "Frozen execution contract", eyebrow: "Exact versions · bounded scope", description: "Pins the plan, capabilities, context, policy, budgets, environment, evaluators, and stopping rules for one attempt.", href: "/docs/04-domain-model/02-factory-configuration-workflows-and-execution-manifests", lane: "execution" },
  { id: "outer", label: "Outer harness", eyebrow: "Workflow control", description: "Coordinates durable work, approvals, retries, budgets, state transitions, and evidence capture around the coding session.", href: "/docs/05-runtime-architecture/08-coding-harnesses-adapters-and-agent-protocols", lane: "execution" },
  { id: "inner", label: "Inner harness", eyebrow: "Coding session", description: "Operates the model, tools, repository context, and local loop inside the authority granted by the outer harness.", href: "/docs/05-runtime-architecture/08-coding-harnesses-adapters-and-agent-protocols", lane: "execution" },
  { id: "environment", label: "Development environment", eyebrow: "Isolated workspace", description: "Provides the pinned repository, dependencies, tools, network policy, credentials, and side-effect boundary.", href: "/docs/05-runtime-architecture/07-development-environments-compute-and-composable-infrastructure", lane: "execution" },
  { id: "compute", label: "Compute", eyebrow: "Capacity · isolation · cost", description: "Supplies scheduled runtime capacity while enforcing tenancy, quotas, placement, and resource budgets.", href: "/docs/factory-platform-engineering/02-scheduling-capacity-cost-and-fairness", lane: "execution" },
  { id: "candidate", label: "Candidate + run record", eyebrow: "Artifact · trace · receipts", description: "Binds the proposed change to its exact inputs, actions, versions, side effects, and execution outcome.", href: "/docs/07-quality-engineering/04-quality-contract-and-certificate-technical-specification", lane: "assurance" },
  { id: "verification", label: "Independent verification", eyebrow: "Challenge, do not self-certify", description: "Evaluates the exact candidate in an independent quality context and produces eligible evidence and counterevidence.", href: "/docs/07-quality-engineering/01-quality-and-evidence-architecture", lane: "assurance" },
  { id: "decision", label: "Human / policy decision", eyebrow: "Approve · reject · restrict", description: "A named authority accepts, rejects, revises, conditions, or escalates the exact subject using independent evidence.", href: "/docs/03-operating-model/06-enterprise-governance-operating-model-and-decision-rights", lane: "governance" },
  { id: "delivery", label: "Delivery", eyebrow: "Merge · release · rollback", description: "Publishes only the approved artifact through controlled release, progressive rollout, production checks, and rollback.", href: "/docs/verification-delivery-engineering/03-progressive-delivery-production-verification-and-rollback", lane: "assurance" },
  { id: "production", label: "Production outcome", eyebrow: "Service · customer · business", description: "Connects the exact release to reliability, quality, security, cost, adoption, and customer-value signals.", href: "/docs/07-quality-engineering/02-release-production-feedback-and-factory-sre", lane: "assurance" },
  { id: "feedback", label: "Governed feedback", eyebrow: "Observe · compare · improve", description: "Turns recurring evidence into evaluated proposals; humans approve promotion, rollback, restriction, or retirement.", href: "/docs/03-operating-model/03-governed-continuous-learning-and-recursive-improvement", lane: "assurance" },
  { id: "agent-factory", label: "Agent Factory", eyebrow: "Capability supply chain", description: "Creates, versions, evaluates, publishes, and governs reusable agents, skills, tools, model profiles, configurations, and evaluation assets.", href: "/docs/agent-factory/01-capability-supply-chain-and-registries", lane: "supply" },
  { id: "agents", label: "Agents", eyebrow: "Versioned roles", description: "Bounded runtime compositions with explicit identity, objective, policy, tools, context, memory, budgets, and evaluation profile.", href: "/docs/06-ai-engineering/01-agent-architecture-mcp-tools-context-and-memory", lane: "supply" },
  { id: "skills", label: "Skills", eyebrow: "Reusable procedures", description: "Versioned instructions and assets with prerequisites, permissions, evaluations, ownership, and compatibility contracts.", href: "/docs/agent-factory/04-tool-skill-and-integration-contract-reference", lane: "supply" },
  { id: "tools", label: "Tools", eyebrow: "Authorized actions", description: "Narrow, schema-defined capabilities with authentication, authorization, side-effect classification, idempotency, and audit behavior.", href: "/docs/agent-factory/04-tool-skill-and-integration-contract-reference", lane: "supply" },
  { id: "models", label: "Model profiles", eyebrow: "Qualified inference", description: "Task-specific model, provider, parameters, limits, routing constraints, and evaluation baselines.", href: "/docs/06-ai-engineering/02-model-routing-evaluations-and-capability-selection", lane: "supply" },
  { id: "evals", label: "Evals", eyebrow: "Capability admission", description: "Repeatable cases and calibrated measures that gate certification, promotion, monitoring, and regression control.", href: "/docs/06-ai-engineering/06-evaluation-science-and-controlled-experimentation", lane: "supply" },
];

const nodeDetails: Record<NodeId, NodeDetail> = {
  human: { owns: ["Desired outcome and constraints", "Accountability and risk appetite"], excludes: ["Runtime execution", "Self-generated proof"], inputs: ["Business need", "Policy and operating context"], outputs: ["Intent decision", "Success and evidence criteria"], authority: "A named human or business authority may initiate, constrain, approve, pause, or withdraw the mission.", failures: ["Ambiguous outcome", "No accountable owner"], evidence: ["Intent record", "Accepted success criteria"] },
  control: { owns: ["Durable workflow state", "Admission, policy, and authority"], excludes: ["Model reasoning", "Independent quality judgment"], inputs: ["Intent decision", "Qualified capability inventory"], outputs: ["Authorized dispatch", "Decision and state history"], authority: "The control plane grants only policy-eligible capability and records every material transition.", failures: ["Unauthorized dispatch", "Split-brain state"], evidence: ["State-transition log", "Policy and approval receipts"] },
  contract: { owns: ["Frozen versions and scope", "Budgets, stop rules, and evaluators"], excludes: ["New authority during execution", "Mutable hidden configuration"], inputs: ["Approved plan", "Resolved capability set"], outputs: ["Immutable attempt manifest", "Reproducible execution boundary"], authority: "Execution may consume only the identities, versions, permissions, context, and budgets named by the contract.", failures: ["Configuration drift", "Unpinned dependency"], evidence: ["Manifest digest", "Resolution and policy receipts"] },
  outer: { owns: ["Lifecycle and recovery", "Timeouts, retries, and artifact capture"], excludes: ["Business intent", "Consequential acceptance authority"], inputs: ["Frozen execution contract", "Capability configuration and context package"], outputs: ["Execution record", "Candidate artifacts and observations"], authority: "The outer harness may coordinate the run but cannot expand its contract or certify its own work.", failures: ["Runaway retry loop", "Lost or partial receipts"], evidence: ["Attempt timeline", "Stop, retry, and recovery decisions"] },
  inner: { owns: ["Model and tool interaction", "Local plan-act-check loop"], excludes: ["Workflow admission", "Release approval"], inputs: ["Bounded task", "Repository context and authorized tools"], outputs: ["Proposed change", "Tool-call and reasoning trace"], authority: "The inner harness acts only through granted tools inside the current attempt boundary.", failures: ["Context drift", "Unbounded tool behavior"], evidence: ["Tool receipts", "Patch and session trace"] },
  environment: { owns: ["Workspace isolation", "Dependencies, credentials, and network policy"], excludes: ["Work prioritization", "Quality certification"], inputs: ["Repository revision", "Environment specification"], outputs: ["Reproducible workspace", "Environment and side-effect record"], authority: "The environment enforces the execution boundary; it does not decide what should ship.", failures: ["Cross-tenant leakage", "Non-reproducible dependency state"], evidence: ["Environment fingerprint", "Network and credential audit"] },
  compute: { owns: ["Placement and capacity", "Quota, tenancy, and cost limits"], excludes: ["Task semantics", "Approval policy"], inputs: ["Resource request", "Scheduling and isolation policy"], outputs: ["Leased runtime", "Usage and cost telemetry"], authority: "The scheduler may allocate capacity within quota; it cannot change mission scope or risk tier.", failures: ["Capacity starvation", "Quota or cost overrun"], evidence: ["Lease record", "Resource and cost metrics"] },
  candidate: { owns: ["Exact proposed artifact", "Lineage to one run and contract"], excludes: ["Readiness decision", "Production outcome claim"], inputs: ["Execution outputs", "Run and environment receipts"], outputs: ["Candidate identity", "Replayable run record"], authority: "A candidate is an inspectable subject, not permission to merge, release, or promote.", failures: ["Artifact/trace mismatch", "Missing provenance"], evidence: ["Artifact digest", "Complete run record"] },
  verification: { owns: ["Independent challenge", "Quality results and counterevidence"], excludes: ["Artifact production", "Final business acceptance"], inputs: ["Exact candidate", "Versioned quality contract"], outputs: ["Evaluator results", "Eligible evidence package"], authority: "Verification may pass or fail defined checks; material acceptance remains with the named decision authority.", failures: ["Producer self-certification", "Non-reproducible evaluator"], evidence: ["Test and evaluation results", "Verifier identity and environment"] },
  decision: { owns: ["Accept, reject, restrict, or escalate", "Conditions, rationale, and expiry"], excludes: ["Rewriting historical evidence", "Unrecorded exception"], inputs: ["Exact subject", "Evidence and counterevidence"], outputs: ["Decision record", "Authorized next transition"], authority: "Only the policy-designated human or service may authorize the material transition.", failures: ["Wrong decision owner", "Approval without eligible evidence"], evidence: ["Signed decision", "Reason, conditions, and policy basis"] },
  delivery: { owns: ["Merge and release controls", "Progressive rollout and rollback"], excludes: ["Changing the approved artifact", "Declaring customer value"], inputs: ["Approved candidate", "Release and rollback contract"], outputs: ["Deployed release", "Rollout and rollback record"], authority: "Delivery may publish only the approved identity under the approved release conditions.", failures: ["Artifact substitution", "Rollback path unavailable"], evidence: ["Deployment provenance", "Production verification results"] },
  production: { owns: ["Service and customer signals", "Release-to-outcome correlation"], excludes: ["Automatic policy promotion", "Retroactive success criteria"], inputs: ["Exact release identity", "Reliability, security, quality, cost, and value telemetry"], outputs: ["Outcome record", "Incident and drift signals"], authority: "Production observation may trigger containment or review; it does not silently rewrite policy or baselines.", failures: ["Uncorrelated telemetry", "Proxy mistaken for outcome"], evidence: ["SLO and incident records", "Release-linked outcome signals"] },
  feedback: { owns: ["Evidence aggregation", "Evaluated improvement proposals"], excludes: ["Unreviewed self-modification", "Silent baseline replacement"], inputs: ["Production outcomes", "Incidents, evals, and operator feedback"], outputs: ["Change proposal", "Promotion, restriction, or retirement decision"], authority: "Learning changes become active only after evaluation and the required human or policy approval.", failures: ["Feedback contamination", "Regression hidden by aggregate metrics"], evidence: ["Baseline/candidate comparison", "Promotion and rollback record"] },
  "agent-factory": { owns: ["Capability identity and lifecycle", "Certification, promotion, and revocation"], excludes: ["Mission-level authority", "Runtime acceptance decisions"], inputs: ["Capability source and owner", "Evaluation and compatibility requirements"], outputs: ["Qualified capability version", "Registry and lifecycle record"], authority: "The Agent Factory may admit a capability to supply; the Software Factory still decides whether it is eligible for a mission.", failures: ["Unqualified promotion", "Dependency or ownership drift"], evidence: ["Certification results", "Registry lineage and revocation status"] },
  agents: { owns: ["Bounded role composition", "Identity, policy, tools, context, and budgets"], excludes: ["Self-granted permissions", "Universal competence"], inputs: ["Versioned agent definition", "Qualified dependencies"], outputs: ["Resolvable agent version", "Capability and compatibility declaration"], authority: "An agent receives authority at runtime; its package describes capability but grants none by itself.", failures: ["Identity ambiguity", "Permission or dependency sprawl"], evidence: ["Agent manifest", "Evaluation and compatibility results"] },
  skills: { owns: ["Reusable procedure and assets", "Prerequisites and evaluation cases"], excludes: ["Runtime identity", "Ambient tool permission"], inputs: ["Versioned instructions", "Owner and dependency declarations"], outputs: ["Qualified skill package", "Usage and compatibility contract"], authority: "A skill guides behavior only within the agent and tool permissions already granted.", failures: ["Stale procedure", "Hidden prerequisite"], evidence: ["Skill manifest", "Regression evaluation results"] },
  tools: { owns: ["Narrow action schema", "Authentication, side effects, and audit behavior"], excludes: ["Workflow policy", "Intent interpretation"], inputs: ["Validated arguments", "Caller identity and authorization"], outputs: ["Typed result", "Side-effect and audit receipt"], authority: "The tool enforces its own authorization and side-effect boundary even when the caller is an agent.", failures: ["Overbroad authorization", "Non-idempotent retry"], evidence: ["Tool-call receipt", "Authorization and side-effect log"] },
  models: { owns: ["Qualified inference configuration", "Task, cost, latency, and quality envelope"], excludes: ["Agent authority", "Workflow durability"], inputs: ["Task profile", "Provider and evaluation constraints"], outputs: ["Resolvable model profile", "Routing and fallback policy"], authority: "A model profile is selected only when its evaluated envelope and policy fit the task.", failures: ["Capability mismatch", "Silent provider or parameter drift"], evidence: ["Model profile digest", "Baseline and routing evaluation"] },
  evals: { owns: ["Repeatable cases and measures", "Admission and regression thresholds"], excludes: ["Production execution", "Unilateral policy approval"], inputs: ["Versioned subject", "Dataset, grader, and threshold"], outputs: ["Evaluation result", "Promotion or regression signal"], authority: "Evaluations establish evidence against declared criteria; policy decides how that evidence gates use.", failures: ["Evaluator contamination", "Threshold gaming or dataset drift"], evidence: ["Dataset and grader versions", "Scores, traces, and comparison record"] },
};

const relationships: [NodeId, NodeId][] = [
  ["human", "control"], ["control", "contract"], ["contract", "outer"], ["outer", "inner"], ["inner", "environment"], ["environment", "compute"],
  ["compute", "candidate"], ["candidate", "verification"], ["verification", "decision"], ["decision", "delivery"], ["delivery", "production"], ["production", "feedback"],
  ["feedback", "agent-factory"], ["agent-factory", "agents"], ["agent-factory", "skills"], ["agent-factory", "tools"], ["agent-factory", "models"], ["agent-factory", "evals"],
  ["agents", "control"], ["skills", "control"], ["tools", "control"], ["models", "control"], ["evals", "verification"],
];

const factoryContexts = [
  { label: "Agent Factory", description: "Creates, versions, evaluates, publishes, and governs reusable capabilities.", href: "/docs/agent-factory/01-capability-supply-chain-and-registries" },
  { label: "AI Software Factory", description: "Composes people, policy, capabilities, execution, verification, delivery, production, and learning.", href: "/docs/01-vision/01-what-is-an-ai-software-factory" },
  { label: "Mission Control", description: "Implements control-plane responsibilities as a scoped case study—not the complete factory definition.", href: "/docs/09-mission-control-case-studies/03-capability-workflow-and-admission-map" },
] as const;

const flowIds: Record<FlowLens, Set<NodeId>> = {
  control: new Set(["human", "control", "contract", "outer", "inner", "environment", "compute", "agent-factory", "agents", "skills", "tools", "models"]),
  evidence: new Set(["inner", "candidate", "verification", "decision", "delivery", "production", "feedback", "evals"]),
};

const flowCopy: Record<FlowLens, { title: string; description: string }> = {
  control: { title: "Bounded capability flows down", description: "Humans and governed systems delegate purpose, policy, limits, and qualified capability toward execution." },
  evidence: { title: "Evidence and outcomes flow back up", description: "Execution reports observations and proof toward independent verification and accountable decision authority." },
};

const practiceLinks: Partial<Record<NodeId, string>> = {
  human: "/docs/10-labs/10-authority-containment-and-decision-replay-lab",
  contract: "/docs/10-labs/01-governed-issue-to-validated-pull-request",
  "agent-factory": "/docs/10-labs/03-capability-certification-and-revocation-lab",
  agents: "/docs/10-labs/03-capability-certification-and-revocation-lab",
  skills: "/docs/10-labs/03-capability-certification-and-revocation-lab",
  tools: "/docs/10-labs/03-capability-certification-and-revocation-lab",
  models: "/docs/10-labs/03-capability-certification-and-revocation-lab",
  evals: "/docs/10-labs/03-capability-certification-and-revocation-lab",
  delivery: "/docs/10-labs/06-progressive-delivery-and-rollback-lab",
  production: "/docs/10-labs/07-incident-remediation-and-postmortem-lab",
  feedback: "/docs/10-labs/08-continual-improvement-promotion-lab",
  decision: "/docs/10-labs/10-authority-containment-and-decision-replay-lab",
  control: "/docs/10-labs/10-authority-containment-and-decision-replay-lab",
  outer: "/docs/10-labs/11-orchestration-failure-recovery-and-cost-lab",
  inner: "/docs/10-labs/01-governed-issue-to-validated-pull-request",
};

const nodeById = new Map(nodes.map((node) => [node.id, node]));

function related(active: NodeId, candidate: NodeId) {
  return active === candidate || relationships.some(([from, to]) => (from === active && to === candidate) || (to === active && from === candidate));
}

export function FactoryArchitecture() {
  const [activeId, setActiveId] = useState<NodeId>("control");
  const [flowLens, setFlowLens] = useState<FlowLens>("control");
  const active = nodeById.get(activeId) ?? nodes[1];
  const detail = nodeDetails[active.id];
  const primary = nodes.filter((node) => node.lane !== "supply");
  const supply = nodes.filter((node) => node.lane === "supply");
  const upstream = relationships.filter(([, to]) => to === activeId).map(([from]) => nodeById.get(from)).filter(Boolean) as FactoryNode[];
  const downstream = relationships.filter(([from]) => from === activeId).map(([, to]) => nodeById.get(to)).filter(Boolean) as FactoryNode[];
  const practiceHref = practiceLinks[active.id] ?? (active.lane === "assurance" ? "/docs/10-labs/01-governed-issue-to-validated-pull-request" : "/docs/10-labs/11-orchestration-failure-recovery-and-cost-lab");

  function nodeButton(node: FactoryNode) {
    const inFlow = flowIds[flowLens].has(node.id);
    return (
      <button
        aria-controls="factory-node-inspector"
        aria-pressed={activeId === node.id}
        className={`factory-node lane-${node.lane} ${related(activeId, node.id) ? "is-related" : ""} ${inFlow ? "is-flow-relevant" : "is-flow-muted"} ${activeId === node.id ? "is-active" : ""}`}
        key={node.id}
        onClick={() => setActiveId(node.id)}
        onFocus={() => setActiveId(node.id)}
        type="button"
      >
        <small>{node.eyebrow}</small><strong>{node.label}</strong>
      </button>
    );
  }

  function relationshipGroup(label: string, relatedNodes: FactoryNode[]) {
    if (!relatedNodes.length) return null;
    return (
      <div className="factory-relationships">
        <span>{label}</span>
        <div>{relatedNodes.map((node) => <button key={node.id} onClick={() => setActiveId(node.id)} type="button">{node.label}</button>)}</div>
      </div>
    );
  }

  return (
    <section className="factory-architecture" id="factory-architecture" aria-labelledby="factory-architecture-title">
      <header className="section-heading architecture-section-heading">
        <div><span className="section-kicker">Canonical architecture explorer</span><h2 id="factory-architecture-title">Follow capability down. Trace evidence back up.</h2></div>
        <p>Use the flow lens, then select any component to inspect its responsibility, contracts, authority, failures, and proof.</p>
      </header>

      <div className="factory-flow-toolbar" aria-label="Architecture flow lens">
        <div className="factory-flow-tabs" role="group" aria-label="Choose a factory flow">
          <button className={flowLens === "control" ? "is-active" : undefined} onClick={() => setFlowLens("control")} type="button">Control flow</button>
          <button className={flowLens === "evidence" ? "is-active" : undefined} onClick={() => setFlowLens("evidence")} type="button">Evidence flow</button>
        </div>
        <div aria-live="polite"><strong>{flowCopy[flowLens].title}</strong><span>{flowCopy[flowLens].description}</span></div>
      </div>

      <div className="factory-map-shell">
        <div className={`factory-map flow-${flowLens}`} aria-label={`${flowCopy[flowLens].title}. Interactive AI Software Factory architecture.`}>
          <div className="factory-primary-flow">
            {primary.map((node, index) => (
              <div className="factory-flow-step" key={node.id}>
                {nodeButton(node)}
                {index < primary.length - 1 && <span className={`flow-connector ${flowIds[flowLens].has(node.id) ? "is-emphasized" : ""}`} aria-hidden="true">{flowLens === "control" ? "↓" : "↑"}</span>}
              </div>
            ))}
          </div>
          <aside className="factory-supply" aria-label="Agent Factory capability supply">
            <div className="factory-supply-heading"><span>Capability supply</span><strong>Agent Factory</strong></div>
            {supply.map(nodeButton)}
            <div className="factory-supply-context">
              {factoryContexts.map((context) => (
                <Link href={context.href} key={context.label}>
                  <span>{context.label}</span>
                  <p>{context.description}</p>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        <aside className="factory-inspector" id="factory-node-inspector" aria-live="polite">
          <span>{active.eyebrow}</span>
          <h3>{active.label}</h3>
          <p className="factory-purpose">{active.description}</p>

          <div className="factory-boundaries">
            <section><h4>Owns</h4><ul>{detail.owns.map((item) => <li key={item}>{item}</li>)}</ul></section>
            <section><h4>Does not own</h4><ul>{detail.excludes.map((item) => <li key={item}>{item}</li>)}</ul></section>
          </div>

          <dl className="factory-contracts">
            <div><dt>Receives</dt><dd>{detail.inputs.join(" · ")}</dd></div>
            <div><dt>Produces</dt><dd>{detail.outputs.join(" · ")}</dd></div>
            <div><dt>Authority</dt><dd>{detail.authority}</dd></div>
            <div><dt>Failure modes</dt><dd>{detail.failures.join(" · ")}</dd></div>
            <div><dt>Evidence</dt><dd>{detail.evidence.join(" · ")}</dd></div>
          </dl>

          <div className="factory-relationship-grid">
            {relationshipGroup("Upstream", upstream)}
            {relationshipGroup("Downstream", downstream)}
          </div>

          <nav className="factory-inspector-links" aria-label={`Explore ${active.label}`}>
            <Link href={active.href}>Learn</Link>
            <Link href="/architecture">Architecture</Link>
            <Link href={practiceHref}>Practice</Link>
            <Link href="/docs/07-quality-engineering/03-continuous-quality-contracts-proof-packages-and-certificates">Evidence</Link>
            <Link href="/docs/09-mission-control-case-studies/01-implementation-maturity-and-evidence-map">Implementation</Link>
          </nav>

          <blockquote>An executor cannot grant itself authority or independently certify its own material work.</blockquote>
        </aside>
      </div>
    </section>
  );
}
