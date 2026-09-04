export const legacyDocumentRedirects: Readonly<Record<string, string>> = {
  "02-design/09-multi-repository-design": "02-design/10-multi-repository-design",
  "03-build/10-the-agent-factory": "03-build/11-the-agent-factory",
  "03-build/11-control-plane-orchestrator-and-execution-plane": "03-build/13-control-plane-orchestrator-and-execution-plane",
  "03-build/12-durable-execution": "03-build/14-durable-execution",
  "03-build/13-coding-harnesses-and-agent-protocols": "03-build/15-coding-harnesses-and-agent-protocols",
  "03-build/14-development-environments-sandboxes-and-compute": "03-build/17-development-environments-sandboxes-and-compute",
  "03-build/15-agent-architecture": "03-build/18-agent-architecture",
  "03-build/16-data-knowledge-semantic-and-context-engineering": "03-build/19-data-knowledge-and-semantic-engineering",
  "03-build/17-models-routing-and-capability-selection": "03-build/21-models-and-capability-selection",
  "03-build/18-agent-and-loop-engineering": "03-build/23-agent-and-loop-engineering",
  "03-build/19-the-12-layer-production-ai-agent-stack": "03-build/25-the-12-layer-production-ai-agent-stack",
  "03-build/20-autonomous-engineering-workflows": "03-build/26-autonomous-engineering-workflows",
  "04-prove/21-quality-and-evidence-architecture": "04-prove/27-quality-and-evidence-architecture",
  "04-prove/22-testing-strategy-for-agentic-change": "04-prove/28-testing-strategy-for-agentic-change",
  "04-prove/23-evaluation-engineering": "04-prove/29-evaluation-engineering",
  "04-prove/24-quality-contracts-proof-packages-and-certificates": "04-prove/31-quality-contracts-proof-packages-and-certificates",
  "04-prove/25-cicd-progressive-delivery-and-production-verification": "04-prove/32-cicd-progressive-delivery-and-production-verification",
  "04-prove/26-security": "04-prove/33-security",
  "05-operate/27-the-factory-as-a-platform": "05-operate/34-the-factory-as-a-platform",
  "05-operate/28-observability-telemetry-and-forensics": "05-operate/35-observability-telemetry-and-forensics",
  "05-operate/29-resilience-incidents-and-the-control-tower": "05-operate/36-resilience-incidents-and-the-control-tower",
  "05-operate/30-control-surfaces-event-contracts-and-storage": "05-operate/37-control-surfaces-event-contracts-and-storage",
  "05-operate/31-enterprise-adoption-and-the-infrastructure-landscape": "05-operate/38-enterprise-adoption-and-the-infrastructure-landscape",
  "06-improve/32-production-feedback-review-and-the-agentic-merge-queue": "06-improve/39-production-feedback-review-and-the-agentic-merge-queue",
  "06-improve/33-governed-learning-and-compounding-engineering": "06-improve/40-governed-learning",
  "06-improve/34-mission-control-as-a-living-case-study": "06-improve/42-mission-control-as-a-living-case-study",
  "06-improve/35-mastering-the-factory": "06-improve/43-mastering-the-factory",
  "06-improve/36-where-this-is-going": "06-improve/44-where-this-is-going"
};

/** Summary pages retired from the former FDLC-site Guide portal. */
export const retiredFdlcSummaryRedirects: Readonly<Record<string, string>> = {
  understand: "01-understand/01-why-software-engineering-is-changing",
  design: "02-design/04-the-human-agent-operating-model",
  build: "03-build/11-the-agent-factory",
  prove: "04-prove/27-quality-and-evidence-architecture",
  operate: "05-operate/34-the-factory-as-a-platform",
  improve: "06-improve/39-production-feedback-review-and-the-agentic-merge-queue",
};

/** Resolve a legacy in-page anchor while retaining the current query string. */
export function legacyAnchorDestination(currentSlug: string, rawHash: string, search: string) {
  let anchor = rawHash.replace(/^#/, "");
  try {
    anchor = decodeURIComponent(anchor);
  } catch {
    return null;
  }
  if (!anchor) return null;

  const target = legacyAnchorRedirects[currentSlug]?.[anchor];
  if (!target) return null;

  const destination = new URL(target, "https://guide.invalid");
  destination.search = search;
  return `${destination.pathname}${destination.search}${destination.hash}`;
}

export const legacyAnchorRedirects: Readonly<Record<string, Readonly<Record<string, string>>>> = {
  "02-design/08-economics-metrics-and-human-attention": {
    "attribute-the-full-cost": "/guide/02-design/09-tokenomics-and-factory-economics#attribute-the-full-cost",
    "tokenomics-token-economics-is-an-architecture-problem": "/guide/02-design/09-tokenomics-and-factory-economics#tokenomics-token-economics-is-an-architecture-problem",
    "tokenomics-the-cost-equation": "/guide/02-design/09-tokenomics-and-factory-economics#tokenomics-the-cost-equation",
    "tokenomics-the-control-playbook": "/guide/02-design/09-tokenomics-and-factory-economics#tokenomics-the-control-playbook",
    "tokenomics-budgets-and-stopping-conditions-are-execution-controls": "/guide/02-design/09-tokenomics-and-factory-economics#tokenomics-budgets-and-stopping-conditions-are-execution-controls",
    "tokenomics-visibility-instead-of-caps": "/guide/02-design/09-tokenomics-and-factory-economics#tokenomics-visibility-instead-of-caps",
    "tokenomics-three-costs-and-the-measure-that-unites-them": "/guide/02-design/09-tokenomics-and-factory-economics#tokenomics-three-costs-and-the-measure-that-unites-them",
    "factory-economics-and-factory-roi": "/guide/02-design/09-tokenomics-and-factory-economics#factory-economics-and-factory-roi"
  },
  "03-build/11-the-agent-factory": {
    "what-a-good-skill-is": "/guide/03-build/12-skills-as-packages#what-a-good-skill-is",
    "the-maturity-lifecycle-reason-package-automate": "/guide/03-build/12-skills-as-packages#the-maturity-lifecycle-reason-package-automate",
    "skill-centric-architecture-and-the-skill-verifier-pair": "/guide/03-build/12-skills-as-packages#skill-centric-architecture-and-the-skill-verifier-pair",
    "factory-opinions-canonical-workflows-and-workflow-specialisation": "/guide/03-build/12-skills-as-packages#factory-opinions-canonical-workflows-and-workflow-specialisation",
    "the-factory-asset-lifecycle": "/guide/03-build/12-skills-as-packages#the-factory-asset-lifecycle"
  },
  "03-build/15-coding-harnesses-and-agent-protocols": {
    "harness-engineering": "/guide/03-build/16-harness-engineering#harness-engineering",
    "inner-loop-outer-loop-meta-loop": "/guide/03-build/16-harness-engineering#inner-loop-outer-loop-meta-loop",
    "harness-model-co-design-and-harness-profiles": "/guide/03-build/16-harness-engineering#harness-model-co-design-and-harness-profiles",
    "headless-execution-and-the-structured-event-stream": "/guide/03-build/16-harness-engineering#headless-execution-and-the-structured-event-stream",
    "lifecycle-sessions-checkpoints-and-compaction": "/guide/03-build/16-harness-engineering#lifecycle-sessions-checkpoints-and-compaction",
    "hooks-are-integration-points-not-authority": "/guide/03-build/16-harness-engineering#hooks-are-integration-points-not-authority",
    "driving-to-completion-with-bounded-loops": "/guide/03-build/16-harness-engineering#driving-to-completion-with-bounded-loops",
    "the-adapter-contract-and-the-capability-manifest": "/guide/03-build/16-harness-engineering#the-adapter-contract-and-the-capability-manifest",
    "adapter-admission-prohibited-authorities-and-required-external-controls": "/guide/03-build/16-harness-engineering#adapter-admission-prohibited-authorities-and-required-external-controls"
  },
  "03-build/19-data-knowledge-and-semantic-engineering": {
    "hierarchical-context-organisation-product-repository-change": "/guide/03-build/20-context-engineering#hierarchical-context-organisation-product-repository-change",
    "context-engineering-compile-for-the-decision-not-the-corpus": "/guide/03-build/20-context-engineering#context-engineering-compile-for-the-decision-not-the-corpus",
    "the-context-centric-factory": "/guide/03-build/20-context-engineering#the-context-centric-factory",
    "governed-context-artifacts-the-context-cdl-and-the-cbom": "/guide/03-build/20-context-engineering#governed-context-artifacts-the-context-cdl-and-the-cbom",
    "context-posture-inventory-drift-deduplication-utility-pruning": "/guide/03-build/20-context-engineering#context-posture-inventory-drift-deduplication-utility-pruning",
    "institutional-context-the-company-brain-and-structured-state": "/guide/03-build/20-context-engineering#institutional-context-the-company-brain-and-structured-state",
    "context-routing-shift-left-and-the-context-firewall": "/guide/03-build/20-context-engineering#context-routing-shift-left-and-the-context-firewall",
    "agentic-retrieval-the-sufficiency-loop": "/guide/03-build/20-context-engineering#agentic-retrieval-the-sufficiency-loop",
    "evaluate-each-layer-separately-then-together": "/guide/03-build/20-context-engineering#evaluate-each-layer-separately-then-together",
    "correction-and-revocation-are-first-class-paths": "/guide/03-build/20-context-engineering#correction-and-revocation-are-first-class-paths"
  },
  "03-build/21-models-and-capability-selection": {
    "the-router-chooses-among-qualified-profiles-only": "/guide/03-build/22-routing-and-the-escalation-ladder#the-router-chooses-among-qualified-profiles-only",
    "the-order-of-the-criteria-and-the-answer-that-is-not-a-model": "/guide/03-build/22-routing-and-the-escalation-ladder#the-order-of-the-criteria-and-the-answer-that-is-not-a-model",
    "the-routing-dimensions-and-the-workload-taxonomy": "/guide/03-build/22-routing-and-the-escalation-ladder#the-routing-dimensions-and-the-workload-taxonomy",
    "deterministic-automation-and-the-escalation-ladder": "/guide/03-build/22-routing-and-the-escalation-ladder#deterministic-automation-and-the-escalation-ladder",
    "token-economics-is-an-architecture-problem": "/guide/03-build/22-routing-and-the-escalation-ladder#token-economics-is-an-architecture-problem",
    "operating-lanes": "/guide/03-build/22-routing-and-the-escalation-ladder#operating-lanes",
    "evaluate-the-complete-configuration": "/guide/03-build/22-routing-and-the-escalation-ladder#evaluate-the-complete-configuration",
    "benchmark-driven-pareto-optimal-selection": "/guide/03-build/22-routing-and-the-escalation-ladder#benchmark-driven-pareto-optimal-selection",
    "agent-effectiveness-not-leaderboard-rank": "/guide/03-build/22-routing-and-the-escalation-ladder#agent-effectiveness-not-leaderboard-rank",
    "adaptive-routing-during-execution": "/guide/03-build/22-routing-and-the-escalation-ladder#adaptive-routing-during-execution",
    "the-intelligence-budget-and-parallel-candidates": "/guide/03-build/22-routing-and-the-escalation-ladder#the-intelligence-budget-and-parallel-candidates",
    "opinionated-defaults-open-contracts": "/guide/03-build/22-routing-and-the-escalation-ladder#opinionated-defaults-open-contracts",
    "the-hidden-cost-of-switching-models": "/guide/03-build/22-routing-and-the-escalation-ladder#the-hidden-cost-of-switching-models"
  },
  "03-build/23-agent-and-loop-engineering": {
    "the-attempt-loop": "/guide/03-build/24-loop-engineering-patterns-and-defaults#the-attempt-loop",
    "loop-engineering-as-a-discipline": "/guide/03-build/24-loop-engineering-patterns-and-defaults#loop-engineering-as-a-discipline",
    "loop-defaults-that-decide-cost": "/guide/03-build/24-loop-engineering-patterns-and-defaults#loop-defaults-that-decide-cost"
  },
  "04-prove/29-evaluation-engineering": {
    "capturing-runs-so-failures-can-be-reproduced": "/guide/04-prove/30-evals-as-factory-assets#capturing-runs-so-failures-can-be-reproduced",
    "observability-is-not-evaluation": "/guide/04-prove/30-evals-as-factory-assets#observability-is-not-evaluation",
    "drift-has-more-than-one-source": "/guide/04-prove/30-evals-as-factory-assets#drift-has-more-than-one-source",
    "evals-have-a-half-life": "/guide/04-prove/30-evals-as-factory-assets#evals-have-a-half-life",
    "three-evaluation-windows-continuous-intelligence": "/guide/04-prove/30-evals-as-factory-assets#three-evaluation-windows-continuous-intelligence",
    "from-offline-to-production-the-promotion-ladder": "/guide/04-prove/30-evals-as-factory-assets#from-offline-to-production-the-promotion-ladder",
    "scorers-over-runs-benchmarks-as-matrices": "/guide/04-prove/30-evals-as-factory-assets#scorers-over-runs-benchmarks-as-matrices",
    "context-evals-with-and-without": "/guide/04-prove/30-evals-as-factory-assets#context-evals-with-and-without",
    "every-capability-earns-its-place": "/guide/04-prove/30-evals-as-factory-assets#every-capability-earns-its-place"
  },
  "06-improve/40-governed-learning": {
    "the-closed-loop-factory-factory-as-code-scorers-and-benchmarks": "/guide/06-improve/41-meta-loops-and-the-closed-loop-factory#the-closed-loop-factory-factory-as-code-scorers-and-benchmarks",
    "eval-driven-factory-engineering": "/guide/06-improve/41-meta-loops-and-the-closed-loop-factory#eval-driven-factory-engineering",
    "compounding-engineering-harvesting-corrections": "/guide/06-improve/41-meta-loops-and-the-closed-loop-factory#compounding-engineering-harvesting-corrections",
    "promote-to-the-narrowest-durable-mechanism": "/guide/06-improve/41-meta-loops-and-the-closed-loop-factory#promote-to-the-narrowest-durable-mechanism",
    "diagnose-before-optimizing": "/guide/06-improve/41-meta-loops-and-the-closed-loop-factory#diagnose-before-optimizing",
    "skills-that-improve-from-their-own-traces": "/guide/06-improve/41-meta-loops-and-the-closed-loop-factory#skills-that-improve-from-their-own-traces",
    "mining-corrections-from-review-history-to-durable-assets": "/guide/06-improve/41-meta-loops-and-the-closed-loop-factory#mining-corrections-from-review-history-to-durable-assets",
    "meta-loops-maintenance-loops-and-discovery": "/guide/06-improve/41-meta-loops-and-the-closed-loop-factory#meta-loops-maintenance-loops-and-discovery",
    "scope-personal-fit-versus-organizational-truth": "/guide/06-improve/41-meta-loops-and-the-closed-loop-factory#scope-personal-fit-versus-organizational-truth",
    "baseline-candidate-and-the-promotion-gate": "/guide/06-improve/41-meta-loops-and-the-closed-loop-factory#baseline-candidate-and-the-promotion-gate",
    "asymmetric-autonomy-per-action-class": "/guide/06-improve/41-meta-loops-and-the-closed-loop-factory#asymmetric-autonomy-per-action-class",
    "the-boundary-with-reward-modeling": "/guide/06-improve/41-meta-loops-and-the-closed-loop-factory#the-boundary-with-reward-modeling",
    "the-adaptation-ladder": "/guide/06-improve/41-meta-loops-and-the-closed-loop-factory#the-adaptation-ladder",
    "the-factory-flywheel": "/guide/06-improve/41-meta-loops-and-the-closed-loop-factory#the-factory-flywheel",
    "what-not-to-build-first": "/guide/06-improve/41-meta-loops-and-the-closed-loop-factory#what-not-to-build-first"
  }
};
