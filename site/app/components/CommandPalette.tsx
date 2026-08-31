"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { paletteIndex } from "../../lib/palette.generated";
import { learningPathBlueprints, lifecycleStages } from "../../lib/curriculum";
import { useProgress } from "./ProgressProvider";

type PaletteItem = { id: string; label: string; meta: string; href: string; text: string };

const utilityItems: PaletteItem[] = [
  { id: "architecture", label: "Explore architecture", meta: "System map", href: "/architecture", text: "architecture layers boundaries system map" },
  { id: "topics", label: "Browse topics", meta: "Curriculum", href: "/topics", text: "topics curriculum filters" },
  { id: "coverage", label: "Inspect coverage", meta: "Maturity & evidence", href: "/coverage", text: "coverage maturity evidence" },
  { id: "review", label: "Review the curriculum", meta: "External reviewer guide", href: "/docs/00-overview/09-reviewer-guide", text: "review feedback claims architecture usability terminology sources" },
  { id: "labs", label: "Find labs", meta: "Hands-on", href: "/topics?type=lab", text: "labs exercises hands on" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { lastVisited } = useProgress();

  function openPalette() {
    setQuery("");
    setActive(0);
    setOpen(true);
  }

  const items = useMemo(() => {
    const documents: PaletteItem[] = paletteIndex.map((document) => ({
      id: document.slug,
      label: document.title,
      meta: `${document.section} · ${document.contentType}`,
      href: `/docs/${document.slug}`,
      text: [document.title, document.section, document.description, ...document.headings, ...document.lifecycle, ...document.architectureLayers].join(" ").toLowerCase(),
    }));
    const paths = learningPathBlueprints.map((path) => ({ id: `path-${path.id}`, label: `${path.title} path`, meta: "Learning path", href: `/learn#${path.id}`, text: `${path.title} ${path.goal} ${path.outcome}`.toLowerCase() }));
    const lifecycle = lifecycleStages.map((stage) => ({ id: `stage-${stage.id}`, label: `${stage.label} lifecycle`, meta: stage.canonical, href: `/topics?lifecycle=${stage.id}`, text: `${stage.label} ${stage.detail} ${stage.concepts.join(" ")}`.toLowerCase() }));
    const continued = lastVisited ? [{ id: "continue", label: lastVisited.title, meta: "Continue learning", href: lastVisited.href, text: `continue ${lastVisited.title}`.toLowerCase() }] : [];
    return [...continued, ...utilityItems, ...paths, ...lifecycle, ...documents];
  }, [lastVisited]);

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return items.slice(0, 12);
    return items.filter((item) => terms.every((term) => item.text.includes(term) || item.label.toLowerCase().includes(term))).slice(0, 18);
  }, [items, query]);

  useEffect(() => {
    function keydown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => {
          if (!current) {
            setQuery("");
            setActive(0);
          }
          return !current;
        });
      }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, []);

  useEffect(() => {
    if (!open) return;
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  function choose(index: number) {
    const item = results[index];
    if (!item) return;
    setOpen(false);
    router.push(item.href);
  }

  return (
    <>
      <button className="command-trigger" type="button" onClick={openPalette} aria-haspopup="dialog">
        <span>Search</span><kbd>⌘K</kbd>
      </button>
      {open && (
        <div className="command-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
          <section className="command-palette" role="dialog" aria-modal="true" aria-label="Command palette">
            <label className="command-input">
              <span className="sr-only">Search the curriculum and navigate</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => { setQuery(event.target.value); setActive(0); }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") { event.preventDefault(); setActive((value) => Math.min(value + 1, results.length - 1)); }
                  if (event.key === "ArrowUp") { event.preventDefault(); setActive((value) => Math.max(value - 1, 0)); }
                  if (event.key === "Enter") { event.preventDefault(); choose(active); }
                }}
                placeholder="Search architecture, labs, chapters, or paths…"
                role="combobox"
                aria-controls="command-results"
                aria-expanded="true"
                aria-activedescendant={results[active] ? `command-${results[active].id}` : undefined}
              />
              <kbd>ESC</kbd>
            </label>
            <div className="command-results" id="command-results" role="listbox">
              {results.map((item, index) => (
                <button
                  aria-selected={index === active}
                  className={index === active ? "is-active" : undefined}
                  id={`command-${item.id}`}
                  key={item.id}
                  onClick={() => choose(index)}
                  onMouseEnter={() => setActive(index)}
                  role="option"
                  type="button"
                >
                  <span><strong>{item.label}</strong><small>{item.meta}</small></span><b aria-hidden="true">↗</b>
                </button>
              ))}
              {results.length === 0 && <div className="command-empty"><strong>No matching command</strong><span>Try a chapter title, architecture layer, lifecycle stage, lab, or learning path.</span></div>}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
