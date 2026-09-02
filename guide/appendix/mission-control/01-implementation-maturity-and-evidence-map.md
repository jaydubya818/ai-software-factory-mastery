---
title: Mission Control Implementation Maturity and Evidence Map
status: historical-assessment
audience: [executive, architect, senior-engineer, ai-engineer, platform, product]
assessed_on: 2026-08-11
last_verified: 2026-08-11
mission_control_main_commit: b31e27564deb1c03c167e61b5ee094567c2ba7b1
mission_control_study_commit: 9d5f8e36aff45a001a8848cc0516b3dc800e29b8
mission_control_pr: 64
---

# Mission Control Implementation Maturity and Evidence Map

> Historical assessment: this map captures the repository states listed below.
> For the verification architecture at merged commit `ff0524e`, continue with
> the [Verification-First Software Factory case study](./02-verification-first-software-factory.md).
> For the current checkout at `d902fae`, use the
> [Capability, Workflow, and Admission Map](./03-capability-workflow-and-admission-map.md).

## Purpose

This case study prevents the mastery guide from confusing four different
evidence states:

1. merged capability on GitHub `main`;
2. committed and tested capability on an open branch;
3. live or browser evidence with a known limitation; and
4. uncommitted proposal or future vision.

It is a point-in-time assessment, not product documentation.

## Source boundaries

| Source | State on 2026-08-11 | Permitted claim |
| --- | --- | --- |
| `b31e275` on GitHub `main` | Merged | Current committed baseline |
| `9d5f8e3` on `codex/sandbox` | Open draft PR #64 | Tested branch implementation, not `main` |
| PR #61 at commit `2fd0a5a` | Open, all checks passing | One real GitHub App publication proof |
| Original mastery Golden Path 01 | Partial run against dirty `8014d5a` worktree | Control-plane behavior and blockers only |
| Three remote-sandbox documents | Uncommitted local files | Design and blocked provider evidence only |

## Capability map

| Capability | GitHub-main status | Newer evidence | Remaining boundary |
| --- | --- | --- | --- |
| Governed Mission and versioned Plan | Implemented | Browser control-plane path retained | Complete clean browser rerun |
| WorkOrder, Task, and Attempt hierarchy | Implemented | Stronger revision-bound Task authority on PR #64 | Merge and browser proof |
| Independent validation and evidence | Implemented mechanisms | Phase 0 canary independently verified before acceptance | Complete review package across real PR path |
| Factory Configuration and readiness | Implemented baseline | Agent bindings, code scopes, workflow contract, and manifest on PR #64 | Merge, policy/configuration for lab repo |
| Policy and risk approval | Partial but material | Active policy used for live PR proof | Canonical fail-closed policy across every tool boundary |
| Durable lease and heartbeat | Not on main | Implemented and tested on PR #64 | Merge and full late-event/cancel browser matrix |
| Real Codex-to-GitHub PR | Not on main | PR #61 proves one real bot-authored review-ready PR | Browser Mission path required direct mutations |
| Exact execution manifest | Not on main | Implemented and tested on PR #64 | Merge and retained end-to-end evidence |
| Structured workflow handoff | Partial | Six workflows hardened on PR #64 | Merge and representative real execution |
| GitHub App boundary | Connection contract on main | Real token, push, PR, and passing CI proof | Webhook evidence-ingestion defects and lab setup |
| Model routing | Implemented platform mechanisms | Operational thresholds documented | Outcome-normalized ranking and automatic canary control |
| Loop/Graph Engineering | Implemented bounded slices | Browser failure containment and human gate evidence | Live agent deliverables and complete evidence ingestion |
| Governed continuous learning | Substrate exists | Phase 0 operational canary passed on PR #64 | Scheduler off; source registry and ingestion not built |
| Release and production outcome | Partial records and policy | None establishes customer-value completion | Deployment reconciliation and production outcome loop |
| Remote sandbox | Not implemented | Local design and blocked provider doctor only | Capacity, lifecycle canaries, privilege, egress, and teardown proof |
| Trust Score and autonomy calibration | Doctrine | No canonical product proof | Outcome model, demotion, quarantine, and human promotion workflow |

## What changed since the original golden-path assessment

The original 2026-08-08 run correctly reported no Task, Attempt, Evidence, or
PR. Since then, PR #64 implemented much of todo 024’s deterministic runtime,
and the local work log records a real GitHub App PR with exact lineage and
passing checks. That is meaningful progress.

It does not retroactively make the original lab pass. The real recovery used
direct control-plane mutations because the browser Mission path could not start
the released Plan, preserve the implementation policy, or reconcile the receipt
into the assertion. The accepted mastery lab still requires a clean,
browser-initiated run through the supported path.

## Documentation gaps closed by this review

This review added dedicated mastery chapters for:

- Factory Configuration, workflow contracts, and execution manifests;
- sandbox isolation and publication boundaries;
- model routing, evaluations, and capability selection;
- release, production feedback, and Factory SRE; and
- governed continuous learning and recursive improvement.

The source material was synthesized into enduring principles and versioned case
study findings. Mission Control product documentation was not copied.

## Recommended next evidence sequence

1. Review and merge PR #64 or establish a different clean pinned baseline.
2. Repair the browser Mission path and GitHub webhook evidence reconciliation.
3. Configure the controlled `mission-control-factory-lab` repository with the
   exact GitHub App, active Governance Policy, and passing Factory version.
4. Rerun Golden Path 01 from its pinned target baseline without direct database
   or script mutations.
5. Retain Task, Attempt, lease, manifest, commit, PR, receipt, failure, recovery,
   and review-package evidence.
6. Only then extend the proof into deployment and production outcome.

## Review questions

1. Which claims are safe to state in present tense?
2. Which tests prove a mechanism but not an end-to-end capability?
3. Why does PR #61 not satisfy the browser-only lab?
4. What evidence would promote remote sandboxing from proposal to Preview?
5. Which current mastery chapters must be reverified after PR #64 changes?

## Status at af414acf

*Added 2026-09-02 from the public README at commit `af414acf` (2026-08-31).
The assessment above is left as written at `b31e275`; this section records
where the project stood twenty days later, in the project's own words, so
the two can be compared.*

The README's honest current claim: Mission Control is a strong,
human-governed production-pilot architecture with a qualified delivery
kernel; it is not yet a fleet-scale autonomous software factory or a
generally certified Remote Sandbox platform. Status is active V1
development; public client/backend runtime contract v34.

**Proven, per the README.** A browser-operated path from Mission and approved
Plan through WorkOrder, Task, Attempt, evidence, pull request, and human
acceptance; real GitHub App pull requests with exact repository, branch,
commit, changed-file, check, Attempt, and Mission lineage; immutable
cancellation, failure, retry, and recovery history; process restart and
browser refresh without lost terminal state or duplicate pull requests;
independent verification and exact-current evidence before acceptance; a
deterministic V3 qualification of 15 accepted controlled workloads across
bug fixes, features, refactors, security/policy changes, and migrations;
seventeen deliberate failure injections that failed closed; a bounded 3/3
live Remote Sandbox cohort with Attempt-scoped credentials and verified
cleanup. Several rows of the capability map above ("Durable lease and
heartbeat: not on main", "Real Codex-to-GitHub PR: not on main", "Remote
sandbox: not implemented") are therefore superseded.

**Limitations, per the README.** Real product pilot pending (V3 used
disposable workload repositories; the real GitHub path was deliberately
narrow). Remote Sandbox is production-pilot eligible and Preview, with
egress not yet provider-enforced and an ephemeral Codex installation.
Guarded Auto is disabled. Merge and deployment remain human decisions. Cost
attribution is incomplete. Tool and MCP authority is incomplete, with the
next proof named as one default-deny, read-only internal integration rather
than a connector catalog. Incident response is fragmented. Enterprise
tenancy is not fully qualified. Adoption is not production-proven.

**Canonical source.** The
[Capability Maturity Ledger](https://github.com/jaydubya818/MissionControl/blob/af414acf/docs/product/software-factory-capability-maturity.md)
is the authoritative record of each capability's status, evidence,
limitation, owner, and next promotion gate. Architecture documents define
intended contracts; plans describe proposed or historical work; evidence
packages prove behavior at an exact revision; where a status claim
disagrees, current source and retained evidence win and the ledger is
corrected. This case study, including this section, is subordinate to it.
The narrative treatment is in
[Chapter 34](../../06-improve/34-mission-control-as-a-living-case-study.md).

## Versioned references

- [Mission Control README at `af414acf`](https://github.com/jaydubya818/MissionControl/blob/af414acf/README.md)
- [Mission Control main baseline](https://github.com/jaydubya818/MissionControl/tree/b31e27564deb1c03c167e61b5ee094567c2ba7b1)
- [Mission Control study commit](https://github.com/jaydubya818/MissionControl/tree/9d5f8e36aff45a001a8848cc0516b3dc800e29b8)
- [Draft PR #64](https://github.com/jaydubya818/MissionControl/pull/64)
- [Real publication proof PR #61](https://github.com/jaydubya818/MissionControl/pull/61)
- [Original Golden Path 01 assessment](./evidence/2026-08-08-golden-path/README.md)
