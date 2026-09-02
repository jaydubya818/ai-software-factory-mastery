import Link from "next/link";
import { lifecycleStages } from "../../lib/lifecycle";

/** Which chapter each lifecycle phase opens into. */
const phaseChapters: Record<string, string> = {
  intent: "/docs/02-design/06-intent-and-specification-engineering",
  plan: "/docs/02-design/06-intent-and-specification-engineering",
  execute: "/docs/03-build/13-coding-harnesses-and-agent-protocols",
  verify: "/docs/04-prove/21-quality-and-evidence-architecture",
  deliver: "/docs/04-prove/25-cicd-progressive-delivery-and-production-verification",
  learn: "/docs/06-improve/33-governed-learning-and-compounding-engineering",
};

export function ValueStream({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "value-stream value-stream-compact" : "value-stream"}>
      <ol className="atlas-lifecycle">
        {lifecycleStages.map((stage, index) => (
          <li id={`phase-${stage.id}`} key={stage.id}>
            <Link href={phaseChapters[stage.id] ?? "/guide"} className="value-stream-phase">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small className="value-stream-canonical">{stage.canonical}</small>
              <h3>{stage.label}</h3>
              <p>{stage.detail}</p>
              <ul>{stage.concepts.map((concept) => <li key={concept}>{concept}</li>)}</ul>
            </Link>
          </li>
        ))}
      </ol>
      <div className="atlas-flow-note">
        <strong>Control flows down</strong>
        <span>Intent → authority → execution contract → bounded action</span>
        <strong>Evidence flows up</strong>
        <span>Observation → proof → decision → outcome → improvement</span>
      </div>
    </div>
  );
}
