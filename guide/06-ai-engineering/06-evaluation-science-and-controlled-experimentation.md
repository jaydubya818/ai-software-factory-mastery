---
title: Evaluation Science and Controlled Experimentation
status: review-ready
audience: [ai-engineer, quality, architect, product, data]
last_verified: 2026-08-30
lifecycle: [verify, learn]
risk: high
topics: [evaluation-datasets, calibration, statistical-confidence, adversarial-evals]
---

# Evaluation Science and Controlled Experimentation

## Quick Read

- **Purpose:** Add experimental rigor to repeatable agent evaluation and promotion decisions.
- **Best for:** AI evaluation, data, quality, product, and platform teams.
- **Prerequisites:** [Evaluation Engineering, Trace Replay, and Run Comparison](04-evaluation-engineering-trace-replay-and-run-comparison.md).
- **Reading time:** 16 minutes.
- **You will learn:** Dataset governance, contamination control, grader calibration, repeated trials, uncertainty, adversarial evaluation, and online experiments.
- **Keep three ideas:** one run is an anecdote; graders require evaluation; and promotion decisions need uncertainty and guardrails.

## 1. The problem

Agent evaluations can produce precise scores from unrepresentative tasks, contaminated examples, unstable graders, or too few trials. Teams then optimize prompts and models to the benchmark while real completion, review burden, cost, and production safety regress.

## 2. Why the problem exists

Agent behavior varies with model, prompt, tools, context, environment, repository, seed, and evaluator. Some tasks have objective tests; others require judgment. Production tasks change over time and contain sensitive data. Reusing traces for development, tuning, and final evaluation leaks answers into the measurement system.

## 3. Enduring Principle

### Govern evaluation datasets

Maintain source, consent or allowed use, owner, schema, task distribution, risk, difficulty, expected result, hidden checks, version, splits, retention, and known limitations. Separate development, regression, certification, adversarial, and holdout sets. Detect duplicates and benchmark contamination across prompts, skills, memory, and training inputs.

### Evaluate evaluators

Deterministic checks define clear claims. Human rubrics require examples, anchors, reviewer training, blind assignment, disagreement handling, and inter-rater agreement. Model graders require versioned prompts, calibration against expert labels, position and verbosity bias tests, adversarial cases, and periodic reevaluation.

### Measure variability

Run repeated trials where stochasticity matters. Report sample size, success distribution, confidence interval or uncertainty, severity, retry rate, latency, cost, and human intervention. Paired comparisons on the same tasks usually reveal differences more efficiently than unrelated aggregates.

### Protect hard gates

Aggregate performance cannot compensate for unauthorized action, critical security failure, evidence fabrication, data loss, or another noncompensable condition. Segment results by workflow, repository class, risk, capability graph, and environment to avoid hiding failures.

### Use a controlled promotion ladder

Progress from offline development to holdout evaluation, adversarial testing, shadow execution, limited canary, controlled comparison, and broader eligibility. Define success, noninferiority or improvement threshold, guardrails, sample, duration, stop conditions, approval, and rollback before starting.

## 4. Tradeoffs and alternatives

Large datasets increase coverage and maintenance. Small curated sets are explainable and easier to overfit. Human judgment captures nuance and costs time. Model graders scale and share failure modes with evaluated systems. Online experiments improve realism and require strict user, data, and risk controls.

## 5. Current Mission Control Implementation

The current curriculum covers representative cohorts, baselines and candidates, trace replay, criterion-level receipts, canaries, model routing, evaluation datasets, and promotion. It does not yet specify contamination controls, grader calibration, agreement, repeated-trial analysis, statistical decision rules, shadow experiments, or a full adversarial-evaluation program.

## 6. Future Vision

Evaluation runs should be reproducible experiments with registered hypotheses, frozen configurations, datasets, graders, metrics, and decision rules. The platform should calculate uncertainty, expose segment regressions, prevent holdout leakage, and produce a promotion packet that separates evidence from judgment.

## 7. Versioned references

- [NIST AI Resource Center](https://airc.nist.gov/), accessed 2026-08-30
- [OpenAI Agents SDK tracing](https://openai.github.io/openai-agents-python/tracing/), accessed 2026-08-30
- [Model Routing and Capability Selection](02-model-routing-evaluations-and-capability-selection.md)

## 8. Notes and lessons learned

Evaluation engineering builds the machinery to run and compare systems. Evaluation science establishes whether the comparison supports the decision being made.

## 9. Interview and discussion questions

1. How do you detect benchmark contamination?
2. When do repeated trials matter?
3. How do you calibrate a model grader?
4. Why can aggregate improvement hide unacceptable regression?
5. What belongs in a predeclared experiment plan?

## 10. Whiteboard exercise

Design an experiment comparing two agent configurations on 200 tasks across three risk classes. Add grader disagreement, a security hard-gate failure, cost improvement, and one segment regression. Make the promotion decision.

## 11. Hands-on lab

Create a small versioned dataset with development and hidden holdout splits. Run repeated comparisons for two configurations, calibrate one judge against human labels, report uncertainty and segments, and write a promotion decision that preserves hard gates and limitations.
