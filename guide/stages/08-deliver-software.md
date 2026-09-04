---
title: "Stage 8 · Deliver Software"
part: stages
stage: 8
chapter: null
summary: How an eligible Candidate receives an explicit, risk-proportional decision and moves through merge, release, activation, and production verification.
absorbs: []
infographics: []
---

# Stage 8 · Deliver Software

[Stage 6](./06-evaluate.md) determines whether a Candidate is eligible to progress, and [Stage 7](./07-improve.md) captures lessons for future versions. Stage 8 applies authority. It carries the exact-current Candidate through review, merge, release, activation, and production verification while preserving evidence and rollback readiness.

This is a concise orientation brief. [Chapter 31](../04-prove/31-quality-contracts-proof-packages-and-certificates.md) owns the decision package; [Chapter 32](../04-prove/32-cicd-progressive-delivery-and-production-verification.md) owns delivery and production verification. The value stream then returns to [Stage 1 · Builder Intent](./01-builder-intent.md) through new production signals.

## Purpose

Verification and acceptance answer different questions. Verification asks whether the artifact met the contract. Acceptance asks whether an authorized person or policy permits it to progress. A high score, green test, or confident model can inform that decision but cannot silently become authority.

Delivery also has more states than “merged.” A change may be accepted but not merged, merged but not deployed, deployed but not activated, or active without achieving the intended production outcome. Keeping those states separate prevents optimistic status from masquerading as customer value.

## Inputs

- An immutable Candidate and Quality Gate result.
- The approved Plan, risk class, criteria, and approval policy.
- Exact-current evidence and execution lineage.
- The current pull-request head and source-control checks.
- Release, rollout, observation-window, and rollback policy.

## What happens

The factory classifies risk deterministically using blast radius, reversibility, security and data sensitivity, dependency and architecture impact, production criticality, novelty, and verification strength. Risk selects the review path. Low-risk, reversible work with strong evidence may progress through explicit policy. Medium-risk work receives focused human review. High-risk work requires senior or specialist approval and stronger controls. Review depth follows risk, not whether AI produced the change.

The decision owner receives a compact **decision packet**: requested outcome, material changes, affected systems, risk, criteria, evidence and gaps, policy decisions, alternatives, rollout, rollback, and the exact decision required. The goal is maximum decision quality per unit of human attention. A reviewer should not have to reconstruct missing evidence or compensate for weak automation.

Immediately before progression, the system enforces an **exact-current gate**. Pull-request head, Candidate digest, evidence, and receipts must identify the same commit and configuration. Any material change invalidates the old evidence and closes the gate until required checks run again.

The state chain remains explicit:

> Execution completed → verification passed → acceptance recorded → merge authorized → release created → deployed → activated → production verified

The factory integrates with the source control, CI, artifact registry, deployment, and progressive-delivery systems the organization already trusts. It does not create a parallel delivery universe. Build-once artifacts, provenance, health checks, limited rollout, observation windows, and automated rollback turn existing pipelines into continuous evidence.

Production verification checks both technical health and the Mission’s expected outcome. A failed outcome may roll back or open governed corrective work; it does not edit the original Mission or erase the evidence. The result feeds Stage 7 and may create new intent for Stage 1.

## Outputs

- A recorded acceptance, rejection, revision, or waiver decision.
- Merge and Release records linked to the exact Candidate.
- Deployment and activation events with progressive-rollout state.
- Production verification receipts and observed outcome.
- Rollback, corrective work, or new Mission when required.
- Production signals for governed learning.

## Governing decision

A human or explicit policy grant authorizes acceptance and progression according to risk. Deterministic systems compute risk, enforce currentness and policy, operate rollout mechanics, and may trigger automatic rollback or demotion within approved limits. Agents may assemble the packet, open the pull request, and perform delegated mechanics, but they do not grant themselves merge, release, or acceptance authority.

## Required evidence

Retain risk inputs and classification, Decision Packet, approver or policy grant, exact pull-request head, Candidate and manifest digests, Quality Gate result, criterion receipts, exceptions, merge record, artifact provenance, release and deployment IDs, rollout events, health checks, observation window, production outcome, and rollback readiness.

## Common failure

The common failure is optimistic state propagation: a successful Attempt appears as accepted work, or a merged pull request appears as delivered value. Detect it when the product has fewer states than the real delivery path. Give every transition its own owner, record, preconditions, evidence, and recovery behavior.

## In Mission Control

At `main` evidence commit [`b31e275`](https://github.com/jaydubya818/MissionControl/tree/b31e27564deb1c03c167e61b5ee094567c2ba7b1), Mission Control implements human decision rights, risk-proportional approvals, decision packets, deployment records, release gates, approval and evidence linkage, GitHub pull-request and check ingestion, head-SHA currentness, alerts, health queries, and evidence-retention policy. Doctrine keeps execution, verification, acceptance, publication, merge, and deployment separate.

The proven golden path ends at a review-ready pull request. PR #61 demonstrates one real GitHub App pull request with passing CI. Stronger publication and lease work associated with PR #64 remains unmerged and incompletely proven through the browser. Release-gate evaluation runs in shadow mode, and deployment execution plus customer-outcome confirmation are **partial**. Provider reconciliation, complete production receipts, outcome windows, corrective-work automation, and a Factory SRE view are **future**. The architecture covers the lifecycle; the evidence does not claim complete automation.

## Retain this

- Delivery authority is explicitly granted; it is never inferred from a score.
- Verification establishes eligibility; acceptance authorizes progression.
- Review depth follows risk, and the reviewer receives a decision packet.
- The gate closes unless Candidate, evidence, receipts, and head name the same artifact.
- Merge, deployment, activation, and production outcome are distinct states.
- Use existing delivery systems and feed observed outcomes back into governed learning.

## Canonical chapters

- [Chapter 31 — Quality contracts and proof packages](../04-prove/31-quality-contracts-proof-packages-and-certificates.md)
- [Chapter 32 — CI/CD, progressive delivery, and production verification](../04-prove/32-cicd-progressive-delivery-and-production-verification.md)
- [Chapter 37 — Control surfaces, event contracts, and storage](../05-operate/37-control-surfaces-event-contracts-and-storage.md)
- [Chapter 39 — Production feedback and automated review](../06-improve/39-production-feedback-review-and-the-agentic-merge-queue.md)
