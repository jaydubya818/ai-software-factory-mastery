---
title: Control surfaces, event contracts, and storage
part: operate
chapter: 30
summary: How operators see, direct, interrupt, and judge autonomous work through decision-oriented surfaces, and how the factory's triggers, events, workflow versions, and stores are contracted so that what the operator sees is true.
absorbs: [factory-platform-engineering/04-human-agent-control-surfaces-and-operator-experience.md, factory-platform-engineering/05-workflow-event-contracts-and-factory-storage.md]
infographics: [operator-surface, event-contract, decision-packet]
---

# 30. Control surfaces, event contracts, and storage

A factory that runs well but cannot be seen, steered, or stopped is not operable. This chapter covers the two halves of that problem. The first half is the **control surface**: the screens and notifications through which a person understands what the factory is pursuing, what it has done, what it is waiting for, and what decision it needs. The second half is what sits underneath those screens: the typed **event contracts**, versioned workflow definitions, and storage boundaries that decide whether the state on the screen is actually true. After reading it you should be able to design an operator experience around decisions rather than chat, and to draw the truth boundary of every store and event feed in your factory.

## The problem

Most agent interfaces were built for conversation. They stream tokens, show a spinner labelled "thinking", and end with a text bubble. That is fine for one person talking to one assistant. It is useless for an operator supervising a dozen WorkOrders across three repositories, several of which are waiting on something.

What that operator needs to know is specific: which outcome each run is pursuing, which Plan and which authority are active, what has changed, why a run is waiting, what failed, which evidence is missing, and which decision is now required of a human. Raw traces contain all of that and communicate none of it. Vague progress ("working on it...") destroys trust faster than silence, because it implies the system knows something it will not say.

The people building the first real software factories describe the same gap. In the HumanLayer and BAML "Software factory design patterns" conversation, the control plane is named the most underserved layer of the stack, and the wish-list is essentially a list of control surfaces: dispatch new work, look at session traces, read the plans and architecture documents the agents produce, schedule runs nightly or on a cron or in response to webhooks, review and iterate on code in something PR-shaped that need not live in GitHub, manage permissions and audit (who can talk to what, who can see which services), and manage spend and budgets. Nobody asked for a better chat window.

The second half of the problem is quieter. A factory integrates issue trackers, source control, workers, tools, model providers, CI, artifact registries, deployment systems, observability, and human decisions. Events from those systems arrive late, duplicated, out of order, or in an older schema than the consumer expects. Workflow definitions change while runs are still active on the old one. Large artifacts and retrieval indexes do not fit safely in the same database as authoritative state. Build the operator's screen on top of that without discipline and the screen lies, and an operator lied to once by a status display stops reading it.

## How it works

### Interfaces display authority; they do not create it

The first principle of a control surface is that it renders records; it does not become one. Authority lives in the control plane's durable state (chapter [11](../03-build/11-control-plane-orchestrator-and-execution-plane.md)): the approved Plan version, the policy decision, the lease, the approval record. The interface computes, from those records, what is true right now, what is fresh, and which actions are safe, and shows that calmly. An agent may explain its own contract and uncertainty on screen, and that is useful, but the interface calculates authority, evidence freshness, and the set of safe actions from the records, not from what the agent says about itself.

The analogy is an aircraft cockpit rather than a chat log. A pilot does not read the engine's raw telemetry; the instruments summarise it into a handful of authoritative states and a small number of decisions. The instruments do not fly the aircraft. They make the state legible enough that the accountable person can.

### Design around decisions and state

Human decisions in a factory are not one thing. A person may need to clarify intent, approve a plan, grant an exception, stop work, accept evidence, merge, release, or promote autonomy. Compressing all of those into a single "Approve" button hides both the meaning and the risk of what is being approved. So the control surface is organised around decision types and authoritative states, and each of the seven primary surfaces exists because a distinct kind of decision lives there.

<!-- infographic: operator-surface -->
> **Infographic — The seven operator surfaces.** *(Jay's graphic goes here.)* Until then, the diagram below
> carries the same concept.

```mermaid
flowchart LR
  IC["Intent composer"] -->|"Mission / Spec"| PP["Plan preview"]
  PP -->|"approved Plan version"| EV["Execution view"]
  EV -->|"pause / cancel / answer / redirect"| IV["Intervention"]
  IV -->|"material change = new Plan version"| PP
  EV -->|"decision required"| RI["Review inbox"]
  RI -->|"open evidence"| ER["Evidence review"]
  ER -->|"accept / reject / waive"| RI
  EV -->|"failure class"| RV["Recovery view"]
  RV -->|"retry / cleanup / escalate"| EV
  CP[("Control plane records")] -. "authority, state, freshness" .-> IC & PP & EV & IV & RI & ER & RV
```

The **intent composer** is where a Mission begins. It captures the outcome wanted, the reason, the constraints, the acceptance criteria, the owner, the risk class, and the explicit non-goals. It is a form, not a prompt box, because those fields are what chapter [6](../02-design/06-intent-and-specification-engineering.md) needs before any agent runs.

The **plan preview** shows what the factory proposes to do before it does it: steps, the planner's assumptions, affected systems, the capabilities and skills it will use, the tests it will run, rollout and rollback, expected cost, and where the plan is uncertain. A person approves a Plan version here, and the approval binds to exactly that version.

The **execution view** is the live picture of one WorkOrder: current authoritative state, completed and pending work, the active Attempt, remaining budgets, changes made so far, blockers, and the safe controls available right now. It is also where session traces and the plans and architecture documents an agent has written become readable, which is the "look at the session traces, look at the plans" item from the wish-list.

The **intervention** surface changes the course of running work without breaking the records: pause, cancel, answer a question the agent raised, redirect within the approved scope, request a revision, or escalate. The rule that keeps it honest is that material replanning creates a new Plan version or a new authority decision. You can nudge a run inside its scope; you cannot silently expand its scope from a text box.

The **review inbox** is an ordered queue of decisions waiting on a specific person. Each item carries a deadline, a risk level, a recommendation, the evidence, the alternatives, and the consequence of doing nothing. In a small team it is often a Slack message, and the message should carry the same content; more on that below.

The **evidence review** surface maps each acceptance criterion to fresh proof. It shows counterevidence rather than hiding it, waivers with who granted them and why, lineage from candidate to check to result, the known limitations of the checks, and a drill-down into raw artifacts. Chapter [24](../04-prove/24-quality-contracts-proof-packages-and-certificates.md) defines the proof package; this is where a human reads one.

The **recovery view** appears when something has failed. It names the failure class, the retained state, whether a retry is eligible under the retry budget, whether the hypothesis behind the work has changed, what cleanup is needed, and who owns the next step, in the incident vocabulary of chapter [29](./29-resilience-incidents-and-the-control-tower.md).

### Make status precise

Status words are contracts. A run is *awaiting plan approval*, *queued for capacity*, *executing*, *awaiting input*, *independently verifying*, *blocked by stale evidence*, *eligible for release*, *observing outcome*, or *quarantined*. Each of those is a state in the durable state machine of chapter [12](../03-build/12-durable-execution.md), and each tells the operator both what is happening and who, if anyone, is on the hook. "Thinking" is not an operational status. It tells the operator nothing about authority, blockers, or what comes next, and it invites the false urgency of watching a spinner.

### Stream useful progress, not tokens

A **progress event** is a summary written for a person: the decisions completed since the last event, any material discovery (a dependency nobody mentioned, a test that was already broken), any change to scope, evidence produced, budget consumed, and the next transition the run expects. Token streams and tool-call streams remain available as diagnostics for the engineer who wants them, but they are not the default view.

Notifications built on progress events need four properties. They are deduplicated, so that three retries of one failure do not produce three pages. They are severity-aware, so that a stale-evidence block and a budget-exhausted halt are not styled the same as a routine completion. They are accessible. And they are routed to the accountable person, not to a channel where responsibility diffuses.

### The decision packet

The most valuable artifact a control surface produces is what this guide calls a **decision packet**: everything a person needs to make one decision well, in one place, with the decision itself clearly framed. It is what a review inbox item contains, and it is what the factory should send when it has to interrupt someone.

The HumanLayer team's pipeline shows the shape in practice. When their factory classifies an incoming issue it assigns a human shepherd, then pings that shepherd in Slack with a packet: here is the bug, here is the reproduction, here is the fix, here is the PR to read. For hard cases the packet changes shape: here is a plan; either pull it into your local agent and implement it yourself, or tell me the plan is good and I will implement it. That packet is not "I'm working on your issue" and it is not a transcript. It is a framed decision with the evidence attached, and its stated aim is to push human time as low as possible without pushing human authority away.

<!-- infographic: decision-packet -->
> **Infographic — Anatomy of a decision packet.** *(Jay's graphic goes here.)* Until then, the diagram below
> carries the same concept.

```mermaid
flowchart TB
  DP["Decision packet"] --> Q["The decision being asked"]
  DP --> D["Deadline and consequence of inaction"]
  DP --> R["Risk class and recommendation"]
  DP --> E["Evidence: criteria → fresh proof, counterevidence, waivers"]
  DP --> A["Alternatives: approve / request revision / reject / escalate"]
  DP --> L["Links: PR, repro, plan, raw trace drill-down"]
  Q & D & R & E & A & L --> H(("Accountable human"))
  H -->|"recorded decision"| CP[("Approval / decision record")]
```

A decision packet also enforces the distinction between rejecting and requesting a revision. Rejection ends the proposal and records why. Request-revision keeps the Plan alive and sends it back with a specific ask. Collapsing the two loses the record of what the human actually wanted, and it is exactly the kind of loss that chapter [33](../06-improve/33-governed-learning-and-compounding-engineering.md) later needs to mine.

### Preserve safe human control

Pause and cancel are different operations, and the interface has to say which it is doing. Pause holds the lease and retained state so the run can resume; cancel releases the lease, records the terminal state, and may trigger cleanup or compensation. Before any approval the interface previews the side effects it will unlock (which repositories, environments, spend), and after an action is accepted it confirms what was recorded, so the operator never guesses whether the click landed.

Operational interfaces are used under stress, at odd hours, by people with different abilities in different time zones. Keyboard navigation, screen-reader support, contrast, reduced motion, time-zone rendering, and localisation are not polish for a factory console; they decide whether an operator can act at 3 a.m.

### Teach failure, not only the happy path

A run explorer that only ever shows green runs trains operators to expect green. Jay's product notes for the Factory Run Explorer insist on at least one deterministic scenario in which agent execution completes and independent verification fails: execution complete, quality contract failed, behavioural evaluation 8 of 10 against a required 9 of 10, delivery blocked. The lesson is the one this guide keeps returning to: **completion is not acceptance**. A producing agent or harness reporting "done" is never sufficient evidence for acceptance, and the surface must show that rather than smooth it over. The scenario lets the person inspect what completed, what failed, which evidence failed, who owns the decision, why delivery was blocked, and which recovery options exist next; that is exactly what the recovery view and evidence review show for a real run, and the teaching scenario guarantees an operator has seen it before the first real one arrives.

### Measure attention, not clicks

Chapter [8](../02-design/08-economics-metrics-and-human-attention.md) argued that human attention is the factory's scarce resource. The control surface is where it is spent, so it is measured there: time to decision, unnecessary interrupts, approval rework (decisions revisited), false urgency (notifications that did not need a person), evidence-review time, escalation quality, abandonment (packets nobody acted on), and operator confidence as operators report it. Faster clicks do not prove better judgment; an inbox optimised for throughput alone trains people to approve without reading.

### Tradeoffs: detail, chat, and structure

More detail means more transparency and more cognitive load; the resolution is progressive disclosure, decision summary first, trace and artifacts on demand. Chat is flexible and good for clarification but poor at showing parallel state and evidence lineage; structured interfaces are clear and can feel rigid. The workable combination is a structured surface that permits conversational clarification, with the rule that a conversation never bypasses the records. When a chat exchange changes the plan materially, it creates a new Plan revision, exactly as an intervention would.

### Underneath the surface: triggers are intake, not authority

Everything above assumes the screen is showing the truth. That depends on how the factory ingests the world. Schedules, webhooks, messages, API calls, and repository events all create or update *proposed* work through an intake path that is authenticated and idempotent. None of them starts execution on their own. **Admission** then verifies the current owner, the scope, the applicable policy, the risk class, readiness (is the environment and configuration present?), and budget before anything runs. A webhook is a claim from a provider about its own state. It may be forged, replayed, or incomplete, so the factory treats it as intake and lets the control plane decide.

This is the cron-and-webhook item on the control plane wish-list done properly. "Run every night" and "run when Linear changes" are triggers into intake; the nightly run still passes admission, and still binds to an approved workflow version.

### Typed event envelopes

Every event that crosses a boundary inside the factory carries a typed **event envelope**. The envelope is the contract that lets consumers deduplicate, order, verify, and route without parsing the payload.

<!-- infographic: event-contract -->
> **Infographic — The event envelope and its journey.** *(Jay's graphic goes here.)* Until then, the diagram below
> carries the same concept.

```mermaid
flowchart LR
  P["Producer<br/>(CI, GitHub App, worker, provider)"] -->|"signed envelope"| L[("Event log / broker")]
  L -->|"at-least-once"| C["Consumer<br/>(dedupe by event id)"]
  C -->|"known type + version"| A["Admission / state machine"]
  C -->|"unknown incompatible version"| F["Fail visibly"]
  A -->|"authoritative transition"| S[("Transactional control store")]
  A -->|"observation only"| O[("Derived projections")]
  subgraph Envelope
    E1["type + version"]
    E2["event id, correlation id, causation id"]
    E3["producer identity, tenant, subject"]
    E4["occurred at, received at"]
    E5["payload schema, integrity, trace context"]
  end
```

The fields are fixed. Canonical type and version say what kind of fact this is and which payload schema it follows. Event identity lets consumers deduplicate; correlation identity ties the event to the WorkOrder or Attempt it concerns; causation identity names the prior event that caused this one, which is what makes causal replay possible. Producer identity and tenant say who emitted it and for whom, and are what the signature is checked against. Subject names the record the event is about. Occurred-at and received-at are both kept, because the gap between them is where late delivery hides. Payload schema, an integrity digest, and trace context complete the envelope.

Consumers deduplicate on event identity and tolerate a defined ordering (usually per-subject, not global). An event whose type and version the consumer does not understand fails visibly; silently dropping it is how a factory loses a "verification failed" fact and ships anyway. The line to remember is that an event is evidence that a producer reported something. The control plane still decides whether that report is authentic, current, relevant, and sufficient for an authoritative transition. Delivery is not acceptance.

### Version the workflow definition

A **workflow contract** (or workflow DSL) declares, for each workflow, its nodes with their inputs and outputs, the dependencies between them, the triggers that may start it, timeouts, retry policy, budgets, cancellation behaviour, compensation steps, human gates, completion states, and the evidence each completion requires. Declaring this makes the workflow inspectable in the plan preview and reviewable by policy, which is the argument for a DSL. The risk is that flexibility invites unsafe dynamic behaviour, so types, policy checks, and a migration protocol are not optional.

The binding rule is that a running WorkOrder stays bound to the workflow version approved when it started. Changing the definition does not change running work. Migrating an active run is a new decision with its own authority, done through a replay-safe transition that leaves the history of both versions intact.

### Evolve schemas as a rollout

Schemas for events, workflows, and projections change, and a **compatibility window** is how they change without breaking consumers. Additive changes (a new optional field) go first, ahead of consumer migration. Semantic changes (a field whose meaning shifts) require an explicit new version. Producers and consumers advertise the version ranges they support. The migration is a sequence of monitored states, not a deployment: backfill the new shape, dual-read or dual-write during the overlap, validate that the two agree, cut over, then contract by removing the old shape. Each state has an exit condition and is visible on the operator's health surface.

### Compensate partial effects explicitly

A distributed workflow cannot assume a global rollback. If a run has pushed a branch, opened a PR, and posted a comment before failing, there is no transaction to abort. The pattern is a **saga**: the workflow records each completed effect and the approved compensation for it, and on failure runs the compensations that apply. Compensation is not undo; it is a new action with its own authority and its own failure path. Ambiguous effects, where the factory does not know whether an external call landed, go to **reconciliation**: query the provider, compare, record what was true. Chapter [12](../03-build/12-durable-execution.md) covers the runtime side; here the point is that the recovery view must show completed effects and pending compensations, not just "failed".

### Assign every store a truth boundary

The last contract is about where facts live. Each kind of store is good at one thing and lies about others, so each gets an explicit **truth boundary**: what it is authoritative for, and what it merely reflects.

| Store | Appropriate content | Important limit |
| --- | --- | --- |
| Transactional control store | Authority, state, policy decisions, leases, approvals | Avoid large unbounded artifacts |
| Event log or message broker | Durable facts and asynchronous delivery | Delivery does not equal acceptance |
| Object or artifact store | Logs, diffs, test output, packages, evidence blobs | Metadata and digest must remain authoritative elsewhere |
| Search index | Discoverable projections | Derived, stale, rebuildable |
| Vector database | Semantic retrieval candidates | Similarity is not authority or evidence |
| Analytics warehouse | Aggregates and trends | Delayed projections cannot drive immediate authority blindly |

Two of these deserve a sentence. Artifacts go to the blob store by content digest, with digest and metadata recorded in the control store, so the control store stays small and an artifact cannot be swapped without the digest changing. A vector database is rebuilt whenever its corpus, embedding model, or chunking changes, without ceremony, because nothing authoritative lives in it; if a retrieval index is ever the only place a fact exists, the boundary has been violated.

```mermaid
flowchart TB
  CS[("Transactional control store<br/>authority, state, leases, approvals")]
  EL[("Event log<br/>durable facts")]
  AS[("Artifact store<br/>blobs by digest")]
  SI[("Search index<br/>derived")]
  VD[("Vector DB<br/>derived")]
  AW[("Warehouse<br/>delayed aggregates")]
  CS -->|"emits"| EL
  EL -->|"replay / rebuild"| SI & VD & AW
  CS -->|"digest + metadata"| AS
  AS -. "blob referenced, never authoritative" .-> CS
  SI & VD & AW -. "never drive authority" .-> CS
```

Storage policy then applies by data class rather than by store: tenancy, retention, residency, encryption, and cost. **Retention** follows the record, not the technology. Decision records, approvals, and evidence digests are kept for the audit horizon (for regulated tenants, including legal hold); raw token streams and diagnostic traces age out on a short schedule; artifacts live as long as the evidence that references them. Chapter [28](./28-observability-telemetry-and-forensics.md) covers the telemetry side; chapter [31](./31-enterprise-adoption-and-the-infrastructure-landscape.md) covers the enterprise controls that shape it.

### Tradeoffs: one store or many

A single database simplifies transactions and becomes a scaling and retention bottleneck as artifacts and events pile up; specialised stores fit their content and add reconciliation burden. Exactly-once delivery is rarely available across boundaries, so the achievable target is idempotent effects and effectively-once outcomes, which is why the envelope carries an event id and every external effect is keyed. A flexible workflow DSL accelerates composition and expands the security and migration surface in proportion. None of these is decided once.

## How to build it

**Control surface**

1. Enumerate the decision types the factory asks of humans (clarify, approve plan, grant exception, stop, accept evidence, merge, release, promote). Each gets a distinct action and a distinct record.
2. Build the seven surfaces as views over control-plane records. No surface writes authority directly; every action is a server-side transition.
3. Forbid free-text status. Map every runtime state to the authoritative vocabulary above.
4. Define the progress event schema (decisions, discoveries, scope changes, evidence, budget, next transition) and keep token and tool-call streams on a separate diagnostic channel.
5. Use the decision packet everywhere a human is interrupted: review inbox, Slack or email pings, escalations.
6. Give pause and cancel, and reject and request-revision, distinct semantics and distinct records. Preview side effects before approval; confirm the recorded outcome after.
7. Deduplicate notifications, carry severity, route to the accountable person.
8. Ship a deterministic "execution complete, verification failed, delivery blocked" scenario in the run explorer.
9. Instrument attention (time to decision, unnecessary interrupts, approval rework, false urgency, evidence-review time, escalation quality, abandonment, operator confidence).
10. Test keyboard, screen-reader, contrast, reduced-motion, time-zone, and localisation behaviour, and the loading, empty, error, success, paused, cancelled, stale-evidence, and escalation states of each screen.

**Event and workflow contracts**

1. Adopt one event envelope (CloudEvents is a reasonable base) and keep it in a schema registry with advertised version ranges.
2. Make every intake path (cron, webhook, message, API, repository event) authenticated and idempotent; make admission the only path to execution.
3. Write workflow definitions as typed, versioned contracts declaring nodes, inputs, outputs, dependencies, triggers, timeouts, retries, budgets, cancellation, compensation, human gates, completion states, and required evidence.
4. Bind running WorkOrders to their approved version; migrate only through an explicit, authorised, replay-safe transition.
5. Run schema evolution as monitored states (backfill, dual-read/dual-write, validate, cut over, contract) with side-by-side compatibility tests.
6. Record completed effects and approved compensations per workflow; route ambiguous effects to reconciliation.
7. Fail visibly on unknown incompatible event versions.

**Storage**

1. Publish the truth-boundary table for your own stores, one line per store.
2. Store artifacts by content digest; record digest and metadata in the control store.
3. Keep a replay tool that rebuilds every projection (search, vector, warehouse) from the event log.
4. Define storage policy per data class: tenancy, retention, residency, encryption, cost, legal hold.
5. Give operators tooling to replay events, inspect causation chains, migrate eligible active runs, and reconcile provider state without rewriting history.

## Failure modes

**Status theatre.** The screen shows "in progress" for a run that is blocked on a stale-evidence check nobody has been told about. Detect it by comparing displayed status against the state machine; fix it by forbidding any status word that is not an authoritative state.

**The undifferentiated approve button.** A reviewer approves a plan, an exception, and a release through the same control, and the audit record cannot say which. Split decision types at the record level, not the button label.

**Notification storms.** Retries and duplicate events each page the shepherd, who mutes the channel. The attention metrics (unnecessary interrupts, false urgency) show it; envelope-based deduplication and severity-aware routing fix it.

**Chat that rewrites the plan.** An operator "just asks" the agent to also handle the adjacent module, and scope grows without a new Plan version. Diff what was executed against the approved Plan; make material replanning create a new version from any input channel.

**Silent schema drops and webhooks as authority.** A consumer discards an event version it does not understand, so a verification failure never reaches the gate; or a forged or replayed "checks passed" webhook advances a WorkOrder. A dead-letter count that should be zero catches the first; producer identity and integrity checks on every envelope, plus admission before any transition, catch the second.

**Migration under running work.** A workflow definition is edited in place and active runs pick up steps nobody approved. Bind runs to a version id, alert when the definition's hash changes, and migrate only through explicit decisions.

**Compensation mistaken for rollback.** A failed run is marked "rolled back" while the PR it opened is still open. List recorded effects without recorded compensation; use saga records and reconciliation for ambiguous effects.

**Authority in the wrong store.** A search index or vector database becomes the only place a fact exists and a rebuild loses it; or logs and diffs pile up inline in the transactional database until it can neither scale nor purge. Rebuild projections regularly and diff; move blobs to the artifact store by digest; enforce the truth-boundary table.

**Retention by accident.** Evidence an auditor needs ages out with the traces, or raw token streams are kept forever at enormous cost. Define retention per data class, not per store.

## In Mission Control

At the studied commit [`d902fae`](https://github.com/jaydubya818/MissionControl/tree/d902fae7032c0696b531c44ae88829c652516fc6), a React/Vite application provides the operator surfaces, Convex owns authoritative durable state and server-side transitions, and a Hono orchestration service hosts execution adapters and provider boundaries. Product doctrine favours an exception-first operator experience over agent activity feeds, which is the right instinct for this chapter.

Implemented: operator screens for Missions, Plans, Attempts, evidence, approval, review, release, health, and learning; run events, traces, observations, model/token/cost fields, and inspector views; Tasks, immutable Attempts, leases, heartbeats, retry budgets, events, artifacts, and pause/drain/kill controls; approval records with separation of duties; a GitHub App connection boundary; a workflow compatibility contract with structured completion. Human workflow preferences are distinguished from authority, so a presentation mode never changes what a user may do.

Partial: builder surfaces are defined in the North Star and V1 strategy (Mission intake, plan review, exception queues, run inspection, review packages, release decisions), but there is no repository-wide action-parity manifest or browser proof for every surface, and no single interaction model covering plan preview, live progress, pause and resume, intervention, notification, review inbox, accessibility, and attention measures. Webhook evidence ingestion had recorded defects at the earlier assessment. Ambiguous external effects still require manual reconciliation.

Future: a canonical event envelope, workflow migration protocol, compensation model, schema registry, and storage responsibility map spanning the whole factory do not yet exist as single artifacts, and the deterministic "verification failed" teaching scenario is a product requirement, not a shipped feature. Current screens should be judged against this chapter's surface model rather than treated as sufficient because they expose records.

## Retain this

- Interfaces display authority; they do not create it. Every action on a control surface is a server-side transition over a durable record.
- Design around decision types and authoritative states, across seven surfaces: intent composer, plan preview, execution view, intervention, review inbox, evidence review, recovery view.
- "Thinking" is not a status. Progress events summarise decisions, discoveries, scope changes, evidence, budget, and the next transition; token streams are diagnostics.
- Interrupt humans with a decision packet: decision, deadline, risk, recommendation, evidence with counterevidence, alternatives, links. A Slack ping carries the same packet.
- Completion is not acceptance; the run explorer should show a run that finished and failed verification.
- Triggers are intake, not authority; admission decides. Events carry a typed envelope; consumers deduplicate, tolerate defined ordering, and fail visibly on unknown versions. Delivery is not acceptance.
- Running work binds to its approved workflow version; migration and compensation are new decisions with their own authority.
- Every store has a truth boundary. Authority lives in the transactional store; artifacts are referenced by digest; projections are rebuildable; similarity is not evidence.

## Go deeper

- Related chapters: [4. The human–agent operating model](../02-design/04-the-human-agent-operating-model.md) · [7. Governance, policy, and risk-proportional approval](../02-design/07-governance-policy-and-risk-proportional-approval.md) · [8. Economics, metrics, and human attention](../02-design/08-economics-metrics-and-human-attention.md) · [11. Control plane, orchestrator, and execution plane](../03-build/11-control-plane-orchestrator-and-execution-plane.md) · [12. Durable execution](../03-build/12-durable-execution.md) · [20. Autonomous engineering workflows](../03-build/20-autonomous-engineering-workflows.md) · [24. Quality contracts, proof packages, and certificates](../04-prove/24-quality-contracts-proof-packages-and-certificates.md) · [28. Observability, telemetry, and forensics](./28-observability-telemetry-and-forensics.md) · [29. Resilience, incidents, and the control tower](./29-resilience-incidents-and-the-control-tower.md) · [33. Governed learning and compounding engineering](../06-improve/33-governed-learning-and-compounding-engineering.md)
- Glossary: [Agent–User Interaction Protocol, decision packet, event envelope, saga, truth boundary](../appendix/glossary.md)
- Labs: [10. Authority containment and decision replay](../appendix/labs/10-authority-containment-and-decision-replay-lab.md) · [11. Orchestration failure recovery and cost](../appendix/labs/11-orchestration-failure-recovery-and-cost-lab.md)
- Case study: [Mission Control capability, workflow, and admission map](../appendix/mission-control/03-capability-workflow-and-admission-map.md), assessed at `d902fae`
- Sources: HumanLayer × BAML livestream, "Software factory design patterns" (Dexter and Vaibhav), on the control plane as the underserved layer and the Slack shepherd packet; Jay West, "Use the factory run to teach failure" (Factory Run Explorer product notes)
- Primary references: [CloudEvents specification](https://cloudevents.io/) · [OpenAI Agents SDK human-in-the-loop guide](https://openai.github.io/openai-agents-python/human_in_the_loop/) · [Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/)
