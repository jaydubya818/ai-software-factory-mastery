"use client";

import Link from "next/link";
import { useState } from "react";

type Depth = "30-sec" | "2-min" | "deep-dive";
type Side = { name: string; owns: string; boundary: string };
type Comparison = {
  id: string;
  label: string;
  short: string;
  distinction: string;
  left: Side;
  right: Side;
  links: { label: string; href: string }[];
};

const comparisons: Comparison[] = [
  {
    id: "factories",
    label: "Agent Factory / Software Factory",
    short: "The Agent Factory supplies governed capabilities. The AI Software Factory composes them into governed delivery outcomes.",
    distinction: "One industrializes reusable agents, skills, tools, model profiles, and evaluations. The other binds those capabilities to intent, plans, execution, verification, release, production observation, and learning. A capability can be certified by the Agent Factory without any particular software change being accepted for delivery.",
    left: { name: "Agent Factory", owns: "Capability creation, versioning, evaluation, certification, publishing, and retirement.", boundary: "It does not own a mission, approve its own use, or deliver a production outcome." },
    right: { name: "AI Software Factory", owns: "The governed value stream from human intent through production outcome and learning.", boundary: "It consumes capabilities; it does not redefine their identity or silently bypass their admission controls." },
    links: [
      { label: "Factory boundaries", href: "/docs/01-understand/02-the-factory-in-one-view" },
      { label: "Agent Factory supply chain", href: "/docs/03-build/10-the-agent-factory" },
    ],
  },
  {
    id: "agent-harness",
    label: "Agent / Harness",
    short: "The agent chooses and acts within a task. The harness constrains, observes, and operationalizes that work.",
    distinction: "An agent is a bounded decision-making capability with a role, tools, context, and stop conditions. A harness is the execution machinery around it: model invocation, tool mediation, state, budgets, retries, traces, and completion contracts. The harness can report completion; neither component can grant itself acceptance authority.",
    left: { name: "Agent", owns: "Task reasoning, bounded choices, tool requests, and candidate production.", boundary: "It cannot expand its permissions, certify material work, or decide organizational policy." },
    right: { name: "Harness", owns: "Execution control, session state, budgets, tool mediation, recovery, and run capture.", boundary: "It does not own business intent or turn a completed run into an accepted outcome." },
    links: [
      { label: "Agent architecture", href: "/docs/03-build/15-agent-architecture" },
      { label: "Coding harnesses", href: "/docs/03-build/13-coding-harnesses-and-agent-protocols" },
    ],
  },
  {
    id: "harnesses",
    label: "Inner Harness / Outer Harness",
    short: "The inner harness runs one model-tool loop. The outer harness makes that loop governable across real delivery work.",
    distinction: "The inner harness assembles prompts, calls a model, invokes tools, and processes observations inside one coding session. The outer harness adapts that session to durable tasks, leases, retries, budgets, evidence capture, and lifecycle events. Keeping the boundary explicit makes coding products replaceable without rewriting the factory control plane.",
    left: { name: "Inner Harness", owns: "One coding session: context assembly, model/tool loop, local state, and session completion.", boundary: "It does not own cross-run durability, organizational approval, or release coordination." },
    right: { name: "Outer Harness", owns: "Cross-run supervision: task lifecycle, policy envelope, budgets, recovery, and durable run records.", boundary: "It does not grant mission authority or independently certify its own candidate." },
    links: [
      { label: "Stack boundaries", href: "/docs/01-understand/02-the-factory-in-one-view" },
      { label: "Harness adapters", href: "/docs/03-build/13-coding-harnesses-and-agent-protocols" },
    ],
  },
  {
    id: "planes",
    label: "Control Plane / Execution Plane",
    short: "The control plane decides what may run and under which contract. The execution plane performs the bounded work.",
    distinction: "The control plane resolves policy, identity, capabilities, budgets, scheduling, and required proof before execution. The execution plane receives a frozen contract, runs in an isolated environment, and returns artifacts plus receipts. Separating them prevents an executor from silently changing the rules that govern its own work.",
    left: { name: "Control Plane", owns: "Admission, policy, routing, scheduling, authority, budgets, and lifecycle coordination.", boundary: "It should not perform mutable repository work inside the candidate-producing session." },
    right: { name: "Execution Plane", owns: "Bounded tool use and candidate production inside the admitted execution contract.", boundary: "It cannot rewrite admission policy, exceed its autonomy ceiling, or approve its own output." },
    links: [{ label: "Control and execution planes", href: "/docs/03-build/11-control-plane-orchestrator-and-execution-plane" }],
  },
  {
    id: "assurance",
    label: "Evaluation / Verification",
    short: "Evaluation measures behavior across cases. Verification determines whether an exact candidate satisfies a specific acceptance contract.",
    distinction: "Evaluations characterize capability quality, regressions, and fitness using repeatable datasets and measures. Verification challenges the exact candidate, configuration, and evidence package that may be delivered. Evaluation results can inform verification, but a benchmark score alone is not an acceptance decision.",
    left: { name: "Evaluation", owns: "Repeatable cases, measures, baselines, comparisons, and capability-level fitness signals.", boundary: "It does not by itself prove that the exact release candidate satisfies every delivery obligation." },
    right: { name: "Verification", owns: "Independent checks against the exact subject, quality contract, and proof obligations.", boundary: "It reports eligible evidence; named human or policy authority still owns the acceptance decision." },
    links: [
      { label: "Evaluation engineering", href: "/docs/04-prove/23-evaluation-engineering" },
      { label: "Quality and evidence", href: "/docs/04-prove/21-quality-and-evidence-architecture" },
    ],
  },
  {
    id: "context-memory",
    label: "Context / Memory",
    short: "Context is the information selected for this decision. Memory is governed state retained for possible reuse across decisions.",
    distinction: "Context engineering assembles the smallest relevant, permission-safe, current package for a particular model call or task. Memory engineering decides what state may persist, how it is updated, and when it expires or is forgotten. Retrieval can place memory into context, but a vector store alone is neither memory policy nor evidence of truth.",
    left: { name: "Context", owns: "Task-specific selection, ranking, budgeting, provenance, freshness, and prompt assembly.", boundary: "It is temporary input, not an authoritative long-term system of record." },
    right: { name: "Memory", owns: "Governed persistence, update, retrieval, retention, conflict resolution, and deletion.", boundary: "Stored similarity does not establish currentness, correctness, permission, or acceptance." },
    links: [
      { label: "Agent context and memory", href: "/docs/03-build/15-agent-architecture" },
      { label: "Knowledge and retrieval", href: "/docs/03-build/16-data-knowledge-semantic-and-context-engineering" },
    ],
  },
  {
    id: "completion-acceptance",
    label: "Completion / Acceptance",
    short: "Completion says the execution contract ended. Acceptance says the exact candidate met its evidence and authority requirements.",
    distinction: "A completed attempt may have produced a candidate, receipts, and a valid stop reason while still failing quality, policy, scope, or risk checks. Acceptance is a separate governed decision over an exact subject and evidence package. This separation is why the Factory Run can be complete while delivery remains blocked.",
    left: { name: "Completion", owns: "The terminal state of an attempt and the completeness of its run record.", boundary: "It does not imply correctness, safety, approval, mergeability, or production readiness." },
    right: { name: "Acceptance", owns: "A governed decision that the named subject meets its quality contract and authority conditions.", boundary: "It cannot be inferred from agent confidence or producer-generated evidence alone." },
    links: [
      { label: "Walk the failed run", href: "/architecture#factory-run-explorer" },
      { label: "Quality certificates", href: "/docs/04-prove/24-quality-contracts-proof-packages-and-certificates" },
    ],
  },
  {
    id: "capability-authority",
    label: "Capability / Authority",
    short: "Capability answers whether an actor can perform an action. Authority answers whether it is permitted to do so here.",
    distinction: "An agent may possess the technical capability to edit a repository, call an API, or request deployment. Authority is the context-specific permission to exercise that capability for a named mission, subject, risk tier, and time window. Identity, policy, autonomy ceilings, and approval gates turn broad capability into bounded authority.",
    left: { name: "Capability", owns: "The qualified ability to reason, use a tool, execute a procedure, or produce an artifact.", boundary: "Being able to act does not establish permission, accountability, or decision rights." },
    right: { name: "Authority", owns: "Permission to exercise capability under an explicit scope, policy, owner, and consequence level.", boundary: "It should be delegated minimally, recorded durably, and never inferred from technical access alone." },
    links: [
      { label: "Authority and emergency control", href: "/docs/02-design/07-governance-policy-and-risk-proportional-approval" },
      { label: "Decision rights", href: "/docs/02-design/04-the-human-agent-operating-model" },
    ],
  },
];

const depthLabels: { id: Depth; label: string; note: string }[] = [
  { id: "30-sec", label: "30 sec", note: "Core distinction" },
  { id: "2-min", label: "2 min", note: "Ownership and boundary" },
  { id: "deep-dive", label: "Deep dive", note: "Canonical chapters" },
];

export function ConceptComparisons() {
  const [activeId, setActiveId] = useState(comparisons[0].id);
  const [depth, setDepth] = useState<Depth>("30-sec");
  const active = comparisons.find((comparison) => comparison.id === activeId) ?? comparisons[0];

  return (
    <section className="concept-comparisons" aria-labelledby="concept-comparisons-title">
      <header>
        <div><span className="section-kicker">Concept boundaries</span><h2 id="concept-comparisons-title">Understand the system by contrast.</h2></div>
        <p>Choose a pair, then increase the depth. Each comparison states ownership, limits, and the authoritative chapters without creating a second source of truth.</p>
      </header>

      <div className="comparison-selector" role="group" aria-label="Choose concepts to compare">
        {comparisons.map((comparison) => (
          <button aria-controls="comparison-panel" aria-pressed={active.id === comparison.id} className={active.id === comparison.id ? "is-active" : undefined} key={comparison.id} onClick={() => setActiveId(comparison.id)} type="button">{comparison.label}</button>
        ))}
      </div>

      <article aria-live="polite" className="comparison-panel" id="comparison-panel">
        <div className="comparison-orientation"><span>AI Software Factory</span><b aria-hidden="true">→</b><strong>{active.left.name} ↔ {active.right.name}</strong></div>
        <div className="comparison-depth" role="group" aria-label="Choose explanation depth">
          {depthLabels.map((option) => <button aria-controls="comparison-depth-panel" aria-pressed={depth === option.id} className={depth === option.id ? "is-active" : undefined} key={option.id} onClick={() => setDepth(option.id)} type="button"><strong>{option.label}</strong><small>{option.note}</small></button>)}
        </div>

        <div className="comparison-depth-panel" id="comparison-depth-panel">
          {depth === "30-sec" && <div className="comparison-brief"><span>Core distinction</span><p>{active.short}</p></div>}
          {depth === "2-min" && (
            <div className="comparison-expanded">
              <p>{active.distinction}</p>
              <div>
                {[active.left, active.right].map((side) => <section key={side.name}><h3>{side.name}</h3><dl><div><dt>Owns</dt><dd>{side.owns}</dd></div><div><dt>Does not prove or authorize</dt><dd>{side.boundary}</dd></div></dl></section>)}
              </div>
            </div>
          )}
          {depth === "deep-dive" && (
            <div className="comparison-deep-dive">
              <span>Canonical guide</span>
              <p>Use the chapters below for contracts, failure behavior, examples, and evidence boundaries. They remain the source of truth for this comparison.</p>
              <div>{active.links.map((link) => <Link href={link.href} key={link.href}>{link.label}<span aria-hidden="true">→</span></Link>)}</div>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}
