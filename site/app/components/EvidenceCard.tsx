import Link from "next/link";
import { StatusBadge } from "./StatusBadge";

export function EvidenceCard({ status, isCaseStudy }: { status: string; isCaseStudy: boolean }) {
  return <section className="evidence-card"><div><span>Evidence boundary</span><h2>Guide maturity is not implementation proof.</h2><p>{isCaseStudy ? "This case study records scoped implementation claims. Inspect the exact evidence, commit references, gaps, and verification boundaries in the source below." : "This chapter defines architecture or practice. It does not by itself prove a corresponding production implementation."}</p></div><div className="evidence-status-stack"><span>Guide</span><StatusBadge status={status} /><span>Implementation evidence</span><strong>{isCaseStudy ? "Scoped in chapter" : "Not asserted here"}</strong><Link href="/docs/09-mission-control-case-studies/01-implementation-maturity-and-evidence-map">Inspect evidence map →</Link></div></section>;
}
