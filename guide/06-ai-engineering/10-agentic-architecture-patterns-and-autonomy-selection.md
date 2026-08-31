---
title: Agentic Architecture Patterns and Autonomy Selection
status: review-ready
audience: [executive, architect, product, ai-engineer, platform, security, quality, operations]
last_verified: 2026-08-30
lifecycle: [intent, plan, execute, verify, learn]
risk: high
topics: [architecture-patterns, autonomy, selection, risk, human-oversight]
---

# Agentic Architecture Patterns and Autonomy Selection

## Quick Read

- **Purpose:** Select the minimum sufficient architecture for the problem and
  risk rather than maximizing how agentic the design appears.
- **Ladder:** Deterministic -> prompt assistance -> retrieval-grounded ->
  bounded single agent -> coordinated specialists -> durable autonomous
  workflow -> enterprise-integrated system.
- **Important:** This is a decision ladder, not a maturity score. A lower level
  can be the correct production architecture.

## 1. The problem

Teams often choose agents before proving that variability, planning, or tool
reasoning is required. Every autonomy increase adds state, permissions,
evaluation, cost, uncertainty, security exposure, and recovery obligations.
Architecture selection should therefore start with the outcome and eliminate
simpler eligible patterns only with evidence.

## 2. Selection ladder

| Level | Pattern | Suitable problem | State and authority | Verification and oversight |
|---|---|---|---|---|
| 0 | Deterministic software or fixed automation | Stable rules and known inputs | Explicit state; fixed service authority | Unit/contract tests; normal change control |
| 1 | Prompt-and-response assistance | Drafting, explanation, low-impact recommendation | Session only; no direct side effects | Human evaluates every consequential output |
| 2 | Retrieval-grounded assistance | Answers need current approved sources and citations | Query/context record; read-only source access | Permission, freshness, citation, faithfulness checks |
| 3 | Bounded single-agent tool loop | Complex task needs planning or iterative tool use | Attempt state, scoped tools, budgets, stop conditions | Independent validators and human gate for consequence |
| 4 | Coordinated multi-agent specialization | Distinct specialties, parallel work, or independent critique are measurably useful | Durable delegations, shared-state contracts, bounded child authority | Correlation controls, join policy, disagreement resolution |
| 5 | Durable autonomous workflow | Triggered, long-running process must survive failures and queues | Persistent graph, leases, retries, reconciliation, gates | SLOs, incident control, evidence, human intervention |
| 6 | Enterprise-integrated factory system | Mission-critical use across governed data, tools, delivery, and operations | Inventory, identities, policy, tenancy, lifecycle, continuity | Full governance, control testing, monitoring, recertification |

## 3. Decision criteria

For each level answer:

1. Which required capability is impossible or materially worse at the lower
   level?
2. What variability, ambiguity, or scale justifies probabilistic behavior?
3. Which tools and side effects are required, and can authority be narrower?
4. Which state survives a crash, replay, or human pause?
5. How are correct behavior, failure sensitivity, and accepted outcomes
   evaluated?
6. What evidence and human decision are required before consequence?
7. What are latency, capacity, monetary cost, and human-attention budgets?
8. Which new failure and attack modes appear?
9. What is the fallback to a lower level?
10. Which promotion evidence would justify greater autonomy later?

If the higher level cannot show measurable benefit against the simpler
baseline, reject it.

## 4. Pattern contracts

### Deterministic and assistance patterns

Keep rules in code when requirements are stable and testable. For prompt
assistance, label outputs as proposals and provide source/context disclosure.
For retrieval assistance, add source registry, permission filtering, exact
citations, freshness, contradiction handling, and revocation. Memory is
unnecessary unless a measured cross-session need exists.

### Bounded single-agent loop

Freeze the model, prompt, context, skills, tools, policy, budgets, and quality
contract. Persist attempt state outside the model. Restrict tools by resource
and side effect. Stop on acceptance, attempts, tool calls, time, tokens, cost,
no improvement, denial, cancellation, or dependency failure. A human reviews
consequential results with independent evidence.

### Coordinated multi-agent pattern

Add only with a measurable specialization, parallelism, or assurance reason.
Define delegation, context, authority, handoff, join, disagreement, partial
result, and correlation contracts. Budget fan-out and preserve a deterministic
aggregation path where possible.

### Durable autonomous workflow

Add triggers, admission, queue, durable graph, leases, idempotency,
reconciliation, pause/cancel/quarantine, SLOs, on-call ownership, and evidence
gates. Autonomy applies to a bounded workflow, not an unrestricted goal.

### Enterprise-integrated system

Add governed inventory, unique workload identity, tenancy, policy decision
points, knowledge and capability lifecycles, data classification, independent
assurance, delivery and rollback, monitoring and incident response, continuity,
cost attribution, supplier controls, and periodic recertification.

## 5. Promotion and fallback

Promotion requires representative baseline/candidate evaluation, non-
regression in critical slices, failure injection, recovery proof, security and
privacy review, capacity and cost evidence, named owner, approved ceiling, and
a tested fallback. Promotion can increase eligible scope, allowed side effect,
duration, or reduced human review—but change one dimension at a time where
possible. Drift, incident, expired evidence, or supplier change may demote the
system automatically under policy.

## 6. Failure and risk comparison

| Added level | New dominant failure | Required containment |
|---|---|---|
| Prompt assistance | Hallucinated or misleading proposal | Clear advisory boundary and human review |
| Retrieval | Unauthorized, stale, poisoned, or contradictory source | Pre-ranking permission, lineage, revocation |
| Single agent | Tool misuse, nonconvergence, hidden state | Scoped gateway, durable attempt, hard stops |
| Multi-agent | Correlated error, delegation drift, fan-out cost | Collaboration contract, independence tests, parent budget |
| Durable workflow | Duplicate/partial effects, orphaned work | Idempotency, leases, reconciliation, emergency control |
| Enterprise system | Cross-tenant impact, governance and supplier failure | Inventory, identity, policy, control tower, continuity, recertification |

## 7. Cost and outcome evidence

Compare end-to-end lead time, accepted quality, failure rate, time to recovery,
model/tool/environment cost, coordination overhead, and human attention. Do not
optimize token price in isolation. The unit of value is accepted outcome under
the required safety and reliability contract.

## 8. Tradeoffs and nonclaims

Lower levels sacrifice flexibility but improve predictability, testability,
cost, and security. Higher levels can handle ambiguity and long-running work
but demand stronger operations. This review-ready ladder is not a universal
risk classification and does not claim that higher autonomy produces better
business outcomes.

## 9. Architecture review exercise

Choose one repository question, one bounded code change, and one cross-system
release workflow. For each, document the lowest eligible level, rejected
alternatives, required contracts, evaluation, evidence, human authority,
failure recovery, cost, promotion criteria, and fallback. A reviewer must be
able to challenge the design without knowing a particular vendor stack.
