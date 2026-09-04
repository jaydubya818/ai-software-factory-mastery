import Link from "next/link";
import { stages } from "../../lib/content";
import { GUIDE_ROUTES, guideDocumentPath } from "../../lib/paths";

/** The eight stages of the factory's one line, with what each one owns. */
const stageMeta: Record<number, { verb: string; detail: string; concepts: string[] }> = {
  1: { verb: "Builder Intent", detail: "A builder states the outcome. The factory extracts objective, constraints, context, acceptance criteria, and risk into an immutable Mission Spec.", concepts: ["Objective", "Constraints", "Acceptance criteria", "Risk", "Mission Spec"] },
  2: { verb: "Plan", detail: "Intent becomes an executable contract: a versioned Plan, task graph, Quality Contract, and governed WorkOrders — one exact revision approved by a human.", concepts: ["Versioned Plan", "Task graph", "Quality Contract", "WorkOrder", "Human approval"] },
  3: { verb: "Define Agent", detail: "Bind a versioned Agent Definition, model route, tools, and authority into a frozen execution manifest. The model is a component, not the workflow.", concepts: ["Agent Definition", "Model routing", "Capability registry", "Execution manifest", "Factory Version"] },
  4: { verb: "Execute through Harness", detail: "The model reasons; the harness controls. Durable state, leases, budgets, checkpoints, tool authorization, and recovery live outside the model.", concepts: ["Execution loop", "Durable state", "Leases", "Idempotency", "Tool gateway"] },
  5: { verb: "Apply Skills", detail: "Skills are versioned, evaluated capabilities bound before execution and applied inside the loop. Reason where it creates value; automate what becomes deterministic.", concepts: ["Skills", "Tools & MCP", "Registries", "Maturity lifecycle", "Contribution model"] },
  6: { verb: "Evaluate", detail: "Generation is cheap; evidence creates trust. Execution, outcome, and policy correctness, independent verification, and currentness decide readiness.", concepts: ["Three levels", "Evals vs tests", "Independent verifier", "Evidence bundle", "Currentness"] },
  7: { verb: "Improve", detail: "Learning can be autonomous; promotion is governed. Signals become diagnosed improvements that must beat a baseline before they change production.", concepts: ["Feedback signals", "Diagnosis", "Baseline comparison", "Promotion gate", "Compounding"] },
  8: { verb: "Deliver Software", detail: "Risk-tiered review, human acceptance, and an exact-current PR gate; merge, deployment, activation, and production verification stay separate states.", concepts: ["Risk tiers", "Decision packet", "Acceptance", "Progressive delivery", "Production verification"] },
};

export function ValueStream({ compact = false }: { compact?: boolean }) {
  const ordered = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ n, doc: stages.find((s) => s.stage === n), meta: stageMeta[n] }));
  return (
    <div className={compact ? "value-stream value-stream-compact" : "value-stream"}>
      <ol className="atlas-lifecycle value-stream-eight">
        {ordered.map(({ n, doc, meta }) => (
          <li id={`stage-${n}`} key={n}>
            <Link href={doc ? guideDocumentPath(doc.slug) : `${GUIDE_ROUTES.home}#stages`} className="value-stream-phase">
              <span>{String(n).padStart(2, "0")}</span>
              <small className="value-stream-canonical">Stage {n}</small>
              <h3>{meta.verb}</h3>
              <p>{meta.detail}</p>
              {!compact && <ul>{meta.concepts.map((concept) => <li key={concept}>{concept}</li>)}</ul>}
              <em className="value-stream-cta">How it works →</em>
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
