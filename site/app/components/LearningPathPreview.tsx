"use client";

import Link from "next/link";
import { useProgress } from "./ProgressProvider";

type PathPreview = { id: string; number: string; title: string; goal: string; depth: string; audience: string; time: string; outcome: string; chapterCount: number; labCount: number };

export function LearningPathPreview({ paths }: { paths: PathPreview[] }) {
  const { completedSlugs, selectedPath, selectPath } = useProgress();
  return (
    <div className="path-grid premium-path-grid">
      {paths.map((path) => (
        <article className={`path-card ${selectedPath === path.id ? "is-selected" : ""}`} id={path.id} key={path.id}>
          <div className="path-card-top"><span className="path-number">{path.number}</span><span>{path.depth}</span></div>
          <h3>{path.title}</h3><p>{path.outcome}</p>
          <dl><div><dt>For</dt><dd>{path.audience}</dd></div><div><dt>Effort</dt><dd>{path.time}</dd></div><div><dt>Curriculum</dt><dd>{path.chapterCount} chapters{path.labCount ? ` · ${path.labCount} labs` : ""}</dd></div></dl>
          <div className="path-card-actions">
            <button type="button" onClick={() => selectPath(path.id)}>{selectedPath === path.id ? "Selected" : "Choose path"}</button>
            <Link href={`/learn#${path.id}`}>Open path <span aria-hidden="true">→</span></Link>
          </div>
          {selectedPath === path.id && completedSlugs.length > 0 && <small className="path-saved-state">Progress saved on this device</small>}
        </article>
      ))}
    </div>
  );
}
