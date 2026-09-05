import { permanentRedirect } from "next/navigation";
import { GUIDE_ROUTES, GUIDE_COMPATIBLE_MODE, type GuideSearchParams, withSearchParams } from "../../lib/paths";
import CompatiblePage, { metadata as compatibleMetadata } from "../guide/search/page";

export const metadata = GUIDE_COMPATIBLE_MODE ? compatibleMetadata : {};

export default async function LegacySearchPage({ searchParams }: { searchParams: Promise<GuideSearchParams> }) {
  if (GUIDE_COMPATIBLE_MODE) return <CompatiblePage />;
  permanentRedirect(withSearchParams(GUIDE_ROUTES.search, await searchParams));
}
