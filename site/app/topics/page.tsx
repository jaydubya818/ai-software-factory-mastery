import type { Metadata } from "next";
import Link from "next/link";
import { appendices } from "../../lib/content";
import { ReferenceSearch } from "../components/ReferenceSearch";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Reference · The AI Software Factory Guide",
  description: "The reference shelf: glossary, Mission Control case studies, research canon, coverage and maturity, changelog, reviewer guide, and architecture communication.",
};

type ShelfChild = { slug: string; title: string; note: string };
type ShelfRow = { letter: string; slug: string; title: string; description: string; use: string; children?: ShelfChild[] };

const shelf: ShelfRow[] = [
  { letter: "A", slug: "appendix/glossary", title: "Canonical glossary", description: "Every term the book uses, defined by the responsibility it owns and by what it does not prove or authorize.", use: "When a chapter uses a word you want pinned down." },
  {
    letter: "B", slug: "appendix/mission-control/01-implementation-maturity-and-evidence-map", title: "Mission Control case studies", description: "Three versioned assessments of the reference control plane — what is implemented, partial, or future, pinned to exact commits.", use: "When you want to see the ideas as running code, gaps included.",
    children: [
      { slug: "appendix/mission-control/01-implementation-maturity-and-evidence-map", title: "Implementation maturity and evidence map", note: "Four evidence states, kept apart" },
      { slug: "appendix/mission-control/02-verification-first-software-factory", title: "Verification-first software factory", note: "Quality contracts, receipts, certificates in practice" },
      { slug: "appendix/mission-control/03-capability-workflow-and-admission-map", title: "Capability, workflow, and admission map", note: "What agents may do, and how a run is admitted" },
    ],
  },
  { letter: "C", slug: "appendix/research/initial-canon", title: "Research canon", description: "The primary sources, papers, protocols, and transcripts the book draws on, with what each one is for.", use: "When you want the source behind a claim." },
  { letter: "D", slug: "appendix/coverage-and-maturity", title: "Coverage and maturity", description: "What the guide covers, how strong the evidence is for each area, and what remains unproven.", use: "When deciding how much to trust a chapter's claims.",
    children: [
      { slug: "appendix/changelog", title: "Changelog", note: "Material changes to scope, terms, and maturity" },
      { slug: "appendix/reviewer-guide", title: "Reviewer guide", note: "How to review the book and what a useful finding looks like" },
    ],
  },
  { letter: "E", slug: "appendix/architecture-communication", title: "Software architecture and system design", description: "How to scope, estimate, design, operate, explain, and defend a production architecture — from core distributed systems through governed agent execution.", use: "Before you have to design or defend a system." },
  { letter: "F", slug: "appendix/principles", title: "Principles to have cold", description: "The book's one-line principles, grouped by concern, each with a plain-English gloss and the chapter that earns it.", use: "When you want the whole book in fifty lines." },
];

export default function ReferencePage() {
  return (
    <>
      <SiteHeader />
      <main className="interior-page topics-page">
        <header className="page-intro shelf-intro">
          <span className="eyebrow">Reference</span>
          <h1>The reference shelf.</h1>
          <p>Six appendices you reach for while reading, not a sequence to read through. The glossary pins the words; the case studies show the ideas running; the rest tell you how far to trust what you just read.</p>
        </header>

        <ReferenceSearch />

        <ol className="shelf">
          {shelf.map((row) => (
            <li className="shelf-row" key={row.letter} id={row.slug.split("/")[1]}>
              <span className="shelf-letter" aria-hidden="true">{row.letter}</span>
              <div className="shelf-body">
                <Link className="shelf-title" href={`/docs/${row.slug}`}><h2>{row.title}</h2><span aria-hidden="true">→</span></Link>
                <p>{row.description}</p>
                {row.children && (
                  <ul className="shelf-children">
                    {row.children.map((child) => <li key={child.slug}><Link href={`/docs/${child.slug}`}><strong>{child.title}</strong><span>{child.note}</span></Link></li>)}
                  </ul>
                )}
              </div>
              <div className="shelf-use"><small>Reach for it</small><span>{row.use}</span></div>
            </li>
          ))}
        </ol>
        <p className="reference-count">{appendices.length} reference documents. Chapters live in the <Link href="/guide">table of contents</Link>.</p>
      </main>
      <SiteFooter />
    </>
  );
}
