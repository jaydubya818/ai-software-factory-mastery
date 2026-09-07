import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const origin = process.env.GUIDE_TEST_ORIGIN ?? "http://127.0.0.1:4175";
const output = new URL("../test-results/reader/", import.meta.url);
await mkdir(output, { recursive: true });
const report = { origin, checks: [], screenshots: [], consoleErrors: [] };
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });

async function waitForPath(page, pattern) {
  await page.waitForURL((url) => pattern.test(`${url.pathname}${url.hash}`));
}

for (const viewport of [{ name: "desktop", width: 1440, height: 900 }, { name: "mobile", width: 390, height: 844 }]) {
  const context = await browser.newContext({ viewport });
  await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin });
  const page = await context.newPage();
  page.on("console", (message) => { if (message.type() === "error" && !message.text().startsWith("Failed to load resource")) report.consoleErrors.push(`${viewport.name}: ${message.text()}`); });
  page.on("requestfailed", (request) => { const error = request.failure()?.errorText ?? "request failed"; if (request.url().startsWith(origin) && error !== "net::ERR_ABORTED") report.consoleErrors.push(`${viewport.name}: ${request.url()} ${error}`); });
  page.on("pageerror", (error) => report.consoleErrors.push(`${viewport.name}: ${error.message}`));

  await page.goto(`${origin}/guide`, { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator("body").evaluate((node) => node.scrollWidth <= node.clientWidth + 1), true);
  const homeShot = new URL(`guide-home-${viewport.name}.png`, output).pathname;
  await page.screenshot({ path: homeShot, fullPage: true });
  report.screenshots.push(homeShot);

  await page.goto(`${origin}/guide/01-understand/02-the-factory-in-one-view`, { waitUntil: "domcontentloaded" });
  await page.keyboard.press("Tab");
  assert.equal(await page.locator(".skip-link").evaluate((node) => node === document.activeElement), true);
  await page.keyboard.press("Enter");
  assert.equal(await page.locator("#main-content").evaluate((node) => node === document.activeElement), true);
  assert.ok(await page.locator(".toc-depth-3 a").count() > 0, "H3 subsections appear in chapter navigation");
  assert.equal(await page.locator("body").evaluate((node) => node.scrollWidth <= node.clientWidth + 1), true);

  const diagramButton = page.getByRole("button", { name: "View full-size" }).first();
  await diagramButton.waitFor();
  await diagramButton.click();
  const diagramDialog = page.getByRole("dialog", { name: /full-size/ });
  await diagramDialog.waitFor();
  const duplicateSvgIds = await page.locator("svg [id]").evaluateAll((nodes) => {
    const ids = nodes.map((node) => node.id);
    return ids.filter((id, index) => ids.indexOf(id) !== index);
  });
  assert.deepEqual(duplicateSvgIds, [], "expanded diagram does not duplicate SVG IDs");
  await page.keyboard.press("Shift+Tab");
  assert.equal(await diagramDialog.locator(".diagram-dialog-canvas").evaluate((node) => node === document.activeElement), true, "Shift+Tab wraps within the dialog");
  await page.keyboard.press("Tab");
  assert.equal(await page.getByRole("button", { name: "Close" }).evaluate((node) => node === document.activeElement), true, "Tab remains contained in the dialog");
  await page.keyboard.press("Escape");
  await page.waitForFunction((button) => button === document.activeElement, await diagramButton.elementHandle());
  assert.ok(await page.getByText("Read diagram as text").count() > 0);

  await page.goto(`${origin}/guide/02-design/07-governance-policy-and-risk-proportional-approval`, { waitUntil: "domcontentloaded" });
  const copyButton = page.locator(".code-block button").first();
  await copyButton.focus();
  await copyButton.press("Enter");
  await page.getByRole("button", { name: "Copied" }).waitFor();
  const codeText = await page.locator(".code-block pre").first().innerText();
  assert.equal(await page.evaluate(() => navigator.clipboard.readText()), codeText, "keyboard copy writes the complete code block");
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: () => Promise.reject(new Error("blocked for fallback test")) } }));
  await copyButton.press("Enter");
  await page.getByText("The code is selected so you can copy it manually.").waitFor();
  assert.equal((await page.evaluate(() => window.getSelection()?.toString()))?.trimEnd(), codeText.trimEnd(), "failed copy selects the complete code block");

  await page.goto(`${origin}/guide/search`, { waitUntil: "domcontentloaded" });
  const search = page.locator(".search-box input");
  await search.fill("multi repository");
  await page.getByText(/matching section/).waitFor();
  assert.ok(await page.locator("#search-results [role=option]").count() > 0);
  const firstSelection = await search.getAttribute("aria-activedescendant");
  await search.press("ArrowDown");
  assert.notEqual(await search.getAttribute("aria-activedescendant"), firstSelection, "ArrowDown changes the selected result");
  await search.press("ArrowUp");
  assert.equal(await search.getAttribute("aria-activedescendant"), firstSelection, "ArrowUp restores the expected result");
  await search.press("Enter");
  await waitForPath(page, /#.+/);
  report.checks.push(`${viewport.name}: spaced search reached a subsection`);

  await page.goto(`${origin}/guide`, { waitUntil: "domcontentloaded" });
  const paletteTrigger = page.locator(".command-trigger[data-ready='true']");
  await paletteTrigger.focus();
  await page.keyboard.press("Control+k");
  const paletteInput = page.getByRole("combobox", { name: "Search the Guide and navigate" });
  await paletteInput.fill("Factory Deployed Engineer");
  await page.getByRole("option", { name: /Factory Deployed Engineer/ }).first().waitFor();
  await paletteInput.press("Enter");
  await waitForPath(page, /glossary#term-factory-deployed-engineer$/);
  assert.equal(await page.locator("#term-factory-deployed-engineer").count(), 1);

  await page.goto(`${origin}/guide`, { waitUntil: "domcontentloaded" });
  await paletteTrigger.focus();
  await page.keyboard.press("Control+k");
  await page.keyboard.press("Escape");
  await page.waitForFunction((button) => button === document.activeElement, await paletteTrigger.elementHandle());

  for (const term of ["factory-version", "verification-subject", "factory-deployed-engineer"]) {
    await page.goto(`${origin}/guide/glossary#term-${term}`, { waitUntil: "domcontentloaded" });
    assert.equal(await page.locator(`#term-${term}`).count(), 1);
  }

  const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).exclude("svg[id^='mermaid']").analyze();
  const severe = axe.violations.filter((item) => ["serious", "critical"].includes(item.impact ?? ""));
  assert.deepEqual(severe.map((item) => item.id), [], `serious/critical accessibility findings: ${severe.map((item) => item.id).join(", ")}`);

  await page.goto(`${origin}/guide/01-understand/02-the-factory-in-one-view`, { waitUntil: "domcontentloaded" });
  await page.setViewportSize({ width: Math.max(320, Math.floor(viewport.width / 2)), height: viewport.height });
  assert.equal(await page.locator("body").evaluate((node) => node.scrollWidth <= node.clientWidth + 1), true, "no page overflow at 200% zoom");
  report.checks.push(`${viewport.name}: keyboard, search, palette, glossary, diagram, axe, overflow and zoom passed`);
  await context.close();
}

await browser.close();
assert.deepEqual(report.consoleErrors, []);
await writeFile(new URL("report.json", output), JSON.stringify(report, null, 2));
console.log(`Reader browser checks passed: ${report.checks.length} checkpoints, ${report.screenshots.length} screenshots, zero console errors.`);
