---
title: Initial AI Software Factory Research Canon
status: active
last_reviewed: 2026-08-11
---

# Initial AI Software Factory Research Canon

This canon establishes the first body of sources for the guide. It is not a
claim that every source is correct or equally authoritative. It identifies the
materials that should be studied, compared, tested, and challenged.

Primary sources take precedence over commentary. Vendor documentation is
primary evidence for what a vendor specifies or claims. It is not independent
proof that the capability works in every environment. Benchmarks, research,
tests, and direct operation supply different forms of evidence.

## Agent engineering and protocols

| Source | Initial use |
| --- | --- |
| [Anthropic: Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) | Distinguish workflows from agents and study orchestration patterns. |
| [Anthropic: Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | Study context selection, compaction, memory, and long-running agent behavior. |
| [Model Context Protocol specification](https://modelcontextprotocol.io/specification/2026-07-28) | Use the authoritative protocol for hosts, clients, servers, tools, resources, authorization, and versioning. |
| [OpenAI Agents SDK](https://developers.openai.com/api/docs/guides/agents) | Study agent definitions, orchestration, guardrails, state, tracing, and evaluation. |
| [OpenAI Responses API](https://developers.openai.com/api/docs/guides/responses) | Study tool-using model execution and durable application integration. |
| [OpenAI: Unrolling the Codex Agent Loop](https://openai.com/index/unrolling-the-codex-agent-loop/) | Study the relationship among the model, harness, tools, context, and execution loop. |
| [OpenAI: Harness Engineering](https://openai.com/index/harness-engineering/) | Examine an agent-first engineering environment as an industry case study, separating reported experience from independently verified general law. |
| [Google DeepMind research](https://deepmind.google/research/) | Track primary agent, evaluation, multi-agent, and safety research. |
| [Google DeepMind: Co-Scientist](https://deepmind.google/blog/co-scientist-a-multi-agent-ai-partner-to-accelerate-research/) | Study specialization, debate, ranking, and human accountability in a multi-agent system outside software engineering. |
| [Microsoft AutoGen](https://microsoft.github.io/autogen/) | Study event-driven and conversational single- and multi-agent runtimes. |
| [Microsoft Semantic Kernel Agent Framework](https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/) | Study enterprise agent abstractions and orchestration patterns; record experimental status where applicable. |
| [LangGraph](https://docs.langchain.com/oss/python/langgraph/overview) | Study durable execution, persistence, human-in-the-loop control, and low-level agent orchestration. |

## Software engineering platforms and runtimes

| Source | Initial use |
| --- | --- |
| [GitHub Copilot concepts](https://docs.github.com/en/copilot/concepts) | Track the boundary among assistants, coding agents, enterprise controls, memory, and agent management. |
| [GitHub Agentic Workflows](https://docs.github.com/en/copilot/concepts/agents/about-github-agentic-workflows) | Study natural-language automation compiled into permissioned GitHub Actions workflows. |
| [GitHub Spark](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/spark) | Study natural-language application creation and deployment as a comparison case, not as the definition of a factory. |
| [GitHub Actions](https://docs.github.com/en/actions) | Study repository-native automation, runners, environments, permissions, CI, and deployment controls. |
| [Convex overview](https://docs.convex.dev/understanding/overview) | Study the reactive database, transactional server functions, scheduling, and durable application state used by Mission Control. |
| [Convex functions](https://docs.convex.dev/functions/overview) | Distinguish queries, mutations, actions, transactions, and external side effects. |
| [Hono documentation](https://hono.dev/docs) | Study the web-standard orchestration boundary used by Mission Control for long-running runtime integration. |

## Evaluation, quality, reliability, and systems

| Source | Initial use |
| --- | --- |
| [SWE-bench paper](https://arxiv.org/abs/2310.06770) | Study repository-level evaluation design and the limits of reducing software engineering to issue resolution. |
| [SWE-bench repository](https://github.com/SWE-bench/SWE-bench) | Inspect current harnesses, datasets, variants, and reproducibility mechanisms. |
| [NIST Secure Software Development Framework](https://csrc.nist.gov/projects/ssdf) | Study requirements, design review, verification, provenance, vulnerability response, and continuous improvement across the SDLC. |
| [NIST AI Risk Management Framework Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | Study documented TEVV, independent assessment, production monitoring, and AI risk decisions. |
| [SLSA specification](https://slsa.dev/spec/v1.2/) | Study source and build provenance, hardened build levels, artifact verification, and supply-chain threat boundaries. |
| [in-toto Attestation Framework](https://github.com/in-toto/attestation) | Study typed, verifiable claims bound to immutable software subjects by digest. |
| [OMG Structured Assurance Case Metamodel](https://www.omg.org/spec/SACM/About-SACM) | Study formal relationships among claims, arguments, evidence, context, and counterclaims. |
| [Anthropic: Demystifying Evals for AI Agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | Study tasks, trials, graders, assertions, transcripts, evaluation layers, and production feedback for agents. |
| [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/) | Study prompt injection, excessive agency, supply-chain, output-handling, and resource risks for AI-enabled systems. |
| [OpenTelemetry Signals](https://opentelemetry.io/docs/concepts/signals/) | Study correlated traces, metrics, logs, and baggage for production evidence. |
| [DORA software delivery performance metrics](https://dora.dev/guides/dora-metrics/) | Study delivery throughput and instability without substituting activity metrics for outcomes. |
| [Google Site Reliability Engineering books](https://sre.google/books/) | Study reliability, toil, service levels, incident response, monitoring, and production operations. |
| [Designing Data-Intensive Applications](https://martin.kleppmann.com/2017/03/27/designing-data-intensive-applications.html) | Develop durable reasoning about state, consistency, replication, streams, failure, and distributed-system tradeoffs. |

## Flow, organizations, and economics

| Source | Initial use |
| --- | --- |
| [The DevOps Handbook](https://itrevolution.com/books/) | Study flow, feedback, continuous learning, deployment systems, and organizational change. |
| [Accelerate](https://itrevolution.com/product/accelerate/) | Study evidence-backed software-delivery measures, causal reasoning, and organizational performance. |
| [Team Topologies](https://teamtopologies.com/book) | Study cognitive load, team boundaries, interaction modes, platforms, and fast flow. |
| [Toyota Production System](https://global.toyota/en/company/vision-and-philosophy/production-system/) | Study flow, quality at the source, just-in-time work, automation with a human touch, waste, and continuous improvement without forcing a literal manufacturing analogy onto software. |

## Mission Control

Mission Control is the primary implementation case study. Study notes must
reference the exact commit, relevant product decision or ADR, source paths,
tests, observed browser or runtime behavior, and known gaps. Mission Control
documentation is evidence about Mission Control. It is not the universal
definition of an AI Software Factory.

## Canon maintenance

Review framework, product, and protocol links at least quarterly. Pin
specification versions when a chapter depends on exact behavior. Preserve the
access date and distinguish historical documents from current guidance.

Add a source only when it improves the ability to design, build, operate,
govern, evaluate, lead, teach, or defend an AI Software Factory. Popularity
alone is not a reason for inclusion.
