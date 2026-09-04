import { notFound, permanentRedirect } from "next/navigation";
import { getDocument } from "../../../lib/content";
import { legacyDocumentRedirects } from "../../../lib/legacy-routes";
import {
  guideContentPath,
  type GuideSearchParams,
  withSearchParams,
} from "../../../lib/paths";

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<GuideSearchParams>;
};

/** Compatibility surface for links to the Guide's former standalone route tree. */
export default async function LegacyDocumentRoute({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const requestedSlug = slug.join("/");
  const canonicalSlug = legacyDocumentRedirects[requestedSlug] ?? requestedSlug;
  if (!getDocument(canonicalSlug)) notFound();

  permanentRedirect(withSearchParams(guideContentPath(canonicalSlug), query));
}
