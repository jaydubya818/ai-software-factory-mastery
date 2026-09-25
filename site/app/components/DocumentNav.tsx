"use client";

import { useState } from "react";
import { GUIDE_ROUTES, guideContentPath, guideNavigationHref } from "../../lib/paths";

type NavSection = { key: string; label: string; documents: { slug: string; title: string }[] };

export function DocumentNav({ currentSlug, sections }: { currentSlug: string; sections: NavSection[] }) {
  const [collapsed, setCollapsed] = useState(false);
  const content = <div className="document-nav-groups">
    <a href={guideNavigationHref(GUIDE_ROUTES.home)}>All chapters →</a>
    {sections.map((section) => <details key={section.key} open={section.documents.some((document) => document.slug === currentSlug)}>
      <summary>{section.label}</summary>
      <ul>{section.documents.map((document) => <li key={document.slug}><a aria-current={document.slug === currentSlug ? "page" : undefined} href={guideNavigationHref(guideContentPath(document.slug))}>{document.title}</a></li>)}</ul>
    </details>)}
  </div>;
  return <>
    <aside className={`document-sidebar ${collapsed ? "is-collapsed" : ""}`} aria-label="Guide navigation">
      <div className="document-sidebar-heading"><span>{collapsed ? "" : "Chapters"}</span><button onClick={() => setCollapsed((value) => !value)} type="button" aria-label={collapsed ? "Expand guide navigation" : "Collapse guide navigation"} aria-expanded={!collapsed}>{collapsed ? "→" : "←"}</button></div>
      {!collapsed && content}
    </aside>
    <details className="document-nav-mobile"><summary>Chapters</summary>{content}</details>
  </>;
}
