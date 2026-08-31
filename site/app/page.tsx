import Link from "next/link";
import { documents } from "../lib/content";
import { learningPathBlueprints, lifecycleStages } from "../lib/curriculum";
import { ContinueLearning } from "./components/ContinueLearning";
import { FactoryArchitecture } from "./components/FactoryArchitecture";
import { LearningPathPreview } from "./components/LearningPathPreview";
import { LifecycleExplorer } from "./components/LifecycleExplorer";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const topics = [
  ["01", "Capability supply chain", "Registries, packaging, versioning, certification, discovery, and revocation.", "/docs/agent-factory/01-capability-supply-chain-and-registries"],
  ["02", "Autonomous workflows", "Repository onboarding plus feature, defect, test, security, incident, and knowledge work.", "/docs/autonomous-workflows/02-autonomous-engineering-workflow-catalog"],
  ["03", "Runtime and platform", "Harnesses, environments, scheduling, cost, resilience, and human control surfaces.", "/docs/factory-platform-engineering/02-scheduling-capacity-cost-and-fairness"],
  ["04", "Verification and delivery", "Testing, artifacts, migrations, progressive delivery, rollback, and production outcomes.", "/docs/verification-delivery-engineering/01-software-testing-strategy-for-agentic-change"],
  ["05", "Security and identity", "Agentic threats, workload identity, secrets, privacy, provenance, and policy.", "/docs/08-security-and-governance/04-agentic-threat-model-and-adversarial-defense"],
  ["06", "Evaluation and learning", "Datasets, calibrated graders, controlled experiments, optimization, and regression control.", "/docs/06-ai-engineering/06-evaluation-science-and-controlled-experimentation"],
];

export default function Home() {
  const stageContent = lifecycleStages.map((stage) => ({
    id: stage.id,
    chapters: documents.filter((document) => document.lifecycle.some((value) => value === stage.id)).slice(0, 3).map((document) => ({ title: document.title, href: `/docs/${document.slug}`, meta: `${document.section} · ${document.readingMinutes} min` })),
  }));
  const paths = learningPathBlueprints.map((path) => {
    const pathDocuments = path.id === "deep-study" ? documents : documents.filter((document) => path.slugs.some((slug) => slug === document.slug));
    return { ...path, chapterCount: pathDocuments.length, labCount: pathDocuments.filter((document) => document.hasLab).length };
  });

  return (
    <>
      <SiteHeader />
      <main>

      <section className="hero premium-hero">
        <div className="hero-status"><span>Mastery console</span><i>96-source curriculum</i><i>Governed architecture</i></div>
        <div className="eyebrow">Engineering autonomous delivery beyond the coding agent</div>
        <h1>Build the system <em>around</em> the agent.</h1>
        <div className="hero-bottom"><p className="hero-copy">Learn how human intent becomes validated software through bounded authority, durable execution, independent evidence, controlled delivery, and governed improvement.</p><div className="hero-actions"><Link className="button button-primary" href="/learn">Start learning</Link><Link className="button button-secondary" href="#factory-architecture">Explore architecture</Link></div></div>
        <ContinueLearning />
      </section>

      <section className="thesis-console" aria-label="Product thesis">
        <div><span>01 / System</span><strong>The agent executes.</strong><p>It reasons, proposes, and acts inside a bounded runtime.</p></div>
        <div><span>02 / Governance</span><strong>The factory authorizes.</strong><p>It owns policy, state, admission, recovery, and decisions.</p></div>
        <div><span>03 / Proof</span><strong>Independent evidence decides readiness.</strong><p>The producer cannot certify its own material work.</p></div>
      </section>

      <FactoryArchitecture />

      <LifecycleExplorer content={stageContent} />

      <section className="path-preview" aria-labelledby="path-title">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Start at the right altitude</span>
            <h2 id="path-title">Four paths. One system.</h2>
          </div>
          <Link className="text-link" href="/learn">Compare the paths <span aria-hidden="true">→</span></Link>
        </div>
        <LearningPathPreview paths={paths} />
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
