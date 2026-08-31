import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = path.resolve(siteRoot, "..");
const guideRoot = path.join(repositoryRoot, "guide");
const outputRoot = path.join(siteRoot, "lib");

const sectionNames = {
  "00-overview": "Start Here",
  "01-vision": "Vision",
  "02-first-principles": "First Principles",
  "03-operating-model": "Operating Model",
  "04-domain-model": "Domain Model",
  "05-runtime-architecture": "Runtime Architecture",
  "06-ai-engineering": "AI Engineering",
  "07-quality-engineering": "Quality Engineering",
  "08-security-and-governance": "Security & Governance",
  "09-mission-control-case-studies": "Case Studies",
  "10-labs": "Labs",
  "11-interview-mastery": "Interview Practice",
  "12-research-journal": "Research Journal",
};

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "evidence") continue;
      files.push(...(await walk(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function cleanSlug(relativePath) {
  const withoutExtension = relativePath.replace(/\.md$/, "");
  if (withoutExtension === "README") return "curriculum";
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
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`|~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractDescription(markdown) {
  const purpose = markdown.match(/- \*\*Purpose:\*\*\s+([\s\S]*?)(?=\n- \*\*|\n\n)/);
  if (purpose) return plainText(purpose[1]);

  const paragraphs = markdown.split(/\n\s*\n/);
  const first = paragraphs.find((paragraph) => {
    const value = paragraph.trim();
    return value && !value.startsWith("#") && !value.startsWith("```") && !value.startsWith("|");
  });
  return plainText(first ?? "").slice(0, 240);
}

function normalizeDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function readingMinutes(markdown, words) {
  const declared = markdown.match(/- \*\*Reading time:\*\*\s+(\d+)\s+minutes?/i);
  return declared ? Number(declared[1]) : Math.max(1, Math.ceil(words / 220));
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
 * Reduce a raw Markdown heading to the text react-markdown renders for it.
 *
 * The heading element's own id is slugified in app/components/Markdown.tsx from
 * the rendered text, so the table of contents has to start from the same string
 * or its links point at anchors that do not exist. Links and images are the
 * cases that matter: they spell more than they render.
 */
function renderedHeadingText(heading) {
  return heading
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractHeadings(markdown) {
  return markdown
    .split("\n")
    .map((line) => line.match(/^(#{2,3})\s+(.+)$/))
    .filter(Boolean)
    .map((match) => {
      const text = renderedHeadingText(match[2]);
      return { depth: match[1].length, text, id: slugify(text) };
    });
}

const files = (await walk(guideRoot)).sort();
const documents = [];

for (const file of files) {
  const sourcePath = path.relative(guideRoot, file).split(path.sep).join("/");
  const raw = await readFile(file, "utf8");
  const parsed = matter(raw);
  const body = stripFirstHeading(parsed.content);
  const title = parsed.data.title ?? parsed.content.match(/^#\s+(.+)$/m)?.[1] ?? sourcePath;
  const sectionKey = sourcePath.includes("/") ? sourcePath.split("/")[0] : "reference";
  const section = sectionNames[sectionKey] ?? "Reference";
  const words = plainText(body).split(/\s+/).filter(Boolean).length;

  documents.push({
    slug: cleanSlug(sourcePath),
    sourcePath,
    title,
    section,
    sectionKey,
    status: parsed.data.status ?? "reference",
    audience: Array.isArray(parsed.data.audience) ? parsed.data.audience : [],
    lastVerified: normalizeDate(parsed.data.last_verified),
    description: extractDescription(body),
    readingMinutes: readingMinutes(body, words),
    hasQuickRead: /^## Quick Read$/m.test(body),
    headings: extractHeadings(body),
    content: body,
  });
}

documents.sort((a, b) => {
  if (a.sectionKey !== b.sectionKey) return a.sectionKey.localeCompare(b.sectionKey);
  return a.sourcePath.localeCompare(b.sourcePath);
});

const searchIndex = documents.map((document) => ({
  slug: document.slug,
  title: document.title,
  section: document.section,
  description: document.description,
  headings: document.headings.map((heading) => heading.text),
  text: plainText(document.content),
}));

await mkdir(outputRoot, { recursive: true });
await writeFile(
  path.join(outputRoot, "content.generated.ts"),
  `/* Generated by scripts/generate-content.mjs. Do not edit directly. */\nexport const documents = ${JSON.stringify(documents, null, 2)} as const;\n`,
);
await writeFile(
  path.join(outputRoot, "search.generated.ts"),
  `/* Generated by scripts/generate-content.mjs. Do not edit directly. */\nexport const searchIndex = ${JSON.stringify(searchIndex, null, 2)} as const;\n`,
);

console.log(`Generated ${documents.length} curriculum documents.`);
