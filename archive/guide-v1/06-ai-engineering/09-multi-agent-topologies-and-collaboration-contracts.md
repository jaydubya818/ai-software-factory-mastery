---
title: Multi-Agent Topologies and Collaboration Contracts
status: review-ready
audience: [architect, ai-engineer, platform, quality, security, operations, builder]
last_verified: 2026-08-30
lifecycle: [plan, execute, verify, learn]
risk: high
topics: [multi-agent, orchestration, delegation, verification, collaboration]
---

# Multi-Agent Topologies and Collaboration Contracts

## Quick Read

- **Purpose:** Select and govern multiple agents only when specialization,
  parallelism, or independent assurance creates measurable value.
- **Default:** A deterministic workflow or one bounded agent is simpler and
  often safer.
- **Critical contracts:** Delegation, authority, context, handoff, completion,
  disagreement, independence, budget, failure, and evidence lineage.
- **Anti-pattern:** Several agents using the same model, prompt, context, and
  assumptions do not constitute independent verification.

## 1. The problem

Multi-agent designs can decompose large work and introduce useful independent
critique. They also multiply state, context, cost, attack surface, correlated
error, handoff ambiguity, and partial failure. Agent count is therefore an
architecture cost to justify, not a maturity signal.

## 2. Topology selection catalog

| Pattern | Use when | Required control | Prefer simpler design when |
|---|---|---|---|
| Single bounded agent | One coherent tool loop with clear acceptance | Stop conditions, scoped tools, independent validation | Steps are fully deterministic |
| Router | Requests divide into stable capability families | Typed route, fallback, confidence and misroute evaluation | One workflow handles all cases well |
| Supervisor | Central coordinator assigns bounded specialists | Durable graph, delegation ledger, join policy | Coordination becomes a conversational free-for-all |
| Planner-executor | Planning and execution need different context or authority | Approved plan baseline and no executor self-expansion | Plan is already deterministic |
| Peer collaboration | Work can be partitioned with explicit merge semantics | Ownership partition, shared-state versioning, conflict resolution | Shared editing creates more conflicts than speed |
| Specialist review | Domain-specific checks require distinct capabilities | Review contract, evidence schema, disposition owner | A deterministic validator covers the rule |
| Independent critic | Producer assumptions need challenge | Independent model/context/tool path and blinded subject where useful | Critic shares the same failure source |
| Debate | Genuine ambiguity benefits from structured alternatives | Bounded rounds, claims/evidence format, final decision owner | Consensus is mistaken for correctness |
| Map-reduce | Many independent units can be processed then aggregated | Partition, per-unit contract, deterministic aggregation checks | Units share state or ordering dependencies |
| Recovery agent | Diagnosis and repair can be safely separated from failed execution | Read-first authority, incident scope, approval before mutation | Ordinary deterministic recovery exists |

## 3. Collaboration contract

Every delegated assignment declares parent work, delegator identity, delegate
profile/version, purpose, owned scope, allowed tools and data, maximum
delegation depth, input package, expected output schema, completion criteria,
deadline, budget, evidence requirement, failure policy, and return channel.
The delegate cannot widen scope, re-delegate unless explicitly allowed, or
claim acceptance.

```yaml
delegation:
  id: delegation-204
  parent_attempt: attempt-31
  delegator: agent:supervisor@7
  delegate: agent:security-reviewer@4
  purpose: "Review changed authorization paths"
  scope: [files:security/**]
  authority: [repository-read, test-run]
  context_package: context:sec-review-88
  completion: schema:security-findings@3
  deadline: 2026-08-30T19:00:00Z
  budget: {model_calls: 6, cost_usd: 3}
  on_failure: return-partial-and-escalate
```

## 4. Context and shared state

Use private context when independence or least privilege matters. Use shared
state only through versioned records with ownership and merge rules. Never pass
an unbounded transcript as the only handoff. Summaries identify source,
author, confidence, unresolved questions, and exact artifacts. Governing
contracts are immutable; a delegate's observation cannot overwrite them.

## 5. Handoff, completion, and disagreement

A completion report contains assignment digest, work performed, tool calls,
artifacts, findings, evidence, costs, uncertainty, unresolved items, and a
machine-readable status: `complete`, `partial`, `blocked`, `failed`, or
`quarantined`. The receiver validates schema and subject before merging.

Disagreement is retained as structured claims, cited evidence, severity, and
recommended disposition. Resolution may use deterministic policy, an
independent tie-break evaluator, or a named human. It never defaults to the
highest-confidence voice or majority vote when material risk remains.

## 6. Independent verification and correlation

Independence is a designed property. Compare producer and reviewer model
profile, prompt, context sources, tools, environment, code path, evaluator, and
organization. Use different failure sources where consequential. Detect
agreement without evidence, copied findings, shared retrieval omissions, and
cross-agent prompt contamination. A specialist reviewer may still be advisory;
proof eligibility follows the quality contract.

## 7. Concurrency, budgets, and partial results

Reserve a parent budget before fan-out. Allocate per-child limits and preserve
capacity for aggregation, verification, and cancellation. Concurrency keys
protect shared repositories and environments. Join policies are `all`,
`quorum`, `first-qualified`, or `best-effort-with-gaps`; choose before
execution. A timeout records which child effects and results are known,
unknown, or absent. Never discard useful partial evidence merely because the
whole graph failed.

## 8. Failure containment

| Failure | Containment | Recovery |
|---|---|---|
| Delegate exceeds scope | Gateway denies and supervisor pauses branch | Review attempted calls; reissue narrower assignment if safe |
| Child fails after mutation | Stop sibling work on dependent state | Reconcile effect, compensate or replan |
| Supervisor fails | Durable graph and delegation ledger preserve state | New controller reconciles leases and child results |
| Conflicting edits | Ownership/merge conflict blocks aggregation | Rebase or deterministic conflict owner decides |
| Correlated reviewers miss defect | Independence monitor and injected fault | Replace review path and rerun affected evidence |
| Budget fan-out | Parent reservation denies new child | Return partial results and escalate |

## 9. Observability and cost

Trace parent-child relationships, delegations, shared-state versions, context
packages, model/tool calls, messages, joins, disagreements, decisions, costs,
and cancellations. Measure success and accepted outcome against a single-agent
baseline. Include coordination latency, duplicated work, human review burden,
and correlated failure—not just token use.

## 10. Versioning, tradeoffs, and nonclaims

Topology, role profiles, collaboration schemas, and join policies are versioned
as part of the workflow. Changing authority or merge semantics is breaking.
Multi-agent systems can improve specialization and latency but usually cost
more and are harder to reproduce. This review-ready reference does not prove
that any multi-agent topology beats a simpler baseline.

## 11. Review exercise

Design a security-sensitive change using both a single-agent workflow and a
supervisor with builder and independent critic. Define the expected measurable
benefit, inject one correlated failure and one partial child result, compare
quality, latency, cost, and review burden, then choose the minimum sufficient
design.
