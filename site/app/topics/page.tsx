import type { Metadata } from "next";
import Link from "next/link";
import { documents } from "../../lib/content";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { TopicExplorer } from "../components/TopicExplorer";

export const metadata: Metadata = {
  title: "Reference Index · AI Software Factory Mastery",
  description: "Search and browse every chapter in the AI Software Factory field guide.",
};

const topicDocuments = documents.map((document) => ({
  slug: document.slug,
  title: document.title,
  section: document.section,
  contentType: document.contentType,
  description: document.description,
}));

export default function TopicsPage() {
  return (
    <>
      <SiteHeader />
      <main className="interior-page topics-page">
        <header className="page-intro split-intro">
          <div>
            <span className="eyebrow">Complete reference index</span>
            <h1>Find the exact concept without navigating a course.</h1>
          </div>
          <div>
            <p>Search all {documents.length} full chapters directly or browse one guide area. No persona, maturity, risk, lifecycle, or content-mode filters.</p>
            <div className="topic-intro-actions">
              <a className="button button-primary" href="/search">Search everything</a>
              <Link className="button button-secondary" href="/guide">Read the complete guide</Link>
            </div>
          </div>
        </header>
        <TopicExplorer documents={topicDocuments} />
      </main>
      <SiteFooter />
    </>
  );
}
