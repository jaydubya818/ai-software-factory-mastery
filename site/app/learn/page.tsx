import type { Metadata } from "next";
import Link from "next/link";
import { documents } from "../../lib/content";
import { learningPathBlueprints } from "../../lib/curriculum";
import { LearningDashboard } from "../components/LearningDashboard";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Learning Paths · AI Software Factory Mastery",
  description: "Choose a path, track progress, continue learning, and practice the complete governed software factory curriculum.",
};

export default function LearnPage() {
  const paths = learningPathBlueprints.map((path) => {
    const pathDocuments = path.id === "deep-study" ? documents : documents.filter((document) => path.slugs.some((slug) => slug === document.slug));
    return {
      ...path,
      chapters: pathDocuments.map((document) => ({
        slug: document.slug,
        title: document.title,
        section: document.section,
        status: document.status,
        readingMinutes: document.readingMinutes,
        hasLab: document.hasLab,
        hasWhiteboardExercise: document.hasWhiteboardExercise,
        hasInterviewQuestions: document.hasInterviewQuestions,
      })),
    };
  });

  return (
    <>
      <SiteHeader />
      <main className="interior-page learn-page">
        <header className="page-intro split-intro">
          <div><span className="eyebrow">Structured mastery</span><h1>Learn the whole system at the right depth.</h1></div>
          <div><p>Select a path, keep honest progress on this device, and move from explanation to architecture to implementation.</p><div className="topic-intro-actions"><Link className="button button-primary" href="/architecture">Orient with architecture</Link><Link className="button button-secondary" href="/topics">Browse curriculum</Link></div></div>
        </header>
        <LearningDashboard paths={paths} />
      </main>
      <SiteFooter />
    </>
  );
}
