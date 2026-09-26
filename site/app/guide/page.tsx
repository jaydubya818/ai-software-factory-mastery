import type { Metadata } from "next";
import Link from "../components/GuideLink";
import { appendixGroups, chapters, chaptersForPart, stages } from "../../lib/content";
import { guideParts } from "../../lib/guide";
import { guidePageMetadata } from "../../lib/metadata";
import { GUIDE_ROUTES, guideContentPath } from "../../lib/paths";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = guidePageMetadata({
  title: "Table of Contents · The AI Software Factory Guide",
  description: "The full table of contents: front matter, six parts, forty-four chapters, and the appendices.",
  canonical: GUIDE_ROUTES.home,
});

export default function GuidePage() {
  const frontMatter = chapters.filter((chapter) => chapter.sectionKey === "00-front-matter");

  return (
    <>
      <SiteHeader />
      <main className="interior-page field-guide-page" id="main-content" tabIndex={-1}>
        <header className="field-guide-hero">
          <div>
            <span className="eyebrow">Table of contents</span>
            <h1>The AI Software Factory Guide</h1>
          </div>
          <div>
            <p><strong>New here? Start with the introduction.</strong> Already have a question? Choose a part below or search all forty-four chapters.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href={guideContentPath("00-front-matter/00-how-to-read-this-guide")}>Start reading</Link>
              <a className="button button-secondary" href="#chapters">Browse chapters</a>
              <Link className="guide-search-link" href={GUIDE_ROUTES.search}>Search all chapters →</Link>
            </div>
          </div>
        </header>

        <section id="chapters" className="guide-orientation" aria-labelledby="guide-orientation-title">
          <div><span className="section-kicker">Browse by part</span><h2 id="guide-orientation-title">Find the chapter you need.</h2><p>Six parts take you from understanding the factory to operating and improving it. Choose one to jump to its chapters.</p></div>
          <ol>
            {guideParts.map((part) => <li key={part.id}><a href={`#${part.id}`}><span>{part.number}</span><strong>{part.verb}</strong><small>{part.question}</small></a></li>)}
          </ol>
        </section>

        <details className="home-entry" aria-label="Start by outcome">
          <summary>Find a starting point for your work <span aria-hidden="true">⌄</span></summary>
          <div className="home-entry-outcomes">
            <Link href={guideContentPath("appendix/architecture-communication")}>I have to explain or fund this <small>executive</small></Link>
            <Link href={guideContentPath("02-design/05-authoritative-records")}>I have to draw the boundaries <small>architect</small></Link>
            <Link href={guideContentPath("appendix/factory-system-design-playbook")}>I have to review a workflow before launch <small>design review</small></Link>
            <Link href={guideContentPath("03-build/11-the-agent-factory")}>I have to build it <small>builder</small></Link>
            <Link href={guideContentPath("05-operate/34-the-factory-as-a-platform")}>I have to run it <small>operator</small></Link>
            <Link href={guideContentPath("appendix/production-reliability-operations-playbook")}>I have to prepare for or manage an incident <small>reliability</small></Link>
            <Link href={guideContentPath("appendix/enterprise-multi-factory-delivery")}>I have to scale delivery across factories <small>enterprise</small></Link>
          </div>
        </details>

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
