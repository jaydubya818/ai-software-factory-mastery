import type { ReactNode } from "react";
import { FigureShell } from "./figure-shell";

export const referenceDiagramNames = ["enterprise", "composition", "delivery", "routing", "verification", "shared-platform"] as const;
export type ReferenceDiagramName = typeof referenceDiagramNames[number];
export function isReferenceDiagramName(value: string): value is ReferenceDiagramName {
  return referenceDiagramNames.some((name) => name === value);
}

const services = [
  ["Mission Control", "Plan · route · coordinate"], ["Identity / Access", "Principals · permissions"],
  ["Capability Registry", "Versions · qualification"], ["Model Gateway", "Approved inference"],
  ["Context / Knowledge", "Authorized retrieval"], ["Execution Environments", "Runtime · sandbox · limits"],
  ["Observability", "Traces · quality · cost"], ["Policy / Security", "Controls outside the model"],
  ["Evidence / Audit", "Proof · provenance · decisions"],
] as const;
const capabilities = [
  ["Agents", "Planning, coding, testing, review"], ["Harnesses", "Context, tools, state, bounded loops"],
  ["Tools / Skills", "Builds, scanners, APIs, reusable guidance"], ["Models / Inference", "Qualified logical model routes"],
  ["Execution Profiles", "Runtime, sandbox, network and resource limits"],
] as const;
const stages = [
  ["Intent", "Objective / desired outcome"], ["Plan", "WorkOrders / Tasks"],
  ["Route", "Qualified Factory + capabilities"], ["Execute", "Governed Attempts"],
  ["Verify", "Independent proof"], ["Release", "Approved Candidate"], ["Learn", "Outcome signals / improvements"],
] as const;

function Node({ title, children, tone = "plain" }: { title: string; children?: ReactNode; tone?: string }) {
  return <div className={`fd-node fd-${tone}`}><strong>{title}</strong>{children && <div className="fd-node-detail">{children}</div>}</div>;
}
function Band({ number, title, note, children, dark = false }: { number: string; title: string; note: string; children: ReactNode; dark?: boolean }) {
  return <section className={`fd-band${dark ? " fd-band-dark" : ""}`} aria-label={title}>
    <header className="fd-band-heading"><span className="fd-number">{number}</span><div><h4>{title}</h4><p>{note}</p></div></header>{children}
  </section>;
}
function Connector({ children }: { children: ReactNode }) {
  return <div className="fd-connector"><span aria-hidden="true">↓</span><span>{children}</span></div>;
}
function Note({ children }: { children: ReactNode }) { return <p className="fd-note">{children}</p>; }
function StageFlow({ compact = false }: { compact?: boolean }) {
  return <ol className={`fd-stages${compact ? " fd-stages-compact" : ""}`} aria-label="Enterprise delivery flow">
    {stages.map(([name, detail], i) => <li key={name}><span className="fd-step-number">0{i + 1}</span><strong>{name}</strong>{!compact && <span>{detail}</span>}{i < stages.length - 1 && <span className="fd-stage-arrow" aria-hidden="true">→</span>}</li>)}
  </ol>;
}

function Enterprise() {
  return <>
    <div className="fd-thesis"><strong>One platform.<br />Many outcomes.</strong><p>Centralize the infrastructure.<br />Compose the work.<br />Reuse qualified capabilities.</p></div>
    <Band number="1" title="Shared Enterprise AI Software Factory Platform" note="Common services for every factory. One governed control plane." dark>
      <div className="fd-services">{services.map(([title, detail]) => <Node key={title} title={title}>{detail}</Node>)}</div>
      <p className="fd-band-foot"><strong>Mission Control is the meta-factory control plane.</strong> It owns Objective intake, decomposition, WorkOrder coordination, state, recovery, policy, approvals, evidence, release gates and outcome tracking. Providers and infrastructure may vary within qualification and policy.</p>
    </Band>
    <Connector>Shared services support every factory</Connector>
    <Band number="2" title="Factory Portfolio" note="Outcome-specific operating units. Start with a broad default.">
      <div className="fd-portfolio">
        <Node title="Software Delivery Factory" tone="blue"><span className="fd-tag">Broad default</span><ul><li>Features, bug fixes, refactoring</li><li>Tests and dependency updates</li><li>Security fixes and releases</li></ul></Node>
        <Node title="Modernization Factory" tone="teal"><span className="fd-tag">When justified</span><ul><li>Framework / language migrations</li><li>Platform and repository upgrades</li><li>Compatibility and migration waves</li></ul></Node>
        <Node title="Security Remediation Factory" tone="amber"><span className="fd-tag">When justified</span><ul><li>CVE / dependency remediation</li><li>Affected asset discovery</li><li>Verification, exceptions, reporting</li></ul></Node>
      </div>
      <Note><strong>Additional factories only when justified:</strong> materially different outcome semantics, ownership, qualification, governance, authority, verification or risk.</Note>
    </Band>
    <Connector>Factories compose these shared capabilities — a dependency, not a process step</Connector>
    <Band number="3" title="Reusable Capabilities" note="Build once. Qualify. Govern. Reuse within the approved scope.">
      <div className="fd-capabilities">{capabilities.map(([title, detail]) => <Node key={title} title={title} tone="teal">{detail}</Node>)}</div>
    </Band>
    <div className="fd-section-divider" />
    <Band number="4" title="Enterprise Delivery Flow" note="How the architecture produces a verified outcome."><StageFlow compact /><Note>Release requires approval of the exact Candidate. Learning proposes improvements; it does not silently change the live composition.</Note></Band>
    <div className="fd-outcome"><span>THE PRODUCT</span><strong>Verified outcome</strong><p>Quality · security · reliability · cost per verified outcome · human effort</p></div>
  </>;
}

function Composition() {
  return <>
    <div className="fd-definition"><span className="fd-eyebrow">Factory Definition / governed design</span><h4>An outcome contract, assembled into a system.</h4><p>The definition declares the result, responsibilities, capabilities and proof required.</p></div>
    <Band number="1" title="Outcome Contract" note="What must be true, for whom, and how success is accepted." dark><p className="fd-band-foot">Scope · owner · acceptance criteria · risk · authority</p></Band>
    <Connector>Defines the composition</Connector>
    <div className="fd-composition-grid">
      <Node title="Workflow">The ordered and conditional work, dependencies and stop rules.</Node>
      <Node title="Qualified Capabilities" tone="teal"><ul className="fd-chips"><li>Agent</li><li>Harness</li><li>Tools / Skills</li><li>Model</li></ul><p>Reusable components selected for this workload.</p></Node>
      <Node title="Context">Authorized instructions, knowledge and current work state.</Node>
      <Node title="Execution Profile">Versioned runtime, sandbox, network, credentials and resource limits.</Node>
      <Node title="Policy" tone="amber">Permitted actions and authority enforced outside the model.</Node>
      <Node title="Verification" tone="blue">Independent checks against the acceptance contract.</Node>
      <Node title="Evidence Requirements" tone="blue">Tests, scans, provenance, traces and attributable decisions.</Node>
    </div>
    <Connector>Pin the exact components and configuration</Connector>
    <Node title="Composition qualification" tone="gate">Evaluate the assembled system for a declared workload and policy scope. Qualified parts alone do not qualify their interactions.</Node>
    <Connector>Only a passing composition can advance</Connector>
    <div className="fd-outcome"><span>IMMUTABLE QUALIFIED COMPOSITION</span><strong>Factory Version</strong><p>Activation and execution still require authorization. Changes return through qualification.</p></div>
    <Note>A Factory owns an outcome. An Agent reasons; a Harness bounds its loop; a Model supplies inference; Tools act; Skills supply reusable guidance. None alone is the Factory.</Note>
  </>;
}

function Delivery() {
  return <>
    <div className="fd-authority"><strong>Mission Control coordinates the Objective</strong><span>Plan · decomposition · routing · state · evidence · authority · outcomes</span></div>
    <StageFlow />
    <div className="fd-delivery-controls"><Node title="Execution boundary" tone="teal">Agents and harnesses run bounded Attempts inside governed runtime / sandbox environments.</Node><Node title="Approval remains explicit" tone="gate">Before Release, the accountable authority approves the exact Candidate, environment and rollout scope.</Node></div>
    <Connector>Observe the required production and business criteria</Connector>
    <div className="fd-outcome"><span>BEYOND GENERATED CODE</span><strong>Verified outcome</strong><p>Accepted behavior, attributable evidence and observed results.</p></div>
    <Note><strong>Learning returns through qualification.</strong> Outcome signals inform evaluated improvements, not automatic production mutation.</Note>
    <details className="fd-abstractions"><summary>Four views, different responsibilities</summary><dl><div><dt>Factory Development Lifecycle</dt><dd>Design, qualify, govern, operate and improve the factory itself.</dd></div><div><dt>Enterprise delivery flow</dt><dd>The seven-step summary shown here; the Guide’s value stream is another teaching view.</dd></div><div><dt>Execution / runtime lifecycle</dt><dd>WorkOrders contain Tasks; Attempts can run, block, retry, recover or stop.</dd></div><div><dt>Evidence / verification / approval protocol</dt><dd>Proof establishes eligibility; approval authorizes a controlled transition.</dd></div></dl></details>
  </>;
}

function Routing() {
  return <>
    <div className="fd-authority"><strong>Objective → Mission Control</strong><span>Translate the desired outcome into a governed Plan.</span></div>
    <div className="fd-routing-layout"><div className="fd-routing-levels">
      <Band number="1" title="Objective routing" note="Determine participating factories from the Objective’s requirements."><p className="fd-band-foot">Mission Control coordinates the cross-factory Plan.</p></Band>
      <Connector>Decompose into WorkOrders</Connector>
      <Band number="2" title="WorkOrder routing" note="Select the qualified Factory / immutable Factory Version."><p className="fd-band-foot">Pin ownership and the approved Execution Profile.</p></Band>
      <Connector>Decompose into bounded Tasks</Connector>
      <Band number="3" title="Task routing" note="Select a qualified capability combination."><ul className="fd-chips"><li>Agent</li><li>Harness</li><li>Model</li><li>Tools / Skills</li><li>Execution Profile</li></ul></Band>
    </div><aside className="fd-routing-gate" aria-label="Eligibility before optimization at every routing level">
      <span className="fd-eyebrow">At every level</span><Node title="Requirements">Workload, authority and operating constraints</Node><Connector>Filter first</Connector>
      <Node title="Qualification Gate" tone="gate">Policy · authorization · compatibility · current qualification</Node>
      <div className="fd-route-branches"><div><Connector>Eligible candidates</Connector><Node title="Ranking / Optimization" tone="teal">Compare quality, reliability, latency and cost within the eligible set.</Node><Connector>Select and pin</Connector><Node title="Selected route" tone="blue">Record the decision and its evidence.</Node></div><div><p className="fd-branch-label">Alternative from Qualification Gate<br /><strong>No eligible route</strong></p><Node title="Blocked / Escalated" tone="blocked">Resolve the missing qualification or authority. No silent substitution.</Node></div></div>
    </aside></div>
    <Note>Objective participation ≠ Factory selection ≠ Agent selection ≠ Model routing. Model routing supplies inference inside the broader qualified composition.</Note>
  </>;
}

function Verification() {
  return <>
    <div className="fd-proof-intake"><Node title="Execution">A producer Agent / Harness runs a governed Attempt.</Node><span className="fd-horizontal-arrow" aria-hidden="true">→</span><Node title="Artifact + Evidence" tone="blue">Candidate digest + input lineage + tests, scans, builds, traces and policy results.</Node></div>
    <Connector>Bind proof to exact inputs and Candidate identities</Connector>
    <Band number="1" title="Independent Verification" note="A producer’s completion claim is not its own proof." dark><p className="fd-band-foot">Use deterministic checks, specialized evaluators and human judgment as required. A second model alone does not establish independence.</p></Band>
    <div className="fd-proof-lanes"><Node title="Local Verification" tone="blue">Does each WorkOrder / Task satisfy its acceptance contract on the exact inputs it consumed?</Node><Node title="Global Verification" tone="blue">Does the exact integrated Candidate satisfy the Objective contract with current upstream proof?</Node></div>
    <Connector>Both required proof scopes converge</Connector>
    <Node title="Exact integrated Candidate" tone="blue">Required checks pass against the same artifact digest and current inputs. Retain verifier identity, result and evidence references.</Node>
    <div className="fd-proof-branches"><div><Connector>Current passing evidence</Connector><Node title="Approval Gate" tone="gate">The accountable human or explicitly authorized policy grants the next transition for this Candidate, environment and scope.</Node><Connector>Approved Candidate only</Connector><div className="fd-outcome"><span>CONTROLLED PROMOTION</span><strong>Release</strong><p>Observe production criteria before closing the Objective.</p></div></div>
    <aside className="fd-recovery" aria-label="Evidence failure and recovery"><p className="fd-branch-label">Alternative from Independent Verification<br /><strong>Missing / Failed / Stale Evidence</strong></p><Node title="Block" tone="blocked">Changed upstream artifacts invalidate affected downstream proof. No release.</Node><Connector>Correct / Re-execute within policy and budget</Connector><Node title="Re-verify" tone="blue">Return to independent local and global verification. Bind any changed Candidate to a new identity; obtain fresh approval.</Node><p className="fd-return">↺ Return to Independent Verification</p></aside></div>
  </>;
}

function SharedPlatform() {
  return <>
    <div className="fd-comparison"><section className="fd-duplicated" aria-label="Anti-pattern: duplicated team stacks"><span className="fd-eyebrow">Anti-pattern / duplicated ownership</span><h4>A stack for every team.</h4><div className="fd-team-stacks">{["Team A", "Team B", "Team C"].map(team => <div key={team}><strong>{team}</strong><span aria-hidden="true">↓</span><ul>{["Agent stack", "Model integration", "Context / RAG", "Runtime", "Credentials", "Observability", "Policy / Security", "Verification", "Evidence / Audit", "Qualification"].map(s => <li key={s}>{s}</li>)}</ul></div>)}</div><Note>Repeated integrations, credentials, control planes and proof systems increase the governance and operating burden.</Note></section>
    <section className="fd-shared" aria-label="Preferred architecture: shared enterprise platform"><span className="fd-eyebrow">Shared foundation / explicit boundaries</span><h4>One governed platform.</h4><Band number="1" title="Shared Enterprise Platform" note="Mission Control coordinates; common services govern." dark><ul className="fd-chips">{["Identity", "Models", "Context", "Runtime", "Policy / Security", "Observability", "Verification", "Evidence / Audit"].map(s => <li key={s}>{s}</li>)}</ul></Band><Connector>Shared services + qualified capabilities</Connector><Node title="Reusable capability ecosystem" tone="teal">Agents · Harnesses · Models · Tools / Skills · Execution Profiles</Node><Connector>Compose for distinct outcome contracts</Connector><div className="fd-factory-outcomes">{["A", "B", "C"].map(letter => <div key={letter}><Node title={`Factory ${letter}`} /><span aria-hidden="true">↓</span><strong>Outcome {letter}</strong></div>)}</div><Note>Illustrative factories, not one factory per team. Share services while preserving tenant, policy and authority boundaries.</Note></section></div>
    <div className="fd-outcome"><span>SCALE BUILDERS · REPOSITORIES · WORKLOADS · OUTCOMES</span><strong>Scale workloads, not infrastructure duplication.</strong><p>Add a factory only when its governed outcome contract is materially different.</p></div>
  </>;
}

const diagrams = {
  enterprise: { number: "01", title: "One platform. Many outcomes.", render: Enterprise, description: "One enterprise platform supplies nine shared services, including Mission Control as the meta-factory control plane. A portfolio starts with Software Delivery and adds Modernization, Security Remediation or other factories only when their governed contracts differ. Factories compose shared Agents, Harnesses, Tools and Skills, Models and Execution Profiles. These architectural layers are dependencies, not sequential runtime steps. The separate delivery flow is Intent, Plan, Route, Execute, Verify, Release and Learn. Approval controls release; the product is a verified outcome." },
  composition: { number: "02", title: "What makes a Factory?", render: Composition, description: "A Factory Definition describes a governed composition around an Outcome Contract. It combines Workflow, qualified Agents, Harnesses, Tools and Skills, Models, Context, an Execution Profile, Policy, Verification and Evidence Requirements. Pin the exact configuration and qualify its interactions as a composition for a declared workload. Passing qualification produces an immutable qualified Factory Version. Activation and execution still require authorization; changes return through qualification. A component or workflow alone is not the factory." },
  delivery: { number: "03", title: "From intent to a verified outcome.", render: Delivery, description: "Mission Control coordinates an Objective. Intent defines the desired outcome. Plan decomposes it into WorkOrders and Tasks. Route selects qualified factories and capabilities. Execute runs governed Attempts in bounded environments. Verify checks independent proof. Release promotes the exact approved Candidate. Learn uses observed outcome signals to propose evaluated improvements. The delivered product is a verified outcome; required production criteria must be observed. The seven-step enterprise summary does not replace the factory evolution lifecycle, detailed runtime states, or evidence and approval protocol." },
  routing: { number: "04", title: "Three levels. Qualification first.", render: Routing, description: "An Objective enters Mission Control. Level one determines participating factories. The Plan decomposes into WorkOrders; level two selects and pins qualified Factory Versions and profiles. WorkOrders contain Tasks; level three selects qualified Agent, Harness, Model, Tool or Skill and Execution Profile combinations. At every level, requirements pass through policy, authorization, compatibility and qualification filtering before eligible candidates are ranked. A selected route is pinned and recorded. No eligible route means blocked or escalated, never an unqualified fallback." },
  verification: { number: "05", title: "Evidence earns progress. Approval grants authority.", render: Verification, description: "Execution produces an artifact and evidence tied to exact Candidate and input identities. Independent local verification checks WorkOrder and Task contracts; global verification checks the integrated Candidate against the Objective. Both required scopes need current passing proof for the exact integrated Candidate before approval can authorize release. Missing, failed or stale evidence blocks release. Changed upstream artifacts invalidate affected downstream proof. Correct or re-execute within policy, then return to independent verification and obtain fresh approval for a changed Candidate. Release is controlled promotion, followed by required production observation." },
  "shared-platform": { number: "06", title: "Share the platform. Specialize the outcomes.", render: SharedPlatform, description: "The anti-pattern duplicates an agent stack, model integration, context, runtime, credentials, observability, policy, verification, evidence and qualification for Teams A, B and C. The preferred architecture centralizes those common services under one governed enterprise platform and reusable capability ecosystem. Factories A, B and C compose qualified capabilities for distinct outcome contracts while preserving tenant and authority boundaries. Increase builders, repositories, concurrency and workloads without creating another control plane or factory for every team." },
} as const;
export function ReferenceDiagram({ name }: { name: ReferenceDiagramName }) {
  const diagram = diagrams[name];
  const Content = diagram.render;
  return <FigureShell name={name} number={diagram.number} title={diagram.title} description={diagram.description}><Content /></FigureShell>;
}
