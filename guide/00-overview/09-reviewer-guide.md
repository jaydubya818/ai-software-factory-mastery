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

Review the material as a curriculum and architecture reference. Do not assume a
`review-ready` chapter describes a production-proven implementation. Current
implementation, future vision, and enduring principles are deliberately
separate claims.

## Recommended review paths

Choose one path rather than trying to read everything:

- **Architecture:** canonical boundaries, domain model, Agent Factory, runtime,
  verification, platform, and security.
- **Builder:** repository onboarding, capability resolution, workflow patterns,
  testing, delivery, and executable labs.
- **Operations and risk:** scheduling, resilience, threat model, identity,
  production verification, and incident response.
- **Curriculum and usability:** learning paths, topic discovery, terminology,
  progressive disclosure, exercises, and accessibility.

## Review checklist

For each chapter, ask:

1. Does the problem justify the proposed responsibility?
2. Are authority, identity, state, evidence, and failure ownership explicit?
3. Are enduring principle, current implementation, and future vision kept apart?
4. Is any current claim stronger than its source or evidence?
5. Which threat, operational failure, or tradeoff is missing?
6. Can the lab be executed safely and produce reviewable proof?
7. Is terminology consistent with the canonical glossary?
8. Can a reader explain what the component does not own?

## Feedback labels

Use one of these labels in the issue title or first line:

- `claim` — inaccurate, unsupported, stale, or overstated statement;
- `architecture` — missing or incorrect boundary, state, contract, or failure;
- `security` — threat, control, identity, data, or compliance issue;
- `curriculum` — missing prerequisite, sequencing, depth, or exercise;
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
