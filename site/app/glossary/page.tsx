import { permanentRedirect } from "next/navigation";
import { GUIDE_ROUTES, type GuideSearchParams, withSearchParams } from "../../lib/paths";

export default async function LegacyGlossaryPage({ searchParams }: { searchParams: Promise<GuideSearchParams> }) {
  permanentRedirect(withSearchParams(GUIDE_ROUTES.glossary, await searchParams));
}
