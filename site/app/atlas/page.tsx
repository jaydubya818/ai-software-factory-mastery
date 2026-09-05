import { permanentRedirect } from "next/navigation";
import { GUIDE_ROUTES, guideNavigationHref, type GuideSearchParams, withSearchParams } from "../../lib/paths";

export default async function LegacyAtlasPage({ searchParams }: { searchParams: Promise<GuideSearchParams> }) {
  permanentRedirect(withSearchParams(guideNavigationHref(GUIDE_ROUTES.atlas), await searchParams));
}
