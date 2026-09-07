import type { Metadata } from "next";
import Link from "../../components/GuideLink";
import { guidePageMetadata } from "../../../lib/metadata";
import { GUIDE_ROUTES } from "../../../lib/paths";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { VisualAtlas } from "../../components/VisualAtlas";

export const metadata: Metadata = guidePageMetadata({
  title: "Atlas · The AI Software Factory Guide",
  description: "A readable visual atlas of detail, implementation, operating, and reference lenses supporting the guide's eight-stage value stream and six-area architecture.",
  canonical: GUIDE_ROUTES.atlas,
});

export default function VisualsPage() {
  return (
    <>
      <SiteHeader />
      <main className="interior-page visual-guide-page" id="main-content" tabIndex={-1}>
        <header className="visual-guide-hero">
          <div>
            <span className="eyebrow">Atlas</span>
            <h1>See the whole factory. Then follow each boundary.</h1>
          </div>
          <div>
            <p>The eight-stage value stream is the primary model; the six-area architecture assigns responsibility. These ten maps are narrower detail, implementation, operating, or reference lenses, each linked to its canonical chapter.</p>
            <div className="hero-actions"><Link className="button button-primary" href={GUIDE_ROUTES.home}>Table of contents</Link><Link className="button button-secondary" href={GUIDE_ROUTES.architecture}>Inspect the architecture explorer</Link></div>
          </div>
        </header>
        <div className="visual-guide-note"><strong>Designed for retention</strong><span>No screenshots with tiny labels. The diagrams are semantic HTML, responsive on mobile, keyboard accessible, and readable at normal zoom.</span></div>
        <VisualAtlas />
        <section className="guide-orientation" aria-labelledby="enterprise-atlas-title">
          <div><span className="section-kicker">Enterprise delivery</span><h2 id="enterprise-atlas-title">One objective, multiple qualified factories.</h2><p>Explore the enterprise architecture poster with readable explanations of three routing levels, governed WorkOrder dependencies, local and global verification, immutable versions, and release authority.</p><Link className="button button-secondary" href="/guide/appendix/enterprise-multi-factory-delivery">Read the enterprise diagram companion</Link></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
