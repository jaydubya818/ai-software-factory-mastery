---
title: Progressive Delivery and Rollback Lab
status: review-ready
audience: [architect, platform, sre, quality, product]
last_verified: 2026-08-30
lifecycle: [deliver, learn]
risk: high
lab_type: executable
topics: [canary, production-verification, rollback]
---

# Progressive Delivery and Rollback Lab

## Objective

Demonstrate the complete path from immutable release candidate through canary, production verification, failure detection, rollback or containment, and outcome accounting.

## Prerequisites and starting state

Use a disposable service or deterministic simulator with two versions, synthetic traffic, technical metrics, a product outcome measure, and a reversible feature flag. No production deployment is permitted.

## Required implementation

1. Build one immutable artifact and record source, build, dependencies, provenance, and digest.
2. Define canary cohort, maximum exposure, observation window, technical and product gates, stop conditions, decision owner, and rollback.
3. Deploy the digest to the canary and reconcile the provider state into a Release record.
4. Inject a defect affecting only one high-value cohort while aggregate health remains green.
5. Detect the segmented failure and block promotion.
6. Execute rollback or containment and verify recovery, data integrity, and cohort state.
7. Create corrective work and update the original release evidence without erasing its earlier state.

## Evidence and pass criteria

Retain artifact identity, release plan, deployment reconciliation, cohort metrics, gate decisions, alert, rollback authorization, recovery proof, customer-outcome status, and retrospective. The lab fails if deployment is called success, if aggregate metrics hide the affected cohort, or if rollback is assumed rather than verified.

## Cleanup

Remove the simulated release, flags, traffic, and test data. Preserve the evidence package.
