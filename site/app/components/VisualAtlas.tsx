import Link from "next/link";
import { ValueStream } from "./ValueStream";

const productionDisciplines = [
  ["01", "Business understanding", "Define the decision, owner, constraints, risk, and success criteria.", "Prevents solving the wrong problem."],
  ["02", "Data understanding", "Profile completeness, quality, freshness, sensitivity, lineage, and authority.", "Prevents unusable data from becoming agent context."],
  ["03", "Knowledge engineering", "Ingest, normalize, enrich, index, retrieve, rerank, cite, and revoke knowledge.", "Prevents weak retrieval and unattributed claims."],
  ["04", "Model engineering", "Qualify task-specific model profiles for generation, classification, routing, and verification.", "Prevents one-model-for-everything design."],
  ["05", "Context engineering", "Compile the smallest relevant instruction, code, state, memory, and knowledge package.", "Prevents context overload, omission, and leakage."],
  ["06", "Semantic engineering", "Normalize domain terms, identifiers, entities, relationships, and schema meaning.", "Prevents agents from acting on ambiguous strings."],
  ["07", "Agent engineering", "Bind role, objective, tools, skills, state, authority, budgets, and routing.", "Prevents capability from being mistaken for permission."],
  ["08", "Loop engineering", "Control evaluate, repair, retry, stop, and escalation behavior after every attempt.", "Prevents infinite, expensive, or unsafe iteration."],
  ["09", "Evaluation engineering", "Build representative cases, calibrated graders, trials, comparisons, and regression gates.", "Prevents demo success from becoming a quality claim."],
  ["10", "Harness engineering", "Capture exact sessions, tool events, checkpoints, artifacts, and replayable run records.", "Prevents irreproducible agent behavior."],
  ["11", "Infrastructure engineering", "Operate environments, compute, queues, timeouts, backoff, failover, and recovery.", "Prevents model success from hiding platform failure."],
  ["12", "Continual learning", "Turn production feedback into evaluated, human-approved changes with rollback.", "Prevents uncontrolled self-modification."],
] as const;

const orchestrationComponents = [
  ["Intent router", "Classifies the request and selects an eligible workflow."],
  ["Workflow controller", "Owns the durable graph, branching, joins, pause, and resume."],
  ["Context manager", "Builds the attempt-specific context package and records its digest."],
  ["Model router", "Filters and selects qualified model profiles by task, risk, cost, and availability."],
  ["Retrieval coordinator", "Queries eligible sources, filters permissions, reranks, and preserves citations."],
  ["Tool gateway", "Validates schemas, identity, authorization, side effects, timeouts, and receipts."],
  ["State and memory manager", "Separates working state, durable facts, history, and retention policy."],
  ["Policy enforcer", "Applies identity, data, risk, budget, and action rules before consequence."],
  ["Guardrail and validator", "Checks inputs, outputs, policy conditions, and candidate quality."],
  ["Reliability controller", "Handles timeout, backoff, circuit breaking, reconciliation, and fallback."],
  ["Observability and audit", "Correlates decisions, traces, logs, metrics, evidence, and authority history."],
  ["Cost and rate manager", "Enforces token, model, tool, compute, concurrency, and workflow budgets."],
] as const;

const patterns = [
  ["01", "Assistance", "Prompt → response", "Drafting, explanation, and low-impact recommendations.", "Human evaluates every consequential output."],
  ["02", "Grounded application", "Query → retrieve → cite → answer", "Knowledge-intensive answers that require approved, current sources.", "Permission, freshness, citation, and faithfulness checks."],
  ["03", "Bounded single agent", "Plan → act → observe → adjust", "Complex work requiring tools and iterative reasoning.", "Scoped authority, durable attempt state, hard stops, independent validation."],
  ["04", "Coordinated specialists", "Delegate → collaborate → join", "Work with measurable specialization, parallelism, or independent critique.", "Delegation, shared-state, disagreement, correlation, and budget contracts."],
  ["05", "Durable autonomous workflow", "Trigger → queue → execute → verify → gate", "Long-running repeatable processes that must survive failure.", "Leases, idempotency, recovery, evidence, and human intervention."],
  ["06", "Enterprise factory", "Inventory → policy → runtime → delivery → outcomes", "Mission-critical operation across governed repositories, data, tools, and people.", "Full identity, governance, security, observability, continuity, and recertification."],
] as const;

const memoryTypes = [
  ["Working", "What is active now", "Current objective, conversation, tool results, intermediate state", "Short-lived; compact or discard when the attempt ends."],
  ["Episodic", "What happened", "Attributable events, attempts, outcomes, corrections, and incidents", "Retain only under purpose, access, and deletion rules."],
  ["Semantic", "What is known", "Accepted facts, entities, relationships, terminology, and source-backed knowledge", "Similarity is not truth; require source authority and freshness."],
  ["Procedural", "How work is done", "Skills, recipes, checklists, policies, and deterministic routines", "Version, evaluate, own, and revoke like any capability."],
  ["Temporal", "What was true when", "Time-bounded facts, effective dates, relationship history, and provenance", "Query by valid time and source—not only latest value."],
] as const;

const governancePillars = [
  ["Strategy and policy", "Purpose, acceptable use, principles, standards, and accountable outcomes."],
  ["Inventory and classification", "System record, ownership, lifecycle, data, suppliers, risk, and autonomy ceiling."],
  ["Risk management", "Impact analysis, tiering, threat model, mitigations, exceptions, and residual risk."],
  ["Architecture governance", "Approved patterns, data and retrieval boundaries, model and tool eligibility, and interoperability."],
  ["Lifecycle governance", "Intake, design, build, review, deployment, monitoring, recertification, and retirement."],
  ["Controls and authority", "Identity, least privilege, human decisions, emergency controls, audit, and evidence."],
  ["Continuous monitoring", "Quality, drift, safety, cost, incidents, violations, outcomes, and verified closure."],
] as const;

const observabilitySignals = [
  ["Traces", "How one governed run moved across models, tools, services, retries, and decisions."],
  ["Logs", "What each component reported, with correlation, redaction, retention, and access policy."],
  ["Metrics", "System health, throughput, failure, queue age, utilization, and outcome trends."],
  ["Cost", "Tokens, models, tools, environments, compute, people, and cost per accepted outcome."],
  ["Latency", "Queue, model, tool, validation, approval, delivery, and customer-value time."],
  ["Quality", "Task success, groundedness, correctness, safety, completeness, regression, and user outcome."],
] as const;

const protocols = [
  ["MCP", "Agent ↔ tools and context", "Tools, resources, prompts, capability negotiation, transport, and authorization.", "It standardizes access; it does not grant permission or make a tool safe."],
  ["ACP", "Editor ↔ coding agent", "Sessions, plans, messages, tool activity, edits, and terminal execution.", "It connects a client to an agent; it does not own the factory workflow."],
  ["AG-UI", "Agent runtime ↔ user interface", "Events for progress, state, messages, tools, approvals, and artifacts.", "It transports interaction state; it is not a policy or evidence authority."],
  ["A2A", "Agent system ↔ agent system", "Discovery, task delegation, status, messages, artifacts, and collaboration.", "It enables interoperability; delegation still cannot widen authority."],
] as const;

const attentionLevels = [
  ["L1", "Code primitives", "Lines, functions, types, invariants", "Highest direct control; lowest leverage."],
  ["L2", "Code structure", "Files, modules, directories, interfaces", "Use when architecture, maintainability, or unfamiliar code matters."],
  ["L3", "Data and execution", "Schemas, migrations, services, APIs, runtime behavior", "Use when correctness depends on state, data, or performance."],
  ["L4", "Intent and delivery", "Specifications, plans, acceptance, evidence, pull requests, releases", "Use for familiar work with strong contracts and verification."],
  ["L5", "Agentic systems", "Reusable workflows, portfolios, factories, and governed improvement", "Highest leverage; requires deep domain and system evidence."],
] as const;

export function VisualAtlas() {
  return (
    <div className="visual-atlas">
      <nav className="visual-atlas-index" aria-label="Visual guide contents">
        <a href="#factory-lifecycle">Lifecycle</a>
        <a href="#production-stack">12 disciplines</a>
        <a href="#orchestration">Orchestration</a>
        <a href="#agent-patterns">Agent patterns</a>
        <a href="#memory">Memory</a>
        <a href="#loop-engineering">Loops</a>
        <a href="#governance">Governance</a>
        <a href="#observability">Observability</a>
        <a href="#protocols">Protocols</a>
        <a href="#attention">Attention</a>
      </nav>

      <AtlasSection
        id="factory-lifecycle"
        number="01"
        kicker="End-to-end value stream"
        title="From governed intent to confirmed outcome"
        description="The factory is a closed operating loop. Every phase receives an explicit contract, produces durable records, and returns evidence to a named authority."
        href="/docs/01-understand/02-the-factory-in-one-view"
      >
        <ValueStream />
      </AtlasSection>

      <AtlasSection
        id="production-stack"
        number="02"
        kicker="Production AI engineering"
        title="The twelve disciplines around the agent"
        description="Building the agent is one layer. Production reliability comes from the connected engineering disciplines that define inputs, meaning, behavior, proof, recovery, and improvement."
        href="/docs/03-build/19-the-12-layer-production-ai-agent-stack"
      >
        <ol className="atlas-discipline-grid">
          {productionDisciplines.map(([number, title, description, prevention]) => (
            <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p><small>{prevention}</small></div></li>
          ))}
        </ol>
      </AtlasSection>

      <AtlasSection
        id="orchestration"
        number="03"
        kicker="Runtime coordination"
        title="Orchestration connects intelligence to controlled execution"
        description="The orchestrator coordinates models, state, tools, knowledge, policy, reliability, observability, and budgets. Each component owns a narrow decision."
        href="/docs/03-build/11-control-plane-orchestrator-and-execution-plane"
        dark
      >
        <div className="atlas-orchestration-frame">
          <div className="atlas-orchestration-input"><span>Inputs</span><strong>User, event, API, schedule</strong></div>
          <div className="atlas-orchestration-grid">
            {orchestrationComponents.map(([title, description], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></article>)}
          </div>
          <div className="atlas-orchestration-output"><span>Connected systems</span><strong>Models · knowledge · tools · memory · enterprise services</strong></div>
        </div>
      </AtlasSection>

      <AtlasSection
        id="agent-patterns"
        number="04"
        kicker="Minimum sufficient autonomy"
        title="Choose the simplest architecture that can safely solve the problem"
        description="This is a selection ladder, not a maturity score. Higher levels add power and new obligations; they are not automatically better."
        href="/docs/03-build/18-agent-and-loop-engineering"
      >
        <ol className="atlas-patterns">
          {patterns.map(([number, title, flow, use, controls]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><code>{flow}</code><p>{use}</p><small>{controls}</small></div></li>)}
        </ol>
      </AtlasSection>

      <AtlasSection
        id="memory"
        number="05"
        kicker="State, knowledge, and time"
        title="Memory is a governed write, retrieval, update, and forgetting system"
        description="A vector database is one retrieval mechanism. Memory architecture decides what should persist, why it remains valid, who may retrieve it, and when it must be corrected or deleted."
        href="/docs/03-build/15-agent-architecture"
      >
        <div className="atlas-memory-grid">
          {memoryTypes.map(([title, purpose, content, rule]) => <article key={title}><span>{purpose}</span><h3>{title} memory</h3><p>{content}</p><small>{rule}</small></article>)}
        </div>
      </AtlasSection>

      <AtlasSection
        id="loop-engineering"
        number="06"
        kicker="Convergent execution"
        title="Every attempt ends in verify, correct, retry, stop, or escalate"
        description="A production loop does not merely call the model again. It diagnoses the failure class, changes only eligible state, enforces budgets, and preserves every attempt."
        href="/docs/03-build/18-agent-and-loop-engineering"
        dark
      >
        <div className="atlas-loop">
          {[
            ["Goal", "Objective and measurable success"],
            ["Act", "Model and authorized tools"],
            ["Evaluate", "Independent checks and feedback"],
            ["Correct", "Bounded repair or context change"],
            ["Retry", "New immutable attempt"],
            ["Stop", "Accept, fail, cancel, or escalate"],
          ].map(([title, detail], index) => <div key={title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><small>{detail}</small></div>)}
        </div>
        <div className="atlas-stop-grid"><section><h3>Success stops</h3><p>Acceptance criteria satisfied with current, attributable evidence.</p></section><section><h3>Safety stops</h3><p>Policy denial, authority boundary, critical evidence conflict, or human intervention.</p></section><section><h3>Budget stops</h3><p>Attempt, time, token, cost, tool-call, or no-improvement limit reached.</p></section><section><h3>Recovery paths</h3><p>Backoff, fallback, reconciliation, new attempt, reduced autonomy, or escalation packet.</p></section></div>
      </AtlasSection>

      <AtlasSection
        id="governance"
        number="07"
        kicker="Enterprise operating model"
        title="Govern the system through seven connected control pillars"
        description="Governance is not a sign-off at the end. It follows the system from inventory and classification through authority, monitoring, incidents, and retirement."
        href="/docs/02-design/07-governance-policy-and-risk-proportional-approval"
      >
        <ol className="atlas-governance">
          {governancePillars.map(([title, description], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></li>)}
        </ol>
        <div className="atlas-risk-tiers"><span>Assist</span><span>Recommend</span><span>Act with evidence</span><span>High consequence / dual control</span></div>
      </AtlasSection>

      <AtlasSection
        id="observability"
        number="08"
        kicker="Observe → evaluate → detect → respond → improve"
        title="Observe behavior without confusing telemetry with authority"
        description="Traces, logs, metrics, cost, latency, and quality explain system behavior. They influence decisions only through explicit validators and governed records."
        href="/docs/05-operate/28-observability-telemetry-and-forensics"
      >
        <div className="atlas-observability">
          {observabilitySignals.map(([title, description], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></article>)}
        </div>
        <div className="atlas-response-flow"><span>Normal</span><b>or</b><span>Detect anomaly</span><span>Alert owner</span><span>Investigate</span><span>Contain / reconfigure</span><span>Verify recovery</span><span>Feed evaluated improvement</span></div>
      </AtlasSection>

      <AtlasSection
        id="protocols"
        number="09"
        kicker="Interoperability boundaries"
        title="Use protocols for connection—not as substitutes for governance"
        description="Each protocol joins a different boundary. The factory still owns identity, policy, scope, evidence, failure, versioning, and lifecycle."
        href="/docs/03-build/13-coding-harnesses-and-agent-protocols"
      >
        <div className="atlas-protocol-grid">
          {protocols.map(([name, boundary, description, nonclaim]) => <article key={name}><span>{boundary}</span><h3>{name}</h3><p>{description}</p><small>{nonclaim}</small></article>)}
        </div>
      </AtlasSection>

      <AtlasSection
        id="attention"
        number="10"
        kicker="Leverage and direct inspection"
        title="Move your attention to the level the risk and evidence justify"
        description="Higher altitude can create leverage, but it reduces direct inspection. Governed control comes from contracts, evidence, and authority—not from assuming higher abstraction is safer."
        href="/docs/02-design/08-economics-metrics-and-human-attention"
        dark
      >
        <ol className="atlas-attention-levels">
          {attentionLevels.map(([number, title, examples, tradeoff]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{examples}</p><small>{tradeoff}</small></div></li>)}
        </ol>
        <div className="atlas-attention-rules"><section><span>Move up for leverage</span><p>Domain understood · work familiar and repeatable · evaluation reliable · recovery proven · benefits measured</p></section><section><span>Move down for control</span><p>Domain unfamiliar · risk or impact high · evidence weak · performance or design details matter · task is outside evaluated coverage</p></section></div>
      </AtlasSection>
    </div>
  );
}

function AtlasSection({ id, number, kicker, title, description, href, dark = false, children }: { id: string; number: string; kicker: string; title: string; description: string; href: string; dark?: boolean; children: React.ReactNode }) {
  return (
    <section className={`atlas-section${dark ? " atlas-section-dark" : ""}`} id={id}>
      <header>
        <span className="atlas-section-number">{number}</span>
        <div><small>{kicker}</small><h2>{title}</h2><p>{description}</p></div>
        <Link href={href}>Read the full guide <span aria-hidden="true">→</span></Link>
      </header>
      {children}
    </section>
  );
}
