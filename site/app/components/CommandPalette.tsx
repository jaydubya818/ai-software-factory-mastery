"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { paletteIndex } from "../../lib/palette.generated";
import { lifecycleStages } from "../../lib/lifecycle";

type PaletteGroup = "Guide" | "Concepts" | "Architecture" | "Labs" | "Mission Control" | "Glossary" | "Chapters";
type PaletteItem = { id: string; label: string; meta: string; href: string; text: string; group: PaletteGroup };

const utilityItems: PaletteItem[] = [
  { id: "guide", label: "Table of contents", meta: "The guide", href: "/guide", text: "guide table of contents chapters parts understand design build prove operate improve", group: "Guide" },
  { id: "visuals", label: "Open the atlas", meta: "System maps", href: "/visuals", text: "visual diagrams infographics atlas lifecycle stack", group: "Guide" },
  { id: "architecture", label: "Explore architecture", meta: "System map", href: "/architecture", text: "architecture layers boundaries system map", group: "Architecture" },
  { id: "topics", label: "Open the reference shelf", meta: "Appendices", href: "/topics", text: "reference appendix glossary labs case studies research", group: "Concepts" },
  { id: "search", label: "Search the whole guide", meta: "Full text", href: "/search", text: "search full text find", group: "Guide" },
  { id: "coverage", label: "Inspect coverage", meta: "Maturity & evidence", href: "/coverage", text: "coverage maturity evidence", group: "Architecture" },
  { id: "review", label: "Review the guide", meta: "External reviewer guide", href: "/docs/appendix/reviewer-guide", text: "review feedback claims architecture usability terminology sources", group: "Chapters" },
  { id: "labs", label: "Find labs", meta: "Hands-on", href: "/topics#labs", text: "labs exercises hands on", group: "Labs" },
];

const groupOrder: PaletteGroup[] = ["Guide", "Concepts", "Architecture", "Labs", "Mission Control", "Glossary", "Chapters"];

function groupForDocument(document: (typeof paletteIndex)[number]): PaletteGroup {
  if (document.slug === "appendix/glossary") return "Glossary";
  if (document.contentType === "lab") return "Labs";
  if (document.contentType === "case study") return "Mission Control";
  if (document.sectionKey === "03-build" || document.sectionKey === "05-operate") return "Architecture";
  return "Chapters";
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  function openPalette() {
    setQuery("");
    setActive(0);
    setOpen(true);
  }

  function closePalette({ restoreFocus = true } = {}) {
    setOpen(false);
    if (restoreFocus) window.setTimeout(() => triggerRef.current?.focus(), 0);
  }

  const items = useMemo(() => {
    const documents: PaletteItem[] = paletteIndex.map((document) => ({
      id: document.slug,
      label: document.chapter ? `${document.chapter}. ${document.title}` : document.title,
      meta: document.chapter !== null ? document.section : `${document.section} · ${(document.group as string | null) ?? document.contentType}`,
      href: `/docs/${document.slug}`,
      text: [document.title, document.section, document.description, ...document.headings].join(" ").toLowerCase(),
      group: groupForDocument(document),
    }));
    const lifecycle: PaletteItem[] = lifecycleStages.map((stage) => ({ id: `stage-${stage.id}`, label: `${stage.label} lifecycle`, meta: stage.canonical, href: `/visuals#phase-${stage.id}`, text: `${stage.label} ${stage.detail} ${stage.concepts.join(" ")}`.toLowerCase(), group: "Concepts" }));
    return [...utilityItems, ...lifecycle, ...documents];
  }, []);

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return items.slice(0, 12);
    return items.filter((item) => terms.every((term) => item.text.includes(term) || item.label.toLowerCase().includes(term))).slice(0, 18);
  }, [items, query]);

  const orderedResults = useMemo(() => groupOrder.flatMap((group) => results.filter((item) => item.group === group)), [results]);

  const groupedResults = useMemo(() => groupOrder.map((group) => ({
    group,
    entries: orderedResults.map((item, index) => ({ item, index })).filter(({ item }) => item.group === group),
  })).filter(({ entries }) => entries.length > 0), [orderedResults]);

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
      if (event.key === "Escape") closePalette();
    }
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, []);

  useEffect(() => {
    if (!open) return;
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  function choose(index: number) {
    const item = orderedResults[index];
    if (!item) return;
    closePalette({ restoreFocus: false });
    router.push(item.href);
  }

  return (
    <>
      <button aria-controls="command-palette" aria-expanded={open} aria-haspopup="dialog" className="command-trigger" ref={triggerRef} type="button" onClick={openPalette}>
        <span>Search</span><kbd>⌘K</kbd>
      </button>
      {open && (
        <div className="command-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closePalette()}>
          <section className="command-palette" id="command-palette" role="dialog" aria-modal="true" aria-label="Command palette">
            <label className="command-input">
              <span className="sr-only">Search the guide and navigate</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => { setQuery(event.target.value); setActive(0); }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") { event.preventDefault(); setActive((value) => Math.min(value + 1, Math.max(0, orderedResults.length - 1))); }
                  if (event.key === "ArrowUp") { event.preventDefault(); setActive((value) => Math.max(value - 1, 0)); }
                  if (event.key === "Enter") { event.preventDefault(); choose(active); }
                }}
                placeholder="Search architecture, concepts, failures, or chapters…"
                role="combobox"
                aria-controls="command-results"
                aria-expanded="true"
                aria-activedescendant={orderedResults[active] ? `command-${orderedResults[active].id}` : undefined}
              />
              <kbd>ESC</kbd>
            </label>
            <div className="command-results" id="command-results" role="listbox">
              {groupedResults.map(({ group, entries }) => (
                <section aria-labelledby={`command-group-${group.toLowerCase().replaceAll(" ", "-")}`} className="command-result-group" key={group} role="group">
                  <h2 id={`command-group-${group.toLowerCase().replaceAll(" ", "-")}`}>{group}</h2>
                  {entries.map(({ item, index }) => (
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
                </section>
              ))}
              {results.length === 0 && <div className="command-empty"><strong>No matching result</strong><span>Try a chapter title, architecture layer, lifecycle stage, failure, or contract.</span></div>}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
