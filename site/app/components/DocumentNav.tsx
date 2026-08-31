"use client";

import { useState } from "react";
import { useProgress } from "./ProgressProvider";

type NavSection = { key: string; label: string; documents: { slug: string; title: string }[] };

export function DocumentNav({ currentSlug, sections }: { currentSlug: string; sections: NavSection[] }) {
  const [collapsed, setCollapsed] = useState(false);
  const { completedSlugs, startedSlugs } = useProgress();
  const content = <div className="document-nav-groups">{sections.map((section) => <section key={section.key}><h2>{section.label}</h2><ul>{section.documents.map((document) => {
    const state = completedSlugs.includes(document.slug) ? "complete" : startedSlugs.includes(document.slug) ? "started" : "new";
    return <li key={document.slug}><a aria-current={document.slug === currentSlug ? "page" : undefined} href={`/docs/${document.slug}`}><i className={`nav-progress nav-progress-${state}`} aria-label={state === "complete" ? "Completed" : state === "started" ? "In progress" : "Not started"} />{document.title}</a></li>;
  })}</ul></section>)}</div>;
  return <><aside className={`document-sidebar ${collapsed ? "is-collapsed" : ""}`} aria-label="Curriculum navigation"><div className="document-sidebar-heading"><span>Curriculum</span><button onClick={() => setCollapsed((value) => !value)} type="button" aria-label={collapsed ? "Expand curriculum navigation" : "Collapse curriculum navigation"}>{collapsed ? "→" : "←"}</button></div>{!collapsed && content}</aside><details className="document-nav-mobile"><summary>Browse the curriculum</summary>{content}</details></>;
}
