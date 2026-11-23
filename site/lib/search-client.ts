"use client";

import { guideAssetPath, guideContentPath, guideNavigationHref } from "./paths.ts";
import { matchingWords, normalizeSearchText, searchTerms } from "./text.ts";

export type SearchSection = { id: string; heading: string; text: string };
export type SearchDocument = {
  slug: string;
  title: string;
  section: string;
  group: string | null;
  chapter: number | null;
  stage: number | null;
  contentType: string;
  description: string;
  sections: SearchSection[];
};
export type SearchHit = {
  document: SearchDocument;
  section: SearchSection | null;
  excerpt: string;
  href: string;
  relevance: number;
};

let cache: Promise<SearchDocument[]> | null = null;

/** Fetch the full-text index only when a search surface mounts. */
export function loadSearchIndex(): Promise<SearchDocument[]> {
  if (!cache) {
    cache = fetch(guideAssetPath("search-index.json")).then((response) => {
      if (!response.ok) throw new Error(`search index ${response.status}`);
      return response.json() as Promise<SearchDocument[]>;
    });
    cache.catch(() => { cache = null; });
  }
  return cache;
}

const padded = (value: string) => ` ${normalizeSearchText(value)} `;
function prepare(index: SearchDocument[]) {
  return index.map((document) => ({
    document, title: padded(document.title), description: padded(document.description),
    sections: document.sections.map((section) => ({ section, heading: padded(section.heading), body: padded(section.text) })),
  }));
}
const prepared = new WeakMap<SearchDocument[], ReturnType<typeof prepare>>();

function excerptFor(text: string, terms: string[], width = 180) {
  const first = matchingWords(text, terms)[0]?.start ?? 0;
  const start = Math.max(0, first - Math.floor(width / 3));
  const end = Math.min(text.length, start + width);
  return (start ? "…" : "") + text.slice(start, end).trim() + (end < text.length ? "…" : "");
}

function occurrences(text: string, word: string) {
  let count = 0;
  let at = text.indexOf(word);
  while (at >= 0 && count < 4) {
    count++;
    at = text.indexOf(word, at + word.length - 1);
  }
  return count;
}

export function searchDocuments(index: SearchDocument[], query: string, limit = 30): SearchHit[] {
  const terms = searchTerms(query);
  if (!terms.length) return [];
  let rows = prepared.get(index);
  if (!rows) { rows = prepare(index); prepared.set(index, rows); }
  const words = terms.map((term) => ` ${term} `);
  const phrase = ` ${terms.join(" ")} `;
  const candidates: { document: SearchDocument; section: SearchSection | null; relevance: number }[] = [];
  for (const { document, title, description, sections } of rows) {
    const titleScore = words.reduce((n, word) => n + (title.includes(word) ? 12 : 0) + (description.includes(word) ? 3 : 0), 0);
    if (words.every((word) => title.includes(word))) candidates.push({ document, section: null, relevance: titleScore + (title === phrase ? 65 : 20) });
    for (const { section, heading, body } of sections) {
      if (!words.every((word) => heading.includes(word) || body.includes(word))) continue;
      const exact = heading === phrase;
      const relevance = titleScore + (exact ? 80 : 0) + (exact && section.id.startsWith("term-") ? 120 : 0)
        + (terms.length > 1 && body.includes(phrase) ? 10 : 0)
        + words.reduce((n, word) => n + (heading.includes(word) ? 9 : 0) + occurrences(body, word), 0);
      candidates.push({ document, section, relevance });
    }
  }
  return candidates.sort((a, b) => b.relevance - a.relevance).slice(0, limit).map((hit) => ({
    ...hit,
    excerpt: hit.section ? excerptFor(hit.section.text, terms) : hit.document.description,
    href: guideNavigationHref(guideContentPath(hit.document.slug) + (hit.section ? "#" + hit.section.id : "")),
  }));
}
