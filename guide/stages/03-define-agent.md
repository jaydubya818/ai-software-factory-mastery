---
title: "Stage 3 · Define Agent"
part: stages
stage: 3
chapter: null
summary: How released work is bound to exact, eligible capability versions and frozen in an execution manifest before a worker is admitted.
absorbs: []
infographics: []
---

# Stage 3 · Define Agent

[Stage 2](./02-plan.md) decides which capability class should perform each Task. Stage 3 resolves that decision into an exact, policy-eligible binding. “Define agent” does not mean inventing a persona for every task. It means selecting an approved **Agent Definition**, resolving its dependencies and authority, and freezing what will run.

This is a concise orientation brief. [Chapter 10](../03-build/10-the-agent-factory.md) owns capability lifecycle; [Chapter 17](../03-build/17-models-routing-and-capability-selection.md) owns model selection. Next: [Stage 4 · Execute through Harness](./04-execute-through-harness.md).

## Purpose

A production agent needs a contract, not just a prompt. A prompt and model name do not reveal which behavior produced an incident, what tools it could use, what data it could read, what budget applied, or who owned the capability. They also encourage silent mutation when a prompt, model, tool, or retrieved instruction changes.

An **Agent Definition** is a versioned capability contract. It declares purpose, eligible task classes, instructions by digest, model requirements, skills, tool grants and denials, context policy, data eligibility, budgets, stop conditions, escalation, evaluation suite, observability, owner, and version. The definition remains distinct from the agent identity, runtime principal, and credentials. A definition is never a key.

## Inputs

- Released WorkOrders and Tasks with capability-routing decisions.
- The Agent Factory catalog of published Agent Definitions, skills, tools, model profiles, and context packages.
- Evaluation and reliability history for eligible versions.
- Factory policy, data classification, risk, budget, verifier, and sandbox requirements.

## What happens

Resolution begins with eligibility. The system removes any capability that cannot satisfy the Task’s data rules, repository and path scope, tool permissions, evaluation status, evidence requirements, or policy. It then ranks the eligible set by observed reliability for the task class, latency, availability, and cost per trusted outcome.

The selected Agent Definition requests model capabilities rather than a vendor-specific product. A model route resolves those requirements to an eligible provider and version. Switching models is therefore a controlled re-evaluation and routing change, not a workflow rewrite. Without evaluation history, this independence is only an interface claim.

Default to one agent. Add another only at a real boundary: different authority, isolated context, distinct capability, useful parallelism with controlled shared state, or independent verification. Producer and verifier must be separate. A crew of role-playing agents that share the same context and permissions usually adds tokens and handoffs without adding independence.

The system resolves exact Agent Definition, model route, skill, tool-contract, context, policy, sandbox, budget, and verifier versions. It compiles them into an immutable **Execution Manifest** under a named **Factory Version**, calculates a digest, and performs policy preflight. No worker is admitted when a required dependency is unpublished, incompatible, stale, quarantined, or unresolved.

## Outputs

- An exact Agent Definition or non-agent capability binding per Task.
- A resolved model route with eligibility and ranking rationale.
- Exact skills, tools, context, policy, budgets, sandbox, and verifier bindings.
- An immutable, digested Execution Manifest under a Factory Version.
- A policy-preflight result or a clear denial requiring escalation.

## Governing decision

Capability owners decide what versions exist and whether they are published. Deterministic policy filters eligibility, resolves versions, compiles the manifest, and denies unsafe admission. Humans approve high-risk bindings and any fallback that changes security, quality, cost, or evidence. The model cannot choose a wider grant or approve its own fallback.

## Required evidence

Retain the Task and WorkOrder IDs, routing request, candidates considered, eligibility exclusions, evaluation status, ranking result, exact dependency versions, grants and denials, context and sandbox policy, budget, Factory Version, manifest digest, preflight result, and any human exception decision.

## Common failure

The common failure is silent configuration drift. A run records the prompt but not the model, tools, context, or environment that actually produced the result. When behavior changes, nobody can reproduce it. Freeze the complete binding before admission and treat every behavior-changing dependency as versioned.

## In Mission Control

At study commit [`d902fae`](https://github.com/jaydubya818/MissionControl/tree/d902fae7032c0696b531c44ae88829c652516fc6), Mission Control implements versioned agent records, model routes, provider-neutral harness manifests, sandbox profiles, context packages with version ranges and lock files, and versioned Factory Configurations with digests and readiness checks. Admission checks exact model route, harness, sandbox, worker, and Factory Version. Skill discovery and linting also exist.

Exact skill-version binding in every manifest is **partial**. A study branch associated with PR #64 adds stronger frozen agent, code-scope, workflow, and per-step manifest contracts, but it is not on `main`. A single Agent Factory boundary with uniform publication, dependency resolution, compatibility testing, deprecation, quarantine, and revocation across every capability type is **future**. The studied production execution path was also blocked by operator configuration, so live fleet-scale binding is not demonstrated.

## Retain this

- An enterprise agent is a versioned capability contract, not a prompt plus a model.
- Keep definition, identity, runtime principal, and credentials separate.
- Filter for eligibility first, then rank reliability and cost per trusted outcome.
- Default to one agent; add another only at a real architectural boundary.
- Freeze every behavior-changing dependency in a digested manifest before admission.
- The Agent Factory publishes capabilities; the control plane binds them to authorized work.

## Canonical chapters

- [Chapter 10 — The Agent Factory](../03-build/10-the-agent-factory.md)
- [Chapter 17 — Models, routing, and capability selection](../03-build/17-models-routing-and-capability-selection.md)
- [Chapter 18 — Agent and loop engineering](../03-build/18-agent-and-loop-engineering.md)
- [Chapter 26 — Security](../04-prove/26-security.md)
