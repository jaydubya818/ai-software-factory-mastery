/**
 * Accessibility check with axe-core against a running site (default http://localhost:3000),
 * in light and dark themes. Usage: node scripts/check-a11y.mjs [baseUrl] [--strict]
 */
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const baseUrl = process.argv.find((arg) => arg.startsWith("http")) ?? "http://localhost:3000";
const strict = process.argv.includes("--strict");
const routes = [
  "/guide",
  "/guide/atlas",
  "/guide/topics",
  "/guide/01-understand/02-the-factory-in-one-view",
  "/guide/glossary",
];
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
let total = 0;
for (const theme of ["light", "dark"]) {
  for (const route of routes) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    await page.evaluate((t) => { document.documentElement.dataset.theme = t; }, theme);
    await page.waitForTimeout(300);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).exclude("svg[id^='mermaid']").exclude(".mermaid").analyze();
    const serious = results.violations.filter((v) => ["serious", "critical"].includes(v.impact ?? ""));
    const nodes = serious.reduce((n, v) => n + v.nodes.length, 0);
    total += nodes;
    console.log(`${theme.padEnd(5)} ${route.padEnd(52)} ${nodes} failing nodes` + (serious.length ? ` — ${serious.map((v) => `${v.id}(${v.nodes.length})`).join(", ")}` : ""));
    for (const v of serious) for (const node of v.nodes.slice(0, 3)) console.log(`      ${v.id}: ${node.target.join(" ")}  ${node.failureSummary?.split("\n")[1]?.trim() ?? ""}`);
    await context.close();
  }
}
await browser.close();
console.log(`${total} serious/critical failing nodes`);
if (strict && total) process.exit(1);
