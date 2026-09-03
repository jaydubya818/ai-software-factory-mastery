---
title: Initial AI Software Factory Research Canon
status: active
audience: [architect, senior-engineer, platform, security, quality, product, ai-engineer]
last_verified: 2026-09-03
last_reviewed: 2026-09-03
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
| [Anthropic: Trustworthy Agents in Practice](https://www.anthropic.com/research/trustworthy-agents) | Study the agent loop, meaningful human control, transparency, privacy, and security as autonomy increases. |
| [Anthropic: Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | Study context selection, compaction, memory, and long-running agent behavior. |
| [Model Context Protocol specification](https://modelcontextprotocol.io/specification/2026-07-28) | Use the authoritative protocol for hosts, clients, servers, tools, resources, authorization, and versioning. |
| [Agent Client Protocol](https://zed.dev/acp) | Study the editor-to-agent boundary, transport model, capability negotiation, and version-compatibility responsibilities. |
| [AG-UI documentation](https://docs.ag-ui.com/) | Study event-based agent-to-user-interface integration, streaming state, human interaction, and protocol interoperability. |
| [Agent2Agent Protocol specification](https://a2a-protocol.org/dev/specification/) | Study agent discovery, tasks, messages, artifacts, streaming, and long-running agent-to-agent collaboration. |
| [OpenAI Agents SDK](https://developers.openai.com/api/docs/guides/agents) | Study agent definitions, orchestration, guardrails, state, tracing, and evaluation. |
| [OpenAI: A Practical Guide to Building Agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) | Study agent selection, models, tools, instructions, orchestration, layered guardrails, evaluation baselines, and human intervention. |
| [OpenAI Responses API](https://platform.openai.com/docs/api-reference/responses) | Study tool-using model execution and durable application integration. |
| [OpenAI: Unrolling the Codex Agent Loop](https://openai.com/index/unrolling-the-codex-agent-loop/) | Study the relationship among the model, harness, tools, context, and execution loop. |
| [Claude Code: Run programmatically](https://code.claude.com/docs/en/headless) | Study headless coding-agent invocation, structured output, session continuity, and automation boundaries as a dated product case. |
| [Claude Code hooks reference](https://code.claude.com/docs/en/hooks) | Study lifecycle interception, policy checks, event capture, and the risks of shell-level automation as a dated product case. |
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
| [GitHub Spark](https://docs.github.com/en/copilot/concepts/spark) | Study natural-language application creation and deployment as a comparison case, not as the definition of a factory. |
| [GitHub Actions](https://docs.github.com/en/actions) | Study repository-native automation, runners, environments, permissions, CI, and deployment controls. |
| [GitHub merge queues](https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue) | Study current-head validation, required checks, queue batching, and protected-branch admission. |
| [GitHub stacked pull requests](https://docs.github.com/en/pull-requests/get-started/about-stacked-prs) | Study dependent change review and the coordination costs of ordered pull-request chains. |
| [Git submodules](https://git-scm.com/docs/gitsubmodules) | Study commit-pinned repository composition and its checkout, update, publication, and ownership tradeoffs. |
| [Git subtree](https://github.com/git/git/tree/master/contrib/subtree) | Study copied-history repository composition and contrast it with submodules and coordinated repositories. |
| [Devfile schema](https://devfile.io/docs/2.3.0/devfile-schema) | Study declarative development-environment components, commands, events, resources, and portability. |
| [CodeRabbit pull-request review](https://docs.coderabbit.ai/overview/pull-request-review) | Study automated review as a dated product case, including incremental review and human resolution boundaries. |
| [Convex overview](https://docs.convex.dev/understanding/overview) | Study the reactive database, transactional server functions, scheduling, and durable application state used by Mission Control. |
| [Convex functions](https://docs.convex.dev/functions/overview) | Distinguish queries, mutations, actions, transactions, and external side effects. |
| [Hono documentation](https://hono.dev/docs) | Study the web-standard orchestration boundary used by Mission Control for long-running runtime integration. |

## Data, knowledge, retrieval, and semantics

| Source | Initial use |
| --- | --- |
| [Retrieval-Augmented Generation paper](https://arxiv.org/abs/2005.11401) | Study the original retrieval-plus-generation formulation and separate research results from production retrieval engineering. |
| [Dense Passage Retrieval paper](https://arxiv.org/abs/2004.04906) | Study learned dense retrieval and compare it with lexical and hybrid retrieval under domain-specific evaluation. |
| [Robertson and Zaragoza: The Probabilistic Relevance Framework](https://www.staff.city.ac.uk/~sbrp622/papers/foundations_bm25_review.pdf) | Study BM25 and the assumptions behind lexical relevance scoring. |
| [Cormack, Clarke, and Buettcher: Reciprocal Rank Fusion](https://dl.acm.org/doi/10.1145/1571941.1572114) | Study a simple method for combining ranked retrieval results without treating fusion as proof of relevance. |
| [W3C SKOS Reference](https://www.w3.org/TR/skos-reference/) | Study standards for controlled vocabularies, taxonomies, thesauri, labels, mappings, and concept schemes. |
| [W3C PROV-O](https://www.w3.org/TR/prov-o/) | Study a standard model for representing entity, activity, and agent provenance across transformed knowledge. |

## Evaluation, quality, reliability, and systems

| Source | Initial use |
| --- | --- |
| [SWE-bench paper](https://arxiv.org/abs/2310.06770) | Study repository-level evaluation design and the limits of reducing software engineering to issue resolution. |
| [SWE-bench repository](https://github.com/SWE-bench/SWE-bench) | Inspect current harnesses, datasets, variants, and reproducibility mechanisms. |
| [NIST Secure Software Development Framework](https://csrc.nist.gov/projects/ssdf/) | Study requirements, design review, verification, provenance, vulnerability response, and continuous improvement across the SDLC. |
| [NIST SP 800-218A](https://csrc.nist.gov/pubs/sp/800/218/a/final) | Study the AI-specific community profile for securing generative-AI model development across the software lifecycle. |
| [NIST AI Risk Management Framework Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | Study documented TEVV, independent assessment, production monitoring, and AI risk decisions. |
| [SLSA specification](https://slsa.dev/spec/v1.2/) | Study source and build provenance, hardened build levels, artifact verification, and supply-chain threat boundaries. |
| [in-toto Attestation Framework](https://github.com/in-toto/attestation) | Study typed, verifiable claims bound to immutable software subjects by digest. |
| [DSSE](https://github.com/secure-systems-lab/dsse) | Study a typed signing envelope that avoids application-level canonicalization. |
| [SPDX 3.0](https://spdx.dev/use/specifications/) | Study the current ISO-standard family for software bill-of-material and supply-chain data. |
| [CycloneDX 1.7](https://cyclonedx.org/specification/overview/) | Study the current CycloneDX BOM model, lifecycle phases, and attestation predicate. |
| [Sigstore Cosign verification](https://docs.sigstore.dev/cosign/verifying/verify/) | Study identity-aware signature, attestation, timestamp, and transparency verification. |
| [RFC 8785 JSON Canonicalization Scheme](https://www.rfc-editor.org/rfc/rfc8785.html) | Study deterministic JSON representation for repeatable hashing and signing, including its constraints. |
| [OMG Structured Assurance Case Metamodel](https://www.omg.org/spec/SACM/About-SACM) | Study formal relationships among claims, arguments, evidence, context, and counterclaims. |
| [Anthropic: Demystifying Evals for AI Agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | Study tasks, trials, graders, assertions, transcripts, evaluation layers, and production feedback for agents. |
| [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/) | Study prompt injection, excessive agency, supply-chain, output-handling, and resource risks for AI-enabled systems. |
| [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/initiatives/agentic-security-initiative/) | Study risks and mitigations specific to autonomous, tool-using, multi-step agent systems and MCP integrations. |
| [OpenTelemetry Signals](https://opentelemetry.io/docs/concepts/signals/) | Study correlated traces, metrics, logs, and baggage for production evidence. |
| [OpenTelemetry Semantic Conventions 1.43.0](https://opentelemetry.io/docs/specs/semconv/) | Study shared telemetry vocabulary. Pin versions: CI/CD is release-candidate and GenAI conventions are moving/developing, so do not make them the authoritative factory schema. |
| [NASA Systems Engineering Handbook Appendix](https://www.nasa.gov/reference/system-engineering-handbook-appendix/) | Study clear, singular, traceable, verifiable requirements and verification/validation matrices. |
| [NASA Product Realization](https://www.nasa.gov/reference/5-0-product-realization/) | Study the distinction between objective verification and validation in the intended environment. |
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

## Practitioner talks, livestreams, and public engineering posts

Several chapters cite material that did not come from a paper, a spec, or
vendor documentation: public conference talks, engineering blog posts, and
one livestream. This section is a provenance record for that material —
what each citation actually is, and a direct link wherever one could be
independently confirmed live. It is not full provenance in the sense of a
link for every row: several of these were named to us without a URL, and a
few sit behind an explicit request from the speaker not to be linked (see
the anonymized-label note below); those are recorded as precisely as we can
without guessing at a link.

| Source | What it is | Link | Chapters that draw on it |
| --- | --- | --- | --- |
| Uber Engineering, *Running a Software Factory Efficiently at Uber Scale* | Public engineering blog post and AI Engineer 2026 conference talk, published August 2026, byline @udaykiran. Public, named scale figures (pull requests attributed to agents, skills built, cost-per-session trend) and the six-term cost equation. | [uber.com/us/en/blog/efficient-software-factory](https://www.uber.com/us/en/blog/efficient-software-factory/) (confirmed live 2026-09-03) | Chapters 8, 13, 17, 18, 31 |
| *The 4 Layers of an Agent System Explained* | Public post with an accompanying infographic (credited to Databricks), published September 2026. Loop, Graph, Harness, and Meta-harness as nested layers, with Omnigent cited as one open-source meta-harness implementation. | No stable URL confirmed for the infographic post itself. Databricks has published closely related material on the same architecture: [Omnigent, a meta-harness](https://www.databricks.com/blog/introducing-omnigent-meta-harness-combine-control-and-share-your-agents) and [What is an AI Agent Harness?](https://www.databricks.com/blog/ai-harness) (both confirmed live 2026-09-03) | Chapters 13, 18, 31 |
| *Six layers of a working agentic system* | Public post and infographic, 2026, unsigned. A six-layer stack from trigger through runtime and operations, framed around the production question each layer answers. | No URL confirmed; a search for the content turned up substantially the same six-layer model published under a vendor name on our exclusion list, which is almost certainly why this was handed to us unsigned. We are not linking that source and are not aware of an independent public post to link instead. | Chapters 8, 17 |
| Warp, *Closing the loop with self-improving cloud software factories* | Public post, published August 2026. Factory-as-code, the closed loop of factory agents, scorer agents, and self-improvement agents, and the PR-throughput/cost/automation-percent metric set. | No warp.dev post under this exact title was confirmed. The closest verified match on factory-as-code and self-improvement loops is [A guide to cloud software factories for engineering leaders](https://www.warp.dev/blog/a-guide-to-cloud-software-factories-for-engineering-leaders) (confirmed live 2026-09-03), but it does not cover scorer agents or the specific metric set, so the fuller synthesis likely also draws on a Warp talk or post we could not independently locate. | Chapters 8, 23, 27 |
| *What Is Loop Engineering?* | Public explainer post, published June 2026, unsigned. The loop-versus-chain distinction, the ReAct origin, the five-part loop anatomy, and the four loop patterns (retry, plan-execute-verify, explore-narrow, human-in-the-loop). | No URL confirmed. | Chapter 18 |
| HumanLayer × BAML livestream, "Software factory design patterns" | Public livestream conversation between Dexter (HumanLayer) and Vaibhav (BAML), 2026. Inner/outer harness terminology, the control plane as an underserved layer, routing by task, and the prototype-to-sliced-PR review workflow. | No URL confirmed for the recording. | Chapters 6, 10, 11, 13, 17, 27, 31 |
| IndyDevDan, "Software factories give leverage on your prompt" and "Engineering Time, Focus and Attention" | Public practitioner talks/posts, 2026. The agentic operating level and the argument that a factory's payoff is capacity freed for exploration, not raw speed. | No URL confirmed. | Chapters 1, 8, 18, 20 |
| Luke (Goose / Factory), "Multi-agent systems and the bottleneck of human attention" | Public practitioner talk, 2026. Human attention as the binding constraint on multi-agent systems. | No URL confirmed. | Chapters 8, 18, 20 |
| 0xCodez, "Graph engineering: the 14-step roadmap from linear chains to routed, branching, parallel graphs" | Public practitioner talk, 2026. | No URL confirmed. | Chapter 18 |
| Tessl documentation and public tutorials | Public vendor documentation and tutorials, 2026: skill schemas, with/without skill evaluation, and the scenario-generation and skill-optimizer patterns. | [docs.tessl.io](https://docs.tessl.io/) (root confirmed live 2026-09-03; specific pages not individually verified) | Chapters 10, 23 |

**"Public practitioner talks, 2026."** A recurring, deliberately anonymized
citation covering several additional 2026 public conference talks and
technical explainer posts on software-factory practice — skills, loops, and
harness engineering; risk-based autonomy and review compression; signal-to-
outcome architecture and verification contracts; model routing and factory
economics; and code review at scale. The speakers asked not to be named or
linked in this guide, and their employers' internal product names are
excluded per that same request; the ideas are presented as the guide's own
synthesis rather than attributed to an individual or a venue. Where a claim
from this pool carries a specific public number or measurement, the chapter
says so and names the narrower source (usually Uber Engineering, above)
instead of using this label. Sections D, E, and F of the pass-8 source
synthesis (2026-09-02, held with the guide's working notes) are the
underlying transcripts this label draws on.

## Mission Control

Mission Control is the primary implementation case study. Study notes must
reference the exact commit, relevant product decision or ADR, source paths,
tests, observed browser or runtime behavior, and known gaps. Mission Control
documentation is evidence about Mission Control. It is not the universal
definition of an AI Software Factory.

In addition to the versioned source paths cited inline, several chapters draw
on Jay West's own unpublished working material: the *AI Software Factory
Mission* statement, the *AI Software Factory Study Guide* (a chaptered
internal curriculum), a set of factory-architecture notes, and the Mission
Control repository's own glossary and lexicon (reviewed 2026-09-02). These
are primary-author source material — the same status as interview notes —
not independently published references, and are cited as such rather than
implied to be external literature.

## Canon maintenance

Review framework, product, and protocol links at least quarterly. Pin
specification versions when a chapter depends on exact behavior. Preserve the
access date and distinguish historical documents from current guidance.

Add a source only when it improves the ability to design, build, operate,
govern, evaluate, lead, teach, or defend an AI Software Factory. Popularity
alone is not a reason for inclusion.
