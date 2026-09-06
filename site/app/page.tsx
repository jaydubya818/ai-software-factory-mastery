import { permanentRedirect } from "next/navigation";
import { GUIDE_ROUTES, type GuideSearchParams, withSearchParams } from "../lib/paths";

/** Standalone deployments enter through the same canonical Guide landing page. */
export default async function LegacyGuideHome({ searchParams }: { searchParams: Promise<GuideSearchParams> }) {
  permanentRedirect(withSearchParams(GUIDE_ROUTES.home, await searchParams));
}
