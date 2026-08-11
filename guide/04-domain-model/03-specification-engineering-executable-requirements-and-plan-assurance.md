---
title: Specification Engineering, Executable Requirements, and Plan Assurance
status: draft-for-study
audience: [executive, architect, senior-engineer, product, ai-engineer, quality]
last_verified: 2026-08-11
mission_control_main_commit: b31e27564deb1c03c167e61b5ee094567c2ba7b1
mission_control_local_head: a49064875d0711253d74029e3066cc74c7c1c2a5
---

# Specification Engineering, Executable Requirements, and Plan Assurance

## 1. The problem

An agent cannot reliably implement intent that has never been made precise. “Improve onboarding” may be a valid business objective, but it does not identify the users, desired behavior, constraints, unacceptable outcomes, or proof needed for acceptance. Starting implementation from that sentence transfers product and risk decisions to the executor by accident.

The factory therefore needs an upstream assurance boundary. Business intent must become a governed, versioned, testable specification before implementation authority is granted.

## 2. Why the problem exists

Business language optimizes for direction; engineering specifications optimize for decision and verification. The translation fails when hidden assumptions remain hidden, quality attributes are omitted, examples masquerade as complete requirements, or acceptance criteria describe activity rather than observable outcomes. Agent fluency makes this failure look deceptively complete.

Requirements also interact. A latency target can conflict with an audit-retention rule. A data-deletion requirement can conflict with immutable evidence. A plan may cover every functional criterion while ignoring migration, rollback, authorization, or observability. Completeness is therefore a property of the set and its operating context, not of individually polished sentences.

## 3. Enduring Principle

### Convert intent into a governed Mission

A Mission is an owned outcome, not a prompt. It should establish:

- the business outcome and affected users;
- scope, exclusions, ownership, priority, and time constraints;
- functional requirements and measurable non-functional requirements;
- architecture, data, security, regulatory, and operational constraints;
- expected failure modes and recovery behavior;
- risk class and required decision owners; and
- the evidence required to show that the outcome was achieved.

The Mission remains the authority for *why* the work exists. A Plan explains *how* the factory proposes to achieve it. A WorkOrder authorizes a bounded part of that plan. Collapsing the three allows implementation detail to rewrite business intent.

### Distinguish requirements, criteria, and assertions

These records answer different questions:

| Construct | Purpose | Example |
| --- | --- | --- |
| Requirement | What must be true | “A user cannot read another tenant’s records.” |
| Acceptance criterion | What observable boundary determines acceptance | “Every cross-tenant read returns the policy-defined denial without disclosing record existence.” |
| Validation assertion | A specific claim a verifier can evaluate | “Given Tenant A credentials and Tenant B record ID, `GET /records/:id` returns 404 and emits a denied-access audit event.” |
| Evidence requirement | What proof makes the assertion usable | Independent integration run, exact build digest, audit-event receipt, tool identity, and freshness window |

Acceptance criteria should be outcome-oriented and implementation-neutral where possible. Assertions may be implementation-aware because they define a method of proof. Tests are evidence-producing mechanisms; they are not the requirement itself.

### Specify quality attributes and invariants

Functional behavior is only one part of the contract. Non-functional requirements should name a measure, operating condition, population, threshold, and observation window: p95 latency below 300 ms under a defined load is testable; “fast” is not.

An **invariant** is a condition that must hold across all permitted states and transitions. Examples include tenant isolation, append-only acceptance history, no deployment without an eligible artifact digest, and no completion report from a stale lease. Architecture constraints say how the solution space is bounded; invariants say what must never become false.

### Design failure and recovery before the happy path

For each material dependency and transition, specify timeout, retryability, idempotency, cancellation, partial success, reconciliation, rollback, and operator-visible state. “GitHub is unavailable” is a failure mode. “The Attempt retains its commit, publication becomes retryable, no duplicate PR may be created, and the operator sees blocked-publication” is a recovery expectation.

### Detect ambiguity, incompleteness, and contradiction

A specification assurance pass should reject or flag:

- vague terms such as “appropriate,” “quickly,” and “secure” without measures;
- compound requirements containing multiple independently decidable claims;
- missing actors, conditions, units, thresholds, owners, or evidence methods;
- unbounded words such as “all,” “never,” and “always” without domain definition;
- acceptance criteria that merely repeat the requirement;
- requirements that cannot be observed or verified;
- conflicting thresholds, states, authorities, retention rules, or dependencies;
- unresolved assumptions presented as facts; and
- orphan requirements with no plan coverage or evidence route.

Automated analysis may propose findings, but business meaning and risk acceptance remain human decisions. A useful finding records severity, affected requirement IDs, rationale, proposed resolution, owner, and deadline.

### Review the plan independently

Plan assurance occurs before code mutation. A reviewer separate from the plan producer evaluates requirement coverage, architecture alignment, dependency and supply-chain impact, threat implications, test strategy, rollout, migration, rollback, observability, cost, and unresolved assumptions.

The output is not “looks good.” It is a coverage matrix plus findings and a decision: approved, revision required, or exception required. Validator disagreement increases governance; it does not trigger blind majority voting or random regeneration.

### Decompose without losing lineage

Each WorkOrder should project a coherent subset of the approved Plan:

```text
Mission requirement
  -> approved Plan decision
    -> WorkOrder acceptance boundary
      -> Task execution unit
        -> Attempt and artifact
          -> criterion-linked evidence
```

A WorkOrder must be independently understandable, bounded, authorized, and verifiable. Cross-WorkOrder invariants remain at the Mission or Plan level and require integration evidence. Decomposition is invalid if local completion can violate the global outcome.

### Baseline and control change

Approval creates a **specification baseline**: an immutable version with a canonical digest, author, approver, rationale, and effective time. A material change creates a new revision; it does not silently edit history. The system must determine which WorkOrders, Attempts, evidence, approvals, and release decisions are invalidated or require re-evaluation.

NASA’s systems-engineering guidance provides a useful discipline: requirements should be clear, unambiguous, singular, traceable, and individually verifiable; verification shows conformance to specified requirements, while validation shows the right product works in its intended environment.

## 4. Tradeoffs

More specification reduces rework but can delay learning and create false precision. The answer is risk-proportional detail: lightweight contracts for reversible, low-risk work; deeper requirements, threat analysis, and formal approval for consequential changes. Executable does not mean every business judgment becomes code. It means every advancement decision has explicit inputs, a responsible authority, and inspectable proof.

LLMs are useful ambiguity critics but can invent implied requirements. Preserve provenance: distinguish stakeholder statements, policy-derived constraints, agent-proposed assumptions, and human-approved decisions.

## 5. Current Mission Control Implementation

At local HEAD `a490648`, Mission Control supports draft Missions, versioned `missionPlans`, validation assertions, WorkOrder blueprints, submission, approval/rejection, revision forking, and atomic WorkOrder release in `convex/missions.ts`. The operator path is represented in `apps/mission-control-ui/src/eos/views/MissionPlanWorkspace.tsx`. WorkOrders carry acceptance criteria and later connect to `verificationReceipts` in `convex/schema.ts` and `docs/software-factory/domain-contracts.md`.

This is a meaningful specification skeleton, not a complete specification compiler. There is no demonstrated general-purpose contradiction engine, formal NFR schema, automated invariant analysis, or independently enforced plan-assurance gate on the main commit. A staged, uncommitted continuous-quality plan proposes treating the approved Plan revision as the top-level Quality Contract and WorkOrder criteria as scoped projections. Its SHA-256 is `31e3f6fc44824b643ef5bfa3389ba3da1e0e6b1f6827f66fdb63efcbb4c9313b`. It is design input, not implemented capability.

## 6. Future Vision

Mission Control should compile an approved Plan and active Factory Configuration into a deterministic contract projection. The compiler should emit coverage gaps, ambiguity findings, applicable controls, required evidence, approval owners, invalidation dependencies, and a canonical digest. Begin in observe-only mode, compare findings with human review, then enforce one narrow WorkOrder-acceptance gate before expanding.

## 7. Versioned references

- Mission Control main evidence boundary: `b31e27564deb1c03c167e61b5ee094567c2ba7b1`
- Local source HEAD: `a49064875d0711253d74029e3066cc74c7c1c2a5`
- Staged, uncommitted continuous-quality plan SHA-256: `31e3f6fc44824b643ef5bfa3389ba3da1e0e6b1f6827f66fdb63efcbb4c9313b`
- Product sources: `convex/missions.ts`, `convex/schema.ts`, `apps/mission-control-ui/src/eos/views/MissionPlanWorkspace.tsx`
- Design references: `docs/software-factory/domain-contracts.md`, `docs/plans/2026-08-11-feat-continuous-quality-proof-plan.md`
- External canon: NASA Systems Engineering Handbook Appendix C and Product Realization; NASA SWE-055 Requirements Validation; NIST SSDF 1.1

## 8. Personal notes and lessons learned

- The first dangerous hallucination often occurs before code: the system invents what “done” means.
- A Mission is governed intent; a Plan is a versioned proposal; a WorkOrder is delegated authority.
- Testability must be designed into requirements. Evidence cannot repair an unobservable claim later.
- The approved specification, not the builder narrative, controls acceptance.

## 9. Interview questions

1. How would you translate an ambiguous CEO request into a governed Mission without creating heavyweight bureaucracy?
2. What is the difference among a requirement, acceptance criterion, assertion, and test?
3. How do you detect contradictions across security, performance, data, and audit requirements?
4. When does a specification change invalidate completed evidence?
5. Why should a plan be independently reviewed before implementation?

## 10. Whiteboard exercise

Whiteboard a password-reset Mission. Show business outcome, functional requirements, NFRs, invariants, failure modes, risk class, assertions, plan coverage, two WorkOrders, evidence requirements, and the revision boundary. Then introduce a change from 15-minute to 5-minute token expiry and identify every downstream record that must be reconsidered.

## 11. Hands-on lab

Take “Add Business Justification to Mission creation” and create a specification package without agent assistance first. Include stable IDs, UI/API/schema behavior, empty and whitespace cases, authorization, backward compatibility, browser assertion, evidence method, risk, and rollback. Trace the package into the Mission Control Plan and WorkOrder records. Intentionally insert one ambiguous criterion and one contradiction, run an agent critique, and record which findings you accepted or rejected and why.
