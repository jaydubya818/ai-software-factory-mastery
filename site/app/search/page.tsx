import type { Metadata } from "next";
import { SearchExperience } from "../components/SearchExperience";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Search · AI Software Factory Mastery",
  description: "Search the complete AI Software Factory guide.",
};

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
