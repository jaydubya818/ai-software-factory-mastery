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

export function relatedDocuments(slug: string, limit = 5) {
  const current = getDocument(slug);
  if (!current) return [];
  const currentLifecycle = new Set<string>(current.lifecycle);
  const currentTopics = new Set<string>(current.topics);
  const currentArchitecture = new Set<string>(current.architectureLayers);

  return documents
    .filter((document) => document.slug !== slug)
    .map((document) => {
      const sameSection = document.sectionKey === current.sectionKey ? 5 : 0;
      const lifecycleOverlap = document.lifecycle.filter((stage) => currentLifecycle.has(stage)).length * 2;
      const topicOverlap = document.topics.filter((topic) => currentTopics.has(topic)).length * 3;
      const architectureOverlap = document.architectureLayers
        .filter((layer) => currentArchitecture.has(layer)).length * 2;
      return { document, score: sameSection + lifecycleOverlap + topicOverlap + architectureOverlap };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.document.title.localeCompare(b.document.title))
    .slice(0, limit)
    .map(({ document }) => document);
}

export function markdownSections(content: string) {
  const matches = [...content.matchAll(/^##\s+(.+)$/gm)];
  if (matches.length === 0) return [{ title: "Chapter", content }];

  const introduction = content.slice(0, matches[0].index).trim();
  const result = matches.map((match, index) => {
    const start = match.index ?? 0;
    const end = matches[index + 1]?.index ?? content.length;
    return { title: match[1].replace(/[*_`]/g, "").trim(), content: content.slice(start, end).trim() };
  });
  return introduction ? [{ title: "Introduction", content: introduction }, ...result] : result;
}

export function contentForMode(content: string, mode: string) {
  if (mode === "read") return content;
  const sections = markdownSections(content);
  const patterns = {
    architecture: /architecture|boundary|contract|flow|state|control|authority|failure|tradeoff|diagram|model/i,
    study: /quick read|principle|definition|lesson|distinction|summary|review|glossary|question/i,
  } as const;
  const pattern = patterns[mode as keyof typeof patterns];
  if (!pattern) return content;
  const selected = sections.filter((section) => pattern.test(section.title));
  return selected.length > 0 ? selected.map((section) => section.content).join("\n\n") : content;
}

export function quickReadContent(content: string) {
  return markdownSections(content).find((section) => /^quick read$/i.test(section.title))?.content
    .replace(/^##\s+Quick Read\s*/i, "")
    .trim();
}

export function withoutQuickRead(content: string) {
  return markdownSections(content)
    .filter((section) => !/^quick read$/i.test(section.title))
    .map((section) => section.content)
    .join("\n\n");
}

export { documents };
