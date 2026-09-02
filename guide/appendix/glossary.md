---
title: Canonical Glossary
status: review-ready
audience:
  - all
last_verified: 2026-08-30
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

**Three actors** — The division of labor a factory is built on: humans define
intent, constraints, priorities, risk, and consequential decisions; agents
investigate, plan, use tools, modify software, and execute bounded work;
deterministic code enforces contracts, scope, identity, tests, verification,
evidence, security boundaries, currentness, and acceptance gates. A failure
mode is usually one actor doing another's job.

**Agent Factory** — The governed capability supply chain that creates,
packages, versions, evaluates, publishes, discovers, admits, deprecates, and
revokes reusable agents, skills, tools, model profiles, and configurations. It
supplies capabilities to an AI Software Factory but does not authorize or
accept a particular delivery outcome.

**Capability Registry** — The authoritative service that assigns canonical
identity, stores immutable versions and provenance, resolves dependencies and
compatibility, records evaluation and certification, and enforces lifecycle
state for reusable factory capabilities. A searchable catalog may present its
contents but is not itself the authority.

**Agent Registry** — The type-specific registry for Agent Definitions and their
ownership, composition, eligibility, evaluation, support, and lifecycle. An
agent name without an exact registered version is not a reproducible binding.

**Skill Registry** — The type-specific registry for reusable, evaluated task
methods and their versions, dependencies, required tools, compatibility,
ownership, and lifecycle. Publication does not grant permission to use a skill
for a particular WorkOrder.

**Tool Registry** — The type-specific registry for tool schemas, endpoints,
side effects, identity requirements, data classifications, policies,
qualifications, and lifecycle. Discovery does not imply authorization.

**Prompt Registry** — The type-specific registry for parameterized prompt and
instruction artifacts, including source, immutable versions, variables,
expected outputs, dependencies, evaluation, and promotion status. Runtime
composition must remain attributable to exact versions.

**Evaluator Registry** — The type-specific registry for deterministic checks,
human rubrics, model graders, datasets, calibration evidence, eligible claims,
and lifecycle. A registered evaluator cannot certify its own reliability.

**Capability Package** — An immutable, digest-bound artifact containing a
capability manifest, content or executable source, schemas, dependencies,
tests, evaluation references, provenance, signature, and lifecycle metadata.

**Compatibility metadata** — The declared set of harness versions, model
profiles, runtimes, and peer capabilities a capability version has been tested
with. It is evidence only when a conformance suite has passed against the exact
combination.

**Version lineage** — The recorded chain from a capability version to its
predecessors and successors, with the reason each was cut, so an operator can
see what changed between the version that ran and the version that runs now.

**Trust level** — The standing a capability has earned (for example internal
and certified, external and reviewed, external and unreviewed). It sets a
ceiling on the risk classes and autonomy levels in which the capability may be
resolved; it does not grant permission.

**Capability lifecycle verbs** — Author, package, test, certify, publish,
discover, activate, upgrade, deprecate, revoke. Activation is a consuming
workspace or Factory Version binding a certified version into its resolved
graph; upgrade is a new resolution with its own compatibility check.

**Capability Certification** — A scoped, expiring decision that an exact
capability graph has sufficient evidence for defined tasks, risks,
environments, data classes, and controls. It is not a universal quality claim.

**Capability deprecation** — A lifecycle state that warns against new use,
names a support and migration window, and may restrict eligibility while
existing consumers move. It differs from immediate revocation.

**Capability revocation** — An authoritative state that blocks new resolution
of an unsafe or invalid capability version and triggers impact analysis for
active consumers while preserving historical lineage.

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

**Maximum review iterations** — An outer-loop parameter, owned by the harness
rather than the model, that caps how many review-and-fix cycles one Attempt may
consume before the work is escalated to a human. Bounded iterations, a
deterministic exit condition, and a human handoff make a fix loop safe.

**Provider lock-in** — The condition in which switching harness, model, or
compute vendor would cost more than the switch is worth because transcripts,
instructions, skills, and evidence exist only in one vendor's shape.

**Exit strategy** — The documented, rehearsed path out of a provider: what is
kept in the factory's own format, which adapter would be qualified next, and
how long the switch would take. It is proven by having run the same workload
through two adapters, not by asserting portability.

**Composable stack** — A factory whose model, harness, environment, compute,
and orchestration are separately chosen components behind interfaces the
organization owns. It is slower to adopt and easier to leave than a vertically
integrated stack.

**Vertically integrated stack** — A factory in which one vendor supplies model,
harness, environment, and orchestration as a single product. It is fastest to
adopt and hardest to exit.

**Managed execution versus self-hosted harness** — Whether the vendor runs the
harness on its own fleet under its own operations, or the organization runs the
harness on its own workers with its own identity and network boundaries.

**Agent Runtime** — The execution substrate that starts, observes, controls,
and terminates agent sessions or Attempts using an exact harness, environment,
identity, and model route. Runtime capability does not establish business
authority.

**Skill** — A reusable, versioned, evaluated method that supplies instructions,
decision criteria, examples, and tool-use patterns for a class of tasks. A
skill teaches behavior; it does not grant authority or certify its own result.

**Rule (eager push)** — Mandatory steering that the harness pushes into the
agent's context on every run regardless of task: conventions, prohibited
actions, house style. A rule is always present and costs context on every turn;
a skill, by contrast, is loaded lazily when the agent judges it relevant. Both
are versioned context as code.

**Skill package (plugin)** — A versioned, agent-agnostic bundle of skills,
rules, commands, and hooks, installed by exact version from a registry, a Git
source, or a local path, the way a language package is installed. It is the
distribution form of a Capability Package for the skill type.

**Skill manifest and lockfile** — The project file that declares which skill
packages a project depends on and at what version range (the manifest), and the
file recording the exact versions installed (the lockfile). The lockfile is the
resolution lock for skills, written to disk; updates move only within the
compatible range unless a major bump is explicit.

**Skill inventory** — A scan of every repository in a source-control
organization for skill files and agent configuration, classifying each skill as
first-party or third-party, flagging duplicate copies and drift between them,
and ranking findings by security severity. It is the consuming-side view that
the registry's active-use inventory must agree with.

**Reviewer plugin** — A configuration of weighted judges, each with a rubric,
used to score a skill's fitness for an agent: description specificity,
completeness, trigger quality, and distinctiveness; content conciseness,
actionability, workflow clarity, and progressive disclosure. It is forked and
tuned rather than written from scratch.

**Skill quality score** — A 0–100 score produced by a reviewer plugin, with a
declared threshold that turns it into a gate in CI. It is an entry condition
for evaluation, not a substitute for a with/without context eval or a security
review, and never the multidimensional eligibility a certification names.

**Agent platform** — Infrastructure for building and operating agents, including
tools, context, memory, identity, routing, and orchestration. It becomes part of
a factory only when connected to the engineering operating model.

**AI Engineering** — The engineering discipline that turns model capability
into reliable systems through data, knowledge, semantics, context, agents,
tools, structured outputs, routing, loops, evaluations, and runtime controls.
Model prompting is one technique within the discipline.

**Business Understanding** — The discipline of defining the decision, user,
owner, outcome, constraints, risk, acceptance criteria, non-goals, and
escalation path before designing agent behavior. It prevents technical success
from being mistaken for business success.

**Model Engineering** — The discipline of qualifying and operating versioned
model profiles for specific generation, classification, routing, extraction,
verification, and reasoning tasks. Model selection is a measured eligibility
decision, not a popularity contest.

**Agent Engineering** — The discipline of binding a role, bounded objective,
model profile, tools, skills, context, state, policy, budgets, stop conditions,
handoffs, and evaluation into a reproducible Agent Definition. Capability does
not grant permission to act.

**Harness Engineering** — The discipline of controlling and recording complete
agent sessions through lifecycle hooks, state, checkpoints, tool events,
artifacts, receipts, replay, and run comparison. A transcript alone is not a
reproducible run record.

**Infrastructure Engineering** — The discipline of providing environments,
compute, queues, concurrency, timeouts, backoff, circuit breaking, failover,
idempotency, reconciliation, and recovery for agent execution. It separates
platform failure from model or task failure.

**Continual Learning** — The governed process that converts production signals
and feedback into versioned candidate changes, representative evaluations,
human promotion decisions, progressive rollout, observation, and rollback. It
does not authorize a production system to rewrite itself.

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

**Tool gateway** — A single entry point through which every tool and MCP
server, internal or third-party, is reached, so that authentication, policy,
tenant scoping, logging, and cost attribution are enforced once. Exposing tools
through a gateway is also what makes CLI tool resolution and code-mode possible.

**CLI tool resolution** — Reaching tools by executing a shell command that
resolves and invokes the tool against the gateway at call time, instead of
loading every tool's schema into the model's context. It removes tool-schema
overhead from every turn; it does not change what the tool is authorized to do.

**Tool search** — Letting the model search a tool catalog and load only the
definitions it needs for the task at hand, so a library of thousands of tools
does not consume context or degrade selection accuracy.

**Code-mode** — Running a chatty sequence of tool actions (submit, poll,
fetch) as one script in a subprocess, returning only the summary to the
model's context. It removes polling turns and intermediate payloads from the
loop; the actions themselves remain subject to the same authorization.

**Context graph** — A queryable graph of an organization's engineering
entities and their relationships (services, teams, incidents, pull requests,
design documents, deployments, datasets, table usage) that any agent can
consult in natural language before acting. Grounding through it is the main
lever on requests per turn; it is knowledge, not authority.

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
It is a versioned, addressable unit that may carry a declared type such as
skill, rule, documentation, workflow, tool guide, or prompt template. It is
advisory input and cannot silently change approved intent, grant authority, or
satisfy an acceptance criterion.

**Context compaction** — The controlled replacement of a growing working
context with a smaller representation that preserves governing instructions,
accepted decisions, unresolved issues, evidence links, and necessary state.
Compaction is lossy and must not silently rewrite authority.

**Memory** — Durable information retained across runs, such as accepted
decisions, outcomes, failures, preferences, and recovery patterns. Memory is a
potentially stale or poisoned context source, not an authority record.

**Working Memory** — Short-lived task and conversation state required for the
current run, including intermediate artifacts and tool results. It should be
cleared, compacted, or deliberately persisted when the run ends.

**Episodic Memory** — Attributable records of past events and experiences,
including when they occurred and which outcome followed. A prior episode is
evidence about history, not a universal instruction.

**Semantic Memory** — Durable facts, concepts, and relationships retrieved by
meaning. Similarity does not prove truth, freshness, permission, or authority.

**Procedural Memory** — Versioned reusable knowledge about how to perform a
task, normally expressed as a skill, workflow, runbook, or instruction set. It
must be evaluated and lifecycle governed.

**Temporal Memory** — Time-aware facts and relationships that preserve when a
claim was valid and how it changed. It prevents a current answer from silently
combining incompatible historical states.

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

**Portable repository identity** — A repository identity owned by the
organization and separate from any developer's local checkout, so that scope,
policy, readiness, and lineage attach to the repository rather than to a
path on one machine. It is what lets many workers, hosts, and sandboxes refer
to the same governed target.

**Repository Readiness Record** — A versioned assessment of repository
identity, ownership, instructions, architecture, dependencies, build, tests,
delivery, data, security, environment, and eligible workflow classes. It is
scoped and expiring; registration alone does not establish readiness.

**Instruction resolution** — The onboarding step that reads every instruction
file a repository carries and resolves them into one declared precedence order,
so that when two files disagree the winner is recorded rather than chosen
silently at run time.

**Architecture mapping** — The onboarding step that produces a repository's
component, boundary, entry-point, and data-flow view by combining human-
authored architecture documents with generated maps and surfacing where they
conflict.

**Build/test topology** — The discovered map of which build targets exist,
which test suites cover which targets, how long each takes, and which are known
to be flaky, so a planner can select the cheapest sufficient verification.

**Codebase indexing** — The pipeline that turns source, instructions,
architecture, and build/test topology into queryable indexes (symbols,
dependencies, ownership, test-to-code mapping, hotspots) with source commit,
method, confidence, and expiry recorded on every derived view.

**Documentation maintenance workflow** — The catalog workflow that begins from
a system, policy, interface, or workflow change, identifies affected guidance,
updates it, verifies commands, links, schemas, and examples, and publishes
under governance. Semantic correctness still needs an accountable owner.

**Codebase intelligence** — Derived, attributable views such as symbol,
dependency, ownership, build, test-impact, change-history, and architecture
indexes created from exact source versions. Derived intelligence is not an
authority record and must expose freshness and uncertainty.

**Workflow Catalog** — The governed inventory of supported factory workflow
products, including trigger, owner, inputs, eligible scope, capabilities,
authority, evidence, recovery, outcomes, measures, and maturity.

**Autonomous backlog** — A policy-bounded set of eligible, owned work from
which the factory may recommend or select execution according to value,
urgency, risk, dependencies, capacity, and work-in-progress limits. It does not
grant agents product-priority authority.

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

**Builder loop** — The delivery chain seen from the builder's chair: Intent →
Plan → Configure agents, harnesses, skills, and tools → Execute → Verify and
evaluate → Deliver → Observe → Improve. It is the same chain the governed
delivery lifecycle enforces record by record, at a coarser zoom; each arrow
is a gate, not an optimistic handoff.

**Exception-first (operator surface)** — The design rule that a default
operator view shows decisions, blockers, failed or stale evidence, unsafe
conditions, and aging work first, ranked by risk, urgency, age, and evidence
state, while routine activity remains available for inspection. Its opposite
is an activity feed, which measures messages, tokens, or generated code and
trains the operator to stop looking.

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

**Meaningful human control** — A human decides where the decision is
consequential, with enough information, time, and authority for the decision to
be real rather than ceremonial, and retains override and abort at every point.

**Human override and abort** — The standing ability of an accountable human to
countermand a decision the system made or to stop a run in flight, without
needing anyone's permission to do so. It is a control with a named owner, not a
courtesy.

**Approval inbox** — The single queue where every pending decision packet
waits, sorted by risk and expiry, so a decision owner sees what needs them in
one place rather than across chat, pull-request tabs, and email.

**Escalation UX** — The design of the moment a surprise reaches a person: what
happened, what the system already did, what it is asking for, and what happens
if nobody answers before the deadline.

**Operator cognitive load** — The attention a human must spend to make a sound
decision. Every packet that arrives without a clear question, or that repeats a
check a gate should have made, spends the budget and buys nothing.

**Audit export** — A packaged, tamper-evident extract of control lineage
(decisions, denials, grants, exceptions, overrides, revocations) for a defined
scope and period, in a form an auditor can read without access to the factory's
internal stores.

**Attention Budget** — The expected and permitted human effort for a workflow,
including review, correction, approvals, escalation, and context reconstruction.
It is an operating metric, not permission to skip consequential judgment.

**Engineering Attention Altitude** — The level at which a human inspects and
directs work, ranging from implementation details through components,
workflows, systems, and business outcomes. Attention moves upward only when
risk, evaluated coverage, evidence, and recovery justify reduced direct
inspection; it moves downward when novelty or consequence increases.

**Change-risk policy** — A repository-owned, executable rule that decides
whether a pull request needs a human reviewer, judging the change (blast
radius, paths touched, novelty) rather than the code. It is the risk-tier
assignment made runnable, and it is kept separate from the file invariants a
verifier checks.

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

**Repeated trials** — Several independent executions of the same candidate on
the same task, so that variance becomes a measured quantity and the reported
result is a distribution rather than an anecdote.

**Baseline versus candidate** — The basic shape of every evaluation decision:
the configuration currently trusted compared against the one proposing to
replace it, on the same tasks and fixtures, with uncertainty reported and
segmented by slice.

**Dataset governance** — Running an evaluation dataset as a product: a named
owner, an intake gate, immutable versions, access rules per split,
contamination tracking, and a retirement path.

**Benchmark contamination** — Dataset contamination where the leak is into a
public or shared benchmark: a task or its answer has reached the model's
training data, prompts, skills, or memory, so a score no longer measures
generalization.

**Adversarial evaluation** — Running a candidate against inputs designed to
make it misbehave, including injected instructions in repository files,
conflicting tool results, and tasks whose correct answer is to refuse or
escalate.

**Safety evaluation** — Measuring whether a candidate stays inside its
authorization envelope under adversarial and ordinary conditions: no
unauthorized effects, no secret exposure, no evidence fabrication. Its findings
are hard gates, not scores.

**Shadow testing** — Running a candidate on production-shaped inputs without
granting it any authoritative effect, so its outputs can be compared to the
baseline's before anything ships. Also called shadow evaluation.

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

**Reproduction generation** — The agent workflow that turns an untrusted
feedback report into a runnable, repeatable failing case the factory owns,
typically by generating several candidates and verifying them on a separate
path before any earns standing.

**Difficulty classification** — Triage that assigns severity (how bad for
users), priority (how soon the organization wants a fix), and difficulty (how
much work the fix is expected to take). It is an agent task with an evaluation
behind it and a deterministic correction from the size of the fix that actually
landed.

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

**Test-impact analysis** — The attributable selection of tests and verification
methods from changed code, behavior, dependencies, schemas, configuration, and
risk. It must explain both inclusion and material omission.

**Unit testing** — Verification of a small component in a controlled context.
It supports fault localization but does not prove integration or user behavior.

**Integration testing** — Verification that components, services, databases,
or external dependencies cooperate under defined conditions. It does not by
itself prove a complete user journey.

**End-to-end testing** — Verification of a complete workflow through its real
or qualified interfaces. It provides journey confidence while usually being
slower and harder to diagnose than focused tests.

**Contract testing** — Verification that a producer and consumer satisfy a
versioned interface and semantic agreement. Passing syntax checks does not
prove business compatibility.

**Flaky test** — A test whose result changes without a relevant change to its
subject or declared environment. Quarantine is visible debt with an owner and
expiry, not permission to treat the test as passing.

**Test-data management** — The discipline of deciding where every fixture, seed
record, and synthetic dataset comes from, which version a run used, who may see
it, and how it is reset afterwards, so agents never reach for production data
because nothing else was supplied.

**Mutation testing** — Evaluation of a test suite by introducing controlled
faults and measuring whether tests detect them. Surviving mutations identify
possible weakness but require interpretation.

**Property-based testing** — Verification of declared invariants across
generated input cases. Its confidence depends on the correctness of the
property and generators.

**Fuzz testing** — Automated generation or mutation of unexpected inputs to
find crashes, unsafe parsing, resource exhaustion, and boundary failures. It
does not establish intended business behavior.

**Performance and load testing** — Measurement of latency, throughput,
saturation, and resource behavior under representative load and failure. A
single benchmark environment is not a production guarantee.

**Accessibility testing** — Automated and human evaluation of whether people
with varied access needs can perceive, navigate, understand, and operate an
interface. Automated checks cover only part of the requirement.

**Visual-regression testing** — Comparison of rendered interfaces against an
approved baseline under controlled viewports and data. Pixel similarity does
not prove semantic or interaction correctness.

**Artifact Registry** — The authoritative store and metadata service for
immutable build outputs, digests, provenance, signatures, SBOMs, lifecycle,
and promotion state. A source commit is not a deployable artifact identity.

**Progressive delivery** — Controlled expansion of an exact release through
bounded cohorts, feature flags, canaries, regions, or parallel environments
under predeclared gates, stop conditions, observation, and rollback.

**Production verification** — Independent evaluation that an exact deployed
artifact and configuration are technically healthy and satisfy defined
production behavior. It remains distinct from customer-outcome confirmation.

**Post-deployment verification** — Another name for production verification:
binding a deployment to expected technical and customer outcomes over a defined
observation window, with rollback, containment, corrective work, or human risk
acceptance as the outcomes.

**Rollback** — A governed, pre-engineered transition toward a prior safe
artifact or configuration with verification of data, dependencies, and external
effects. It is not a universal undo operation.

**Context eval (with/without)** — A paired evaluation of one skill, rule, or
other context artifact: scenarios generated from real work and feasibility
checked, each run by the agent without the artifact and with it, judged on
multiple binary criteria, and reported as baseline average, with-skill average,
and delta. The scenarios are kept as the artifact's regression corpus. A delta
near zero means the artifact is context cost without return.

**Verifier (file invariant)** — A model-judged check on committed files for a
single binary, observable invariant (for example, every component file exports
an element with a test identifier), emitted as a CI annotation. It verifies the
files; it does not decide whether the change needs a human, which is the
change-risk policy's job.

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

**Remote development workstation** — A full development machine that lives in a
data center, provisioned fresh and repeatedly, and reached from a laptop as a
thin client; the "cloudtop" pattern. Code never leaves the building and every
service started gets an identity-bound URL.

**Shared development services** — The long-lived, centrally operated databases,
queues, identity providers, and internal APIs (a "dev cloud") that individual
sandboxes reach over the network rather than running themselves.

**Private connectivity and egress control** — An authenticated private path
from a sandbox into shared development services, and an explicit allowlist of
what the sandbox may reach on the public internet, so package registries work
and exfiltration does not.

**Identity and credential provisioning** — The step, at environment creation,
that mints a workload identity for the run and attaches the short-lived, scoped
credentials that identity is entitled to. It belongs to the environment layer
and is undone at teardown.

**Toolchain pinning** — Fixing every compiler, runtime, package manager,
linter, and browser a run can invoke to an exact version recorded by digest, so
a build cannot silently change because a tool updated underneath it.

**Environment bootstrap** — The scripted sequence that takes bare compute to a
ready worker: base image, toolchain, checkout, service startup, readiness
check. It is automated even for persistent workers and proven periodically by
rebuilding from declared state.

**Dependency and build caching** — Content-addressed caches of restored
packages and compiled outputs, keyed by the hash of their inputs, so a cache
hit is provably the same bytes a clean build would produce. Each cache needs an
explicit invalidation rule.

**Preview environment** — A running instance of the application built from an
Attempt's exact commit, with a stable Attempt identity, authenticated access,
bounded lifetime, and deterministic teardown. Its shareable preview URL is an
interface for gathering evidence, not evidence of correctness.

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

**Runner fleet** — The full set of machines, VMs, or containers on which
Attempts execute, operated as a production service with queues, quotas, leases,
autoscaling, backpressure, and reconciliation. Worker pools are its
interchangeable subdivisions.

**Bring-your-own-compute (BYOC)** — The arrangement in which the organization
owns the compute (its own cloud account, data center, or rack) while a vendor
supplies the sandbox API, harness, or orchestration on top of it. It changes
who owns the resource boundary, not who owns integration.

**Capacity scheduling** — The step after admission that matches each admitted
Attempt to a worker pool with the right architecture, tools, and network reach,
in an order that respects priority class and tenant fairness rather than
arrival time alone.

**Ephemeral environment** — An environment created from declared state for a
bounded use and destroyed afterward. Disposability reduces persistence but does
not by itself guarantee reproducibility or containment.

**Persistent environment** — An environment retained across runs to preserve
checkouts, caches, or warm services. It requires drift detection, cleanup,
credential rotation, and cross-run isolation.

**Pets versus cattle** — The operations vocabulary for persistent versus
ephemeral workers. A pet is a named host repaired by hand; cattle are
interchangeable, provisioned by script, and replaced rather than repaired. Also
written "pets vs cattle".

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

**Multi-repository workspace** — One directory tree, materialized for a single
Attempt, holding checkouts of every repository the work may touch at recorded
commits, plus a coordination repository that holds instructions, the workspace
manifest, plans, and shared playbooks.

**Sparse clone** — A partial clone (limited objects fetched) combined with a
sparse checkout (limited paths materialized), used when one repository is
larger than the task needs. If the manifest's scope is wrong, the excluded
material is exactly what would have revealed a dependency.

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

**Merge babysitting** — The practitioners' name for agentic merge maintenance:
an agent keeps a human-approved candidate eligible against a moving base branch
by rebasing, rerunning checks, resolving bounded mechanical conflicts, and
escalating the rest. It never takes the merge decision.

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

**Recovery Time Objective (RTO)** — The maximum targeted time to restore a
defined factory capability after disruption. Different capabilities may have
different objectives.

**Recovery Point Objective (RPO)** — The maximum targeted loss of durable state
for a defined capability after disruption. Authority and audit records often
require stricter objectives than diagnostic telemetry.

**Regional failover** — Moving the control plane and its authority records to a
second region when the first is lost. It is the exercise most likely to produce
two active authorities if fencing was designed for a single region.

**Chaos testing** — Deliberately injecting the failures on the scenario list
into a running system to confirm that declared degraded modes and recovery
paths actually engage. Begin with simulation and controlled fault injection.

**Factory postmortem** — An incident review that names which layer failed
(model, harness, environment, orchestration, policy, evidence, or human
decision) and whether the factory's authority records stayed truthful
throughout.

**Break-glass access** — Narrow, time-limited emergency authority protected by
strong authentication, independent logging, explicit reason, and post-event
review. It must not become the routine control path.

**Backpressure** — A mechanism that slows or rejects new work when downstream
capacity is insufficient. It protects the system from unbounded queues and
resource exhaustion but requires explicit prioritization and user-visible state.

**Preemption** — Stopping lower-priority work to make room for higher-priority
work. It is safe only for work with checkpoint or cancellation semantics; non-
idempotent external effects are never killed blindly, and sunk cost and
evidence are preserved.

**Provider limits** — The rate, concurrency, token-per-minute, and spend
ceilings a model or compute vendor enforces on an account. The scheduler treats
them as shared capacity to allocate rather than a surprise to retry through.

**Admission control** — The fail-closed policy that determines whether work may
enter or continue in a runtime lane given authority, readiness, capability,
risk, budget, quota, and dependency state. It precedes scheduling.

**Scheduler** — The component that chooses when and where eligible work runs
using priority, fairness, deadlines, capabilities, locality, cost, and current
capacity. Scheduling cannot make ineligible work admissible.

**Capacity reservation** — Resources held for a bounded workload class such as
incident recovery so normal demand cannot consume every qualified execution or
review path.

**Capacity planning** — Forecasting and provisioning qualified model,
environment, compute, tool, storage, network, and human-review capacity for
expected demand, growth, failure, and recovery reserves.

**Cost per accepted outcome** — Total model, compute, environment, tool,
storage, retry, validation, and human-attention cost divided by independently
accepted outcomes. It is more decision-useful than token price alone.

**Dead-letter or quarantine queue** — A retained destination for work or events
that cannot be processed safely after bounded handling. Placement preserves
identity, failure reason, evidence, owner, and recovery decision; it is not
silent abandonment.

**Immutable history** — An append-oriented record of plans, decisions, Attempts,
events, evidence, and revisions. Corrections create new records rather than
silently rewriting the past.

**Durable messaging** — Events are written to a persistent log or broker before
any consumer sees them, delivered at least once, and retained long enough to
replay, so a consumer that was down when a fact occurred still receives it.

**Event schema** — The versioned definition of what each event payload type
contains and how it may evolve, kept in a schema registry with advertised
version ranges.

**Artifact storage** — The object store for logs, diffs, test output, packages,
and evidence blobs, addressed by content digest. Metadata and the digest remain
authoritative in the control store; the blob is what the digest names.

**Declarative workflow** — A workflow described as what it consists of (nodes,
inputs, outputs, dependencies, triggers, timeouts, budgets, gates, completion
states, required evidence) rather than scripted as how to run it, which makes
it inspectable before execution and diffable between versions.

**Workflow versioning** — Every change to a workflow contract produces a new
immutable version with a digest; a running WorkOrder stays bound to the version
approved when it started, and migrating it is a new decision with its own
authority.

**Workflow snapshot** — The copy of a versioned workflow definition frozen onto
the run that uses it, so that later edits to the workflow never rewrite the
execution contract of a historical Attempt. It is the mechanism that makes
workflow versioning hold for runs that have already happened.

**Compensation** — A recorded, forward action that neutralizes a completed
external effect (closing the PR, deleting the branch, posting a retraction)
when a workflow fails. It is not undo; it has its own authority and its own
failure path.

**Triggers, schedules, and webhooks** — The three intake shapes: a trigger is
any authenticated signal that proposes work, a schedule is a trigger that fires
on a clock, and a webhook is a trigger that fires when an external system
reports a change. None of them starts execution without admission.

**Attestation** — A typed claim made by an identified producer about one or more
immutable subjects. A valid attestation does not by itself prove quality.

**Software Bill of Materials (SBOM)** — A machine-readable inventory of the
components and dependency relationships associated with an artifact. It aids
supply-chain analysis but does not prove that the artifact is secure.

**Trace context** — Correlation metadata propagated across service and
asynchronous boundaries. It connects observations but does not confer authority.

**Loop** — The smallest unit of agency: observe what the environment returned,
act with one tool call, verify with an external signal, and repeat until a goal
condition is met. Completion is decided by evidence, never by the model's own
judgment or a step count.

**Graph** — The workflow layer above the loop: nodes do one unit of work
against typed shared state, conditional edges read that state and name the
next node, and checkpoints after each node allow pause, replay, and human
review. A loop decides whether execution continues; a graph decides where it
goes.

**Harness** — The runtime wrapped around a model that determines what its
reasoning can actually do: the callable tool set, permissions and approval
gates, the context it is shown, the execution environment, and the immutable
trace of every turn. Model capability and agent capability differ exactly by
what the harness exposes.

**Execution graph** — The six typed nodes every production agent runs in
order — perceive, build context, decide and plan, act, evaluate, respond —
joined by stateful edges with conditional routing, parallel branches,
subgraphs, checkpoints, and resumability. Graph engineering is the discipline
of designing it; the harness owns it.

**Loop engineering** — The bounded feedback path taken when evaluation says
the goal is not complete: observe, diagnose, refine or replan, retry, under
termination criteria (maximum iterations, time, token, and cost budgets) set
by the harness rather than the model.

**Secure tool gateway** — The single door between an agent's Act step and the
world: MCP servers, APIs, code execution, databases, files, and other agents,
behind schemas, permissions, authentication, secrets handling, sandboxing, and
approvals. A tool the gateway does not expose does not exist for the agent.

**Meta-harness** — A governance layer across several harnesses (hosted coding
agents, internal agents, domain agents) that supplies composition (which agents
exist and who may delegate to whom), policy enforced once, shared resumable
sessions, and pluggable isolation. In this guide its responsibilities belong to
the control plane and Agent Factory governance.

**Compaction threshold** — The context size at which a harness summarizes
conversation history rather than re-sending it; a deliberate default that
trades recall against repeated input cost and cache bursts.

**Prompt-cache TTL** — How long a provider keeps a cached prompt prefix.
Cache reads are cheap and cache writes carry a premium, so the right TTL
depends on the typical idle gap between turns: longer for interactive sessions
with pauses, shorter for short-lived subagents.

## Platform experience and agentic security

**Developer portal** — A user-facing projection of catalog, workflow,
ownership, documentation, evidence, and control-plane services organized around
developer outcomes. It must not become a second source of authority.

**Service catalog** — A maintained inventory connecting services,
repositories, owners, dependencies, interfaces, workflows, environments,
runbooks, and maturity. Catalog presence does not establish readiness.

**Golden path** — A supported, observable, self-service route for a recurring
outcome with defaults, templates, controls, documentation, recovery, ownership,
and measured adoption. It requires an explicit extension and exception model.

**Extension model** — The published answer to "how do I add something the path
does not do": which points may be extended, what an extension must declare, and
what compatibility it must keep. Extensions are versioned and tested; silent
forks are what it prevents.

**Platform ownership** — A named team accountable for the paved paths, their
service levels, their deprecations, and the experience of using them, so the
platform is never an orphan that everyone depends on and nobody answers for.

**Plan preview** — A decision-oriented view of proposed steps, assumptions,
affected systems, capabilities, tests, cost, uncertainty, rollout, and rollback
before authority is granted to an exact Plan version.

**Live progress** — The execution view's running account of what a run has done
and expects to do next, updated as the run proceeds. Its unit is the progress
event: decisions, discoveries, scope changes, evidence, budget, and next
transition, written for a person.

**Pause/resume** — The reversible pair of interventions in which pause holds
the lease and retained state so the run can continue from the same point,
distinct from cancel, which releases the lease and records a terminal state.

**Review inbox** — A prioritized control surface for decisions requiring human
authority, showing scope, risk, evidence, recommendation, alternatives,
deadline, and consequence of action or inaction.

**Indirect prompt injection** — Adversarial instructions embedded in content
the agent retrieves or observes rather than supplied as the direct user
request. Untrusted content cannot grant authority or alter policy.

**Tool poisoning** — Manipulation of tool descriptions, schemas, endpoints, or
outputs to influence agent behavior, steal data, or trigger unsafe action.
Registry provenance, output validation, policy, and least privilege constrain
its impact.

**Memory poisoning** — Insertion of false, adversarial, or unauthorized content
into durable memory so future runs inherit the attack. Recovery includes
quarantine, provenance analysis, affected-run inventory, and controlled repair.

**Goal hijacking** — Prompt injection that replaces the task's objective with
the attacker's while the agent still believes it is doing the assigned work.

**Privilege abuse** — Misuse of a grant the agent legitimately holds for an
action the grant was never meant to cover, as distinct from escalation to a
grant it does not hold.

**Excessive agency** — An agent given more authority, tools, or autonomy than
its task requires, so that a mistake or a hijack has more to reach. The remedy
is least privilege in every dimension.

**Inter-agent trust** — The assumption that a message from another agent
carries that agent's authority when it carries only its content. Delegation is
recorded and verified; peer output is untrusted content.

**Denial of wallet** — Resource exhaustion intended to cause excessive model,
compute, tool, storage, or human-review cost. Budgets, quotas, backpressure,
anomaly detection, and bounded retries limit exposure.

**Workload identity** — A cryptographically verifiable identity issued to a
running workload and used to obtain scoped, short-lived access. It identifies
the actor but does not itself authorize a resource operation.

**Delegated authorization** — The attributable chain by which an accountable
principal permits a specific workload to perform bounded actions for an exact
subject, purpose, and time. Every delegation may narrow but not widen authority.

**Data retention policy** — The versioned rules governing how long prompts,
context, telemetry, artifacts, evidence, memory, indexes, and backups are kept,
who may access them, and how deletion or legal hold works.

**Data residency** — The requirement that defined information and processing
remain within approved geographic or legal locations throughout providers,
backups, telemetry, and derived stores.

**License compliance** — The controls that identify software and content
licenses, evaluate policy compatibility, preserve attribution, and block or
escalate unacceptable use. Generated output does not remove provenance duties.

**Policy as code** — Versioned, testable policy expressed in machine-executable
form. It improves consistency but does not replace ownership, rationale,
exceptions, evidence, or human risk accountability.

**Install policy** — The rules governing which skill packages may be installed,
set at project, workspace, and organization level with the tightest level
winning. Three rule types: a security threshold with a warn level (install
needs explicit acceptance) and a block level (no override), a source
restriction (registry limits and Git allowlists), and a minimum release age.
Every install attempt is logged against the policy that decided it.

**Minimum release age** — An install-policy rule requiring that a Git-sourced
skill version has existed for a set number of days before it may be installed,
so that a freshly pushed payload has time to be noticed and scored before it
reaches an agent.

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
include a human correction, repeated instruction, context miss, tool mismatch,
validation failure, cost anomaly, or successful strategy. It can support an
improvement proposal but cannot modify active configuration.

**Improvement Candidate** — A reviewable proposal to change a prompt, Agent
Definition, skill, tool, context policy, model route, evaluator, budget, retry
policy, workflow, or deterministic implementation. It must name evidence,
baseline, expected benefit, risk, evaluation, promotion, and rollback.

**Factory maturity level** — An evidence-backed description of the operating
capability achieved by a specific workflow, repository, risk class, and
environment. It is not a permanent organization-wide badge.

**Guarded Auto** — A routing mode in which the platform may choose the model,
harness, and backend tuple for a run automatically, but only once sample
size, quality margin, cost coverage, and hard eligibility meet policy. Until
then routing stays advisory or pinned. In Mission Control it is disabled at
the pinned commits; a routing decision never widens the authority of the work
routed.

**Capability Maturity Ledger** — The single canonical record of each
capability's status, evidence, limitation, owner, and next promotion gate,
maintained at the current revision. Architecture documents define intended
contracts and plans describe proposed work; when a status claim disagrees
with current source or retained evidence, the ledger is what gets corrected.
It is the document to read for what a capability *is* rather than what it
was designed to be.

## Context and configuration concepts

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

**Model routing** — The policy-governed selection of which model serves a given
step, based on declared eligibility, capability, cost, and risk. A routing
decision is a configuration outcome; it does not widen the authority of the
work being routed.

## Factory learning and improvement

**Signal severity** — The operator-facing weight assigned to a learning signal:
Low, Medium, High, or Critical. Severity orders attention; it does not
determine whether a change is permitted.

**Learning cluster** — A grouping of related learning signals over a bounded
window, used to distinguish a recurring systemic pattern from an isolated
incident. Clustering is an analytical projection; it creates no obligation and
proves no cause.

**Governed experiment** — A bounded, reversible trial of an improvement
candidate under explicit success criteria, scope, and stop conditions, run so
that its effect can be measured before any durable change. An experiment
produces evidence; it does not promote itself.

**A/B testing** — A controlled comparison that assigns eligible cases to two
versions under predefined measures, guardrails, sample, duration, stop
conditions, and analysis. Assignment does not override workflow authority or
user and data protections.

**Prompt optimization** — Controlled experimentation that changes instructions
or prompt composition to improve defined outcomes without widening authority.
It requires holdout evaluation, regression controls, and versioned promotion.

**Tool optimization** — Controlled improvement of tool selection, schemas,
descriptions, execution, or feedback based on attributable outcomes. A tool
change creates a new evaluated capability version.

**Skill improvement** — A governed update to a reusable task method based on
diagnosed evidence, followed by evaluation, certification, promotion, and
rollback planning.

**Improvement type (Rule / Skill / Verifier / Refactor)** — The four
destinations for a correction mined from review history: a Rule for an
always-on convention, a Skill for a multi-step procedure needed on demand, a
Verifier for a binary observable invariant on files, and a Refactor for a
structural change paired with a rule or verifier so it holds. Prefer the
deterministic end. Each is a governed candidate through the promotion gate,
not a change.

**Learning from success** — Analysis of matched successful runs to identify
strategies associated with accepted outcomes, low retry, safe recovery, cost,
and human attention. Incidental or sensitive context must not become standing
instruction.

**Evaluator calibration** — Comparison of an evaluator against trusted labels,
rubrics, counterexamples, and bias tests to determine where its judgments are
reliable enough for a defined claim.

**Inter-rater reliability** — Measurement of agreement among independent human
or automated raters beyond chance or simple majority. Disagreement should be
investigated rather than averaged away.

**Statistical significance** — Evidence that an observed difference is
unlikely under a defined null model. It does not establish practical value,
safety, causal validity, or freedom from bias.

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

## Architecture, governance, and operations concepts

**Factory System Record** — The governed accountability and classification
record for one material autonomous delivery system. It identifies purpose,
owners, scope, registry references, data, integrations, risk, autonomy ceiling,
evidence, incidents, and lifecycle without duplicating the authoritative
service, capability, model, policy, or evidence registries.

**Autonomy ceiling** — The highest action class a system, workflow, capability,
or grant may perform under current policy and evidence. The narrowest
applicable ceiling wins; runtime confidence cannot raise it.

**Boundary Contract** — The versioned command or event contract crossing a
responsibility or trust boundary. It defines identity, authority, schema,
state, delivery, idempotency, timeout, failure, evidence, human decision, and
compatibility behavior.

**Side-effect class** — The highest consequence category of a capability call:
read-only, reversible mutation, publication, deployment, destructive mutation,
privileged administration, or external communication. It determines minimum
authorization, evidence, and recovery controls.

**Delegation Record** — A durable, versioned assignment from one authorized
participant to another that binds purpose, scope, capability, context,
authority, budget, completion, failure, and return contracts. Delegation cannot
widen the authority held by the delegator.

**Emergency Control** — A tested independent mechanism for pausing, cancelling,
revoking, quarantining, rolling back, failing over, or shutting down a governed
subject. A visible control is not evidence until enforcement and recovery have
been exercised.

**Recertification** — A periodic or event-triggered decision that rechecks
ownership, purpose, risk, autonomy, models, evaluators, capabilities,
dependencies, policy, evidence, incidents, drift, cost, and outcomes for an
exact governed scope.

**Control Tower** — An operations projection that links governed system
inventory to authority, health, quality, safety, cost, drift, incidents,
response, and verified closure. It invokes authoritative control APIs but does
not replace their records.

**Verified closure** — The incident or finding state reached only after
containment, recovery, downstream reconciliation, independent validation,
notification decisions, residual risk, and accountable acceptance are
recorded. Service restoration alone is not closure.

**Trusted core / untrusted extension boundary** — A deterministic core that
owns state, policy, and reliability, separated from agent-written or user-
written code that may act only through bounded calls with no path for authority
to cross back.

**Sandboxed extension API** — The bounded interface through which extensions
act on a trusted core: an allowlist of calls, no ambient credentials, and
lifecycle control (publish, activate, revoke) held by the core.

**Agentic shell around a deterministic core** — The shape of extensible
software in which agents reason and extend in real time around a core that
enforces contracts. The phrase applies to products and to the factory itself.

**Dynamic code generation** — Code written at run time, for this user and this
moment, rather than shipped in a release, and executed through the sandboxed
extension API.

**Agent-generated extension** — A small versioned piece of behavior that an
agent authored and that the core loads through the sandboxed API with the same
lifecycle as a human-written plugin.

**Prototype-as-spec** — A large generated prototype used as the specification
itself, then sliced into reviewed pull requests through the factory.

**Interaction mock** — A clickable, generated approximation of a user interface
built to test how something should feel before anyone decides how it should
work.

**Discovery prototype** — A throwaway built to answer one product question and
discarded once the answer is recorded.

**Tracer bullet** — A thin end-to-end slice through every layer of a proposed
architecture, built to prove the path is passable rather than to deliver a
feature. Also called a technical spike.

## Outcome measures

**Token economics (tokenomics)** — The discipline of controlling model
inference spend without reducing validated output: choosing which model runs
which work, what the model is shown, how many turns a loop takes, what is
cached, what is automated away, and what is stopped. Organized by the cost
equation and judged by cost per validated outcome.

**Cost equation** — Total agent spend decomposed into multiplying terms:
users × sessions per user × turns per session × requests per turn × tokens per
request × price per token. The first two are adoption and should grow; the
middle three are work the agent does on its own behalf and are where
optimization lives; the last is chosen by routing workloads to models.

**Cost per outcome** — Spend divided by accepted, validated outcomes (a merged
change, a resolved incident, a completed review), the only cost figure a
factory optimizes for. Cost per token and token volume are diagnostic inputs.

**Pareto-optimal model selection** — Choosing, for each managed agent, the
model configuration that no other configuration beats on both cost per
completed task and quality, using a benchmark built from that agent's own real
work, and re-running the choice as the model frontier moves.

**Managed agent** — An agent the platform runs on a person's behalf for a
defined SDLC workload (code review, CI self-healing, on-call triage,
maintenance) with its own benchmark, model route, harness, and budget, and a
human review or escalation path. The most controllable layer of agent usage.

**Session analysis** — Automatic inspection of session traces across every
harness a person uses, classifying waste into named anti-patterns, each with a
financial impact and a remediation, and feeding the result back as guidance
rather than a cap.

**Lead Time to Validated Customer Value** — Time from governed Mission creation
until the change is deployed, independently verified in production or an
equivalent environment, and the expected customer outcome is confirmed.

**Change Failure Rate** — The proportion of deployments that require rollback,
hotfix, emergency intervention, or cause a customer, reliability, security, or
SLO failure within the defined observation window.

**Engineering Leverage** — The increase in validated customer value delivered
per engineer without a corresponding increase in cognitive load, coordination,
or failure.
