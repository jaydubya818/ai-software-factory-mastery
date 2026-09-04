import type { Metadata } from "next";
import { guidePageMetadata } from "../../../lib/metadata";
import { GUIDE_ROUTES } from "../../../lib/paths";
import { SearchExperience } from "../../components/SearchExperience";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

export const metadata: Metadata = guidePageMetadata({
  title: "Search · The AI Software Factory Guide",
  description: "Search the complete AI Software Factory guide.",
  canonical: GUIDE_ROUTES.search,
  noIndex: true,
});

export default function SearchPage() {
  return (
    <>
      <SiteHeader />
      <main className="interior-page search-page">
        <header className="page-intro compact-intro">
          <span className="eyebrow">Guide search</span>
          <h1>Search the whole system.</h1>
        </header>
        <SearchExperience />
      </main>
      <SiteFooter />
    </>
  );
}
