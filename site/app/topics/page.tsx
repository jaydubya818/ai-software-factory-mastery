import type { Metadata } from "next";
import Link from "next/link";
import { appendixGroups, appendices } from "../../lib/content";
import { ReferenceSearch } from "../components/ReferenceSearch";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Reference · The AI Software Factory Guide",
  description: "The reference shelf: glossary, Mission Control case studies, research canon, coverage and maturity, changelog, reviewer guide, and architecture communication.",
};

const featured = [
  ["appendix/glossary", "A. Canonical glossary", "Every term defined by the responsibility it owns."],
  ["appendix/mission-control/01-implementation-maturity-and-evidence-map", "B. Mission Control case studies", "What is implemented, partial, or future, with pinned commits."],
  ["appendix/research/initial-canon", "C. Research canon", "The source canon and transcripts behind the guide."],
  ["appendix/coverage-and-maturity", "D. Coverage and maturity", "What the guide covers and how strong the evidence is."],
  ["appendix/architecture-communication", "E. Architecture communication", "Explaining and defending the architecture to different audiences."],
] as const;

export default function ReferencePage() {
  return (
    <>
      <SiteHeader />
      <main className="interior-page topics-page">
        <header className="page-intro split-intro">
          <div>
            <span className="eyebrow">Reference</span>
            <h1>The reference shelf.</h1>
          </div>
          <div>
            <p>Appendices are reference, not sequence: the glossary, Mission Control case studies, research canon, coverage and maturity, changelog, reviewer guide, and architecture communication.</p>
            <div className="topic-intro-actions">
              <Link className="button button-primary" href="/search">Search the whole guide</Link>
              <Link className="button button-secondary" href="/guide">Table of contents</Link>
            </div>
          </div>
        </header>

        <ReferenceSearch />

        <section className="reference-featured" aria-label="Appendices">
          <div className="topic-grid">
            {featured.map(([slug, title, description], index) => <Link className="topic-card" href={`/docs/${slug}`} key={slug}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></Link>)}
          </div>
        </section>

        <div className="section-index">
          {appendixGroups.map((group, index) => (
            <section className="section-group" id={group.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")} key={group.label}>
              <header><span>{String(index + 1).padStart(2, "0")}</span><h2>{group.label}</h2><small>{group.documents.length} {group.documents.length === 1 ? "document" : "documents"}</small></header>
              <div className="section-documents">
                {group.documents.map((document) => <Link href={`/docs/${document.slug}`} key={document.slug}><div><div className="document-card-meta"><span>{document.contentType}</span></div><h3>{document.title}</h3><p>{document.description}</p></div><span aria-hidden="true">→</span></Link>)}
              </div>
            </section>
          ))}
        </div>
        <p className="reference-count">{appendices.length} reference documents.</p>
      </main>
      <SiteFooter />
    </>
  );
}
