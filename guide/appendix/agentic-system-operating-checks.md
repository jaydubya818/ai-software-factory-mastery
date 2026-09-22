---
title: "Agentic systems: practical operating checks"
summary: "Pilot decisions, action-level autonomy, execution authority, recovery choices, and evaluation independence."
---

# Agentic systems: practical operating checks

Use these checks to turn an architecture into a bounded, measurable workflow. They apply the existing FDLC contracts; they do not introduce a new stack, lifecycle, or claim of implemented capability. Begin with one workflow and carry its outcome, authority, evidence, and operating owner through every choice.

## Start with an outcome brief

Before choosing a framework, record a decision that a business owner can review.

| Field | Required decision |
| --- | --- |
| Outcome and owner | Which user problem will improve, and who accepts the result? |
| Baseline | Current cycle time, quality, full cost, and human effort for a defined cohort and observation window |
| Pilot boundary | Eligible work, excluded cases, affected systems, permissions, and intervention points |
| Success and stop conditions | Measurable improvement alongside quality and authority gates; the conditions that pause or end the pilot |
| Evidence | Accepted outcomes, failures, corrections, incidents, and attributable spend, including unsuccessful attempts |
| Next decision | Expand, revise, or stop on a named review date; who owns rollback and ongoing operation? |

For example, a dependency-update pilot can cover one repository and a defined update class, with a person accepting releases. Compare accepted updates, review effort, escaped defects, and total cost against the existing process. Faster draft pull requests alone do not justify expansion. A thirty-day review is a decision point, not a promise of production readiness. [Enterprise adoption](../05-operate/38-enterprise-adoption-and-the-infrastructure-landscape.md) owns the rollout and maturity gates.

## Choose autonomy for each decision

Start with the simplest execution pattern that can satisfy the acceptance contract. A fixed workflow can contain model calls; it is still a workflow when code determines the permitted sequence and branches. Use an agent loop when selecting the next step requires judgment that cannot reasonably be encoded upfront, and bound its tools, iterations, time, and spend. Add specialist agents only when their separate responsibilities improve measured outcomes enough to justify coordination and recovery costs.

For each step, name who chooses the next action, which actions are permitted, what evidence is required, and who handles an exception. Model discretion and execution authority are separate: an agent may choose a useful action that it has no grant to perform. Planning, retrieval, memory, and critique are capabilities within this design, not mandatory stages or permission grants. Retrieval can use lexical search, structured queries, or other eligible sources; a vector database is not a prerequisite. Self-critique can help repair a draft but cannot accept the producer's own work.

Consider a dependency-update workflow. The following is an illustrative operating contract, not a claim that every action is implemented or qualified today.

| Step | Execution pattern | Authority and evidence |
| --- | --- | --- |
| Inspect the manifest and approved release notes | Fixed retrieval path where possible | Read only eligible sources; record versions, repository revision, and relevant constraints |
| Resolve ambiguous compatibility findings | Bounded agent investigation | Choose from approved read tools; stop with explicit gaps when evidence or budget is insufficient |
| Prepare the patch and run tests | Scoped editing plus deterministic checks | Confine writes to the authorized workspace and change scope; retain the diff and test evidence |
| Open a draft pull request | Fixed publication action after validation | Require the exact repository grant; preserve operation identity so recovery does not publish twice |
| Merge or release | Separate governed decision | Bind acceptance and release authority to the reviewed revision; drafting or testing authority does not imply permission to ship |

Compare this workflow against its baseline before widening any action grant. Use [governance by action class](../02-design/07-governance-policy-and-risk-proportional-approval.md#autonomy-per-action-class) for the governing risk policy and [evaluation engineering](../04-prove/29-evaluation-engineering.md) for independent outcome evidence.

## Recheck authority at the action boundary

An earlier approval is evidence for a particular decision, not a permanent capability. Immediately before a consequential operation, validate the originating principal and delegated workload identity, purpose, target, exact action and relevant arguments, active policy, grant scope, expiry, revocation, and any required approval. Bind the decision to the artifact or revision that was reviewed. Recheck after a human wait, queue delay, resumed session, or changed plan; do not replay a cached allow decision as fresh authority.

For example, if a pull request receives another commit after its release approval, the old approval cannot authorize the new revision. Stop that release path and reevaluate the changed subject under policy. Likewise, a revoked repository grant must prevent a queued publication even when the agent's plan and tests remain valid. Credentials that technically permit an API call do not establish that the current task authorizes it.

Keep responsibilities explicit. The Control Plane defines the authority and governing records; the Orchestrator coordinates durable work and waits; the Harness runs the bounded model loop; enforcement points and enterprise services validate the permitted operation and business invariants. A tool success response is one observation. Verification, acceptance, and release remain separate decisions.

Exercise the boundary with an expired approval, revoked grant, changed target, changed revision, and lost response after a write. Expected results must distinguish denial before an effect from an unknown effect that needs reconciliation. At handoff, state what was requested, what was attempted, which effects were confirmed, which checks passed or failed, what remains unknown, and the next permitted action with its owner. Link evidence without exposing secrets or unauthorized context.

## Diagnose retrieval before changing the model

A citation and a fluent answer are insufficient. Preserve the source version, eligibility decision, candidates, final context, and claim-to-source relationship so a failure can be located.

| Observed failure | Inspect first | Bounded correction |
| --- | --- | --- |
| Correct source never appears | Registration, ingestion receipts, parser output, query identifiers, and eligible candidate recall | Repair the source or retrieval path; retain a regression case |
| Rule appears without its exception | Chunk boundaries, headings, tables, and parent context | Keep the rule and qualifying exception together in the evidence package |
| Old policy outranks its replacement | Effective dates, authority, index lag, and invalidation receipts | Exclude ineligible versions from new decisions; correct derived caches and packages |
| Relevant results disappear after filtering | Requester, tenant, purpose, and source permissions | Confirm whether the denial is correct; never broaden access to improve recall |
| Good candidates produce poor context | Reranking, duplicates, diversity, contradictions, and token allocation | Compare candidate and assembled-context quality separately |
| Evidence is correct but answer is unsupported | Claim-level support, omitted caveats, and abstention behavior | Repair generation or grading; withhold unsupported claims |
| Cached answer crosses a boundary | Cache identity, authorization scope, source versions, and revocation behavior | Reauthorize reuse and invalidate affected entries; bypass caching when safe reuse cannot be proven |

Deletion and permission changes must propagate through indexes, caches, and dependent artifacts. Test this explicitly with a previously permitted source that becomes ineligible. RAG improves access to evidence; it does not guarantee factual answers. [Context engineering](../03-build/20-context-engineering.md) defines the retrieval contract and lineage requirements.

## Choose the recovery action explicitly

A failed request does not establish that an external operation failed. Keep recovery within the current authority, time, and cost limits.

| Situation | Action | Evidence before continuing |
| --- | --- | --- |
| Transient read failure, no side effect | Retry within a bounded policy | Error classification, backoff, remaining budget, and still-valid authorization |
| Write times out; effect is unknown | Reconcile before any repeat | Stable operation identity and provider status or receipt; unresolved effect remains unknown |
| Same authorized operation can safely repeat | Retry with enforced idempotency | Provider or adapter deduplication behavior qualified for that operation |
| Plan is unsuitable or required context is missing | Replan within the approved outcome and scope | Revised plan, updated evidence, and any required renewed approval |
| Tool, provider, or model is unavailable | Use only a qualified fallback | Required capability, data handling, authority, and budget remain satisfied |
| Permission denied, required approval missing, or budget exhausted | Stop or escalate through the defined owner | Reason, retained state, deadline, and next permitted action |

A stronger model cannot grant permission. More agents cannot resolve unknown external effects by agreement. An inner repair loop does not replace independent verification. [Harness engineering](../03-build/16-harness-engineering.md) and [durable execution](../03-build/14-durable-execution.md) define the enforcing boundaries.

## Qualify a framework for a workload

Choose implementations against a written capability requirement, using the exact package and dependency versions. A framework's popularity, role vocabulary, or demonstration is not qualification evidence.

| Requirement | Demonstration to retain |
| --- | --- |
| Resume, cancel, and expire | Crash during an operation; recover once, reject stale completion, and respect cancellation |
| Typed tool boundary | Reject malformed inputs and unusable outputs; enforce authorization outside model instructions |
| Dynamic tool discovery | Treat discovery as inventory; admit the qualified tool version and schema under the current grant before execution |
| State and memory | Separate run state, retained memory, and retrieved knowledge; test isolation, expiry, and deletion |
| Traceability and economics | Reconstruct decisions, downstream calls, retries, evidence, and attributable cost |
| Upgrade and exit | Re-run conformance after changes; retain an export and migration path for state and records |

MCP describes tool discovery and invocation, including schemas and errors. It does not itself supply the FDLC control plane. The [MCP tools specification, revision 2025-06-18](https://modelcontextprotocol.io/specification/2025-06-18/server/tools) describes those protocol boundaries; qualify the protocol revision and implementation actually deployed. [Harness adapter admission](../03-build/16-harness-engineering.md#adapter-admission-prohibited-authorities-and-required-external-controls) supplies the factory requirements.

A reference repository should make contracts, policies, adapters, workflows, evaluation fixtures, observability, and deployment configuration easy to locate and own. Folder names are an implementation choice. Keep credential values, private production traces, and live memory outside source control; version schemas and secret references, and use governed storage for runtime data. A tidy project tree proves organization, not enforcement or readiness.

## Evaluate decisions and outcomes independently

Preserve the existing Eval Task and run records. For each boundary, record the expected behavior, observed decision, governing versions, evaluator, and failure evidence. Useful boundaries include routing, planning, retrieval, tool arguments, tool effects, final claims, and production outcomes. Measure the result and the permitted path separately.

An agent may draft tests and development cases. A reviewer must check their expected outcomes and whether they exercise meaningful failures. Keep those visible repair cases separate from protected qualification and holdout cases. Freeze acceptance criteria for the run; a repair loop cannot weaken the rubric, remove a failing case, or approve itself. If a holdout case is disclosed for repair, record the exposure and replace its role in independent evaluation.

No fixed count, including twenty passing examples, proves readiness. Report coverage, cohort, repeat trials where appropriate, uncertainty, failures, and cost beside the score. Deterministic tests, behavioral evaluations, and production monitoring answer complementary questions. [Evaluation engineering](../04-prove/29-evaluation-engineering.md) defines dataset splits, graders, negative controls, and promotion evidence. [Anthropic's agent evaluation guidance](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) provides supporting discussion of tasks, trials, graders, and outcomes.

On FDLC.ai, the [architecture operating checks](https://fdlc.ai/architecture#operating-checks) and [benchmark evaluation boundaries](https://fdlc.ai/benchmarks#evaluation-boundaries) summarize these practices and link back here.
