---
title: Agentic Threat Model and Adversarial Defense
status: review-ready
audience: [security, architect, ai-engineer, platform, senior-engineer]
last_verified: 2026-08-30
lifecycle: [plan, execute, verify, deliver]
risk: critical
topics: [prompt-injection, tool-misuse, memory-poisoning, adversarial-evaluation]
---

# Agentic Threat Model and Adversarial Defense

## Quick Read

- **Purpose:** Threat-model systems in which models interpret untrusted content and can take multi-step action through tools.
- **Best for:** Security engineers, platform architects, agent engineers, and technical risk owners.
- **Prerequisites:** [Security and Identity Architecture](02-security-and-identity-architecture.md) and [Agent Architecture](../06-ai-engineering/01-agent-architecture-mcp-tools-context-and-memory.md).
- **Reading time:** 16 minutes.
- **You will learn:** The major agentic attack classes, trust boundaries, preventive controls, detection, containment, and adversarial testing.
- **Keep three ideas:** content is not authority; tools are privilege boundaries; and memory can persist an attack beyond one run.

## 1. The problem

An agent reads code, issues, documentation, tool output, logs, websites, and messages that may contain adversarial instructions. It may then use credentials and tools across several steps. Traditional input validation does not fully address an interpreter that treats data as possible instruction and adapts its plan after every observation.

## 2. Why the problem exists

Natural-language channels mix intent, data, and control. Tool descriptions and schemas influence model behavior. Retrieved context and memory may cross trust zones. Agents can delegate to other agents, execute generated code, and combine individually permitted actions into an unsafe sequence. Probabilistic reasoning makes deny-list defenses brittle.

## 3. Enduring Principle

### Threat-model the complete action chain

Protect assets including source, secrets, customer data, credentials, artifacts, evidence, policy, registry entries, memory, and human attention. Mark trust boundaries among user input, repository content, retrieved knowledge, MCP servers, agent peers, models, sandboxes, control plane, and external systems.

Core abuse cases include:

- goal or instruction hijacking through direct or indirect prompt injection;
- malicious tool descriptions, schema manipulation, or poisoned tool output;
- excessive agency and unsafe action composition;
- identity, privilege, credential, or tenant-boundary abuse;
- context, retrieval, or durable-memory poisoning;
- supply-chain compromise of agents, skills, prompts, models, packages, or tools;
- unexpected code execution or sandbox escape;
- sensitive-data disclosure through prompts, logs, outputs, artifacts, or side channels;
- denial of service, denial of wallet, or retry amplification;
- inter-agent impersonation, delegation confusion, or authority laundering; and
- evidence tampering, evaluator manipulation, and approval deception.

### Keep instructions and authority out of untrusted content

Repository text, webpages, tool output, and memory are data. They cannot grant permission, alter the WorkOrder, disable policy, or approve a side effect. The deterministic control plane calculates authorized actions from identity, scope, policy, and current state.

### Constrain tools at execution time

Use typed schemas, allowlists, resource scoping, short-lived credentials, network policy, filesystem isolation, output validation, side-effect classification, confirmation for material actions, and independent event capture. Validate tool responses before they enter context or authoritative state.

### Add defense in depth around model decisions

Combine content provenance, trust labeling, context segmentation, instruction precedence, least privilege, sandboxing, policy checks, budgets, anomaly detection, independent verification, and human authority. A model-based guardrail may add signal; it is not the sole enforcement boundary.

### Test adversarially and retain forensics

Evaluation suites include malicious repositories, poisoned documentation, deceptive tool output, encoded exfiltration, chained low-risk actions, cross-tenant requests, compromised peers, and evaluator attacks. Preserve prompts subject to privacy policy, tool events, identities, decisions, artifacts, and containment actions.

## 4. Tradeoffs and alternatives

Strict isolation limits useful context and tool capability. Broad permissions increase success and blast radius. Risk-specific tool profiles and just-in-time elevation balance both. Recording full traces improves forensics and may expose sensitive data; redact, encrypt, restrict, and retain according to policy.

## 5. Current Mission Control Implementation

The current architecture includes policy, approvals, identity, scoped tools, sandboxes, network and secret boundaries, execution manifests, evidence, audit, supply-chain provenance, and prompt-injection discussion.

It does not yet present a complete agentic threat catalog, adversarial test corpus, memory-poisoning lifecycle, inter-agent trust model, denial-of-wallet controls, or exercised containment and forensic playbooks. This chapter establishes the security review baseline.

## 6. Future Vision

Every workflow and capability should carry an updated threat model and adversarial evaluation. Runtime policy should detect suspicious action sequences, quarantine affected memory or capabilities, revoke credentials, stop new admission, and create a forensic evidence bundle. Restoring service requires proof that the poisoned source and persistence path were removed.

## 7. Versioned references

- [OWASP Agentic Security Initiative](https://genai.owasp.org/initiatives/agentic-security-initiative/), accessed 2026-08-30
- [NIST AI Risk Management Framework resources](https://airc.nist.gov/), accessed 2026-08-30
- [Software Supply Chain Security](03-software-supply-chain-security-provenance-and-attestation.md)

## 8. Notes and lessons learned

Prompt injection is not merely a text-filtering problem. It is an authority-confusion problem whose impact depends on tools, identity, memory, and the surrounding control system.

## 9. Design review questions

1. Why can tool output be an attack vector?
2. How does memory poisoning change incident scope?
3. Which controls prevent authority laundering between agents?
4. How do you detect denial-of-wallet behavior?
5. What evidence is required before restoring a quarantined capability?

## 10. Whiteboard exercise

Threat-model an agent reading an untrusted repository with shell, browser, issue, and pull-request tools. Add a malicious instruction, poisoned tool server, leaked token, and verifier deception. Mark preventive, detective, containment, and recovery controls.

## 11. Hands-on lab

Use synthetic data and disposable credentials. Seed a repository and tool response with adversarial instructions. Prove that scope, tool policy, output validation, and independent verification prevent unauthorized effects. Capture the attempted chain, containment, forensic record, and one control gap.
