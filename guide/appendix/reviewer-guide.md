---
title: External Reviewer Guide
status: canonical-navigation
audience: [all]
last_verified: 2026-08-30
lifecycle: [verify, learn]
risk: variable
topics: [review, feedback, evidence]
---

# External Reviewer Guide

Thank you for reviewing AI Software Factory Mastery. The most valuable review
identifies an incorrect boundary, missing failure mode, unsupported claim,
unclear explanation, or exercise that cannot produce the evidence it promises.

## What this review is evaluating

Review the material as a field guide and architecture reference. Do not assume a
`review-ready` chapter describes a production-proven implementation. Current
implementation, future vision, and enduring principles are deliberately
separate claims.

## Recommended review paths

Choose one path rather than trying to read everything:

- **Architecture:** canonical boundaries, domain model, Agent Factory, runtime,
  verification, platform, and security.
- **Reference contracts:** architecture views, inventory, orchestration,
  knowledge, tool and integration, multi-agent, and operating contracts.
- **Builder:** repository onboarding, capability resolution, workflow patterns,
  testing, and delivery.
- **Operations and risk:** scheduling, resilience, threat model, identity,
  production verification, and incident response.
- **Governance and control:** decision rights, control evidence, emergency
  actions, recertification, drift, and verified closure.
- **Guide and usability:** navigation, concept discovery, terminology,
  readability, visual explanation, exercises, and accessibility.

## Review checklist

For each chapter, ask:

1. Does the problem justify the proposed responsibility?
2. Are authority, identity, state, evidence, and failure ownership explicit?
3. Are enduring principle, current implementation, and future vision kept apart?
4. Is any current claim stronger than its source or evidence?
5. Which threat, operational failure, or tradeoff is missing?
6. Is terminology consistent with the canonical glossary?
7. Can a reader explain what the component does not own?
8. Does every diagram have a complete text or table equivalent?
9. Does the chosen autonomy pattern prove why a simpler design is insufficient?
10. Can an operator trace one failure through containment, reconciliation,
    recovery, and verified closure?

## Feedback labels

Use one of these labels in the issue title or first line:

- `claim` — inaccurate, unsupported, stale, or overstated statement;
- `architecture` — missing or incorrect boundary, state, contract, or failure;
- `security` — threat, control, identity, data, or compliance issue;
- `guide` — missing prerequisite, sequencing, depth, visual, or exercise;
- `usability` — navigation, readability, accessibility, or interaction problem;
- `terminology` — ambiguous, duplicate, inconsistent, or missing definition; or
- `source` — missing, weak, obsolete, or conflicting reference.

Include the page, section heading, concern, why it matters, suggested change if
known, and evidence or source. Submit feedback through
[GitHub Issues](https://github.com/jaydubya818/ai-software-factory-mastery/issues).

## Review decision

A chapter advances from review ready to validated only after material feedback
is resolved, references are current, internal links and rendering pass, and the
defined exercise or evidence review succeeds. Editorial approval cannot convert
future architecture into a current implementation claim.

## Role-based walkthroughs

Use four independent passes and record findings through the feedback labels:

1. **Architect:** Trace one authorized change across lifecycle, plane,
   component, trust boundary, and record.
2. **Builder:** Implement or review one capability contract and failure path
   without inventing identity, retry, evidence, or lifecycle semantics.
3. **Security:** Challenge authority, indirect instructions, external
   capability, emergency control, and evidence independence.
4. **Operations:** Define SLOs and budgets, inject an ambiguous side effect,
   and trace detection through verified closure.

These walkthroughs are required external review work. Their presence here does
not claim they have already passed.
