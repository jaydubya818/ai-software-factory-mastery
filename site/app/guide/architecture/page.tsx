import type { Metadata } from "next";
import Link from "next/link";
import { guidePageMetadata } from "../../../lib/metadata";
import { GUIDE_ROUTES, guideDocumentPath } from "../../../lib/paths";
import { ArchitectureExplorer } from "../../components/ArchitectureExplorer";
import { ConceptComparisons } from "../../components/ConceptComparisons";
import { FactoryRunExplorer } from "../../components/FactoryRunExplorer";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

export const metadata: Metadata = guidePageMetadata({
  title: "Architecture · The AI Software Factory Guide",
  description: "Explore implementation views of the guide's eight-stage value stream and six-area architecture across responsibility, authority, runtime, risk, failure, recovery, and evidence.",
  canonical: GUIDE_ROUTES.architecture,
});

const trace = ["Intent", "Plan", "Define Agent", "Execute through Harness", "Apply Skills", "Evaluate", "Improve", "Deliver Software"];

export default function ArchitecturePage() {
  return (
    <>
      <SiteHeader />
      <main className="interior-page architecture-page">
        <header className="architecture-hero">
          <div>
            <span className="eyebrow">The complete governed system</span>
            <h1>Trace the factory from intent to evidence.</h1>
          </div>
          <div className="architecture-hero-copy">
            <p>
              Supporting implementation views connect the six architectural areas
              across authority, runtime, risk, failure, recovery, and proof. They
              remain lenses on the canonical eight-stage value stream, not competing models.
            </p>
            <div>
              <Link className="button button-primary" href={guideDocumentPath("01-understand/02-the-factory-in-one-view")}>Read the value-stream orientation</Link>
              <Link className="button button-secondary" href={guideDocumentPath("appendix/coverage-and-maturity")}>Open the coverage matrix</Link>
            </div>
          </div>
        </header>

        <section className="architecture-trace" aria-label="Eight-stage value stream text view">
          <span>Primary value stream</span>
          <ol>
            {trace.map((stage, index) => (
              <li key={stage}><small>{String(index + 1).padStart(2, "0")}</small>{stage}</li>
            ))}
          </ol>
        </section>

        <ArchitectureExplorer />

        <FactoryRunExplorer />

        <ConceptComparisons />

        <section className="architecture-reading-guide" aria-labelledby="architecture-reading-title">
          <div>
            <span className="section-kicker">How to use the map</span>
            <h2 id="architecture-reading-title">Start broad. End at the contract.</h2>
          </div>
          <ol>
            <li><span>01</span><div><strong>Choose a view</strong><p>Use the primary value stream for sequence, planes for ownership, components for runtime, or monitoring for failure response.</p></div></li>
            <li><span>02</span><div><strong>Apply a lens</strong><p>Focus on authority, runtime, assurance, or operations without losing the complete system context.</p></div></li>
            <li><span>03</span><div><strong>Inspect the card</strong><p>Every item names responsibility, owner, contract, risk, and required proof in text.</p></div></li>
            <li><span>04</span><div><strong>Walk the run</strong><p>Use the deterministic scenario to see which record, owner, evidence, and stop condition governs every transition.</p></div></li>
            <li><span>05</span><div><strong>Compare the boundary</strong><p>Use the contrast guide to separate adjacent concepts before opening their authoritative chapters.</p></div></li>
            <li><span>06</span><div><strong>Open the source</strong><p>The linked Markdown chapter is canonical and carries failure, recovery, versioning, exercises, and evidence boundaries.</p></div></li>
          </ol>
        </section>

        <section className="architecture-proof-callout">
          <div>
            <span className="section-kicker">Architecture is not proof</span>
            <h2>Review the design. Exercise the controls. Keep the claim scoped.</h2>
          </div>
          <p>The map is review ready. It does not assert that every component, control, SLO, or recovery path is operationally proven.</p>
          <Link className="button button-primary" href={GUIDE_ROUTES.coverage}>Inspect coverage and maturity</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
