"use client";

import Link from "next/link";
import { useProgress } from "./ProgressProvider";

export function ContinueLearning({ compact = false }: { compact?: boolean }) {
  const { lastVisited, readPositions, ready } = useProgress();
  if (!ready || !lastVisited) return null;
  const position = readPositions[lastVisited.slug] ?? 0;

  return (
    <Link className={compact ? "continue-learning compact" : "continue-learning"} href={lastVisited.href}>
      <span>
        <small>Continue learning</small>
        <strong>{lastVisited.title}</strong>
      </span>
      {!compact && <span className="continue-progress" aria-label={`${position}% read`}><i style={{ width: `${position}%` }} /></span>}
      <b aria-hidden="true">→</b>
    </Link>
  );
}
