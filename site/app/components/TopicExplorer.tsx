"use client";

import { useEffect, useMemo, useState } from "react";

type TopicDocument = {
  slug: string;
  title: string;
  section: string;
  description: string;
  contentType: string;
};

const all = "__all__";

export function TopicExplorer({ documents }: { documents: readonly TopicDocument[] }) {
  const [query, setQuery] = useState("");
  const [section, setSection] = useState(all);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const frame = window.requestAnimationFrame(() => {
      setQuery(params.get("q") ?? "");
      setSection(params.get("section") ?? all);
      setRestored(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!restored) return;
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (section !== all) params.set("section", section);
    window.history.replaceState(null, "", `${window.location.pathname}${params.size ? `?${params}` : ""}`);
  }, [query, restored, section]);

  const sections = useMemo(() => [...new Set(documents.map((document) => document.section))], [documents]);
  const filtered = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return documents.filter((document) => {
      const searchable = `${document.title} ${document.section} ${document.description}`.toLowerCase();
      return (section === all || document.section === section) && terms.every((term) => searchable.includes(term));
    });
  }, [documents, query, section]);
  const groups = useMemo(() => {
    const grouped = new Map<string, TopicDocument[]>();
    for (const document of filtered) grouped.set(document.section, [...(grouped.get(document.section) ?? []), document]);
    return [...grouped.entries()];
  }, [filtered]);

  function reset() {
    setQuery("");
    setSection(all);
  }

  return (
    <div className="topic-explorer reference-explorer">
      <div className="reference-search-panel">
        <label className="topic-query"><span>Search the guide</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try: memory, prompt injection, evidence, retry, or multi-repository" /></label>
        <label><span>Area</span><select value={section} onChange={(event) => setSection(event.target.value)}><option value={all}>All guide areas</option>{sections.map((value) => <option key={value}>{value}</option>)}</select></label>
      </div>
      <div className="topic-results-summary" aria-live="polite"><p><strong>{filtered.length}</strong> of {documents.length} chapters</p>{(query || section !== all) && <button className="clear-all" type="button" onClick={reset}>Show everything</button>}</div>
      <div className="section-index">
        {groups.map(([label, sectionDocuments], sectionIndex) => <section className="section-group" key={label}><header><span>{String(sectionIndex + 1).padStart(2, "0")}</span><h2>{label}</h2><small>{sectionDocuments.length} {sectionDocuments.length === 1 ? "chapter" : "chapters"}</small></header><div className="section-documents">{sectionDocuments.map((document) => <a href={`/docs/${document.slug}`} key={document.slug}><div><div className="document-card-meta"><span>{document.contentType === "interview" ? "reference" : document.contentType}</span></div><h3>{document.title}</h3><p>{document.description}</p></div><span aria-hidden="true">→</span></a>)}</div></section>)}
        {groups.length === 0 && <div className="empty-state"><h2>No chapter matches that search.</h2><p>Try a broader term or return to the complete guide.</p><button className="button button-secondary" type="button" onClick={reset}>Show everything</button></div>}
      </div>
    </div>
  );
}
