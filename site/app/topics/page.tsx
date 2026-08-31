import type { Metadata } from "next";
import Link from "next/link";
import { documents } from "../../lib/content";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { TopicExplorer } from "../components/TopicExplorer";

export const metadata: Metadata = {
  title: "Topic Index · AI Software Factory Mastery",
  description: "Browse the complete AI Software Factory curriculum by architecture area and topic.",
};

const topicDocuments = documents.map((document) => ({
  slug: document.slug,
  title: document.title,
  section: document.section,
  status: document.status,
  audience: document.audience,
  lifecycle: document.lifecycle,
  risk: document.risk,
  description: document.description,
  readingMinutes: document.readingMinutes,
  labType: document.labType,
}));

export default function TopicsPage() {
  return (
    <>
      <SiteHeader />
      <main className="interior-page topics-page">
        <header className="page-intro split-intro">
          <div>
            <span className="eyebrow">Question-led discovery</span>
            <h1>Find the chapter behind the question.</h1>
          </div>
          <div>
            <p>{documents.length} curriculum documents. Filter by responsibility, persona, lifecycle phase, maturity, and risk.</p>
            <div className="topic-intro-actions">
              <a className="button button-primary" href="/search">Search everything</a>
              <Link className="button button-secondary" href="/architecture">View architecture</Link>
            </div>
          </div>
        </header>
        <TopicExplorer documents={topicDocuments} />
      </main>
      <SiteFooter />
    </>
  );
}
