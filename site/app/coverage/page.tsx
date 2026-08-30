import type { Metadata } from "next";
import Link from "next/link";
import { documents } from "../../lib/content";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { StatusBadge } from "../components/StatusBadge";

export const metadata: Metadata = {
  title: "Coverage & Maturity · AI Software Factory Mastery",
  description: "See what the autonomous software factory curriculum covers, how mature each document is, and what remains unproven.",
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
  ["Agent Factory", "Capability identity, registries, packaging, dependency resolution, certification, promotion, and revocation.", "Review-ready architecture; unified production registry remains unproven."],
  ["Repository intelligence", "Onboarding, owner validation, instructions, architecture, dependencies, build, tests, data, and readiness.", "Review-ready architecture; end-to-end onboarding evidence remains unproven."],
  ["Autonomous workflows", "Feature, defect, test, dependency, security, incident, production, modernization, and knowledge work.", "Catalog and contracts are review ready; only the first bounded workflow has partial evidence."],
  ["Verification & delivery", "Testing, artifacts, CI/CD, migrations, compatibility, progressive release, rollback, and production outcomes.", "Architecture is review ready; the complete production path remains unproven."],
  ["Factory platform", "Portal, catalog, golden paths, scheduling, cost, fairness, resilience, disaster recovery, and operator experience.", "Architecture is review ready; fleet-scale and recovery proof remains unproven."],
  ["Security & governance", "Agentic threats, policy, identity, secrets, privacy, provenance, licensing, and compliance.", "Core controls and review-ready additions exist; full adversarial evidence remains unproven."],
  ["Evaluation & learning", "Datasets, graders, uncertainty, experiments, optimization, regression control, and human promotion.", "Architecture is review ready; production optimization and rollback remain unproven."],
  ["Hands-on mastery", "Executable labs for certification, onboarding, attack containment, release recovery, incidents, learning, and disaster recovery.", "Specifications are review ready; accepted execution evidence is still limited."],
];

export default function CoveragePage() {
  const statusCounts = [...documents.reduce((counts, document) => {
    counts.set(document.status, (counts.get(document.status) ?? 0) + 1);
    return counts;
  }, new Map<string, number>()).entries()].sort((a, b) => b[1] - a[1]);

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
            <Link className="button button-primary" href="/docs/00-overview/09-reviewer-guide">Review the curriculum</Link>
          </div>
        </header>

        <section className="coverage-summary" aria-labelledby="coverage-summary-title">
          <div>
            <span className="section-kicker">Published corpus</span>
            <h2 id="coverage-summary-title">{documents.length} documents, honestly labeled.</h2>
            <p>A review-ready chapter is ready for external scrutiny. It does not imply that the described implementation is operationally proven.</p>
          </div>
          <div className="status-counts">
            {statusCounts.map(([status, count]) => <div key={status}><StatusBadge status={status} /><strong>{count}</strong></div>)}
          </div>
        </section>

        <section className="coverage-areas" aria-labelledby="coverage-areas-title">
          <div className="section-heading"><div><span className="section-kicker">Capability map</span><h2 id="coverage-areas-title">What is covered. What is not proven.</h2></div></div>
          <div className="coverage-area-grid">
            {areas.map(([title, coverage, boundary], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{coverage}</p>
                <small>{boundary}</small>
              </article>
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
          <p>Use the reviewer guide for focused architecture, builder, operations, security, or curriculum feedback.</p>
          <div><Link className="button button-primary" href="/docs/00-overview/09-reviewer-guide">Open reviewer guide</Link><Link className="button button-secondary" href="/docs/00-overview/10-changelog">See the changelog</Link></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
