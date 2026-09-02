import Link from "next/link";
import { stages } from "../../lib/content";

const stageMeta: Record<number, { name: string; owns: string; who: string }> = {
  1: { name: "Builder Intent", owns: "A builder states the outcome. The factory turns it into objective, constraints, acceptance criteria, and risk — an immutable Mission Spec.", who: "Human states intent" },
  2: { name: "Plan", owns: "Intent becomes an executable contract: a versioned Plan, task graph, Quality Contract, and governed WorkOrders. A human approves one exact revision.", who: "Agent plans · Human approves" },
  3: { name: "Define Agent", owns: "A versioned Agent Definition, model route, tools, and authority are frozen into an execution manifest. The model is a component, not the workflow.", who: "Control plane binds" },
  4: { name: "Execute through Harness", owns: "The model reasons; the harness controls. State, leases, budgets, checkpoints, tool authorization, and recovery live outside the model.", who: "Model reasons · Harness controls" },
  5: { name: "Apply Skills", owns: "Versioned, evaluated capabilities are bound before execution and applied inside the loop. Reason where it creates value; automate what becomes deterministic.", who: "Agent Factory supplies" },
  6: { name: "Evaluate", owns: "Generation is cheap; evidence creates trust. Execution, outcome, and policy correctness are verified independently, and currentness decides readiness.", who: "Independent verifier proves" },
  7: { name: "Improve", owns: "Learning is autonomous; promotion is governed. Signals become diagnosed improvements that must beat a baseline before they change production.", who: "Agents discover · Humans promote" },
  8: { name: "Deliver Software", owns: "Risk-tiered review, human acceptance, and an exact-current PR gate. Merge, deployment, activation, and production verification stay separate states.", who: "Human accepts · Policy gates" },
};

function Row({ numbers, label }: { numbers: number[]; label: string }) {
  return (
    <ol className="pipeline-row" aria-label={label}>
      {numbers.map((n) => {
        const doc = stages.find((s) => s.stage === n);
        const meta = stageMeta[n];
        return (
          <li className="pipeline-item" key={n}>
            <Link href={doc ? `/docs/${doc.slug}` : "/guide#stages"}>
              <span className="pipeline-node" aria-hidden="true">{n}</span>
              <span className="pipeline-stage">{meta.who}</span>
              <h3>{meta.name}</h3>
              <p>{meta.owns}</p>
              <em>How it works →</em>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

export function Pipeline() {
  return (
    <div className="pipeline">
      <p className="sr-only">Intent → Plan → Define Agent → Execute through Harness → Apply Skills → Evaluate → Improve → Deliver Software</p>
      <Row numbers={[1, 2, 3, 4]} label="Stages one to four" />
      <div className="pipeline-continue" aria-hidden="true"><span>continues</span></div>
      <Row numbers={[5, 6, 7, 8]} label="Stages five to eight" />
      <div className="pipeline-flows">
        <div><b>↓</b><strong>Control flows down</strong><span>Intent → authority → execution contract → bounded action</span></div>
        <div><b>↑</b><strong>Evidence flows up</strong><span>Observation → proof → decision → outcome → improvement</span></div>
      </div>
    </div>
  );
}
