"use client";

import type { ReactNode } from "react";
import { useProgress } from "./ProgressProvider";

export function ChapterActivityCard({ children, slug, description, kind, meta = [], validationAnchor }: { children?: ReactNode; slug: string; description: string; kind: "lab" | "whiteboard" | "interview"; meta?: string[]; validationAnchor?: string }) {
  const id = `${kind}:${slug}`; const { completedActivities, setActivityCompleted } = useProgress(); const complete = completedActivities.includes(id);
  const labels = { lab: ["Hands-on lab", "Execute the existing Markdown instructions and retain the required output and evidence."], whiteboard: ["Whiteboard exercise", "Reconstruct the architecture, name each boundary, and defend the tradeoffs."], interview: ["Interview practice", "Answer from the chapter’s established principles, architecture, failures, and evidence."] } as const;
  return <section className={`chapter-activity-card activity-${kind}`}><div><div className="activity-summary"><span>{labels[kind][0]}</span><h2>{description}</h2><p>{labels[kind][1]}</p>{meta.length > 0 && <div className="activity-meta">{meta.map((item) => <span key={item}>{item}</span>)}</div>}{validationAnchor && <a href={`#${validationAnchor}`}>Jump to validation criteria <span aria-hidden="true">↓</span></a>}</div>{children && <details className="activity-source"><summary>{kind === "interview" ? "Review source questions" : "Open the source exercise"}</summary><div>{children}</div></details>}</div><button className={complete ? "is-complete" : undefined} onClick={() => setActivityCompleted(id, !complete)} type="button">{complete ? "✓ Completed on this device" : `Mark ${kind} complete`}</button></section>;
}
