import type { Metadata } from "next";
import Link from "next/link";
import { sections } from "../../lib/content";
import { guideParts, sectionGuidance } from "../../lib/guide";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "The Complete Guide · AI Software Factory Mastery",
  description: "Read the complete guide to understanding, designing, building, proving, operating, and improving an AI software factory.",
};

export default function GuidePage() {
  return (
    <>
      <SiteHeader />
      <main className="interior-page field-guide-page">
        <header className="field-guide-hero">
          <div>
            <span className="eyebrow">The complete field guide</span>
            <h1>Design, build, and operate the system around the agent.</h1>
          </div>
          <div>
            <p>This is one connected technical guide—not a course and not a collection of filtered summaries. Read it in sequence or enter at the problem you need to solve.</p>
            <div className="hero-actions"><Link className="button button-primary" href="/docs/00-overview/01-ai-software-factory-and-mission-control">Begin with the system</Link><Link className="button button-secondary" href="/visuals">Use the visual guide</Link></div>
          </div>
        </header>

        <section className="guide-orientation" aria-labelledby="guide-orientation-title">
          <div><span className="section-kicker">How the guide is organized</span><h2 id="guide-orientation-title">Six parts. One end-to-end operating system.</h2><p>The order follows the decisions required to move from purpose to safe, repeatable production operation.</p></div>
          <ol>
            {guideParts.map((part) => <li key={part.id}><a href={`#${part.id}`}><span>{part.number}</span><strong>{part.verb}</strong><small>{part.title}</small></a></li>)}
          </ol>
        </section>

        <section className="guide-foundation" aria-labelledby="foundation-title">
          <div><span className="section-kicker">Start here</span><h2 id="foundation-title">Build the mental model before the technology stack.</h2></div>
          <div>
            <Link href="/docs/00-overview/01-ai-software-factory-and-mission-control"><span>01</span><strong>Factory, Agent Factory, and Mission Control</strong><p>Separate the complete delivery system, its reusable capability supply chain, and one control-plane implementation.</p></Link>
            <Link href="/docs/00-overview/05-software-factory-stack-boundaries"><span>02</span><strong>Software Factory Stack Boundaries</strong><p>Locate human authority, control, harnesses, environments, compute, verification, delivery, and feedback.</p></Link>
            <Link href="/docs/05-runtime-architecture/06-ai-software-factory-reference-architecture"><span>03</span><strong>Reference Architecture</strong><p>Connect lifecycle, logical components, trust boundaries, authority, evidence, failure, and recovery.</p></Link>
          </div>
        </section>

        <div className="guide-parts">
          {guideParts.map((part) => {
            const partSections = sections.filter((section) => (part.sectionKeys as readonly string[]).includes(section.key));
            const chapterCount = partSections.reduce((count, section) => count + section.documents.length, 0);
            return (
              <section className="guide-part" id={part.id} key={part.id}>
                <header>
                  <span>{part.number}</span>
                  <div><small>{part.verb}</small><h2>{part.title}</h2><p>{part.summary}</p></div>
                  <strong>{chapterCount} {chapterCount === 1 ? "chapter" : "chapters"}</strong>
                </header>
                <div className="guide-section-groups">
                  {partSections.map((section) => (
                    <section key={section.key}>
                      <header><div><span>{section.label}</span><p>{sectionGuidance[section.key]}</p></div><small>{section.documents.length}</small></header>
                      <ol>
                        {section.documents.map((document, index) => (
                          <li key={document.slug}>
                            <Link href={`/docs/${document.slug}`}>
                              <span>{String(index + 1).padStart(2, "0")}</span>
                              <div><strong>{document.title}</strong><small>{document.description}</small></div>
                              <b aria-hidden="true">→</b>
                            </Link>
                          </li>
                        ))}
                      </ol>
                    </section>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <section className="guide-reference-callout">
          <div><span className="section-kicker">Use it as a reference</span><h2>Search by the problem, term, failure, or contract.</h2></div>
          <p>You do not need to remember where a chapter lives. Use the reference index for direct browsing or search the complete source text.</p>
          <div><Link className="button button-primary" href="/topics">Open the reference index</Link><Link className="button button-secondary" href="/search">Search the guide</Link></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
