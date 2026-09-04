"use client";

import { useState } from "react";
import { guideContentPath } from "../../lib/paths";

type NavSection = { key: string; label: string; documents: { slug: string; title: string }[] };

export function DocumentNav({ currentSlug, sections }: { currentSlug: string; sections: NavSection[] }) {
  const [collapsed, setCollapsed] = useState(false);
  const content = <div className="document-nav-groups">{sections.map((section) => <section key={section.key}><h2>{section.label}</h2><ul>{section.documents.map((document) => <li key={document.slug}><a aria-current={document.slug === currentSlug ? "page" : undefined} href={guideContentPath(document.slug)}>{document.title}</a></li>)}</ul></section>)}</div>;
  return <><aside className={`document-sidebar ${collapsed ? "is-collapsed" : ""}`} aria-label="Guide navigation"><div className="document-sidebar-heading"><span>Guide contents</span><button onClick={() => setCollapsed((value) => !value)} type="button" aria-label={collapsed ? "Expand guide navigation" : "Collapse guide navigation"}>{collapsed ? "→" : "←"}</button></div>{!collapsed && content}</aside><details className="document-nav-mobile"><summary>Browse the complete guide</summary>{content}</details></>;
}
