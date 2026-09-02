---
title: Developer Portal, Service Catalog, and Golden Paths
status: review-ready
audience: [executive, architect, platform, product, senior-engineer]
last_verified: 2026-08-30
lifecycle: [intent, plan, execute, verify, deliver, learn]
risk: variable
topics: [developer-portal, service-catalog, golden-paths, self-service]
---

# Developer Portal, Service Catalog, and Golden Paths

## Quick Read

- **Purpose:** Treat the software factory as an internal product that developers and agents can discover, understand, and use safely.
- **Best for:** Platform leaders, product managers, architects, and engineering executives.
- **Prerequisites:** [Enterprise Adoption and Factory Maturity](../03-operating-model/04-enterprise-adoption-and-factory-maturity-model.md).
- **Reading time:** 14 minutes.
- **You will learn:** How portals, catalogs, templates, and golden paths create self-service without hiding authority or flexibility.
- **Keep three ideas:** the portal is a view, not the source of truth; golden paths are supported products; and adoption is an outcome measure.

## 1. The problem

A sophisticated factory can fail because builders cannot determine which workflow applies, what a capability does, why work is blocked, or who owns the next decision. Teams then bypass the system, create shadow integrations, or depend on platform specialists. Agents face the same discoverability problem through APIs and tools.

## 2. Why the problem exists

Platform architecture is usually organized by services while users think in outcomes: fix this defect, onboard this repository, approve this plan, recover this run. Ownership and documentation drift across systems. Portals can become decorative dashboards if their actions do not map to authoritative APIs.

## 3. Enduring Principle

### Operate the factory as an internal product

Define target users, journeys, service levels, adoption measures, support, feedback, and roadmap. The platform team owns ease of safe use; consuming teams retain responsibility for product intent and domain risk.

### Use one catalog for human and agent discovery

The catalog connects services, repositories, owners, workflows, capabilities, environments, APIs, schemas, runbooks, evidence, maturity, and dependencies. Humans browse through a portal; agents query governed APIs. Both resolve to the same authoritative records and permissions.

### Build golden paths around outcomes

A golden path is a supported, paved route with templates, defaults, automated checks, observability, documentation, and an escape mechanism. Useful paths include repository onboarding, bounded feature delivery, dependency remediation, incident investigation, and progressive release.

Golden paths should expose their contract:

- supported scenarios and non-goals;
- required inputs and owners;
- generated or selected capabilities;
- authority and approval boundaries;
- expected evidence and service level;
- common failures and recovery; and
- extension points with compatibility obligations.

### Preserve an escape path

Teams need explicit extension and exception mechanisms. Extensions are versioned and tested; exceptions have owner, reason, scope, expiry, and compensating controls. Silent forks create platform fragmentation.

## 4. Tradeoffs and alternatives

Strong standardization improves reliability and can constrain legitimate domain needs. Build a small set of well-supported paths and measure where users exit them. A single portal improves discovery but must not become a second control plane. Generate views from authoritative services and keep write actions on governed APIs.

## 5. Current Mission Control Implementation

The current site and case-study implementation provide operator surfaces for intent, plans, workflows, evidence, approvals, runtime state, and review. The curriculum defines a capability map and authorized action parity.

It does not yet teach or demonstrate a complete internal developer portal, service catalog, self-service repository onboarding, golden-path ownership model, extension marketplace, or adoption analytics. These are product responsibilities around the architecture, not optional polish.

## 6. Future Vision

A builder should begin with an outcome, see eligible paths, understand authority and evidence before execution, follow progress, intervene safely, and receive a decision-ready result. The same catalog should allow an authorized agent to discover the exact API and capability without screen scraping or hidden routes.

## 7. Versioned references

- [Backstage Software Catalog](https://backstage.io/docs/features/software-catalog/), accessed 2026-08-30
- [DORA platform engineering](https://dora.dev/capabilities/platform-engineering/), accessed 2026-08-30
- [Human-Agent Operating Model](../03-operating-model/01-human-agent-operating-model.md)

## 8. Notes and lessons learned

Platform adoption is evidence about product fit. Requiring training and support may be reasonable; requiring specialists for routine use is a platform defect.

## 9. Design review questions

1. When does a portal become a shadow control plane?
2. What makes a golden path a product rather than a template?
3. How should teams extend a path safely?
4. Which adoption metrics reveal real value?
5. How do agents and humans share the same catalog?

## 10. Whiteboard exercise

Design the portal journey for onboarding a repository and running its first low-risk workflow. Map every page action to an authoritative API, state, permission, evidence requirement, owner, and recovery path.

## 11. Hands-on lab

Prototype or document one golden path using a service-catalog entry, workflow contract, capability bindings, owner, service level, error states, and feedback channel. Test it with a new user and an agent client. Record confusion, bypasses, and changes required before broader adoption.
