"use client";

import Link from "next/link";
import { useState } from "react";

type NodeId = "human" | "control" | "contract" | "outer" | "inner" | "environment" | "compute" | "candidate" | "verification" | "decision" | "delivery" | "production" | "feedback" | "agent-factory" | "agents" | "skills" | "tools" | "models" | "evals";
type FactoryNode = { id: NodeId; label: string; eyebrow: string; description: string; href: string; lane: "governance" | "execution" | "assurance" | "supply" };

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

const relationships: [NodeId, NodeId][] = [
  ["human", "control"], ["control", "contract"], ["contract", "outer"], ["outer", "inner"], ["inner", "environment"], ["environment", "compute"],
  ["compute", "candidate"], ["candidate", "verification"], ["verification", "decision"], ["decision", "delivery"], ["delivery", "production"], ["production", "feedback"],
  ["feedback", "agent-factory"], ["agent-factory", "agents"], ["agent-factory", "skills"], ["agent-factory", "tools"], ["agent-factory", "models"], ["agent-factory", "evals"],
  ["agents", "control"], ["skills", "control"], ["tools", "control"], ["models", "control"], ["evals", "verification"],
];

const factoryContexts = [
  {
    label: "Agent Factory",
    description: "Creates, versions, evaluates, publishes, and governs reusable capabilities.",
    href: "/docs/agent-factory/01-capability-supply-chain-and-registries",
  },
  {
    label: "AI Software Factory",
    description: "Composes people, policy, capabilities, execution, verification, delivery, production, and learning.",
    href: "/docs/01-vision/01-what-is-an-ai-software-factory",
  },
  {
    label: "Mission Control",
    description: "Implements control-plane responsibilities as a scoped case study—not the complete factory definition.",
    href: "/docs/09-mission-control-case-studies/03-capability-workflow-and-admission-map",
  },
] as const;

function related(active: NodeId, candidate: NodeId) {
  return active === candidate || relationships.some(([from, to]) => (from === active && to === candidate) || (to === active && from === candidate));
}

export function FactoryArchitecture() {
  const [activeId, setActiveId] = useState<NodeId>("control");
  const active = nodes.find((node) => node.id === activeId) ?? nodes[1];
  const primary = nodes.filter((node) => node.lane !== "supply");
  const supply = nodes.filter((node) => node.lane === "supply");

  function nodeButton(node: FactoryNode) {
    return (
      <button
        aria-pressed={activeId === node.id}
        className={`factory-node lane-${node.lane} ${related(activeId, node.id) ? "is-related" : ""} ${activeId === node.id ? "is-active" : ""}`}
        key={node.id}
        onClick={() => setActiveId(node.id)}
        onFocus={() => setActiveId(node.id)}
        onMouseEnter={() => setActiveId(node.id)}
        type="button"
      >
        <small>{node.eyebrow}</small><strong>{node.label}</strong>
      </button>
    );
  }

  return (
    <section className="factory-architecture" id="factory-architecture" aria-labelledby="factory-architecture-title">
      <header className="section-heading architecture-section-heading">
        <div><span className="section-kicker">Canonical architecture explorer</span><h2 id="factory-architecture-title">Follow capability down. Trace evidence back up.</h2></div>
        <p>Downward paths delegate bounded capability. Upward paths report observations, evidence, and outcomes.</p>
      </header>
      <div className="factory-map-shell">
        <div className="factory-map" aria-label="Interactive AI Software Factory architecture">
          <div className="factory-primary-flow">
            {primary.map((node, index) => <div className="factory-flow-step" key={node.id}>{nodeButton(node)}{index < primary.length - 1 && <span className="flow-connector" aria-hidden="true">↓</span>}</div>)}
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
        <aside className="factory-inspector" aria-live="polite">
          <span>{active.eyebrow}</span>
          <h3>{active.label}</h3>
          <p>{active.description}</p>
          <Link href={active.href}>Open canonical curriculum <span aria-hidden="true">→</span></Link>
          <blockquote>An executor cannot grant itself authority or independently certify its own material work.</blockquote>
        </aside>
      </div>
    </section>
  );
}
