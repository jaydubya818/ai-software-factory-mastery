import path from "node:path";
import { documents } from "./content.generated";
import { guideParts } from "./guide";

export type DocumentRecord = (typeof documents)[number];

/** The book map (guide/README.md). Served at /docs/guide but kept out of the reading sequence. */
export const bookMap = documents.find((document) => document.contentType === "overview");

/** Front matter and the 36 numbered chapters, in reading order. */
export const chapters = documents.filter((document) => document.chapter !== null);

/** Everything that is reference material: appendices, case studies, research. */
export const appendices = documents.filter((document) => document.sectionKey === "appendix" && document.contentType !== "overview");

/** The eight stage pages of the factory's one-line value stream. */
export const stages = documents.filter((document) => document.sectionKey === "stages").slice().sort((a, b) => (a.stage ?? 0) - (b.stage ?? 0));

export function getStage(number: number) {
  return stages.find((document) => document.stage === number);
}

/** Reading sequence for previous/next: front matter → stages 1..8 → chapters 1..36 → appendices. */
const frontMatter = chapters.filter((document) => document.chapter === 0);
const numberedChapters = chapters.filter((document) => document.chapter !== 0);
export const readingSequence = [...frontMatter, ...stages, ...numberedChapters, ...appendices];

export const sections = Array.from(
  documents
    .filter((document) => document.contentType !== "overview")
    .reduce((map, document) => {
      const existing = map.get(document.sectionKey) ?? {
        key: document.sectionKey,
        label: document.section,
        documents: [] as DocumentRecord[],
      };
      existing.documents.push(document);
      map.set(document.sectionKey, existing);
      return map;
    }, new Map<string, { key: string; label: string; documents: DocumentRecord[] }>())
    .values(),
);

export const appendixGroups = Array.from(
  appendices
    .reduce((map, document) => {
      const label = document.group ?? "Reference";
      map.set(label, [...(map.get(label) ?? []), document]);
      return map;
    }, new Map<string, DocumentRecord[]>())
    .entries(),
).map(([label, groupDocuments]) => ({ label, documents: groupDocuments }));

export function getDocument(slug: string) {
  return documents.find((document) => document.slug === slug);
}

export function getChapter(number: number) {
  return chapters.find((document) => document.chapter === number);
}

export function partForDocument(document: DocumentRecord) {
  return guideParts.find((part) => (part.sectionKeys as readonly string[]).includes(document.sectionKey));
}

export function chaptersForPart(partId: string) {
  const part = guideParts.find((candidate) => candidate.id === partId);
  if (!part) return [];
  return chapters.filter((document) => (part.sectionKeys as readonly string[]).includes(document.sectionKey));
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
  const index = readingSequence.findIndex((document) => document.slug === slug);
  return {
    previous: index > 0 ? readingSequence[index - 1] : undefined,
    next: index >= 0 && index < readingSequence.length - 1 ? readingSequence[index + 1] : undefined,
  };
}

export { documents };
