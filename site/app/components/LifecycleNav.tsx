"use client";

import Link from "next/link";
import { lifecycleStages } from "../../lib/curriculum";

export function LifecycleNav() {
  return (
    <nav className="lifecycle-nav" aria-label="Software factory lifecycle">
      <span className="lifecycle-nav-label">Lifecycle</span>
      <ol>
        {lifecycleStages.map((stage, index) => (
          <li key={stage.id}>
            <Link
              href={`/topics?lifecycle=${stage.id}`}
              title={`${stage.canonical}: ${stage.detail}`}
            >
              <small>{String(index + 1).padStart(2, "0")}</small>
              <span>{stage.label}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
