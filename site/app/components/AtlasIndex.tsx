"use client";

import { useEffect, useState } from "react";

const maps = [
  ["factory-lifecycle", "Lifecycle"],
  ["production-stack", "Disciplines"],
  ["orchestration", "Orchestration"],
  ["agent-patterns", "Patterns"],
  ["memory", "Memory"],
  ["loop-engineering", "Loops"],
  ["governance", "Governance"],
  ["observability", "Observability"],
  ["protocols", "Protocols"],
  ["attention", "Attention"],
] as const;

export function AtlasIndex() {
  const [active, setActive] = useState<string>(maps[0][0]);

  useEffect(() => {
    const sections = maps.map(([id]) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const index = Math.max(0, maps.findIndex(([id]) => id === active));

  return (
    <nav className="atlas-index" aria-label="Atlas contents">
      <div className="atlas-index-head">
        <span className="atlas-index-count">{String(index + 1).padStart(2, "0")}<small>/ {maps.length}</small></span>
      </div>
      <ol className="atlas-index-list">
        {maps.map(([id, label], i) => (
          <li key={id}>
            <a href={`#${id}`} aria-current={id === active ? "location" : undefined}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {label}
            </a>
          </li>
        ))}
      </ol>
      <div className="atlas-index-track" aria-hidden="true"><span style={{ width: `${((index + 1) / maps.length) * 100}%` }} /></div>
    </nav>
  );
}
