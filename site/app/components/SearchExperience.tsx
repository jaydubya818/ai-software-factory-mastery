"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { loadSearchIndex, searchDocuments, type SearchDocument, type SearchHit } from "../../lib/search-client";

const starters: { title: string; description: string; href: string; meta: string }[] = [
  { title: "The factory in one view", description: "The whole system on one page — five systems, five verbs, the one line.", href: "/docs/01-understand/02-the-factory-in-one-view", meta: "Chapter 2" },
  { title: "Execute through Harness", description: "The model reasons; the harness controls. Where bounded execution lives.", href: "/docs/stages/04-execute-through-harness", meta: "Stage 4" },
  { title: "Quality and evidence architecture", description: "Generation is cheap; evidence creates trust.", href: "/docs/04-prove/21-quality-and-evidence-architecture", meta: "Chapter 21" },
  { title: "Canonical glossary", description: "Every term, defined by the responsibility it owns.", href: "/docs/appendix/glossary", meta: "Appendix A" },
  { title: "Principles to have cold", description: "The book in fifty lines.", href: "/docs/appendix/principles", meta: "Appendix F" },
];

function labelFor(document: SearchDocument) {
  if (document.chapter) return `Chapter ${document.chapter}`;
  if (document.stage) return `Stage ${document.stage}`;
  return document.group ?? document.contentType;
}

export function SearchExperience() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState<SearchDocument[] | null>(null);
  const [failed, setFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    loadSearchIndex().then(setIndex).catch(() => setFailed(true));
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const results: SearchHit[] = useMemo(() => (index && query.trim() ? searchDocuments(index, query) : []), [index, query]);

  function highlighted(value: string) {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return value;
    const lower = value.toLowerCase();
    const term = terms.find((candidate) => lower.includes(candidate));
    if (!term) return value;
    const at = lower.indexOf(term);
    return <>{value.slice(0, at)}<mark>{value.slice(at, at + term.length)}</mark>{value.slice(at + term.length)}</>;
  }

  const showingStarters = !query.trim();

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
            if (event.key === "ArrowDown") { event.preventDefault(); setActive((value) => Math.min(value + 1, results.length - 1)); }
            if (event.key === "ArrowUp") { event.preventDefault(); setActive((value) => Math.max(value - 1, 0)); }
            if (event.key === "Enter" && results[active]) { event.preventDefault(); router.push(results[active].href); }
          }}
          placeholder="Search agents, harnesses, evidence, environments…"
          role="combobox"
          aria-controls="search-results"
          aria-expanded="true"
          aria-activedescendant={results[active] ? `search-result-${active}` : undefined}
        />
        <kbd>/</kbd>
      </label>
      <div className="search-summary" aria-live="polite">
        {showingStarters ? "Suggested starting points" : index ? `${results.length} matching section${results.length === 1 ? "" : "s"}` : failed ? "Search index unavailable" : "Loading the index…"}
      </div>
      <div className="search-results" id="search-results" role="listbox">
        {showingStarters && starters.map((starter) => (
          <a className="search-result" href={starter.href} key={starter.href} role="option" aria-selected={false}>
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
        {!showingStarters && index && results.length === 0 && (
          <div className="empty-state">
            <h2>No matching section</h2>
            <p>Try a canonical term such as “control plane,” “evaluation,” “harness,” or “multi-repository.”</p>
          </div>
        )}
      </div>
    </div>
  );
}
