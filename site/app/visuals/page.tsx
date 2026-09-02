import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { VisualAtlas } from "../components/VisualAtlas";

export const metadata: Metadata = {
  title: "Atlas · The AI Software Factory Guide",
  description: "A readable visual atlas of the lifecycle, engineering stack, orchestration, agent patterns, memory, loops, governance, observability, protocols, and operator control model.",
};

export default function VisualsPage() {
  return (
    <>
      <SiteHeader />
      <main className="interior-page visual-guide-page">
        <header className="visual-guide-hero">
          <div>
            <span className="eyebrow">Atlas</span>
            <h1>See the whole factory. Then follow each boundary.</h1>
          </div>
          <div>
            <p>Ten original, readable system maps turn the guide into one connected mental model. Every map links to the chapter behind it.</p>
            <div className="hero-actions"><Link className="button button-primary" href="/guide">Table of contents</Link><Link className="button button-secondary" href="/architecture">Inspect the architecture explorer</Link></div>
          </div>
        </header>
        <div className="visual-guide-note"><strong>Designed for retention</strong><span>No screenshots with tiny labels. The diagrams are semantic HTML, responsive on mobile, keyboard accessible, and readable at normal zoom.</span></div>
        <VisualAtlas />
      </main>
      <SiteFooter />
    </>
  );
}
