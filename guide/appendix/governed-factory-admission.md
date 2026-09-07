---
title: "Governed Factory admission and independent verification"
summary: "How exact Factory composition becomes an admitted WorkOrder, an attributable Attempt, a frozen candidate, and an independently verified subject without collapsing human authority."
---

# Governed Factory admission and independent verification

A trustworthy software factory needs more structure than `prompt → agent → code`. That sequence cannot establish who authorized the work, which Factory composition ran, what runtime and repository were in scope, what exact candidate resulted, whether verification was independent, or who could accept and publish it.

The governed chain is:

> **Intent → Plan → Factory Version → WorkOrder → Task → Attempt → Unpublished Candidate → Verification Subject → Verifier Attempt → Human Decision → Release → Outcome → Learning**

Each object owns a different responsibility. Keeping them separate lets the control plane answer what was authorized, what happened, what evidence supports the result, and who controlled the consequential decision.

## Freeze the Factory composition

A **Factory Version** is the immutable, qualified composition allowed to govern a class of execution. It binds exact capability and policy identities, including its **Execution Profile**. The profile records the runtime, harness, model and tool capabilities, execution backend, environment, and applicable policy that an Attempt will use.

This layer prevents a model, harness, or agent framework from becoming the platform's implicit authority. Components remain replaceable, while the Factory owns the reproducible composition. Changing a material dependency creates a different composition and requires the appropriate versioning and qualification. Qualification makes a composition eligible for governed use; it does not activate it or authorize a WorkOrder.

## Derive readiness and admit the WorkOrder

A **WorkOrder** is the canonical governed unit of approved work, bound to an exact revision and Factory Version. Before admission, the control plane derives **Readiness** from current evidence. The relevant predicates can include Factory qualification, Execution Profile eligibility, worker and runtime identity, repository authority, environment containment, model and tool authority, budgets, verifier availability, and policy.

Readiness is a conclusion over authoritative records. A user, worker, or administrative shortcut must not set `READY` without the required evidence. When an identity changes or evidence expires, readiness changes with it.

An admitted WorkOrder can produce one or more bounded **Tasks**. A Task organizes executable work and inherits only the authority granted through its WorkOrder. Task completion cannot accept the parent WorkOrder.

## Execute through an authoritative Attempt

An **Attempt** is one authoritative execution of a Task with durable identity, authority, runtime, evidence, and outcome lineage. Its record binds the WorkOrder and Task to the exact Execution Profile, worker, runtime artifact, repository, lease or generation, execution evidence, and resulting candidate.

Retries, corrections, and recovery do not rewrite the original Attempt. They create new Attempts and preserve the failed or ambiguous history. This matters operationally: an unknown external result remains unknown until reconciliation establishes what happened, and repeated consequential effects require idempotency and exact identity checks.

## Freeze the producer output

Producer completion yields an **Unpublished Candidate**: an exact output with no inherited verification, acceptance, or publication authority. The Factory then creates a **Verification Subject** binding that candidate identity to a frozen verification contract.

The verifier must evaluate the subject, rather than a mutable working directory or the producer's claim about its output. Candidate substitution, a changed WorkOrder or repository, an incompatible contract, and stale evidence all create a different or invalid subject.

## Verify independently

A **Verifier Attempt** is a separate canonical Attempt that evaluates the frozen Verification Subject. Producer checks remain useful execution evidence, but they are not independent verification. The verifier must have distinct authority and must reject self-verification, stale candidates, mismatched subjects, and evidence that cannot be attributed to the exact execution.

Verification determines whether current evidence satisfies the verification contract. It does not accept, publish, merge, release, restore, or promote policy. Those actions retain explicit **Human Authority** when they are consequential.

The separation is deliberate:

> Producer completion ≠ independent verification ≠ human acceptance ≠ publication ≠ release ≠ observed outcome.

## Preserve evidence and failure

**Evidence** is the durable, attributable record of what was authorized, executed, observed, verified, or decided. Useful evidence names its exact subject, producer or verifier, method, environment, source revision, artifact, time, result, and validity window.

A failed Attempt remains failed. A stale subject remains stale. An ambiguous external action remains unknown until reconciled. Corrections create new evidence instead of cleaning up the historical record. This makes failure available for audit, recovery, cost analysis, and governed learning.

## Current Mission Control evidence

Mission Control qualified this architecture on main commit [`352a8ee`](https://github.com/jaydubya818/MissionControl/tree/352a8ee237091a5fb853fcecbdf5f94fad5a6e44) through a bounded deterministic synthetic path:

> **Factory Version → derived readiness → WorkOrder → Task → producer Attempt → Unpublished Candidate → Verification Subject → separate verifier Attempt**

The retained evidence binds the canonical worker and runtime identity, runtime artifact and digest, execution backend, producer and verifier Execution Profiles, exact WorkOrder revision, candidate, Verification Subject, verification plan, and current verification result. It also retains failed, stale, mutation, cancellation, and lease-expiry controls. Browser proof reads persisted backend records and demonstrates durable identity across reload.

The result is **Experimental** and specifically **SYNTHETIC_FACTORY_ADMISSION_QUALIFIED**. The qualification used zero external model calls, zero provider calls, zero model transmissions, zero publications, and zero Production mutations. Its evidence carries no production acceptance authority and cannot qualify behavioral skill effectiveness. It proves the bounded control-plane and admission architecture; live model behavior, broad autonomous engineering, arbitrary repositories or tools, production publication and activation, fleet reliability, provider economics, and production rollback require separate evidence.

## Design rules to retain

1. Freeze material execution identity before dispatch.
2. Derive readiness from current authoritative evidence.
3. Give every execution a durable Attempt identity.
4. Freeze the candidate before independent verification.
5. Keep producer and verifier Attempts separate.
6. Let verification establish eligibility while humans retain consequential authority.
7. Preserve failures, unknown results, stale evidence, and corrections as history.
8. Increase maturity claims only when the corresponding execution evidence exists.

See [Authoritative records](../02-design/05-authoritative-records.md), [Durable execution](../03-build/14-durable-execution.md), [Quality contracts and proof packages](../04-prove/31-quality-contracts-proof-packages-and-certificates.md), the [Context and skills operating practices](./context-skills-engineering.md), and the [canonical glossary](./glossary.md) for the surrounding contracts.
