import { notFound, permanentRedirect } from "next/navigation";
import { getDocument } from "../../../lib/content";
import { GuideDocument, guideDocumentMetadata } from "../../components/GuideDocument";
import { legacyDocumentRedirects } from "../../../lib/legacy-routes";
import {
  guideContentPath,
  GUIDE_COMPATIBLE_MODE,
  guideNavigationHref,
  type GuideSearchParams,
  withSearchParams,
} from "../../../lib/paths";

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<GuideSearchParams>;
};

export async function generateMetadata({ params }: PageProps) {
  return GUIDE_COMPATIBLE_MODE ? guideDocumentMetadata((await params).slug.join("/")) : {};
}

/** Compatibility surface for links to the Guide's former standalone route tree. */
export default async function LegacyDocumentRoute({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const requestedSlug = slug.join("/");
  const canonicalSlug = legacyDocumentRedirects[requestedSlug] ?? requestedSlug;
  if (!getDocument(canonicalSlug)) notFound();

  if (GUIDE_COMPATIBLE_MODE && requestedSlug === canonicalSlug) {
    return <GuideDocument requestedSlug={canonicalSlug} searchParams={query} />;
  }

  permanentRedirect(withSearchParams(guideNavigationHref(guideContentPath(canonicalSlug)), query));
}
