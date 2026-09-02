export const lifecycleStages = [
  {
    id: "intent",
    label: "Intent",
    detail: "Human purpose, outcomes, constraints, policy, risk, and acceptance expectations.",
    canonical: "Intent",
    concepts: ["Human intent", "Strategy", "Policy", "Risk", "Acceptance"],
  },
  {
    id: "plan",
    label: "Plan",
    detail: "Decomposition, executable specifications, contracts, authority, and acceptance criteria.",
    canonical: "Plan",
    concepts: ["Decomposition", "Specifications", "Contracts", "Authority", "Scope"],
  },
  {
    id: "execute",
    label: "Execute",
    detail: "Define agents, run through harnesses, apply skills, manage context, environments, and compute.",
    canonical: "Define Agent → Execute through Harness → Apply Skills",
    concepts: ["Agents", "Harnesses", "Skills", "Tools", "Runtime"],
  },
  {
    id: "verify",
    label: "Verify",
    detail: "Evaluate exact candidates through independent checks, evidence, provenance, and proof packages.",
    canonical: "Evaluate",
    concepts: ["Tests", "Evals", "Verification", "Evidence", "Provenance"],
  },
  {
    id: "deliver",
    label: "Deliver",
    detail: "Decision gates, merge, release, progressive deployment, production checks, and rollback.",
    canonical: "Deliver Software",
    concepts: ["Decision gates", "CI/CD", "Release", "Production", "Rollback"],
  },
  {
    id: "learn",
    label: "Learn",
    detail: "Observe outcomes, analyze failures, compare candidates, and govern improvements.",
    canonical: "Improve",
    concepts: ["Observability", "Feedback", "Replay", "Improvement", "Promotion"],
  },
] as const;

export type LifecycleStageId = (typeof lifecycleStages)[number]["id"];
