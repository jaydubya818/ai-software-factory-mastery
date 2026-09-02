import type { Metadata } from "next";
import Link from "next/link";
import { documents } from "../../lib/content";
import { lifecycleStages } from "../../lib/lifecycle";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { StatusBadge } from "../components/StatusBadge";

export const metadata: Metadata = {
  title: "Coverage & Maturity · AI Software Factory Mastery",
  description: "See what the autonomous software factory guide covers, how mature each document is, and what remains unproven.",
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
  ["Reference architecture", "Lifecycle, logical components, trust boundaries, authority, evidence, inventory, and minimum-sufficient autonomy.", "Review-ready architecture; full implementation conformance remains unproven.", "/architecture"],
  ["Agent Factory", "Capability identity, registries, packaging, dependency resolution, certification, promotion, and revocation.", "Review-ready architecture; unified production registry remains unproven.", "/topics?section=Agent%20Factory"],
  ["Repository intelligence", "Onboarding, owner validation, instructions, architecture, dependencies, build, tests, data, and readiness.", "Review-ready architecture; end-to-end onboarding evidence remains unproven.", "/docs/autonomous-workflows/01-repository-onboarding-and-codebase-intelligence"],
  ["Autonomous workflows", "Feature, defect, test, dependency, security, incident, production, modernization, and knowledge work.", "Catalog and contracts are review ready; only the first bounded workflow has partial evidence.", "/topics?section=Autonomous%20Workflows"],
  ["Verification & delivery", "Testing, artifacts, CI/CD, migrations, compatibility, progressive release, rollback, and production outcomes.", "Architecture is review ready; the complete production path remains unproven.", "/topics?section=Verification%20%26%20Delivery"],
  ["Factory platform", "Portal, catalog, golden paths, scheduling, cost, fairness, resilience, disaster recovery, and operator experience.", "Architecture is review ready; fleet-scale and recovery proof remains unproven.", "/topics?section=Factory%20Platform"],
  ["Security & governance", "Agentic threats, policy, identity, secrets, privacy, provenance, licensing, and compliance.", "Core controls and review-ready additions exist; full adversarial evidence remains unproven.", "/topics?section=Security%20%26%20Governance"],
  ["Control & operations", "Emergency control, decision rights, SLOs, cost, continuity, drift, triage, response, and verified closure.", "Review-ready contracts; exercised fleet-scale operating proof remains unproven.", "/topics?q=operations"],
  ["Evaluation & learning", "Datasets, graders, uncertainty, experiments, optimization, regression control, and human promotion.", "Architecture is review ready; production optimization and rollback remain unproven.", "/topics?q=evaluation"],
  ["Hands-on practice", "Executable labs for certification, onboarding, attack containment, release recovery, incidents, learning, and disaster recovery.", "Specifications are review ready; accepted execution evidence is still limited.", "/topics?section=Labs"],
];

export default function CoveragePage() {
  const statusCounts = [...documents.reduce((counts, document) => {
    counts.set(document.status, (counts.get(document.status) ?? 0) + 1);
    return counts;
  }, new Map<string, number>()).entries()].sort((a, b) => b[1] - a[1]);
  const lifecycleCounts = lifecycleStages.map((stage) => ({ ...stage, count: documents.filter((document) => document.lifecycle.some((value) => value === stage.id)).length }));
  const architectureCounts = [...documents.reduce((counts, document) => {
    document.architectureLayers.forEach((layer) => counts.set(layer, (counts.get(layer) ?? 0) + 1));
    return counts;
  }, new Map<string, number>()).entries()].sort((a, b) => b[1] - a[1]);
  const personaCounts = [...documents.reduce((counts, document) => {
    document.audience.forEach((persona) => counts.set(persona, (counts.get(persona) ?? 0) + 1));
    return counts;
  }, new Map<string, number>()).entries()].sort((a, b) => b[1] - a[1]);
  const activityCounts = [
    ["Labs", documents.filter((document) => document.hasLab).length, "/topics?section=Labs"],
    ["Whiteboards", documents.filter((document) => document.hasWhiteboardExercise).length, "/topics?q=whiteboard"],
    ["Evidence references", documents.filter((document) => document.hasImplementationEvidence).length, "/topics?q=evidence"],
    ["Failure scenarios", documents.filter((document) => /failure|incident|recovery/i.test(document.content)).length, "/topics?q=failure"],
  ] as const;

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
              <Link className="button button-primary" href="/docs/00-overview/09-reviewer-guide">Review the guide</Link>
              <Link className="button button-secondary" href="/architecture">Explore architecture</Link>
            </div>
          </div>
        </header>

        <section className="coverage-summary" aria-labelledby="coverage-summary-title">
          <div>
            <span className="section-kicker">Published corpus</span>
            <h2 id="coverage-summary-title">{documents.length} documents, honestly labeled.</h2>
            <p>A review-ready chapter is ready for external scrutiny. It does not imply that the described implementation is operationally proven.</p>
          </div>
          <div className="status-counts">
            {statusCounts.map(([status, count]) => <div key={status}><StatusBadge status={status} /><span><strong>{count}</strong><small>documents</small></span></div>)}
          </div>
        </section>

        <section className="coverage-dashboard" aria-labelledby="coverage-dashboard-title">
          <header><div><span className="section-kicker">Metadata-derived dashboard</span><h2 id="coverage-dashboard-title">See where the guide carries weight.</h2></div><p>Every number below comes from generated frontmatter and content signals. The bars show emphasis; they do not claim implementation proof.</p></header>
          <div className="coverage-activity-grid">{activityCounts.map(([label, count, href]) => <Link href={href} key={label}><span>{label}</span><strong>{count}</strong><small>Open source material →</small></Link>)}</div>
          <div className="coverage-matrices">
            <article><header><span>Lifecycle coverage</span><small>Documents may cover multiple stages</small></header><div>{lifecycleCounts.map((stage) => <div className="coverage-matrix-row" key={stage.id}><span>{stage.label}</span><i><b style={{ width: `${Math.round((stage.count / documents.length) * 100)}%` }} /></i><strong>{stage.count}</strong></div>)}</div></article>
            <article><header><span>Architecture coverage</span><small>Section-derived layers</small></header><div>{architectureCounts.map(([layer, count]) => <div className="coverage-matrix-row" key={layer}><span>{layer}</span><i><b style={{ width: `${Math.round((count / Math.max(...architectureCounts.map(([, value]) => value))) * 100)}%` }} /></i><strong>{count}</strong></div>)}</div></article>
            <article><header><span>Audience coverage</span><small>Declared readers</small></header><div>{personaCounts.slice(0, 12).map(([persona, count]) => <div className="coverage-matrix-row" key={persona}><span>{persona.replaceAll("-", " ")}</span><i><b style={{ width: `${Math.round((count / Math.max(...personaCounts.map(([, value]) => value))) * 100)}%` }} /></i><strong>{count}</strong></div>)}</div></article>
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
                <em>Inspect source material →</em>
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
          <div><Link className="button button-primary" href="/docs/00-overview/09-reviewer-guide">Open reviewer guide</Link><Link className="button button-secondary" href="/docs/00-overview/10-changelog">See the changelog</Link><a className="button button-secondary" href="https://github.com/jaydubya818/ai-software-factory-mastery/issues/new" target="_blank" rel="noreferrer">Report feedback ↗</a></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
