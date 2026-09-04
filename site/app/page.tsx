import Link from "next/link";
import { chapters, chaptersForPart, getChapter } from "../lib/content";
import { guideParts } from "../lib/guide";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { Pipeline } from "./components/Pipeline";
import { Thesis } from "./components/Thesis";

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
          <div className="eyebrow">The AI Software Factory Guide</div>
          <h1>Design, build, prove, operate, and improve the <em>software factory</em>.</h1>
          <p className="hero-copy">A field guide for engineering leaders building governed agentic delivery systems — from intent and bounded execution to evidence, recovery, and production.</p>
          <div className="hero-actions">
            {firstChapter && <Link className="button button-primary" href={`/docs/${firstChapter.slug}`}>Start with Chapter 1</Link>}
            <Link className="button button-secondary" href="/guide">Browse all {numbered.length} chapters</Link>
            <Link className="hero-tertiary" href="/docs/00-front-matter/00-how-to-read-this-guide">How to read this guide →</Link>
          </div>
          <p className="hero-credibility">
            <span>By Jay West</span><i aria-hidden="true">·</i>
            <span>2026 edition</span><i aria-hidden="true">·</i>
            <span>Eight stages, {numbered.length} chapters, seven reference groups</span><i aria-hidden="true">·</i>
            <a href="https://github.com/jaydubya818/ai-software-factory-mastery" rel="noreferrer" target="_blank">Open source on GitHub (MIT)</a>
          </p>
        </section>

        <section className="home-entry" aria-label="Where to start">
          <div className="home-entry-paths">
            <Link href="/docs/01-understand/02-the-factory-in-one-view" className="home-entry-card">
              <span>10 minutes</span>
              <strong>Understand the model</strong>
              <em>The whole factory on one page: the eight-stage value stream, six-area architecture, and the boundary between agents, evidence, and human authority.</em>
            </Link>
            <Link href="/search" className="home-entry-card">
              <span>Right now</span>
              <strong>Find guidance for a problem</strong>
              <em>Search every section — leases, proof packages, prompt injection, merge queues, cost — and land on the paragraph, not the page.</em>
            </Link>
            <Link href="/guide" className="home-entry-card">
              <span>Front to back</span>
              <strong>Browse the complete guide</strong>
              <em>Eight stages, six parts, {numbered.length} chapters, and the reference shelf, in reading order.</em>
            </Link>
          </div>
          <div className="home-entry-outcomes">
            <span>Start by outcome</span>
            <Link href="/docs/appendix/architecture-communication">I have to explain or fund this <small>executive</small></Link>
            <Link href="/docs/02-design/05-authoritative-records">I have to draw the boundaries <small>architect</small></Link>
            <Link href="/docs/03-build/11-the-agent-factory">I have to build it <small>builder</small></Link>
            <Link href="/docs/05-operate/34-the-factory-as-a-platform">I have to run it <small>operator</small></Link>
          </div>
        </section>

        <section className="home-pipeline" aria-labelledby="pipeline-title">
          <header>
            <div>
              <span className="section-kicker">The factory in one line</span>
              <h2 id="pipeline-title">From governed intent to confirmed outcome.</h2>
            </div>
            <p>The primary reader model: eight stages with explicit inputs, outputs, decisions, and evidence. Click a stage for a concise brief and links to the canonical chapters.</p>
          </header>
          <Pipeline />
        </section>


        <section className="definition-band" aria-label="Vocabulary lens: three definitions">
          {definitions.map(([kicker, title, description, chapterNumber]) => {
            const chapter = getChapter(chapterNumber);
            return <Link href={chapter ? `/docs/${chapter.slug}` : "/guide"} key={title}><span>{kicker}</span><h2>{title}</h2><p>{description}</p></Link>;
          })}
        </section>

        <section className="home-guide-map" aria-labelledby="home-guide-title">
          <header><div><span className="section-kicker">Six parts</span><h2 id="home-guide-title">One arc, from first principles to a factory that improves itself.</h2></div><p>Each part answers one question and hands its answer to the next. Read front to back, or enter at the question you have — every part opens at its first chapter.</p></header>
          <ol className="home-part-track">
            {guideParts.map((part) => {
              const partChapters = chaptersForPart(part.id);
              const first = partChapters[0];
              const last = partChapters[partChapters.length - 1];
              return (
                <li key={part.id}>
                  <Link href={first ? `/docs/${first.slug}` : `/guide#${part.id}`}>
                    <span className="part-node" aria-hidden="true">{part.number}</span>
                    <strong>{part.verb}</strong>
                    <em>{part.question}</em>
                    <small>{first && last ? `Chapters ${first.chapter}–${last.chapter}` : ""}</small>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>

        <Thesis />

      </main>
      <SiteFooter />
    </>
  );
}
