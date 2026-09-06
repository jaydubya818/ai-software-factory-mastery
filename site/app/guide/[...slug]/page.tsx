import type { Metadata } from "next";
import { GuideDocument, guideDocumentMetadata } from "../../components/GuideDocument";
import { documents } from "../../../lib/content";
import type { GuideSearchParams } from "../../../lib/paths";

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<GuideSearchParams>;
};

export function generateStaticParams() {
  return documents
    .filter((document) => document.slug !== "guide" && document.slug !== "appendix/glossary")
    .map((document) => ({ slug: document.slug.split("/") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return guideDocumentMetadata(slug.join("/"));
}

export default async function DocumentRoute({ params, searchParams }: PageProps) {
  const { slug } = await params;
  return <GuideDocument requestedSlug={slug.join("/")} searchParams={await searchParams} />;
}
