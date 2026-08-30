"use client";

import { useMemo, useState } from "react";
import { StatusBadge } from "./StatusBadge";

type TopicDocument = {
  slug: string;
  title: string;
  section: string;
  status: string;
  audience: readonly string[];
  lifecycle: readonly string[];
  risk: string;
  description: string;
  readingMinutes: number;
  labType: string | null;
};

const all = "all";

function optionsFor(documents: readonly TopicDocument[], key: "section" | "status" | "risk") {
  return [...new Set(documents.map((document) => document[key]).filter(Boolean))].sort();
}

function arrayOptions(documents: readonly TopicDocument[], key: "audience" | "lifecycle") {
  return [...new Set(documents.flatMap((document) => [...document[key]]))].sort();
}

function titleCase(value: string) {
  return value.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function TopicExplorer({ documents }: { documents: readonly TopicDocument[] }) {
  const [query, setQuery] = useState("");
  const [section, setSection] = useState(all);
  const [audience, setAudience] = useState(all);
  const [lifecycle, setLifecycle] = useState(all);
  const [status, setStatus] = useState(all);
  const [risk, setRisk] = useState(all);

  const options = useMemo(() => ({
    sections: optionsFor(documents, "section"),
    audiences: arrayOptions(documents, "audience"),
    lifecycles: arrayOptions(documents, "lifecycle"),
    statuses: optionsFor(documents, "status"),
    risks: optionsFor(documents, "risk"),
  }), [documents]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return documents.filter((document) => {
      const matchesQuery = !normalizedQuery || [document.title, document.description, document.section]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
      return matchesQuery
        && (section === all || document.section === section)
        && (audience === all || document.audience.includes(audience))
        && (lifecycle === all || document.lifecycle.includes(lifecycle))
        && (status === all || document.status === status)
        && (risk === all || document.risk === risk);
    });
  }, [audience, documents, lifecycle, query, risk, section, status]);

  const groups = useMemo(() => {
    const result = new Map<string, TopicDocument[]>();
    for (const document of filtered) {
      const group = result.get(document.section) ?? [];
      group.push(document);
      result.set(document.section, group);
    }
    return [...result.entries()];
  }, [filtered]);

  const hasFilters = [query, section, audience, lifecycle, status, risk]
    .some((value) => value !== "" && value !== all);

  function reset() {
    setQuery("");
    setSection(all);
    setAudience(all);
    setLifecycle(all);
    setStatus(all);
    setRisk(all);
  }

  return (
    <div className="topic-explorer">
      <div className="topic-filter-panel" aria-label="Filter curriculum topics">
        <label className="topic-query">
          <span>Search</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Capability, failure, or question" />
        </label>
        <label><span>Area</span><select value={section} onChange={(event) => setSection(event.target.value)}><option value={all}>All areas</option>{options.sections.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label><span>Persona</span><select value={audience} onChange={(event) => setAudience(event.target.value)}><option value={all}>All personas</option>{options.audiences.map((value) => <option key={value} value={value}>{titleCase(value)}</option>)}</select></label>
        <label><span>Lifecycle</span><select value={lifecycle} onChange={(event) => setLifecycle(event.target.value)}><option value={all}>All phases</option>{options.lifecycles.map((value) => <option key={value} value={value}>{titleCase(value)}</option>)}</select></label>
        <label><span>Maturity</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value={all}>All statuses</option>{options.statuses.map((value) => <option key={value} value={value}>{titleCase(value)}</option>)}</select></label>
        <label><span>Risk</span><select value={risk} onChange={(event) => setRisk(event.target.value)}><option value={all}>All risk levels</option>{options.risks.map((value) => <option key={value} value={value}>{titleCase(value)}</option>)}</select></label>
      </div>
      <div className="topic-results-summary" aria-live="polite">
        <p><strong>{filtered.length}</strong> of {documents.length} documents</p>
        {hasFilters && <button type="button" onClick={reset}>Clear filters</button>}
      </div>
      <div className="section-index">
        {groups.map(([label, sectionDocuments], sectionIndex) => (
          <section className="section-group" key={label}>
            <header>
              <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
              <h2>{label}</h2>
              <small>{sectionDocuments.length} {sectionDocuments.length === 1 ? "document" : "documents"}</small>
            </header>
            <div className="section-documents">
              {sectionDocuments.map((document) => (
                <a href={`/docs/${document.slug}`} key={document.slug}>
                  <div>
                    <div className="document-card-meta"><StatusBadge status={document.status} /><span>{titleCase(document.risk)} risk</span>{document.labType && <span>{titleCase(document.labType)} lab</span>}</div>
                    <h3>{document.title}</h3>
                    <p>{document.description}</p>
                    {document.lifecycle.length > 0 && <small>{document.lifecycle.map(titleCase).join(" · ")}</small>}
                  </div>
                  <span>{document.readingMinutes} min</span>
                </a>
              ))}
            </div>
          </section>
        ))}
        {groups.length === 0 && (
          <div className="empty-state">
            <h2>No chapters match these filters.</h2>
            <p>Clear one or more filters to broaden the curriculum view.</p>
            <button className="button button-secondary" type="button" onClick={reset}>Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
