import Link from "next/link";
import { chapters, chaptersForPart, getChapter } from "../lib/content";
import { guideParts } from "../lib/guide";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { Pipeline } from "./components/Pipeline";

const definitions = [
  ["Capability supply", "Agent Factory", "Creates, versions, evaluates, publishes, and governs reusable agents, skills, tools, model profiles, and configurations.", 10],
  ["Delivery system", "AI Software Factory", "Composes people, policy, capabilities, execution, verification, delivery, and feedback from intent through validated production value.", 2],
  ["Living implementation", "Mission Control", "The living control-plane implementation and case study for governing execution, evidence, and human authority.", 34],
] as const;

const updated = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" });

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
            <span>2026 edition, updated {updated}</span><i aria-hidden="true">·</i>
            <span>Eight stages, {numbered.length} chapters, seven appendices</span><i aria-hidden="true">·</i>
            <a href="https://github.com/jaydubya818/ai-software-factory-mastery" rel="noreferrer" target="_blank">Open source on GitHub (MIT)</a>
          </p>
        </section>

        <section className="home-pipeline" aria-labelledby="pipeline-title">
          <header>
            <div>
              <span className="section-kicker">The factory in one line</span>
              <h2 id="pipeline-title">From governed intent to confirmed outcome.</h2>
            </div>
            <p>Eight stages, each with an explicit contract, durable records, and evidence returned to a named authority. Click a stage for the technical deep dive.</p>
          </header>
          <Pipeline />
        </section>


        <section className="definition-band" aria-label="Three definitions">
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
              const numeral = ["I", "II", "III", "IV", "V", "VI"][part.number - 1] ?? String(part.number);
              return (
                <li key={part.id}>
                  <Link href={first ? `/docs/${first.slug}` : `/guide#${part.id}`}>
                    <span className="part-node" aria-hidden="true">{numeral}</span>
                    <strong>{part.verb}</strong>
                    <em>{part.question}</em>
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

      </main>
      <SiteFooter />
    </>
  );
}
