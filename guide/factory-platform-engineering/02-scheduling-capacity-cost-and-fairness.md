---
title: Scheduling, Capacity, Cost, and Fairness
status: review-ready
audience: [architect, platform, sre, finance, ai-engineer]
last_verified: 2026-08-30
lifecycle: [execute]
risk: high
topics: [scheduler, admission-control, quotas, backpressure, finops]
---

# Scheduling, Capacity, Cost, and Fairness

## Quick Read

- **Purpose:** Govern scarce model, compute, environment, tool, and human-review capacity.
- **Best for:** Platform, reliability, AI infrastructure, and financial operations leaders.
- **Prerequisites:** [Runtime Orchestration](../05-runtime-architecture/02-runtime-orchestration-and-state-machines.md) and [Factory Economics](../03-operating-model/02-factory-economics-and-operating-metrics.md).
- **Reading time:** 14 minutes.
- **You will learn:** How admission, scheduling, quotas, backpressure, priority, preemption, and cost attribution work together.
- **Keep three ideas:** queues are policy; cost belongs to accepted outcomes; and human attention is a constrained resource.

## 1. The problem

Autonomous workloads can create unbounded demand. One complex run may consume many model calls, environments, tool requests, retries, and reviews. Without scheduling and budgets, urgent work waits behind experiments, providers rate-limit the fleet, costs become unattributable, and teams compete through informal escalation.

## 2. Why the problem exists

Capacity is multidimensional and time-varying. A worker may have CPU but lack a qualified sandbox, model quota, repository credential, regional access, or reviewer capacity. Task duration is uncertain. Retry storms amplify provider failures. Simple first-in-first-out queues ignore business priority, fairness, deadlines, and risk.

## 3. Enduring Principle

### Separate admission from scheduling

Admission answers whether work is eligible and budgeted. Scheduling chooses when and where eligible work runs. An admitted WorkOrder may wait; a free worker may remain unused if it cannot satisfy the execution contract.

### Make scheduling policy explicit

Inputs include priority, deadline, risk, tenant, workflow class, dependency readiness, estimated resources, locality, provider quotas, environment availability, cost budget, age, and human-review capacity. The decision and reason are observable.

### Apply layered budgets

Budget model tokens, provider spend, wall time, attempts, tool calls, environment hours, storage, network, and human attention at Attempt, WorkOrder, Mission, workspace, workflow, and organization levels. Reserve capacity for incidents and recovery. A fallback cannot evade the parent budget.

### Use fairness and backpressure

Weighted fair sharing prevents one tenant or workflow from monopolizing resources. Aging reduces starvation. Concurrency limits protect repositories and dependencies. Backpressure slows intake or rejects low-priority work before queues become unbounded. Users see the state and alternatives.

### Preempt carefully

Preemption requires checkpoint or cancellation semantics, cleanup, cost accounting, and evidence preservation. Do not kill non-idempotent external effects blindly. Prefer draining at safe boundaries.

### Attribute total cost to outcomes

Measure cost per accepted WorkOrder and validated outcome, including retries, failed Attempts, environments, verification, waiting, and human intervention. Token price alone hides system cost.

## 4. Tradeoffs and alternatives

Sophisticated schedulers improve utilization and are hard to explain. Begin with explicit priority classes, quotas, concurrency, aging, and reserved capacity. Predictive duration helps packing but can disadvantage novel work. Cost limits prevent runaway use and may block valuable investigation; provide scoped escalation with owner and expiry.

## 5. Current Mission Control Implementation

The current architecture includes queues, leases, worker capabilities, budgets, model routing, provider rate limits, concurrency, and health metrics. These support bounded execution.

The curriculum does not yet specify a complete admission and scheduling policy, fairness model, preemption protocol, capacity forecast, reviewer-capacity constraint, or end-to-end cost attribution. Existing economic metrics require this operational layer to become actionable.

## 6. Future Vision

Operators should forecast demand by workflow and capability, reserve recovery capacity, explain queue position, simulate policy changes, and attribute cost to accepted outcomes. The scheduler should adapt from measured durations without silently changing priority or risk policy.

## 7. Versioned references

- [Tasks, Attempts, Leases, Idempotency, and Recovery](../05-runtime-architecture/03-tasks-attempts-leases-idempotency-and-recovery.md)
- [Model Routing and Capability Selection](../06-ai-engineering/02-model-routing-evaluations-and-capability-selection.md)
- [Factory Economics and Operating Metrics](../03-operating-model/02-factory-economics-and-operating-metrics.md)

## 8. Notes and lessons learned

A queue is where business priority becomes runtime reality. If its policy is implicit, the factory has an invisible governance system.

## 9. Interview and discussion questions

1. Why are admission and scheduling different decisions?
2. Which resources require separate budgets?
3. How do you prevent starvation?
4. When is preemption unsafe?
5. Why is cost per token insufficient?

## 10. Whiteboard exercise

Schedule an incident, routine feature, security update, and large evaluation across constrained model quota, two sandbox pools, and one reviewer. Add a provider outage and retry storm. Explain every queue and preemption decision.

## 11. Hands-on lab

Simulate a queue with two tenants, three priorities, quotas, aging, and reserved incident capacity. Produce scheduling decisions and cost attribution. Trigger backpressure and one safe preemption. Retain the event log, metrics, and fairness analysis.
