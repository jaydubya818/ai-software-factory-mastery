"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { loadSearchIndex, searchDocuments, type SearchDocument } from "../../lib/search-client";
import { normalizeSearchText, searchTerms, stableAnchorId } from "../../lib/text";
import { GUIDE_ROUTES, guideDocumentPath, guideNavigationHref } from "../../lib/paths";

type PaletteGroup = "Guide" | "Architecture" | "Glossary" | "Mission Control" | "Chapters";
type PaletteItem = { id: string; label: string; meta: string; href: string; text: string; group: PaletteGroup };

const utilityItems: PaletteItem[] = [
  { id: "guide", label: "Table of contents", meta: "The Guide", href: GUIDE_ROUTES.home, text: "guide table contents chapters parts", group: "Guide" },
  { id: "search", label: "Search the whole guide", meta: "Full text", href: GUIDE_ROUTES.search, text: "search full text find answer", group: "Guide" },
  { id: "atlas", label: "Open the Atlas", meta: "System maps", href: GUIDE_ROUTES.atlas, text: "visual diagrams infographics atlas lifecycle stack", group: "Architecture" },
  { id: "architecture", label: "Explore architecture", meta: "System map", href: GUIDE_ROUTES.architecture, text: "architecture layers boundaries system map", group: "Architecture" },
  { id: "topics", label: "Open the reference shelf", meta: "Appendices", href: GUIDE_ROUTES.topics, text: "reference appendix glossary case studies research", group: "Guide" },
  { id: "review", label: "Review the Guide", meta: "Reviewer guide", href: guideDocumentPath("appendix/reviewer-guide"), text: "review feedback claims usability terminology sources", group: "Chapters" },
];

const groupOrder: PaletteGroup[] = ["Guide", "Architecture", "Glossary", "Mission Control", "Chapters"];
function groupFor(document: SearchDocument): PaletteGroup {
  if (document.slug === "appendix/glossary") return "Glossary";
  if (document.contentType === "case study") return "Mission Control";
  return "Chapters";
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState<SearchDocument[] | null>(null);
  const [failed, setFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const paletteRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  useEffect(() => { triggerRef.current?.setAttribute("data-ready", "true"); }, []);

  const openPalette = useCallback((invoker = document.activeElement) => {
    returnFocusRef.current = invoker instanceof HTMLElement && invoker !== document.body ? invoker : triggerRef.current;
    setQuery(""); setActive(0); setOpen(true);
  }, []);
  const closePalette = useCallback(({ restoreFocus = true } = {}) => {
    setOpen(false);
    const invoker = returnFocusRef.current;
    if (restoreFocus) window.setTimeout(() => (invoker?.isConnected ? invoker : triggerRef.current)?.focus(), 0);
  }, []);

  useEffect(() => {
    if (!open || index || failed) return;
    loadSearchIndex().then(setIndex).catch(() => setFailed(true));
  }, [failed, index, open]);

  const results = useMemo(() => {
    const terms = searchTerms(query);
    if (!terms.length) return utilityItems;
    const utilities = utilityItems.filter((item) => terms.every((term) => normalizeSearchText(`${item.label} ${item.text}`).includes(term)));
    const hits = index ? searchDocuments(index, query, 18).map((hit, position): PaletteItem => ({
      id: `hit-${position}-${stableAnchorId(`${hit.document.slug}-${hit.section?.id ?? "document"}`)}`,
      label: hit.section?.heading || hit.document.title,
      meta: hit.section ? `${hit.document.title} · ${hit.document.section}` : hit.document.section,
      href: hit.href,
      text: hit.excerpt,
      group: groupFor(hit.document),
    })) : [];
    return [...utilities, ...hits].slice(0, 20);
  }, [index, query]);
  const orderedResults = useMemo(() => groupOrder.flatMap((group) => results.filter((item) => item.group === group)), [results]);
  const groupedResults = useMemo(() => groupOrder.map((group) => ({ group, entries: orderedResults.map((item, position) => ({ item, position })).filter(({ item }) => item.group === group) })).filter(({ entries }) => entries.length), [orderedResults]);

  useEffect(() => {
    function keydown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); if (open) closePalette(); else openPalette(); }
      if (event.key === "Escape" && open) closePalette();
    }
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [open, openPalette, closePalette]);

  useEffect(() => {
    if (!open) return;
    const palette = paletteRef.current;
    if (!palette) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0);
    const containFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const controls = palette.querySelectorAll<HTMLElement>("input:not([disabled]), button:not([disabled])");
      const first = controls[0], last = controls[controls.length - 1];
      if (document.activeElement === (event.shiftKey ? first : last)) { event.preventDefault(); (event.shiftKey ? last : first)?.focus(); }
    };
    palette.addEventListener("keydown", containFocus);
    return () => { window.clearTimeout(timer); palette.removeEventListener("keydown", containFocus); };
  }, [open]);

  function choose(position: number) {
    const item = orderedResults[position];
    if (!item) return;
    closePalette({ restoreFocus: false });
    router.push(guideNavigationHref(item.href));
  }

  return <>
    <button aria-controls="command-palette" aria-expanded={open} aria-haspopup="dialog" className="command-trigger" ref={triggerRef} type="button" onClick={() => openPalette(triggerRef.current)}><span>Search</span><kbd>⌘K</kbd></button>
    {open && <div className="command-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closePalette()}>
      <section className="command-palette" id="command-palette" ref={paletteRef} role="dialog" aria-modal="true" aria-label="Command palette">
        <label className="command-input"><span className="sr-only">Search the Guide and navigate</span>
          <input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setActive(0); }} onKeyDown={(event) => {
            if (event.key === "ArrowDown") { event.preventDefault(); setActive((value) => orderedResults.length ? Math.min(value + 1, orderedResults.length - 1) : 0); }
            if (event.key === "ArrowUp") { event.preventDefault(); setActive((value) => Math.max(value - 1, 0)); }
            if (event.key === "Enter") { event.preventDefault(); choose(active); }
          }} placeholder="Search terms, sections, or chapters…" role="combobox" aria-controls="command-results" aria-expanded="true" aria-activedescendant={orderedResults[active] ? `command-${orderedResults[active].id}` : undefined} />
          <kbd>ESC</kbd>
        </label>
        <div className="command-results" id="command-results" role="listbox" aria-busy={Boolean(query.trim() && !index && !failed)}>
          {groupedResults.map(({ group, entries }) => <section aria-labelledby={`command-group-${stableAnchorId(group)}`} className="command-result-group" key={group} role="group"><h2 id={`command-group-${stableAnchorId(group)}`}>{group}</h2>{entries.map(({ item, position }) => <button aria-selected={position === active} className={position === active ? "is-active" : undefined} id={`command-${item.id}`} key={item.id} onClick={() => choose(position)} onMouseEnter={() => setActive(position)} role="option" type="button"><span><strong>{item.label}</strong><small>{item.meta}</small></span><b aria-hidden="true">↗</b></button>)}</section>)}
          {query.trim() && !index && !failed && <div className="command-empty" role="status"><strong>Loading the Guide index…</strong><span>Your query will run as soon as the index is ready.</span></div>}
          {query.trim() && failed && <div className="command-empty" role="status"><strong>Search is temporarily unavailable</strong><span>Use the table of contents while the index is unavailable.</span></div>}
          {query.trim() && index && orderedResults.length === 0 && <div className="command-empty"><strong>No matching result</strong><span>Try a canonical term, subsection, or chapter title.</span></div>}
        </div>
      </section>
    </div>}
  </>;
}
