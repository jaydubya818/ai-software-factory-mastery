import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adjacentDocuments, appendixGroups, chapters, documents, getDocument, partForDocument } from "../../../lib/content";
import { guideParts } from "../../../lib/guide";
import { ChapterTOC } from "../../components/ChapterTOC";
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
  const title = `${document.title} · The AI Software Factory Guide`;
  return { title, description: document.description, openGraph: { title, description: document.description, images: [] }, twitter: { card: "summary", title, description: document.description, images: [] } };
}

function chapterLabel(document: (typeof documents)[number]) {
  if (document.chapter === 0) return "Front matter";
  if (document.chapter !== null) return `Chapter ${document.chapter}`;
  if (document.contentType === "overview") return "Book map";
  return document.group ?? "Appendix";
}

function navLabel(document: (typeof documents)[number]) {
  return document.chapter ? `${document.chapter}. ${document.title}` : document.title;
}

const navSections = [
  { key: "front-matter", label: "Front matter", documents: chapters.filter((document) => document.chapter === 0).map((document) => ({ slug: document.slug, title: document.title })) },
  ...guideParts.map((part) => ({
    key: part.id,
    label: `Part ${part.number} — ${part.verb}`,
    documents: chapters.filter((document) => (part.sectionKeys as readonly string[]).includes(document.sectionKey)).map((document) => ({ slug: document.slug, title: navLabel(document) })),
  })),
  ...appendixGroups.map((group) => ({ key: `appendix-${group.label}`, label: `Appendix — ${group.label}`, documents: group.documents.map((document) => ({ slug: document.slug, title: document.title })) })),
];

export default async function DocumentPage({ params }: PageProps) {
  const { slug } = await params;
  const currentSlug = slug.join("/");
  const document = getDocument(currentSlug);
  if (!document) notFound();

  const part = partForDocument(document);
  const headings = document.headings.filter((heading) => heading.depth === 2);
  const { previous, next } = adjacentDocuments(currentSlug);
  const label = chapterLabel(document);
  const crumb = part ? `Part ${part.number} — ${part.verb}` : document.section;
  const crumbHref = part ? `/guide#${part.id}` : document.sectionKey === "appendix" ? "/topics" : "/guide";

  return (
    <>
      <SiteHeader />
      <main className="docs-layout">
        <DocumentNav currentSlug={currentSlug} sections={navSections} />
        <article className="document-article">
          <nav className="document-breadcrumb" aria-label="Breadcrumb"><Link href="/guide">Guide</Link><span>/</span><Link href={crumbHref}>{crumb}</Link></nav>
          <header className="document-header">
            <div className="document-labels">{part && <span>Part {part.number} — {part.verb}</span>}<span>{label}</span>{!part && document.contentType !== "overview" && <span>{document.contentType}</span>}</div>
            <h1>{document.chapter ? `${document.chapter}. ${document.title}` : document.title}</h1>
            {document.summary && <p>{document.summary}</p>}
          </header>
          <div className="markdown-body"><Markdown content={document.content} sourcePath={document.sourcePath} infographicAssets={"infographicAssets" in document ? (document.infographicAssets as Record<string, string>) : {}} /></div>
          {document.infographics.length > 0 && (
            <aside className="infographic-slots" aria-label="Infographic slots in this chapter">
              <span>Infographic slots in this chapter</span>
              <ul>{document.infographics.map((slot) => <li key={slot}><code>{slot}</code></li>)}</ul>
            </aside>
          )}
          <nav className="document-pagination" aria-label="Previous and next">
            {previous ? <Link href={`/docs/${previous.slug}`}><span>Previous · {chapterLabel(previous)}</span><strong>{previous.title}</strong></Link> : <span />}
            {next ? <Link className="next-document" href={`/docs/${next.slug}`}><span>Next · {chapterLabel(next)}</span><strong>{next.title}</strong></Link> : <span />}
          </nav>
        </article>
        <ChapterTOC headings={headings.map((heading) => ({ id: heading.id, text: heading.text }))} />
      </main>
      <SiteFooter />
    </>
  );
}
