---
title: Capability Learning, Optimization, and Regression Control
status: review-ready
audience: [ai-engineer, quality, platform, product, architect]
last_verified: 2026-08-30
lifecycle: [learn, define, verify]
risk: high
topics: [prompt-optimization, skill-improvement, tool-optimization, learning-from-success]
---

# Capability Learning, Optimization, and Regression Control

## Quick Read

- **Purpose:** Turn failures, corrections, and successful strategies into controlled capability improvements.
- **Best for:** AI engineers, quality teams, platform owners, and product leaders.
- **Prerequisites:** [Governed Continuous Learning](../03-operating-model/03-governed-continuous-learning-and-recursive-improvement.md) and [Evaluation Science](06-evaluation-science-and-controlled-experimentation.md).
- **Reading time:** 14 minutes.
- **You will learn:** How to improve prompts, skills, tools, context, routing, and deterministic controls without self-authorized mutation.
- **Keep three ideas:** learn from success and failure; optimize the smallest causal component; and regression suites guard the whole capability graph.

## 1. The problem

Production runs contain valuable corrections, failures, efficient strategies, tool friction, and context gaps. Without a disciplined learning path, the same problems recur. With an uncontrolled path, the factory edits prompts or memory from noisy feedback, institutionalizes mistakes, and changes behavior without evaluation or rollback.

## 2. Why the problem exists

Outcomes are caused by interacting components. A failure blamed on the prompt may come from missing data, tool schema, environment, policy, or evaluator. Successful behavior may rely on accidental context or hidden human help. Production feedback is biased toward visible failures and vocal users.

## 3. Enduring Principle

### Normalize learning signals

Signals include human corrections, repeated instructions, context misses, tool errors, routing mismatches, retries, validation failures, incidents, review findings, cost anomalies, and successful low-attention strategies. Each records source, subject, severity, attribution, evidence, and uncertainty.

### Diagnose before optimizing

Cluster related signals and test causal hypotheses. Choose the smallest durable remedy:

- deterministic code or policy for rules that should not remain probabilistic;
- prompt or Agent Definition change for reasoning and communication behavior;
- skill update for reusable task method;
- tool change for missing or confusing capability;
- context or semantic change for unavailable or misunderstood knowledge;
- route change for capability, latency, availability, or cost mismatch;
- evaluator or dataset change for measurement failure; or
- workflow change for incorrect decomposition, authority, or recovery.

### Learn from success carefully

Compare successful runs to matched baselines. Identify strategies associated with acceptance, low retry, low cost, low review effort, and safe recovery. Do not copy private data, incidental repository text, or one-off reasoning into standing instructions.

### Optimize through governed experiments

An improvement candidate names hypothesis, affected components, baseline, expected benefit, risk, dataset, metrics, guardrails, scope, rollback, and owner. Offline evaluation precedes canary. Promotion creates new immutable capability and Factory Versions; it never edits historical runs.

### Protect against regression and reward hacking

Run broad regression, adversarial, security, policy, cost, and human-factor suites. Monitor for metric gaming, longer hidden work, evaluator agreement without real correctness, and improvements that shift burden to reviewers or production.

## 4. Tradeoffs and alternatives

Frequent optimization adapts quickly and creates version churn. Batch low-severity signals while escalating critical ones immediately. Automated prompt search can explore more candidates and overfit evaluators. Manual improvement is explainable and slower. Use controlled search with untouched holdouts and human promotion.

## 5. Current Mission Control Implementation

The current guide defines learning signals, clusters, improvement candidates, governed experiments, promotion recommendations, recursive-improvement boundaries, trust changes, and versioned configuration. It identifies prompts, skills, tools, context, routing, evaluators, and deterministic controls as possible targets.

It does not yet demonstrate a complete production optimization service, success-pattern analysis, prompt or tool experimentation, holdout protection, automated regression attribution, or promotion and rollback across the capability registry.

## 6. Future Vision

The learning system should surface recurring, attributable patterns and propose the smallest remedy. Operators compare expected effect, evidence, risk, and blast radius. Successful experiments create new certified capabilities; regressions automatically stop canaries or demote eligibility under policy.

## 7. Versioned references

- [Governed Continuous Learning and Recursive Improvement](../03-operating-model/03-governed-continuous-learning-and-recursive-improvement.md)
- [Compounding Engineering and Human Attention](../03-operating-model/05-compounding-engineering-and-human-attention.md)
- [Capability Evaluation, Certification, Promotion, and Retirement](../agent-factory/03-capability-evaluation-certification-promotion-and-retirement.md)

## 8. Notes and lessons learned

The best improvement often removes an agent decision by making a rule deterministic, a tool clearer, or required context reliably available.

## 9. Design review questions

1. When should a correction become a skill versus code?
2. How do you learn from successful runs without copying accidents?
3. What protects prompt optimization from overfitting?
4. How can a metric improvement increase total human cost?
5. Which regressions should stop a canary automatically?

## 10. Whiteboard exercise

Take ten similar validation failures and five successful runs. Design clustering, causal diagnosis, three candidate remedies, an experiment, hard gates, promotion, and rollback. Explain why one remedy is the smallest durable change.

## 11. Hands-on lab

Use a synthetic trace set. Create learning signals, cluster them, propose one prompt, skill, tool, or deterministic improvement, and compare it with a baseline on development and holdout cases. Retain the candidate, evaluation, decision, version diff, and rollback plan.
