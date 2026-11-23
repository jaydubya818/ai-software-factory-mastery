"use client";

import { GUIDE_ROUTES, guideDocumentPath, guideNavigationHref } from "../../lib/paths";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { loadSearchIndex, searchDocuments, type SearchDocument, type SearchHit } from "../../lib/search-client";
import { matchingWords, searchTerms } from "../../lib/text";

const starters: { title: string; description: string; href: string; meta: string }[] = [
  { title: "The factory in one view", description: "The whole system on one page — five systems, five verbs, the one line.", href: guideDocumentPath("01-understand/02-the-factory-in-one-view"), meta: "Chapter 2" },
  { title: "Execute through Harness", description: "The model reasons; the harness controls. Where bounded execution lives.", href: guideDocumentPath("stages/04-execute-through-harness"), meta: "Stage 4" },
  { title: "Quality and evidence architecture", description: "Generation is cheap; evidence creates trust.", href: guideDocumentPath("04-prove/27-quality-and-evidence-architecture"), meta: "Chapter 27" },
  { title: "Canonical glossary", description: "Every term, defined by the responsibility it owns.", href: GUIDE_ROUTES.glossary, meta: "Appendix A" },
  { title: "Principles to have cold", description: "The book in fifty lines.", href: guideDocumentPath("appendix/principles"), meta: "Appendix F" },
];

function labelFor(document: SearchDocument) {
  if (document.chapter) return `Chapter ${document.chapter}`;
  if (document.stage) return `Stage ${document.stage}`;
  return document.group ?? document.contentType;
}

export function SearchExperience() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [attempt, setAttempt] = useState(0);
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState<SearchDocument[] | null>(null);
  const [failed, setFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    let present = true;
    loadSearchIndex().then((data) => { if (present) setIndex(data); }).catch(() => { if (present) setFailed(true); });
    return () => { present = false; };
  }, [attempt]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "/" && !document.activeElement?.closest("input, textarea, select, [contenteditable=true]") && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const results: SearchHit[] = useMemo(() => (index && deferredQuery.trim() ? searchDocuments(index, deferredQuery) : []), [index, deferredQuery]);

  const terms = useMemo(() => searchTerms(deferredQuery), [deferredQuery]);
  function highlighted(value: string) {
    const matches = matchingWords(value, terms);
    if (!matches.length) return value;
    let from = 0;
    const pieces: React.ReactNode[] = [];
    for (const { start, end } of matches) {
      pieces.push(value.slice(from, start), <mark key={start}>{value.slice(start, end)}</mark>);
      from = end;
    }
    return [...pieces, value.slice(from)];
  }

  const showingStarters = !query.trim();

  const visibleCount = showingStarters ? starters.length : results.length;
  function move(direction: number) {
    const next = Math.max(0, Math.min(active + direction, visibleCount - 1));
    setActive(next);
    document.getElementById(`search-result-${next}`)?.scrollIntoView({ block: "nearest", behavior: "instant" });
  }

  return (
    <div className="search-experience">
      <label className="search-box">
        <span className="sr-only">Search the guide</span>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => { setQuery(event.target.value); setActive(0); }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") { event.preventDefault(); move(1); }
            if (event.key === "ArrowUp") { event.preventDefault(); move(-1); }
            if (event.key === "Enter" && query === deferredQuery) {
              const href = showingStarters ? guideNavigationHref(starters[active].href) : results[active]?.href;
              if (href) { event.preventDefault(); router.push(href); }
            }
          }}
          placeholder="Search agents, harnesses, evidence, environments…"
          role="combobox"
          aria-controls="search-results"
          aria-expanded="true"
          aria-activedescendant={active < visibleCount ? `search-result-${active}` : undefined}
        />
        <kbd>/</kbd>
      </label>
      <div className="search-summary" aria-live="polite">
        {failed ? "Search index unavailable" : showingStarters ? "Suggested starting points" : index ? `${results.length} matching section${results.length === 1 ? "" : "s"}` : "Loading the index…"}
      </div>
      {failed && <button type="button" className="button" onClick={() => { setFailed(false); setAttempt((n) => n + 1); }}>Retry search</button>}
      <div className="search-results" id="search-results" role="listbox" aria-label="Guide search results" aria-busy={!index && !failed || query !== deferredQuery}>
        {showingStarters && starters.map((starter, position) => (
          <a className="search-result" href={guideNavigationHref(starter.href)} key={starter.href} role="option" id={`search-result-${position}`} aria-selected={position === active}>
            <div className="search-result-meta"><span>Start here</span><span>{starter.meta}</span></div>
            <h2>{starter.title}</h2>
            <p>{starter.description}</p>
          </a>
        ))}
        {!showingStarters && results.map((result, position) => (
          <a aria-selected={position === active} className={`search-result ${position === active ? "is-active" : ""}`} href={result.href} id={`search-result-${position}`} key={result.href} onMouseEnter={() => setActive(position)} role="option">
            <div className="search-result-meta"><span>{result.document.section}</span><span>{labelFor(result.document)}</span></div>
            <h2>{highlighted(result.document.title)}{result.section ? <span className="search-result-section"> › {highlighted(result.section.heading)}</span> : null}</h2>
            <p>{highlighted(result.excerpt)}</p>
          </a>
        ))}
      </div>
      {!showingStarters && query === deferredQuery && index && results.length === 0 && (
          <div className="empty-state">
            <h2>No matching section</h2>
            <p>Try a canonical term such as “control plane,” “evaluation,” “harness,” or “multi-repository.”</p>
          </div>
        )}
    </div>
  );
}
