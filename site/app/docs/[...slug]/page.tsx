import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { adjacentDocuments, contentForMode, documents, getDocument, markdownSections, quickReadContent, relatedDocuments, sections, withoutQuickRead } from "../../../lib/content";
import { ChapterActivityCard } from "../../components/ChapterActivityCard";
import { ChapterProgress } from "../../components/ChapterProgress";
import { ChapterTOC } from "../../components/ChapterTOC";
import { DocumentNav } from "../../components/DocumentNav";
import { EvidenceCard } from "../../components/EvidenceCard";
import { Markdown } from "../../components/Markdown";
import { ModeSwitcher } from "../../components/ModeSwitcher";
import { QuickRead } from "../../components/QuickRead";
import { RelatedContent } from "../../components/RelatedContent";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { StatusBadge } from "../../components/StatusBadge";

type PageProps = { params: Promise<{ slug: string[] }>; searchParams: Promise<{ mode?: string }> };
const validModes = new Set(["read", "architecture", "study", "interview"]);

function requestedMode(value: unknown) {
  if (!value || typeof value !== "object") return "read";
  const candidate = value as { mode?: unknown; get?: (key: string) => unknown };
  const raw = typeof candidate.get === "function" ? candidate.get("mode") : candidate.mode;
  return typeof raw === "string" && validModes.has(raw) ? raw as keyof typeof modeDescriptions : "read";
}

export function generateStaticParams() {
  return documents.map((document) => ({ slug: document.slug.split("/") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = getDocument(slug.join("/"));
  if (!document) return { title: "Document not found" };
  const title = `${document.title} · AI Software Factory Mastery`;
  return { title, description: document.description, openGraph: { title, description: document.description, images: [] }, twitter: { card: "summary", title, description: document.description, images: [] } };
}

const modeDescriptions = {
  read: "Complete source chapter",
  architecture: "A focused view of boundaries, contracts, state, authority, failure paths, and tradeoffs drawn from this chapter.",
  study: "A rapid review of the chapter’s existing Quick Read, principles, definitions, lessons, and review material.",
  interview: "Question framing, tradeoffs, whiteboard material, and supporting concepts drawn from the curriculum.",
};

export default async function DocumentPage({ params, searchParams }: PageProps) {
  const { slug } = await params; const query = await searchParams; const currentSlug = slug.join("/");
  const document = getDocument(currentSlug); if (!document) notFound();
  const mode = requestedMode(query);
  const quickRead = quickReadContent(document.content);
  const filteredContent = contentForMode(document.content, mode);
  const bodyContent = quickRead ? withoutQuickRead(filteredContent) : filteredContent;
  const headings = document.headings.filter((heading) => heading.depth === 2 && (mode === "read" || bodyContent.includes(`## ${heading.text}`)));
  const { previous, next } = adjacentDocuments(currentSlug);
  const related = relatedDocuments(currentSlug).map((item) => ({ slug: item.slug, title: item.title, section: item.section, status: item.status, contentType: item.contentType, readingMinutes: item.readingMinutes }));
  const navSections = sections.map((section) => ({ key: section.key, label: section.label, documents: section.documents.map((item) => ({ slug: item.slug, title: item.title })) }));
  const validationHeading = document.headings.find((heading) => /pass criteria|validation criteria|required evidence/i.test(heading.text));
  const isCaseStudy = String(document.sectionKey) === "09-mission-control-case-studies";
  const sourceSections = markdownSections(document.content);
  const whiteboardSection = sourceSections.find((section) => /whiteboard/i.test(section.title));
  const interviewSection = sourceSections.find((section) => /interview|discussion questions/i.test(section.title));
  const activityContent = (section?: { content: string }) => section?.content.replace(/^##\s+.+$/m, "").trim();
  const activityMeta = [...document.architectureLayers.slice(0, 3).map((layer) => layer.replaceAll("-", " ")), `${document.readingMinutes} min chapter`];

  return (
    <>
      <SiteHeader />
      <ChapterProgress slug={currentSlug} title={document.title} />
      <main className="docs-layout">
        <DocumentNav currentSlug={currentSlug} sections={navSections} />
        <article className="document-article">
          <div className="document-breadcrumb"><a href="/topics">Curriculum</a><span>/</span><a href={`/topics?section=${encodeURIComponent(document.section)}`}>{document.section}</a><span>/</span><span>{modeDescriptions[mode]}</span></div>
          <header className="document-header">
            <div className="document-labels"><span>{document.section}</span><span>{document.readingMinutes} min read</span><span>{document.contentType}</span>{document.hasQuickRead && <span>Quick Read</span>}{document.labType && <span>{document.labType.replaceAll("-", " ")} lab</span>}</div>
            <h1>{document.title}</h1><p>{document.description}</p>
            <div className="document-status"><StatusBadge status={document.status} prefix /><span>Risk: {document.risk.replaceAll("-", " ")}</span>{document.lifecycle.length > 0 && <span>Lifecycle: {document.lifecycle.join(" · ")}</span>}{document.lastVerified && <span>Verified {document.lastVerified}</span>}</div>
          </header>
          <ModeSwitcher slug={currentSlug} active={mode} />
          {mode !== "read" && <div className="mode-context"><span>{mode} mode</span><p>{modeDescriptions[mode]}</p></div>}
          {quickRead && (mode === "read" || mode === "study") && <QuickRead content={quickRead} sourcePath={document.sourcePath} readingMinutes={document.readingMinutes} />}
          {document.hasLab && <ChapterActivityCard slug={currentSlug} description={document.description} kind="lab" meta={activityMeta} validationAnchor={validationHeading?.id} />}
          {document.hasWhiteboardExercise && <ChapterActivityCard slug={currentSlug} description="Reconstruct and defend this chapter’s architecture." kind="whiteboard" meta={activityMeta} validationAnchor={validationHeading?.id}>{activityContent(whiteboardSection) && <Markdown content={activityContent(whiteboardSection) ?? ""} sourcePath={document.sourcePath} />}</ChapterActivityCard>}
          {(mode === "interview" || document.hasInterviewQuestions) && <ChapterActivityCard slug={currentSlug} description="Explain the chapter’s thesis, boundaries, tradeoffs, and failure behavior." kind="interview" meta={activityMeta}>{activityContent(interviewSection) && <Markdown content={activityContent(interviewSection) ?? ""} sourcePath={document.sourcePath} />}</ChapterActivityCard>}
          <div className="markdown-body"><Markdown content={bodyContent} sourcePath={document.sourcePath} /></div>
          {(document.hasImplementationEvidence || isCaseStudy) && <EvidenceCard status={document.status} isCaseStudy={isCaseStudy} />}
          <RelatedContent documents={related} />
          <nav className="document-pagination" aria-label="Adjacent documents">{previous ? <a href={`/docs/${previous.slug}`}><span>Previous</span><strong>{previous.title}</strong></a> : <span />}{next ? <a className="next-document" href={`/docs/${next.slug}`}><span>Next</span><strong>{next.title}</strong></a> : <span />}</nav>
        </article>
        <ChapterTOC headings={headings.map((heading) => ({ id: heading.id, text: heading.text }))} />
      </main>
      <SiteFooter />
    </>
  );
}
