import { execFile } from "node:child_process";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";
import matter from "gray-matter";
import sharp from "sharp";

const execFileAsync = promisify(execFile);
const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const guideRoot = path.resolve(siteRoot, "..", "guide");
const assetRoot = path.join(guideRoot, "assets", "infographics");
const mermaidPath = path.join(siteRoot, "node_modules", "mermaid", "dist", "mermaid.min.js");
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const WIDTH = 1600;
const HEIGHT = 1000;

const palette = {
  ink: "#12201b",
  muted: "#5b6862",
  paper: "#f7f5ef",
  surface: "#fffdf8",
  line: "#d8ddd8",
  green: "#1d5d47",
  greenDark: "#123e31",
  sage: "#dce8df",
  amber: "#d9953d",
  amberSoft: "#f7e8d1",
  red: "#a64a3f",
  redSoft: "#f6e1dd",
};

const sectionNames = {
  "01-understand": "UNDERSTAND",
  "02-design": "DESIGN",
  "03-build": "BUILD",
  "04-prove": "PROVE",
  "05-operate": "OPERATE",
  "06-improve": "IMPROVE",
  stages: "VALUE STREAM",
};

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (!["assets", "evidence"].includes(entry.name)) files.push(...await walk(file));
    } else if (file.endsWith(".md")) {
      files.push(file);
    }
  }
  return files;
}

function cleanMarkdown(value) {
  return value
    .replace(/<br\s*\/?\s*>/gi, " · ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTable(chunk) {
  const lines = chunk.split("\n");
  const start = lines.findIndex((line) => /^\s*\|.+\|\s*$/.test(line));
  if (start < 0) return null;
  const rows = [];
  for (const line of lines.slice(start)) {
    if (!/^\s*\|.+\|\s*$/.test(line)) break;
    rows.push(line.trim().slice(1, -1).split("|").map(cleanMarkdown));
  }
  if (rows.length < 3) return null;
  return { headers: rows[0], rows: rows.slice(2) };
}

function stageNumber(relativeFile) {
  const match = relativeFile.match(/^stages\/(\d+)-/);
  return match ? Number(match[1]) : null;
}

async function collectSlots() {
  const slots = new Map();
  for (const file of (await walk(guideRoot)).sort()) {
    const relativeFile = path.relative(guideRoot, file);
    const raw = await readFile(file, "utf8");
    const { data, content } = matter(raw);
    const declared = Array.isArray(data.infographics) ? data.infographics : [];
    for (const slot of declared) {
      const marker = new RegExp(`<!--\\s*infographic:\\s*${slot.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}\\s*-->`);
      const match = marker.exec(content);
      if (!match) throw new Error(`Missing marker for ${slot} in ${relativeFile}`);
      const start = match.index + match[0].length;
      const next = content.indexOf("<!-- infographic:", start);
      const chunk = content.slice(start, next < 0 ? content.length : next);
      const titleMatch = chunk.match(/\*\*Infographic\s+[—–-]\s*([^*]+?)\*\*/);
      if (!titleMatch) throw new Error(`Missing title for ${slot} in ${relativeFile}`);
      const mermaidMatch = chunk.match(/```mermaid\s*\n([\s\S]*?)```/);
      const chapter = data.chapter ? Number(data.chapter) : stageNumber(relativeFile);
      const section = sectionNames[relativeFile.split(path.sep)[0]] ?? "GUIDE";
      const record = {
        slot,
        title: cleanMarkdown(titleMatch[1]).replace(/\.$/, ""),
        chapter,
        section,
        relativeFile,
        mermaid: mermaidMatch?.[1].trim() ?? null,
        table: extractTable(chunk),
        references: [],
      };
      if (slots.has(slot)) {
        const existing = slots.get(slot);
        existing.references.push({ chapter, section, relativeFile });
      } else {
        record.references.push({ chapter, section, relativeFile });
        slots.set(slot, record);
      }
    }
  }
  return [...slots.values()];
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrap(value, max = 40, maxLines = Infinity) {
  const words = String(value).trim().split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    if (!line || `${line} ${word}`.length <= max) line = line ? `${line} ${word}` : word;
    else { lines.push(line); line = word; }
  }
  if (line) lines.push(line);
  if (lines.length <= maxLines) return lines;
  const clipped = lines.slice(0, maxLines);
  clipped[maxLines - 1] = `${clipped[maxLines - 1].replace(/[.,;:]?$/, "")}…`;
  return clipped;
}

function textLines(lines, x, y, { size = 24, lineHeight = 1.25, fill = palette.ink, weight = 500, family = "Avenir Next, Avenir, Segoe UI, sans-serif", anchor = "start", letterSpacing = 0 } = {}) {
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="${family}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" letter-spacing="${letterSpacing}">${lines.map((line, index) => `<tspan x="${x}" dy="${index ? size * lineHeight : 0}">${escapeXml(line)}</tspan>`).join("")}</text>`;
}

function metadata(record) {
  if (record.references.length > 1) {
    return record.references.map(({ chapter, relativeFile }) => chapter
      ? `CHAPTER ${String(chapter).padStart(2, "0")}`
      : relativeFile.startsWith("stages/")
        ? "STAGE"
        : "APPENDIX").join(" + ") + " · CROSS-CUTTING";
  }
  const label = record.chapter
    ? `CHAPTER ${String(record.chapter).padStart(2, "0")}`
    : record.relativeFile.startsWith("stages/")
      ? `STAGE ${record.chapter}`
      : "APPENDIX";
  return `${label} · ${record.section}`;
}

function posterFrame(record, body, { panelTop = 220 } = {}) {
  const title = wrap(record.title, 52, 2);
  const titleSize = title.length > 1 ? 42 : 48;
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="1600" height="1000" fill="${palette.paper}"/>
  <circle cx="1465" cy="-30" r="270" fill="${palette.amber}" opacity="0.065"/>
  <circle cx="-20" cy="1030" r="260" fill="${palette.green}" opacity="0.045"/>
  <rect width="1600" height="9" fill="${palette.greenDark}"/>
  <path d="M72 91 H1528" stroke="${palette.line}" stroke-width="1"/>
  ${textLines([metadata(record)], 72, 70, { size: 16, fill: palette.green, weight: 700, family: "SFMono-Regular, Consolas, monospace", letterSpacing: 1.7 })}
  ${textLines(["AI SOFTWARE FACTORY · THE GUIDE"], 1528, 70, { size: 14, fill: palette.muted, weight: 650, family: "SFMono-Regular, Consolas, monospace", anchor: "end", letterSpacing: 1.3 })}
  ${textLines(title, 72, 148, { size: titleSize, lineHeight: 1.12, fill: palette.ink, weight: 500, family: "Georgia, Times New Roman, serif" })}
  <rect x="72" y="${panelTop}" width="1456" height="${900 - panelTop}" rx="22" fill="${palette.surface}" stroke="${palette.line}" stroke-width="2"/>
  ${body}
  <path d="M72 940 H1528" stroke="${palette.line}" stroke-width="1"/>
  ${textLines([record.slot], 72, 971, { size: 13, fill: palette.muted, weight: 600, family: "SFMono-Regular, Consolas, monospace", letterSpacing: 0.8 })}
  ${textLines(["SOURCE-DERIVED · VERSIONABLE · REVIEWABLE"], 1528, 971, { size: 12, fill: palette.muted, weight: 600, family: "SFMono-Regular, Consolas, monospace", anchor: "end", letterSpacing: 1 })}
</svg>`;
}

function card({ x, y, width, height, eyebrow, title, body, tone = "green", number }) {
  const tones = {
    green: [palette.sage, palette.green, palette.greenDark],
    amber: [palette.amberSoft, palette.amber, "#7c531c"],
    red: [palette.redSoft, palette.red, "#76342d"],
    neutral: ["#edf0ed", "#76837c", palette.ink],
  };
  const [background, accent, dark] = tones[tone];
  const titleLines = wrap(title, Math.max(17, Math.floor(width / 14)), 2);
  const bodyLines = body ? wrap(body, Math.max(22, Math.floor(width / 10.5)), Math.max(2, Math.floor((height - 116) / 22))) : [];
  return `
    <g>
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="16" fill="${background}" fill-opacity="0.55" stroke="${accent}" stroke-opacity="0.45" stroke-width="1.5"/>
      <rect x="${x}" y="${y}" width="7" height="${height}" rx="3.5" fill="${accent}"/>
      ${number == null ? "" : `<circle cx="${x + width - 34}" cy="${y + 34}" r="19" fill="${accent}"/><text x="${x + width - 34}" y="${y + 41}" text-anchor="middle" fill="white" font-family="SFMono-Regular, Consolas, monospace" font-size="18" font-weight="700">${escapeXml(number)}</text>`}
      ${textLines([eyebrow.toUpperCase()], x + 28, y + 35, { size: 12, fill: accent, weight: 750, family: "SFMono-Regular, Consolas, monospace", letterSpacing: 1.2 })}
      ${textLines(titleLines, x + 28, y + 75, { size: 24, lineHeight: 1.08, fill: dark, weight: 700 })}
      ${bodyLines.length ? textLines(bodyLines, x + 28, y + 129 + (titleLines.length - 1) * 22, { size: 17, lineHeight: 1.28, fill: palette.muted, weight: 500 }) : ""}
    </g>`;
}

function gridCards(items, { columns = 3, top = 244, bottom = 874, gap = 18 } = {}) {
  const left = 98;
  const width = 1404;
  const rows = Math.ceil(items.length / columns);
  const cardWidth = (width - gap * (columns - 1)) / columns;
  const cardHeight = (bottom - top - gap * (rows - 1)) / rows;
  return items.map((item, index) => card({
    ...item,
    x: left + (index % columns) * (cardWidth + gap),
    y: top + Math.floor(index / columns) * (cardHeight + gap),
    width: cardWidth,
    height: cardHeight,
  })).join("");
}

function horizontalRows(items, { top = 244, bottom = 874, gap = 12 } = {}) {
  const left = 98;
  const width = 1404;
  const rowHeight = (bottom - top - gap * (items.length - 1)) / items.length;
  return items.map((item, index) => card({ ...item, x: left, y: top + index * (rowHeight + gap), width, height: rowHeight })).join("");
}

function tablePoster(record) {
  if (!record.table) throw new Error(`No diagram, table, or manual design for ${record.slot}`);
  const { headers, rows } = record.table;
  const left = 98;
  const top = 244;
  const width = 1404;
  const height = 630;
  const columnWidth = width / headers.length;
  const rowHeight = height / (rows.length + 1);
  const fontSize = Math.max(11, Math.min(19, rowHeight * 0.3, 25 - headers.length * 2));
  const lineHeight = 1.12;

  const cells = [headers, ...rows].map((row, rowIndex) => {
    const y = top + rowIndex * rowHeight;
    const isHeader = rowIndex === 0;
    const background = isHeader ? palette.greenDark : rowIndex % 2 ? "#edf3ee" : palette.surface;
    return row.map((value, columnIndex) => {
      const x = left + columnIndex * columnWidth;
      const maxCharacters = Math.max(12, Math.floor((columnWidth - 30) / (fontSize * 0.56)));
      const maxLines = Math.max(1, Math.floor((rowHeight - 12) / (fontSize * lineHeight)));
      const lines = wrap(value, maxCharacters, maxLines);
      const blockHeight = lines.length * fontSize * lineHeight;
      const baseline = y + (rowHeight - blockHeight) / 2 + fontSize;
      return `<rect x="${x}" y="${y}" width="${columnWidth}" height="${rowHeight}" fill="${background}" stroke="${palette.line}" stroke-width="1"/>
        ${textLines(lines, x + 15, baseline, { size: fontSize, lineHeight, fill: isHeader ? "#ffffff" : palette.ink, weight: isHeader ? 700 : 520 })}`;
    }).join("");
  }).join("");

  return posterFrame(record, cells);
}

function manualPoster(record) {
  const specs = {
    "five-systems": { columns: 3, items: [
      { eyebrow: "Creates", title: "Agent Factory", body: "Versioned agent definitions, skills, tools, model configurations, evaluation suites, and policy.", number: "01" },
      { eyebrow: "Executes", title: "Agent runtime", body: "Harness, lifecycle, context, tools, permissions, budgets, checkpoints, and recovery.", number: "02" },
      { eyebrow: "Grounds", title: "Knowledge layer", body: "Permission-aware retrieval, provenance, freshness, ranking, and retrieval evaluation.", number: "03" },
      { eyebrow: "Delivers", title: "Software Factory", body: "Intent through governed execution, verification, delivery, observation, and learning.", number: "04", tone: "amber" },
      { eyebrow: "Governs", title: "Control plane", body: "Durable authority for missions, plans, WorkOrders, evidence, acceptance, and delivery.", number: "05", tone: "amber" },
    ]},
    "six-areas": { columns: 3, items: [
      { eyebrow: "Intent", title: "Understand the goal", body: "Specs, acceptance criteria, plans, and decomposition. Failure: solving the wrong problem." },
      { eyebrow: "Harness", title: "Run durably", body: "Execution loop, state, tools, checkpoints, and recovery. Failure: work trapped in context." },
      { eyebrow: "Capability", title: "Equip the agent", body: "Definitions, skills, tools, MCP, and context services. Failure: prompts without contracts." },
      { eyebrow: "Model", title: "Route intelligence", body: "Capability matching, cost, latency, and quality. Failure: vendor names become architecture." },
      { eyebrow: "Trust", title: "Prove and govern", body: "Evaluation, policy, security, evidence, and oversight. Failure: agents certify themselves.", tone: "amber" },
      { eyebrow: "Learning", title: "Improve safely", body: "Outcomes, failure taxonomy, experiments, and baselines. Failure: self-promotion.", tone: "amber" },
    ]},
    "autonomy-levels": { columns: 3, items: [
      { eyebrow: "Level 0 · Advisory", title: "Human execution", body: "Human performs and accepts the work. AI researches and recommends; it changes nothing.", number: "0", tone: "neutral" },
      { eyebrow: "Level 1 · Drafting", title: "Assisted execution", body: "Human initiates every action. AI drafts small, bounded artifacts for review.", number: "1" },
      { eyebrow: "Level 2 · Supervised", title: "Delegated execution", body: "Human defines the WorkOrder and reviews every material output.", number: "2" },
      { eyebrow: "Level 3", title: "Governed autonomy", body: "Factory executes approved low-to-medium-risk work; humans retain material decisions.", number: "3", tone: "amber" },
      { eyebrow: "Level 4 · Continuous", title: "Conditional autonomy", body: "Ongoing workflows run within policy; humans handle exceptions and material risk.", number: "4", tone: "amber" },
      { eyebrow: "Level 5", title: "Trusted Factory", body: "Agents coordinate across the lifecycle; humans govern objectives, policy, and risk appetite.", number: "5", tone: "red" },
    ]},
    "risk-tier-review": { rows: true, items: [
      { eyebrow: "Low risk · Green", title: "Automated verification", body: "Documentation, mechanical configuration, and deterministic change. Potential autonomous promotion; sample after the fact.", number: "L" },
      { eyebrow: "Medium risk · Yellow", title: "Lightweight human review", body: "Known dependency updates and bounded features. Review summarized evidence, not every generated line.", number: "M", tone: "amber" },
      { eyebrow: "High risk · Red", title: "Senior, multi-owner review", body: "Architecture, identity, sensitive data, large blast radius, novelty, or weak verification.", number: "H", tone: "red" },
    ]},
    "release-clocks": { columns: 3, items: [
      { eyebrow: "Fast · continuous", title: "Configuration", body: "Models · prompts · routing weights · retrieval parameters. Evaluation-gated and instantly reversible.", number: "F" },
      { eyebrow: "Medium · versioned", title: "Artifacts", body: "Skills · Agent Definitions. Certified, canaried, promoted, and deprecated through an artifact lifecycle.", number: "M", tone: "amber" },
      { eyebrow: "Slow · compatible", title: "Contracts", body: "Runtime · APIs · manifests · events · durable records. Support windows, tolerant readers, and migration protocols.", number: "S", tone: "red" },
    ]},
    "reliability-dimensions": { columns: 3, items: [
      { eyebrow: "State", title: "Durable state", body: "Workflow truth survives model context and process loss." },
      { eyebrow: "Effects", title: "Idempotency", body: "A retried intent does not repeat an external effect." },
      { eyebrow: "Control", title: "Retries", body: "Failures are classified, bounded, and back off safely." },
      { eyebrow: "Control", title: "Timeouts + cancellation", body: "Work stops when told to, at a safe checkpoint." },
      { eyebrow: "Recovery", title: "Worker recovery", body: "A new lease resumes dead-worker work from durable state." },
      { eyebrow: "Capacity", title: "Backpressure", body: "Load is shed deliberately, not discovered by outage." },
      { eyebrow: "Promise", title: "SLOs", body: "Reliability promises are explicit and measured.", tone: "amber" },
      { eyebrow: "Release", title: "Rollback", body: "A known-safe version can be restored and verified.", tone: "amber" },
      { eyebrow: "Accountability", title: "Production ownership", body: "A named team answers for the platform at 3 a.m.", tone: "red" },
    ]},
    "build-vs-buy": { columns: 3, items: [
      { eyebrow: "01 · Differentiation", title: "Does ownership create leverage?", body: "Build when the capability is strategically unique." },
      { eyebrow: "02 · Control", title: "Must we hold the boundary?", body: "Build when security, data, latency, or roadmap requires it." },
      { eyebrow: "03 · Maturity", title: "Is the external option real?", body: "Adopt a stable, well-run product—not a demo with a logo." },
      { eyebrow: "04 · Switching cost", title: "How expensive is exit?", body: "Adopt when an abstraction preserves optionality." },
      { eyebrow: "05 · Total cost", title: "What attention will it consume?", body: "Count build, operations, and opportunity cost together.", tone: "amber" },
      { eyebrow: "06 · Learning speed", title: "Which path teaches us sooner?", body: "Choose the route that gets a real workflow running.", tone: "amber" },
    ]},
    "contribution-model": { split: true, left: {
      eyebrow: "Centralize", title: "Undifferentiated complexity", tone: "green", items: ["Identity + authorization", "Model gateway + routing", "Harness + runtime", "Tool governance", "Evaluation infrastructure", "Observability + evidence"]
    }, right: {
      eyebrow: "Federate", title: "Differentiated expertise", tone: "amber", items: ["Domain-specific skills", "Product knowledge + context", "Specialized agents", "Acceptance criteria", "Differentiated workflows", "Domain evaluation cases"]
    }},
    "signal-diagnosis": { mapping: true, items: [
      ["Large human edits", "Prompt · definition · missing context"],
      ["Repeated task-class rejection", "Model route · skill fit · eval coverage"],
      ["Expensive trajectories", "Skill · tool schema · stopping condition"],
      ["Tool failures", "Contract · validation · environment"],
      ["Unused retrieved context", "Ranking · chunking · freshness · policy"],
      ["Disputed evaluation failures", "Evaluator calibration · dataset drift"],
      ["Defect after a clean pass", "Coverage · verification · risk class"],
    ]},
    "autonomy-by-action-class": { rows: true, items: [
      { eyebrow: "Bounded tuning · instantly reversible", title: "May earn auto-promotion", body: "Prompt refinement, retrieval parameters, or qualified-model routing weights—only after repeatedly beating baseline under a risk stop.", number: "01" },
      { eyebrow: "Capability change · version reversible", title: "Human promotion + canary", body: "New skill version, Agent Definition instruction, or evaluator. Promote with the full evidence packet.", number: "02", tone: "amber" },
      { eyebrow: "Authority change · broad blast radius", title: "Never autonomous", body: "Permissions, security boundaries, destructive operations, and deployment authority require separate approvers and step-up authorization.", number: "03", tone: "red" },
    ]},
    "operator-surfaces": { columns: 3, items: [
      { eyebrow: "Intake", title: "Factory Board", body: "Draft the Mission and compile the Plan. Never dispatch or accept work." },
      { eyebrow: "Coordination", title: "WorkOrders + Tasks", body: "Track execution and verification separately. Task completion cannot imply acceptance." },
      { eyebrow: "Execution", title: "Run + Harness", body: "Inspect the frozen run, receipts, and review gates. Completion cannot create authority." },
      { eyebrow: "Operations", title: "Command + Health", body: "Surface exceptions, readiness, and operating measures. Metrics are not evidence.", tone: "amber" },
      { eyebrow: "Knowledge", title: "Memory + Registry", body: "Inspect context and capabilities. Retrieval and publication do not grant permission.", tone: "amber" },
      { eyebrow: "Experiments", title: "Labs", body: "Keep previews visibly separate until they meet the production golden-path bar.", tone: "red" },
    ]},
  };
  const spec = specs[record.slot];
  if (!spec) return tablePoster(record);
  let body;
  if (spec.split) {
    const column = (side, x) => {
      const accent = side.tone === "amber" ? palette.amber : palette.green;
      return `<rect x="${x}" y="244" width="681" height="630" rx="18" fill="${side.tone === "amber" ? palette.amberSoft : palette.sage}" fill-opacity="0.45" stroke="${accent}" stroke-opacity="0.45"/>
        ${textLines([side.eyebrow.toUpperCase()], x + 32, 287, { size: 14, fill: accent, weight: 750, family: "SFMono-Regular, Consolas, monospace", letterSpacing: 1.4 })}
        ${textLines(wrap(side.title, 30, 2), x + 32, 335, { size: 28, fill: palette.ink, weight: 700 })}
        ${side.items.map((item, index) => `<circle cx="${x + 40}" cy="${427 + index * 66}" r="5" fill="${accent}"/>${textLines([item], x + 61, 434 + index * 66, { size: 20, fill: palette.ink, weight: 550 })}`).join("")}`;
    };
    body = column(spec.left, 98) + column(spec.right, 821);
  } else if (spec.mapping) {
    body = spec.items.map(([signal, source], index) => {
      const y = 250 + index * 87;
      return `<rect x="98" y="${y}" width="1404" height="72" rx="12" fill="${index % 2 ? "#f4f2ec" : palette.sage}" fill-opacity="0.62"/>
        ${textLines(wrap(signal, 34, 2), 126, y + 30, { size: 18, fill: palette.ink, weight: 700 })}
        <path d="M678 ${y + 36} H738" stroke="${palette.amber}" stroke-width="3"/><path d="M730 ${y + 28} L740 ${y + 36} L730 ${y + 44}" fill="none" stroke="${palette.amber}" stroke-width="3"/>
        ${textLines(wrap(source, 48, 2), 776, y + 30, { size: 18, fill: palette.greenDark, weight: 650 })}`;
    }).join("");
  } else if (spec.rows) {
    body = horizontalRows(spec.items);
  } else {
    body = gridCards(spec.items, { columns: spec.columns });
  }
  return posterFrame(record, body);
}

function browserPoster(record) {
  return `<section class="poster">
    <div class="wash wash-amber"></div><div class="wash wash-sage"></div><div class="top-rule"></div>
    <header><span>${escapeXml(metadata(record))}</span><b>AI SOFTWARE FACTORY · THE GUIDE</b></header>
    <h1>${escapeXml(record.title)}</h1>
    <div class="panel"><pre class="mermaid">${escapeXml(record.mermaid)}</pre></div>
    <footer><span>${escapeXml(record.slot)}</span><b>SOURCE-DERIVED · VERSIONABLE · REVIEWABLE</b></footer>
  </section>`;
}

function renderHarness(diagrams) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    @page { size: 1600px 1000px; margin: 0; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #fff; }
    body { font-family: "Avenir Next", Avenir, "Segoe UI", sans-serif; color: ${palette.ink}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .poster { position: relative; width: 1600px; height: 1000px; overflow: hidden; break-after: page; page-break-after: always; background: ${palette.paper}; }
    .poster:last-of-type { break-after: auto; page-break-after: auto; }
    .top-rule { position: absolute; inset: 0 0 auto; height: 9px; background: ${palette.greenDark}; }
    .wash { position: absolute; border-radius: 50%; pointer-events: none; }
    .wash-amber { width: 540px; height: 540px; right: -205px; top: -270px; background: ${palette.amber}; opacity: .065; }
    .wash-sage { width: 520px; height: 520px; left: -280px; bottom: -290px; background: ${palette.green}; opacity: .045; }
    header { position: absolute; left: 72px; right: 72px; top: 40px; height: 52px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid ${palette.line}; font-family: "SFMono-Regular", Consolas, monospace; }
    header span { color: ${palette.green}; font-size: 16px; font-weight: 700; letter-spacing: 1.7px; }
    header b { color: ${palette.muted}; font-size: 14px; letter-spacing: 1.3px; }
    h1 { position: absolute; left: 72px; right: 72px; top: 103px; margin: 0; max-height: 100px; overflow: hidden; color: ${palette.ink}; font-family: Georgia, "Times New Roman", serif; font-size: 48px; font-weight: 500; line-height: 1.08; letter-spacing: -1.2px; }
    .panel { position: absolute; left: 72px; right: 72px; top: 220px; bottom: 100px; padding: 28px 34px; overflow: hidden; border: 2px solid ${palette.line}; border-radius: 22px; background: ${palette.surface}; }
    .mermaid { position: relative; width: 100%; height: 100%; min-width: 0; min-height: 0; margin: 0; overflow: hidden; background: transparent; }
    .mermaid svg { position: absolute !important; inset: 0 !important; display: block !important; width: 100% !important; height: 100% !important; min-width: 0 !important; min-height: 0 !important; max-width: none !important; max-height: none !important; }
    .mermaid .nodeLabel, .mermaid .label, .mermaid .edgeLabel { font-family: "Avenir Next", Avenir, "Segoe UI", sans-serif !important; }
    footer { position: absolute; left: 72px; right: 72px; bottom: 20px; height: 41px; display: flex; align-items: end; justify-content: space-between; border-top: 1px solid ${palette.line}; color: ${palette.muted}; font-family: "SFMono-Regular", Consolas, monospace; font-size: 13px; font-weight: 600; letter-spacing: .8px; }
    footer span, footer b { padding-bottom: 1px; }
    footer b { font-size: 12px; letter-spacing: 1px; }
  </style><script src="${pathToFileURL(mermaidPath).href}"></script></head><body>${diagrams.map(browserPoster).join("")}<script>
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: "base",
    flowchart: { htmlLabels: true, curve: "basis", useMaxWidth: false },
    themeVariables: {
      background: "${palette.surface}", primaryColor: "${palette.sage}", primaryTextColor: "${palette.ink}", primaryBorderColor: "${palette.green}",
      lineColor: "#64736b", secondaryColor: "${palette.amberSoft}", tertiaryColor: "${palette.paper}", fontFamily: "Avenir Next, Avenir, Segoe UI, sans-serif",
      fontSize: "18px", clusterBkg: "#f2f6f2", clusterBorder: "#a9b7af", edgeLabelBackground: "${palette.surface}", noteBkgColor: "${palette.amberSoft}", noteBorderColor: "${palette.amber}"
    },
    themeCSS: ".node rect,.node polygon,.node circle,.node ellipse{stroke-width:1.6px}.edgePath path{stroke-width:2px}.cluster rect{rx:12px;ry:12px}.label text,.nodeLabel{font-weight:550}.edgeLabel{font-size:15px}"
  });
  (async () => {
    await mermaid.run({ nodes: document.querySelectorAll(".mermaid") });
    await document.fonts.ready;
    for (const svg of document.querySelectorAll(".mermaid svg")) {
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    }
    document.documentElement.dataset.ready = "true";
  })();
  </script></body></html>`;
}

async function renderMermaid(diagrams) {
  if (!diagrams.length) return new Map();
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), "guide-infographics-"));
  try {
    const harnessPath = path.join(temporaryRoot, "render.html");
    const pdfPath = path.join(temporaryRoot, "rendered.pdf");
    const pagePrefix = path.join(temporaryRoot, "page");
    await writeFile(harnessPath, renderHarness(diagrams), "utf8");
    if (diagrams.length === 1) {
      const screenshotPath = path.join(temporaryRoot, "single.png");
      await execFileAsync(chromePath, [
        "--headless=new",
        "--disable-gpu",
        "--disable-background-networking",
        "--disable-component-update",
        "--disable-default-apps",
        "--no-first-run",
        `--user-data-dir=${path.join(temporaryRoot, "chrome")}`,
        "--allow-file-access-from-files",
        "--hide-scrollbars",
        "--window-size=1600,1000",
        "--force-device-scale-factor=1",
        "--virtual-time-budget=10000",
        `--screenshot=${screenshotPath}`,
        pathToFileURL(harnessPath).href,
      ], { timeout: 60_000, maxBuffer: 20 * 1024 * 1024 });
      return new Map([[diagrams[0].slot, await readFile(screenshotPath)]]);
    }
    await execFileAsync(chromePath, [
      "--headless=new",
      "--disable-gpu",
      "--disable-background-networking",
      "--disable-component-update",
      "--disable-default-apps",
      "--no-first-run",
      `--user-data-dir=${path.join(temporaryRoot, "chrome")}`,
      "--allow-file-access-from-files",
      `--virtual-time-budget=${Math.max(5000, Math.min(45000, diagrams.length * 400))}`,
      "--no-pdf-header-footer",
      `--print-to-pdf=${pdfPath}`,
      pathToFileURL(harnessPath).href,
    ], { timeout: 120_000, maxBuffer: 120 * 1024 * 1024 });
    await execFileAsync("pdftocairo", ["-png", "-r", "96", pdfPath, pagePrefix], { timeout: 120_000, maxBuffer: 20 * 1024 * 1024 });
    let pageFiles = (await readdir(temporaryRoot))
      .filter((file) => /^page-\d+\.png$/.test(file))
      .sort((left, right) => Number(left.match(/(\d+)/)[1]) - Number(right.match(/(\d+)/)[1]));
    if (pageFiles.length > diagrams.length) {
      const assessed = await Promise.all(pageFiles.map(async (file) => ({
        file,
        entropy: (await sharp(path.join(temporaryRoot, file)).stats()).entropy,
      })));
      pageFiles = assessed.filter(({ entropy }) => entropy > 0.02).map(({ file }) => file);
    }
    if (pageFiles.length !== diagrams.length) throw new Error(`Expected ${diagrams.length} rendered pages, found ${pageFiles.length}`);
    const output = new Map();
    for (let index = 0; index < diagrams.length; index += 1) {
      output.set(diagrams[index].slot, await readFile(path.join(temporaryRoot, pageFiles[index])));
    }
    return output;
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
}

async function runPool(items, concurrency, work) {
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const current = items[index++];
      await work(current);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
}

const allRecords = await collectSlots();
const allDiagramRecords = allRecords.filter(({ mermaid }) => mermaid);
const allManualRecords = allRecords.filter(({ mermaid }) => !mermaid);
if (allRecords.length !== 186 || allDiagramRecords.length !== 164 || allManualRecords.length !== 22) {
  throw new Error(`Unexpected inventory: ${allRecords.length} unique, ${allDiagramRecords.length} Mermaid, ${allManualRecords.length} manual`);
}
const requestedSlots = new Set((process.env.INFOGRAPHIC_SLOTS ?? "").split(",").map((slot) => slot.trim()).filter(Boolean));
const records = requestedSlots.size ? allRecords.filter(({ slot }) => requestedSlots.has(slot)) : allRecords;
if (requestedSlots.size && records.length !== requestedSlots.size) throw new Error("INFOGRAPHIC_SLOTS contains an unknown slot");
const diagramRecords = records.filter(({ mermaid }) => mermaid);
console.log(`Rendering ${diagramRecords.length} source diagrams through Mermaid…`);
const renderedDiagrams = await renderMermaid(diagramRecords);
console.log(`Composing ${records.length} chapter-branded PNGs…`);
let completed = 0;
await runPool(records, 4, async (record) => {
  const source = record.mermaid ? renderedDiagrams.get(record.slot) : Buffer.from(manualPoster(record));
  await sharp(source, record.mermaid ? {} : { density: 144 })
    .resize(WIDTH, HEIGHT, { fit: "fill" })
    .png({ compressionLevel: 9, palette: true, colours: 256, dither: 0.7, effort: 10 })
    .toFile(path.join(assetRoot, `${record.slot}.png`));
  completed += 1;
  if (completed % 20 === 0 || completed === records.length) console.log(`  ${completed}/${records.length}`);
});
console.log(requestedSlots.size ? `Done: ${records.length} selected PNGs.` : `Done: ${records.length} PNGs cover 187 guide references.`);
