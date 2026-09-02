import Link from "next/link";
import { documents } from "../lib/content";
import { guideParts } from "../lib/guide";
import { lifecycleStages } from "../lib/lifecycle";
import { FactoryArchitecture } from "./components/FactoryArchitecture";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const domains = [
  ["System design", "Purpose, operating model, domain records, lifecycle, boundaries, economics, and adoption.", "/guide#understand"],
  ["Agent and capability engineering", "Agents, skills, tools, models, context, memory, protocols, evaluation, and the Agent Factory.", "/guide#build"],
  ["Runtime and infrastructure", "Control plane, orchestration, harnesses, environments, compute, state, recovery, and cost.", "/docs/05-runtime-architecture/06-ai-software-factory-reference-architecture"],
  ["Quality and delivery", "Independent verification, evidence, testing, pull requests, CI/CD, rollout, rollback, and outcomes.", "/guide#prove"],
  ["Security and governance", "Identity, least privilege, data boundaries, prompt injection, supply chain, authority, and emergency control.", "/docs/08-security-and-governance/06-agentic-governance-control-framework"],
  ["Operations and improvement", "Observability, SLOs, capacity, incidents, feedback, compounding engineering, and controlled learning.", "/guide#operate"],
] as const;

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero guide-home-hero">
          <div className="hero-status"><span>AI software factory field guide</span><i>{documents.length} full chapters</i><i>10 visual system maps</i></div>
          <div className="eyebrow">Designing autonomous delivery beyond the coding agent</div>
          <h1>Build, operate, and master the <em>whole</em> factory.</h1>
          <div className="hero-bottom">
            <p className="hero-copy">A complete technical guide to turning human intent into validated production software through reusable capabilities, bounded agents, durable execution, independent evidence, explicit authority, and governed improvement.</p>
            <div className="hero-actions"><Link className="button button-primary" href="/guide">Read the complete guide</Link><Link className="button button-secondary" href="/visuals">Open the visual guide</Link></div>
          </div>
        </section>

        <section className="definition-band" aria-label="Core definitions">
          <Link href="/docs/agent-factory/01-capability-supply-chain-and-registries"><span>Capability supply</span><h2>Agent Factory</h2><p>Creates, versions, evaluates, publishes, and governs reusable agents, skills, tools, model profiles, and configurations.</p></Link>
          <Link href="/docs/01-vision/01-what-is-an-ai-software-factory"><span>Delivery system</span><h2>AI Software Factory</h2><p>Composes people, policy, capabilities, execution, proof, delivery, operations, and learning from intent through production value.</p></Link>
          <Link href="/docs/09-mission-control-case-studies/03-capability-workflow-and-admission-map"><span>Living implementation</span><h2>Mission Control</h2><p>Implements control-plane responsibilities for governed missions, execution admission, evidence, verification, and human authority.</p></Link>
        </section>

        <section className="home-guide-map" aria-labelledby="home-guide-title">
          <header><div><span className="section-kicker">The complete guide</span><h2 id="home-guide-title">Follow the decisions required to build a real factory.</h2></div><p>Read every chapter in one stable sequence or enter at the part that matches the system you are designing now.</p></header>
          <ol>{guideParts.map((part) => <li key={part.id}><Link href={`/guide#${part.id}`}><span>{part.number}</span><div><strong>{part.verb}</strong><small>{part.title}</small></div><b aria-hidden="true">→</b></Link></li>)}</ol>
        </section>

        <section className="home-lifecycle" aria-labelledby="home-lifecycle-title">
          <header><div><span className="section-kicker">Factory lifecycle</span><h2 id="home-lifecycle-title">Control flows down. Evidence flows back up.</h2></div><Link className="text-link" href="/visuals#factory-lifecycle">Study the lifecycle map →</Link></header>
          <ol>{lifecycleStages.map((stage, index) => <li key={stage.id}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage.label}</strong><p>{stage.detail}</p></li>)}</ol>
          <div><span>Intent and authority</span><i aria-hidden="true">↓</i><span>Bounded execution</span><i aria-hidden="true">↑</i><span>Evidence and outcomes</span></div>
        </section>

        <FactoryArchitecture />

        <section className="visual-atlas-callout">
          <div><span className="section-kicker">Original, readable infographics</span><h2>Ten maps for retaining the system—not ten screenshots to squint at.</h2><p>The visual guide covers the lifecycle, twelve production-AI disciplines, orchestration, agent patterns, memory, loop engineering, governance, observability, interoperability, and engineering-attention altitude.</p><Link className="button button-primary" href="/visuals">Explore the visual atlas</Link></div>
          <div className="visual-atlas-preview" aria-hidden="true"><span>Intent</span><span>Capabilities</span><span>Runtime</span><span>Evidence</span><span>Delivery</span><span>Outcomes</span></div>
        </section>

        <section className="topics-section home-domains">
          <div className="section-heading"><div><span className="section-kicker">Complete knowledge map</span><h2>Every discipline the factory depends on.</h2></div><Link className="text-link" href="/topics">Open the reference index →</Link></div>
          <div className="topic-grid">{domains.map(([title, description, href], index) => <Link className="topic-card" href={href} key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></Link>)}</div>
        </section>

        <section className="principles-section">
          <div className="principle-statement"><span className="section-kicker">The durable thesis</span><blockquote>Reliable autonomy comes from a trustworthy system around fallible agents.</blockquote></div>
          <div className="principle-list"><div><strong>Humans</strong><span>Own intent, judgment, policy, and material risk</span></div><div><strong>Agents</strong><span>Reason and execute inside bounded authority</span></div><div><strong>Software</strong><span>Owns durable state, policy, recovery, and control</span></div><div><strong>Evidence</strong><span>Proves whether exact work is ready to progress</span></div></div>
        </section>

        <section className="guide-reference-callout home-reference-callout">
          <div><span className="section-kicker">Depth without confusion</span><h2>Read the full guide. Inspect the architecture. Verify the claims.</h2></div>
          <p>The guide keeps enduring design, a living Mission Control case study, and implementation evidence distinct so architecture does not become an unsupported capability claim.</p>
          <div><Link className="button button-primary" href="/guide">Read the guide</Link><Link className="button button-secondary" href="/coverage">Inspect coverage</Link></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
