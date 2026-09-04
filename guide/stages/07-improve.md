---
title: "Stage 7 · Improve"
part: stages
stage: 7
chapter: null
summary: How attributed evaluation and outcome signals become tested, reversible Improvement Candidates for future factory versions through governed promotion.
absorbs: []
infographics: []
---

# Stage 7 · Improve

[Stage 6](./06-evaluate.md) produces evidence about one Candidate. Stage 7 turns evidence across Candidates, human decisions, cost, incidents, and production outcomes into proposed improvements to future Plans, Agent Definitions, skills, routes, tools, context, and evaluators. Learning can be highly automated. Promotion remains governed.

This is a concise orientation brief. [Chapter 33](../06-improve/33-governed-learning-and-compounding-engineering.md) owns the complete adaptation and promotion model. Next: [Stage 8 · Deliver Software](./08-deliver-software.md).

## Purpose

A factory that never learns makes the same expensive mistakes at scale. A factory that learns directly from noisy feedback is more dangerous: it can optimize quickly for the wrong signal, change behavior without a version boundary, and lose the ability to explain which data caused which outcome.

The stage separates **learning** from **promotion**. Observation, clustering, diagnosis, proposal, and experimentation can be automated. A candidate change earns authority only through an explicit policy or human decision after comparison with a stable baseline, security and regression gates, a controlled rollout, and a recoverable previous version.

## Inputs

- Criterion-level evidence and Quality Gate results from Stage 6.
- Human acceptance, rejection, corrections, and review-signal feedback.
- Production outcomes, incidents, rollbacks, defects, and drift from Stage 8.
- Tool errors, retry patterns, context contribution, latency, and cost.
- Exact lineage for model, skill, tool, prompt, context, evaluator, environment, and Factory Version.

Failed and cancelled runs remain useful but quarantined, lower-confidence signals. They can reveal failure modes; they cannot earn promotion authority by themselves.

## What happens

The improvement loop follows a governed sequence:

> Observe → cluster → diagnose → propose → compare with baseline → run security and policy gates → canary → measure → promote, reject, or roll back

Diagnosis comes before proposal. A bad result might originate in the Agent Definition, skill, model route, prompt, retrieval policy, tool contract, environment, evaluator, or missing acceptance criterion. Exact lineage allows cohort comparisons that change one variable at a time. Without that attribution, rewriting the prompt is guesswork.

The system creates a versioned **Improvement Candidate** with a hypothesis, affected component, dataset and segment, baseline, expected benefit, risk class, evaluation plan, rollout, and rollback. Experiments compare candidate and baseline on quality, reliability, security, human effort, latency, and cost per trusted outcome. Aggregate wins do not excuse regressions in high-risk slices.

Autonomy depends on the action class, reversibility, confidence in attribution, severity, and blast radius—not on model confidence alone. Low-risk suggestions and temporary experiment artifacts may be automated. Changes to authority, security boundaries, destructive tools, gating evaluators, production deployment, or broad capability versions require human approval. Demotion and quarantine may be automatic when a safety or reliability threshold is crossed.

Improvements that need new authority return as a Mission through the same governed path as other work. The active Attempt never rewrites its own instructions or promotes a replacement. Recurring corrections can become skills; stable skill steps can become deterministic automation. That is compounding engineering: improve the system once so future work benefits.

## Outputs

- Attributed failure clusters and versioned datasets.
- Improvement Candidates with hypotheses and risk classifications.
- Baseline-versus-candidate Evaluation Runs and segmented results.
- Promotion, rejection, quarantine, or rollback decisions.
- Approved new capability or configuration versions for future Attempts.
- New regression cases and governed Missions where implementation is required.

## Governing decision

Agents and automation may observe, cluster, diagnose, propose, and run bounded experiments. Deterministic systems enforce dataset versions, comparison rules, policy, security gates, rollout limits, and rollback triggers. Humans approve consequential promotion and any Mission or Plan that changes authority or production behavior.

## Required evidence

Retain source signals, lineage, dataset version, inclusion and exclusion rules, hypothesis, baseline and candidate versions, evaluation methods, segment results, uncertainty, security findings, cost, risk, canary behavior, decision owner, promotion record, rollback target, and post-promotion observation window.

## Common failure

The common failure is optimizing an unattributed score. A thumbs-up or aggregate benchmark moves, so the system rewrites a prompt or route globally. Detect it when the proposal cannot name the affected component, cohort, causal hypothesis, protected slices, and rollback. Build the evidence baseline before the learner.

## In Mission Control

At `main` evidence commit [`b31e275`](https://github.com/jaydubya818/MissionControl/tree/b31e27564deb1c03c167e61b5ee094567c2ba7b1), Mission Control contains Loop Engineering records, graph workflows, context evaluations, meta-loop suggestions, verifier data, workflow-failure ingestion, and human conversion of accepted suggestions into governed work. Study commit [`d902fae`](https://github.com/jaydubya818/MissionControl/tree/d902fae7032c0696b531c44ae88829c652516fc6) adds deterministic learning signals, failure clusters, Improvement Candidates, datasets, experiments, canaries, promotion boundaries, trust changes, and versioned configuration.

The return path from recommendation to a new Mission is **partial**. Production correction harvesting, cross-team recurrence, holdout protection, broad optimization, automated regression attribution, and uniform capability-registry promotion and rollback are **future**. Mission Control demonstrates a governed improvement substrate, not a self-operating learning factory.

## Retain this

- Learning and promotion are different: discovery may automate; authority remains governed.
- Diagnose the responsible component from lineage before proposing a change.
- Compare every candidate with a stable baseline and protected risk segments.
- Scale autonomy by reversibility, severity, attribution confidence, and blast radius.
- Retain failed-run lessons as quarantined signals; do not let them gain authority.
- Recurring corrections become skills; stable skills become deterministic automation.

## Canonical chapters

- [Chapter 23 — Evaluation engineering](../04-prove/23-evaluation-engineering.md)
- [Chapter 28 — Observability, telemetry, and forensics](../05-operate/28-observability-telemetry-and-forensics.md)
- [Chapter 32 — Production feedback and automated review](../06-improve/32-production-feedback-review-and-the-agentic-merge-queue.md)
- [Chapter 33 — Governed learning and compounding engineering](../06-improve/33-governed-learning-and-compounding-engineering.md)
