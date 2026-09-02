---
title: "Agent architecture: loop, MCP, tools, context, and memory"
part: build
chapter: 15
summary: An engineering agent is a governed runtime composition around a fallible model — an execution loop, a protocol boundary for capabilities, behavioral tool contracts, a context compiler, and a memory lifecycle — with authority held by the runtime, never by the model.
absorbs: [06-ai-engineering/00-ai-systems-foundations-for-software-factory-architects.md, 06-ai-engineering/01-agent-architecture-mcp-tools-context-and-memory.md]
infographics: [agent-loop, mcp-topology, context-assembly, memory-admission]
---

# 15. Agent architecture: loop, MCP, tools, context, and memory

The previous chapters built the harness and the environment an agent runs inside. This chapter opens the agent itself. It explains what an engineering agent actually is once you strip away the marketing, how its execution loop turns an objective into actions and observations, how the Model Context Protocol connects it to capabilities without granting it trust, what a tool must promise beyond a JSON schema, how context is compiled rather than pasted, and how memory is admitted, corrected, and revoked. After reading it you should be able to draw a complete governed agent runtime on a whiteboard and defend each box.

## The problem

A language model can read and write text. An engineering agent has to do far more: understand an authorized objective, observe the exact state of a repository, choose among tools, keep its execution state across a long task, respect policy, recover from failure, and leave evidence tied to the artifact it changed.

Teams often stuff all of those responsibilities into one prompt and call the result an agent. What they get is an opaque worker whose identity, authority, context, tools, memory, and model behavior cannot be versioned, revoked, or evaluated independently. When it produces something wrong, nobody can tell whether the model, the instructions, the retrieval, the memory, a tool adapter, the policy, the environment, or the retry loop caused the failure. The production question is therefore not "how do we write a better prompt?" It is "how do we construct a governed, observable, replaceable runtime around a fallible reasoning component?"

The problem exists for structural reasons. A model call does not by itself provide durable application state, identity, authority, or recovery; a provider may hold message history for you, but the factory still owns the authoritative state and still decides what enters each request. Context windows are finite, and everything that competes for the window (repository content, retrieved documents, MCP resources, tool descriptions, tool results, prior agent notes) can be wrong, stale, malicious, or irrelevant. The same model behaves differently when any prompt, tool schema, dependency, provider version, context item, or runtime policy changes. And adding agents adds specialization and parallelism at the price of hand-off loss, correlated error, duplicate work, cost, deadlock, and blurred accountability. A protocol can make capabilities interoperable, but it cannot decide which capability is safe for this user, this repository, this task, at this moment. All of that has to be owned by the surrounding system.

## How it works

### An agent is a governed runtime composition

Start with the plain definition. An **AI agent** is a system that can interpret a goal, reason about the work, use tools, take actions, observe results, and continue until it reaches a completion or escalation condition. An **autonomous agent** can take many such steps without a human instruction at each one, but still operates inside permissions, policies, budgets, and escalation boundaries. An **agentic workflow** is a structured sequence in which one or more agents reason, use tools, decide, and complete work toward an objective; **orchestration** coordinates which agent does which task, in what order, with what context, permissions, dependencies, and completion conditions. **Tool use** is how an agent touches external systems such as GitHub, Jira, CI/CD, databases, cloud environments, and observability platforms.

Behind those definitions sits the idea that organizes the whole chapter: an engineering agent is not a model with a long prompt. It is a versioned composition of eleven parts.

`identity + objective + instructions + model profile + tools + context + memory view + policy + budgets + state + evaluation profile`

| Component | Responsibility | What must be frozen or recorded |
|---|---|---|
| Identity | Names the agent role and the acting principal | Agent version, tenant, user or service principal |
| Objective | States the bounded outcome | WorkOrder and approved Plan references |
| Instructions | Defines trusted operating behavior | System instructions, skills, workflow versions |
| Model profile | Selects reasoning capability | Provider, model, parameters, routing policy |
| Tool grants | Defines possible actions | Tool names, versions, scopes, schema hashes |
| Context | Supplies decision-relevant knowledge | Source revisions, selection reasons, content hashes |
| Memory view | Supplies governed prior knowledge | Snapshot, query, scope, provenance, lifecycle filters |
| Policy | Limits authority | Policy bundle, risk class, required approvals |
| Budgets | Limits resource use | Time, tokens, cost, attempts, concurrency |
| State | Makes execution durable | Task, Attempt, lease, checkpoints, cancellation state |
| Evaluation profile | Defines expected behavior | Dataset, graders, thresholds, evidence requirements |

This is the same thing Jay's capability taxonomy calls an **agent definition**: the configuration that fixes an agent's purpose, instructions, tools, permissions, and behavior, with its role, capabilities, policies, goals, permissions, tool access, model configuration, autonomy level, escalation rules, and success criteria. Change any material component and you have a different worker; evidence from an earlier Attempt may no longer apply. A model name alone is never a sufficient reproducibility record.

Think of a surgeon on shift. The surgeon supplies judgment; the hospital supplies the badge, the operating list, the protocols, the checked-out instruments, the chart, the consent forms, the theatre time, and the audit trail. Nobody calls that "a surgeon with a long set of instructions." The institution around the person is what makes the judgment safe to act on.

```mermaid
flowchart TB
    Human["Human intent and material decisions"] --> Control["Control plane: policy, authority, durable state"]
    Control --> Manifest["Frozen execution manifest"]
    subgraph Runtime["Governed agent runtime"]
        Compiler["Context compiler"] --> Model["Model profile"]
        Memory["Authorized memory view"] --> Compiler
        Manifest --> Compiler
        Manifest --> Model
        Model --> Proposal["Proposed action"]
        Proposal --> Gateway["Tool and MCP policy gateway"]
        Gateway --> Tools["Bounded tools and services"]
        Tools --> Observation["Untrusted structured observations"]
        Observation --> Compiler
    end
    Gateway --> Receipts["Call receipts and denials"]
    Runtime --> Trace["Trace, artifacts, checkpoints"]
    Receipts --> Evidence["Independent evidence path"]
    Trace --> Evidence
    Evidence --> Decision["Human or policy admission decision"]
```

### The execution loop

Inside the runtime the agent runs a cycle. The taxonomy names it the **execution loop**: understand → plan → act → observe → evaluate → adjust, repeated until the goal is met or an escalation condition is reached. Each step has a concrete meaning in a factory.

*Understand* means reading the frozen objective and the compiled context, not the raw repository. *Plan* means choosing the next bounded step, which may be revising the Plan the human approved but never silently widening it. *Act* means proposing a tool call. *Observe* means receiving the tool's result as an untrusted observation. *Evaluate* means checking the observation against acceptance criteria, budgets, and policy, with the deterministic checks the runtime owns rather than the model's own opinion. *Adjust* means deciding whether to continue, retry, replan, stop, or escalate. The loop decides the next action; the workflow around it, covered in [chapter 12](./12-durable-execution.md), owns durable progress and authority.

<!-- infographic: agent-loop -->
> **Infographic — The execution loop.** *(Jay's graphic goes here.)* Until then, the diagram below carries the same concept.

```mermaid
flowchart LR
    U["Understand"] --> P["Plan"] --> A["Act: propose tool call"]
    A --> G{"Gateway"}
    G -->|deny| D["Recorded denial"] --> O
    G -->|approve| X["Bounded execution"] --> O["Observe: untrusted result"]
    O --> E["Evaluate: checks, budget, policy"]
    E --> J["Adjust"]
    J -->|continue| U
    J -->|done| Done["Completion + evidence"]
    J -->|stuck or unsafe| Esc["Escalate to human"]
```

The taxonomy names what surrounds the loop. **Context management** supplies the right code, documents, history, state, and information at the right time; **context window management** decides what fits. **Control mechanisms** are the guardrails: permissions, approvals, policies, budgets, and human-in-the-loop checkpoints. A **guardrail** is any control that limits or redirects agent behavior; a **policy engine** evaluates rules and decides whether an action may proceed, needs approval, or must be blocked. The **execution environment** is the sandbox, container, or workspace where the agent runs commands and changes code; **sandboxing** isolates it so a mistake cannot reach what it should not. **State management** tracks progress across the loop, **error recovery** retries, repairs, or replans after failure, and **observability** traces decisions, actions, latency, failures, and cost.

### Reasoning is separated from authority

The single most important design rule is that the model proposes and the runtime disposes. The model can interpret intent, form hypotheses, choose among allowed options, and propose a tool call. It cannot expand its own scope. Before anything executes, the runtime validates the acting identity, the input schema, the policy, the repository and path scope, the risk class, the budget, the approval state, the idempotency strategy, and the environment. The result comes back as an observation, never as trusted instructions. And the runtime records both approved and denied calls, so a reviewer can reconstruct what the agent attempted, what actually ran, and why.

```mermaid
flowchart LR
    Model["Model proposes tool call"] --> Validate["Schema, identity, policy, budget gateway"]
    Validate -->|deny| Denial["Recorded denial and reason"]
    Validate -->|approve| Execute["Bounded execution"]
    Execute --> Result["Validated result envelope"]
    Result --> Observation["Untrusted observation"]
    Observation --> Model
    Execute --> Receipt["Artifact and call receipt"]
```

### The execution manifest is frozen before work begins

Every Attempt should resolve all of its mutable configuration into one immutable **execution manifest** before the first model call. The manifest is a contract, not a log assembled afterwards; runtime events and evidence must point back to it. A minimal manifest looks like this.

```yaml
attempt_id: attempt-123
work_order_revision: sha256:...
plan_revision: sha256:...
agent_version: agent-implementation-v4
model_profile: code-reasoning-standard-v2
instruction_bundle: sha256:...
tool_grants:
  - name: repository.read_file
    version: 3.2.0
    schema_hash: sha256:...
    scope: read
context_lock: sha256:...
memory_snapshot: sha256:...
policy_bundle: engineering-medium-risk-v5
budgets:
  wall_clock_seconds: 1800
  attempts: 3
evaluation_profile: repository-change-v7
```

### The AI concepts an architect must actually hold

The discipline this chapter belongs to is **AI Engineering**: the engineering practice that turns model capability into reliable systems through data, knowledge, semantics, context, agents, tools, structured outputs, routing, loops, evaluations, and runtime controls. Model prompting is one technique within that discipline, not the discipline itself. You do not need a history of model architectures to design a governed delivery system. You need enough model literacy to bound context, select inference profiles, evaluate behavior, control data, and plan capacity. The useful question is never "which model is smartest?" but "which qualified configuration meets this task's quality, safety, latency, availability, data, and cost contract?" The concepts that change factory decisions are these.

| Concept | Practical meaning | Factory decision it changes |
|---|---|---|
| Token | Unit a model reads and writes | Context and output budgets, cost, truncation, stop conditions |
| Context window | Maximum active input/output sequence | Retrieval, compaction, history, governing-content allocation |
| Embedding | Vector representation useful for similarity | Retrieval index, privacy, refresh, model/version compatibility |
| Structured output | Response constrained to a machine-readable schema | Validation, retry, compatibility, tool-call safety |
| Tool use | Model proposes a typed capability call | Authorization, side effects, idempotency, receipts, containment |
| Inference | Runtime generation from a fixed model version | Capacity, latency, data path, caching, cost, availability |
| Sampling | Controls variation in generation | Reproducibility, repeated trials, uncertainty, task profile |
| Multimodal input | Text plus image, audio, video, or other media | Data classification, parsing, evaluation, bandwidth, accessibility |
| Adaptation | Fine-tuning or other model-specific behavior change | Registry, data governance, evaluation, rollout, rollback |
| Retrieval | Selecting external knowledge at run time | Freshness, permission, attribution, poisoning, revocation |
| Prompting | Configuring instructions and examples at run time | Versioning, hierarchy, injection resistance, evaluation |

Keep the four improvement mechanisms distinct, because they have different owners, risks, rollback paths, and evidence. Training changes learned parameters. Adaptation specializes a model. Retrieval supplies current external information. Prompting supplies task instructions and examples. Do not call every improvement "training."

Economics follow from the same concepts. End-to-end latency is the sum of queue time, context retrieval, prompt construction, time to first token, generation, tool calls, validation, and retries; throughput depends on provider capacity, token volume, concurrency, batching, and model profile. Caching cuts cost but is only safe when identity, tenant, purpose, policy, source, and configuration versions are all in the key. Track reserved and actual tokens, model and tool calls, elapsed and queue time, evaluator cost, environment cost, and human attention per accepted outcome. A cheaper call that doubles retries is the expensive system.

Model classes (general-purpose, code-specialized, small local, reasoning-oriented, embedding, reranker, classifier, multimodal) are capability classes chosen by representative evaluation, data path, latency, cost, availability, tool and schema support, context behavior, and operational constraints; family names change faster than those decisions. Larger models help on hard tasks but raise cost, latency, and data exposure; local models improve control but add serving and capacity work; adaptation improves repeated domain behavior but raises data and rollout obligations. Choose the simplest qualified mechanism. None of this teaches training mathematics or certifies any model or provider; it is the literacy needed to make control, cost, and evidence decisions, and [chapter 17](./17-models-routing-and-capability-selection.md) turns it into a router.

### MCP is an interoperability boundary, not a trust decision

The **Model Context Protocol (MCP)** is a standard way to expose tools and contextual resources to AI systems through defined interfaces. For an executive audience the one-liner is enough: MCP gives agents a standardized way to discover and use enterprise tools and context. For an architect, the details matter, and the normative statements below are pinned to the stable `2025-11-25` specification; experimental features are labelled, and draft behavior must never silently redefine a production contract.

MCP uses a **host–client–server** architecture over JSON-RPC. The **host** is the application that coordinates model access, user consent, security policy, and context; it creates one **client** per server connection. The client negotiates the protocol version and capabilities, maintains the stateful session, and routes messages. The **server** exposes a focused set of capabilities. The session has a lifecycle: initialize with version and **capability negotiation**, operate, shut down. The stable specification defines two transports, local `stdio` and remote Streamable HTTP. A production contract must pin protocol version, transport, server identity, and negotiated capabilities; "supports MCP" is too vague to mean anything.

The analogy is a universal power socket. The standard guarantees the plug fits and the voltage matches. It says nothing about whether the appliance is safe, whether you are allowed to run it in this room, or whether it will set the curtains on fire. Capability negotiation proves both sides speak a compatible protocol. It does not prove a server is trustworthy, a tool is safe, or the current WorkOrder authorizes its use.

<!-- infographic: mcp-topology -->
> **Infographic — MCP topology.** *(Jay's graphic goes here.)* Until then, the diagram below carries the same concept.

```mermaid
flowchart LR
    subgraph Host["Host: consent, policy, model access"]
        Runtime["Agent runtime"]
        C1["Client 1"]
        C2["Client 2"]
        Runtime --> C1
        Runtime --> C2
    end
    C1 -->|"stdio, JSON-RPC"| S1["Server: repository tools"]
    C2 -->|"Streamable HTTP, JSON-RPC, audience-bound token"| S2["Server: issue tracker"]
    S1 -.->|"tools, resources, prompts"| C1
    S2 -.->|"sampling, elicitation, tasks"| C2
    Gateway["Enterprise MCP gateway: identity, allowlist, egress, receipts"] --- C2
```

MCP's primitives carry different control expectations, and a factory should treat each differently.

| Primitive | Purpose | Control model | Factory treatment |
|---|---|---|---|
| Tools | Perform computation or side effects | Model-controlled, with host/runtime approval | Apply schema, scope, risk, budget, and evidence policy |
| Resources | Expose addressable data or content | Application-controlled | Treat content and annotations as untrusted; retain URI, revision, provenance |
| Prompts | Reusable message templates | User-controlled | Treat server-supplied instructions as versioned content, not platform authority |
| Sampling | Server requests model generation through the client | Client-controlled, with user oversight | Constrain model access, tool loops, context, cost, and approvals |
| Elicitation | Server requests additional user input | User-controlled | Make the requesting server visible; protect sensitive-data boundaries |
| Tasks | Deferred, durable request execution | Negotiated; experimental in `2025-11-25` | Bind task state to authorization context; set TTL, cancellation, polling, audit rules |

One naming collision needs flagging. An **MCP Task** is a protocol-extension handle used to manage a long-running MCP operation, and it is not the same thing as the factory's Task: the domain Task organizes authorized WorkOrder execution and retains business and acceptance lineage, whereas the MCP Task tracks a single deferred request on one server connection. Do not let the former stand in for the latter in records or policy.

Every MCP server is three things at once: a software supply-chain dependency, an identity boundary, and a potential data-egress path. So the factory governs the connection, not only the individual call. An enterprise MCP gateway should demand a connection contract that answers ten questions.

| Control | Required decision |
|---|---|
| Server identity | Which organization, package, binary, endpoint, and version are trusted? |
| Transport | Local `stdio` or remote Streamable HTTP, and which network boundary does it cross? |
| Authentication | Which principal is connecting and how is it verified? |
| Authorization | Which resource is the token intended for, which scopes apply, and does scope increase require new consent? |
| Capability allowlist | Which tools, resources, prompts, sampling, elicitation, or task features may be negotiated? |
| Data policy | What may leave the repository or tenant, and what must be redacted? |
| Invocation policy | Which calls are read-only, reversible, consequential, or prohibited? |
| Operational bounds | Timeout, concurrency, rate, output-size, retry, and cancellation limits |
| Evidence | Which request, response, approval, denial, and artifact receipts must be retained? |
| Revocation | How can a server, capability, credential, or version be disabled immediately? |

Authorization over HTTP has its own rules. Access tokens must be **audience-bound** to the intended MCP server, requested with explicit **scopes**, and, following the specification's use of **resource indicators**, issued for that specific resource. **Token passthrough**, where a server forwards the client's token to unrelated downstream services, collapses trust boundaries and must not be treated as a shortcut. A scope increase should require fresh consent, not a silent renegotiation.

### MCP solves interoperability, not governance

Be precise about the problem MCP actually solves. Before a shared protocol, every agent host had to integrate with every capability separately: N hosts times M tools, each with its own discovery, schema, invocation, and response format. MCP collapses that **N×M integration problem** into one contract for discovery, tool schemas, invocation, and responses. That is valuable, and it is all it does. Identity, authorization, scope, argument validation, policy, and auditability stay with the factory, exactly where they were before the protocol arrived.

> *MCP standardizes connectivity. It doesn't outsource governance.*

It follows that MCP is not mandatory for every capability. Putting a service behind MCP buys reuse, discovery, consistent contracts, and portability across hosts; it costs another abstraction and another network hop. A high-throughput, stable, internal service that one runtime calls thousands of times an hour may be better served by a direct API adapter behind the same gateway. Decide per capability on reuse, interoperability, governance, latency, and operational cost, and record the decision.

| Question | Favors MCP | Favors a direct service call |
|---|---|---|
| Who else calls it? | Several hosts, harnesses, or providers | One runtime, one team |
| How stable is the contract? | Evolving; discovery and schema negotiation pay off | Frozen; a typed client is simpler |
| What does the hop cost? | Latency is tolerable for the task | High throughput or tight latency budget |
| Where is governance enforced? | At the gateway either way | At the gateway either way |
| Operational burden | Shared server, shared lifecycle | Owned adapter, owned lifecycle |

*MCP is an interoperability decision, not a religion.* Either path passes through the same registry and gateway described below.

### Tools are behavioral contracts

A tool is not safe because its arguments satisfy a JSON Schema. Its contract has to define behavior under success, failure, retry, cancellation, and partial completion.

| Contract field | Why it matters |
|---|---|
| Input and output schema | Makes validation and downstream interpretation explicit |
| Acting identity | Attributes the action to the correct user, service, and agent |
| Scope | Limits repositories, paths, records, operations, and environments |
| Side-effect class | Separates observation from reversible and from consequential mutation |
| Idempotency | Prevents retries from duplicating commits, messages, deployments, or records |
| Timeout and cancellation | Bounds abandoned or long-running work |
| Retry policy | Distinguishes safe transient recovery from repeated harmful action |
| Rate limits | Protects the downstream system and caps runaway loops |
| Approval behavior | States which calls need a human, and whether approval can be pre-granted by risk class |
| Result envelope | Separates structured data, human-readable explanation, and error state |
| Evidence receipt | Ties the call to inputs, outputs, artifacts, and policy decisions |
| Version and schema hash | Makes behavioral change detectable and evaluable |

Keep two error classes apart. A **protocol error** (malformed request, unknown method, invalid parameters) is not the same as a **tool-execution error**, where a well-formed request ran and the business operation failed. Structured failures let the model correct an input without hiding an operational or policy failure. The official tools specification covers validation, execution errors, access control, rate limiting, timeouts, and audit logging for exactly this reason. Output schemas matter as much as input schemas: a result the runtime cannot parse cannot be validated, and a result the runtime cannot validate should not become an observation the model trusts.

### The governed tool registry: where intelligence becomes authority

A model with no tools can only be wrong on paper. A model with a tool can be wrong in a repository, a ticket queue, or a production environment.

> *The moment a model gets a tool, intelligence becomes authority.*

That is why capabilities do not reach an agent directly, whether they arrive over MCP or a direct adapter. They sit behind a **governed tool registry** and **tool gateway**. The registry is the catalog of capabilities the factory knows about; the gateway is the enforcement point every call passes through. Registering a tool means answering eight questions before any agent can see it.

| Question | What the registry records |
|---|---|
| What capability is this? | Purpose, side-effect class, the systems it touches |
| Who can invoke it? | Eligible agent definitions, roles, and workflows |
| On whose behalf? | The acting principal the call is attributed to: user, service, or workload identity |
| Which resources? | Repositories, paths, records, environments, tenants it may reach |
| What are valid arguments? | Typed input schema and validation rules |
| What is its risk class? | Read-only, reversible, consequential, or prohibited by default |
| Is approval required? | Whether a human or policy must admit the call, and whether approval can be pre-granted by risk class |
| What is logged as evidence? | The request, response, decision, and artifact receipts retained per call |

Alongside those answers the registry carries the operational contract from the previous section: typed schema, timeout, rate limit, and audit behavior. Grants are then scoped to the task, not to the agent in general. A repository-analysis agent gets read access to one repository; it does not get deployment credentials because they happened to be available on the host. The same agent definition can hold different grants in different WorkOrders.

The controls that matter most at the tool boundary are enforced outside the model, in this order of precedence: identity, authorization, argument validation, resource scope, rate limits, timeouts, auditability, and approval requirements. None of them depends on the model's cooperation. A prompt cannot loosen a schema, and a persuasive retrieved document cannot widen a scope.

```mermaid
flowchart LR
    Reg[("Governed tool registry")] -->|"grants scoped to task"| Manifest["Execution manifest"]
    Model["Model proposes call"] --> GW["Tool gateway"]
    Manifest --> GW
    GW --> I["Identity"] --> Au["Authorization"] --> V["Argument validation"] --> Sc["Resource scope"]
    Sc --> RL["Rate limit + timeout"] --> Ap{"Approval needed?"}
    Ap -->|no| Exec["Execute via MCP or direct adapter"]
    Ap -->|yes| Human["Human or policy admission"] --> Exec
    Exec --> Audit["Audit receipt"]
    GW -->|"any check fails"| Deny["Recorded denial"]
```

> *The model proposes the action. The platform decides whether it is allowed.*

### Context engineering is controlled compilation

**Context engineering** is the discipline of supplying an agent with the right information, instructions, tools, history, policies, and constraints at the right time. In a factory it is a compilation step, not a copy-paste. The **context compiler** selects the smallest sufficient set of trusted directives and relevant observations for one decision. More context is not automatically better: irrelevant material burns tokens, adds conflicting cues, and can bury the governing constraint. Think of it as packing a briefing folder for one meeting rather than wheeling in the whole filing cabinet.

<!-- infographic: context-assembly -->
> **Infographic — Context assembly.** *(Jay's graphic goes here.)* Until then, the diagram below carries the same concept.

```mermaid
flowchart TB
    L1["1 Load intent, Plan, policy, identity, budgets, source state"] --> L2["2 Resolve domain terms to canonical concepts"]
    L2 --> L3["3 Select instructions, skills, workflow contracts"]
    L3 --> L4["4 Retrieve candidates within tenant, repo, sensitivity, time bounds"]
    L4 --> L5["5 Rank by authority, relevance, freshness, diversity, omission risk"]
    L5 --> L6["6 Detect duplicates, conflicts, staleness, unresolved terms"]
    L6 --> L7["7 Allocate budget: governing constraints before examples or history"]
    L7 --> L8["8 Emit ordered package: source, revision, hash, reason, trust class, truncation record"]
    L8 --> Pkg[("Context package, locked into manifest")]
```

Good context architecture keeps five categories visibly separate: **instructions** (trusted runtime directives), **authoritative context** (approved contracts, policy, identity, exact source state), **reference context** (documentation and retrieved knowledge), **working context** (transient hypotheses and scratch state), and **evidence** (observations tied to exact actions and artifacts). Retrieved text lives in the reference tier and can never promote itself into instructions or authority. [Chapter 16](./16-data-knowledge-semantic-and-context-engineering.md) covers the pipeline that feeds step four and the full retrieval contract.

### Four kinds of context, one governed input

The five trust categories say how much authority a piece of context carries. A second cut says where it comes from and how long it should live. Every item the compiler considers belongs to one of four types, and mixing them is how context windows fill with material nobody chose.

| Context type | What it holds | Lifetime | Who admits it |
|---|---|---|---|
| **Task/run context** | What this execution needs now: objective, acceptance criteria, scope, the files in play | The current step or Attempt | The compiler, from the manifest |
| **Working state** | Intermediate artifacts, hypotheses, tool results, scratch notes | The current Attempt; cleared or compacted at its end | The runtime, outside the model |
| **Enterprise retrieval** | Authoritative organizational knowledge: code, docs, tickets, decisions, policy | As fresh as the source and its permission | The retrieval pipeline, after permission and provenance checks |
| **Durable memory** | Knowledge intentionally retained across executions | Until corrected, expired, or revoked | An explicit promotion decision |

The goal for every step is the minimum high-quality set that is relevant, permission-aware, and attributable. A larger window is a larger budget, not an instruction to spend it.

> *Context is a governed input, not everything we can fit into the window.*

The fourth row is the one teams get wrong. Durable memory must be *deliberately promoted*: something enters it because an owner or a governed process decided it should, with provenance attached. If every previous model output silently becomes permanent truth, memory turns into one more source of stale and incorrect context, and a bad hypothesis from last month is retrieved next month as a fact. The admission flow in the next section is what "deliberate" means in practice.

### Memory is governed, typed, and revisable

**Memory** lets a system preserve useful information across steps or sessions: mission state, past decisions, user preferences, system knowledge, previous outcomes. **Retrieval-augmented generation (RAG)** combines model reasoning with retrieved enterprise knowledge such as documentation, tickets, code, and operational records. Both are valuable, and both become dangerous when they turn into a shadow system of record. Memory should improve future decisions; it must never rewrite operational records, which remain authoritative and which memory may only reference.

| Memory type | Useful for | Main risk | Required control |
|---|---|---|---|
| Session | Current Attempt state and scratch work | Treating a hypothesis as fact | Attempt scope and automatic expiry |
| Episodic | What happened in prior runs | Copying a past solution into a different case | Artifact links, outcome, time, similarity evidence |
| Semantic | Claims, entities, terminology, relationships | Stale or contradictory knowledge | Provenance, confidence, validity interval, contradiction links |
| Procedural | Skills, prompts, workflows, runbooks | Promoting an unsafe behavior | Evaluation, ownership, approval, versioning, rollback |

The table's rows have precise meanings. Session memory is **Working Memory**: the short-lived task and conversation state required for the current run, including intermediate artifacts and tool results, which should be cleared, compacted, or deliberately persisted when the run ends. **Episodic Memory** is the attributable record of past events and experiences, including when they occurred and which outcome followed; a prior episode is evidence about history, not a universal instruction. **Semantic Memory** holds durable facts, concepts, and relationships retrieved by meaning, and similarity there does not prove truth, freshness, permission, or authority. **Procedural Memory** is versioned reusable knowledge about how to perform a task, normally expressed as a skill, workflow, runbook, or instruction set, and it must be evaluated and lifecycle governed. Cutting across the semantic row is **Temporal Memory**: time-aware facts and relationships that preserve when a claim was valid and how it changed, so that a current answer does not silently combine incompatible historical states.

A safe memory lifecycle is a write-admission flow, and memory quality depends far more on it than on vector search quality.

<!-- infographic: memory-admission -->
> **Infographic — Memory write admission.** *(Jay's graphic goes here.)* Until then, the diagram below carries the same concept.

```mermaid
stateDiagram-v2
    [*] --> Observed
    Observed --> Quarantined: candidate written
    Quarantined --> Classified: type, scope, sensitivity
    Classified --> Evaluated: evidence, similarity, contradiction check
    Evaluated --> Approved: owner approves
    Evaluated --> Rejected
    Approved --> Published
    Published --> Retrieved: filtered by identity and authority
    Published --> Corrected: new evidence
    Corrected --> Published
    Published --> Expired: validity interval passes
    Published --> Revoked: source revoked or permission changed
    Expired --> [*]
    Revoked --> [*]
    Rejected --> [*]
```

Every write retains source, scope, time, confidence, sensitivity, owner, lifecycle state, and the evidence that supported promotion. Retrieval filters by the current identity and authority, returns citations and a "why retrieved" reason, and exposes contradictions instead of silently picking a winner. Deletion, correction, expiry, tenant isolation, and permission changes are first-class lifecycle events: a **correction** links the old claim to the new one and to the evidence that changed it, so a reader can see the history rather than a rewritten past.

### Use multiple agents only for a measurable reason

Add another agent when independent verification, parallelism, context isolation, or specialized expertise produces a measurable gain, never to imitate an organization chart. Every hand-off needs an explicit input contract, output schema, authority, budget, termination condition, and owner. Shared durable state belongs in the runtime, not in private message history. Independent validation needs a separate evidence path, different incentives or tools where appropriate, and protection against correlated failure; a different persona name is not independence. And evaluate the complete configuration and workflow, because a model benchmark cannot show whether context selection, tool policy, memory, recovery, or coordination works. [Chapter 18](./18-agent-and-loop-engineering.md) develops the patterns.

## How to build it

Prefer deterministic code for schema validation, parsing, hashing, routing rules, state transitions, policy enforcement, and admission gates. Use the model for ambiguous interpretation, planning, comparison, and generation. Then assemble the runtime in this order.

1. Resolve the WorkOrder and Plan into a frozen execution manifest covering identity, instructions, model profile, tool grants, MCP connections, context lock, memory view, policy, budgets, and evaluation profile, and store its digest with the Attempt.
2. Establish only approved tool and MCP connections, with least privilege, under a signed connection contract; pin protocol version, transport, server identity, and negotiated capabilities.
3. Register each tool with the full behavioral contract above, classify its side effects, and decide its approval behavior by risk class before any agent can call it.
4. Compile a provenance-rich context package with the eight-step algorithm; keep the five trust categories separate; record truncation.
5. Build the authorized memory view from a snapshot filtered by tenant, identity, scope, and lifecycle state.
6. Run the execution loop inside the policy gateway with cancellation and recovery; record every proposed call, approval, denial, result envelope, and receipt.
7. Produce artifacts, trace, checkpoints, receipts, and denials on an independent evidence path that points back to the manifest.
8. Admit delivery only through policy and human authority.
9. Route candidate memories through quarantine, classification, evaluation, approval, and publication, with correction, expiry, and revocation wired in from the first day.

Before shipping, weigh the choices that shape the composition.

| Choice | Benefit | Cost or risk | Use when |
|---|---|---|---|
| One general agent | Simple operations, fewer hand-offs | Broad context and authority; harder diagnosis | Task is bounded and tools are low risk |
| Specialized agents | Context isolation and focused expertise | Coordination cost and hand-off loss | Specialization gives a measured quality or latency gain |
| Direct tool adapters | Tight control, simple debugging | Provider-specific integration | Capability surface is small and stable |
| MCP adapters | Interoperability, reusable discovery | Extra server, session, identity, and egress boundaries | Multiple hosts or providers need a common protocol |
| Retrieval-only context | Current, targeted information | Retrieval error, missing authority | Sources are indexed, versioned, evaluable |
| Long-term memory | Continuity and compounding knowledge | Staleness, leakage, poisoning, hidden coupling | Write admission and correction lifecycle are governed |
| Knowledge graph | Relationship traversal and lineage | Ingestion and consistency complexity | Queries need graph structure and provenance |

Finally, secure the data path. Model inputs and outputs carry source code, credentials, personal or regulated data, and proprietary context, so define allowed providers, regions, retention, training and data-use terms, redaction, encryption, and logging. Embeddings and caches inherit the sensitivity of their sources, and bias and safety evaluation must match the real users, languages, repositories, and decisions affected.

## Failure modes

The recurring anti-patterns are granting every discovered MCP tool, treating tool annotations as trusted policy, passing full conversation history to every server, retrying consequential tools without idempotency, storing every agent message as memory, and adding agents to compensate for an undefined workflow. Beneath those sit the runtime failures an architect must plan for.

| Failure | Detection | Correct response |
|---|---|---|
| Context limit hit | Compiler truncation record | Recompile with explicit allocation; never silently drop governing content |
| Invalid structured output | Schema validation | Bounded schema repair, or fail with the original response retained |
| Provider unavailable | Health probe, error class | Approved equivalent fallback or explicit pause; record the changed profile |
| Quality drift | Slice evaluation, outcome trend | Restrict the profile, route to the previous version, investigate by slice |
| Cost spike | Budget telemetry | Admission and budget control; never bypass safety validation to save tokens |
| Suspected data leakage | Egress monitor, receipt anomaly | Contain, revoke credentials, preserve evidence, notify data and security owners |
| Nonconverging loop | Attempt and improvement budget | Stop on budget and escalate |
| Injected instruction in reference context | Gateway denial, trust-class audit | Record the attempt and denial; the content never gains authority |
| Tool retry duplicates a side effect | Receipt mismatch | Idempotency key per consequential call; mark the tool non-retryable until fixed |
| Memory contradiction | Contradiction link | Surface both claims with provenance; owner resolves; never auto-merge |
| Tool grant wider than the task | Registry audit; call to a resource outside WorkOrder scope | Scope grants per WorkOrder; deny at the gateway; review the agent definition |
| Silent memory promotion | Prior outputs retrieved as fact with no promotion record | Require an explicit promotion decision with provenance; quarantine the unpromoted entries |
| MCP adopted where a direct call was cheaper | Latency and hop cost dominate a stable internal service | Re-decide on reuse, interoperability, governance, latency, and cost; keep the gateway either way |

Catch these before production by evaluating complete configurations (model, prompt, tools, context, harness, environment, policy, evaluator) with representative cases, deterministic checks, calibrated graders, repeated trials, confidence intervals, adversarial cases, and outcome slices. A high average can hide a catastrophic failure in a critical slice; no single score establishes truth, so retain disagreements, uncertainty, and counterevidence, and promote only on predefined improvement and non-regression criteria. When something does go wrong, the incident framework in [chapter 29](../05-operate/29-resilience-incidents-and-the-control-tower.md) asks which layer failed: intent, context, model, tool, state, policy, or evaluation. The separation of components in this chapter is what makes that question answerable.

## In Mission Control

At commit [`b31e275`](https://github.com/jaydubya818/MissionControl/tree/b31e27564deb1c03c167e61b5ee094567c2ba7b1), Mission Control contains agent-platform components at different levels of maturity. This describes that pinned commit only.

**Implemented.** Agent templates, versions, instances, and identities give versioned registry records; the older agent model also stores role, allowed task types and tools, budgets, status, and heartbeats. A context router combines deterministic rules, classification, confidence, capacity, and budget to choose clarification, deferral, a single Task, or coordinator decomposition. The Context Registry supports versioned packages, semantic version ranges, repository manifests, lock files, published content hashes, installation records, verifiers, and idempotent activation receipts; executor-facing activation rejects unpublished or hash-mismatched content and links the locked package set to a WorkflowRun. That is a real example of compiling context rather than copying prompt text. Tool calls are recorded with risk policy applied, and the executor adapter freezes repository root, allowed paths, isolation, timeout, and model. Provider packages implement structured tool-call formats.

**Partial.** Memory. `packages/memory` implements session, project, and global in-memory abstractions; Convex records run episodes and execution traces and can consolidate batches into knowledge-graph nodes. The GraphRAG proposal itself lists what is missing: provenance, contradiction handling, permission-aware retrieval, ingestion checkpoints, evaluation, and a correction lifecycle. The live audit described an empty operational graph, so the proposal is not a production memory system.

**Future.** MCP is adjacent rather than a governed subsystem. Product documents and plugin guidance describe MCP integrations, but the commit does not show a first-class server registry, connection policy, capability lifecycle, or end-to-end execution through MCP. A per-Attempt manifest digest covering all eleven components is also still to be built.

## Retain this

- An agent is a versioned composition of identity, objective, instructions, model profile, tools, context, memory view, policy, budgets, state, and evaluation profile, not a model with a long prompt.
- The loop is understand → plan → act → observe → evaluate → adjust; the loop chooses the next action, the workflow owns progress and authority.
- The model proposes; only the runtime authorizes. Tool results return as untrusted observations, and both approvals and denials are recorded.
- Freeze an execution manifest before the first model call; every event and piece of evidence points back to it.
- MCP standardizes host, client, server, session, transport, and six primitives. Capability negotiation proves compatibility, never trust, safety, or authorization. Govern the connection: identity, audience-bound tokens, scopes, allowlist, egress, receipts, revocation.
- A tool contract covers schemas, identity, scope, side-effect class, idempotency, timeout, retry, rate limit, approval behavior, result envelope, receipt, and version. Protocol errors and execution errors stay distinct.
- MCP solves the N×M interoperability problem and nothing else: it standardizes connectivity and does not outsource governance. Choosing MCP over a direct call is an interoperability decision, not a religion.
- The moment a model gets a tool, intelligence becomes authority. Every capability sits behind a governed registry that answers what, who, on whose behalf, which resources, valid arguments, risk class, approval, and evidence; grants are scoped to the task; identity, authorization, validation, scope, rate limits, timeouts, audit, and approval are enforced outside the model.
- Context is a governed input, not everything we can fit into the window. Keep task/run context, working state, enterprise retrieval, and durable memory distinct, and promote to durable memory deliberately.
- Context is compiled in eight steps into five separate trust categories; memory is admitted through quarantine, evaluation, and approval, and corrected, expired, or revoked as first-class events.
- Add agents only for a measurable gain, and evaluate the whole configuration, never the model alone.
- Traceability works only when records share stable Attempt, manifest, artifact, and policy identifiers; a small governed agent is safer and easier to improve than one whose tools, memory, and context keep expanding.

## Go deeper

- Related chapters: [12. Durable execution](./12-durable-execution.md) for the workflow around the loop; [13. Coding harnesses and agent protocols](./13-coding-harnesses-and-agent-protocols.md) for where MCP sits beside ACP and AG-UI; [16. Data, knowledge, semantic, and context engineering](./16-data-knowledge-semantic-and-context-engineering.md) for the retrieval pipeline; [17. Models](./17-models-routing-and-capability-selection.md) for routing; [18. Agent and loop engineering](./18-agent-and-loop-engineering.md) for multi-agent patterns; [26. Security](../04-prove/26-security.md) for injection and tool poisoning; [33. Governed learning](../06-improve/33-governed-learning-and-compounding-engineering.md) for memory promotion.
- MCP `2025-11-25` baseline: [specification](https://modelcontextprotocol.io/specification/2025-11-25), [architecture](https://modelcontextprotocol.io/specification/2025-11-25/architecture), [lifecycle and capability negotiation](https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle), [transports](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports), [authorization](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization), [tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools), [resources](https://modelcontextprotocol.io/specification/2025-11-25/server/resources), [prompts](https://modelcontextprotocol.io/specification/2025-11-25/server/prompts), [sampling](https://modelcontextprotocol.io/specification/2025-11-25/client/sampling), [elicitation](https://modelcontextprotocol.io/specification/2025-11-25/client/elicitation), [tasks (experimental)](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/tasks), [changelog](https://modelcontextprotocol.io/specification/2025-11-25/changelog).
- Mission Control at `b31e275`: [agent identities](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/convex/registry/agentIdentities.ts), [agent versions](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/convex/registry/agentVersions.ts), [context manifests](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/convex/context/manifests.ts), [context activation](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/convex/context/activation.ts), [context router](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/packages/context-router/src/router.ts), [memory lifecycle](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/convex/memoryLifecycle.ts), [graph-assisted memory proposal](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/docs/plans/memory-graphrag-architecture.md), [plugin and MCP guidance](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/docs/CREATING_PLUGINS.md).
- Sources: Jay West, "Key terms and definitions" capability taxonomy (execution loop, agent definitions, harness terms); Jay West, factory architecture notes (the four context types, the governed tool registry, MCP versus direct calls); the AI Software Factory study guide, chapter 6 terminology; the agent platform technology glossary (MCP, FastMCP, durable context patterns); the "Factory in one line" notes on harness ownership and the incident layer list.
- [Glossary](../appendix/glossary.md).
