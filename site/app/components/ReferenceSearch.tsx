"use client";

import { useEffect, useMemo, useState } from "react";
import { loadSearchIndex, searchDocuments, type SearchDocument } from "../../lib/search-client";

export function ReferenceSearch() {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchDocument[] | null>(null);
  useEffect(() => { loadSearchIndex().then(setIndex).catch(() => setIndex([])); }, []);
  const results = useMemo(() => (index && query.trim() ? searchDocuments(index, query, 12) : []), [index, query]);

  return (
    <div className="reference-search">
      <label className="topic-query"><span>Search the guide</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try: lease, proof package, prompt injection, merge queue" type="search" /></label>
      {query.trim() && (
        <div className="reference-search-results" aria-live="polite">
          {results.map((result) => (
            <a href={result.href} key={result.href}>
              <span>{result.document.chapter ? `Chapter ${result.document.chapter}` : result.document.stage ? `Stage ${result.document.stage}` : result.document.group ?? result.document.contentType}</span>
              <strong>{result.document.title}{result.section ? ` › ${result.section.heading}` : ""}</strong>
              <small>{result.excerpt}</small>
            </a>
          ))}
          {index && results.length === 0 && <p className="empty-state">No section matches that search.</p>}
        </div>
      )}
    </div>
  );
}
