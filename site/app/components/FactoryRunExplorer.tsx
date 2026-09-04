"use client";

import { guideDocumentPath } from "../../lib/paths";
import Link from "next/link";
import { useState } from "react";

type RunState = "complete" | "active" | "queued" | "failed" | "blocked";
type ScenarioId = "quality-failure" | "verification-in-progress";
type RunStage = { id: string; label: string; summary: string; record: string; owner: string; entry: string; evidence: string; stops: string; href: string };
type VerificationCheck = { label: string; status: "Passed" | "Running" | "Failed"; detail?: string };
type Scenario = {
  id: ScenarioId;
  label: string;
  description: string;
  status: string;
  run: string;
  candidate: string;
  verifier: string;
  eligibility: string;
  checks: VerificationCheck[];
};

const verificationIndex = 6;

const scenarios: Scenario[] = [
  {
    id: "quality-failure",
    label: "Verification fails",
    description: "Execution completes, but the behavioral quality threshold is missed and delivery is blocked.",
    status: "Quality contract failed",
    run: "FR-0249",
    candidate: "cand-8f91a2c",
    verifier: "IV-071",
    eligibility: "Ineligible",
    checks: [
      { label: "Unit tests", status: "Passed" },
      { label: "Type check", status: "Passed" },
      { label: "Security", status: "Passed" },
      { label: "Behavioral evaluation", status: "Failed", detail: "8/10 · required threshold 9/10" },
      { label: "Scope validation", status: "Passed" },
    ],
  },
  {
    id: "verification-in-progress",
    label: "Verification in progress",
    description: "Execution completes and the candidate remains pending while independent checks continue.",
    status: "Verifying",
    run: "FR-0248",
    candidate: "cand-761bc4e",
    verifier: "IV-070",
    eligibility: "Pending",
    checks: [
      { label: "Unit tests", status: "Passed" },
      { label: "Type check", status: "Passed" },
      { label: "Security", status: "Passed" },
      { label: "Behavioral evaluation", status: "Running", detail: "Threshold 9/10" },
      { label: "Scope validation", status: "Passed" },
    ],
  },
];

const stages: RunStage[] = [
  { id: "intent", label: "Intent", summary: "Desired outcome and accountable owner established.", record: "Intent decision", owner: "Documentation product owner", entry: "A named business need and accountable owner exist.", evidence: "Outcome statement, constraints, risk tier, and success measures.", stops: "No owner, ambiguous value, prohibited objective, or unacceptable risk.", href: guideDocumentPath("01-understand/02-the-factory-in-one-view") },
  { id: "specification", label: "Specification", summary: "Acceptance criteria and proof obligations defined.", record: "Executable specification", owner: "Engineering owner", entry: "The intent decision is accepted and the affected system boundary is known.", evidence: "Behavior examples, non-functional constraints, exclusions, and acceptance criteria.", stops: "Untestable requirement, unresolved boundary, or conflicting success criteria.", href: guideDocumentPath("02-design/06-intent-and-specification-engineering") },
  { id: "plan", label: "Plan", summary: "Work decomposed into bounded tasks and dependencies.", record: "Versioned plan", owner: "Planning service with engineering review", entry: "The specification is testable and repositories are ready.", evidence: "Task graph, dependency order, rollback assumptions, and plan assurance result.", stops: "Missing dependency, unsafe sequencing, unbounded task, or failed plan assurance.", href: guideDocumentPath("02-design/05-authoritative-records") },
  { id: "selection", label: "Capability selection", summary: "Qualified agent, skills, tools, model, and evaluators resolved.", record: "Capability resolution manifest", owner: "Control plane", entry: "The plan declares required capabilities and risk constraints.", evidence: "Exact identities, versions, certification status, policy match, and dependency lock.", stops: "Revoked capability, incompatible dependency, insufficient evaluation, or policy denial.", href: guideDocumentPath("03-build/21-models-and-capability-selection") },
  { id: "context", label: "Context", summary: "Relevant repository and product knowledge assembled.", record: "Permission-scoped context package", owner: "Context and knowledge services", entry: "The task, identity, tenant, repository, and access scope are known.", evidence: "Source citations, freshness, permission filters, ranking trace, and context digest.", stops: "Unauthorized source, stale critical fact, provenance gap, or context-budget overflow.", href: guideDocumentPath("03-build/20-context-engineering") },
  { id: "execution", label: "Execution", summary: "A candidate change and complete run record produced.", record: "Attempt, candidate, and run record", owner: "Outer harness and bounded coding agent", entry: "The execution contract, workspace, capability set, context, and budgets are frozen.", evidence: "Tool receipts, patch, artifact digest, environment fingerprint, costs, and stop reason.", stops: "Timeout, budget limit, repeated failure, policy breach, lost lease, or unsafe side effect.", href: guideDocumentPath("03-build/14-durable-execution") },
  { id: "verification", label: "Independent verification", summary: "The exact candidate is challenged outside the producing session.", record: "Quality certificate candidate", owner: "Independent verification service", entry: "The candidate identity, run record, and versioned quality contract are complete.", evidence: "Test results, security findings, behavioral evaluation, scope validation, and counterevidence.", stops: "Any required check fails, evidence is ineligible, or the candidate cannot be reproduced.", href: guideDocumentPath("04-prove/27-quality-and-evidence-architecture") },
  { id: "decision", label: "Human / policy decision", summary: "A named authority accepts, rejects, restricts, or escalates the exact subject.", record: "Decision record", owner: "Risk-appropriate human or policy authority", entry: "Independent evidence meets the decision contract and all exceptions are visible.", evidence: "Subject identity, evidence references, rationale, conditions, owner, timestamp, and expiry.", stops: "Wrong approver, missing proof, unresolved counterevidence, or exceeded autonomy ceiling.", href: guideDocumentPath("02-design/04-the-human-agent-operating-model") },
  { id: "delivery", label: "Delivery", summary: "The approved artifact moves through controlled release and rollback gates.", record: "Release and rollout record", owner: "Delivery system and release owner", entry: "Approval names the exact artifact and authorized release conditions.", evidence: "Artifact provenance, deployment receipt, production checks, rollout state, and rollback readiness.", stops: "Artifact mismatch, failed production check, exhausted error budget, or rollback unavailable.", href: guideDocumentPath("04-prove/32-cicd-progressive-delivery-and-production-verification") },
  { id: "production", label: "Production", summary: "Service behavior and user outcomes are correlated to the exact release.", record: "Production outcome record", owner: "Service owner", entry: "The release identity is observable and outcome contracts are active.", evidence: "Reliability, relevance, security, latency, cost, adoption, and user-feedback signals.", stops: "SLO breach, security incident, quality regression, cost spike, or missing release correlation.", href: guideDocumentPath("04-prove/32-cicd-progressive-delivery-and-production-verification") },
  { id: "learning", label: "Learning", summary: "Recurring evidence becomes an evaluated, reviewable improvement proposal.", record: "Learning proposal and promotion decision", owner: "Capability owner and change authority", entry: "Enough comparable outcome data exists to distinguish signal from noise.", evidence: "Baseline comparison, causal hypothesis, offline and shadow results, guardrails, and rollback plan.", stops: "Contaminated feedback, weak sample, hidden regression, or missing human approval.", href: guideDocumentPath("06-improve/41-meta-loops-and-the-closed-loop-factory") },
];

function stageState(scenario: Scenario, index: number): RunState {
  if (index < verificationIndex) return "complete";
  if (index === verificationIndex) return scenario.id === "quality-failure" ? "failed" : "active";
  if (scenario.id === "quality-failure" && index === 8) return "blocked";
  return "queued";
}

function markerFor(state: RunState) {
  if (state === "complete") return "✓";
  if (state === "active") return "●";
  if (state === "failed") return "✕";
  if (state === "blocked") return "⊘";
  return "○";
}

function AuthorityBlock() {
  return (
    <section className="authority-block" aria-labelledby="factory-run-authority-title">
      <h4 id="factory-run-authority-title">Authority for this transition</h4>
      <dl>
        <div><dt>Requested by</dt><dd>Control plane</dd></div>
        <div><dt>Evaluated by</dt><dd>Independent verifier</dd></div>
        <div><dt>Authorized by</dt><dd>Human / policy authority</dd></div>
        <div><dt>Recorded in</dt><dd>Decision record</dd></div>
      </dl>
    </section>
  );
}

function KnowledgeCheck() {
  const [answer, setAnswer] = useState<string>();
  const correct = answer === "verification";
  const options = [
    ["agent", "The producing agent"],
    ["harness", "The inner harness"],
    ["verification", "Independent verification and the governed decision path"],
    ["router", "The model router"],
  ] as const;

  return (
    <section className="run-knowledge-check" aria-labelledby="run-check-title">
      <span>Check your understanding</span>
      <h4 id="run-check-title">Who determines whether the completed candidate satisfies the required acceptance evidence?</h4>
      <div>{options.map(([id, label], index) => <button aria-pressed={answer === id} key={id} onClick={() => setAnswer(id)} type="button"><small>{String.fromCharCode(65 + index)}</small>{label}</button>)}</div>
      {answer && <p className={correct ? "is-correct" : "is-incorrect"} role="status"><strong>{correct ? "Correct." : "Not quite."}</strong> Completion comes from execution. Acceptance depends on independent evidence and the authority named by policy. <Link href={guideDocumentPath("04-prove/27-quality-and-evidence-architecture")}>Review the boundary →</Link></p>}
    </section>
  );
}

export function FactoryRunExplorer() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("quality-failure");
  const [selectedIndex, setSelectedIndex] = useState(verificationIndex);
  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0];
  const selected = stages[selectedIndex];
  const selectedState = stageState(scenario, selectedIndex);

  function selectScenario(id: ScenarioId) {
    setScenarioId(id);
    setSelectedIndex(verificationIndex);
  }

  return (
    <section className="factory-run-explorer" id="factory-run-explorer" aria-labelledby="factory-run-title">
      <header className="factory-run-heading">
        <div><span className="section-kicker">Deterministic educational walkthrough</span><h2 id="factory-run-title">Follow one change through the factory.</h2></div>
        <p>These are fixed teaching scenarios—not live agents or production evidence. Select a scenario and stage to inspect the record, owner, evidence, and stop conditions.</p>
      </header>

      <div className="factory-run-scenarios" role="group" aria-label="Choose an educational factory run">
        {scenarios.map((item) => <button aria-pressed={scenario.id === item.id} className={scenario.id === item.id ? "is-active" : undefined} key={item.id} onClick={() => selectScenario(item.id)} type="button"><strong>{item.label}</strong><span>{item.description}</span></button>)}
      </div>

      <div className={`factory-run-console scenario-${scenario.id}`}>
        <aside className="factory-run-mission" aria-label="Example mission">
          <span>Educational example · Mission</span>
          <h3>Add semantic search to product documentation.</h3>
          <dl>
            <div><dt>Status</dt><dd><span className={`run-status-dot is-${scenario.id}`} aria-hidden="true" /> {scenario.status}</dd></div>
            <div><dt>Risk</dt><dd>Moderate</dd></div>
            <div><dt>Repository</dt><dd>docs-web</dd></div>
            <div><dt>Run</dt><dd>{scenario.run}</dd></div>
          </dl>
          <p>No model calls, external actions, or hidden decisions occur in this walkthrough.</p>
        </aside>

        <ol className="factory-run-stages" aria-label="Factory run stages">
          {stages.map((stage, index) => {
            const state = stageState(scenario, index);
            return (
              <li className={`is-${state}`} key={stage.id}>
                <button aria-controls="factory-run-stage-detail" aria-current={selectedIndex === index ? "step" : undefined} className={selectedIndex === index ? "is-selected" : undefined} onClick={() => setSelectedIndex(index)} type="button">
                  <span className="factory-run-marker" aria-hidden="true">{markerFor(state)}</span>
                  <span><small>{String(index + 1).padStart(2, "0")} · {state}</small><strong>{stage.label}</strong><em>{stage.summary}</em></span>
                </button>
              </li>
            );
          })}
        </ol>

        <article className="factory-run-detail" id="factory-run-stage-detail" aria-live="polite">
          <div className="factory-run-detail-head">
            <span>{String(selectedIndex + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")} · {selectedState}</span>
            <h3>{selected.label}</h3>
            <p>{selected.summary}</p>
          </div>

          {scenario.id === "quality-failure" && (
            <section className="failure-lesson" aria-labelledby="failure-lesson-title">
              <span>Architectural lesson</span>
              <h4 id="failure-lesson-title">Completion is not acceptance.</h4>
              <dl>
                <div><dt>Completed</dt><dd>Execution produced a candidate and complete run record.</dd></div>
                <div><dt>Failed</dt><dd>The behavioral quality contract scored 8/10 against a required 9/10.</dd></div>
                <div><dt>Decision owner</dt><dd>Human / policy authority—not the producing agent or harness.</dd></div>
                <div><dt>Delivery</dt><dd>Blocked because the evidence package is ineligible for acceptance.</dd></div>
                <div><dt>Recovery</dt><dd>Preserve the failed evidence, revise the candidate or specification, create a new attempt, and verify again.</dd></div>
              </dl>
            </section>
          )}

          {selected.id === "verification" && (
            <section className={`verification-checks is-${scenario.id}`} aria-labelledby="verification-checks-title">
              <h4 id="verification-checks-title">Independent checks</h4>
              <ul>{scenario.checks.map((check) => <li className={`is-${check.status.toLowerCase()}`} key={check.label}><span aria-hidden="true">{check.status === "Passed" ? "✓" : check.status === "Failed" ? "✕" : "●"}</span><strong>{check.label}</strong><small>{check.detail ?? check.status}</small></li>)}</ul>
              <p>The producer cannot certify its own material work. These checks run in a separate quality context.</p>
            </section>
          )}

          <section className="implementation-evidence" aria-labelledby="implementation-evidence-title">
            <div><span>Educational example</span><h4 id="implementation-evidence-title">Candidate evidence</h4></div>
            <dl>
              <div><dt>Candidate</dt><dd>{scenario.candidate}</dd></div>
              <div><dt>Produced by</dt><dd>SearchAgent config v3.2</dd></div>
              <div><dt>Execution</dt><dd>{scenario.run}</dd></div>
              <div><dt>Verified by</dt><dd>{scenario.verifier}</dd></div>
              <div><dt>Provenance</dt><dd>Complete</dd></div>
              <div><dt>Currentness</dt><dd>Current</dd></div>
              <div><dt>Acceptance eligibility</dt><dd className={`eligibility-${scenario.eligibility.toLowerCase()}`}>{scenario.eligibility}</dd></div>
            </dl>
          </section>

          <AuthorityBlock />

          <dl className="factory-run-contract">
            <div><dt>Record created</dt><dd>{selected.record}</dd></div>
            <div><dt>Accountable owner</dt><dd>{selected.owner}</dd></div>
            <div><dt>Entry condition</dt><dd>{selected.entry}</dd></div>
            <div><dt>Required evidence</dt><dd>{selected.evidence}</dd></div>
            <div><dt>What stops it</dt><dd>{selected.stops}</dd></div>
          </dl>

          <div className="factory-run-actions">
            <button disabled={selectedIndex === 0} onClick={() => setSelectedIndex((index) => Math.max(0, index - 1))} type="button">Previous stage</button>
            <Link href={selected.href}>Open canonical chapter <span aria-hidden="true">→</span></Link>
            <button disabled={selectedIndex === stages.length - 1} onClick={() => setSelectedIndex((index) => Math.min(stages.length - 1, index + 1))} type="button">Next stage</button>
          </div>
        </article>
      </div>

      {scenario.id === "quality-failure" && <KnowledgeCheck />}
    </section>
  );
}
