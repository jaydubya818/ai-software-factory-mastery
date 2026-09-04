"use client";

import { guideAssetPath, guideContentPath } from "./paths";

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

/** The full-text index is ~1.2 MB, so it is fetched only when a search surface mounts. */
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

function excerptFor(text: string, terms: string[], width = 180) {
  const lower = text.toLowerCase();
  const phrase = terms.join(" ");
  const phraseAt = terms.length > 1 ? lower.indexOf(phrase) : -1;
  const first = phraseAt >= 0 ? phraseAt : terms.map((term) => lower.indexOf(term)).filter((index) => index >= 0).sort((a, b) => a - b)[0];
  if (first === undefined) return text.slice(0, width) + (text.length > width ? "…" : "");
  const start = Math.max(0, first - Math.floor(width / 3));
  const end = Math.min(text.length, start + width);
  return (start > 0 ? "…" : "") + text.slice(start, end).trim() + (end < text.length ? "…" : "");
}

export function searchDocuments(index: SearchDocument[], query: string, limit = 30): SearchHit[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const hits: SearchHit[] = [];
  for (const document of index) {
    const title = document.title.toLowerCase();
    const description = document.description.toLowerCase();
    const titleScore = terms.reduce((total, term) => total + (title.includes(term) ? 12 : 0) + (description.includes(term) ? 3 : 0), 0);
    // Whole-document hit when the title matches every term.
    if (terms.every((term) => title.includes(term))) {
      hits.push({ document, section: null, excerpt: document.description, href: guideContentPath(document.slug), relevance: titleScore + 20 });
    }
    for (const section of document.sections) {
      const heading = section.heading.toLowerCase();
      const text = section.text.toLowerCase();
      if (!terms.every((term) => heading.includes(term) || text.includes(term))) continue;
      const phraseBonus = terms.length > 1 && (text.includes(terms.join(" ")) || text.includes(terms.join("-"))) ? 10 : 0;
      const relevance = terms.reduce((total, term) => total + (heading.includes(term) ? 9 : 0) + Math.min(4, text.split(term).length - 1), 0) + titleScore + phraseBonus;
      hits.push({ document, section, excerpt: excerptFor(section.text, terms), href: `${guideContentPath(document.slug)}#${section.id}`, relevance });
    }
  }
  return hits.sort((a, b) => b.relevance - a.relevance).slice(0, limit);
}
