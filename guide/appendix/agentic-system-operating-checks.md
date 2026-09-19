---
title: "Agentic systems: practical operating checks"
summary: "Pilot decisions, retrieval diagnosis, recovery choices, framework qualification, and evaluation independence."
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
