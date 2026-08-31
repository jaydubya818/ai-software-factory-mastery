import Link from "next/link";

export function ChapterReviewCard({ slug, title }: { slug: string; title: string }) {
  const pageUrl = `https://ai-software-factory-mastery.vercel.app/docs/${slug}`;
  const issueTitle = encodeURIComponent(`Review feedback: ${title}`);
  const issueBody = encodeURIComponent([
    `Page: ${pageUrl}`,
    "",
    "Feedback category: claim / architecture / security / curriculum / usability / terminology / source",
    "",
    "What is unclear, incorrect, missing, or unsupported?",
    "",
    "Why does it matter?",
    "",
    "Suggested change or supporting evidence:",
  ].join("\n"));
  const issueUrl = `https://github.com/jaydubya818/ai-software-factory-mastery/issues/new?title=${issueTitle}&body=${issueBody}`;

  return (
    <section className="chapter-review-card" aria-labelledby="chapter-review-title">
      <div>
        <span className="section-kicker">External review</span>
        <h2 id="chapter-review-title">Review this chapter.</h2>
        <p>Challenge a claim, boundary, missing failure mode, unclear term, or unsupported evidence statement.</p>
      </div>
      <ul aria-label="Useful review lenses">
        <li>Claim</li>
        <li>Boundary</li>
        <li>Failure</li>
        <li>Evidence</li>
      </ul>
      <div className="chapter-review-actions">
        <Link className="button button-secondary" href="/docs/00-overview/09-reviewer-guide">Reviewer guide</Link>
        <a className="button button-primary" href={issueUrl} target="_blank" rel="noreferrer">Report feedback <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
