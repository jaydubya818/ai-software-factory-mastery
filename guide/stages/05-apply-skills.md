---
title: "Stage 5 · Apply Skills"
part: stages
stage: 5
chapter: null
summary: How versioned organizational methods are bound before execution, applied inside the harness, measured, and matured into deterministic automation.
absorbs: []
infographics: []
---

# Stage 5 · Apply Skills

[Stage 4](./04-execute-through-harness.md) describes the controlled execution loop. Stage 5 explains how the agent receives the organization’s proven method for a particular class of work. A **skill** turns repeated instructions, standards, examples, and checks into a versioned capability that can be evaluated, owned, and improved once for every user.

This is a concise orientation brief. [Chapter 11](../03-build/11-the-agent-factory.md) owns the capability registry and lifecycle; [Chapter 23](../03-build/23-agent-and-loop-engineering.md) owns skill design inside loops. Next: [Stage 6 · Evaluate](./06-evaluate.md).

## Purpose

Without skills, every agent reasons from scratch or reads a copied prompt file. The method drifts between teams, nobody can identify which version produced a result, and routine work keeps paying the cost and variance of open-ended reasoning.

A skill is more than prompt text. Its contract includes purpose, instructions, required context, allowed tools, typed inputs and outputs, examples, policy, self-checks, an evaluation suite, an owner, and an immutable version. Removing the owner creates an orphan; removing evaluation creates an untested method; removing the version creates silent drift.

## Inputs

- The Task type and objective from the approved Plan.
- The bound Agent Definition and its permitted skill ranges.
- A skill catalog with versions, ownership, evaluation status, and policy.
- The frozen Execution Manifest and its tool and context grants.

## What happens

Eligible skill versions are resolved before the Attempt begins and written into the Execution Manifest. The resolution checks task class, Agent Definition compatibility, required context, tool contracts, data classification, policy, evaluation freshness, and dependency compatibility. The Attempt cannot quietly load a newer method halfway through execution.

During the harnessed loop, the agent may select among the eligible skills for a step. The harness loads only the relevant instructions, examples, and context. A skill may narrow how the agent works, but it cannot widen repository scope, data access, tool grants, budget, or autonomy. The model proposes; the governed tool boundary still decides whether an action occurs.

Each use emits a trace linking the skill ID and version to the Task, steps, tools, Candidate, evaluation result, human edits, and production outcome. That lineage lets the Agent Factory distinguish a bad method from a bad model route, stale context, a broken tool, or missing evaluation coverage.

Skills should mature. Early, uncertain work may require broad reasoning. Repeated successful work becomes a captured method with examples and checks. Stable, deterministic steps move into conventional software, where they become cheaper, faster, and more predictable. The aim is not to maximize AI use; it is to use reasoning only where judgment still creates value.

Tools and skills remain different. A tool performs an action through a contract. A skill describes a reusable method and may invoke tools. MCP or any other protocol can standardize connectivity, but it does not supply identity, authorization, validation, audit, or approval policy.

## Outputs

- Exact skill-version bindings in the manifest.
- The relevant method and context loaded inside the harnessed loop.
- Skill-use events linked to steps, tools, Candidate, and outcome.
- Findings for the skill’s evaluation suite and future improvement.
- A deterministic replacement candidate when repeated behavior no longer needs reasoning.

## Governing decision

Human capability owners author, review, publish, deprecate, and revoke skills. Deterministic policy filters eligibility, resolves exact versions, and enforces tool and context scope. The agent decides when an eligible skill helps with a step. Promotion of a new skill version follows governed evaluation; an active Attempt never promotes or rewrites its own method.

## Required evidence

Retain skill ID, exact version and digest, owner, publication state, evaluation status and freshness, dependency resolution, Agent Definition compatibility, Task and Attempt IDs, loaded context, invoked tools, policy decisions, use trace, Candidate digest, evaluation result, and any rollback or quarantine event.

## Common failure

The common failure is a shared prompt library presented as a capability system. Files can be discovered but not reliably versioned, qualified, attributed, or revoked. Detect it when an incident cannot be traced to one exact method and dependency set. Require publication, binding, evaluation, lineage, and rollback as part of the skill contract.

## In Mission Control

At study commit [`d902fae`](https://github.com/jaydubya818/MissionControl/tree/d902fae7032c0696b531c44ae88829c652516fc6), Mission Control implements skill discovery and linting alongside versioned agent records, model routes, context packages, harness manifests, sandbox profiles, Factory Versions, and Execution Manifests. These provide a meaningful capability-binding substrate.

Exact skill-version binding in every execution manifest and a complete draft-to-evaluated-to-published lifecycle are **partial**. A unified Agent Factory registry with dependency resolution, compatibility qualification, deprecation, quarantine, revocation, certification freshness, blast-radius previews, canaries, and transitive locks is **future**. Mission Control governs authorized use; the Agent Factory is the intended owner of reusable capability creation and publication.

## Retain this

- A skill is a versioned, evaluated, owned capability—not just prompt text.
- Bind exact skill versions before execution and apply them inside the harness.
- A skill never widens the Attempt’s authority, tools, data access, or budget.
- Tools act; skills package methods; the harness controls their use.
- Capture outcome lineage so failures can be attributed to the right component.
- As behavior stabilizes, replace unnecessary reasoning with deterministic automation.

## Canonical chapters

- [Chapter 11 — The Agent Factory](../03-build/11-the-agent-factory.md)
- [Chapter 18 — Agent architecture, tools, and MCP](../03-build/18-agent-architecture.md)
- [Chapter 23 — Agent and loop engineering](../03-build/23-agent-and-loop-engineering.md)
- [Chapter 40 — Governed learning and compounding engineering](../06-improve/40-governed-learning.md)
