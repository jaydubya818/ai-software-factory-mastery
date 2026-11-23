"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { GUIDE_ROUTES, guideNavigationHref } from "../../lib/paths";
import { loadSearchIndex, searchDocuments, type SearchDocument } from "../../lib/search-client";

export function ReferenceSearch() {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const [failed, setFailed] = useState(false);
  const [index, setIndex] = useState<SearchDocument[] | null>(null);
  useEffect(() => { loadSearchIndex().then(setIndex).catch(() => setFailed(true)); }, []);
  const results = useMemo(() => (index && deferred.trim() ? searchDocuments(index, deferred, 12) : []), [index, deferred]);

  return (
    <div className="reference-search">
      <label className="topic-query"><span>Search the guide</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try: lease, proof package, prompt injection, merge queue" type="search" /></label>
      {query.trim() && (
        <div className="reference-search-results" aria-live="polite">
          {failed ? <p>Search is unavailable. <a href={guideNavigationHref(GUIDE_ROUTES.search)}>Open Guide search to retry.</a></p> : !index && <p>Loading search…</p>}
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
