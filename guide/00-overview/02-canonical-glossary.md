---
title: Canonical Glossary
status: draft-for-study
audience:
  - all
last_verified: 2026-08-28
mission_control_commit: d902fae7032c0696b531c44ae88829c652516fc6
---

# Canonical Glossary

This glossary defines terms by the responsibility they own. A useful definition
also states what the concept does not prove or authorize.

## Factory concepts

**AI Software Factory** — A governed engineering operating model that turns
business intent into validated customer value through human accountability,
agent execution, policy, independent validation, evidence, and feedback. It is
larger than a coding tool or agent runtime.

**Software Factory** — A repeatable delivery system that composes people,
process, automation, environments, quality controls, and feedback from intent
through production. An AI Software Factory uses agents as bounded participants;
the factory remains the larger engineering system.

**Agent Factory** — The governed capability supply chain that creates,
packages, versions, evaluates, publishes, discovers, admits, deprecates, and
revokes reusable agents, skills, tools, model profiles, and configurations. It
supplies capabilities to an AI Software Factory but does not authorize or
accept a particular delivery outcome.

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

**Builder Intent** — The outcome a builder is trying to achieve together with
its business reason, constraints, acceptance criteria, risk, source references,
and stop conditions. Intent is the product interface; a literal prompt is only
one input used to clarify it.

**Builder surface** — A UI, CLI, API, chat, IDE, or automation entry point
through which a developer, PM, QA engineer, designer, or other authorized
builder expresses intent, reviews evidence, or makes a decision. Every surface
must converge on the same authoritative contracts.

**Capability map** — A maintained mapping from builder outcomes and UI actions
to governed APIs or tools, shared state, required authority, evidence, and test
coverage. It exposes missing, shadow, duplicated, or human-only paths.

**Authorized action parity** — The property that an agent can achieve each
appropriate builder outcome through the same authoritative state transitions
and controls. It does not give the agent human-only approval or irreversible
authority.

**Coding assistant** — A system that suggests, explains, or generates code under
direct human control. It does not own a governed delivery lifecycle.

**Agent** — A model-driven worker that can reason, choose tools, act, observe the
result, and continue toward a bounded objective. Capability does not imply
authority.

**Autonomous agent** — An agent permitted to perform several steps without
human instruction at every step. Its autonomy remains scoped by policy,
permissions, budgets, stop conditions, evidence, and escalation.

**AI Coding Agent** — An agent specialized for repository investigation,
planning, code or configuration changes, testing, review, and related software
engineering work. Repository capability does not grant publication, merge,
release, or acceptance authority.

**Autonomous Coding** — Bounded software-engineering work that an AI Coding
Agent may pursue across several tool-use steps without continuous human input.
It describes execution autonomy, not autonomous approval, merge, or release.

**Agentic workflow** — A durable, versioned workflow in which one or more
agents perform bounded reasoning and tool-use steps under explicit contracts.
It is larger than an agent loop and retains progress when no model process is
running.

**Agent Definition** — A versioned declaration of an agent's role, objective,
instructions, capabilities, eligible models, tools, skills, context policy,
permissions, budgets, stop conditions, escalation, success criteria, and
evaluation policy. It is configuration, not a credential.

**Agent Harness** — The systems surrounding a model that make agent execution
usable and controllable through tools, context, state, lifecycle, budgets,
stop conditions, telemetry, and structured results. This guide separates the
inner harness from the outer harness so that execution behavior is not confused
with control-plane authority.

**AI Coding Harness** — An Agent Harness specialized for repository work such
as code search, file edits, commands, tests, Git operations, and development
feedback. Product integrations must still identify which inner- and
outer-harness responsibilities they implement.

**Inner Harness** — The coding or agent loop that prepares model input, manages
context, exposes and executes tools, streams observations, compacts or resumes
a session, and determines when one session stops. It does not own durable
cross-run workflow authority.

**Outer Harness** — The adapter and supervisor around an inner harness that
validates the execution contract, provisions the environment, translates
lifecycle events, enforces runtime budgets, captures artifacts, classifies
completion, and tears down resources. It cannot accept or publish its own work.

**Agent Runtime** — The execution substrate that starts, observes, controls,
and terminates agent sessions or Attempts using an exact harness, environment,
identity, and model route. Runtime capability does not establish business
authority.

**Skill** — A reusable, versioned, evaluated method that supplies instructions,
decision criteria, examples, and tool-use patterns for a class of tasks. A
skill teaches behavior; it does not grant authority or certify its own result.

**Agent platform** — Infrastructure for building and operating agents, including
tools, context, memory, identity, routing, and orchestration. It becomes part of
a factory only when connected to the engineering operating model.

**AI Engineering** — The engineering discipline that turns model capability
into reliable systems through data, knowledge, semantics, context, agents,
tools, structured outputs, routing, loops, evaluations, and runtime controls.
Model prompting is one technique within the discipline.

**Agent Orchestration** — The governed sequencing, routing, coordination, and
recovery of agent and deterministic workflow steps through typed state and
handoffs. It must preserve scope, authority, budgets, evidence, and stop
conditions across every participant.

**AI Infrastructure** — The shared model, data, knowledge, tool, identity,
runtime, environment, compute, telemetry, and evaluation services used to build
and operate AI systems. Infrastructure supplies capabilities; product and
control-plane contracts determine their authorized use.

**Control plane** — The authoritative system for intent, policy, identity,
authorization, workflow state, approvals, evidence requirements, audit, and
governance decisions. It decides what may happen.

**Mission Control** — The guide's living implementation and case study of an
AI Software Factory control plane. It governs Missions, execution admission,
verification, evidence, and human authority; it is not the universal definition
of a software factory or every component in the execution stack.

**Execution plane** — The agents, processes, tools, worktrees, CI systems, and
deployment systems that perform authorized work. It reports results but does not
grant itself authority.

**Factory Configuration** — A versioned policy envelope connecting a repository
to approved workflows, executors, environments, tools, verifiers, budgets, risk
boundaries, and recovery limits.

**Factory Version** — An immutable, activatable snapshot of Factory
Configuration and its exact workflow, agent, model-route, harness, sandbox,
policy, verifier, budget, and repository bindings. Creation does not establish
readiness or authorize execution.

**Workflow Contract** — A versioned definition of execution nodes or steps,
dependencies, input and output schemas, structured completion, failure policy,
timeouts, and required gates. It describes permitted orchestration, not the
authority to run it for a particular WorkOrder.

**Agent Binding** — The Attempt-specific association between a workflow role and
an exact Agent Definition or version, including its prompt, tool, model, skill,
and policy identities. A role name alone is not a reproducible binding.

**Compounding Engineering** — The governed practice of turning recurring human
corrections, friction, failures, and outcomes into evaluated improvements to
tests, deterministic controls, documentation, instructions, skills, tools,
context, routing, or workflows. Observation may be automated; promotion remains
scoped and reviewable.

## Tools, context, models, and interoperability

**Tool** — A typed executable capability through which an agent observes or
changes an external system. A tool supplies capability; policy and credentials
determine whether a particular call is authorized.

**Model Context Protocol (MCP)** — An interoperability protocol for exposing
tools, resources, prompts, and negotiated extensions between hosts and servers.
MCP standardizes communication and discovery; it does not by itself establish
tenant isolation, trustworthy tool behavior, least privilege, or acceptance.

**MCP Task** — A protocol-extension handle used to manage a long-running MCP
operation. It is not the same as a factory Task: the domain Task organizes
authorized WorkOrder execution and retains business and acceptance lineage.

**Agent Client Protocol (ACP)** — An editor-to-agent interoperability protocol
for portable coding-agent sessions and interaction. The acronym is ambiguous
outside this usage, so implementations must pin the specification and version.
ACP does not establish factory workflow authority or acceptance.

**Agent–User Interaction Protocol (AG-UI)** — An event-oriented protocol for
connecting an agent backend to a user-facing application through lifecycle,
message, tool, state, and interaction events. It does not make UI state the
authoritative factory state.

**Agent2Agent Protocol (A2A)** — An interoperability protocol through which
independent agent applications can discover capabilities, exchange messages,
delegate work, and manage remote tasks. Delegation through A2A cannot widen a
WorkOrder's authority or make a remote agent trustworthy by default.

**Data Understanding** — The discipline of determining whether source data is
complete, current, valid, consistent, attributable, permitted, and fit for a
particular decision. It precedes retrieval and model reasoning.

**Data Contract** — A versioned agreement describing a data source's schema,
semantics, owner, quality thresholds, freshness, lineage, sensitivity, allowed
uses, and failure behavior. A contract does not guarantee that current data
actually satisfies it.

**Knowledge Engineering** — The governed lifecycle that registers sources and
turns approved data and documents into normalized, indexed, retrievable,
correctable, and traceable knowledge. It prepares reusable knowledge; it does
not decide the final context for one Attempt.

**Semantic Engineering** — The design and operation of controlled vocabulary,
canonical identities, aliases, relationships, mappings, disambiguation, and
meaning across sources and systems. It prevents the factory from treating raw
string similarity as shared meaning.

**Semantic Contract** — A versioned agreement defining canonical concepts,
identifiers, aliases, relationships, disambiguation rules, source mappings,
ownership, and compatibility. A semantic change can invalidate retrieval,
context, evaluation, and evidence that depended on the prior meaning.

**Controlled vocabulary** — A versioned set of preferred domain terms,
definitions, aliases, and deprecated terms. It is the smallest useful semantic
control and need not become a full ontology.

**Ontology** — A formal model of domain concepts, relationships, and constraints.
It is useful when explicit semantic reasoning and integration justify its
modeling and maintenance cost.

**Entity resolution** — The process of determining when source-specific names
or identifiers refer to the same canonical entity while preserving provenance,
uncertainty, and correction history.

**Retrieval-Augmented Generation (RAG)** — A pattern in which model input is
augmented with information retrieved from external sources. RAG does not by
itself establish source quality, permission, freshness, semantic correctness,
or grounded output.

**Hybrid retrieval** — Candidate retrieval that combines complementary methods,
commonly lexical, vector, metadata, and relationship-based search. Its value
must be measured against the target query distribution.

**Reranking** — A second-stage method that reorders retrieved candidates for a
specific query or task. Reranking cannot recover a required item that candidate
retrieval omitted.

**Context engineering** — The design and operation of selecting, filtering,
ordering, budgeting, refreshing, and attributing the information available to
an agent for one task. More context is not automatically better context.

**Context Package** — An immutable, provenance-backed, budgeted set of code,
documents, decisions, history, and retrieval results frozen for one Attempt.
It is advisory input and cannot silently change approved intent or satisfy an
acceptance criterion.

**Context compaction** — The controlled replacement of a growing working
context with a smaller representation that preserves governing instructions,
accepted decisions, unresolved issues, evidence links, and necessary state.
Compaction is lossy and must not silently rewrite authority.

**Memory** — Durable information retained across runs, such as accepted
decisions, outcomes, failures, preferences, and recovery patterns. Memory is a
potentially stale or poisoned context source, not an authority record.

**Model gateway** — The governed interface that normalizes provider access,
identity, credentials, policy, telemetry, quotas, and failure handling. It
separates product workflows from provider-specific APIs.

**Model catalog** — A scoped inventory of available model routes and their
capabilities, constraints, cost, latency, availability, security classification,
qualification evidence, and lifecycle status. Registration does not imply
production eligibility.

**Exact model route** — A digest-bound execution identity that includes the
provider route, model, harness adapter and configuration, and runtime artifact.
It prevents a familiar model name from hiding materially different execution.

**Model router** — A policy-governed decision component that filters ineligible
routes, ranks eligible routes using quality, latency, cost, security, context,
availability, and historical outcomes, and records the applied decision and
fallback. Routing cannot override admission or acceptance policy.

**Task-Specific Agent Profile** — A versioned eligibility template that binds
the capabilities required for a task class to approved model routes,
instructions, tools, skills, context policy, harness features, budgets, and
verification. It is not permission to execute a particular WorkOrder.

**Conditional routing** — Selection of the next eligible agent, model, tool,
workflow node, fallback, or human decision from observable state and policy.
Model classification may inform the decision but cannot bypass deterministic
eligibility.

**Loop Engineering** — The design of bounded agent iteration, including
generation, verification, diagnosis, repair or replanning, changed-hypothesis
retry, convergence, budgets, stop conditions, fallback, and escalation. An
iteration cap is containment, not a substitute for progress detection.

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

**Decision packet** — An operator-facing explanation of the exact decision
required, why automation stopped, affected scope, risk, available and missing
evidence, safe options, recommendation, uncertainty, deadline, and what resumes
after the decision.

**Human-in-the-loop** — An operating mode in which a person performs a required
decision, approval, correction, or risk judgment inside the workflow. Human
presence is useful only when the decision and evidence are explicit.

**Human-on-the-loop** — An operating mode in which bounded work proceeds under
policy while a person supervises outcomes and handles exceptions. Supervision
does not mean reading every agent action.

**Human-out-of-the-loop** — An operating mode in which one bounded workflow
instance can complete without an in-run human decision. Prior human policy,
accountability, incident response, and promotion authority still apply.

**Attention Budget** — The expected and permitted human effort for a workflow,
including review, correction, approvals, escalation, and context reconstruction.
It is an operating metric, not permission to skip consequential judgment.

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

**Evaluation Engineering** — The discipline of designing representative tasks,
fixtures, datasets, trials, graders, metrics, comparisons, and promotion rules
for probabilistic system behavior. It complements artifact verification and
product validation rather than replacing them.

**AI eval** — A bounded evaluation of a versioned AI-system configuration on
representative tasks using explicit graders and metrics. This guide uses the
more precise records Eval Task, Trial, Evaluation Dataset, Evaluation Run, and
Promotion Decision instead of treating “evals” as one undifferentiated test.

**Eval Task** — One versioned evaluation case containing an objective, initial
state, constraints, criteria, expected evidence, and cleanup. It is a test input,
not a production WorkOrder.

**Evaluation Dataset** — An immutable, provenance-backed set of Eval Tasks with
membership, slices, inclusion and exclusion rules, contamination controls,
classification, and ownership.

**Evaluation Run** — A versioned set of Trials executed for one baseline or
candidate under comparable conditions, with task- and slice-level results,
uncertainty, grader versions, cost, artifacts, and a promotion recommendation.

**Trial** — One execution of one evaluated configuration against one Eval Task.
Repeated trials remain separate observations so consistency and variance can be
measured.

**Grader** — A versioned deterministic, model-based, or human method that
evaluates defined assertions and emits criterion-level findings. A grader's
output is itself subject to calibration, provenance, and independence concerns.

**LLM-as-judge** — A model-based grader used for bounded qualities that are
difficult to express deterministically. It must be calibrated for bias,
disagreement, presentation sensitivity, and correlated failure.

**Trace replay** — Read-only inspection or re-emission of retained run events
for diagnosis and testing. It does not recreate external effects or prove the
original outcome again.

**Execution replay** — A new Attempt that reconstructs an earlier manifest,
fixture, environment, and dependencies as closely as possible. Divergence is a
new observation; the original history remains immutable.

**Run comparison** — A structured comparison of baseline and candidate runs
across configuration, trajectory, artifact, criteria, cost, latency, policy,
recovery, and human intervention. Aggregate improvement cannot override a hard
gate or severe slice regression.

**Reproduction** — A versioned procedure and fixture that demonstrates an
observed failure under stated conditions with expected and actual behavior. A
generated reproduction requires independent confirmation before it authorizes
corrective work.

**Regression asset** — A retained test or Eval Task derived from a confirmed
failure and bound to its issue, expected behavior, owner, scope, and lifecycle.
It should be quarantined explicitly if it becomes unreliable.

**Automated PR Review Agent** — A versioned agent configuration that evaluates
a pull request and emits attributable findings, suggestions, and thread state.
Its satisfaction is not acceptance, and fixes derived from its findings still
require appropriate independent verification.

**Feedback signal** — An attributable report, correction, support observation,
incident, or production outcome offered as input to triage or learning. It is
untrusted until normalized, scoped, and connected to stronger evidence.

**Correction Record** — A provenance-backed record of an explicit human change
to agent output, including reason, before/after behavior, affected criterion,
scope, sensitivity, and proposed reusable destination. It is an improvement
input, not an automatically promoted rule.

**Human Workflow Profile** — A scoped description of an individual's planning,
interaction, review, explanation, notification, and accessibility preferences.
It can improve fit but cannot grant tools, lower quality gates, or alter
organizational authority.

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

**Telemetry** — Diagnostic spans, events, metrics, logs, token usage, cost, tool
activity, and timing emitted during a run. Telemetry explains behavior; it
becomes acceptance evidence only when a governed verifier binds it to an exact
subject, method, criterion, and provenance.

## Runtime concepts

**Orchestrator** — The control-plane actor that sequences authorized work,
selects eligible execution paths, reacts to events, and escalates exceptions. It
does not approve its own plan or evidence.

**Executor** — A runtime adapter that performs authorized work using a specific
agent or tool environment and returns structured events, artifacts, and status.

**Development Environment** — The versioned checkout layout, toolchains,
dependencies, local and shared services, identities, test data, previews, and
commands required to build and evaluate software. It may run on several compute
backends and does not authorize its own use.

**Development Environment Contract** — A versioned declaration of a
Development Environment's repositories, toolchains, services, identities,
network, secrets, resources, lifecycle, previews, commands, caches, and
qualification evidence. An Attempt binds to an exact contract version.

**Cloud Development Environment** — A remotely hosted Development Environment
provisioned through an API or control service. Remote hosting can improve
standardization, elasticity, and isolation while introducing network,
residency, startup, dependency-access, and provider-control tradeoffs.

**Compute Infrastructure** — The machines, processes, containers, VMs, storage,
network, and capacity pools that host development and execution environments.
Compute allocation does not prove environment readiness, isolation, or
WorkOrder authority.

**Composable AI Infrastructure** — AI Infrastructure assembled from replaceable
components through explicit, versioned contracts. Composition is real only
when required behavior, security, telemetry, lifecycle, and failure semantics
survive a substitution.

**Enterprise AI Infrastructure** — AI Infrastructure operated with explicit
organizational identity, tenant isolation, data classification and residency,
private networking, audit, policy, quota, support, lifecycle, and accountability
requirements. “Enterprise” is an operating obligation, not a product tier.

**Open-Source AI Infrastructure** — AI Infrastructure whose relevant source and
license permit inspection, modification, and self-operation. Adoption still
requires evaluation of maintainer health, provenance, vulnerabilities,
upgrades, interoperability, support, and total operating cost.

**Worker pool** — A managed set of execution resources eligible for particular
workloads and governed by capacity, queue, lease, identity, environment,
isolation, cost, drain, and recovery policy.

**Ephemeral environment** — An environment created from declared state for a
bounded use and destroyed afterward. Disposability reduces persistence but does
not by itself guarantee reproducibility or containment.

**Persistent environment** — An environment retained across runs to preserve
checkouts, caches, or warm services. It requires drift detection, cleanup,
credential rotation, and cross-run isolation.

**Execution Manifest** — The immutable Attempt contract that freezes lineage,
repository baseline, scope, workflow, agent and skill bindings, harness, model
route, context, tools, sandbox, policy, budgets, stop conditions, and completion
schema. A retry that changes a material binding requires a new manifest and
Attempt.

**Harness Capability Manifest** — A versioned, digest-bound declaration of a
harness adapter's effective models, tools, filesystem, shell, Git, browser,
subagent, lifecycle, sandbox, credential, telemetry, backend, maturity, and
authority characteristics. It describes what the adapter can do, not what it
may do for a particular WorkOrder.

**Harness adapter** — The versioned translation layer between a harness's
native lifecycle and the factory's canonical Attempt contract, events,
artifacts, completion, cancellation, and failure semantics. Substitutability
must be demonstrated through conformance tests.

**Worker capability attestation** — A current worker report binding service
identity, session, generation, capacity, repository, Factory Version, harness,
model route, backend, and sandbox capabilities. The control plane verifies the
report; the worker cannot self-authorize from it.

**Sandbox Profile** — An immutable execution-environment contract covering
provider, image and toolchain digests, identity, filesystem, network, secrets,
resource ceilings, lifecycle, teardown, supported workloads, and qualification
evidence. Promotion grants only its explicitly scoped eligibility.

**Repository Workspace Manifest** — A versioned map of repositories, canonical
identities, baseline selection, checkout layout, ownership, relationships,
toolchains, and discovery metadata. It supports multi-repository planning but
does not grant write access.

**Coordinated change set** — A governed collection of repository-scoped
WorkOrders, candidates, pull requests, dependencies, global invariants,
integration evidence, merge order, release sequence, and rollback. It is not an
atomic cross-repository commit.

**Integration candidate** — A versioned manifest of exact repository commits,
packages, images, schemas, or other artifacts that must be verified together.
Its digest is the cross-repository subject of integration evidence; it is not a
synthetic commit.

**Execution admission** — The fail-closed decision that an exact WorkOrder,
Factory Version, route, harness, sandbox, worker, policy, budget, repository,
and environment combination may begin or continue. Ranking happens only after
eligibility.

**Candidate** — An immutable artifact set produced by an Attempt and bound to
its exact source and manifest. A candidate is input to verification, not a
success or acceptance declaration.

**Completion report** — The explicit terminal report for an Attempt. It records
whether execution succeeded, partially completed, blocked, failed, or was
cancelled; identifies exact artifacts and criteria; and states unresolved
findings and required human action. It does not accept the WorkOrder.

**Merge queue** — A repository mechanism that orders eligible pull requests and
evaluates them against the current target branch and required checks before
merge. Queue eligibility does not replace human or policy authority.

**Agentic merge maintenance** — Bounded automation that keeps a human-approved
candidate eligible by updating its base, rerunning checks, resolving proven
mechanical conflicts, and escalating material change. It does not own the merge
decision.

**Agent merge queue** — An informal term that can mean either a repository merge
queue containing agent-authored pull requests or agentic merge maintenance.
Use the two precise terms because ordering and validating eligible changes is a
different authority from modifying a candidate to keep it eligible.

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

**Reconciliation** — The process of comparing durable intent with provider and
artifact state after an ambiguous, delayed, duplicated, or partial external
effect, then recording the authoritative outcome without assuming success or
repeating the effect blindly.

**Retry policy** — A versioned rule specifying which failure classes may create
a new attempt, required changed hypothesis or recovery action, delay, limits,
budgets, and escalation. Retry cannot widen authority or erase failure history.

**Backoff and jitter** — A delay strategy that spreads retries after transient
failure to reduce synchronized load on a dependency. It complements rather than
replaces idempotency, timeout budgets, and reconciliation.

**Circuit breaker** — A control that temporarily stops calls to a failing or
unsafe dependency after defined conditions and probes for recovery under
policy. Opening a circuit should produce an operator-visible state and fallback
decision.

**Backpressure** — A mechanism that slows or rejects new work when downstream
capacity is insufficient. It protects the system from unbounded queues and
resource exhaustion but requires explicit prioritization and user-visible state.

**Dead-letter or quarantine queue** — A retained destination for work or events
that cannot be processed safely after bounded handling. Placement preserves
identity, failure reason, evidence, owner, and recovery decision; it is not
silent abandonment.

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

**Learning Signal** — A bounded, attributable observation derived from an
Attempt, evaluation, review, incident, delivery, or production outcome. It can
support an improvement proposal but cannot modify active configuration.

**Improvement Candidate** — A reviewable proposal to change a prompt, Agent
Definition, skill, tool, context policy, model route, evaluator, budget, retry
policy, workflow, or deterministic implementation. It must name evidence,
baseline, expected benefit, risk, evaluation, promotion, and rollback.

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
