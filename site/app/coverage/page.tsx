import type { Metadata } from "next";
import Link from "next/link";
import { appendices, chapters, stages } from "../../lib/content";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Coverage & Maturity · The AI Software Factory Guide",
  description: "See what the guide covers, how strong the evidence behind each area is, and what remains unproven.",
};

const maturity = [
  ["Missing", "No accountable coverage exists yet."],
  ["Scoped", "The boundary is named; a complete chapter is not yet available."],
  ["Draft for study", "Useful working material awaiting technical and editorial review."],
  ["Review ready", "Complete enough for external architecture, technical, editorial, and usability review."],
  ["Validated", "Review feedback and defined evidence checks are complete."],
  ["Operationally proven", "Repeatable evidence exists for an exact implementation and operating scope."],
];

const areas = [
  ["Reference architecture", "Lifecycle, logical components, trust boundaries, authority, evidence, inventory, and minimum-sufficient autonomy.", "Review-ready architecture; full implementation conformance remains unproven.", "/docs/01-understand/02-the-factory-in-one-view"],
  ["Agent Factory", "Capability identity, registries, packaging, dependency resolution, certification, promotion, and revocation.", "Review-ready architecture; unified production registry remains unproven.", "/docs/03-build/10-the-agent-factory"],
  ["Repository intelligence and workflows", "Onboarding, owner validation, instructions, architecture, dependencies, build, tests, data, readiness, and the workflow catalog.", "Catalog and contracts are review ready; only the first bounded workflow has partial evidence.", "/docs/03-build/20-autonomous-engineering-workflows"],
  ["Verification & delivery", "Testing, artifacts, CI/CD, migrations, compatibility, progressive release, rollback, and production outcomes.", "Architecture is review ready; the complete production path remains unproven.", "/docs/04-prove/25-cicd-progressive-delivery-and-production-verification"],
  ["Factory platform", "Portal, catalog, golden paths, scheduling, cost, fairness, resilience, disaster recovery, and operator experience.", "Architecture is review ready; fleet-scale and recovery proof remains unproven.", "/docs/05-operate/27-the-factory-as-a-platform"],
  ["Security & governance", "Agentic threats, policy, identity, secrets, privacy, provenance, licensing, and compliance.", "Core controls and review-ready additions exist; full adversarial evidence remains unproven.", "/docs/04-prove/26-security"],
  ["Control & operations", "Emergency control, decision rights, SLOs, cost, continuity, drift, triage, response, and verified closure.", "Review-ready contracts; exercised fleet-scale operating proof remains unproven.", "/docs/05-operate/29-resilience-incidents-and-the-control-tower"],
  ["Evaluation & learning", "Datasets, graders, uncertainty, experiments, optimization, regression control, and human promotion.", "Architecture is review ready; production optimization and rollback remain unproven.", "/docs/04-prove/23-evaluation-engineering"],
];

export default function CoveragePage() {
  const numbered = chapters.filter((chapter) => chapter.chapter !== null && chapter.chapter > 0);
  const caseStudies = appendices.filter((document) => document.contentType === "case study");
  const infographicSlots = numbered.reduce((count, chapter) => count + chapter.infographics.length, 0);

  return (
    <>
      <SiteHeader />
      <main className="interior-page coverage-page">
        <header className="page-intro split-intro">
          <div>
            <span className="eyebrow">Truth before breadth</span>
            <h1>Coverage is not proof.</h1>
          </div>
          <div>
            <p>Use this map to separate documented architecture, editorial maturity, validation, and operational evidence.</p>
            <div className="coverage-intro-actions">
              <Link className="button button-primary" href="/docs/appendix/coverage-and-maturity">Read the coverage appendix</Link>
              <Link className="button button-secondary" href="/architecture">Explore architecture</Link>
            </div>
          </div>
        </header>

        <section className="coverage-summary" aria-labelledby="coverage-summary-title">
          <div>
            <span className="section-kicker">Published corpus</span>
            <h2 id="coverage-summary-title">{numbered.length} chapters, {stages.length} stages, {caseStudies.length} case studies.</h2>
            <p>A review-ready chapter is ready for external scrutiny. It does not imply that the described implementation is operationally proven.</p>
          </div>
          <div className="coverage-activity-grid">
            <Link href="/guide"><span>Chapters</span><strong>{numbered.length}</strong><small>Table of contents →</small></Link>
            <Link href="/guide#stages"><span>Stages</span><strong>{stages.length}</strong><small>The factory in one line →</small></Link>
            <Link href="/topics#mission-control-case-studies"><span>Mission Control case studies</span><strong>{caseStudies.length}</strong><small>Reference shelf →</small></Link>
            <Link href="/visuals"><span>Infographic slots</span><strong>{infographicSlots}</strong><small>Atlas →</small></Link>
          </div>
        </section>

        <section className="coverage-areas" aria-labelledby="coverage-areas-title">
          <div className="section-heading"><div><span className="section-kicker">Capability map</span><h2 id="coverage-areas-title">What is covered. What is not proven.</h2></div></div>
          <div className="coverage-area-grid">
            {areas.map(([title, coverage, boundary, href], index) => (
              <Link href={href} key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{coverage}</p>
                <small>{boundary}</small>
                <em>Open the chapter →</em>
              </Link>
            ))}
          </div>
        </section>

        <section className="maturity-ladder" aria-labelledby="maturity-title">
          <div><span className="section-kicker">Maturity ladder</span><h2 id="maturity-title">Every stronger claim needs stronger evidence.</h2></div>
          <ol>{maturity.map(([title, description], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{title}</strong><p>{description}</p></div></li>)}</ol>
        </section>

        <section className="coverage-review-callout">
          <span className="section-kicker">For external reviewers</span>
          <h2>Challenge the boundary, claim, failure, or evidence.</h2>
          <p>Use the reviewer guide for focused architecture, builder, operations, security, or guide feedback.</p>
          <div><Link className="button button-primary" href="/docs/appendix/reviewer-guide">Open reviewer guide</Link><Link className="button button-secondary" href="/docs/appendix/changelog">See the changelog</Link><a className="button button-secondary" href="https://github.com/jaydubya818/ai-software-factory-mastery/issues/new" target="_blank" rel="noreferrer">Report feedback ↗</a></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
