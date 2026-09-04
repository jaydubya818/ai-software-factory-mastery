---
title: "Stage 6 · Evaluate"
part: stages
stage: 6
chapter: null
summary: How an immutable Candidate becomes independent, criterion-linked, exact-current evidence and a Quality Gate decision.
absorbs: []
infographics: []
---

# Stage 6 · Evaluate

[Stage 4](./04-execute-through-harness.md) produces a Candidate, and [Stage 5](./05-apply-skills.md) records the method used. Neither proves that the result is correct. Stage 6 evaluates the exact artifact independently against the Quality Contract and turns checks into evidence that a later decision can trust.

This is a concise orientation brief. [Chapter 27](../04-prove/27-quality-and-evidence-architecture.md) owns evidence architecture; [Chapter 29](../04-prove/29-evaluation-engineering.md) owns evaluation programs. Next: [Stage 7 · Improve](./07-improve.md).

## Purpose

Generation scales faster than human review. The scarce product is therefore not code but trustworthy evidence: proof that a Candidate executes correctly, accomplishes the intended outcome, and stayed inside policy. The producer’s statement that it is done is an event. It is not evidence.

Testing remains necessary but is not sufficient. Deterministic tests answer known questions about code and contracts. Evals address probabilistic behavior, semantic quality, route performance, trajectory, and changing models or context. Both must bind their results to the exact artifact and criteria under decision.

## Inputs

- The immutable Candidate and artifact digest.
- The approved Plan revision and frozen Quality Contract.
- Acceptance criteria, verification methods, and currentness rules.
- Execution lineage: manifest, context, skills, tools, policy, environment, and receipts.
- Qualified evaluators, fixtures, golden sets, and independent verifier identities.

## What happens

Evaluation checks three kinds of correctness:

1. **Execution correctness:** build, tests, static analysis, contracts, security checks, and performance limits.
2. **Outcome correctness:** whether the Candidate satisfies the intended objective and criteria without unacceptable regression.
3. **Policy correctness:** whether execution was authorized and respected data, repository, tool, security, and approval boundaries.

The factory creates a **Verification Subject** for the exact Candidate, freezes a **Verification Plan**, and assigns verifier Attempts that are independent of the producer. Each criterion receives evidence naming the method, environment, verifier, artifact digest, result, validity, and limitations. Missing, failed, stale, expired, or unapproved evidence remains visible and blocks any transition that requires it.

Deterministic checks are preferred where the question can be made precise. Model-based graders may support semantic judgment, but only after calibration against human-labeled positives and negatives. Their agreement, false-positive, and false-negative rates must be measured by task class. Production failures become permanent regression cases. Never optimize the factory against a judge that has not itself been validated.

The Quality Gate aggregates the required results into **eligible**, **blocked**, or **needs human judgment**. It surfaces the smallest set of signals that could change the next decision, rather than presenting a reviewer with every warning. Eligibility is not acceptance; Stage 8 owns the authority to progress.

Evaluation runs in three windows. Offline evaluation qualifies capability versions before use. Inline evaluation checks a specific Candidate. Operational evaluation observes production outcomes and drift after release. A one-time certification cannot cover changing models, tools, context, environments, or user behavior.

## Outputs

- Independent evidence for every required criterion.
- A Quality Gate decision with explicit missing or uncertain evidence.
- A compact evidence bundle and ranked decision signals.
- Evaluation records connected to exact artifact and lineage digests.
- Attributed observations for governed improvement.

## Governing decision

Deterministic systems derive required checks, enforce verifier independence and currentness, validate evidence integrity, and compute the gate. Qualified verifier agents may execute bounded checks but cannot become sole authority. Humans calibrate judgment-based evaluators and resolve results that require judgment. Acceptance and delivery remain separate decisions in Stage 8.

## Required evidence

Retain the Verification Subject and Plan digests, Candidate and commit SHA, criteria, methods, fixtures, environment, evaluator version and identity, independence proof, raw result, receipt, timestamps, validity window, invalidations, uncertainty, Quality Gate calculation, and links back to the approved Plan and execution manifest.

## Common failure

The common failure is accepting a floating green check. Tests ran, but nobody knows against which commit, in which environment, or for which criteria. A later push silently makes the proof stale. Close the gate unless Candidate, pull-request head, receipts, and evidence all name the same exact artifact.

## In Mission Control

At study commit [`d902fae`](https://github.com/jaydubya818/MissionControl/tree/d902fae7032c0696b531c44ae88829c652516fc6), Mission Control implements Verification Subjects, frozen Verification Plans, verifier Attempts, criterion-linked evidence, receipts with validity and invalidation history, exact-currentness checks, Quality Gate decisions, and links to pull-request head SHAs. WorkOrder governance blocks acceptance on missing, failed, stale, expired, or unapproved evidence.

The full evaluation service is **partial**. An older path uses mock assurance adapters and synthetic evidence packs, and release-gate integration runs in shadow mode. The evidence does not establish representative production datasets, reproducible fixtures and environments, calibrated graders, repeated-trial statistics, contamination controls, or broad adversarial evaluation. Production catalogs also lacked qualified execution routes at the study commit. Repository mechanisms should not be mistaken for a fully operating program.

## Retain this

- Generation is cheap; independent evidence creates trust.
- Evaluate execution, outcome, and policy correctness against the frozen contract.
- Bind every result to the exact artifact, method, environment, and verifier.
- Prefer deterministic checks; validate judgment-based evaluators before relying on them.
- A Quality Gate establishes eligibility, not acceptance or delivery authority.
- Trust is measured offline, inline, and in production—not certified once.

## Canonical chapters

- [Chapter 27 — Quality and evidence architecture](../04-prove/27-quality-and-evidence-architecture.md)
- [Chapter 28 — Testing strategy](../04-prove/28-testing-strategy-for-agentic-change.md)
- [Chapter 29 — Evaluation engineering](../04-prove/29-evaluation-engineering.md)
- [Chapter 31 — Quality contracts and proof packages](../04-prove/31-quality-contracts-proof-packages-and-certificates.md)
