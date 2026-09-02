"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchIndex } from "../../lib/search.generated";

function score(document: (typeof searchIndex)[number], terms: string[]) {
  const title = document.title.toLowerCase();
  const section = document.section.toLowerCase();
  const description = document.description.toLowerCase();
  const headings = document.headings.join(" ").toLowerCase();
  const text = document.text.toLowerCase();

  return terms.reduce((total, term) => {
    if (!text.includes(term) && !title.includes(term) && !headings.includes(term)) return -1000;
    return total
      + (title.includes(term) ? 12 : 0)
      + (section.includes(term) ? 5 : 0)
      + (headings.includes(term) ? 7 : 0)
      + (description.includes(term) ? 4 : 0)
      + Math.min(4, text.split(term).length - 1);
  }, 0);
}

export function SearchExperience() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return searchIndex.slice(0, 12);
    return searchIndex
      .map((document) => ({ document, relevance: score(document, terms) }))
      .filter((result) => result.relevance >= 0)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 30)
      .map((result) => result.document);
  }, [query]);

  function highlighted(value: string) {
    const term = query.trim();
    if (!term) return value;
    const index = value.toLowerCase().indexOf(term.toLowerCase());
    if (index < 0) return value;
    return <>{value.slice(0, index)}<mark>{value.slice(index, index + term.length)}</mark>{value.slice(index + term.length)}</>;
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
            if (event.key === "ArrowDown") { event.preventDefault(); setActive((value) => Math.min(value + 1, results.length - 1)); }
            if (event.key === "ArrowUp") { event.preventDefault(); setActive((value) => Math.max(value - 1, 0)); }
            if (event.key === "Enter" && results[active]) { event.preventDefault(); router.push(`/docs/${results[active].slug}`); }
          }}
          placeholder="Search agents, harnesses, evidence, environments…"
          role="combobox"
          aria-controls="search-results"
          aria-expanded="true"
          aria-activedescendant={results[active] ? `search-result-${results[active].slug.replaceAll("/", "-")}` : undefined}
        />
        <kbd>/</kbd>
      </label>
      <div className="search-summary" aria-live="polite">
        {query ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Suggested starting points"}
      </div>
      <div className="search-results" id="search-results" role="listbox">
        {results.map((result, index) => (
          <a aria-selected={index === active} className={`search-result ${index === active ? "is-active" : ""}`} href={`/docs/${result.slug}`} id={`search-result-${result.slug.replaceAll("/", "-")}`} key={result.slug} onMouseEnter={() => setActive(index)} role="option">
            <div className="search-result-meta"><span>{result.section}</span><span>{result.contentType}</span></div>
            <h2>{highlighted(result.title)}</h2>
            <p>{highlighted(result.description)}</p>
            <small>{[...result.lifecycle, ...result.architectureLayers].join(" · ")}</small>
          </a>
        ))}
        {results.length === 0 && (
          <div className="empty-state">
            <h2>No matching chapter</h2>
            <p>Try a canonical term such as “control plane,” “evaluation,” “harness,” or “multi-repository.”</p>
          </div>
        )}
      </div>
    </div>
  );
}
