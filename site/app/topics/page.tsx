import type { Metadata } from "next";
import { documents, sections } from "../../lib/content";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Topic Index · AI Software Factory Mastery",
  description: "Browse the complete AI Software Factory curriculum by architecture area and topic.",
};

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
            <p>{documents.length} curriculum documents organized by responsibility, not product category.</p>
            <a className="button button-primary" href="/search">Search everything</a>
          </div>
        </header>
        <div className="section-index">
          {sections.map((section, sectionIndex) => (
            <section className="section-group" key={section.key}>
              <header>
                <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
                <h2>{section.label}</h2>
                <small>{section.documents.length} {section.documents.length === 1 ? "document" : "documents"}</small>
              </header>
              <div className="section-documents">
                {section.documents.map((document) => (
                  <a href={`/docs/${document.slug}`} key={document.slug}>
                    <div>
                      <h3>{document.title}</h3>
                      <p>{document.description}</p>
                    </div>
                    <span>{document.readingMinutes} min</span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
