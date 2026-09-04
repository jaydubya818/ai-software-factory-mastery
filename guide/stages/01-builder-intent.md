---
title: "Stage 1 · Builder Intent"
part: stages
stage: 1
chapter: null
summary: How a request becomes a governed Mission Spec with an explicit outcome, constraints, context, acceptance criteria, and risk before planning begins.
absorbs: []
infographics: []
---

# Stage 1 · Builder Intent

The factory starts with intent, not with a model. Stage 1 turns a request into an explicit outcome that every later decision can cite. It separates what the builder wants from how the factory may accomplish it, surfaces material ambiguity, and freezes the approved understanding before planning begins.

This is a concise orientation brief. [Chapter 6](../02-design/06-intent-and-specification-engineering.md) owns the complete intent and specification method. Next: [Stage 2 · Plan](./02-plan.md).

## Purpose

The stage prevents the most expensive factory failure: a capable system producing a well-tested solution to the wrong problem. A vague request such as “improve checkout performance” leaves the model to choose the affected flow, target percentile, acceptable regressions, and deployment risk. Those are product and engineering decisions, not gaps the model should silently fill.

Builder intent may arrive as an IDE request, product requirement, acceptance scenario, prototype, incident, security finding, or structured agent request. Every entry point must converge on the same governed contract. The builder should not need to know which model, harness, skill, or tool will eventually perform the work.

## Inputs

- The builder’s request and business reason.
- Standing repository, organizational, and policy constraints.
- Known system facts and prior decisions.
- The identity and authority of the requester.

The system may use an agent to organize the request and research missing context. Retrieved content can inform the specification, but it cannot grant authority or redefine the desired outcome.

## What happens

Stage 1 extracts five things:

1. **Objective:** the observable outcome and why it matters.
2. **Constraints:** requirements, non-goals, safety limits, deadlines, budgets, and architectural boundaries.
3. **Context scope:** the repositories, systems, environments, users, and data involved.
4. **Acceptance criteria:** how a reviewer and verification system will recognize success.
5. **Risk:** blast radius, reversibility, sensitivity, novelty, and required approval depth.

An agent may draft clearer language, propose criteria, identify contradictions, and rank questions. The builder resolves ambiguity that would materially change implementation, risk, cost, or acceptance. Minor assumptions may be made conservatively only when they are visible and reviewable.

The result is a durable **Mission** and an immutable, revisioned **Mission Spec** with stable requirement IDs. A revision does not overwrite the approved past; it creates a new record. Deterministic quality checks confirm that requirements are identifiable, the outcome is measurable, scope is explicit, criteria are testable, contradictions are absent, and no material clarification remains unresolved.

## Outputs

- A Mission naming the governed outcome and scope.
- An immutable Mission Spec at an exact revision.
- Stable requirement and acceptance-criterion identifiers.
- A risk classification and required approval policy.
- A clarification log and spec-quality result.

If the request is not fit to plan, the valid output is a clarification request—not a guessed specification.

## Governing decision

The human builder owns the outcome, non-goals, material clarifications, and accepted risk. An agent can propose structure and wording. Deterministic checks decide whether the required fields and invariants are satisfied. Policy establishes a risk floor; confidence cannot lower it.

Passing the quality check releases one exact Mission Spec revision to planning. It authorizes planning only. It does not approve an implementation or permit execution.

## Required evidence

The stage must retain the requester, source request, business reason, requirement IDs, constraints, affected scope, measurable criteria, risk result, clarification decisions, check results, timestamps, and exact approved revision. Downstream Plans and verification evidence must point back to these identifiers.

## Common failure

The common failure is mixing intent with implementation. A helpful agent selects a design, adds a refactor, or narrows the outcome before a human has agreed. Detect it when the Mission Spec contains an unapproved solution or a criterion that cannot be traced to the request. Return the ambiguity to the builder and create a new revision.

## In Mission Control

At `main` evidence commit [`b31e275`](https://github.com/jaydubya818/MissionControl/tree/b31e27564deb1c03c167e61b5ee094567c2ba7b1), Missions are durable records inside Company, Workspace, and Repository scope. They carry lifecycle, budget, corrective limits, stop conditions, plan linkage, human-attention fields, and acceptance criteria connected to later verification receipts. Mission creation requires a Business Justification, and the context router can choose clarification, deferral, one Task, or coordinator decomposition.

The separately frozen, ID-bearing Mission Spec and its full deterministic assurance gate are **partial**. On `main`, the Mission carries the outcome and criteria, while most quality enforcement occurs at the Plan level. A general contradiction engine, formal non-functional-requirement schema, and independent spec-assurance gate are **not implemented**. The future direction is a deterministic contract projection introduced in observe-only mode before enforcing a narrow gate.

## Retain this

- Stage 1 defines the outcome and boundaries; it does not choose the implementation.
- Objective, constraints, context scope, acceptance criteria, and risk must all be explicit.
- Agents may clarify intent, but cannot silently redefine it.
- The Mission Spec is immutable and revisioned; downstream evidence cites exact requirement IDs.
- A truthful clarification request is better than fast work against an invented requirement.

## Canonical chapters

- [Chapter 5 — Authoritative records](../02-design/05-authoritative-records.md)
- [Chapter 6 — Intent and specification engineering](../02-design/06-intent-and-specification-engineering.md)
- [Chapter 7 — Governance, policy, and risk-proportional approval](../02-design/07-governance-policy-and-risk-proportional-approval.md)
