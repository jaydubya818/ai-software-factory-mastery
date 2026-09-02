import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adjacentDocuments, documents, getDocument, quickReadContent, relatedDocuments, sections, withoutQuickRead } from "../../../lib/content";
import { ChapterTOC } from "../../components/ChapterTOC";
import { DocumentNav } from "../../components/DocumentNav";
import { EvidenceCard } from "../../components/EvidenceCard";
import { Markdown } from "../../components/Markdown";
import { QuickRead } from "../../components/QuickRead";
import { RelatedContent } from "../../components/RelatedContent";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { StatusBadge } from "../../components/StatusBadge";

type PageProps = { params: Promise<{ slug: string[] }> };

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

export default async function DocumentPage({ params }: PageProps) {
  const { slug } = await params;
  const currentSlug = slug.join("/");
  const document = getDocument(currentSlug);
  if (!document) notFound();

  const quickRead = quickReadContent(document.content);
  const bodyContent = quickRead ? withoutQuickRead(document.content) : document.content;
  const headings = document.headings.filter((heading) => heading.depth === 2 && !/^quick read$/i.test(heading.text));
  const { previous, next } = adjacentDocuments(currentSlug);
  const related = relatedDocuments(currentSlug).map((item) => ({ slug: item.slug, title: item.title, section: item.section, contentType: item.contentType }));
  const navSections = sections.map((section) => ({ key: section.key, label: section.label, documents: section.documents.map((item) => ({ slug: item.slug, title: item.title })) }));
  const isCaseStudy = String(document.sectionKey) === "09-mission-control-case-studies";

  return (
    <>
      <SiteHeader />
      <main className="docs-layout">
        <DocumentNav currentSlug={currentSlug} sections={navSections} />
        <article className="document-article">
          <nav className="document-breadcrumb" aria-label="Breadcrumb"><Link href="/guide">Guide</Link><span>/</span><Link href={`/topics?section=${encodeURIComponent(document.section)}`}>{document.section}</Link></nav>
          <header className="document-header">
            <div className="document-labels"><span>{document.section}</span><span>{document.contentType === "interview" ? "reference" : document.contentType}</span>{document.labType && <span>{document.labType.replaceAll("-", " ")} lab</span>}</div>
            <h1>{document.title}</h1>
            <p>{document.description}</p>
            <div className="document-status"><StatusBadge status={document.status} prefix /><span>Risk: {document.risk.replaceAll("-", " ")}</span>{document.lastVerified && <span>Reviewed {document.lastVerified}</span>}<Link href="/coverage#maturity-title">How to interpret evidence →</Link></div>
            <div className="document-scope-note"><strong>Evidence boundary</strong><span>{isCaseStudy ? "This case study carries scoped implementation evidence. Follow its pinned sources, dates, and stated gaps." : document.hasImplementationEvidence ? "This chapter references implementation evidence. Inspect its exact source, subject, version, and remaining gaps before treating a claim as proven." : "This chapter explains architecture and operating practice. It does not by itself prove that a production implementation exists."}</span></div>
          </header>
          {quickRead && <QuickRead content={quickRead} sourcePath={document.sourcePath} />}
          <div className="markdown-body"><Markdown content={bodyContent} sourcePath={document.sourcePath} /></div>
          {(document.hasImplementationEvidence || isCaseStudy) && <EvidenceCard status={document.status} isCaseStudy={isCaseStudy} />}
          <RelatedContent documents={related} />
          <nav className="document-pagination" aria-label="Adjacent guide chapters">{previous ? <Link href={`/docs/${previous.slug}`}><span>Previous</span><strong>{previous.title}</strong></Link> : <span />}{next ? <Link className="next-document" href={`/docs/${next.slug}`}><span>Next</span><strong>{next.title}</strong></Link> : <span />}</nav>
        </article>
        <ChapterTOC headings={headings.map((heading) => ({ id: heading.id, text: heading.text }))} />
      </main>
      <SiteFooter />
    </>
  );
}
