import Link from "next/link";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const paths = [
  { label: "Executive", id: "executive", time: "20 min", outcome: "Value, risk, and operating model" },
  { label: "Architect", id: "architect", time: "3 hours", outcome: "Boundaries, runtime, and assurance" },
  { label: "Builder", id: "builder", time: "Hands-on", outcome: "Agents, harnesses, evals, and labs" },
  { label: "Deep study", id: "deep-study", time: "Complete", outcome: "The full technical curriculum" },
];

const topics = [
  ["01", "Capability supply chain", "Registries, packaging, versioning, certification, discovery, and revocation.", "/docs/agent-factory/01-capability-supply-chain-and-registries"],
  ["02", "Autonomous workflows", "Repository onboarding plus feature, defect, test, security, incident, and knowledge work.", "/docs/autonomous-workflows/02-autonomous-engineering-workflow-catalog"],
  ["03", "Runtime and platform", "Harnesses, environments, scheduling, cost, resilience, and human control surfaces.", "/docs/factory-platform-engineering/02-scheduling-capacity-cost-and-fairness"],
  ["04", "Verification and delivery", "Testing, artifacts, migrations, progressive delivery, rollback, and production outcomes.", "/docs/verification-delivery-engineering/01-software-testing-strategy-for-agentic-change"],
  ["05", "Security and identity", "Agentic threats, workload identity, secrets, privacy, provenance, and policy.", "/docs/08-security-and-governance/04-agentic-threat-model-and-adversarial-defense"],
  ["06", "Evaluation and learning", "Datasets, calibrated graders, controlled experiments, optimization, and regression control.", "/docs/06-ai-engineering/06-evaluation-science-and-controlled-experimentation"],
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>

      <section className="hero">
        <div className="eyebrow">Engineering autonomous delivery beyond the coding agent</div>
        <h1>Build the system around the agent.</h1>
        <p className="hero-copy">
          A practical curriculum for turning human intent into validated software
          through bounded agents, durable execution, independent evidence, and
          explicit authority.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/learn">Choose your path</Link>
          <Link className="button button-secondary" href="/architecture">
            See the architecture
          </Link>
        </div>
      </section>

      <section className="system-strip" aria-labelledby="system-title">
        <div>
          <span className="section-kicker">The governed value stream</span>
          <h2 id="system-title">From intent to evidence-backed delivery</h2>
        </div>
        <ol className="system-flow">
          <li>Intent</li><li>Plan</li><li>Execute</li><li>Verify</li><li>Deliver</li><li>Learn</li>
        </ol>
      </section>

      <section className="path-preview" aria-labelledby="path-title">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Start at the right altitude</span>
            <h2 id="path-title">Four paths. One system.</h2>
          </div>
          <Link className="text-link" href="/learn">Compare the paths <span aria-hidden="true">→</span></Link>
        </div>
        <div className="path-grid">
          {paths.map((path, index) => (
            <Link className="path-card" href={`/learn#${path.id}`} key={path.label}>
              <span className="path-number">0{index + 1}</span>
              <h3>{path.label}</h3>
              <p>{path.outcome}</p>
              <span className="path-time">{path.time}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="architecture-section">
        <div className="architecture-copy">
          <span className="section-kicker">One canonical model</span>
          <h2>The worker is not the system.</h2>
          <p>
            Capability flows down through explicit contracts. Evidence and outcomes
            flow back up. No execution layer can silently widen its own authority.
          </p>
          <Link className="text-link" href="/architecture">
            Explore all nine views <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="architecture-stack" role="img" aria-label="Canonical AI Software Factory stack">
          <div className="stack-row stack-human"><span>Human intent, policy, and decisions</span></div>
          <div className="stack-row stack-control"><span>Control plane</span><span>Orchestration</span></div>
          <div className="stack-supply">Agent Factory supplies evaluated capabilities</div>
          <div className="stack-row stack-contract"><span>Frozen execution contract</span></div>
          <div className="stack-row stack-runtime"><span>Outer harness</span><span>Inner harness</span></div>
          <div className="stack-row stack-infra"><span>Development environment</span><span>Compute</span></div>
          <div className="stack-row stack-proof"><span>Independent verification</span><span>Evidence</span></div>
          <div className="stack-row stack-outcome"><span>Delivery</span><span>Production outcome</span><span>Learning</span></div>
        </div>
      </section>

      <section className="topics-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Explore the curriculum</span>
            <h2>Find the layer behind the failure.</h2>
          </div>
          <Link className="text-link" href="/topics">View the topic index <span aria-hidden="true">→</span></Link>
        </div>
        <div className="topic-grid">
          {topics.map(([number, title, description, href]) => (
            <Link className="topic-card" href={href} key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="principles-section">
        <div className="principle-statement">
          <span className="section-kicker">The core thesis</span>
          <blockquote>
            Reliable autonomy comes from a trustworthy system around fallible agents.
          </blockquote>
        </div>
        <div className="principle-list">
          <div><strong>Humans</strong><span>Intent, judgment, and material risk</span></div>
          <div><strong>Agents</strong><span>Bounded reasoning and execution</span></div>
          <div><strong>Software</strong><span>Policy, state, recovery, and control</span></div>
          <div><strong>Evidence</strong><span>Independent proof of readiness</span></div>
        </div>
      </section>

      <section className="coverage-home-callout">
        <div>
          <span className="section-kicker">Truth before breadth</span>
          <h2>See what is covered—and what is not yet proven.</h2>
        </div>
        <p>Every document carries a maturity label. The coverage map separates review-ready architecture from validated and operational evidence.</p>
        <Link className="button button-primary" href="/coverage">Inspect coverage and maturity</Link>
      </section>

      <section className="architecture-home-callout">
        <div>
          <span className="section-kicker">Reference depth</span>
          <h2>From one map to every contract.</h2>
        </div>
        <p>Trace lifecycle, planes, runtime components, governance, inventory, autonomy patterns, monitoring, data flow, and evidence—then open the canonical specification behind each item.</p>
        <Link className="button button-secondary" href="/architecture">Explore the architecture hub</Link>
      </section>

      <section className="case-study-callout">
        <span className="section-kicker">Living case study</span>
        <h2>Vision stays separate from proof.</h2>
        <p>
          Mission Control grounds the curriculum in a versioned implementation while
          keeping current capability, enduring architecture, and future vision distinct.
        </p>
        <Link className="button button-secondary" href="/docs/09-mission-control-case-studies/03-capability-workflow-and-admission-map">
          Inspect the evidence map
        </Link>
      </section>
      </main>
      <SiteFooter />
    </>
  );
}
