import Link from "next/link";
import { StatusBadge } from "./StatusBadge";

type Related = { slug: string; title: string; section: string; status: string; contentType: string; readingMinutes: number };

export function RelatedContent({ documents }: { documents: Related[] }) {
  if (!documents.length) return null;
  return <section className="related-content" aria-labelledby="related-content-title"><header><span className="section-kicker">Continue through the system</span><h2 id="related-content-title">Related curriculum</h2></header><div>{documents.map((document) => <Link href={`/docs/${document.slug}`} key={document.slug}><span><StatusBadge status={document.status} /><small>{document.section} · {document.contentType}</small></span><strong>{document.title}</strong><em>{document.readingMinutes} min →</em></Link>)}</div></section>;
}
