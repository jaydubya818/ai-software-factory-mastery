"use client";

import Link from "next/link";
import { ContinueLearning } from "./ContinueLearning";
import { useProgress } from "./ProgressProvider";

type LearningChapter = { slug: string; title: string; section: string; status: string; readingMinutes: number; hasLab: boolean; hasWhiteboardExercise: boolean; hasInterviewQuestions: boolean };
type LearningPath = { id: string; number: string; title: string; goal: string; depth: string; audience: string; time: string; outcome: string; instruction: string; chapters: LearningChapter[] };

function percent(completed: number, total: number) {
  return total ? Math.round((completed / total) * 100) : 0;
}

export function LearningDashboard({ paths }: { paths: LearningPath[] }) {
  const { completedSlugs, selectedPath, selectPath } = useProgress();
  const active = paths.find((path) => path.id === selectedPath) ?? paths[0];
  const completed = active.chapters.filter((chapter) => completedSlugs.includes(chapter.slug));
  const remaining = active.chapters.filter((chapter) => !completedSlugs.includes(chapter.slug));
  const next = remaining[0];
  const labs = active.chapters.filter((chapter) => chapter.hasLab);
  const completedLabs = labs.filter((chapter) => completedSlugs.includes(chapter.slug));

  return (
    <div className="learning-dashboard">
      <section className="learning-overview" aria-labelledby="learning-overview-title">
        <div className="learning-overview-copy">
          <span className="section-kicker">Selected path</span>
          <h2 id="learning-overview-title">{active.title}</h2>
          <p>{active.outcome}</p>
          <div className="learning-progress-large"><span><strong>{percent(completed.length, active.chapters.length)}%</strong> progress</span><i><b style={{ width: `${percent(completed.length, active.chapters.length)}%` }} /></i></div>
        </div>
        <dl className="learning-stat-grid">
          <div><dt>Curriculum</dt><dd>{active.chapters.length}</dd><small>chapters</small></div>
          <div><dt>Completed</dt><dd>{completed.length}</dd><small>{remaining.length} remaining</small></div>
          <div><dt>Labs</dt><dd>{completedLabs.length}/{labs.length}</dd><small>completed</small></div>
          <div><dt>Effort</dt><dd>{active.time}</dd><small>{active.depth} depth</small></div>
        </dl>
        <div className="learning-continue-panel">
          <ContinueLearning />
          {!next && <p className="learning-complete-message">This path is complete on this device. Revisit any chapter or move to a deeper path.</p>}
          {next && <Link className="button button-primary" href={`/docs/${next.slug}`}>Continue with {next.title}</Link>}
        </div>
      </section>

      <section className="path-comparison" aria-labelledby="path-comparison-title">
        <div className="section-heading"><div><span className="section-kicker">Choose the right altitude</span><h2 id="path-comparison-title">Four paths. One canonical system.</h2></div><p>Choosing a path changes sequencing and depth, never the underlying curriculum.</p></div>
        <div className="path-comparison-grid">
          {paths.map((path) => {
            const pathCompleted = path.chapters.filter((chapter) => completedSlugs.includes(chapter.slug)).length;
            const isSelected = path.id === active.id;
            return (
              <article className={isSelected ? "is-selected" : undefined} id={path.id} key={path.id}>
                <div className="path-card-top"><span>{path.number}</span><small>{path.depth}</small></div>
                <h3>{path.title}</h3><p>{path.outcome}</p>
                <dl><div><dt>Goal</dt><dd>{path.goal}</dd></div><div><dt>For</dt><dd>{path.audience}</dd></div><div><dt>Effort</dt><dd>{path.time}</dd></div></dl>
                <div className="mini-progress"><span>{percent(pathCompleted, path.chapters.length)}%</span><i><b style={{ width: `${percent(pathCompleted, path.chapters.length)}%` }} /></i></div>
                <button type="button" onClick={() => selectPath(path.id)}>{isSelected ? "Selected path" : "Choose this path"}</button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="active-path-detail" aria-labelledby="active-path-title">
        <header><div><span className="section-kicker">{active.number} / {active.depth}</span><h2 id="active-path-title">{active.title} curriculum</h2><p>{active.instruction}</p></div><div className="path-detail-count"><strong>{completed.length}</strong><span>complete</span><strong>{remaining.length}</strong><span>remaining</span></div></header>
        <ol className="dashboard-chapter-list">
          {active.chapters.map((chapter, index) => {
            const isComplete = completedSlugs.includes(chapter.slug);
            return (
              <li className={isComplete ? "is-complete" : undefined} key={chapter.slug}>
                <Link href={`/docs/${chapter.slug}`}>
                  <span className="chapter-state" aria-label={isComplete ? "Completed" : "Not completed"}>{isComplete ? "✓" : String(index + 1).padStart(2, "0")}</span>
                  <span><strong>{chapter.title}</strong><small>{chapter.section} · {chapter.readingMinutes} min</small></span>
                  <span className="chapter-activity-tags">{chapter.hasLab && <i>Lab</i>}{chapter.hasWhiteboardExercise && <i>Whiteboard</i>}{chapter.hasInterviewQuestions && <i>Interview</i>}</span>
                  <b aria-hidden="true">→</b>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
