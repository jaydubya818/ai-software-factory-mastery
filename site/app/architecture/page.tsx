import type { Metadata } from "next";
import Link from "next/link";
import { ArchitectureExplorer } from "../components/ArchitectureExplorer";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Architecture · AI Software Factory Mastery",
  description: "Explore the autonomous software factory across lifecycle, planes, components, governance, inventory, patterns, monitoring, data flow, and evidence.",
};

const trace = ["Intent", "Plan", "Select", "Execute", "Verify", "Decide", "Deliver", "Observe", "Learn"];

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
              Nine synchronized views connect responsibility, authority, runtime,
              risk, failure, recovery, and proof without turning the model into the system.
            </p>
            <div>
              <Link className="button button-primary" href="/docs/05-runtime-architecture/06-ai-software-factory-reference-architecture">Read the reference architecture</Link>
              <Link className="button button-secondary" href="/docs/00-overview/11-detailed-architecture-coverage-matrix">Open the coverage matrix</Link>
            </div>
          </div>
        </header>

        <section className="architecture-trace" aria-label="Intent-to-learning lifecycle text view">
          <span>Governed trace</span>
          <ol>
            {trace.map((stage, index) => (
              <li key={stage}><small>{String(index + 1).padStart(2, "0")}</small>{stage}</li>
            ))}
          </ol>
        </section>

        <ArchitectureExplorer />

        <section className="architecture-reading-guide" aria-labelledby="architecture-reading-title">
          <div>
            <span className="section-kicker">How to use the map</span>
            <h2 id="architecture-reading-title">Start broad. End at the contract.</h2>
          </div>
          <ol>
            <li><span>01</span><div><strong>Choose a view</strong><p>Use lifecycle for sequence, planes for ownership, components for runtime, or monitoring for failure response.</p></div></li>
            <li><span>02</span><div><strong>Apply a lens</strong><p>Focus on authority, runtime, assurance, or operations without losing the complete system context.</p></div></li>
            <li><span>03</span><div><strong>Inspect the card</strong><p>Every item names responsibility, owner, contract, risk, and required proof in text.</p></div></li>
            <li><span>04</span><div><strong>Open the source</strong><p>The linked Markdown chapter is canonical and carries failure, recovery, versioning, exercises, and evidence boundaries.</p></div></li>
          </ol>
        </section>

        <section className="architecture-proof-callout">
          <div>
            <span className="section-kicker">Architecture is not proof</span>
            <h2>Review the design. Exercise the controls. Keep the claim scoped.</h2>
          </div>
          <p>The map is review ready. It does not assert that every component, control, SLO, or recovery path is operationally proven.</p>
          <Link className="button button-primary" href="/coverage">Inspect coverage and maturity</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
