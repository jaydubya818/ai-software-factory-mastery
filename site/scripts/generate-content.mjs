import { readdir, readFile, writeFile, mkdir, copyFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = path.resolve(siteRoot, "..");
const guideRoot = path.join(repositoryRoot, "guide");
const outputRoot = path.join(siteRoot, "lib");

const sectionNames = {
  "00-front-matter": "Front matter",
  stages: "The factory in one line",
  "01-understand": "Part I — Understand",
  "02-design": "Part II — Design",
  "03-build": "Part III — Build",
  "04-prove": "Part IV — Prove",
  "05-operate": "Part V — Operate",
  "06-improve": "Part VI — Improve",
  appendix: "Appendix",
};

const sectionOrder = [
  "00-front-matter",
  "stages",
  "01-understand",
  "02-design",
  "03-build",
  "04-prove",
  "05-operate",
  "06-improve",
  "appendix",
];

const appendixGroups = {
  "mission-control": "Mission Control case studies",
  research: "Research",
};

const appendixGroupOrder = ["Reference", "Mission Control case studies", "Research"];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "evidence" || entry.name === "assets") continue;
      files.push(...(await walk(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function cleanSlug(relativePath) {
  const withoutExtension = relativePath.replace(/\.md$/, "");
  if (withoutExtension === "README") return "guide";
  if (withoutExtension.endsWith("/README")) {
    return `${withoutExtension.replace(/\/README$/, "")}/start-here`;
  }
  return withoutExtension;
}

function stripFirstHeading(content) {
  return content.replace(/^\s*#\s+.+?\n+/, "").trim();
}

function plainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`|~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractDescription(markdown) {
  const paragraphs = markdown.split(/\n\s*\n/);
  const first = paragraphs.find((paragraph) => {
    const value = paragraph.trim();
    return value && !value.startsWith("#") && !value.startsWith("```") && !value.startsWith("|") && !value.startsWith("<!--") && !value.startsWith(">");
  });
  return plainText(first ?? "").slice(0, 240);
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Readers should not see "Infographic — … (Jay's graphic goes here.)" callouts for
 * slots that have no asset yet. The `<!-- infographic: slot -->` marker stays so the
 * renderer can drop the asset in when it arrives; the Mermaid fallback beneath stays too.
 */
function stripUnfilledInfographicCallouts(markdown, assets) {
  const lines = markdown.split("\n");
  const out = [];
  let pendingSlot = null;
  for (const line of lines) {
    const marker = line.match(/^<!--\s*infographic:\s*([a-z0-9-]+)\s*-->\s*$/i);
    if (marker) { pendingSlot = marker[1]; out.push(line); continue; }
    if (pendingSlot && /^>\s*\*\*Infographic\s*[—-]/.test(line)) {
      if (!assets[pendingSlot]) { pendingSlot = null; continue; }
    }
    if (line.trim() !== "") pendingSlot = null;
    out.push(line);
  }
  return out.join("\n");
}

/** Split a document into heading-level sections for search. */
function sectionsFor(markdown) {
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, "");
  const sections = [];
  let current = { id: "", heading: "", lines: [] };
  for (const line of withoutCode.split("\n")) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      if (current.lines.length) sections.push(current);
      current = { id: slugify(match[2]), heading: match[2].replace(/[*_`]/g, ""), lines: [] };
      continue;
    }
    current.lines.push(line);
  }
  if (current.lines.length) sections.push(current);
  return sections
    .map((section) => ({ id: section.id, heading: section.heading, text: plainText(section.lines.join("\n")).slice(0, 6000) }))
    .filter((section) => section.text.length > 40);
}

function extractHeadings(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .split("\n")
    .map((line) => line.match(/^(#{2,3})\s+(.+)$/))
    .filter(Boolean)
    .map((match) => ({
      depth: match[1].length,
      text: match[2].replace(/[*_`]/g, ""),
      id: slugify(match[2]),
    }));
}

function sectionKeyFor(sourcePath) {
  if (!sourcePath.includes("/")) return "appendix";
  return sourcePath.split("/")[0];
}

function groupFor(sectionKey, sourcePath) {
  if (sectionKey !== "appendix") return null;
  const parts = sourcePath.split("/");
  return parts.length > 2 ? (appendixGroups[parts[1]] ?? "Reference") : "Reference";
}

function contentType(sectionKey, group, sourcePath) {
  if (sourcePath === "README.md") return "overview";
  if (group === "Mission Control case studies") return "case study";
  if (sectionKey === "appendix") return "appendix";
  if (sectionKey === "stages") return "stage";
  return "chapter";
}

function lenientFrontmatter(raw) {
  // Fallback for chapters whose YAML has an unquoted colon in a scalar value.
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!pair) continue;
    const [, key, value] = pair;
    const trimmed = value.trim();
    if (/^\[.*\]$/.test(trimmed)) {
      data[key] = trimmed.slice(1, -1).split(",").map((entry) => entry.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
    } else if (/^-?\d+$/.test(trimmed)) {
      data[key] = Number(trimmed);
    } else {
      data[key] = trimmed.replace(/^["']|["']$/g, "");
    }
  }
  return { data, content: match[2] };
}

function parseFrontmatter(raw, sourcePath) {
  try {
    return matter(raw);
  } catch (error) {
    console.warn(`Lenient frontmatter parse for ${sourcePath}: ${error.reason ?? error.message}`);
    return lenientFrontmatter(raw);
  }
}

function stringList(value) {
  return Array.isArray(value) ? value.map((entry) => String(entry)) : [];
}

// Infographic assets: guide/assets/infographics/<slot>.(png|svg|jpg|webp) -> /infographics/<slot>.<ext>
const assetRoot = path.join(guideRoot, "assets", "infographics");
const publicAssetRoot = path.join(siteRoot, "public", "infographics");
await rm(publicAssetRoot, { recursive: true, force: true });
await mkdir(publicAssetRoot, { recursive: true });
const infographicAssets = {};
for (const name of (await readdir(assetRoot).catch(() => [])).sort()) {
  const match = name.match(/^(.+)\.(png|svg|jpe?g|webp)$/i);
  if (!match) continue;
  await copyFile(path.join(assetRoot, name), path.join(publicAssetRoot, name));
  infographicAssets[match[1]] = `/infographics/${name}`;
}

const files = (await walk(guideRoot)).sort();
const documents = [];

for (const file of files) {
  const sourcePath = path.relative(guideRoot, file).split(path.sep).join("/");
  const raw = await readFile(file, "utf8");
  const parsed = parseFrontmatter(raw, sourcePath);
  const body = stripFirstHeading(parsed.content);
  const title = parsed.data.title ?? parsed.content.match(/^#\s+(.+)$/m)?.[1] ?? sourcePath;
  const sectionKey = sectionKeyFor(sourcePath);
  const section = sectionNames[sectionKey] ?? "Appendix";
  const group = groupFor(sectionKey, sourcePath);
  const summary = parsed.data.summary ? String(parsed.data.summary).trim() : "";
  const chapter = typeof parsed.data.chapter === "number" ? parsed.data.chapter : null;

  documents.push({
    slug: cleanSlug(sourcePath),
    sourcePath,
    title,
    section,
    sectionKey,
    group,
    part: parsed.data.part ? String(parsed.data.part) : null,
    chapter,
    stage: typeof parsed.data.stage === "number" ? parsed.data.stage : null,
    summary,
    infographics: stringList(parsed.data.infographics),
    infographicAssets: Object.fromEntries(
      stringList(parsed.data.infographics).filter((slot) => infographicAssets[slot]).map((slot) => [slot, infographicAssets[slot]]),
    ),
    contentType: contentType(sectionKey, group, sourcePath),
    description: summary || extractDescription(body),
    headings: extractHeadings(body),
    content: stripUnfilledInfographicCallouts(body, infographicAssets),
  });
}

documents.sort((a, b) => {
  if (a.sectionKey !== b.sectionKey) {
    const aOrder = sectionOrder.indexOf(a.sectionKey);
    const bOrder = sectionOrder.indexOf(b.sectionKey);
    const normalizedA = aOrder === -1 ? sectionOrder.length : aOrder;
    const normalizedB = bOrder === -1 ? sectionOrder.length : bOrder;
    if (normalizedA !== normalizedB) return normalizedA - normalizedB;
    return a.sectionKey.localeCompare(b.sectionKey);
  }
  if (a.sectionKey === "appendix") {
    // Book map first, then reference appendices, case studies, research.
    if (a.contentType === "overview" || b.contentType === "overview") return a.contentType === "overview" ? -1 : 1;
    const aGroup = appendixGroupOrder.indexOf(a.group);
    const bGroup = appendixGroupOrder.indexOf(b.group);
    if (aGroup !== bGroup) return aGroup - bGroup;
  }
  if (a.chapter !== null && b.chapter !== null && a.chapter !== b.chapter) return a.chapter - b.chapter;
  return a.sourcePath.localeCompare(b.sourcePath);
});

const searchIndex = documents.map((document) => ({
  slug: document.slug,
  title: document.title,
  section: document.section,
  group: document.group,
  chapter: document.chapter,
  stage: document.stage,
  contentType: document.contentType,
  description: document.description,
  sections: sectionsFor(document.content),
}));

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-software-factory-mastery.vercel.app";
const staticRoutes = ["/", "/guide", "/visuals", "/architecture", "/topics", "/coverage", "/search", "/glossary"];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
  ...staticRoutes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`),
  ...documents.map((document) => `  <url><loc>${siteUrl}/docs/${document.slug}</loc></url>`),
].join("\n")}\n</urlset>\n`;

const paletteIndex = documents.map((document) => ({
  slug: document.slug,
  title: document.title,
  section: document.section,
  sectionKey: document.sectionKey,
  group: document.group,
  chapter: document.chapter,
  stage: document.stage,
  contentType: document.contentType,
  description: document.description,
  headings: document.headings.map((heading) => heading.text),
}));

await mkdir(outputRoot, { recursive: true });
await writeFile(
  path.join(outputRoot, "content.generated.ts"),
  `/* Generated by scripts/generate-content.mjs. Do not edit directly. */\nexport const documents = ${JSON.stringify(documents, null, 2)} as const;\n`,
);
await mkdir(path.join(siteRoot, "public"), { recursive: true });
await writeFile(path.join(siteRoot, "public", "search-index.json"), JSON.stringify(searchIndex));
await writeFile(path.join(siteRoot, "public", "sitemap.xml"), sitemap);
await writeFile(path.join(siteRoot, "public", "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
await rm(path.join(outputRoot, "search.generated.ts"), { force: true });
await writeFile(
  path.join(outputRoot, "palette.generated.ts"),
  `/* Generated by scripts/generate-content.mjs. Do not edit directly. */\nexport const paletteIndex = ${JSON.stringify(paletteIndex, null, 2)} as const;\n`,
);

console.log(`Generated ${documents.length} guide documents.`);
