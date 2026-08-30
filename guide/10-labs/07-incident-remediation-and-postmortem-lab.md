---
title: Incident Remediation and Postmortem Lab
status: review-ready
audience: [platform, sre, security, senior-engineer, ai-engineer]
last_verified: 2026-08-30
lifecycle: [execute, verify, deliver, learn]
risk: critical
lab_type: executable
topics: [incident-response, root-cause-analysis, remediation, postmortem]
---

# Incident Remediation and Postmortem Lab

## Objective

Use agents to accelerate evidence collection and correction while preserving incident authority, forensic integrity, and clear separation between observation, hypothesis, containment, and root cause.

## Prerequisites and starting state

Use a synthetic incident in a disposable service. Prepare logs, traces, metrics, recent changes, one misleading correlation, and one reversible containment action.

## Required implementation

1. Create an incident record with severity, owner, affected scope, timeline, and communication channel.
2. Collect evidence without modifying the affected system.
3. Label observations, hypotheses, confidence, and missing data.
4. Obtain authority for one bounded containment action and record its effect.
5. Reproduce the failure, establish root cause, create corrective work, and verify the fix independently.
6. Validate recovery in the simulated production environment.
7. Produce a blameless postmortem with contributing conditions, detection gap, decision timeline, corrective owners, and learning candidates.

## Required failure

The first agent hypothesis must follow the misleading correlation. The workflow must reject it when a counterfactual or timeline check fails, preserving the rejected hypothesis rather than rewriting the narrative.

## Evidence and pass criteria

Retain the timeline, queries, hypothesis ledger, containment approval, reproduction, change, validation, recovery, postmortem, and improvement candidates. The lab fails if a plausible explanation is promoted without causal evidence or if the agent takes emergency action outside its scope.

## Cleanup

Remove synthetic incident data and disposable resources. Preserve a redacted evidence bundle.
