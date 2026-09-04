import type { Metadata } from "next";
import Link from "next/link";
import { appendixGroups, chapters, chaptersForPart, getChapter, stages } from "../../lib/content";
import { guideParts } from "../../lib/guide";
import { guidePageMetadata } from "../../lib/metadata";
import { fdlcUrl, GUIDE_ROUTES, guideContentPath } from "../../lib/paths";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = guidePageMetadata({
  title: "Table of Contents · The AI Software Factory Guide",
  description: "The full table of contents: front matter, six parts, forty-four chapters, and the appendices.",
  canonical: GUIDE_ROUTES.home,
});

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
            <p><strong>The practical guide to the Factory Development Lifecycle.</strong> Six parts, forty-four chapters, and a reference shelf. Read it front to back, or enter at the part that matches your question.</p>
            <div className="hero-actions">
              {firstChapter && <Link className="button button-primary" href={guideContentPath(firstChapter.slug)}>Start with chapter 1</Link>}
              <Link className="button button-secondary" href={guideContentPath("00-front-matter/00-how-to-read-this-guide")}>How to read this guide</Link>
            </div>
          </div>
        </header>

        <section className="home-entry" aria-label="Where to start">
          <div className="home-entry-paths">
            <Link href={guideContentPath("01-understand/02-the-factory-in-one-view")} className="home-entry-card">
              <span>10 minutes</span>
              <strong>Understand the model</strong>
              <em>The whole factory on one page: the value stream, six-domain architecture, and the boundary between agents, evidence, and human authority.</em>
            </Link>
            <Link href={GUIDE_ROUTES.search} className="home-entry-card">
              <span>Right now</span>
              <strong>Find guidance for a problem</strong>
              <em>Search every section and land on the relevant paragraph, not merely the page.</em>
            </Link>
            <a href={fdlcUrl("/framework")} className="home-entry-card">
              <span>FDLC context</span>
              <strong>See the complete framework</strong>
              <em>Understand how this software value stream fits inside the Factory Development Lifecycle.</em>
            </a>
          </div>
          <div className="home-entry-outcomes">
            <span>Start by outcome</span>
            <Link href={guideContentPath("appendix/architecture-communication")}>I have to explain or fund this <small>executive</small></Link>
            <Link href={guideContentPath("02-design/05-authoritative-records")}>I have to draw the boundaries <small>architect</small></Link>
            <Link href={guideContentPath("03-build/11-the-agent-factory")}>I have to build it <small>builder</small></Link>
            <Link href={guideContentPath("05-operate/34-the-factory-as-a-platform")}>I have to run it <small>operator</small></Link>
          </div>
        </section>

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
                  <Link href={guideContentPath(document.slug)}>
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
              <div><small>The primary reader model</small><h2>Intent → Plan → Define Agent → Execute through Harness → Apply Skills → Evaluate → Improve → Deliver Software</h2><p>Eight concise stage briefs: click any stage for its contract, decision owner, required evidence, common failure, and canonical chapter links.</p></div>
              <strong>{stages.length} stages</strong>
            </header>
            <ol className="toc-list">
              {stages.map((document) => (
                <li key={document.slug}>
                  <Link href={guideContentPath(document.slug)}>
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
                      <Link href={guideContentPath(document.slug)}>
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
              <Link href={GUIDE_ROUTES.topics}>Open the reference shelf →</Link>
            </header>
            <div className="toc-appendix-groups">
              {appendixGroups.map((group) => (
                <section key={group.label}>
                  <h3>{group.label}</h3>
                  <ul>{group.documents.map((document) => <li key={document.slug}><Link href={guideContentPath(document.slug)}>{document.title}</Link></li>)}</ul>
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
