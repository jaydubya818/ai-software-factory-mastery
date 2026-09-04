---
title: "Stage 4 · Execute through Harness"
part: stages
stage: 4
chapter: null
summary: How a frozen execution manifest becomes bounded, durable, recoverable work and an immutable Candidate under deterministic harness control.
absorbs: []
infographics: []
---

# Stage 4 · Execute through Harness

[Stage 3](./03-define-agent.md) freezes what may run. Stage 4 runs it. A worker receives a fenced lease, provisions an isolated environment, invokes the model through a harness, executes permitted tools, persists state, enforces budgets, and records what actually happened. The stage ends with an immutable **Candidate**, not a claim of correctness.

This is a concise orientation brief. [Chapter 12](../03-build/12-durable-execution.md) owns durable Attempts and recovery; [Chapter 13](../03-build/13-coding-harnesses-and-agent-protocols.md) owns the harness. Next: [Stage 5 · Apply Skills](./05-apply-skills.md).

## Purpose

The model is probabilistic. Production control cannot be. The model may propose a next action, but it should not decide which credentials it receives, whether a tool call is authorized, whether a side effect may be repeated, what state survives a restart, how much budget remains, or whether its result is correct.

The harness is the boundary where probabilistic reasoning meets deterministic control. The model reasons. The harness controls. The runtime and control plane around it make work durable, bounded, observable, and recoverable.

## Inputs

- A released Task and its frozen Execution Manifest and Factory Version.
- A minimal, attributable Context Package.
- An isolated environment at the exact repository revision.
- Scoped, short-lived credentials for the Attempt.
- Budgets, stopping conditions, policy, and required event contracts.

## What happens

Admission confirms Task authority, worker identity, session, capability, capacity, Factory Version, backend, and environment. A worker claims one Attempt through an atomic, fenced lease. Heartbeats prove liveness. If the lease expires, reconciliation may assign a new generation; a late worker with the old fence can report an event but cannot continue mutating authoritative state.

The harness then runs a bounded loop: load Task and durable state; assemble current context; ask the model for a proposed action; check that action against policy; invoke the tool through a governed gateway; record the observation and receipt; update state and budget; and continue, checkpoint, retry, escalate, pause, cancel, or stop.

Model context is not workflow state or a transaction log. The Attempt record persists outside the model. Tool side effects use logical-operation idempotency keys owned by the orchestrator. A retry creates a new Attempt or step hypothesis without blindly repeating the external effect. Pause and cancel are explicit states, and recovery starts from recorded facts rather than regenerated conversation.

Context is also governed. The Attempt receives only the operational, repository, organizational, and historical context needed for its contract, with provenance and access checks. Retrieved text is untrusted data: content can suggest an action but cannot grant permission. Skills are applied inside this loop, and tools remain behind the same authorization boundary regardless of whether they use MCP or another transport.

## Outputs

- An immutable Candidate: exact diff, artifact, or action record with a digest.
- A truthful completion state: succeeded, partial, blocked, failed, or cancelled.
- Attempt events, checkpoints, tool calls, receipts, and policy decisions.
- Cost and budget consumption, environment and version lineage.
- Unresolved findings and the human action required, if any.

## Governing decision

The model proposes the next action. Deterministic policy decides whether it is permitted. The harness decides whether the loop continues and owns state, context, budgets, retries, and stopping. The control plane admits workers and owns leases. A human may intervene, pause, cancel, or approve a specified high-risk action. Nobody in this stage decides whether the Candidate is correct; that belongs to [Stage 6](./06-evaluate.md).

## Required evidence

Retain the manifest digest, Factory Version, Task and Attempt IDs, worker and lease generation, base revision, environment identity, context package, credential grants, tool arguments and receipts, policy decisions, checkpoints, cost, stop reason, artifact digest, and completion report. Side-effect receipts must bind the logical operation to its idempotency key.

## Common failure

The common failure is treating the model loop as the system. State lives in context, retries repeat effects, a restarted worker loses ownership, and “done” becomes success. Move state and authority outside the model, fence every worker, make transitions idempotent, and let independent evaluation judge the Candidate.

## In Mission Control

At `main` evidence commit [`b31e275`](https://github.com/jaydubya818/MissionControl/tree/b31e27564deb1c03c167e61b5ee094567c2ba7b1), WorkflowRuns act as Attempts with events, artifacts, runtime, isolation, steps, and failure detail. The governed scheduler rejects ineligible Tasks, permits first dispatch only without a prior Attempt, requires a reasoned retry after failure, retains previous Attempts, and checks idempotency. Tool calls carry risk decisions; execution uses Git worktrees with Docker or process isolation; provider contracts state capabilities such as cancel and resume precisely.

Fenced production leases are **partial** across the studied commits. The `main` invariant preventing two active Attempts relies on state inspection, while later study work adds heartbeat, fencing, stale recovery, and stronger admission. Complete per-Attempt manifests, production-grade recovery, and MCP as a first-class governed subsystem remain **future or partial**. The evidence supports progressive hardening, not a claim of fleet-scale durable execution.

## Retain this

- The model reasons; the harness controls execution, state, tools, budgets, and stopping.
- Model context is not durable workflow state or a transaction log.
- Retry the intent with a new hypothesis; do not blindly repeat a side effect.
- Context and tool content can inform action but cannot grant authority.
- Fenced leases, idempotency, pause, cancel, and recovery are production requirements.
- A Candidate is an output, not a success declaration.

## Canonical chapters

- [Chapter 11 — Control plane, orchestrator, and execution plane](../03-build/11-control-plane-orchestrator-and-execution-plane.md)
- [Chapter 12 — Durable execution](../03-build/12-durable-execution.md)
- [Chapter 13 — Coding harnesses and agent protocols](../03-build/13-coding-harnesses-and-agent-protocols.md)
- [Chapter 16 — Context engineering](../03-build/16-data-knowledge-semantic-and-context-engineering.md)
