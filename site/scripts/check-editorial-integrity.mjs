import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = path.resolve(siteRoot, "..");
const guideRoot = path.join(repositoryRoot, "guide");
const inventoryPath = path.join(repositoryRoot, "docs", "editorial", "content-inventory.generated.md");
const writeInventory = process.argv.includes("--write-inventory");
const checkOrientation = process.argv.includes("--check-orientation");
const checkRelease = process.argv.includes("--check-release");

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === "assets" || entry.name === "evidence") continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    if (entry.isFile() && entry.name.endsWith(".md")) files.push(fullPath);
  }
  return files;
}

function words(value) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

function stripFirstHeading(content) {
  return content.replace(/^\s*#\s+.+?\n+/, "").trim();
}

function withoutCode(markdown) {
  return markdown.replace(/```[\s\S]*?```/g, "");
}

function stripUnfilledInfographicCallouts(markdown, assets) {
  const lines = markdown.split("\n");
  const output = [];
  let pendingSlot = null;
  for (const line of lines) {
    const marker = line.match(/^<!--\s*infographic:\s*([a-z0-9-]+)\s*-->\s*$/i);
    if (marker) {
      pendingSlot = marker[1];
      output.push(line);
      continue;
    }
    if (pendingSlot && /^>\s*\*\*Infographic\s*[—-]/.test(line) && !assets.has(pendingSlot)) {
      pendingSlot = null;
      continue;
    }
    if (line.trim() !== "") pendingSlot = null;
    output.push(line);
  }
  return output.join("\n");
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function headingsFor(markdown) {
  return withoutCode(markdown)
    .split("\n")
    .map((line) => line.match(/^(#{1,3})\s+(.+)$/))
    .filter(Boolean)
    .map((match) => ({
      depth: match[1].length,
      text: match[2].replace(/[*_`]/g, ""),
      id: slugify(match[2]),
    }));
}

function retainMetrics(markdown) {
  const lines = markdown.split("\n");
  const start = lines.findIndex((line) => /^## Retain this\s*$/.test(line));
  if (start === -1) return null;
  let end = lines.findIndex((line, index) => index > start && /^##\s+/.test(line));
  if (end === -1) end = lines.length;
  const section = lines.slice(start + 1, end).join("\n").trim();
  return {
    bullets: section.split("\n").filter((line) => /^-\s+/.test(line)).length,
    words: words(section),
  };
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)] ?? 0;
}

const files = (await walk(guideRoot)).sort();
const infographicAssets = new Set(
  (await readdir(path.join(guideRoot, "assets", "infographics")).catch(() => []))
    .map((name) => name.match(/^(.+)\.(?:png|svg|jpe?g|webp)$/i)?.[1])
    .filter(Boolean),
);
const documents = [];
let sourceWords = 0;

for (const file of files) {
  const sourcePath = path.relative(guideRoot, file).split(path.sep).join("/");
  const raw = await readFile(file, "utf8");
  const parsed = matter(raw);
  const content = stripUnfilledInfographicCallouts(stripFirstHeading(parsed.content), infographicAssets);
  const chapter = typeof parsed.data.chapter === "number" ? parsed.data.chapter : null;
  const stage = typeof parsed.data.stage === "number" ? parsed.data.stage : null;
  const contentType = sourcePath === "README.md"
    ? "overview"
    : stage !== null
      ? "stage"
      : chapter !== null
        ? "chapter"
        : "appendix";
  sourceWords += words(raw);
  documents.push({
    sourcePath,
    title: parsed.data.title ?? headingsFor(parsed.content)[0]?.text ?? sourcePath,
    chapter,
    stage,
    contentType,
    words: words(content),
    headings: headingsFor(parsed.content),
    retain: retainMetrics(content),
  });
}

const mainChapters = documents.filter((document) => document.chapter > 0);
const stages = documents.filter((document) => document.stage !== null);
const glossaryRaw = await readFile(path.join(guideRoot, "appendix", "glossary.md"), "utf8");
const glossaryTerms = [...glossaryRaw.matchAll(/^\*\*([^*\n]+)\*\*/gm)].map((match) => match[1].trim());
const termsByKey = new Map();
for (const term of glossaryTerms) {
  const key = term.normalize("NFKC").toLowerCase().replace(/\s+/g, " ");
  termsByKey.set(key, [...(termsByKey.get(key) ?? []), term]);
}
const duplicateTerms = [...termsByKey.values()].filter((terms) => terms.length > 1);

const principlesRaw = await readFile(path.join(guideRoot, "appendix", "principles.md"), "utf8");
const coreTerms = [...principlesRaw.matchAll(/^\d+\.\s+\*\*([^*]+)\*\*/gm)].map((match) => match[1].trim());

const vagueSources = [];
const canonicalLabels = [];
for (const file of files) {
  const sourcePath = path.relative(guideRoot, file).split(path.sep).join("/");
  const lines = (await readFile(file, "utf8")).split("\n");
  lines.forEach((line, index) => {
    if (/public practitioner talks|a developer-platform leader/i.test(line)) {
      vagueSources.push(`${sourcePath}:${index + 1}`);
    }
    if (/\bcanonical\b/i.test(line) && /model|architecture|diagram|view|stack|lifecycle|framework/i.test(line)) {
      canonicalLabels.push(`${sourcePath}:${index + 1}`);
    }
  });
}

const retainRows = documents
  .filter((document) => document.retain)
  .sort((a, b) => b.retain.words - a.retain.words);
const publicContentWords = documents.reduce((sum, document) => sum + document.words, 0);
const mainChapterWords = mainChapters.reduce((sum, document) => sum + document.words, 0);
const stageWords = stages.reduce((sum, document) => sum + document.words, 0);
const longestChapters = [...mainChapters].sort((a, b) => b.words - a.words).slice(0, 12);

const report = {
  baselineCommit: "2db7fd8",
  documents: documents.length,
  sourceWords,
  publicContentWords,
  mainChapters: mainChapters.length,
  mainChapterWords,
  medianMainChapterWords: median(mainChapters.map((document) => document.words)),
  mainChaptersOver8000: mainChapters.filter((document) => document.words > 8000).length,
  mainChaptersOver10000: mainChapters.filter((document) => document.words > 10000).length,
  stages: stages.length,
  stageWords,
  glossaryEntries: glossaryTerms.length,
  duplicateGlossaryTerms: duplicateTerms,
  coreTerms: coreTerms.length,
  vagueSourceAttributions: vagueSources,
  canonicalLabelCandidates: canonicalLabels,
  longestChapters: longestChapters.map(({ sourcePath, words: wordCount }) => ({ sourcePath, words: wordCount })),
  largestRetainSections: retainRows.slice(0, 12).map(({ sourcePath, retain }) => ({ sourcePath, ...retain })),
};

console.log("Editorial integrity report");
console.log(`Documents: ${report.documents}`);
console.log(`Source words: ${report.sourceWords}`);
console.log(`Public-content words: ${report.publicContentWords}`);
console.log(`Main chapters: ${report.mainChapters} / ${report.mainChapterWords} words / median ${report.medianMainChapterWords}`);
console.log(`Main chapters over 8,000 / 10,000 words: ${report.mainChaptersOver8000} / ${report.mainChaptersOver10000}`);
console.log(`Stage pages: ${report.stages} / ${report.stageWords} words`);
console.log(`Glossary entries: ${report.glossaryEntries} / duplicate definitions: ${report.duplicateGlossaryTerms.length}`);
console.log(`Core-term candidates: ${report.coreTerms}`);
console.log(`Vague source attributions: ${report.vagueSourceAttributions.length}`);
console.log("Longest chapters:");
for (const row of report.longestChapters) console.log(`  ${row.words}  ${row.sourcePath}`);
console.log("Largest Retain this sections:");
for (const row of report.largestRetainSections) console.log(`  ${row.bullets} bullets / ${row.words} words  ${row.sourcePath}`);
if (duplicateTerms.length) console.log(`Duplicate glossary terms: ${duplicateTerms.map((terms) => terms.join(" / ")).join(", ")}`);

if (writeInventory) {
  const lines = [
    "<!-- Generated by site/scripts/check-editorial-integrity.mjs. Do not edit manually. -->",
    "# Editorial content inventory",
    "",
    "This file inventories every published document heading and glossary definition. Editorial ownership and disposition decisions live in `concept-ownership-map.md`.",
    "",
    "## Documents and headings",
    "",
  ];
  for (const document of documents) {
    lines.push(`### ${document.sourcePath}`, "", `- Type: ${document.contentType}`, `- Words: ${document.words}`, "", "Headings:", "");
    for (const heading of document.headings) lines.push(`- H${heading.depth} — ${heading.text} — \`#${heading.id}\``);
    lines.push("");
  }
  lines.push("## Glossary terms", "");
  for (const term of glossaryTerms) {
    const key = term.normalize("NFKC").toLowerCase().replace(/\s+/g, " ");
    const marker = (termsByKey.get(key)?.length ?? 0) > 1 ? " — **duplicate**" : "";
    lines.push(`- ${term}${marker}`);
  }
  await mkdir(path.dirname(inventoryPath), { recursive: true });
  await writeFile(inventoryPath, `${lines.join("\n")}\n`);
  console.log(`Wrote ${path.relative(repositoryRoot, inventoryPath)}`);
}

const failures = [];
function expect(condition, message) {
  if (!condition) failures.push(message);
}

if (checkOrientation || checkRelease) {
  const chapterTwo = documents.find((document) => document.sourcePath === "01-understand/02-the-factory-in-one-view.md");
  expect(report.documents === 57, `expected 57 published documents, found ${report.documents}`);
  expect(report.mainChapters === 36, `expected 36 main chapters, found ${report.mainChapters}`);
  expect(report.stages === 8, `expected 8 stage pages, found ${report.stages}`);
  expect(chapterTwo && chapterTwo.words >= 4000 && chapterTwo.words <= 5000, `Chapter 2 must contain 4,000–5,000 words; found ${chapterTwo?.words ?? 0}`);
  expect(chapterTwo?.retain && chapterTwo.retain.bullets >= 5 && chapterTwo.retain.bullets <= 7, `Chapter 2 Retain this must have 5–7 bullets; found ${chapterTwo?.retain?.bullets ?? 0}`);
  expect((chapterTwo?.retain?.words ?? Infinity) <= 220, `Chapter 2 Retain this must contain no more than 220 words; found ${chapterTwo?.retain?.words ?? 0}`);
  for (const stage of stages) expect(stage.words >= 800 && stage.words <= 1500, `${stage.sourcePath} must contain 800–1,500 words; found ${stage.words}`);
  expect(stageWords <= 12000, `stage pages must contain no more than 12,000 words; found ${stageWords}`);
}

if (checkRelease) {
  expect(mainChapterWords >= 230000 && mainChapterWords <= 240000, `main chapters must contain 230,000–240,000 words; found ${mainChapterWords}`);
  expect(report.medianMainChapterWords <= 6500, `median main chapter must contain no more than 6,500 words; found ${report.medianMainChapterWords}`);
  for (const chapter of mainChapters) expect(chapter.words <= 10000, `${chapter.sourcePath} exceeds 10,000 words (${chapter.words})`);
  expect(publicContentWords >= 300000 && publicContentWords <= 315000, `public corpus must contain 300,000–315,000 words; found ${publicContentWords}`);
  for (const document of retainRows) {
    expect(document.retain.bullets >= 5 && document.retain.bullets <= 7, `${document.sourcePath} Retain this must have 5–7 bullets; found ${document.retain.bullets}`);
    expect(document.retain.words <= 220, `${document.sourcePath} Retain this exceeds 220 words (${document.retain.words})`);
  }
  expect(duplicateTerms.length === 0, `duplicate glossary terms remain: ${duplicateTerms.map((terms) => terms.join(" / ")).join(", ")}`);
  expect(coreTerms.length === 50, `expected exactly 50 core terms, found ${coreTerms.length}`);
  expect(vagueSources.length === 0, `vague source attributions remain: ${vagueSources.join(", ")}`);
}

if (failures.length) {
  console.error(`Editorial integrity failures (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exitCode = 1;
}
