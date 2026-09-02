---
title: "Security: identity, secrets, threats, and supply chain"
part: prove
chapter: 26
summary: How to give every factory action an authenticated principal, scoped authority, isolated execution, bounded data access, and immutable evidence; how to threat-model agents that read hostile content and act through tools; and how to prove what was built, by whom, from what.
absorbs: [08-security-and-governance/02-security-and-identity-architecture.md, 08-security-and-governance/03-software-supply-chain-security-provenance-and-attestation.md, 08-security-and-governance/04-agentic-threat-model-and-adversarial-defense.md, 08-security-and-governance/05-workload-identity-secrets-privacy-and-compliance.md]
infographics: [threat-model, identity-and-secrets-flow, supply-chain-attestation]
---

# 26. Security: identity, secrets, threats, and supply chain

An AI Software Factory connects human intent to code, credentials, repositories, tools, models, and delivery systems, and it puts a probabilistic interpreter in the middle that reads whatever it is shown and acts on what it reads. This chapter is about keeping that arrangement safe: who may act, with what authority, on which data, inside what isolation, leaving what evidence. It covers identity and delegation, secrets and privacy, the agent-specific threat model, and the software supply chain that proves what was built. After reading it you should be able to name the principals in your factory, explain why prompt injection is an authority problem rather than a text problem, and say what a signed attestation proves and what it does not.

## The problem

A confused identity boundary can let a browser pretend to be an agent, a service inherit human authority, or a repository credential become general permission to change software. The security goal is not to make agents trusted. It is to ensure that every action has an authenticated principal, explicitly scoped authority, isolated execution, bounded data access, and immutable evidence.

That is harder than it sounds because the factory has many principals with different lifecycles and risk: humans, orchestration services, executor workers, agent instances, GitHub Apps, webhooks, schedulers, and external tools. A human session is interactive; a service runs overnight; an installation token belongs to one provider boundary; an agent version describes behavior but is not itself a credential. Agent work too often inherits broad developer credentials or shared service tokens, and an audit trail that identifies only "the agent" cannot establish accountability.

Then there is content. An agent reads code, issues, documentation, tool output, logs, websites, and messages, any of which may contain adversarial instructions, and it may then use credentials and tools across several steps. Natural-language channels mix intent, data, and control. Tool descriptions and schemas influence model behavior. Retrieved context and memory cross trust zones. Agents delegate to other agents, execute generated code, and can combine individually permitted actions into an unsafe sequence. Traditional input validation does not fully address an interpreter that treats data as possible instruction and adapts its plan after every observation; deny-list defenses are brittle against probabilistic reasoning.

Then there is the supply chain. Passing tests does not establish what was built, from which source, by which identity, with which dependencies, or whether the artifact later changed. An autonomous factory expands that chain: models, prompts, tools, MCP servers, runners, base images, package registries, CI systems, and publication credentials all become substitution or tampering points. Names and mutable tags are weak identities; logs are easy to lose or rewrite; a signature proves a key signed bytes, not that the signer was authorized or the build isolated; an SBOM inventories components without proving those components produced the shipped binary.

And there is data. Logs, prompts, context packages, model providers, artifacts, and evaluations copy sensitive information into systems with different retention and residency. Generated code may incorporate untracked licensed material. Legal obligations depend on purpose, jurisdiction, customer agreement, and information class.

Jay's security thesis compresses the whole response into one sentence:

> An agent should receive the minimum context, tools, permissions, time, and budget required for the task, and every consequential action should produce evidence.

## How it works

### The threat model

Start with what must be protected: source, secrets, customer data, credentials, artifacts, evidence, policy, registry entries, memory, and human attention. Then mark the trust boundaries the agent crosses: user input, repository content, retrieved knowledge, MCP servers, agent peers, models, sandboxes, the control plane, and external systems.

Security design starts with the threat model, not with a control catalog, because a control that does not map to a threat is either decoration or friction. The threats a factory must prepare for, merging Jay's list with the agentic abuse cases:

- **Prompt injection** and **goal hijacking**: instruction hijacking through direct or indirect injected text, up to and including replacing the task's objective with the attacker's while the agent still believes it is doing the assigned work.
- **Malicious repository content** and **poisoned context**: files, issues, documentation, or retrieved knowledge crafted to steer the agent.
- **Data and secret exfiltration**: credentials or sensitive data leaving through prompts, logs, outputs, artifacts, encoded channels, or side channels.
- **Tool abuse** and **MCP tool poisoning**: a legitimate tool driven to an illegitimate end; malicious tool descriptions, schema manipulation, or poisoned tool output.
- **Privilege escalation** and **privilege abuse**: identity, credential, or tenant-boundary abuse, and the misuse of a grant the agent legitimately holds for an action the grant was never meant to cover; **excessive agency**, where the agent has been given more authority, tools, or autonomy than the task requires, so a mistake or a hijack has more to reach; and unsafe action composition.
- **Unauthorized file changes** and **cross-repository access**: edits outside the WorkOrder's path scope, including to tests, CI, or policy; reads or writes to repositories the task was never scoped to.
- **Unsafe code execution** and **sandbox escape**: generated or retrieved code run without containment; unexpected execution reaching the host or network.
- **Human-approval bypass**: approval deception, evaluator manipulation, or evidence tampering that makes a gate look satisfied.
- **Supply-chain compromise**: of agents, skills, prompts, models, packages, tools, builders, or registries.
- **Cross-organization data leakage**: context, memory, or retrieval crossing tenant or product-line boundaries.
- **Runaway loops and token spending**: denial of service, denial of wallet, and retry amplification.
- **Inter-agent impersonation** and misplaced **inter-agent trust**: delegation confusion and authority laundering between peers, and the assumption that a message from another agent carries that agent's authority when it carries only its content.
- **Memory poisoning** and retrieval poisoning: an attack that persists in durable memory beyond the run that introduced it.

<!-- infographic: threat-model -->
> **Infographic — Trust boundaries and threats.** *(Jay's graphic goes here.)* Until then, the diagram below carries the same concept.

```mermaid
flowchart LR
    subgraph Untrusted["Untrusted content"]
        Repo["Repository files, issues"]
        Web["Web pages, docs"]
        ToolOut["Tool / MCP output"]
        Mem["Memory, retrieval"]
        Feedback["Raw user feedback"]
    end
    subgraph Trusted["Deterministic control plane"]
        Policy["Policy + scope"]
        Identity["Principal chain"]
        Budget["Time, token, cost budget"]
    end
    Untrusted -->|"data only"| Agent["Agent in sandbox"]
    Trusted -->|"authority"| Agent
    Agent -->|"typed, scoped calls"| Tools["Tools, credentials"]
    Tools --> Effects["Repos, deploys, external systems"]
    Agent -->|"events, artifacts"| Evidence["Immutable evidence"]
    Tools --> Evidence
    Repo -.->|"injection"| Agent
    ToolOut -.->|"poisoning"| Agent
    Mem -.->|"persistence"| Agent
    Agent -.->|"escalation, exfiltration"| Effects
```

Prompt injection is not merely a text-filtering problem. It is an authority-confusion problem whose impact depends on the tools, identity, memory, and control system surrounding the model. The variant that matters most in a factory is **indirect prompt injection**: adversarial instructions embedded in content the agent retrieves or observes (a README, an issue comment, a web page, a tool result) rather than supplied as the direct user request. Untrusted content cannot grant authority or alter policy, however imperative its phrasing, and the runtime is what enforces that.

### Controls that live outside the model

The threat model shares one assumption across every entry: the model will sometimes be wrong, and what it reads will sometimes be hostile. The design response is to place every control that matters where the model cannot reach it. Enforced outside the model, per run:

| Control | What it guarantees |
| --- | --- |
| Workload identity per run | Every action is attributable to one Attempt, not to "the agent" |
| Least-privilege tools | The tool profile grants only the capabilities this task needs |
| Scoped repository and resource access | The run can touch these repositories, paths, and resources and no others |
| Isolated execution environment | Mistakes and escapes are contained |
| Short-lived credentials | A leaked token is worthless minutes later |
| Controlled network egress | Exfiltration has nowhere to go |
| Typed, validated tool calls | Arguments are checked before any effect |
| Retrieved content treated as untrusted | Data cannot become instruction |
| Policy gates | Consequential actions are authorized deterministically |
| Evidence and audit | Every consequential action leaves a record |
| Risk-based human authority | Blast radius, not confidence, decides when a person must approve |

None of these depends on the model behaving well. That is the point. A model reasons probabilistically, and a reasoning process that is right most of the time is still the wrong place to put an authorization decision. *Probabilistic reasoning should never imply probabilistic authorization.* The model may want to run a command, open a file, or call an API; whether that happens is decided by identity, scope, and policy in a system that does not reason at all. *The model proposes. Policy authorizes.*

Security, in other words, cannot be a review that happens after the work is done. By then the run has already had whatever access it had. *Security can't be an approval meeting at the end; it's part of the execution contract.*

### Authenticate the principal, authorize the action, attest the execution

Three questions, answered by three different mechanisms. **Authentication** proves who or what is calling. **Authorization** proves the principal may perform a bounded action. **Attestation** proves which software, configuration, context, and environment actually performed it.

```mermaid
flowchart LR
    Principal["Human, service, agent, or integration"] --> AuthN["Authenticate identity"]
    AuthN --> AuthZ["Authorize scoped action"]
    AuthZ --> Policy["Evaluate policy and approval"]
    Policy --> Execute["Isolated execution"]
    Execute --> Audit["Attestation, lineage, and audit"]
```

Keep the principal types separate. A **human identity** owns accountable decisions. A **service identity** performs named machine capabilities. An **agent identity** links behavior, version, and provenance. An **executor identity** owns one runtime process or claim. A **provider identity**, such as a GitHub App installation, crosses one external trust boundary. Do not create fake human users for automation, and do not reuse one omnipotent "system" role. Delegation should preserve the human or policy authority that initiated it without giving the delegate every right of the delegator.

Think of a hospital: the attending physician signs the order, the nurse administers it under that order, the pharmacy dispenses against it, and each badge opens only the doors that role needs. Nobody borrows the physician's badge to save time, and the chart records who did what under whose authority.

### Least privilege in several dimensions

Scope authority by company, workspace, repository, environment, resource, action, path, tool, time, budget, and Attempt. Credentials should be short-lived and minted only after policy and readiness checks pass. A provider grant stronger than required is a readiness failure, not a convenience: excessive GitHub permission should block the repository from being used at all.

The mechanism is **workload identity**: the running worker receives a cryptographically verifiable identity of its own (SPIFFE is the reference model) and exchanges it for attempt-scoped credentials to exact resources and operations. Separate read, modify, publish, merge, deploy, approve, and administer permissions. Tokens expire, cannot be reused across tenants, and are revoked on cancellation or quarantine. Identity is not authority; the credential is the authority, and it is narrow and brief.

Every action is then bound to an **identity chain**: the accountable human or system owner, the authorized WorkOrder, the orchestration service, the worker's workload identity, the agent and capability versions, the tool credential, and any external actor. The useful audit question is not "which agent did this?" It is "which accountable chain delegated which exact authority to which workload, using which credential, for which subject and purpose?"

<!-- infographic: identity-and-secrets-flow -->
> **Infographic — Identity chain and secret delivery.** *(Jay's graphic goes here.)* Until then, the diagram below carries the same concept.

```mermaid
sequenceDiagram
    participant H as Human approver
    participant CP as Control plane
    participant O as Orchestrator (service identity)
    participant W as Worker (workload identity)
    participant V as Secret / token issuer
    participant G as GitHub App
    H->>CP: Approve Plan / WorkOrder
    CP->>O: Signed dispatch (capability, scope, expiry, digest)
    O->>W: Claim Attempt (manifest, path scope, budget)
    W->>V: Present workload identity
    V-->>W: Attempt-scoped, short-lived token
    W->>G: Scoped call (contents write, PR write)
    G-->>CP: Signed webhook (delivery GUID)
    CP->>CP: Verify, dedupe, reconcile, audit
    Note over W,V: Secret never enters prompt, log, or artifact
```

### Content is not authority

Repository files, issues, web pages, MCP resources, tool results, logs, and memory are data. They cannot grant permission, alter the WorkOrder, disable policy, or approve a side effect. The deterministic control plane calculates authorized actions from identity, scope, policy, and current state; the model proposes, the control plane decides.

The runtime should label external content as data, constrain its size and format, strip active content where possible, scan it for secrets, and prevent it from changing system instructions or tool policy. Tool responses are validated before they enter context or authoritative state.

### Prompt injection is contained, not solved

No prompt wording solves injection. The working assumption is that anything the agent retrieves — tickets, documentation, source code, comments, web pages — may be hostile, and the design goal is to make a successful injection cheap rather than to make injection impossible. That follows from one rule: **content cannot grant authority.** A malicious document can influence what the model *wants* to do. It cannot expand the tool permissions, the repository scope, the credentials, the identity, or the network access of the run, because none of those live inside the model where the document can reach them.

Four practices make the rule hold in practice. Separate instructions from retrieved data, so the model can tell which channel it is reading from and the runtime can enforce precedence. Annotate provenance on every piece of content so its trust level travels with it. Constrain the tools a run may call to what its task needs. Validate high-risk actions deterministically before they execute, regardless of how confident the model sounds about them.

The measure of success is what an injection costs the organization. In a factory built this way, an injected instruction that the model follows produces a failed or wasted run — the agent tried to do something out of scope, the runtime refused, the Attempt is marked and the evidence retained. It does not produce a security incident, because the agent never held the authority to cause one. *The agent's permissions should never expand because of something it reads.*

The trust level of an input should decide the isolation level of what runs on it. The HumanLayer and BAML teams describe the reasoning plainly in their software-factory discussion: raw feedback from a user is completely untrustworthy, so it is never executed; their own prompts turn that feedback into a reproduction case, and the reproduction is something they trust, so it can run directly on their machines without a hardened container. Whether you accept that specific choice or not, the method is right. Ask where the bytes came from, what transformed them, and who vouches for the transformation, and set the sandbox accordingly. [Chapter 14](../03-build/14-development-environments-sandboxes-and-compute.md) covers the isolation options; [Chapter 32](../06-improve/32-production-feedback-review-and-the-agentic-merge-queue.md) covers the feedback-to-repro pipeline.

### Constrain tools at execution time

Tools are privilege boundaries. Use typed schemas, allowlists, resource scoping, short-lived credentials, network policy, filesystem isolation, output validation, side-effect classification, confirmation for material actions, and independent event capture. A tool that can do anything is a credential that can do anything, whatever the prompt says.

Around the model's decisions, add defense in depth: content provenance, trust labeling, context segmentation, instruction precedence, least privilege, sandboxing, policy checks, budgets, anomaly detection, independent verification, and human authority. A model-based guardrail may add signal; it is never the sole enforcement boundary.

Memory changes incident scope. An injected instruction that lands in durable memory or a retrieval index persists beyond the run that introduced it and can affect every future run that reads it. Memory writes need the same provenance labeling as any other content, and quarantine must be able to reach them. [Chapter 16](../03-build/16-data-knowledge-semantic-and-context-engineering.md) covers the knowledge side.

### The execution environment is a security boundary

Where a run executes matters as much as what it may call. Each run gets a bounded, reproducible environment whose properties are frozen in the execution manifest before the worker starts:

| Field | What it fixes |
| --- | --- |
| Repository revision | The exact commit the run operates on |
| Approved tools | The tool set admitted for this run |
| Scoped credentials | Attempt-scoped tokens naming exact resources |
| Filesystem boundaries | Which paths may be read and which written |
| Network policy | Which egress, if any, is allowed |
| Dependencies | Pinned versions the run may install or use |
| Resource limits | CPU, memory, disk, and concurrency caps |
| Timeouts | When the run is stopped regardless of progress |
| Auditing | What is recorded and where it goes |

The environment does four jobs at once. Isolation is the security job. Reproducibility is what lets a verifier or an investigator rerun what happened. Containment limits what a mistake can reach. Consistency with downstream delivery means the run's environment matches the one the change will be built and deployed in, so "works in the sandbox" is evidence rather than folklore. The discipline is to treat autonomous execution like running untrusted code, because that is what it is: no ambient laptop access, no inherited developer credentials, no reaching whatever the host can reach.

The environment also has to be fast. If provisioning takes long enough that the safe path feels bureaucratic, people route around it, and the unsafe path becomes the real one. *Fast prototyping and strong guardrails aren't opposites if the guardrails are built into the environment.* More autonomy should mean narrower execution boundaries, not broader ambient access. [Chapter 14](../03-build/14-development-environments-sandboxes-and-compute.md) covers the mechanics.

### Data classification is frozen into the contract

Not all data a run touches carries the same consequence, and the run should know which kind it is holding before it starts. Classify at four levels — **PUBLIC**, **INTERNAL**, **CONFIDENTIAL**, **RESTRICTED** — and freeze the classification of the run's inputs and permitted outputs into the execution contract alongside its repository scope, capability set, policy, and budget. The classification then governs which models are eligible (a provider approved for INTERNAL data may not see CONFIDENTIAL), which retrieval sources may be assembled into context, where logs and artifacts may be stored, and what egress is allowed. A run bound to RESTRICTED data does not get to discover, halfway through, that a convenient tool would send that data somewhere else; the binding was decided before the model reasoned about anything. Model eligibility by data class is one input to routing in [Chapter 17](../03-build/17-models-routing-and-capability-selection.md).

### Secrets stay out of context and evidence

Secrets enter only the process that needs them, for the shortest useful time, through controlled channels directly to the tool or process. They must not appear in prompts unless unavoidable, nor in structured events, artifacts, screenshots, error messages, diffs, model output, memory, or audit payloads. Audit records the secret's identity or version, never its value. Scan and redact as a second line, but rely first on an architecture that keeps the secret from ever being where the model can see it.

### Revocation, compromise, and denials

Disabling a human, service, agent version, MCP server, repository installation, or policy must stop new authority promptly. Active executions need explicit revocation semantics: cancel, quarantine, rotate credentials, reconcile effects, and retain the incident trail.

Audit denials as well as successes. A denial can reveal an attack, drift, misconfiguration, or a healthy control doing its job. Each audit record carries principal, capability, scope, decision, policy version, time, reason, and correlation identity, without retaining sensitive payloads.

### The supply chain: bind every claim to immutable subjects

Evidence must identify source and artifacts by cryptographic digest. Names locate an object; digests establish which bytes a claim concerns. The minimum lineage runs the length of the factory:

`approved Plan digest -> WorkOrder revision -> execution manifest digest -> source/base SHA -> Attempt -> commit SHA -> build artifact digest -> deployment digest`

Four words that are often used interchangeably mean different things. **Provenance** describes how an artifact was produced: builder, inputs, invocation, environment, outputs. **Attestation** is a typed claim by an identified producer about one or more digest-bound subjects. **Signature** provides integrity and signer authentication for the attestation envelope. **Transparency** makes equivocation or deletion detectable by recording verifiable entries in a log. None is a quality verdict. A perfectly signed vulnerable build remains vulnerable. Provenance answers "how did these bytes come to exist?"; quality evidence answers "why are these bytes acceptable?"; both are required.

<!-- infographic: supply-chain-attestation -->
> **Infographic — Lineage from Plan to deployed digest.** *(Jay's graphic goes here.)* Until then, the diagram below carries the same concept.

```mermaid
flowchart LR
    Plan["Approved Plan digest"] --> WO["WorkOrder revision"]
    WO --> Manifest["Execution manifest digest"]
    Manifest --> Base["Source / base SHA"]
    Base --> Attempt["Attempt"]
    Attempt --> Commit["Commit SHA"]
    Commit --> Build["Isolated builder"]
    Build --> Art["Artifact digest"]
    Build --> Prov["SLSA provenance (in-toto, DSSE)"]
    Build --> SBOM["SBOM (SPDX / CycloneDX)"]
    Prov --> Verify["Verification gate"]
    SBOM --> Verify
    Art --> Verify
    Verify --> Deploy["Deployment digest"]
    Prov -.-> Log["Transparency log"]
```

Adopt interoperable envelopes rather than inventing formats. SLSA 1.2 defines build provenance and graduated build and source assurance; its build track progresses from available provenance, to signed hosted builds, to hardened isolated builds. The in-toto Statement v1 supplies a common `subject` plus `predicateType` envelope. DSSE signs typed payloads without requiring JSON canonicalization. Store a normalized evidence envelope while preserving the original attestation bytes and media type, so policy is not coupled to one vendor or schema version:

```yaml
evidence_envelope:
  subject:
    name: ghcr.io/example/service
    digest: {sha256: "..."}
  predicate_type: https://slsa.dev/provenance/v1
  producer:
    identity: github-actions://example/service/.github/workflows/build.yml@refs/heads/main
  source_digest: "..."
  work_order_revision: WO-42-R2
  issued_at: "..."
  storage_ref: "..."
  verification:
    signature_status: VERIFIED
    identity_policy: SATISFIED
    transparency_status: VERIFIED
```

Generate an **SBOM** for each releasable artifact, not once per repository. Include direct and transitive components, versions, package URLs, hashes, dependency relationships, licenses, and creation metadata. SPDX 3.0 and CycloneDX 1.7 are the current interoperable choices; select one canonical organizational format but ingest both. An SBOM becomes operational only when policy correlates it with vulnerability intelligence, approved licenses, package-source policy, end-of-life data, and exceptions. A changed dependency graph changes risk and may invalidate prior security evidence.

Harden the builder and the publication boundary: ephemeral isolated builders with minimal permissions, pinned actions and dependencies, short-lived workload identities, protected source, hermetic or controlled inputs, secret redaction, and separate build and release authority. Sign by digest, verify before promotion, and record the expected signer identity and workflow rather than accepting "any valid signature." SLSA's central lesson is that provenance strength depends on the build platform's resistance to producer-controlled falsification. Asking the same mutable worker to generate and vouch for its own history is weak assurance.

For agent-produced work, provenance should also record the executor configuration, model and provider identifier, tool and MCP server versions, policy bundle, context sources, and prompt or instruction digest where retention policy permits. Prompts, tools, and models are dependencies. Do not store secrets or unrestricted prompt content in public attestations; the goal is reproducibility and accountability, not disclosure of sensitive reasoning.

### Privacy, information lifecycle, and compliance

Classify source, prompts, context, telemetry, artifacts, evidence, memory, and backups. For each class define allowed purpose, provider, region, encryption, access, retention, deletion, legal hold, and incident handling. Deletion workflows must reach derived indexes and backups while preserving required audit evidence lawfully.

Track intellectual-property and license provenance for dependencies, training or reference material where applicable, generated artifacts, copied snippets, and capability packages. Policy decides acceptable licenses and attribution; similarity or provenance concerns create review, not automatic acceptance.

Policy-as-code enforces repeatable rules, but control ownership, rationale, exceptions, sampling, and audit artifacts remain explicit. Compliance frameworks are mappings over operating controls; they do not replace the threat model.

### Test adversarially and retain forensics

Evaluation suites should include malicious repositories, poisoned documentation, deceptive tool output, encoded exfiltration, chained low-risk actions, cross-tenant requests, compromised peers, and evaluator attacks. Preserve prompts (subject to privacy policy), tool events, identities, decisions, artifacts, and containment actions. Runtime policy should detect suspicious action sequences, quarantine affected memory or capabilities, revoke credentials, stop new admission, and create a forensic evidence bundle. Restoring a quarantined capability requires proof that the poisoned source and its persistence path were removed, not just that the symptom stopped.

## How to build it

### Identity and delegation

1. Enumerate principals: human, service, agent, executor, provider. Give each its own credential class and lifecycle.
2. Bind humans to exact subject identifiers from the identity provider, never email addresses.
3. Sign service commands with a distinct secret; include service identity, named capability, workspace, repository, command ID, short expiry, and payload digest. Retain accepted, denied, failed, and replayed command receipts.
4. Use provider Apps with exact least-privilege grants; treat missing, excessive, stale, or revoked authority as a readiness failure.
5. Verify webhook signatures against the raw body and deduplicate by delivery GUID.
6. Record the full identity chain on every Attempt, plus credential class, policy snapshot, sandbox attestation, tool and MCP grants, network policy, and secret-version references.

### Credential flow

1. Issue a workload identity to each worker.
2. Exchange it, after policy and readiness checks, for attempt-scoped tokens naming exact resources and operations.
3. Separate read, modify, publish, merge, deploy, approve, and administer.
4. Expire quickly; forbid cross-tenant reuse; revoke on cancellation or quarantine.

### Content and tool handling

- Label every external input with its source and trust level; keep it out of the instruction channel.
- Constrain size and format; strip active content; scan for secrets.
- Give each WorkOrder a tool profile: typed schemas, allowlists, resource scope, side-effect class, confirmation rules.
- Validate tool output before it enters context or state.
- Apply provenance labels to memory writes; make quarantine reach memory and retrieval.
- Set time, token, and cost budgets per Attempt with kill switches.

### The threat table

For each threat below, record the preventive, detective, containment, and recovery control, and whether each is implemented, partial, or missing:

| Threat | Primary preventive control | Primary detective control |
| --- | --- | --- |
| Prompt injection | Content labeling, instruction precedence, scoped tools | Anomalous action sequences, denied calls |
| Malicious repository content | Path scope, sandbox, no execution of untrusted content | Diff outside scope, unexpected commands |
| Secret exfiltration | Secrets bypass context; egress policy | Secret scanning of outputs, events, artifacts |
| MCP tool poisoning | Pinned, certified servers; schema validation | Tool description drift, output validation failures |
| Privilege escalation | Attempt-scoped tokens, separated permissions | Denied authorization audit |
| Unauthorized file changes | Path scope, protected assurance files | Diff review against manifest |
| Sandbox escape | Isolation proportional to input trust | Host and network anomaly signals |
| Human-approval bypass | Verifier cannot accept; fail-closed gates | Evidence lineage mismatch |
| Supply-chain compromise | Digest binding, verified provenance, SBOM policy | Failed verification at consumption |
| Cross-org data leakage | Tenant-bound credentials and retrieval | Cross-tenant request audit |
| Runaway loops / spending | Budgets, stop conditions, kill switches | Cost and retry anomaly alerts |
| Inter-agent impersonation | Per-agent identity, no authority laundering | Delegation chain validation |
| Memory poisoning | Provenance on writes | Retrieval source audit |

### Supply-chain verification at the consumption boundary

Before release, verify, in order:

1. the subject digest equals the candidate artifact;
2. attestation and predicate types are allowed and version-supported;
3. signature chain, timestamp, and transparency proof are valid;
4. signer or workload identity matches policy;
5. builder and source repository are authorized;
6. source, Plan, WorkOrder, and execution-manifest lineage match;
7. required SBOM and scan results concern the same digest; and
8. attestations are current, not revoked, and free of conflicting claims.

Order of adoption: source, commit, and build digest lineage plus one signed build attestation first; SBOM and dependency governance second; provenance as a release-blocking gate only after both are proven.

### Information governance

Build a data-flow and retention inventory covering source, prompts, context, telemetry, artifacts, evidence, memory, and backups. Attach purpose, provider, region, encryption, access, retention, deletion, legal hold, and incident handling to each class. Implement deletion that reaches derived indexes and backups. Map compliance frameworks onto these controls, with owners and exceptions named.

### Compromise playbook

Use the incident frame from [Chapter 29](../05-operate/29-resilience-incidents-and-the-control-tower.md): clarify affected builders and impact; contain by stopping unsafe execution; observe by preserving traces, events, tool calls, and evidence; isolate which layer failed (intent, context, model, tool, state, policy, evaluation); restore a known-safe version; correct the defect; prevent with regression evaluation and controls; measure whether the fix holds. Promotion of any security control requires negative tests and runtime evidence, not configuration documents alone.

## Failure modes

**Confused deputy.** A service with broad rights performs an action on behalf of a caller who lacked them. Prevent it by carrying the originating authority through delegation and scoping the delegate's credential to the caller's scope.

**Token replay and webhook forgery.** A captured command or callback is resubmitted. Short expiry, payload digests, command IDs, raw-body signature checks, and delivery deduplication close it; the replay receipt is the detection.

**Stale worker completion.** A worker whose lease expired reports success for work already reassigned. The control plane must reject completion from a non-current lease holder.

**Authority laundering.** Agent A cannot do X, asks agent B, and B can. Every delegation carries the originating scope; peers do not inherit each other's rights.

**Denial of wallet.** A loop retries or fans out until the budget is gone. Budgets, stop conditions, and cost anomaly alerts are the controls; a factory without them has an unbounded liability.

**Sandbox as justification for broad credentials.** "It is isolated" is not a reason to hand it a deploy token. No sandbox justifies broad credentials.

**Over-isolation.** Strict isolation limits useful context and tool capability until agents cannot do the work. Risk-specific tool profiles and just-in-time elevation balance capability and blast radius.

**Shared credentials.** Setup is simple; attribution and revocation are impossible. Fine-grained credentials cost integration effort and are worth it.

**Signature without identity policy.** "Any valid signature" accepts an attacker's valid signature. Record and check the expected signer and workflow.

**Keyless identity dependence.** Keyless signing removes key management and adds dependence on identity providers and trust roots; plan for their outage and compromise.

**Transparency versus confidentiality; SBOM exposure.** Public logs and component lists can reveal what you would rather not. Apply stronger controls to consequential artifacts while keeping digest binding universal.

**Long retention.** Full traces improve forensics and increase privacy exposure. Redact, encrypt, restrict, and retain by policy; minimize by default.

**Self-hosting as safety.** Self-hosting improves control and shifts security and reliability obligations to the operator.

**Policy-as-code without owners.** Rules run, but no one can explain the exception or produce the audit artifact. Control ownership stays explicit.

**Authorization inside the model.** The prompt tells the agent which actions are allowed and the runtime trusts it to comply. Detect it by asking what stops a disallowed tool call if the model decides to make one. Fix by moving identity, scope, and policy enforcement outside the model.

**Security as the last meeting.** The security review happens after the run, when the access has already been exercised. Detect it by runs whose scope, credentials, and data class were not fixed before dispatch. Fix by freezing them into the execution contract.

**Ambient access.** The worker runs on a developer machine or with inherited credentials because provisioning an isolated environment was slow. Detect it by comparing the run's actual reach with its manifest. Fix by making the isolated environment fast enough to be the default.

**Configuration documents mistaken for evidence.** A security design that exists on paper is not an enforced control. Promotion requires negative tests and runtime proof.

## In Mission Control

Assessment pinned to `main` commit [`b31e275`](https://github.com/jaydubya818/MissionControl/tree/b31e27564deb1c03c167e61b5ee094567c2ba7b1) and local HEAD `a490648`, reviewed 2026-08-09 through 2026-08-30.

**Implemented.** Mission Control deliberately separates human, service, and GitHub identities; identity separation is its strongest security design choice. Human authentication uses Clerk tokens, while Convex tenant, operator, and role records remain the source of company authorization; exact Clerk subject IDs, not email addresses, bind humans to operators. Company and workspace operations use server-side permission checks and protect the last active owner. The orchestration server authenticates inbound HTTP with a bearer token and signs outbound Convex commands with a separate HMAC secret; signed envelopes bind service identity, named capability, workspace, repository, command ID, short expiry, and payload digest, and Convex retains accepted, denied, failed, and replayed command receipts. GitHub uses an App installation rather than personal access tokens; readiness requires exact least privilege (metadata read, contents write, pull requests write, checks read, and a defined webhook set), and missing, excessive, stale, or revoked authority blocks readiness. Webhook signatures are checked against the raw body, delivery GUIDs deduplicate effects, and installation tokens are ephemeral and not retained. Repository, base, and head SHA lineage, run artifacts, verification receipts, GitHub CI ingestion, and release and deployment records exist.

**Partial.** The production Clerk issuer is a non-routable placeholder at the studied commit, so Clerk rollout has documented controls but is not configured production evidence. Named service capabilities cover WorkOrder dispatch and receipt ingestion; broad task, artifact, handoff, and other service operations remain incomplete. The security matrix is candid that company administration and some factory paths are enforced while Mission, Task, approval, remaining evidence, orchestration, and release authorization still need the complete golden-path security slice. The missing GitHub App configuration was a real blocker in the retained lab. Attempt, execution-manifest, isolated-worktree, path-scope, and GitHub App publication work (`convex/factory/attempts.ts`, `apps/orchestration-server/src/githubAppRuntime.ts`) is staged but absent from local HEAD and is treated as an implementation candidate, not current capability.

**Future.** Mission Control does not yet demonstrate a canonical SLSA provenance pipeline, SBOM generation and policy, Sigstore or in-toto verification, signed Quality Proof Packages, or a transparency-backed evidence ledger. It does not yet present a complete agentic threat catalog, adversarial test corpus, memory-poisoning lifecycle, inter-agent trust model, denial-of-wallet controls, or exercised containment and forensic playbooks. It does not yet provide workload-identity federation, a just-in-time credential flow, a delegated authorization chain, a data inventory, a deletion workflow, residency policy, intellectual-property and license controls, or formal compliance mapping. The intended direction: a unified principal and delegation model across human, service, agent, executor, and integration identities; every Attempt retaining its principal chain, credential class, policy snapshot, sandbox attestation, tool and MCP grants, network policy, and secret-version references; a supply-chain verifier that ingests native attestations, normalizes subject and producer identity, evaluates policy, and attaches the decision to the exact WorkOrder and release candidate; and a production threat model exercised against prompt injection, repository poisoning, MCP supply chain, confused deputy, cross-tenant access, token replay, webhook forgery, stale worker completion, secret exfiltration, evidence tampering, and denial of wallet.

## Retain this

- Minimum context, tools, permissions, time, and budget for the task; evidence for every consequential action.
- Authenticate the principal, authorize the action, attest the execution. Five principal types, none of them a shared "system" user.
- Identity is not authority. Authority is a short-lived, attempt-scoped credential minted after policy, and the identity chain says who delegated it.
- Content is not authority. Repository text, tool output, web pages, and memory are data; the deterministic control plane computes what is allowed. Prompt injection is an authority-confusion problem, and in a well-built factory a successful injection is a wasted run, not an incident.
- Start with the threat model; place every control outside the model. Probabilistic reasoning should never imply probabilistic authorization. The model proposes; policy authorizes.
- The execution environment is a frozen security boundary: revision, tools, credentials, filesystem, network, dependencies, limits, timeouts, auditing. Autonomy comes with narrower boundaries, not broader ambient access.
- Data classification — PUBLIC, INTERNAL, CONFIDENTIAL, RESTRICTED — is frozen into the execution contract and governs model eligibility, retrieval, storage, and egress.
- Security can't be an approval meeting at the end; it's part of the execution contract.
- The trust level of an input decides the isolation level of what runs on it: raw feedback is untrusted; a generated, vouched-for repro can be trusted.
- Tools are privilege boundaries; memory can persist an attack beyond one run.
- Secrets go to the process, never to the prompt, the log, or the evidence. Audit the secret's version, not its value. Audit denials.
- Tags locate; digests identify. Provenance, attestation, signature, and transparency are different things, and none is a quality verdict.
- Verify at the consumption boundary against an expected signer and lineage. The factory itself, including prompts, tools, and models, is part of the supply chain.

## Go deeper

**Related chapters.** [7. Governance, policy, and risk-proportional approval](../02-design/07-governance-policy-and-risk-proportional-approval.md) defines the policy the control plane evaluates. [11. Control plane, orchestrator, and execution plane](../03-build/11-control-plane-orchestrator-and-execution-plane.md) and [12. Durable execution](../03-build/12-durable-execution.md) explain leases, manifests, and claims. [14. Development environments, sandboxes, and compute](../03-build/14-development-environments-sandboxes-and-compute.md) covers isolation options. [15. Agent architecture](../03-build/15-agent-architecture.md) and [16. Data, knowledge, semantic, and context engineering](../03-build/16-data-knowledge-semantic-and-context-engineering.md) cover MCP, tools, context, and memory. [24. Quality contracts, proof packages, and certificates](./24-quality-contracts-proof-packages-and-certificates.md) uses the evidence envelope and signing model. [25. CI/CD, progressive delivery, and production verification](./25-cicd-progressive-delivery-and-production-verification.md) covers builder hardening in the delivery path. [29. Resilience, incidents, and the control tower](../05-operate/29-resilience-incidents-and-the-control-tower.md) owns the incident frame. Terms are in the [glossary](../appendix/glossary.md).

**Labs.** [Lab 5 — Agentic security attack and containment](../appendix/labs/05-agentic-security-attack-and-containment-lab.md); [Lab 12 — Knowledge poisoning, revocation, and retrieval](../appendix/labs/12-knowledge-poisoning-revocation-and-retrieval-lab.md); [Lab 13 — External capability intake and recertification](../appendix/labs/13-external-capability-intake-and-recertification-lab.md); [Lab 4 — Repository onboarding and readiness](../appendix/labs/04-repository-onboarding-and-readiness-lab.md) for the GitHub App least-privilege readiness check.

**Primary sources.** Jay's reliability-and-security preparation notes (threat list, security thesis, incident framework); HumanLayer and BAML, "Software factory design patterns" livestream (trusted versus untrusted execution of feedback and repros); OWASP Agentic Security Initiative; OWASP LLM01 Prompt Injection and LLM06 Excessive Agency; NIST AI Risk Management Framework; NIST SP 800-218 SSDF 1.1, especially provenance practice PS.3.2; NIST Privacy Framework; SLSA specification 1.2 and provenance v1; in-toto Attestation Framework, Statement v1, and DSSE; Sigstore Cosign verification guidance; SPDX 3.0; CycloneDX 1.7; SPIFFE overview and Workload API.

**Mission Control sources at `b31e275`.** `docs/security/clerk-company-authorization.md`, `docs/security/human-service-authorization-matrix.md`, `docs/security/service-command-authentication.md`, `docs/security/github-app-connection.md`, `convex/lib/companyAccess.ts`, `apps/orchestration-server/src/auth.ts`, `convex/lib/githubAppAuth.ts`, `convex/factory/githubCi.ts`, `convex/schema.ts`; staged candidates `convex/factory/attempts.ts` and `apps/orchestration-server/src/githubAppRuntime.ts`.
