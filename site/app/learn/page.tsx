import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

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
    ],
  },
  {
    id: "architect",
    number: "02",
    title: "Architect",
    time: "2 hours",
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
      ["Quality and Evidence", "/docs/07-quality-engineering/01-quality-and-evidence-architecture"],
    ],
  },
  {
    id: "builder",
    number: "03",
    title: "Builder",
    time: "Hands-on",
    outcome: "Implement and debug one governed path from issue to verified candidate.",
    instruction: "Complete the evidence, failure, cancellation, and cleanup paths—not only the happy path.",
    chapters: [
      ["Agent Architecture", "/docs/06-ai-engineering/01-agent-architecture-mcp-tools-context-and-memory"],
      ["Agent and Loop Patterns", "/docs/06-ai-engineering/05-agent-and-loop-engineering-patterns"],
      ["Data, Knowledge, and Context", "/docs/06-ai-engineering/03-data-knowledge-context-and-semantic-engineering"],
      ["Evaluation and Replay", "/docs/06-ai-engineering/04-evaluation-engineering-trace-replay-and-run-comparison"],
      ["Attempts and Recovery", "/docs/05-runtime-architecture/03-tasks-attempts-leases-idempotency-and-recovery"],
      ["Sandboxed Execution", "/docs/05-runtime-architecture/04-sandboxed-execution-isolation-and-publication"],
      ["Feedback to Merge", "/docs/07-quality-engineering/05-production-feedback-reproduction-review-and-merge"],
      ["Golden-Path Lab", "/docs/10-labs/01-governed-issue-to-validated-pull-request"],
    ],
  },
  {
    id: "deep-study",
    number: "04",
    title: "Deep Study",
    time: "Complete curriculum",
    outcome: "Design, build, operate, evaluate, and defend the factory from first principles.",
    instruction: "Complete every area, whiteboard, teach-back, and lab in sequence.",
    chapters: [
      ["Open the full curriculum", "/docs/curriculum"],
      ["Use the topic index", "/topics"],
      ["Study the research canon", "/docs/12-research-journal/initial-canon"],
      ["Complete the capstone", "/docs/10-labs/02-capstone-architecture-and-executive-defense"],
    ],
  },
];

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
                    <a href={href}><span>{String(index + 1).padStart(2, "0")}</span>{title}</a>
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
