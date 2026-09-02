import Link from "next/link";
type Related = { slug: string; title: string; section: string; contentType: string };

export function RelatedContent({ documents }: { documents: Related[] }) {
  if (!documents.length) return null;
  return <section className="related-content" aria-labelledby="related-content-title"><header><span className="section-kicker">Continue through the system</span><h2 id="related-content-title">Related guide chapters</h2></header><div>{documents.map((document) => <Link href={`/docs/${document.slug}`} key={document.slug}><span><small>{document.section} · {document.contentType}</small></span><strong>{document.title}</strong><em>Read chapter →</em></Link>)}</div></section>;
}
