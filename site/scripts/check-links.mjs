import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GUIDE_ROUTES } from "../lib/paths.ts";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = path.resolve(siteRoot, "..");
const guideRoot = path.join(repositoryRoot, "guide");
const namedGuideRoutes = new Set(Object.values(GUIDE_ROUTES));

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    if (entry.isFile() && entry.name.endsWith(".md")) files.push(fullPath);
  }

  return files;
}

function localTargets(markdown) {
  const targets = [];
  const linkPattern = /!?\[[^\]]*\]\(([^)]+)\)/g;

  for (const match of markdown.matchAll(linkPattern)) {
    const raw = match[1].trim().replace(/^<|>$/g, "").split(/\s+['"]/)[0];
    if (!raw || /^(?:https?:|mailto:|tel:|data:)/i.test(raw)) continue;
    targets.push(raw);
  }

  return targets;
}

const files = [path.join(repositoryRoot, "README.md"), ...(await walk(guideRoot))];
const missing = [];

for (const sourceFile of files) {
  const markdown = await readFile(sourceFile, "utf8");

  for (const target of localTargets(markdown)) {
    const pathname = decodeURIComponent(target.split("#", 1)[0]);
    if (!pathname) continue;
    if (namedGuideRoutes.has(pathname)) continue;

    const resolved = pathname.startsWith("/")
      ? path.join(repositoryRoot, pathname)
      : path.resolve(path.dirname(sourceFile), pathname);

    try {
      await access(resolved);
    } catch {
      missing.push(`${path.relative(repositoryRoot, sourceFile)} -> ${target}`);
    }
  }
}

if (missing.length > 0) {
  console.error(`Broken local Markdown links (${missing.length}):\n${missing.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Checked local links in ${files.length} Markdown files.`);
}
