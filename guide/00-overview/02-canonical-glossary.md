---
title: Canonical Glossary
status: draft-for-study
audience:
  - all
last_verified: 2026-08-07
mission_control_commit: 8014d5af427b43ff5c5a63cfdf82ec92742c208c
---

# Canonical Glossary

This glossary defines terms by the responsibility they own. A useful definition
also states what the concept does not prove or authorize.

## Factory concepts

**AI Software Factory** — A governed engineering operating model that turns
business intent into validated customer value through human accountability,
agent execution, policy, independent validation, evidence, and feedback. It is
larger than a coding tool or agent runtime.

**Coding assistant** — A system that suggests, explains, or generates code under
direct human control. It does not own a governed delivery lifecycle.

**Agent** — A model-driven worker that can reason, choose tools, act, observe the
result, and continue toward a bounded objective. Capability does not imply
authority.

**Agent platform** — Infrastructure for building and operating agents, including
tools, context, memory, identity, routing, and orchestration. It becomes part of
a factory only when connected to the engineering operating model.

**Control plane** — The authoritative system for intent, policy, identity,
authorization, workflow state, approvals, evidence requirements, audit, and
governance decisions. It decides what may happen.

**Execution plane** — The agents, processes, tools, worktrees, CI systems, and
deployment systems that perform authorized work. It reports results but does not
grant itself authority.

**Factory Configuration** — A versioned policy envelope connecting a repository
to approved workflows, executors, environments, tools, verifiers, budgets, risk
boundaries, and recovery limits.

## Governed delivery records

**Company** — The top-level organizational and accountability boundary.

**Workspace** — An isolated operating scope containing authorized people,
repositories, configuration, and factory records.

**Repository** — The registered source-control target against which work may be
authorized. A repository record does not itself permit modification.

**Mission** — A durable governed outcome. It owns the objective, business reason,
constraints, risk, acceptance criteria, and accountable owner. It is not an
agent session or task list.

**Plan** — A versioned proposal for achieving a Mission. Approval freezes and
authorizes an exact plan version. Plan approval does not dispatch work, merge
code, or deploy software.

**WorkOrder** — The bounded unit of engineering authority and acceptance. It
defines permitted scope, repositories, tools, agents, constraints, risk, budget,
acceptance criteria, quality gates, and required evidence.

**Task** — A bounded operational unit used to organize authorized WorkOrder
execution. Task completion does not accept the parent WorkOrder.

**Attempt** — One immutable execution try for a Task or WorkOrder. Retries create
new Attempts so history and causality are preserved.

**Evidence** — An attributable receipt or artifact that supports or refutes an
acceptance criterion. Useful evidence identifies the verifier, method,
environment, source commit, artifact, time, and result.

**Pull Request** — The review boundary that packages proposed repository changes
and their source lineage. An open or passing pull request does not prove Mission
acceptance or production value.

**Release** — A governed progression of an accepted change through merge,
deployment, activation, observation, rollback readiness, and production
verification. These states should not be compressed into “done.”

## Governance concepts

**Policy** — A versioned rule that determines whether an action is permitted,
blocked, or requires approval based on identity, scope, risk, evidence, and
environment.

**Approval** — A human decision granting a specific authority or accepting a
specific risk. Approval must identify its subject, scope, version, conditions,
owner, and validity window.

**Acceptance** — The governed decision that an outcome satisfies its defined
criteria. Execution completion and acceptance are different events.

**Independent validation** — Evaluation performed through a separate execution
and evidence path from the implementation that produced the change. Different
people are useful but not sufficient; technical separation is the core control.

**Validator** — An authorized actor or system that evaluates frozen criteria
against exact artifacts and emits independent evidence. A validator does not
alter the implementation it is certifying.

**Risk Review** — A governed escalation created when evidence is conflicting,
missing, unusual, or materially risky. Validator disagreement increases
governance; it is not resolved by majority vote.

**Review package** — A concise decision packet containing the original intent,
approved plan, changed scope, technical decisions, criterion-level evidence,
risks, deviations, uncertainty, rollback approach, and exact source lineage.

## Runtime concepts

**Orchestrator** — The control-plane actor that sequences authorized work,
selects eligible execution paths, reacts to events, and escalates exceptions. It
does not approve its own plan or evidence.

**Executor** — A runtime adapter that performs authorized work using a specific
agent or tool environment and returns structured events, artifacts, and status.

**Worktree** — An isolated Git working directory used to keep concurrent changes
separate and bind an Attempt to an exact repository state.

**Preflight** — The fail-closed evaluation performed before execution. It checks
authority, repository state, executor capability, environment, tools, secrets,
capacity, budget, risk, and policy.

**Lease and heartbeat** — Runtime controls that establish which worker currently
owns work and whether it remains alive. They help detect abandoned or duplicate
execution.

**Idempotency** — The property that repeating the same command does not create
duplicate authoritative effects. It is essential when events, retries, or
network responses may be delivered more than once.

**Immutable history** — An append-oriented record of plans, decisions, Attempts,
events, evidence, and revisions. Corrections create new records rather than
silently rewriting the past.

## Autonomy and trust

**Operational autonomy** — A revocable, scoped grant of authority. It belongs to
a governed workflow, not to a model.

**Trust Score** — A numeric internal signal from 0 to 100 used for eligibility
and trend analysis. It cannot override policy or grant authority directly.

**Trust band** — An operator-facing interpretation of the Trust Score: Very Low,
Low, Moderate, High, or Trusted.

**Promotion** — A human-approved increase in eligible autonomy after sustained
evidence. A model upgrade or isolated success cannot promote itself.

**Demotion** — A policy-driven reduction in eligible autonomy after declining
performance or a trust-loss event. It may occur automatically.

**Quarantine** — A fail-safe condition that prevents autonomous execution for an
affected scope until authorized review and recovery occur.

## Outcome measures

**Lead Time to Validated Customer Value** — Time from governed Mission creation
until the change is deployed, independently verified in production or an
equivalent environment, and the expected customer outcome is confirmed.

**Change Failure Rate** — The proportion of deployments that require rollback,
hotfix, emergency intervention, or cause a customer, reliability, security, or
SLO failure within the defined observation window.

**Engineering Leverage** — The increase in validated customer value delivered
per engineer without a corresponding increase in cognitive load, coordination,
or failure.
