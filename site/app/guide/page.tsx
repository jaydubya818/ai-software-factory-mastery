import type { Metadata } from "next";
import Link from "next/link";
import { appendixGroups, chapters, chaptersForPart, getChapter, stages } from "../../lib/content";
import { guideParts } from "../../lib/guide";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Table of Contents · The AI Software Factory Guide",
  description: "The full table of contents: front matter, six parts, thirty-six chapters, and the appendices.",
};

export default function GuidePage() {
  const frontMatter = chapters.filter((chapter) => chapter.sectionKey === "00-front-matter");
  const firstChapter = getChapter(1);

  return (
    <>
      <SiteHeader />
      <main className="interior-page field-guide-page">
        <header className="field-guide-hero">
          <div>
            <span className="eyebrow">Table of contents</span>
            <h1>The AI Software Factory Guide</h1>
          </div>
          <div>
            <p>Six parts, thirty-six chapters, and a reference shelf. Read it front to back, or enter at the part that matches your question.</p>
            <div className="hero-actions">
              {firstChapter && <Link className="button button-primary" href={`/docs/${firstChapter.slug}`}>Start with chapter 1</Link>}
              <Link className="button button-secondary" href="/docs/00-front-matter/00-how-to-read-this-guide">How to read this guide</Link>
            </div>
          </div>
        </header>

        <section className="guide-orientation" aria-labelledby="guide-orientation-title">
          <div><span className="section-kicker">The journey</span><h2 id="guide-orientation-title">Understand → Design → Build → Prove → Operate → Improve</h2><p>Each part answers one question. The chapters inside it answer that question in order.</p></div>
          <ol>
            {guideParts.map((part) => <li key={part.id}><a href={`#${part.id}`}><span>{part.number}</span><strong>{part.verb}</strong><small>{part.question}</small></a></li>)}
          </ol>
        </section>

        <div className="guide-parts">
          <section className="guide-part toc-part" id="front-matter">
            <header>
              <span>—</span>
              <div><small>Front matter</small><h2>Before you start</h2></div>
            </header>
            <ol className="toc-list">
              {frontMatter.map((document) => (
                <li key={document.slug}>
                  <Link href={`/docs/${document.slug}`}>
                    <span>0</span>
                    <div><strong>{document.title}</strong><small>{document.summary}</small></div>
                    <b aria-hidden="true">→</b>
                  </Link>
                </li>
              ))}
            </ol>
          </section>

          <section className="guide-part toc-part" id="stages">
            <header>
              <span>→</span>
              <div><small>The factory in one line</small><h2>Intent → Plan → Define Agent → Execute through Harness → Apply Skills → Evaluate → Improve → Deliver Software</h2><p>Eight stage pages: click any stage for the technical deep dive on how it works, what it produces, and who decides.</p></div>
              <strong>{stages.length} stages</strong>
            </header>
            <ol className="toc-list">
              {stages.map((document) => (
                <li key={document.slug}>
                  <Link href={`/docs/${document.slug}`}>
                    <span>S{document.stage}</span>
                    <div><strong>{document.title}</strong><small>{document.summary}</small></div>
                    <b aria-hidden="true">→</b>
                  </Link>
                </li>
              ))}
            </ol>
          </section>

          {guideParts.map((part) => {
            const partChapters = chaptersForPart(part.id);
            return (
              <section className="guide-part toc-part" id={part.id} key={part.id}>
                <header>
                  <span>{part.number}</span>
                  <div><small>Part {part.number} — {part.verb}</small><h2>{part.question}</h2><p>{part.summary}</p></div>
                  <strong>{partChapters.length} chapters</strong>
                </header>
                <ol className="toc-list">
                  {partChapters.map((document) => (
                    <li key={document.slug}>
                      <Link href={`/docs/${document.slug}`}>
                        <span>{document.chapter}</span>
                        <div><strong>{document.title}</strong><small>{document.summary}</small></div>
                        <b aria-hidden="true">→</b>
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}

          <section className="guide-part toc-part" id="appendices">
            <header>
              <span>A–F</span>
              <div><small>Appendices</small><h2>Reference, not sequence</h2><p>Glossary, Mission Control case studies, research canon, coverage and maturity, changelog, reviewer guide, and architecture communication.</p></div>
              <Link href="/topics">Open the reference shelf →</Link>
            </header>
            <div className="toc-appendix-groups">
              {appendixGroups.map((group) => (
                <section key={group.label}>
                  <h3>{group.label}</h3>
                  <ul>{group.documents.map((document) => <li key={document.slug}><Link href={`/docs/${document.slug}`}>{document.title}</Link></li>)}</ul>
                </section>
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
