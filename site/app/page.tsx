import Link from "next/link";
import { chapters, chaptersForPart, getChapter } from "../lib/content";
import { guideParts } from "../lib/guide";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { ValueStream } from "./components/ValueStream";

const definitions = [
  ["Capability supply", "Agent Factory", "Creates, versions, evaluates, publishes, and governs reusable agents, skills, tools, model profiles, and configurations.", 10],
  ["Delivery system", "AI Software Factory", "Composes people, policy, capabilities, execution, verification, delivery, and feedback from intent through validated production value.", 2],
  ["Living implementation", "Mission Control", "The living control-plane implementation and case study for governing execution, evidence, and human authority.", 34],
] as const;

export default function Home() {
  const firstChapter = getChapter(1);
  const numbered = chapters.filter((chapter) => chapter.chapter !== null && chapter.chapter > 0);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero guide-home-hero">
          <div className="hero-status"><span>A book, read front to back</span><i>{numbered.length} chapters</i><i>Six parts</i><i>Appendices and labs</i></div>
          <div className="eyebrow">The AI Software Factory Guide</div>
          <h1>Design, build, prove, operate, and improve the <em>software factory</em>.</h1>
          <div className="hero-bottom">
            <p className="hero-copy">How to design, build, prove, operate, and improve an engineering system in which humans define intent and accept risk while bounded agents plan, implement, validate, and recover — and independent evidence decides what advances.</p>
            <div className="hero-actions">
              {firstChapter && <Link className="button button-primary" href={`/docs/${firstChapter.slug}`}>Start reading</Link>}
              <Link className="button button-secondary" href="/docs/00-front-matter/00-how-to-read-this-guide">How to read this guide</Link>
            </div>
          </div>
        </section>

        <section className="home-value-stream" aria-labelledby="value-stream-title">
          <header>
            <div>
              <span className="section-kicker">End-to-end value stream</span>
              <h2 id="value-stream-title">From governed intent to confirmed outcome</h2>
              <p className="factory-one-line" aria-label="The factory in one line">Intent → Plan → Define Agent → Execute through Harness → Apply Skills → Evaluate → Improve → Deliver Software</p>
            </div>
            <p>The factory is a closed operating loop. Every phase receives an explicit contract, produces durable records, and returns evidence to a named authority. Click any stage for the technical deep dive: what enters, what leaves, who decides, and how it is built.</p>
          </header>
          <ValueStream />
        </section>

        <section className="definition-band" aria-label="Three definitions">
          {definitions.map(([kicker, title, description, chapterNumber]) => {
            const chapter = getChapter(chapterNumber);
            return <Link href={chapter ? `/docs/${chapter.slug}` : "/guide"} key={title}><span>{kicker}</span><h2>{title}</h2><p>{description}</p></Link>;
          })}
        </section>

        <section className="home-guide-map" aria-labelledby="home-guide-title">
          <header><div><span className="section-kicker">Six parts</span><h2 id="home-guide-title">Understand → Design → Build → Prove → Operate → Improve</h2></div><p>Read it front to back, or enter at the part that matches your question. Each part opens at its first chapter.</p></header>
          <ol className="home-part-cards">
            {guideParts.map((part) => {
              const partChapters = chaptersForPart(part.id);
              const first = partChapters[0];
              const last = partChapters[partChapters.length - 1];
              return (
                <li key={part.id}>
                  <Link href={first ? `/docs/${first.slug}` : `/guide#${part.id}`}>
                    <span>Part {part.number}</span>
                    <strong>{part.verb}</strong>
                    <em>{part.question}</em>
                    <p>{part.summary}</p>
                    <small>{first && last ? `Chapters ${first.chapter}–${last.chapter}` : ""}</small>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="principles-section">
          <div className="principle-statement"><span className="section-kicker">The durable thesis</span><blockquote>Reliable autonomy comes from a trustworthy system around fallible agents.</blockquote></div>
          <div className="principle-list"><div><strong>Humans</strong><span>Own intent, judgment, policy, and material risk</span></div><div><strong>Agents</strong><span>Reason and execute inside bounded authority</span></div><div><strong>Software</strong><span>Owns durable state, policy, recovery, and control</span></div><div><strong>Evidence</strong><span>Proves whether exact work is ready to progress</span></div></div>
        </section>

        <section className="guide-reference-callout home-reference-callout">
          <div><span className="section-kicker">Beyond the sequence</span><h2>The table of contents, the atlas, and the reference shelf.</h2></div>
          <p>The full table of contents lists every chapter with its summary. The atlas holds the system maps. The reference shelf holds the glossary, labs, Mission Control case studies, research canon, and coverage.</p>
          <div><Link className="button button-primary" href="/guide">Table of contents</Link><Link className="button button-secondary" href="/visuals">Atlas</Link><Link className="button button-secondary" href="/topics">Reference</Link></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
