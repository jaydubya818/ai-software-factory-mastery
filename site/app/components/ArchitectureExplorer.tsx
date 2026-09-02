"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Lens = "all" | "authority" | "runtime" | "assurance" | "operations";

type ArchitectureItem = {
  number: string;
  title: string;
  summary: string;
  owner: string;
  contract: string;
  risk: string;
  evidence: string;
  href: string;
  lenses: Lens[];
};

type ArchitectureView = {
  id: string;
  label: string;
  kicker: string;
  title: string;
  description: string;
  items: ArchitectureItem[];
};

const lifecycle = [
  ["01", "Intent", "Accept purpose, outcome, constraints, owner, and non-purpose.", "Business owner", "Intent decision", "Variable", "Named decision and accepted outcome"],
  ["02", "Plan", "Turn intent and repository facts into a testable execution baseline.", "Engineering owner", "Versioned plan", "High", "Plan assurance and acceptance criteria"],
  ["03", "Select", "Resolve qualified capability, model, tool, context, and evaluator versions.", "Control plane", "Resolution manifest", "High", "Certification, policy, and dependency lock"],
  ["04", "Execute", "Run bounded attempts through leases, sandboxes, tools, and hard budgets.", "Runtime owner", "Attempt manifest", "Critical", "Actions, side-effect receipts, and completion report"],
  ["05", "Verify", "Challenge the exact candidate in an independent quality context.", "Quality owner", "Quality contract", "Critical", "Evaluator results and counterevidence"],
  ["06", "Decide", "Approve, reject, revise, restrict, or escalate the exact subject.", "Named authority", "Decision request", "Critical", "Decision, reason, conditions, and expiry"],
  ["07", "Deliver", "Publish and roll out the approved artifact with rollback ready.", "Release owner", "Release contract", "Critical", "Artifact, rollout, rollback, production checks"],
  ["08", "Observe", "Connect service behavior and customer outcomes to the exact release.", "Operations owner", "Outcome contract", "High", "SLO, incident, quality, cost, and value signals"],
  ["09", "Learn", "Convert recurring evidence into evaluated, human-approved improvements.", "Change owner", "Learning proposal", "High", "Baseline/candidate comparison and promotion decision"],
] satisfies string[][];

function item(
  values: string[],
  href: string,
  lenses: Lens[],
): ArchitectureItem {
  const [number, title, summary, owner, contract, risk, evidence] = values;
  return { number, title, summary, owner, contract, risk, evidence, href, lenses };
}

const views: ArchitectureView[] = [
  {
    id: "lifecycle",
    label: "Lifecycle",
    kicker: "One value stream",
    title: "Follow authority down and evidence back up.",
    description: "Every transition names its owner, authoritative contract, stopping rule, and proof. A log line cannot move the lifecycle by itself.",
    items: lifecycle.map((value, index) => item(
      value,
      "/docs/01-understand/02-the-factory-in-one-view",
      index < 3 ? ["authority"] : index < 5 ? ["runtime", "assurance"] : index < 7 ? ["authority", "assurance"] : ["operations", "assurance"],
    )),
  },
  {
    id: "planes",
    label: "Planes",
    kicker: "Responsibility boundaries",
    title: "Separate decisions before separating deployments.",
    description: "Planes define what a component may decide and which records it may mutate. A modular V1 can keep several in one codebase.",
    items: [
      item(["01", "Human governance", "Owns intent, risk, exceptions, promotion, and material acceptance.", "Named human authority", "Decision record", "Critical", "Identity, evidence reviewed, reason, conditions"], "/docs/02-design/04-the-human-agent-operating-model", ["authority"]),
      item(["02", "Control plane", "Owns domain state, admission, policy, dispatch eligibility, and reconciliation.", "Control owner", "Commands and state transitions", "Critical", "Policy decision, expected version, audit event"], "/docs/03-build/11-control-plane-orchestrator-and-execution-plane", ["authority", "runtime"]),
      item(["03", "Execution plane", "Runs frozen manifests in isolated environments and reports structured results.", "Runtime owner", "Attempt contract", "Critical", "Tool calls, artifacts, side effects, completion"], "/docs/03-build/14-development-environments-sandboxes-and-compute", ["runtime"]),
      item(["04", "Knowledge plane", "Registers sources, retrieves eligible facts, and freezes attributable context.", "Knowledge owner", "Context package", "High", "Source, permission, selection, freshness, lineage"], "/docs/03-build/16-data-knowledge-semantic-and-context-engineering", ["runtime", "assurance"]),
      item(["05", "Quality plane", "Independently evaluates exact candidates and converts eligible results into proof.", "Quality owner", "Quality contract", "Critical", "Evaluator independence, provenance, contradiction"], "/docs/04-prove/21-quality-and-evidence-architecture", ["assurance"]),
      item(["06", "Delivery and outcome", "Binds approvals to artifacts, controls rollout, and observes production reality.", "Release and outcome owners", "Release and outcome contracts", "Critical", "Artifact, rollout, rollback, observation window"], "/docs/04-prove/25-cicd-progressive-delivery-and-production-verification", ["operations", "assurance"]),
    ],
  },
  {
    id: "components",
    label: "Components",
    kicker: "Twelve runtime families",
    title: "Give every runtime decision an accountable component.",
    description: "Routing, workflow, context, models, retrieval, tools, memory, policy, validation, reliability, evidence, and budgets cooperate through typed contracts.",
    items: [
      item(["01", "Routing and workflow", "Choose an eligible path and advance its durable graph.", "Runtime owner", "Route plus state command", "High", "Decision reason and transition event"], "/docs/03-build/11-control-plane-orchestrator-and-execution-plane", ["runtime"]),
      item(["02", "Context and retrieval", "Compile instructions and permission-filtered knowledge for one attempt.", "Knowledge owner", "Context package", "High", "Selected/excluded sources and package digest"], "/docs/03-build/16-data-knowledge-semantic-and-context-engineering", ["runtime", "assurance"]),
      item(["03", "Models and tools", "Route qualified inference and authorize narrow side effects.", "AI and capability owners", "Model profile and tool contract", "Critical", "Exact versions, grants, calls, receipts, cost"], "/docs/03-build/10-the-agent-factory", ["runtime", "authority"]),
      item(["04", "State and memory", "Preserve working state without promoting observations into authority.", "Runtime owner", "Versioned state snapshot", "High", "State version, retention, provenance"], "/docs/03-build/15-agent-architecture", ["runtime"]),
      item(["05", "Policy and validation", "Deny ineligible actions and independently test candidate claims.", "Security and quality owners", "Policy and quality decisions", "Critical", "Denials, evaluator results, counterevidence"], "/docs/02-design/07-governance-policy-and-risk-proportional-approval", ["authority", "assurance"]),
      item(["06", "Reliability, evidence, and budgets", "Recover safely, stop nonconvergence, and attribute complete cost.", "Platform operations", "Recovery and budget contract", "Critical", "Stop reason, reconciliation, proof, charge ledger"], "/docs/05-operate/29-resilience-incidents-and-the-control-tower", ["operations", "assurance"]),
    ],
  },
  {
    id: "governance",
    label: "Governance",
    kicker: "Ten testable controls",
    title: "Govern each transfer of authority.",
    description: "Every control names an owner, enforcement point, evidence artifact, failure injection, exception path, and review cadence.",
    items: [
      item(["01", "Authority and identity", "Map delegation and give each human, workload, agent, and capability a unique identity.", "Governance and identity owners", "Authority chain", "Critical", "Grant, scope, expiry, credential and audit events"], "/docs/02-design/07-governance-policy-and-risk-proportional-approval", ["authority"]),
      item(["02", "Risk and autonomy", "Classify consequence and enforce the narrowest current ceiling.", "System and policy owners", "Risk decision", "Critical", "Tier, permitted/prohibited actions, approval rule"], "/docs/03-build/18-agent-and-loop-engineering", ["authority"]),
      item(["03", "Emergency control", "Pause, cancel, revoke, quarantine, rollback, fail over, or shut down precisely.", "Incident authority", "Emergency command", "Critical", "Acknowledgement, enforcement, reconciliation, recovery"], "/docs/02-design/07-governance-policy-and-risk-proportional-approval", ["authority", "operations"]),
      item(["04", "Attack resistance", "Contain indirect instructions, tool abuse, poisoned context or memory, and supply-chain change.", "Security owner", "Threat-control mapping", "Critical", "Negative tests, denials, quarantine, impact analysis"], "/docs/04-prove/26-security", ["authority", "assurance"]),
      item(["05", "Human and supplier controls", "Require named override, dual control, external diligence, incident handling, and recertification.", "Decision and capability owners", "Control evidence record", "Critical", "Decision, supplier review, incident, current certification"], "/docs/02-design/04-the-human-agent-operating-model", ["authority", "assurance"]),
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    kicker: "Accountability spine",
    title: "Know what the system is before governing what it does.",
    description: "One governed record references purpose, owners, scope, versions, data, integrations, risk, evidence, incidents, cost, and lifecycle without copying subordinate registries.",
    items: [
      item(["01", "Purpose and ownership", "Accepted outcomes, non-purpose, and accountable business, engineering, security, operations, and assurance roles.", "System owner", "FactorySystemRecord", "High", "Accepted ownership and review dates"], "/docs/02-design/05-authoritative-records", ["authority"]),
      item(["02", "Scope and configuration", "Repositories, workflows, environments, targets, tenants, agents, models, prompts, tools, skills, and evaluators.", "Engineering owner", "Registry references", "High", "Resolvable exact versions and drift status"], "/docs/02-design/05-authoritative-records", ["runtime"]),
      item(["03", "Data and trust", "Sources, classification, residency, retention, providers, credentials, boundaries, and downstream effects.", "Data and security owners", "Data and integration references", "Critical", "Access, lineage, residency, retention evidence"], "/docs/04-prove/26-security", ["authority", "assurance"]),
      item(["04", "Risk and lifecycle", "Criticality, tier, autonomy ceiling, prohibited actions, exceptions, incidents, performance, cost, and state.", "Governance and operations", "Lifecycle decision", "Critical", "Current review, controls, outcomes, retirement receipts"], "/docs/02-design/05-authoritative-records", ["authority", "operations"]),
    ],
  },
  {
    id: "patterns",
    label: "Patterns",
    kicker: "Minimum sufficient autonomy",
    title: "Choose the simplest qualified architecture.",
    description: "Lower is not less mature. Each added level must prove a capability or outcome benefit against the simpler eligible baseline.",
    items: [
      item(["00", "Deterministic", "Fixed rules and automation for stable, testable work.", "Software owner", "Code and tests", "Variable", "Deterministic test suite and change control"], "/docs/03-build/18-agent-and-loop-engineering", ["runtime", "assurance"]),
      item(["01", "Assisted", "Prompted drafting or explanation without direct side effects.", "Product owner", "Advisory response", "Low", "Human acceptance for consequence"], "/docs/03-build/18-agent-and-loop-engineering", ["assurance"]),
      item(["02", "Retrieval grounded", "Current approved sources and citations are required.", "Knowledge owner", "Context package", "High", "Permission, freshness, citation, contradiction"], "/docs/03-build/16-data-knowledge-semantic-and-context-engineering", ["runtime", "assurance"]),
      item(["03", "Bounded single agent", "Iterative planning and tool use inside hard scope and budgets.", "Workflow owner", "Attempt manifest", "High", "Independent validators and stop conditions"], "/docs/03-build/18-agent-and-loop-engineering", ["runtime", "assurance"]),
      item(["04", "Coordinated specialists", "Specialization, parallelism, or independent challenge has measured value.", "Workflow owner", "Delegation graph", "High", "Handoff, disagreement, independence, parent budget"], "/docs/03-build/18-agent-and-loop-engineering", ["runtime", "assurance"]),
      item(["05", "Durable autonomous workflow", "Triggered long-running work must survive queues, crashes, and human pauses.", "Platform operations", "Durable workflow graph", "Critical", "Leases, reconciliation, gates, SLOs, emergency control"], "/docs/03-build/11-control-plane-orchestrator-and-execution-plane", ["runtime", "operations"]),
      item(["06", "Enterprise integrated", "Mission-critical work crosses governed data, tools, delivery, and operations.", "System owner", "Factory system contract", "Critical", "Inventory, policy, continuity, monitoring, recertification"], "/docs/05-operate/29-resilience-incidents-and-the-control-tower", ["authority", "operations", "assurance"]),
    ],
  },
  {
    id: "monitoring",
    label: "Monitoring",
    kicker: "Detection to verified closure",
    title: "Treat response as a governed lifecycle.",
    description: "Signals become findings; findings get owners and deadlines; controls are reconciled; recovery is independently verified; improvements follow change control.",
    items: [
      item(["01", "Observe and evaluate", "Correlate traces, logs, metrics, cost, quality, policy, evidence, incidents, and outcomes.", "Reliability and quality owners", "Signal and evaluation records", "High", "Coverage, baseline, uncertainty, subject binding"], "/docs/05-operate/29-resilience-incidents-and-the-control-tower", ["operations", "assurance"]),
      item(["02", "Detect and triage", "Distinguish normal variation, drift, control failure, and incident.", "On-call owner", "Finding", "Critical", "Rule version, severity, owner, deadline, evidence"], "/docs/05-operate/29-resilience-incidents-and-the-control-tower", ["operations"]),
      item(["03", "Respond and reconcile", "Continue, contain, pause, retry, fallback, rollback, quarantine, or retire.", "Incident authority", "Control command", "Critical", "Acknowledgement, enforcement, partial-effect truth"], "/docs/02-design/07-governance-policy-and-risk-proportional-approval", ["authority", "operations"]),
      item(["04", "Verify and improve", "Prove restored safety and outcomes before proposing a controlled change.", "Independent assurance and change owner", "Closure and learning decision", "Critical", "Recovery evaluation, residual risk, promotion/rollback"], "/docs/05-operate/29-resilience-incidents-and-the-control-tower", ["operations", "assurance"]),
    ],
  },
  {
    id: "data-flow",
    label: "Data flow",
    kicker: "Source fact to frozen context",
    title: "Permission and provenance travel with the data.",
    description: "The knowledge path separates source authority, ingestion, retrieval, selection, context, outcome evaluation, and revocation.",
    items: [
      item(["01", "Register and ingest", "Approve source ownership, connector identity, classification, freshness, and correction policy.", "Knowledge and source owners", "SourceRegistration", "High", "Checkpoint, source version, transformation lineage"], "/docs/03-build/16-data-knowledge-semantic-and-context-engineering", ["authority", "runtime"]),
      item(["02", "Filter and retrieve", "Apply tenant, purpose, permission, lifecycle, and freshness before ranking.", "Security and knowledge owners", "RetrievalRequest", "Critical", "Permission decisions, candidates, exclusions"], "/docs/03-build/16-data-knowledge-semantic-and-context-engineering", ["runtime", "assurance"]),
      item(["03", "Rank and compile", "Rerank, diversify, preserve contradiction, allocate tokens, and freeze the package.", "Context owner", "ContextSelection", "High", "Why selected, citations, digest, unresolved facts"], "/docs/03-build/16-data-knowledge-semantic-and-context-engineering", ["runtime", "assurance"]),
      item(["04", "Evaluate and revoke", "Connect context to outcomes and propagate correction, deletion, or compromise.", "Knowledge and quality owners", "Revocation event", "Critical", "Reverse lineage, affected work, deletion and rebuild receipts"], "/docs/03-build/16-data-knowledge-semantic-and-context-engineering", ["operations", "assurance"]),
    ],
  },
  {
    id: "evidence",
    label: "Evidence",
    kicker: "Observable decision lineage",
    title: "A producer saying done is not proof.",
    description: "Each record binds the exact subject, identity, versions, policy, artifacts, independent results, decisions, and production outcomes.",
    items: [
      item(["01", "Authority", "Intent, policy, grant, and work order establish why and within what scope work may happen.", "Control and decision owners", "Decision and grant records", "Critical", "Actor, subject, scope, purpose, expiry"], "/docs/02-design/07-governance-policy-and-risk-proportional-approval", ["authority"]),
      item(["02", "Execution", "Attempt, context, tool calls, side effects, and artifacts establish what happened.", "Runtime owner", "Attempt and capability records", "High", "Exact versions, environment, receipts, digests"], "/docs/03-build/11-control-plane-orchestrator-and-execution-plane", ["runtime"]),
      item(["03", "Assurance", "Independent evaluators and proof packages establish which claims are eligible.", "Quality owner", "Proof package", "Critical", "Subject binding, provenance, independence, freshness"], "/docs/04-prove/24-quality-contracts-proof-packages-and-certificates", ["assurance"]),
      item(["04", "Decision and outcome", "Named review, release, production observation, incident, and learning records establish acceptance and reality.", "Human, release, and outcome owners", "Decision lineage", "Critical", "Reason, conditions, artifact, window, residual risk"], "/docs/01-understand/02-the-factory-in-one-view", ["authority", "operations", "assurance"]),
    ],
  },
];

const lenses: { id: Lens; label: string }[] = [
  { id: "all", label: "Complete view" },
  { id: "authority", label: "Authority" },
  { id: "runtime", label: "Runtime" },
  { id: "assurance", label: "Assurance" },
  { id: "operations", label: "Operations" },
];

export function ArchitectureExplorer() {
  const [activeView, setActiveView] = useState(views[0].id);
  const [activeLens, setActiveLens] = useState<Lens>("all");
  const view = views.find((candidate) => candidate.id === activeView) ?? views[0];
  const visibleItems = useMemo(
    () => activeLens === "all" ? view.items : view.items.filter((candidate) => candidate.lenses.includes(activeLens)),
    [activeLens, view],
  );

  return (
    <section className="architecture-explorer" aria-labelledby="architecture-explorer-title">
      <div className="architecture-view-tabs" role="tablist" aria-label="Architecture views">
        {views.map((candidate) => (
          <button
            aria-controls={`architecture-panel-${candidate.id}`}
            aria-selected={candidate.id === view.id}
            className={candidate.id === view.id ? "is-active" : undefined}
            id={`architecture-tab-${candidate.id}`}
            key={candidate.id}
            onClick={() => setActiveView(candidate.id)}
            role="tab"
            type="button"
          >
            {candidate.label}
          </button>
        ))}
      </div>

      <div
        aria-labelledby={`architecture-tab-${view.id}`}
        className="architecture-view-panel"
        id={`architecture-panel-${view.id}`}
        role="tabpanel"
      >
        <header className="architecture-view-heading">
          <div>
            <span className="section-kicker">{view.kicker}</span>
            <h2 id="architecture-explorer-title">{view.title}</h2>
          </div>
          <p>{view.description}</p>
        </header>

        <div className="architecture-lenses" aria-label="Filter this view by responsibility">
          <span>Lens</span>
          {lenses.map((lens) => (
            <button
              aria-pressed={activeLens === lens.id}
              className={activeLens === lens.id ? "is-active" : undefined}
              key={lens.id}
              onClick={() => setActiveLens(lens.id)}
              type="button"
            >
              {lens.label}
            </button>
          ))}
        </div>

        <div className="architecture-card-grid">
          {visibleItems.map((card) => (
            <article className="architecture-card" key={`${view.id}-${card.number}-${card.title}`}>
              <div className="architecture-card-topline">
                <span>{card.number}</span>
                <small>{card.risk} risk</small>
              </div>
              <h3>{card.title}</h3>
              <p>{card.summary}</p>
              <dl>
                <div><dt>Owner</dt><dd>{card.owner}</dd></div>
                <div><dt>Contract</dt><dd>{card.contract}</dd></div>
                <div><dt>Proof</dt><dd>{card.evidence}</dd></div>
              </dl>
              <Link href={card.href}>Open the canonical specification <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>

        {visibleItems.length === 0 && (
          <p className="architecture-empty">This view has no items in the selected lens. Choose Complete view or another responsibility.</p>
        )}
      </div>
    </section>
  );
}
