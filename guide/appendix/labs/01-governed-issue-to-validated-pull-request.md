---
title: Governed Issue to Validated Pull Request
status: execution-blocked
audience:
  - executive
  - architect
  - senior-engineer
  - ai-engineer
last_verified: 2026-08-08
lab_type: executable
---

# Governed Issue to Validated Pull Request

## Objective

Prove that Mission Control can govern one bounded software change from human
intent to a review-ready pull request. The learner must operate, trace, explain,
validate, and recover the workflow. Autonomous deployment is outside scope.

The demonstration first proves Level 2 Delegated Execution. It does not prove
Level 3 until the workflow satisfies the separate volume, time, validation, and
human-promotion requirements.

## Scenario

Add a required **Business Justification** field to Mission creation.

This change is intentionally small. It touches frontend and backend behavior,
requires tests, and remains easy to inspect manually. The factory workflow—not
feature complexity—is the subject of the lab.

## Enduring Principle

A useful first autonomy proof should be bounded, observable, reversible, and
representative. It must exercise governed intent, versioned planning, explicit
authorization, implementation, independent validation, retained evidence, and
human accountability without introducing unrelated architectural risk.

## Current Mission Control Implementation

The controlled target baseline is
`jaydubya818/mission-control-factory-lab` at commit
`a4c864d743e2304feb2979870f41efbbae5d632b`, tagged `lab-baseline-v1`.
The first browser run reached an approved Plan and two released WorkOrders but
stopped before dispatch. It therefore remains evidence of partial control-plane
operation, not proof of the complete factory promise. See the
[2026-08-08 execution assessment](evidence/2026-08-08-golden-path/README.md).

## Acceptance criteria

1. Mission creation includes a Business Justification field in the React UI.
2. The authoritative backend schema stores the field.
3. Client and server validation reject an empty value.
4. Existing affected tests are updated.
5. A browser test covers successful creation and empty-value rejection.
6. Independent validation executes separately from implementation and passes.
7. Evidence maps each result to an explicit acceptance criterion.
8. Mission Control creates a review-ready pull request with exact commit and
   head-SHA lineage.
9. A human reviews the independent evidence and approves or rejects the merge.

## Governed workflow

1. A human creates the Mission and defines the desired outcome, constraints,
   acceptance criteria, owner, and risk.
2. An agent investigates the target repository.
3. The factory produces a versioned Plan.
4. A human approves the exact Plan version.
5. Mission Control authorizes a WorkOrder with a bounded acceptance boundary.
6. The factory decomposes and executes Tasks through immutable Attempts.
7. Implementation occurs in an isolated worktree.
8. Independent validators run through separate execution paths and generate
   their own evidence.
9. Mission Control creates the pull request and review package.
10. A human makes the merge decision.

## Required failure exercise

Intentionally submit an empty Business Justification. Show the UI validation,
server-side rejection, authoritative record state, and retained evidence. Then
correct the input without bypassing the governed path. This is an expected
validation failure, not automatically a trust-loss event.

The meaningful runtime failure is independent validation discovering that the
first implementation enforces the field only in the browser. The validator must
call the authoritative backend path directly with an empty value. If that call
succeeds, the criterion fails, acceptance remains blocked, and the factory
creates bounded corrective work. The correction adds server-side enforcement
and produces a new Attempt. Fresh independent evidence must replace the failed
receipt; the original failure remains in history.

## Review-ready operator screen

The primary review screen must show:

- Mission outcome, business reason, risk, and owner;
- approved Plan version and authorized WorkOrder scope;
- changed files and material decisions;
- acceptance criteria mapped to fresh independent evidence;
- validator identity, execution path, environment, and exact commit;
- failed, stale, waived, conflicting, or missing evidence;
- plan deviations, unresolved questions, and uncertainty;
- pull-request URL, branch, head SHA, checks, and merge state;
- rollback or reversal approach; and
- a clear recommendation with approve, reject, and request-revision actions.

Routine logs remain available through drill-down. They should not dominate the
decision surface.

## Required evidence

- exact Mission Control and target-repository commits;
- Mission, Plan, WorkOrder, Task, Attempt, Evidence, and pull-request references;
- approved Plan version and WorkOrder authority boundary;
- browser screenshots or recording;
- implementation and independent-validation execution identities;
- unit, integration, and browser-test results;
- evidence mapped to each acceptance criterion;
- captured review-ready operator screen;
- pull-request URL and exact head SHA;
- failure and recovery trace;
- agent-assistance disclosure; and
- teach-backs for a developer, CTO, and executive audience.

## Future Vision

After the Level 2 path is reliable, use the same workflow as one input to the
Level 2-to-Level 3 evidence window. Level 3 requires at least 100 successful
WorkOrders across 30 stable days, at least 99 percent independent-validation
success, no critical security or policy violations, no unauthorized actions,
and explicit human promotion. A single successful demonstration cannot earn
that promotion.

## Cleanup

Perform implementation in a disposable worktree or controlled lab repository.
Do not modify production data. Preserve accepted textual evidence in the
mastery repository and reference large private artifacts by stable identifier
and checksum.

## Mastery standard

The lab passes only when the learner can operate the browser path, trace every
authoritative record and runtime boundary, explain why validation is
independent, recover the required failure, defend the merge recommendation,
and distinguish a Level 2 demonstration from Level 3 earned autonomy without
agent-supplied answers.
