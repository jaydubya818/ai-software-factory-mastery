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
        <section className="guide-orientation" aria-labelledby="engineering-atlas-title">
          <div><span className="section-kicker">Factory engineering</span><h2 id="engineering-atlas-title">Follow knowledge, proof, authority and improvement.</h2><p>Four native teaching figures show the validation gates and failure paths. Each opens full-size within its canonical chapter.</p>
          <ul><li><Link href="/guide/03-build/19-data-knowledge-and-semantic-engineering#organizational-knowledge-as-production-infrastructure">Knowledge validation and the payment example</Link></li><li><Link href="/guide/04-prove/27-quality-and-evidence-architecture#protected-criteria-and-release-authority">Independent verification and release authority</Link></li><li><Link href="/guide/02-design/07-governance-policy-and-risk-proportional-approval#autonomous-operating-domains">Operating domains and human decision rights</Link></li><li><Link href="/guide/06-improve/40-governed-learning#production-failure-to-qualified-factory-improvement">Production feedback and governed improvement</Link></li></ul></div>
        </section>

        <VisualAtlas />
        <section className="guide-orientation" aria-labelledby="enterprise-atlas-title">
          <div><span className="section-kicker">Enterprise delivery</span><h2 id="enterprise-atlas-title">One objective, multiple qualified factories.</h2><p>Explore the enterprise architecture poster with readable explanations of three routing levels, governed WorkOrder dependencies, local and global verification, immutable versions, and release authority.</p><Link className="button button-secondary" href="/guide/appendix/enterprise-multi-factory-delivery">Read the enterprise diagram companion</Link></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
