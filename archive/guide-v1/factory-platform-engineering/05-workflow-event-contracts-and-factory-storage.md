---
title: Workflow and Event Contracts, Schema Evolution, and Factory Storage
status: review-ready
audience: [architect, platform, data, ai-engineer, senior-engineer]
last_verified: 2026-08-30
lifecycle: [plan, execute, verify, learn]
risk: high
topics: [workflow-dsl, events, schema-evolution, artifact-storage, vector-database]
---

# Workflow and Event Contracts, Schema Evolution, and Factory Storage

## Quick Read

- **Purpose:** Define the durable contracts that connect triggers, workflow state, asynchronous events, artifacts, evidence, and retrieval stores.
- **Best for:** Platform, data, runtime, and integration architects.
- **Prerequisites:** [Runtime Orchestration and State Machines](../05-runtime-architecture/02-runtime-orchestration-and-state-machines.md).
- **Reading time:** 15 minutes.
- **You will learn:** How to version workflows and events, evolve schemas, compensate partial effects, and choose authoritative versus derived storage.
- **Keep three ideas:** events are observations, not automatic authority; schema evolution is a rollout; and each store needs an explicit truth boundary.

## 1. The problem

Factories integrate issues, source control, workers, tools, model providers, CI, artifacts, deployment, observability, and human decisions. Events arrive late, duplicated, out of order, or with older schemas. Workflow definitions change while runs are active. Large artifacts and retrieval indexes do not fit safely in the same store as authoritative state.

## 2. Why the problem exists

Asynchronous systems trade immediate consistency for decoupling and durability. Provider webhooks describe provider state but may be forged, replayed, or incomplete. Declarative workflow languages improve inspectability while encouraging unsafe dynamic behavior if types, policy, and migration are weak. Different storage systems optimize transactions, blobs, search, or vector similarity and provide different guarantees.

## 3. Enduring Principle

### Version the workflow definition

A workflow contract or DSL declares nodes, inputs, outputs, dependencies, triggers, timeouts, retries, budgets, cancellation, compensation, human gates, completion states, and required evidence. Running WorkOrders remain bound to their approved version unless an authorized migration creates a new decision and replay-safe transition.

### Treat triggers as intake, not authority

Schedules, webhooks, messages, API calls, and repository events create or update proposed work through authenticated, idempotent intake. Admission verifies current owner, scope, policy, risk, readiness, and budget before execution.

### Use typed event envelopes

Every event includes canonical type and version, event and correlation identity, producer identity, tenant, subject, causation, occurred and received times, payload schema, integrity, and trace context. Consumers deduplicate and tolerate defined ordering. Unknown incompatible versions fail visibly.

### Evolve schemas through compatibility windows

Additive changes usually precede consumer migration; semantic changes require explicit new versions. Producers and consumers advertise supported ranges. Backfill, dual-read or dual-write, validation, cutover, and contraction are monitored states rather than one deployment step.

### Compensate partial effects explicitly

Distributed workflows cannot assume global rollback. Sagas record completed effects and approved compensations. Compensation is a new action with its own authority and failure path. Reconciliation handles ambiguous effects whose result is unknown.

### Assign each store a truth boundary

| Store | Appropriate content | Important limit |
|---|---|---|
| Transactional control store | Authority, state, policy decisions, leases, approvals | Avoid large unbounded artifacts |
| Event log or message broker | Durable facts and asynchronous delivery | Delivery does not equal acceptance |
| Object or artifact store | Logs, diffs, test output, packages, evidence blobs | Metadata and digest must remain authoritative elsewhere |
| Search index | Discoverable projections | Derived, stale, rebuildable |
| Vector database | Semantic retrieval candidates | Similarity is not authority or evidence |
| Analytics warehouse | Aggregates and trends | Delayed projections cannot drive immediate authority blindly |

## 4. Tradeoffs and alternatives

One database simplifies transactions and may become a scaling and retention bottleneck. Specialized stores improve fit and increase reconciliation burden. Exactly-once delivery is rarely available across boundaries; design idempotent effects and effectively-once outcomes. Flexible workflow DSLs accelerate composition and expand the security and migration surface.

## 5. Current Mission Control Implementation

The current guide defines workflows, state machines, events, retries, idempotency, reconciliation, artifacts, evidence, context packages, and provider integration. It does not yet present one canonical event envelope, workflow migration protocol, compensation model, schema registry, or storage responsibility map spanning the complete factory.

## 6. Future Vision

Workflow definitions, event schemas, and projections should have compatibility tests and migration tooling. Operators should replay events into derived stores, inspect causation, migrate eligible active runs, and reconcile provider state without rewriting history. Storage policy should enforce tenancy, retention, residency, encryption, and cost by data class.

## 7. Versioned references

- [Factory Configuration, Workflow Contracts, and Execution Manifests](../04-domain-model/02-factory-configuration-workflows-and-execution-manifests.md)
- [Tasks, Attempts, Leases, Idempotency, and Recovery](../05-runtime-architecture/03-tasks-attempts-leases-idempotency-and-recovery.md)
- [CloudEvents specification](https://cloudevents.io/), accessed 2026-08-30

## 8. Notes and lessons learned

An event is evidence that a producer reported something. The control plane still decides whether that report is authentic, current, relevant, and sufficient for an authoritative transition.

## 9. Design review questions

1. How do you migrate an active workflow version?
2. Why is exactly-once delivery not the same as exactly-once outcome?
3. What belongs in the event envelope?
4. When should a vector database be rebuilt?
5. How does compensation differ from rollback?

## 10. Whiteboard exercise

Connect a repository webhook, worker queue, artifact store, deployment provider, evidence store, search index, and analytics warehouse. Add duplicate and out-of-order events, a schema upgrade, and an ambiguous publication. Mark truth and reconciliation boundaries.

## 11. Hands-on lab

Implement or simulate two versions of a typed event and workflow. Process duplicates and out-of-order delivery, rebuild one derived projection, store a large artifact by digest, and compensate one partial effect. Retain event schemas, migration, state history, and reconciliation evidence.
