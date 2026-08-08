# Golden Path 01 Execution Assessment

## Result

**PARTIAL — the lab does not pass.**

The browser-operated run proved Mission definition, repository connection,
versioned planning, a human plan decision, WorkOrder release, and enforcement
of a separate Validator WorkOrder. It did not prove execution, immutable
Attempts, independent evidence, pull-request creation, or recovery of the
planned server-validation failure.

This distinction matters. A functioning control-plane path is necessary, but
it is not equivalent to an operating AI Software Factory.

## Tested system

- Date: 2026-08-08
- Mission Control URL: `http://127.0.0.1:5199`
- Active runtime profile: preserved Research Lab profile
- Mission Control repository HEAD: `8014d5af427b43ff5c5a63cfdf82ec92742c208c`
- Mission Control worktree: dirty; the tested runtime is not reproducible from
  the commit alone
- Target repository: `jaydubya818/mission-control-factory-lab`
- Target baseline: `a4c864d743e2304feb2979870f41efbbae5d632b`
- Target tag: `lab-baseline-v1`
- Hosted baseline validation: [GitHub Actions run 31239800515](https://github.com/jaydubya818/mission-control-factory-lab/actions/runs/31239800515)

The target baseline passed formatting, type checking, two API tests, production
build, one Chromium browser test, and a dependency audit with zero known
vulnerabilities. Its `main` branch requires the `validate` check, one approving
review, resolved conversations, and disallows force pushes and deletion.

## Authoritative records created through the browser

- Workspace: `sn783ww03ds4ksc0814yxtvw8d8b6vk7` — Software Factory Verification
- Mission: `gs7zf5n8p9qkr64j9exwx2xqhn8c3hex` — Golden Path 01 — Business Justification
- Plan: revision 1, approved by `development:local-operator`
- Implementation WorkOrder: `yh74b499sa4d8qjepjmydj1dqd8c25tw`
- Validator WorkOrder: `yh7edkdw4s30h14ybzyfjd4b2d8c2zp1`
- Acceptance assertion: `assertion-1`

No Task, Attempt, evidence receipt, factory branch, commit, or pull request was
created. Those identifiers therefore do not exist and must not be inferred.

## What the run proved

1. A human can create a governed Mission through the operator UI.
2. A private target repository can be connected to the workspace through the
   browser and made the default repository.
3. The operator can create and submit a versioned Plan.
4. A validation assertion marked as independent cannot be covered only by a
   Worker WorkOrder. Mission Control rejected submission until a separate
   Validator WorkOrder was added.
5. Human plan approval released two WorkOrders but did not start execution.
6. The implementation WorkOrder remained in `AWAITING_APPROVAL`; Dispatch was
   disabled and the validator remained dependent on its predecessor.

That is good control-plane behavior. The system kept authorization, execution,
and acceptance separate.

## Why execution stopped

### GitHub provider boundary is unavailable

Repository readiness reported `MISSING`: no GitHub App installation is bound to
the target repository. Attempting installation returned the operator message:

> GitHub App setup is not configured for this environment. Add the required
> server credentials, then try again.

Without this provider boundary, Mission Control cannot mint an ephemeral token,
push a factory-owned branch, reconcile a pull request, or persist exact PR
lineage.

### No active Factory Configuration

The connected repository has no Factory Configuration. The configuration form
has workflows but no available Governance Policy. Therefore no immutable
workflow, executor, policy, budget, verifier, or recovery boundary can be
activated for dispatch.

### Real Codex-to-GitHub execution remains unfinished

Mission Control todo 024, *Execute the Real Codex-to-GitHub Pull Request Golden
Path*, remains in progress. Its unchecked criteria include leased attempt
claiming, worktree allocation, bounded `codex/v1` execution, path-scope
enforcement, GitHub App token minting, idempotent PR creation, exact lineage,
restart reconciliation, and a browser-proven sandbox PR.

### Runtime provenance is insufficient for accepted evidence

The browser used a dirty Mission Control worktree at the commit recorded above.
The uncommitted runtime includes active work on todos 024–026. Because the exact
source state is not represented by a commit, this run cannot satisfy the lab's
reproducibility requirement even if dispatch were otherwise available.

## Observed failure and recovery

While switching workspace and opening management, the operator shell failed on
Convex query `analytics:schematicOverview` with request ID
`486d41823b6429cc`: the request timed out after too many system operations. The
application error boundary displayed a reload action. Reloading restored the
Mission list and the operator continued.

This is retained as a genuine runtime failure and recovery observation. It is
not the lab's required independent-validation failure and does not satisfy that
exercise.

Some ref-based automation clicks reported success without changing UI state.
For those controls, the same visible browser button was activated with a DOM
click after a fresh accessibility snapshot. All durable outcomes were then
verified through subsequent browser snapshots. This limitation should be
removed before treating the flow as deterministic browser evidence.

## Acceptance matrix

| Criterion | Status | Evidence |
| --- | --- | --- |
| Mission and governed objective created in browser | Pass | Mission record and screenshot |
| Versioned Plan approved | Pass | Revision 1 and approved-plan screenshot |
| Separate implementation and validator WorkOrders | Pass | Two retained WorkOrder IDs |
| Required field implemented in UI and API | Not run | No execution occurred |
| Empty value rejected server-side | Not run | No implementation Attempt |
| Independent validation executed | Not run | Validator awaits predecessor |
| Evidence mapped to acceptance criteria | Not run | No receipts exist |
| Review-ready PR with exact lineage | Not run | GitHub provider unavailable |
| Failure corrected through a new Attempt | Not run | No Attempts exist |

## Evidence index

| Artifact | Classification | SHA-256 |
| --- | --- | --- |
| `mission-draft.png` | INTERNAL | `925a08b607a92079d712dab225dd894c4051e64d34489ea3f5700646818341b9` |
| `approved-plan.png` | INTERNAL | `38e2ab5e295714a17bbba900a47d0fb1320db946747b55ad897d19e287565ee1` |
| `work-order-approval-gate.png` | INTERNAL | `5fcd4abc888ea8fe82db4d8f6cd0707c71a66dc34df523928ffc566bb73bdc66` |
| `factory-readiness-blockers.png` | INTERNAL | `f14a2706b5bcfe5e69c762326d62193de4e73b4d25b7fe6badd523e7100d18c0` |
| `mission-control-operator-error.png` | INTERNAL | `8700113e90b98672d18a1c944ef7c4fd368c6f419a5f6afbab975984c6109454` |

The screenshots contain no credentials or customer data. Large raw traces were
not retained because this was a failed readiness assessment, not accepted
capstone evidence.

## Agent-assistance disclosure

Codex created and validated the target repository baseline, operated the
browser, and wrote this assessment. This run earns no personal mastery credit.
It establishes the laboratory and an evidence-backed implementation boundary
for the learner's later no-agent and assisted runs.

## Required next actions

1. Commit and review the in-progress Mission Control runtime so the tested
   control and execution planes have exact source provenance.
2. Configure Mission Control's GitHub App server credentials and install the
   App with least privilege on `mission-control-factory-lab`.
3. Create and activate a Governance Policy and Factory Configuration for the
   repository.
4. Complete and verify todo 024's durable worker and exact-lineage criteria.
5. Rerun this same Mission from the pinned target tag. Do not change the
   acceptance contract to make the run easier.
