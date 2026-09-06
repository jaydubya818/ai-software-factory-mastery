import type { Metadata } from "next";
import { GuideDocument, guideDocumentMetadata } from "../../components/GuideDocument";

export const metadata: Metadata = guideDocumentMetadata("appendix/glossary");

export default function GlossaryPage() {
  return <GuideDocument requestedSlug="appendix/glossary" allowGlossaryAlias />;
}
