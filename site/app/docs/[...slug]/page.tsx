import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { adjacentDocuments, documents, getDocument } from "../../../lib/content";
import { DocumentNav } from "../../components/DocumentNav";
import { Markdown } from "../../components/Markdown";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

type PageProps = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return documents.map((document) => ({ slug: document.slug.split("/") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = getDocument(slug.join("/"));
  if (!document) return { title: "Document not found" };

  const title = `${document.title} · AI Software Factory Mastery`;
  return {
    title,
    description: document.description,
    openGraph: { title, description: document.description, images: [] },
    twitter: { card: "summary", title, description: document.description, images: [] },
  };
}

export default async function DocumentPage({ params }: PageProps) {
  const { slug } = await params;
  const currentSlug = slug.join("/");
  const document = getDocument(currentSlug);
  if (!document) notFound();
  const { previous, next } = adjacentDocuments(currentSlug);

  return (
    <>
      <SiteHeader />
      <main className="docs-layout">
        <DocumentNav currentSlug={currentSlug} />
        <article className="document-article">
          <div className="document-breadcrumb">
            <a href="/topics">Curriculum</a><span>/</span><span>{document.section}</span>
          </div>
          <header className="document-header">
            <div className="document-labels">
              <span>{document.section}</span>
              <span>{document.readingMinutes} min read</span>
              {document.hasQuickRead && <span>Quick Read included</span>}
            </div>
            <h1>{document.title}</h1>
            <p>{document.description}</p>
            <div className="document-status">
              <span>Status: {document.status.replaceAll("-", " ")}</span>
              {document.lastVerified && <span>Verified {document.lastVerified}</span>}
            </div>
          </header>
          <div className="markdown-body">
            <Markdown content={document.content} sourcePath={document.sourcePath} />
          </div>
          <nav className="document-pagination" aria-label="Adjacent documents">
            {previous ? (
              <a href={`/docs/${previous.slug}`}><span>Previous</span><strong>{previous.title}</strong></a>
            ) : <span />}
            {next ? (
              <a className="next-document" href={`/docs/${next.slug}`}><span>Next</span><strong>{next.title}</strong></a>
            ) : <span />}
          </nav>
        </article>
        <aside className="table-of-contents" aria-label="On this page">
          <span>On this page</span>
          <ol>
            {document.headings.filter((heading) => heading.depth === 2).map((heading, index) => (
              <li key={`${heading.id}-${index}`}><a href={`#${heading.id}`}>{heading.text}</a></li>
            ))}
          </ol>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
