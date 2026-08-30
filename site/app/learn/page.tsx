import type { Metadata } from "next";
import { documents } from "../../lib/content";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { StatusBadge } from "../components/StatusBadge";

export const metadata: Metadata = {
  title: "Learning Paths · AI Software Factory Mastery",
  description: "Choose an Executive, Architect, Builder, or Deep Study path through the curriculum.",
};

const paths = [
  {
    id: "executive",
    number: "01",
    title: "Executive",
    time: "20 minutes",
    outcome: "Explain the value, risk model, human accountability, and adoption sequence.",
    instruction: "Read only each chapter’s Quick Read section.",
    chapters: [
      ["Factory and Mission Control", "/docs/00-overview/01-ai-software-factory-and-mission-control"],
      ["What Is an AI Software Factory?", "/docs/01-vision/01-what-is-an-ai-software-factory"],
      ["Human-Agent Operating Model", "/docs/03-operating-model/01-human-agent-operating-model"],
      ["Operational Autonomy", "/docs/02-first-principles/01-operational-autonomy-and-trust-calibration"],
      ["Quality and Evidence", "/docs/07-quality-engineering/01-quality-and-evidence-architecture"],
      ["Coverage and Maturity", "/docs/00-overview/08-capability-coverage-and-maturity"],
    ],
  },
  {
    id: "architect",
    number: "02",
    title: "Architect",
    time: "3 hours",
    outcome: "Whiteboard the complete system and identify every authority and failure boundary.",
    instruction: "Read the chapters, then redraw the canonical map from memory.",
    chapters: [
      ["Stack Boundaries", "/docs/00-overview/05-software-factory-stack-boundaries"],
      ["Intent-to-Delivery Lifecycle", "/docs/00-overview/04-intent-to-delivery-lifecycle"],
      ["Authoritative Delivery Hierarchy", "/docs/04-domain-model/01-authoritative-delivery-hierarchy"],
      ["Control and Execution Planes", "/docs/05-runtime-architecture/01-control-plane-and-execution-plane"],
      ["Runtime Orchestration", "/docs/05-runtime-architecture/02-runtime-orchestration-and-state-machines"],
      ["Environments and Compute", "/docs/05-runtime-architecture/07-development-environments-compute-and-composable-infrastructure"],
      ["Harnesses and Protocols", "/docs/05-runtime-architecture/08-coding-harnesses-adapters-and-agent-protocols"],
      ["Capability Supply Chain", "/docs/agent-factory/01-capability-supply-chain-and-registries"],
      ["Repository Onboarding", "/docs/autonomous-workflows/01-repository-onboarding-and-codebase-intelligence"],
      ["Quality and Evidence", "/docs/07-quality-engineering/01-quality-and-evidence-architecture"],
      ["CI/CD and Compatibility", "/docs/verification-delivery-engineering/02-cicd-artifacts-migrations-and-api-compatibility"],
      ["Agentic Threat Model", "/docs/08-security-and-governance/04-agentic-threat-model-and-adversarial-defense"],
    ],
  },
  {
    id: "builder",
    number: "03",
    title: "Builder",
    time: "Hands-on",
    outcome: "Implement and debug one governed path from onboarding and capability resolution through delivery, recovery, and learning.",
    instruction: "Complete capability, evidence, failure, delivery, rollback, learning, and cleanup paths—not only the happy path.",
    chapters: [
      ["Repository Onboarding", "/docs/autonomous-workflows/01-repository-onboarding-and-codebase-intelligence"],
      ["Capability Supply Chain", "/docs/agent-factory/01-capability-supply-chain-and-registries"],
      ["Agent Architecture", "/docs/06-ai-engineering/01-agent-architecture-mcp-tools-context-and-memory"],
      ["Agent and Loop Patterns", "/docs/06-ai-engineering/05-agent-and-loop-engineering-patterns"],
      ["Attempts and Recovery", "/docs/05-runtime-architecture/03-tasks-attempts-leases-idempotency-and-recovery"],
      ["Software Testing Strategy", "/docs/verification-delivery-engineering/01-software-testing-strategy-for-agentic-change"],
      ["Evaluation and Replay", "/docs/06-ai-engineering/04-evaluation-engineering-trace-replay-and-run-comparison"],
      ["CI/CD and Artifacts", "/docs/verification-delivery-engineering/02-cicd-artifacts-migrations-and-api-compatibility"],
      ["Progressive Delivery", "/docs/verification-delivery-engineering/03-progressive-delivery-production-verification-and-rollback"],
      ["Capability Learning", "/docs/06-ai-engineering/07-capability-learning-optimization-and-regression-control"],
      ["Capability Certification Lab", "/docs/10-labs/03-capability-certification-and-revocation-lab"],
      ["Repository Readiness Lab", "/docs/10-labs/04-repository-onboarding-and-readiness-lab"],
      ["Delivery and Rollback Lab", "/docs/10-labs/06-progressive-delivery-and-rollback-lab"],
      ["Improvement Promotion Lab", "/docs/10-labs/08-continual-improvement-promotion-lab"],
    ],
  },
  {
    id: "deep-study",
    number: "04",
    title: "Deep Study",
    time: "Complete curriculum",
    outcome: "Design, build, operate, evaluate, and defend the factory from first principles.",
    instruction: "Follow every core area in sequence, then complete the case studies, labs, and external review checklist.",
    chapters: [
      ["Vision and First Principles", "/docs/01-vision/01-what-is-an-ai-software-factory"],
      ["Operating Model", "/docs/03-operating-model/01-human-agent-operating-model"],
      ["Domain Model", "/docs/04-domain-model/01-authoritative-delivery-hierarchy"],
      ["Agent Factory", "/docs/agent-factory/01-capability-supply-chain-and-registries"],
      ["Runtime Architecture", "/docs/05-runtime-architecture/01-control-plane-and-execution-plane"],
      ["AI Engineering", "/docs/06-ai-engineering/01-agent-architecture-mcp-tools-context-and-memory"],
      ["Autonomous Workflows", "/docs/autonomous-workflows/02-autonomous-engineering-workflow-catalog"],
      ["Verification and Delivery", "/docs/verification-delivery-engineering/01-software-testing-strategy-for-agentic-change"],
      ["Factory Platform", "/docs/factory-platform-engineering/01-developer-portal-catalog-and-golden-paths"],
      ["Quality Engineering", "/docs/07-quality-engineering/01-quality-and-evidence-architecture"],
      ["Security and Governance", "/docs/08-security-and-governance/04-agentic-threat-model-and-adversarial-defense"],
      ["Executable Labs", "/docs/10-labs/03-capability-certification-and-revocation-lab"],
      ["External Review", "/docs/00-overview/09-reviewer-guide"],
    ],
  },
];

function statusForHref(href: string) {
  if (!href.startsWith("/docs/")) return null;
  return documents.find((document) => document.slug === href.slice("/docs/".length))?.status ?? null;
}

export default function LearnPage() {
  return (
    <>
      <SiteHeader />
      <main className="interior-page">
        <header className="page-intro">
          <span className="eyebrow">Choose your depth</span>
          <h1>Four paths through one system.</h1>
          <p>Start with the decision you need to make. Move deeper only when the next layer changes that decision.</p>
        </header>
        <div className="learning-paths">
          {paths.map((path) => (
            <section className="learning-path" id={path.id} key={path.id}>
              <div className="learning-path-meta">
                <span>{path.number}</span>
                <p>{path.time}</p>
              </div>
              <div className="learning-path-body">
                <h2>{path.title}</h2>
                <p className="learning-outcome">{path.outcome}</p>
                <p className="learning-instruction">{path.instruction}</p>
              </div>
              <ol className="chapter-sequence">
                {path.chapters.map(([title, href], index) => (
                  <li key={href}>
                    <a href={href}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{title}</strong>
                      {statusForHref(href) && <StatusBadge status={statusForHref(href) ?? "reference"} />}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
