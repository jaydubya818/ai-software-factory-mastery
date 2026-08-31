"use client";

import { useEffect, useMemo, useState } from "react";
import { StatusBadge } from "./StatusBadge";

type TopicDocument = {
  slug: string; title: string; section: string; status: string; audience: readonly string[]; lifecycle: readonly string[];
  architectureLayers: readonly string[]; contentType: string; risk: string; description: string; readingMinutes: number; labType: string | null;
  hasLab: boolean; hasInterviewQuestions: boolean; hasWhiteboardExercise: boolean; hasImplementationEvidence: boolean;
};

const all = "all";
type FilterKey = "section" | "audience" | "lifecycle" | "architecture" | "status" | "risk" | "type";

function optionsFor(documents: readonly TopicDocument[], key: "section" | "status" | "risk" | "contentType") {
  return [...new Set(documents.map((document) => document[key]).filter(Boolean))].sort();
}

function arrayOptions(documents: readonly TopicDocument[], key: "audience" | "lifecycle" | "architectureLayers") {
  return [...new Set(documents.flatMap((document) => [...document[key]]))].sort();
}

function titleCase(value: string) {
  return value.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const systemNodes: { label: string; key: FilterKey | "query" | "reset"; value: string; level: number }[] = [
  { label: "AI Software Factory", key: "reset", value: "", level: 0 },
  { label: "Intent", key: "lifecycle", value: "intent", level: 1 },
  { label: "Control Plane", key: "architecture", value: "control plane", level: 1 },
  { label: "Governance", key: "section", value: "Security & Governance", level: 2 },
  { label: "Orchestration", key: "architecture", value: "orchestration", level: 2 },
  { label: "Authority", key: "query", value: "authority", level: 2 },
  { label: "Agent Factory", key: "section", value: "Agent Factory", level: 1 },
  { label: "Agents", key: "architecture", value: "agent runtime", level: 2 },
  { label: "Skills", key: "query", value: "skills", level: 2 },
  { label: "Tools", key: "query", value: "tools", level: 2 },
  { label: "Runtime", key: "architecture", value: "runtime", level: 1 },
  { label: "Harnesses", key: "architecture", value: "harness", level: 2 },
  { label: "Environment", key: "architecture", value: "environment", level: 2 },
  { label: "Verification", key: "architecture", value: "verification", level: 1 },
  { label: "Delivery", key: "architecture", value: "delivery", level: 1 },
  { label: "Production", key: "query", value: "production", level: 1 },
  { label: "Observability", key: "query", value: "observability", level: 1 },
  { label: "Learning", key: "lifecycle", value: "learn", level: 1 },
];

export function TopicExplorer({ documents }: { documents: readonly TopicDocument[] }) {
  const [query, setQuery] = useState(""); const [section, setSection] = useState(all); const [audience, setAudience] = useState(all);
  const [lifecycle, setLifecycle] = useState(all); const [architecture, setArchitecture] = useState(all); const [status, setStatus] = useState(all);
  const [risk, setRisk] = useState(all); const [type, setType] = useState(all); const [sort, setSort] = useState("curriculum");
  const [view, setView] = useState<"list" | "map">("list"); const [showMoreFilters, setShowMoreFilters] = useState(false); const [restored, setRestored] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const frame = window.requestAnimationFrame(() => {
      setQuery(params.get("q") ?? ""); setSection(params.get("section") ?? all); setAudience(params.get("audience") ?? all);
      setLifecycle(params.get("lifecycle") ?? all); setArchitecture(params.get("architecture") ?? all); setStatus(params.get("status") ?? all);
      setRisk(params.get("risk") ?? all); setType(params.get("type") ?? all); setView(params.get("view") === "map" ? "map" : "list"); setRestored(true);
      setShowMoreFilters(["audience", "architecture", "status", "risk", "type"].some((key) => params.has(key)));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!restored) return;
    const params = new URLSearchParams();
    const values = { q: query, section, audience, lifecycle, architecture, status, risk, type, view: view === "map" ? "map" : "" };
    Object.entries(values).forEach(([key, value]) => { if (value && value !== all) params.set(key, value); });
    window.history.replaceState(null, "", `${window.location.pathname}${params.size ? `?${params}` : ""}`);
  }, [architecture, audience, lifecycle, query, restored, risk, section, status, type, view]);

  const options = useMemo(() => ({ sections: optionsFor(documents, "section"), audiences: arrayOptions(documents, "audience"), lifecycles: arrayOptions(documents, "lifecycle"), architectures: arrayOptions(documents, "architectureLayers"), statuses: optionsFor(documents, "status"), risks: optionsFor(documents, "risk"), types: optionsFor(documents, "contentType") }), [documents]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = documents.filter((document) => {
      const activityTerms = [
        document.hasLab ? "lab hands-on" : "",
        document.hasInterviewQuestions ? "interview questions" : "",
        document.hasWhiteboardExercise ? "whiteboard exercise" : "",
        document.hasImplementationEvidence ? "implementation evidence" : "",
      ];
      const matchesQuery = !normalizedQuery || [document.title, document.description, document.section, ...document.architectureLayers, ...activityTerms].join(" ").toLowerCase().includes(normalizedQuery);
      return matchesQuery && (section === all || document.section === section) && (audience === all || document.audience.includes(audience))
        && (lifecycle === all || document.lifecycle.includes(lifecycle)) && (architecture === all || document.architectureLayers.includes(architecture))
        && (status === all || document.status === status) && (risk === all || document.risk === risk) && (type === all || document.contentType === type);
    });
    if (sort === "title") return [...result].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "time") return [...result].sort((a, b) => a.readingMinutes - b.readingMinutes);
    return result;
  }, [architecture, audience, documents, lifecycle, query, risk, section, sort, status, type]);

  const groups = useMemo(() => {
    const result = new Map<string, TopicDocument[]>();
    for (const document of filtered) { const group = result.get(document.section) ?? []; group.push(document); result.set(document.section, group); }
    return [...result.entries()];
  }, [filtered]);

  const activeFilters = [["section", section], ["audience", audience], ["lifecycle", lifecycle], ["architecture", architecture], ["status", status], ["risk", risk], ["type", type]].filter(([, value]) => value !== all);
  const moreFilterCount = [audience, architecture, status, risk, type].filter((value) => value !== all).length;

  function reset() { setQuery(""); setSection(all); setAudience(all); setLifecycle(all); setArchitecture(all); setStatus(all); setRisk(all); setType(all); }
  function clearFilter(key: string) { if (key === "section") setSection(all); if (key === "audience") setAudience(all); if (key === "lifecycle") setLifecycle(all); if (key === "architecture") setArchitecture(all); if (key === "status") setStatus(all); if (key === "risk") setRisk(all); if (key === "type") setType(all); }
  function selectSystemNode(node: (typeof systemNodes)[number]) { reset(); if (node.key === "section") setSection(node.value); if (node.key === "lifecycle") setLifecycle(node.value); if (node.key === "architecture") { setArchitecture(node.value); setShowMoreFilters(true); } if (node.key === "query") setQuery(node.value); }

  return (
    <div className="topic-explorer">
      <div className="topic-view-toolbar"><div className="segmented-control" aria-label="Topic view"><button aria-pressed={view === "list"} onClick={() => setView("list")} type="button">List</button><button aria-pressed={view === "map"} onClick={() => setView("map")} type="button">System map</button></div><label><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="curriculum">Curriculum order</option><option value="title">Title</option><option value="time">Reading time</option></select></label></div>
      {view === "map" && <section className="topic-system-map" aria-labelledby="topic-system-map-title"><header><div><span className="section-kicker">Relationship-led discovery</span><h2 id="topic-system-map-title">Navigate the factory as a system.</h2></div><p>Select a node to filter the authoritative curriculum. The map is a navigation layer, not a second taxonomy.</p></header><div className="system-map-nodes">{systemNodes.map((node) => <button className={`system-map-level-${node.level}`} key={node.label} onClick={() => selectSystemNode(node)} type="button"><small>{node.level === 0 ? "System" : node.level === 1 ? "Layer" : "Capability"}</small><strong>{node.label}</strong></button>)}</div></section>}
      <div className="topic-filter-panel" aria-label="Filter curriculum topics">
        <label className="topic-query"><span>Search</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Capability, failure, contract, or question" /></label>
        <div className="topic-primary-filters">
          <label><span>Area</span><select value={section} onChange={(event) => setSection(event.target.value)}><option value={all}>All areas</option>{options.sections.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label><span>Lifecycle</span><select value={lifecycle} onChange={(event) => setLifecycle(event.target.value)}><option value={all}>All stages</option>{options.lifecycles.map((value) => <option key={value} value={value}>{titleCase(value)}</option>)}</select></label>
          <button aria-controls="topic-more-filters" aria-expanded={showMoreFilters} className="topic-more-filters-toggle" onClick={() => setShowMoreFilters((visible) => !visible)} type="button"><span>More filters</span>{moreFilterCount > 0 && <strong>{moreFilterCount} active</strong>}<i aria-hidden="true">{showMoreFilters ? "−" : "+"}</i></button>
        </div>
        {showMoreFilters && <div className="topic-secondary-filters" id="topic-more-filters">
          <label><span>Persona</span><select value={audience} onChange={(event) => setAudience(event.target.value)}><option value={all}>All personas</option>{options.audiences.map((value) => <option key={value} value={value}>{titleCase(value)}</option>)}</select></label>
          <label><span>Architecture</span><select value={architecture} onChange={(event) => setArchitecture(event.target.value)}><option value={all}>All layers</option>{options.architectures.map((value) => <option key={value} value={value}>{titleCase(value)}</option>)}</select></label>
          <label><span>Maturity</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value={all}>All statuses</option>{options.statuses.map((value) => <option key={value} value={value}>{titleCase(value)}</option>)}</select></label>
          <label><span>Risk</span><select value={risk} onChange={(event) => setRisk(event.target.value)}><option value={all}>All risk levels</option>{options.risks.map((value) => <option key={value} value={value}>{titleCase(value)}</option>)}</select></label>
          <label><span>Type</span><select value={type} onChange={(event) => setType(event.target.value)}><option value={all}>All content</option>{options.types.map((value) => <option key={value} value={value}>{titleCase(value)}</option>)}</select></label>
        </div>}
      </div>
      <div className="topic-results-summary" aria-live="polite"><p><strong>{filtered.length}</strong> of {documents.length} documents</p><div className="active-filter-chips">{query && <button onClick={() => setQuery("")} type="button">Search: {query} ×</button>}{activeFilters.map(([key, value]) => <button key={key} onClick={() => clearFilter(key)} type="button">{titleCase(key)}: {titleCase(value)} ×</button>)}{(query || activeFilters.length > 0) && <button className="clear-all" type="button" onClick={reset}>Clear all</button>}</div></div>
      <div className="section-index">
        {groups.map(([label, sectionDocuments], sectionIndex) => <section className="section-group" key={label}><header><span>{String(sectionIndex + 1).padStart(2, "0")}</span><h2>{label}</h2><small>{sectionDocuments.length} {sectionDocuments.length === 1 ? "document" : "documents"}</small></header><div className="section-documents">{sectionDocuments.map((document) => <a href={`/docs/${document.slug}`} key={document.slug}><div><div className="document-card-meta"><StatusBadge status={document.status} /><span>{titleCase(document.risk)} risk</span><span>{titleCase(document.contentType)}</span></div><h3>{document.title}</h3><p>{document.description}</p><small>{[...document.lifecycle.map(titleCase), ...document.architectureLayers.map(titleCase)].join(" · ")}</small></div><span>{document.readingMinutes} min</span></a>)}</div></section>)}
        {groups.length === 0 && <div className="empty-state"><h2>No chapters match these filters.</h2><p>Clear one or more filters to broaden the curriculum view.</p><button className="button button-secondary" type="button" onClick={reset}>Clear filters</button></div>}
      </div>
    </div>
  );
}
