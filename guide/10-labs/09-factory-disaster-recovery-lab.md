---
title: Factory Disaster Recovery Lab
status: review-ready
audience: [platform, sre, architect, security]
last_verified: 2026-08-30
lifecycle: [execute, verify, learn]
risk: critical
lab_type: executable
topics: [disaster-recovery, failover, reconciliation, idempotency]
---

# Factory Disaster Recovery Lab

## Objective

Prove that the factory can restore authoritative state, prevent split-brain execution, reconcile uncertain external effects, and return safely to service after a major failure.

## Safety boundary

Use a simulator or isolated test environment. Never disrupt a shared production control plane.

## Required implementation

1. Inventory authoritative and derived state with RTO, RPO, backup, restore, and owner.
2. Begin one Attempt with a lease and one pending mock publication effect.
3. Simulate loss of the primary control plane and one worker during the publication ambiguity window.
4. Restore state, advance the authority generation, fence stale workers, and enter recovery mode.
5. Reconcile the external provider using idempotency identity rather than repeating publication blindly.
6. Verify budgets, single-use permits, revocations, evidence, and audit history survived.
7. Resume new admission only after explicit recovery gates pass.

## Required failure

Deliver a late completion from the fenced worker. The control plane must retain it as diagnostic evidence while refusing to advance authoritative state.

## Evidence and pass criteria

Retain recovery plan, backup and restore receipts, event timeline, generation and fencing evidence, provider reconciliation, rejected stale completion, RTO/RPO measurement, return-to-service approval, and corrective actions. The lab fails if duplicate publication occurs or authority history is reconstructed from worker claims.

## Cleanup

Destroy disposable resources and credentials. Preserve the recovery evidence and update the runbook from observed gaps.
