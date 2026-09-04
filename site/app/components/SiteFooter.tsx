import Link from "next/link";
import { fdlcUrl, GUIDE_ROUTES, guideDocumentPath } from "../../lib/paths";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <a className="brand footer-brand" href={fdlcUrl()}>
          <span className="brand-mark" aria-hidden="true">F</span>
          <span className="brand-copy">
            <strong>FDLC</strong>
            <small>The Guide</small>
          </span>
        </a>
        <p>The practical guide to the Factory Development Lifecycle.</p>
      </div>
      <div className="footer-links">
        <a href={fdlcUrl("/framework")}>FDLC framework</a>
        <a href={fdlcUrl("/mission-control")}>Mission Control</a>
        <Link href={GUIDE_ROUTES.home}>Table of contents</Link>
        <Link href={GUIDE_ROUTES.atlas}>Atlas</Link>
        <Link href={GUIDE_ROUTES.topics}>Reference</Link>
        <Link href={GUIDE_ROUTES.glossary}>Glossary</Link>
        <Link href={GUIDE_ROUTES.architecture}>Architecture explorer</Link>
        <Link href={GUIDE_ROUTES.coverage}>Coverage and maturity</Link>
        <Link href={guideDocumentPath("appendix/reviewer-guide")}>Reviewer guide</Link>
        <Link href={guideDocumentPath("appendix/changelog")}>Changelog</Link>
        <Link href={guideDocumentPath("appendix/research/initial-canon")}>Research canon</Link>
        <a href="https://github.com/jaydubya818/ai-software-factory-mastery/issues">Give feedback</a>
      </div>
    </footer>
  );
}
