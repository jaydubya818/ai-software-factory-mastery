import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const guideRoot = path.join(siteRoot, "..", "guide");
const assetRoot = path.join(guideRoot, "assets", "infographics");
const assets = new Set((await readdir(assetRoot).catch(() => [])).map((f) => f.replace(/\.(png|svg|jpe?g|webp)$/i, "")));

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!["evidence", "assets"].includes(e.name)) out.push(...(await walk(p))); }
    else if (p.endsWith(".md")) out.push(p);
  }
  return out;
}
let total = 0, present = 0;
for (const file of (await walk(guideRoot)).sort()) {
  const { data } = matter(await readFile(file, "utf8"));
  const slots = Array.isArray(data.infographics) ? data.infographics : [];
  for (const slot of slots) {
    total += 1; const has = assets.has(slot); if (has) present += 1;
    console.log(`${has ? "✓" : "·"} ${slot.padEnd(36)} ch.${String(data.chapter ?? "").padEnd(3)} ${path.relative(guideRoot, file)}`);
  }
}
console.log(`\n${present}/${total} slots have an asset in guide/assets/infographics/`);
