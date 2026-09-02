/**
 * External link check for the guide corpus. Run on a schedule or by hand:
 *   node scripts/check-external-links.mjs            # report
 *   node scripts/check-external-links.mjs --strict   # exit 1 on confirmed 404/410
 * 403/429/network errors are reported but never fail the run — they are usually bot walls.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const guideRoot = path.join(siteRoot, "..", "guide");
const strict = process.argv.includes("--strict");

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

const urls = new Map();
for (const file of await walk(guideRoot)) {
  const text = await readFile(file, "utf8");
  for (const match of text.matchAll(/https?:\/\/[^\s)>"'`\]]+/g)) {
    const url = match[0].replace(/[.,;:]+$/, "");
    if (/127\.0\.0\.1|localhost|\.\.\./.test(url)) continue;
    if (!urls.has(url)) urls.set(url, path.relative(guideRoot, file));
  }
}

async function status(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    let response = await fetch(url, { method: "HEAD", redirect: "follow", signal: controller.signal, headers: { "user-agent": "Mozilla/5.0 (guide-link-check)" } });
    if ([403, 405, 429].includes(response.status)) response = await fetch(url, { method: "GET", redirect: "follow", signal: controller.signal, headers: { "user-agent": "Mozilla/5.0 (guide-link-check)" } });
    return response.status;
  } catch {
    return 0;
  } finally {
    clearTimeout(timer);
  }
}

const entries = [...urls.entries()];
const results = [];
const pool = 10;
let cursor = 0;
await Promise.all(Array.from({ length: pool }, async () => {
  while (cursor < entries.length) {
    const [url, file] = entries[cursor++];
    results.push({ url, file, status: await status(url) });
  }
}));

const dead = results.filter((r) => r.status === 404 || r.status === 410);
const unclear = results.filter((r) => r.status !== 200 && !dead.includes(r));
for (const r of dead) console.log(`DEAD ${r.status} ${r.url}  (${r.file})`);
for (const r of unclear) console.log(`????  ${r.status} ${r.url}  (${r.file})`);
console.log(`${results.length} external URLs · ${dead.length} confirmed dead · ${unclear.length} unclear`);
if (strict && dead.length) process.exit(1);
