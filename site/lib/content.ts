import path from "node:path";
import { documents } from "./content.generated";

export type DocumentRecord = (typeof documents)[number];

export const sections = Array.from(
  documents.reduce((map, document) => {
    const existing = map.get(document.sectionKey) ?? {
      key: document.sectionKey,
      label: document.section,
      documents: [] as DocumentRecord[],
    };
    existing.documents.push(document);
    map.set(document.sectionKey, existing);
    return map;
  }, new Map<string, { key: string; label: string; documents: DocumentRecord[] }>()).values(),
);

export function getDocument(slug: string) {
  return documents.find((document) => document.slug === slug);
}

function normalizeAnchor(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function resolveDocumentHref(sourcePath: string, href?: string) {
  if (!href || href.startsWith("#") || /^(https?:|mailto:)/.test(href)) return href;

  const [pathname, hash] = href.split("#", 2);
  if (!pathname.endsWith(".md")) return href;

  const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(sourcePath), pathname));
  const target = documents.find((document) => document.sourcePath === resolved);
  if (!target) return href;
  return `/docs/${target.slug}${hash ? `#${normalizeAnchor(hash)}` : ""}`;
}

export function adjacentDocuments(slug: string) {
  const index = documents.findIndex((document) => document.slug === slug);
  return {
    previous: index > 0 ? documents[index - 1] : undefined,
    next: index >= 0 && index < documents.length - 1 ? documents[index + 1] : undefined,
  };
}

export { documents };
