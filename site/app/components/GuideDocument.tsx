import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import {
  adjacentDocuments,
  appendixGroups,
  chapters,
  documents,
  getDocument,
  partForDocument,
  stages,
} from "../../lib/content";
import { guideParts } from "../../lib/guide";
import { legacyDocumentRedirects, retiredFdlcSummaryRedirects } from "../../lib/legacy-routes";
import { guidePageMetadata } from "../../lib/metadata";
import {
  absoluteGuideUrl,
  GUIDE_ROUTES,
  guideContentPath,
  guideDocumentPath,
  type GuideSearchParams,
  withSearchParams,
} from "../../lib/paths";
import { ChapterTOC } from "./ChapterTOC";
import { DocumentNav } from "./DocumentNav";
import { LegacyAnchorRedirect } from "./LegacyAnchorRedirect";
import { Markdown } from "./Markdown";
import { MissionControlStatusNotice } from "./MissionControlStatusNotice";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function guideDocumentMetadata(requestedSlug: string): Metadata {
  const canonicalSlug = legacyDocumentRedirects[requestedSlug] ?? retiredFdlcSummaryRedirects[requestedSlug] ?? requestedSlug;
  const document = getDocument(canonicalSlug);
  if (!document) return { title: "Document not found" };
  const title = `${document.title} · The AI Software Factory Guide`;
  const canonical = guideContentPath(document.slug);
  return guidePageMetadata({
    title,
    description: document.description,
    canonical,
  });
}

function chapterLabel(document: (typeof documents)[number]) {
  if (document.chapter === 0) return "Front matter";
  if (document.stage !== null) return `Stage ${document.stage}`;
  if (document.chapter !== null) return `Chapter ${document.chapter}`;
  if (document.contentType === "overview") return "Book map";
  return document.group ?? "Appendix";
}

function navLabel(document: (typeof documents)[number]) {
  return document.chapter ? `${document.chapter}. ${document.title}` : document.title;
}

const navSections = [
  { key: "front-matter", label: "Front matter", documents: chapters.filter((document) => document.chapter === 0).map((document) => ({ slug: document.slug, title: document.title })) },
  { key: "stages", label: "The factory in one line", documents: stages.map((document) => ({ slug: document.slug, title: document.title })) },
  ...guideParts.map((part) => ({
    key: part.id,
    label: `Part ${part.number} — ${part.verb}`,
    documents: chapters.filter((document) => (part.sectionKeys as readonly string[]).includes(document.sectionKey)).map((document) => ({ slug: document.slug, title: navLabel(document) })),
  })),
  ...appendixGroups.map((group) => ({ key: `appendix-${group.label}`, label: `Appendix — ${group.label}`, documents: group.documents.map((document) => ({ slug: document.slug, title: document.title })) })),
];

function isMissionControlStatusDocument(slug: string, contentType: string) {
  return contentType === "case study" || slug === "06-improve/42-mission-control-as-a-living-case-study";
}

export function GuideDocument({
  requestedSlug,
  searchParams = {},
  allowGlossaryAlias = false,
}: {
  requestedSlug: string;
  searchParams?: GuideSearchParams;
  allowGlossaryAlias?: boolean;
}) {
  if (requestedSlug === "guide") permanentRedirect(withSearchParams(GUIDE_ROUTES.home, searchParams));
  if (requestedSlug === "appendix/glossary" && !allowGlossaryAlias) permanentRedirect(withSearchParams(GUIDE_ROUTES.glossary, searchParams));

  const legacyTarget = legacyDocumentRedirects[requestedSlug] ?? retiredFdlcSummaryRedirects[requestedSlug];
  if (legacyTarget) permanentRedirect(withSearchParams(guideDocumentPath(legacyTarget), searchParams));

  const document = getDocument(requestedSlug);
  if (!document) notFound();

  const part = partForDocument(document);
  const headings = document.headings.filter((heading) => heading.depth === 2);
  const { previous, next } = adjacentDocuments(requestedSlug);
  const label = chapterLabel(document);
  const crumb = part ? `Part ${part.number} — ${part.verb}` : document.section;
  const crumbHref = part
    ? `${GUIDE_ROUTES.home}#${part.id}`
    : document.sectionKey === "appendix"
      ? GUIDE_ROUTES.topics
      : GUIDE_ROUTES.home;
  const canonical = guideContentPath(document.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: document.title,
    description: document.description,
    url: absoluteGuideUrl(canonical),
    isPartOf: {
      "@type": "Book",
      name: "The AI Software Factory Guide",
      url: absoluteGuideUrl(GUIDE_ROUTES.home),
    },
    ...(document.chapter ? { position: document.chapter } : {}),
  };

  return (
    <>
      <LegacyAnchorRedirect currentSlug={requestedSlug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main className="docs-layout">
        <DocumentNav currentSlug={requestedSlug} sections={navSections} />
        <article className="document-article">
          <nav className="document-breadcrumb" aria-label="Breadcrumb"><Link href={GUIDE_ROUTES.home}>Guide</Link><span>/</span><Link href={crumbHref}>{crumb}</Link></nav>
          <header className="document-header">
            <div className="document-labels">{part && <span>Part {part.number} — {part.verb}</span>}{document.stage !== null && <span>The factory in one line</span>}<span>{label}</span>{!part && document.stage === null && document.contentType !== "overview" && <span>{document.contentType}</span>}</div>
            <h1>{document.chapter ? `${document.chapter}. ${document.title}` : document.title}</h1>
            {document.summary && <p>{document.summary}</p>}
          </header>
          {isMissionControlStatusDocument(document.slug, document.contentType) && <MissionControlStatusNotice />}
          <ChapterTOC variant="mobile" headings={headings.map((heading) => ({ id: heading.id, text: heading.text }))} />
          <div className="markdown-body"><Markdown content={document.content} sourcePath={document.sourcePath} infographicAssets={"infographicAssets" in document ? (document.infographicAssets as Record<string, string>) : {}} /></div>
          <nav className="document-pagination" aria-label="Previous and next">
            {previous ? <Link href={guideContentPath(previous.slug)}><span>Previous · {chapterLabel(previous)}</span><strong>{previous.title}</strong></Link> : <span />}
            {next ? <Link className="next-document" href={guideContentPath(next.slug)}><span>Next · {chapterLabel(next)}</span><strong>{next.title}</strong></Link> : <span />}
          </nav>
        </article>
        <ChapterTOC headings={headings.map((heading) => ({ id: heading.id, text: heading.text }))} />
      </main>
      <SiteFooter />
    </>
  );
}
