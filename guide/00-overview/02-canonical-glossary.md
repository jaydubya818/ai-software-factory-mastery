---
title: Canonical Glossary
status: draft-for-study
audience:
  - all
last_verified: 2026-08-25
mission_control_commit: ff0524ea0dac4159535d463fcf8787dc6dca0b91
---

# Canonical Glossary

This glossary defines terms by the responsibility they own. A useful definition
also states what the concept does not prove or authorize.

## Factory concepts

**AI Software Factory** — A governed engineering operating model that turns
business intent into validated customer value through human accountability,
agent execution, policy, independent validation, evidence, and feedback. It is
larger than a coding tool or agent runtime.

**Agentic software factory** — An informal synonym that emphasizes the use of
agents across the software lifecycle. This guide uses **AI Software Factory**
as the canonical product and operating-model term; “agentic” describes how some
work is executed, not a reduction of the factory to agents alone.

**Agentic software engineering** — An engineering mode in which model-driven
agents pursue bounded outcomes through tools and an observe-adjust loop while a
deterministic platform owns authority, state, evidence, recovery, and delivery
controls. It does not mean replacing every deterministic workflow with an
agent.

**Intent-to-Delivery Lifecycle** — The factory value stream summarized as
`Intent → Plan → Define Agent → Execute through Harness → Apply Skills →
Evaluate → Improve → Deliver Software`. It is a mnemonic, not a literal call
graph: skills execute inside the harnessed loop and improvement changes future
versions through governed promotion.

**Coding assistant** — A system that suggests, explains, or generates code under
direct human control. It does not own a governed delivery lifecycle.

**Agent** — A model-driven worker that can reason, choose tools, act, observe the
result, and continue toward a bounded objective. Capability does not imply
authority.

**Agent Definition** — A versioned declaration of an agent's role, objective,
instructions, capabilities, eligible models, tools, skills, context policy,
permissions, budgets, stop conditions, escalation, success criteria, and
evaluation policy. It is configuration, not a credential.

**Agent Harness** — The runtime and control system that compiles an execution
manifest, routes models, supplies context, invokes tools, applies policy,
isolates execution, tracks state, enforces budgets and stop conditions,
recovers from failure, and emits telemetry and evidence.

**Skill** — A reusable, versioned, evaluated method that supplies instructions,
decision criteria, examples, and tool-use patterns for a class of tasks. A
skill teaches behavior; it does not grant authority or certify its own result.

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

**Specification baseline** — An approved, immutable version of requirements,
criteria, assertions, assumptions, constraints, and rationale. A material
change creates a new baseline and triggers impact analysis.

**Invariant** — A condition that must remain true across all permitted states
and transitions, such as tenant isolation or the prohibition on accepting a
WorkOrder from a stale Attempt.

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

## Quality and assurance concepts

**Quality Contract** — A versioned, machine-readable specification of the
requirements, constraints, risks, verification methods, evidence, hard gates,
approvals, release policy, and production signals required for one WorkOrder or
release candidate. It defines what “done” means before execution.

**Validation assertion** — A stable, testable claim derived from a requirement.
It identifies the expected outcome, method, pass condition, required evidence,
independence, and waiver policy.

**Verification receipt** — An immutable record that a known verifier applied a
defined method to an exact artifact and observed a result in a defined context.
It is an observation, not the acceptance decision.

**Trajectory evaluation** — Evaluation of how an Attempt reached its output,
including its context, tool calls, permissions, policy decisions, budgets,
recovery, and stop behavior. A correct artifact does not excuse an unauthorized
or materially unsafe trajectory.

**Verification Run** — One immutable evaluation of a versioned verification
contract against an exact candidate and manifest. A rerun creates a new record;
it does not replace the history of an errored or failing run.

**Change Budget** — A machine-enforced boundary over changed paths, change size,
and permitted change types. It constrains an Attempt's mutation authority but
does not prove that an in-budget change is correct.

**Quality Gate Decision** — A versioned policy decision over an exact Quality
Contract, candidate, and evidence set. It records eligibility, explanation,
missing or conflicting proof, and required human decisions.

**Publication permit** — A scoped, expiring, usually single-use authority to
perform one external publication action for an exact repository, WorkOrder
revision, candidate, and gate decision. It is not merge or deployment approval.

**Requirement-to-evidence graph** — The traceable relationships among intent,
requirements, assertions, implementation artifacts, verification methods,
receipts, policy decisions, releases, and production outcomes. Missing, stale,
waived, contradictory, and counterevidence relationships remain explicit.

**Quality Proof Package** — The complete assurance case for one exact release
candidate, including its Quality Contract, evidence graph, raw artifacts,
provenance, validator receipts, risks, gates, waivers, approvals, deployment,
and production evidence.

**Software Quality Certificate** — A concise, signed projection stating that an
exact artifact satisfied a particular Quality Contract using referenced
evidence and approvals at a particular time. It does not claim the artifact is
defect-free and may expire, be revoked, or be superseded.

**Evidence envelope** — A normalized immutable record binding a typed claim,
producer, method, time, and native artifact to an exact subject digest.

**Certificate revocation** — An authorized declaration that a previously issued
certificate must no longer be relied upon, without deleting its history.

**Hard gate** — A non-compensable policy condition. A failing hard gate blocks
advancement regardless of aggregate quality or trust score.

**Quality confidence** — A multidimensional assessment of the strength,
coverage, independence, freshness, provenance, and reproducibility of evidence
for one artifact. A numeric projection may aid trending but cannot replace hard
gates.

**Artifact Trust** — Confidence in one exact change or release candidate based
on its current evidence. It is distinct from the historical trust of the agent
that produced it.

**Agent Trust** — Historical evidence about the reliability and policy
compliance of a governed executor configuration. It constrains eligible
autonomy but cannot certify a particular artifact.

## Runtime concepts

**Orchestrator** — The control-plane actor that sequences authorized work,
selects eligible execution paths, reacts to events, and escalates exceptions. It
does not approve its own plan or evidence.

**Executor** — A runtime adapter that performs authorized work using a specific
agent or tool environment and returns structured events, artifacts, and status.

**Completion report** — The explicit terminal report for an Attempt. It records
whether execution succeeded, partially completed, blocked, failed, or was
cancelled; identifies exact artifacts and criteria; and states unresolved
findings and required human action. It does not accept the WorkOrder.

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

**Attestation** — A typed claim made by an identified producer about one or more
immutable subjects. A valid attestation does not by itself prove quality.

**Software Bill of Materials (SBOM)** — A machine-readable inventory of the
components and dependency relationships associated with an artifact. It aids
supply-chain analysis but does not prove that the artifact is secure.

**Trace context** — Correlation metadata propagated across service and
asynchronous boundaries. It connects observations but does not confer authority.

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

**Factory maturity level** — An evidence-backed description of the operating
capability achieved by a specific workflow, repository, risk class, and
environment. It is not a permanent organization-wide badge.

## Context and configuration concepts

**Context Package** — A versioned, addressable unit of supplied context that an
agent may load during execution, identified by a `scope/name` slug and carrying
a declared type such as skill, rules, documentation, workflow, tool guide, or
prompt template. It supplies material to reason with; it does not grant
authority, and loading one does not certify that its contents are current.

**Context policy** — The rules determining which Context Packages an agent is
eligible to load for a given task, and under what budget. It constrains what
may enter the working set; it does not guarantee the agent used what it loaded.

**Context miss** — An observed condition in which an Attempt lacked context it
needed and that the factory could have supplied. It is evidence about the
context system, not a verdict on the agent.

**Context overload** — An observed condition in which an Attempt was supplied
more context than it could use effectively. It indicates a budgeting or
selection defect; more retrieval is not the remedy.

**Factory Memory** — The governed retrieval surface over a factory's own
accumulated artifacts, decisions, traces, and outcomes. It is a first-class
subsystem serving factory execution, not a general enterprise search product or
a sidecar chatbot, and retrieval from it is not evidence.

**Recipe** — A reusable, versioned execution pattern describing how a class of
work is normally carried out, including the shape of the plan, the agents and
skills typically involved, and the expected verification. A recipe proposes an
approach; it does not authorize execution or accept a result.

**Factory Version** — The versioned, resolved configuration of the factory in
force for a unit of work, binding together the applicable policy, recipes,
context policy, and routing decisions. It makes an execution reproducible and
attributable; it is not itself an approval.

**Model routing** — The policy-governed selection of which model serves a given
step, based on declared eligibility, capability, cost, and risk. A routing
decision is a configuration outcome; it does not widen the authority of the
work being routed.

## Factory learning and improvement

**Learning signal** — An observed, attributable indication that the factory's
own configuration, context, routing, or process underperformed — for example a
human correction, a repeated instruction, a verification or deterministic gate
failure, a context miss or overload, a routing or tool-selection mismatch, a
recipe mismatch, config drift, unnecessary agent usage, or token waste. A
signal carries evidence and severity; it explicitly carries **no acceptance
authority** and cannot by itself change any governed record.

**Signal severity** — The operator-facing weight assigned to a learning signal:
Low, Medium, High, or Critical. Severity orders attention; it does not
determine whether a change is permitted.

**Learning cluster** — A grouping of related learning signals over a bounded
window, used to distinguish a recurring systemic pattern from an isolated
incident. Clustering is an analytical projection; it creates no obligation and
proves no cause.

**Improvement candidate** — A specific, typed proposal derived from clustered
signals — such as adding or modifying a deterministic gate, updating a prompt,
agent rule, skill, or context policy, changing a recipe, retry policy, model
routing, or tool configuration, replacing an agent with deterministic code, or
adding documentation. It is a proposal for human review, not a decision, and
generating one grants no authority to apply it.

**Governed experiment** — A bounded, reversible trial of an improvement
candidate under explicit success criteria, scope, and stop conditions, run so
that its effect can be measured before any durable change. An experiment
produces evidence; it does not promote itself.

**Promotion recommendation** — The evidence-backed suggestion that a validated
improvement be adopted into the standing factory configuration. It remains a
recommendation until a human with the relevant authority accepts it.

**Meta-loop** — The governed loop by which the factory improves its own
configuration and process: signals are observed, clustered, turned into
candidates, reviewed by a human, trialled as experiments, and only then
promoted. Its defining constraint is that it may not self-authorize, mutate
governance, bypass verification, or become a token sink.

**Recursive improvement boundary** — The invariant that the system improving
the factory is subject to the same policy, verification, and acceptance
controls as the work the factory performs. A learning subsystem is not exempt
from the governance it informs.

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
