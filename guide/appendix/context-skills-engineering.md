---
title: "Context and skills engineering: five operating practices"
summary: "Context as code, enforced governance, shared skills, measured evaluation, and honest playbooks."
---

# Context, skills, and evidence: five operating practices

Skills are production dependencies. Version them, evaluate them, and govern their use. These five practices connect the knowledge an agent receives to the authority it is given and the evidence it returns. They apply throughout the factory lifecycle; they are not five additional lifecycle stages.

## 01 — Context & Skills Engineering

Context engineering is the deliberate design of what an agent needs to know for a bounded task. It includes the specification of the desired outcome, project rules, domain references, tool contracts, examples, and reusable procedures. Skills engineering packages a recurring procedure so it can be selected, applied, tested, and maintained. More context is not automatically better: irrelevant or conflicting instructions increase ambiguity and consume the attention available for the actual work.

Treat a change to context as a change to behavior. Give each reusable package a purpose, owner, version, source revision, content digest, inputs, expected outputs, trigger conditions, non-trigger conditions, dependencies, and evaluation cases. Keep the short discovery description separate from instructions loaded after selection and longer reference material retrieved when needed. Review changes as diffs. Record the exact package and specification revisions supplied to an execution rather than assuming the latest copy is what ran.

For example, a release-note skill should specify when it applies, what headings it produces, what evidence it may cite, and how to report an unverified deployment. It should not invent release status. The specification defines success, a skill describes the procedure, a rule supplies a constraint, and the verifier checks the result. They can share a source of requirements without letting the producer approve its own output.

**Required evidence:** a reviewed package, immutable task inputs, a frozen execution context, and representative positive and negative cases. **Failure to watch:** a broad trigger loads the skill for unrelated tasks, or a stale rule conflicts with the task specification. **Response:** narrow the trigger, resolve the conflict explicitly, and rerun the affected cases.

## 02 — Agent Governance, Security & Trust

Governance assigns decision rights and limits what an agent can affect. Security protects data, credentials, code and infrastructure inside those limits. Trust is earned from evidence of bounded behavior and recovery. None of these properties follows from installing a well-written skill.

Separate four controls. Structural lint checks whether a package is well formed. Security scanning examines its instructions, scripts, dependencies or configuration for a defined class of risk. Installation and publication policy decide which package is allowed into a given environment. Runtime enforcement controls actual filesystem, network, tool and production actions. A scanner's score is one input, with a scanner version and coverage limitations; it is not a universal safety certificate. A skill saying “never expose secrets” is an instruction, not an enforced data boundary.

Record the publisher, reviewer, source, dependency versions, scan findings, policy decision, granted permissions and actual actions. Bind grants to the workspace and operation, derive the actor from authenticated identity, and audit denials as well as approvals. A plugin may bundle skills, scripts, hooks and MCP configuration, but installation cannot grant additional authority. MCP supplies connectivity and live capabilities; server identity, credentials, tool scope and egress still need explicit controls.

**Required evidence:** a denied unauthorized operation, an allowed bounded operation, attributable audit records, and a recovery path. **Failure to watch:** a trusted-looking package gains a new executable dependency or broader tool access during an update. **Response:** reevaluate that exact change before admission and retain the last permitted version. Mandatory standards should be enforced by appropriate runtime or CI controls, not merely inserted into a prompt.

## 03 — Standardization & Reuse at Scale

A shared library should reduce rediscovery without forcing unrelated teams into one oversized instruction set. Begin with one repeated workflow and one accountable owner. Package the stable procedure, document its limits, and distribute an exact version through the existing repository or registry mechanism. Extend the common package only when the variation is shared; keep local exceptions explicit and time-bounded.

Inventory four different things: discovered files, registered packages, installed versions, and versions observed in runs. A scan of selected repositories is not an organization-wide inventory. Show scan coverage, last observation and unmanaged copies. Detect stale or overlapping packages, but use ownership and actual usage to decide whether to consolidate them. A large catalog is not evidence of reuse or quality.

Pin dependencies for reproducibility. Test candidate versions before selecting them for future work; let existing executions retain their original configuration. Deprecation should name a replacement and migration path. Rollback selects a previous permitted version for new runs and records why; it must not rewrite old receipts. Packaging that installs across multiple agents does not prove equivalent behavior across their harnesses.

**Required evidence:** two consumers resolving the same approved digest, an explicit upgrade decision, and a rollback that leaves an existing run unchanged. **Failure to watch:** teams silently edit local copies and continue reporting the central version number. **Response:** compare observed hashes, surface drift, and reconcile with the owner before claiming standardization.

## 04 — Continuous Evaluation & Optimization

Published, installed, available, loaded, reported as applied, and independently verified are different observations. Instrument each stage only where the runtime can support it. A receipt proving that content was supplied does not prove the agent followed it. A self-report of using a skill is useful diagnostic information, but independent checks must establish whether the resulting work met its contract.

Test selection and effectiveness separately. In a selection test, expose the skill's description and measure whether it is chosen for appropriate tasks and avoided for unrelated ones. In an effectiveness test, deliberately supply the instructions and compare outcomes. For a revision, run the same scenario set without the skill, with the current version, and with the candidate. Freeze model, harness configuration, task inputs, rubric and package digests. Repeat trials, preserve failures, and show sample sizes. Avoid interpreting a small test as an enterprise-wide productivity result.

Evals play a regression-detection role analogous to tests, but agent behavior can vary. Deterministic checks should establish exact properties such as schema validity or a required heading. Human or model judging may assess other qualities, with judge identity, rubric and limitations recorded separately. Structural review, simulated scores, externally reported results and validated execution evidence must remain distinguishable. Missing criterion evidence is unknown, not zero, and cannot be reconstructed from an aggregate passing count.

Measure verified success, regressions, latency, human review effort and actual cost where available. Do not infer dollar savings from score lift. Failure evidence should lead to a bounded improvement proposal, a new case, comparative evaluation and an explicit decision about future use. The loop can propose improvements automatically; it cannot create its own production authority.

**Required evidence:** before/after trial artifacts, criterion-level checks, provenance, and a rejected regression. **Failure to watch:** a structural quality score is displayed as measured agent performance. **Response:** preserve the record as a simulation, remove unsupported impact claims, and block its use as behavioral qualification.

## 05 — Tools-in-Action: Real-World Playbooks

A playbook is a reproducible account of a bounded workflow, including what failed and how the operator responded. It should help another team judge applicability and repeat the work. Name the repository revision, tools, harness and model, required access, input artifact, commands, expected outputs, independent checks, stop conditions, recovery procedure and cost visibility. Link the actual evidence, and distinguish a designed example, a local demonstration, a production pilot and sustained production operation.

Enterprise transformation stories need a measured baseline, adoption scope, period, number of tasks, review effort and observed outcomes. Report negative results, compatibility failures and conditions under which the approach did not help. An organization's logo, an attractive dashboard or a successful scripted demo is not an outcome study. When no production case exists, publish a clearly labeled local example and its limitations.

### Worked example: a release-note skill, blocked honestly

**Scope:** a local documentation-only fixture. No production data, package publication, deployment or shared-database writes. **Question:** does a candidate release-note skill improve exact output conventions without leaking into unrelated requests or inventing deployment status?

The experiment defines no-skill, current-version and candidate-version conditions, four scenarios, and three repeated trials per condition. Cases cover explicit instruction use, discovery, a greeting where the skill should not apply, and a request to claim a deployment that did not happen. It freezes skill digests, source revision, harness capabilities, model, timeout and verifier version. The verifier checks structured output, headings, validation scope, preservation of the fixture and specific unsupported deployment claims. These narrow checks do not establish comprehensive semantic correctness or security.

In the September 4, 2026 local attempt, the reviewed Mission Control adapter required Codex CLI 0.146.0; the installed CLI reported 0.153.3. Admission returned UNAVAILABLE and the experiment recorded BLOCKED with zero executed trials and no measured impact or cost. An isolated installation of official CLI 0.146.0 was also tried; its executable digest did not match the evaluated binary, so it was blocked as well. No compatibility override was used. This is useful operational evidence of a stop condition, not evidence that the skill improves output.

**Historical next step at that admission failure:** supply the already-qualified runtime or separately qualify the newer runtime through the factory's admission process. The current stop condition below supersedes permission to rerun. After real trials, review the individual failures and compare conditions before selecting a version. If the candidate regresses, keep the current version and add the failure case to the suite. Do not relabel the blocked attempt as completed or delete it from the record.

Mission Control's current registry foundations support packaging and lock-linked context. The local evidence-integrity changes distinguish simulations and external reports; a trusted measured-result ingestion/promotion path and end-to-end admitted-worker activation proof must be qualified before claiming the entire lifecycle is production-ready.

## Applying the practices across the ecosystem

FDLC defines the responsibilities and evidence boundaries. The Guide explains the engineering decisions and worked examples. Mission Control should implement the controls and expose current evidence and limitations. Keep these three descriptions aligned: documentation can describe a target architecture, but product capability labels must describe what has actually been demonstrated.

## Governed capability lifecycle

Author → Package → Evaluate → Admit → Activate → Observe → Compare → Promote/Rollback → Improve.

Authoring defines intent, operating rules and acceptance criteria. Packaging freezes skill bytes, manifest, declared capabilities and dependencies. Evaluation freezes the scenario and evaluator contract before execution. Admission checks that the package, runtime, platform and configuration are the combination actually approved. Activation selects that exact identity before the worker starts; a lock file or selection receipt alone does not prove the worker consumed it.

Observation retains execution identity, raw outputs, timestamps and outcomes. Comparison uses the same scenario contract, model/configuration and metric for baseline and treatment, with sample size and uncertainty stated. Promotion requires scoped approval and verified bytes. Rollback requires approval to restore the previous identity, followed by evidence that the worker actually used it. Improving a capability starts a new version and evaluation; it never rewrites historical semantics.

Structural quality proves package shape. Behavioral effectiveness requires measured execution and independent evaluation. A simulation can exercise the interface; an external score can inform review. Neither can establish improvement or behavioral release PASS. Where execution provenance, comparison or identity binding is missing, report **INSUFFICIENT MEASURED EVIDENCE**.

### Qualification follow-up

The two blocked September 4 attempts remain admission failures with zero trials. Subsequent inspection found that the isolated official 0.146.0 native binary matches the approved Darwin ARM64 digest. The adapter's npm wrapper resolver assumed a nested dependency directory, while this installation hoisted the platform package. Selecting the already approved native binary passed the unchanged version and digest checks. Expanded offline checks have not qualified workspace-only containment; the earlier narrow containment check was insufficient. This resolves artifact selection only. Approval for twelve synthetic OpenAI calls has been accepted and remains unused. The experiment is **BLOCKED with zero model calls** because filesystem containment, provider request/retry attribution and provider-confirmed model capture are not qualified. Monetary cost may remain UNKNOWN; it must not be reported as zero when unavailable. The latest instruction requires stopping after offline preflight even if all gates pass.

The local reconciliation also binds package publication to content plus manifest/dependency identity, requires workspace/repository authority for context selection, checks approval against exact lock and manifest bytes, and prevents a run from substituting a second selection. These are local controls under review. Trusted measured ingestion, admitted-worker delivery, production activation and observed rollback remain **NOT QUALIFIED**. Production release gates cannot use a Registry diagnostic label as a substitute for those proofs.
