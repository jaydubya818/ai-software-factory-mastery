import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const outputRoot = path.resolve(".next/static");
const requiredSelectors = [
  ".site-header",
  ".lifecycle-nav",
  ".premium-hero",
  ".docs-layout",
  ".factory-architecture",
];

async function cssFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const resolved = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await cssFiles(resolved));
    if (entry.isFile() && entry.name.endsWith(".css")) files.push(resolved);
  }
  return files;
}

const files = await cssFiles(outputRoot);
const compiledCss = (await Promise.all(files.map((file) => readFile(file, "utf8")))).join("\n");
const missing = requiredSelectors.filter((selector) => !compiledCss.includes(selector));

if (missing.length > 0 || compiledCss.length < 40_000) {
  throw new Error(`Compiled CSS integrity check failed. Size: ${compiledCss.length} bytes. Missing: ${missing.join(", ") || "none"}.`);
}

console.log(`Verified compiled application CSS (${compiledCss.length} bytes across ${files.length} file${files.length === 1 ? "" : "s"}).`);
