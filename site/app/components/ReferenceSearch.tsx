"use client";

import { useMemo, useState } from "react";
import { searchIndex } from "../../lib/search.generated";

export function ReferenceSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return searchIndex
      .filter((document) => document.contentType !== "overview")
      .filter((document) => {
        const searchable = `${document.title} ${document.section} ${document.description} ${document.headings.join(" ")} ${document.text}`.toLowerCase();
        return terms.every((term) => searchable.includes(term));
      })
      .slice(0, 12);
  }, [query]);

  return (
    <div className="reference-search">
      <label className="topic-query"><span>Search the guide</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try: lease, proof package, prompt injection, merge queue" type="search" /></label>
      {query.trim() && (
        <div className="reference-search-results" aria-live="polite">
          {results.map((document) => <a href={`/docs/${document.slug}`} key={document.slug}><span>{document.chapter ? `Chapter ${document.chapter}` : (document.group as string | null) ?? document.section}</span><strong>{document.title}</strong></a>)}
          {results.length === 0 && <p className="empty-state">No chapter or appendix matches that search.</p>}
        </div>
      )}
    </div>
  );
}
