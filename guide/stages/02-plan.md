---
title: "Stage 2 · Plan"
part: stages
stage: 2
chapter: null
summary: How an approved Mission Spec becomes a versioned Plan, Quality Contract, governed work graph, and capability-routing decision before execution is authorized.
absorbs: []
infographics: []
---

# Stage 2 · Plan

[Stage 1](./01-builder-intent.md) defines what outcome is wanted. Stage 2 defines how the factory proposes to achieve it and how success will be proved. The result is not a chat transcript or a disposable checklist. It is an executable, versioned contract approved at one exact revision.

This is a concise orientation brief. [Chapter 6](../02-design/06-intent-and-specification-engineering.md) owns specification and quality contracts; [Chapter 23](../03-build/23-agent-and-loop-engineering.md) owns decomposition and topology. Next: [Stage 3 · Define Agent](./03-define-agent.md).

## Purpose

Planning converts intent into bounded work without silently changing it. A useful Plan explains what will change, why, in what sequence, which work may run concurrently, which systems and paths are affected, what the budget and stop conditions are, and which evidence will prove every acceptance criterion.

The planner is replaceable. It may be a human, an agent, or deterministic software for a known change class. The governed artifact is the Plan. Preserving that distinction allows the factory to change planning methods without changing approved work or losing accountability.

## Inputs

- The immutable Mission Spec at an exact revision.
- The active Project Constitution or Factory Configuration.
- Repository and system facts gathered during investigation.
- The capability catalog and its evaluation history.
- Policy, risk, budget, and delivery constraints.

If investigation exposes a material gap in intent, planning stops and returns to Stage 1. The planner does not patch the specification in place.

## What happens

The planner creates a proposed sequence of bounded **WorkOrders** and Tasks. Each unit names its objective, inputs, outputs, affected resources, dependencies, failure behavior, budget, eligible capability class, and acceptance criteria. Dependencies form a graph only where the work requires one; decomposition exists to expose governance and routing boundaries, not to maximize the number of agents.

The Plan also defines a **Quality Contract** before generation. It carries each requirement into checkable assertions, invariants, evidence requirements, currentness rules, and approval policy. Traceability must run in both directions:

> Mission requirement → Plan assertion → WorkOrder → acceptance criterion → verification check

Every requirement must reach a check. Every check must justify itself through an approved requirement, policy, or risk control. This catches both dropped scope and helpful additions that were never authorized.

Capability routing is the last planning decision. First filter for eligibility: data classification, tool scope, repository access, policy, evaluation status, and required evidence. Then rank eligible options by demonstrated reliability and cost per trusted outcome. The correct route may be a deterministic transformation, a versioned skill, one agent, several agents at a real coordination boundary, or a human.

## Outputs

- One versioned, digested Plan at an approved revision.
- A derived Quality Contract.
- Governed WorkOrders, Tasks, and dependency edges.
- A capability-class routing decision for each Task.
- Investigation findings, open questions, budgets, and stop conditions.
- A recorded approval or rejection decision.

Approval releases governed WorkOrders. It does not dispatch them. Admission and execution remain separate decisions.

## Governing decision

The planner proposes investigation findings, decomposition, sequence, routing, and verification. Deterministic checks enforce traceability, internal consistency, policy compatibility, and required fields. A human decides whether the risk, cost, scope, and approach are acceptable, then approves one exact Plan revision.

Any revision after approval is a new Plan that requires a new decision. A changing digest invalidates the old approval.

## Required evidence

Retain the Mission Spec revision, Plan digest, authoring method, investigation sources, requirement-to-check traceability, dependency graph, affected resources, budgets, routing rationale, Quality Contract, risk result, approver identity, decision, and timestamp. The released WorkOrders must cite the approved revision.

## Common failure

The common failure is treating plausible prose as an executable plan. It lacks traceability, recovery behavior, or exact approval, then drifts as the session changes. Detect it when a Task cannot name the requirement it serves or the evidence that will close it. Freeze the contract before execution and return material scope changes to Stage 1.

## In Mission Control

At `main` evidence commit [`b31e275`](https://github.com/jaydubya818/MissionControl/tree/b31e27564deb1c03c167e61b5ee094567c2ba7b1), Mission Control implements versioned `missionPlans`, validation assertions, WorkOrder blueprints, submission, approval, rejection, revision forking, and atomic idempotent WorkOrder release. WorkOrders carry outcome, risk, scope, acceptance, revision, supersession, and audit data. Approval and release are distinct from scheduler dispatch.

Traceability exists through linked assertions, criteria, WorkOrders, and verification receipts, but a bidirectional completeness gate is **partial**. Tasks and parents represent parts of the work graph; dependency edges with explicit shared-state and branch-failure policy are not fully first class. Model-route selection and the context router provide partial capability routing, while skills, deterministic automation, and humans as uniform route types remain direction. A proposed continuous-quality contract projection is **design input only**, not implemented capability.

## Retain this

- Planning converts approved intent into an executable contract.
- The planner is replaceable; the versioned Plan is governed.
- Quality is specified before generation through a derived Quality Contract.
- Trace every requirement to evidence and every check back to authority.
- Plan approval releases governed work; it does not dispatch execution.
- Route by eligibility, demonstrated reliability, then cost—not by agent count.

## Canonical chapters

- [Chapter 5 — Authoritative records](../02-design/05-authoritative-records.md)
- [Chapter 6 — Intent and specification engineering](../02-design/06-intent-and-specification-engineering.md)
- [Chapter 23 — Agent and loop engineering](../03-build/23-agent-and-loop-engineering.md)
- [Chapter 31 — Quality contracts, proof packages, and certificates](../04-prove/31-quality-contracts-proof-packages-and-certificates.md)
