---
title: Orchestration Failure, Recovery, and Cost Lab
status: review-ready
audience: [architect, platform, operations, ai-engineer, quality, finance, builder]
last_verified: 2026-08-30
lifecycle: [execute, verify, learn]
risk: high
topics: [orchestration, failure-recovery, budgets, cost, replay]
lab_type: failure-injection
---

# Orchestration Failure, Recovery, and Cost Lab

## Quick Read

Prove bounded convergence and safe recovery under provider degradation,
unknown side effects, budget pressure, duplicate delivery, partial multi-step
results, and human escalation. Attribute the whole cost to the accepted or
failed outcome.

## 1. Synthetic workflow

Build a three-step workflow: inspect a synthetic repository, generate a small
change, and publish a mock review request. Pin workflow, model profile, tools,
context, policy, evaluator, environment, attempt/tool/time/token/cost budgets,
stop conditions, and approved fallback.

## 2. Baseline

Run the exact workflow three times. Record output quality, attempts, tool/model
calls, queue and execution latency, tokens, tool/environment/evaluator cost,
human review time, and accepted outcome. Establish expected error and stop
behavior before injecting faults.

## 3. Failure injections

1. Duplicate one dispatch command and prove lease/state/idempotency controls
   prevent duplicate execution.
2. Return transient model errors long enough to open a circuit. Verify bounded
   jittered backoff and either approved fallback or explicit pause.
3. Make the publish tool time out after applying a mock side effect. Verify
   reconciliation before retry.
4. Feed repeated evaluator failures with no measurable improvement. Verify the
   loop stops and escalates instead of spending the remaining budget.
5. Exhaust the token or monetary reservation one unit before a model call.
   Verify no overrun and that safe teardown/containment capacity remains.
6. Crash the controller after a child result but before the join commit. On
   restart, reconcile the result exactly once.
7. Pause and resume after changing a governing context or capability version.
   Verify resume is denied and a new attempt or explicit replan is required.

## 4. Required evidence

Retain scenario and execution manifests; admission and reservations; workflow
state transitions; leases and deduplication; model/tool calls; retry, circuit,
fallback, stop, pause, and reconciliation events; context/version comparison;
candidate artifacts and evaluator results; human escalation and acceptance;
and a ledger separating reserved, incurred, failed, recovered, human, and
unallocated cost.

## 5. Pass criteria

| Control | Required result |
|---|---|
| Durable state | No invalid transition, orphaned lease, or lost child result |
| Retry safety | No unknown effect is retried before reconciliation |
| Convergence | Acceptance or declared stop occurs inside every hard budget |
| Fallback | Only the pinned qualified fallback is used; changed profile is visible |
| Resume | Governing drift prevents continuation under the old manifest |
| Evidence | Reviewer can compare baseline, failures, recovery, and final outcome |
| Cost | Total cost reconciles to reservations and exact outcome status |

Any silent budget extension, unsafe retry, dropped partial result, self-
accepted output, or unexplained cost is a failure.

## 6. Cleanup and review

Cancel remaining runs, drain queues, revoke grants, delete synthetic
workspaces and mock review requests, retain the evidence bundle, and record
known gaps. Repeat with the approved fallback disabled to prove safe
unavailability rather than improvised routing.
