---
title: How to read this guide
part: understand
chapter: 0
summary: What this guide is, who it is for, the three definitions and one-line factory it keeps returning to, the six-part journey, and the conventions used in every chapter.
absorbs: []
infographics: []
---

# How to read this guide

## What this is

This is a field guide to the **AI Software Factory**: an engineering system in which humans define intent and accept risk while bounded agents plan, implement, validate, and recover, and independent evidence decides what advances. It is written to be read front to back and retained, the way a good engineering handbook is retained: not as a list of features, but as a working model you can redraw on a whiteboard, defend to a skeptic, and use to make design decisions.

It is written down once and in order, drawing on what was learned building **Mission Control** — a control plane for human-directed, agent-executed software delivery — and on what the wider field has learned in parallel. It is written for anyone with the same problem: engineers who will build a factory, architects who must draw its boundaries, and executives who must decide whether to fund one and how to hold it accountable. The chapters do not talk down to any of these readers. They explain each idea in plain English first and then give it its precise name.

## The factory in one line

The whole book unfolds from one sentence:

> **Intent → Plan → Define Agent → Execute through Harness → Apply Skills → Evaluate → Improve → Deliver Software**

Read it as a value stream, not as eight boxes wired in series. *Intent* is what a builder wants and why. *Plan* is a versioned, approvable proposal for how to achieve and prove it. *Define Agent* means binding an approved, versioned agent configuration to the work, not inventing a new agent for every task. *Execute through Harness* is bounded execution inside a runtime that owns tools, state, permissions, budgets, and stop conditions. *Apply Skills* means the reusable methods selected and frozen before execution are used inside that loop. *Evaluate* is independent evidence about both the artifact and the path that produced it. *Improve* turns evaluation and production outcomes into governed candidates for future runs. *Deliver Software* covers the decision, the release, the production observation, and the measured outcome, not merely an opened pull request.

## Three definitions to retain

Three terms carry the book. Keep them apart.

**Agent Factory** creates, versions, evaluates, publishes, and governs reusable capabilities such as agents, skills, tools, model profiles, and configurations.

**AI Software Factory** composes people, policy, capabilities, execution, verification, delivery, and feedback from intent through validated production value.

**Mission Control** is the living implementation and case study for the control-plane responsibilities required to govern execution, evidence, and human authority. It is not the definition of the complete factory.

The Agent Factory supplies parts. The AI Software Factory turns governed intent into validated value using those parts. Mission Control is one concrete control plane, studied with its gaps visible.

## The journey

The guide has six parts, and they are meant to be read in order because each answers a question the previous one raises.

**Part I, Understand**, explains why software engineering is changing, shows the whole factory in one view, and sets out the first principles of trust, evidence, and authority that every later chapter relies on.

**Part II, Design**, covers what must exist before any agent runs: the human–agent operating model, the authoritative records from company to release, intent and specification engineering, governance and risk-proportional approval, the economics of human attention, and multi-repository design.

**Part III, Build**, assembles the machine: the Agent Factory, the control plane and execution plane, durable execution, coding harnesses and protocols, environments and compute, the agent loop with its tools, context, and memory, data and knowledge engineering, model routing, loop engineering, the twelve-layer production stack, and autonomous workflows.

**Part IV, Prove**, is how you know the output is correct, safe, and releasable: quality and evidence architecture, testing strategy, evaluation engineering, proof packages and certificates, CI/CD and progressive delivery, and security.

**Part V, Operate**, runs the factory as a production platform: platform engineering, observability and forensics, resilience and incidents, control surfaces and storage, and enterprise adoption.

**Part VI, Improve**, closes the loop without letting the factory authorize itself: production feedback and the agentic merge queue, governed learning, Mission Control as a case study, mastering and explaining the factory, and where the field is heading.

## Conventions

Every chapter follows the same shape: the problem, how it works, how to build it, failure modes, a short and honest "In Mission Control" section, a "Retain this" summary, and "Go deeper" pointers. A few conventions run throughout.

A term appears in **bold** the first time it is defined, and the [glossary](../appendix/glossary.md) holds the canonical wording. Diagrams are drawn in Mermaid and show mechanism: boxes are components or records, arrows are contracts or state transitions. Where a concept is obviously visual, a stack, a lifecycle, a loop, a hierarchy, the chapter marks an **infographic slot** for Jay's own graphic; until it arrives, the Mermaid diagram beneath the slot carries the same idea.

The **"In Mission Control" rule** is an honesty rule. Everything the guide claims about what Mission Control actually does lives in that one section per chapter, pinned to a specific commit, and labelled implemented, partial, or future. A proposal, a demo, or an agent's own assertion that something works is never presented as proven capability. The same standard the factory applies to agents applies to the book's claims about the factory.

**"Retain this"** at the end of each chapter is the handful of sentences worth being able to recite. If you remember nothing else from a chapter, remember those.

## The appendices

The appendices are reference, not sequence. The glossary is the canonical vocabulary.  The Mission Control case studies hold the versioned, evidence-mapped assessments that the "In Mission Control" sections summarize. The research canon lists the primary sources and source transcripts the book draws on. Coverage, maturity, changelog, and reviewer guide track the state of the guide itself, and the architecture communication appendix collects the ways of explaining all of this to a board, a CEO, a CFO, a CTO, and a developer.

Read the chapters in order. Reach for the appendices when a chapter sends you there or when you already know what you are looking for.

For a map of everything the guide covers and the chapter that owns each area, see [What this guide covers](./01-what-this-guide-covers.md).
