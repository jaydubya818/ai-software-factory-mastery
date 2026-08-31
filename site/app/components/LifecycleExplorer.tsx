"use client";

import Link from "next/link";
import { useState } from "react";
import { lifecycleStages } from "../../lib/curriculum";

type StageContent = { id: string; chapters: { title: string; href: string; meta: string }[] };

export function LifecycleExplorer({ content }: { content: StageContent[] }) {
  const [activeId, setActiveId] = useState<string>(lifecycleStages[0].id);
  const stage = lifecycleStages.find((candidate) => candidate.id === activeId) ?? lifecycleStages[0];
  const stageContent = content.find((candidate) => candidate.id === stage.id);

  return (
    <section className="lifecycle-explorer" aria-labelledby="lifecycle-explorer-title">
      <header className="section-heading">
        <div><span className="section-kicker">The governed value stream</span><h2 id="lifecycle-explorer-title">How work moves through the factory.</h2></div>
        <p>The six-stage rail is a navigation abstraction. Canonical chapter terminology remains intact.</p>
      </header>
      <div className="lifecycle-stage-tabs" role="tablist" aria-label="Lifecycle stages">
        {lifecycleStages.map((candidate, index) => (
          <button
            aria-selected={candidate.id === stage.id}
            className={candidate.id === stage.id ? "is-active" : undefined}
            key={candidate.id}
            onClick={() => setActiveId(candidate.id)}
            role="tab"
            type="button"
          ><small>{String(index + 1).padStart(2, "0")}</small><strong>{candidate.label}</strong></button>
        ))}
      </div>
      <div className="lifecycle-stage-panel" role="tabpanel">
        <div className="lifecycle-stage-copy">
          <span>Canonical mapping</span><code>{stage.canonical}</code>
          <h3>{stage.label}</h3><p>{stage.detail}</p>
          <div className="concept-chips">{stage.concepts.map((concept) => <span key={concept}>{concept}</span>)}</div>
          <Link href={`/topics?lifecycle=${stage.id}`}>Explore all {stage.label.toLowerCase()} material <span aria-hidden="true">→</span></Link>
        </div>
        <div className="lifecycle-stage-reading">
          <span>Start with these chapters</span>
          {stageContent?.chapters.map((chapter, index) => (
            <Link href={chapter.href} key={chapter.href}><small>{String(index + 1).padStart(2, "0")}</small><span><strong>{chapter.title}</strong><em>{chapter.meta}</em></span><b aria-hidden="true">↗</b></Link>
          ))}
        </div>
      </div>
    </section>
  );
}
