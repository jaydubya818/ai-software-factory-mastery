import { permanentRedirect } from "next/navigation";
import { GUIDE_ROUTES, GUIDE_COMPATIBLE_MODE, type GuideSearchParams, withSearchParams } from "../../lib/paths";
import CompatiblePage, { metadata as compatibleMetadata } from "../guide/coverage/page";

export const metadata = GUIDE_COMPATIBLE_MODE ? compatibleMetadata : {};

export default async function LegacyCoveragePage({ searchParams }: { searchParams: Promise<GuideSearchParams> }) {
  if (GUIDE_COMPATIBLE_MODE) return <CompatiblePage />;
  permanentRedirect(withSearchParams(GUIDE_ROUTES.coverage, await searchParams));
}
