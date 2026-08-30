---
title: Capstone Architecture and Executive Defense
status: draft-for-study
audience: [executive, architect, senior-engineer]
last_verified: 2026-08-11
lab_type: assessment
---

# Capstone Architecture and Executive Defense

## 1. Purpose and passing claim

The capstone proves personal mastery of the supported Mission Control V1 path, not aspirational factory autonomy. It passes only when you can truthfully say:

> I operated the supported Mission Control path through the browser, traced its authoritative records and runtime calls, changed one bounded part safely, recovered one failure without bypassing authority, verified the resulting evidence and GitHub lineage, and explained the architecture and tradeoffs without relying on an agent to supply the answer.

## 2. Why this proof is demanding

A polished demo can hide seeded state, manual database edits, agent assistance, missing policy, mocked validation, or a PR created outside the governed path. The capstone therefore combines operation, implementation trace, failure recovery, retained evidence, and unscripted defense.

## 3. Enduring Principle

Mastery requires five abilities at once: explain, operate, trace, change, and recover. Evidence must show what happened at an exact commit; the learner must show that they understand why it happened and where authority resides.

## 4. Scope and scenario

Use the private `mission-control-factory-lab` repository at a pinned `capstone-start` tag. The recommended issue is **Add a required Business Justification field to Mission creation** or an equivalently bounded frontend/backend change if that behavior already exists.

The scenario must touch UI, authoritative schema/state, validation, unit/integration/browser tests, independent evidence, and GitHub publication. It must not require autonomous production deployment.

## 5. Current Mission Control readiness gate

Before scheduling the accepted run, verify:

- the selected Mission Control commit is merged, clean, and recorded;
- the GitHub App is configured for the controlled repository;
- an active Governance Policy and passing Factory Configuration exist;
- the browser path creates the Mission and approved Plan without database shortcuts;
- the supported executor, worktree, publication, and receipt path is enabled;
- deterministic validation is real, not a mock adapter;
- reviewer identities and evidence storage are available; and
- the baseline can be reset without deleting retained proof.

At the current study boundary, these are not all proven. Draft PR #64-era execution work and the subsequent continuous-quality design provide components, but the capstone must cite the final merged commit and fresh browser evidence.

## 6. Required golden path

Demonstrate and explain:

1. Company, Workspace, Repository, and Factory Configuration selection.
2. Browser-created Mission with outcome, criteria, constraints, owner, business justification, and risk.
3. Versioned Plan with requirement coverage, assertions, test strategy, rollout/rollback, and unresolved assumptions.
4. Independent Plan review and approval of the exact revision.
5. WorkOrder release with explicit authority and acceptance boundary.
6. Bounded Task dispatch and immutable Attempt creation.
7. Policy/preflight checks, execution manifest, lease, and isolated worktree.
8. Model/tool execution, tests, commit, and exact base/head lineage.
9. GitHub App publication of a review-ready pull request.
10. Independent validation and criterion-linked Evidence.
11. Quality Proof Package and eligibility explanation.
12. Human acceptance/merge decision, clearly separated from Task completion.

## 7. Required failure and recovery

Trigger one meaningful failure: preflight denial, stale lease, executor timeout, validation failure, head-SHA mismatch, duplicate completion, cancellation, or GitHub publication failure. Show:

- classification and operator-visible state;
- the authoritative record and immutable history;
- whether retry is permitted and which budget applies;
- creation of a new Attempt where required;
- idempotent handling of late or duplicate events;
- evidence retained, invalidated, or made stale; and
- recovery without direct-state mutation or authority bypass.

## 8. Architecture defense

Whiteboard from memory:

```text
Business intent
 -> governed Mission and executable specification
 -> approved Plan and Quality Contract
 -> authorized WorkOrder
 -> Task and immutable Attempts
 -> isolated agent/tool execution
 -> artifact and supply-chain provenance
 -> independent verification and evidence graph
 -> policy eligibility and human decision
 -> PR/release governance
 -> production observation and governed learning
```

Overlay control, execution, quality, delivery, data, security, and human-governance planes. For each boundary name owner, record, identity, failure mode, recovery, and proof.

## 9. Skeptical CTO defense

Answer without notes:

- **Why trust probabilistic agents?** We do not trust model confidence; we trust bounded authority, deterministic controls, independent evidence, policy, recovery, and measured outcomes.
- **Is this just CI plus a coding agent?** No. CI validates selected artifact properties. The factory governs intent, planning, authorization, execution, acceptance, delivery, feedback, and accountability as one durable lifecycle.
- **Will governance erase the speed advantage?** Risk-proportional gates and evidence-centered reviews spend human attention on surprises and material risk, while routine qualified work proceeds within policy.
- **Can you guarantee defect-free software?** No. We guarantee that governed transitions cannot occur without the predefined current evidence and approvals, then verify behavior after release.
- **Why not let the agent validate itself?** Correlated error and self-assertion are not independent proof. Separate methods, execution contexts, identities, and policy decisions reduce common-mode failure.
- **What is the ROI?** Improve lead time to validated customer value, change failure rate, and engineering leverage together; never optimize generated output alone.
- **What if the factory gets worse?** Trust is continuously calibrated. Policy violations, evidence tampering, security escapes, and outcome regressions demote or quarantine autonomy.

## 10. Evidence package and scoring

Retain IDs for Mission, Plan revision, WorkOrder revision, Task, Attempts, Evidence, policy decisions, PR URL, base/head SHA, artifact digest, exact source commit, screenshots/recording, test results, audit records, failure timeline, agent-assistance disclosure, and retrospective.

Score 0–4 in each category: specification, authority/governance, runtime trace, quality/evidence, security/provenance, recovery, architecture explanation, executive defense, and independence. Passing requires at least 3 in every category, no authority bypass, no fabricated or missing critical evidence, and acceptance by one technical and one executive reviewer.

## 11. Teach-back and retrospective

Deliver the architecture at three levels: 30 seconds to a CEO, two minutes to a CTO, and ten minutes to a senior engineer. Then answer:

- What assumption failed?
- Which boundary was hardest to trace?
- Which evidence was strongest and weakest?
- What would block enterprise adoption?
- What should be implemented next, and what should explicitly wait?
- Which part can you now teach without assistance, and which still needs practice?

The capstone is complete only after the evidence index, reviewer decisions, and retrospective are committed to the mastery repository with large/private artifacts referenced by stable ID and checksum.
