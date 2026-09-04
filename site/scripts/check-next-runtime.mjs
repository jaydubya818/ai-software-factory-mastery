/**
 * Smoke-test the native Next.js runtime after the native test build.
 * This complements the fast Vinext render suite with real Next route,
 * redirect, not-found, and public-asset semantics.
 */
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { request as httpRequest } from "node:http";
import { createServer } from "node:net";
import { chromium } from "playwright";

const host = "127.0.0.1";
const root = new URL("..", import.meta.url);
const expectedSiteOrigin = process.env.GUIDE_RUNTIME_EXPECTED_SITE_URL
  ?? "https://ai-software-factory-mastery.vercel.app";
const expectedGuideCanonical = new URL("/guide", expectedSiteOrigin).href;

async function availablePort() {
  const server = createServer();
  server.listen(0, host);
  await once(server, "listening");
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const { port } = address;
  server.close();
  await once(server, "close");
  return port;
}

async function startNext({ legacyRedirectsEnabled = false } = {}) {
  const port = await availablePort();
  const origin = `http://${host}:${port}`;
  const nextEnvironment = { ...process.env };
  delete nextEnvironment.NEXT_PUBLIC_SITE_URL;
  delete nextEnvironment.FDLC_MFE_SOURCE_COMMIT;
  delete nextEnvironment.GUIDE_LEGACY_REDIRECTS_ENABLED;
  delete nextEnvironment.GUIDE_MFE_PREVIEW_ENABLED;
  delete nextEnvironment.GUIDE_MFE_PRODUCTION_ENABLED;
  delete nextEnvironment.GUIDE_STANDALONE_VINEXT;
  delete nextEnvironment.GUIDE_VERCEL_BUILD;
  delete nextEnvironment.FDLC_MFE_CONFIG_SHA256;
  delete nextEnvironment.VC_MICROFRONTENDS_CONFIG;
  delete nextEnvironment.VC_MICROFRONTENDS_CONFIG_FILE_NAME;
  delete nextEnvironment.VERCEL;
  delete nextEnvironment.VERCEL_ENV;
  delete nextEnvironment.VERCEL_PROJECT_NAME;
  nextEnvironment.GUIDE_NATIVE_LOCAL = "1";
  if (legacyRedirectsEnabled) nextEnvironment.GUIDE_LEGACY_REDIRECTS_ENABLED = "true";

  const next = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "--hostname", host, "--port", String(port)],
    { cwd: root, env: nextEnvironment, stdio: ["ignore", "pipe", "pipe"] },
  );

  let output = "";
  next.stdout.on("data", (chunk) => { output += chunk; });
  next.stderr.on("data", (chunk) => { output += chunk; });

  async function request(pathname) {
    return fetch(`${origin}${pathname}`, { redirect: "manual" });
  }

  async function requestAsLegacyHost(pathname, method = "GET") {
    return new Promise((resolve, reject) => {
      const outgoing = httpRequest({
        hostname: host,
        port,
        path: pathname,
        method,
        headers: { host: "AI-SOFTWARE-FACTORY-MASTERY.VERCEL.APP:443" },
      }, (response) => {
        response.resume();
        response.once("end", () => resolve({
          status: response.statusCode ?? 0,
          headers: {
            get(name) {
              const value = response.headers[name.toLowerCase()];
              return Array.isArray(value) ? value.join(", ") : value ?? null;
            },
          },
        }));
      });
      outgoing.once("error", reject);
      outgoing.end();
    });
  }

  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (next.exitCode !== null) throw new Error(`Next exited before becoming ready.\n${output}`);
    try {
      const response = await request("/guide");
      if (response.status === 200) break;
    } catch {
      // The server socket is not ready yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  if (Date.now() >= deadline) throw new Error(`Timed out waiting for Next.\n${output}`);

  return {
    origin,
    request,
    requestAsLegacyHost,
    async stop() {
      next.kill("SIGTERM");
      if (next.exitCode === null) {
        await Promise.race([once(next, "exit"), new Promise((resolve) => setTimeout(resolve, 5_000))]);
      }
      if (next.exitCode === null) next.kill("SIGKILL");
    },
  };
}

function managedNextAssets(html) {
  return [...new Set(
    [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)]
      .map((match) => match[1])
      .filter((asset) => asset.includes("/_next/") && /\.(?:css|js)(?:\?|$)/.test(asset)),
  )];
}

async function verifyBrowserRuntime(origin) {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });

  try {
    const page = await browser.newPage();
    const pageErrors = [];
    const consoleErrors = [];
    const failedManagedAssets = [];
    const loadedManagedAssets = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("response", (response) => {
      const resourceType = response.request().resourceType();
      if (!["script", "stylesheet"].includes(resourceType) || !response.url().includes("/_next/")) return;
      const pathname = new URL(response.url()).pathname;
      loadedManagedAssets.push({ pathname, resourceType, status: response.status() });
      if (!pathname.startsWith("/vc-ap-dd2962/_next/") || response.status() < 200 || response.status() >= 300) {
        failedManagedAssets.push(`${response.status()} ${pathname}`);
      }
    });
    page.on("requestfailed", (request) => {
      const resourceType = request.resourceType();
      if (["script", "stylesheet"].includes(resourceType)) {
        failedManagedAssets.push(`${request.failure()?.errorText ?? "request failed"} ${request.url()}`);
      }
    });

    const searchResponse = await page.goto(`${origin}/guide/search`, { waitUntil: "networkidle" });
    assert.equal(searchResponse?.status(), 200);
    const input = page.getByPlaceholder("Search agents, harnesses, evidence, environments…");
    await input.fill("evidence architecture");
    await page.waitForFunction(() => {
      const summary = document.querySelector(".search-summary")?.textContent ?? "";
      return /matching section/.test(summary);
    });
    assert.ok(await page.locator(".search-result").count() > 0, "hydrated search should render results");
    assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
    await page.getByRole("button", { name: "Use dark theme" }).click();
    assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");

    const linkedHeadingResponse = await page.goto(
      `${origin}/guide/03-build/25-the-12-layer-production-ai-agent-stack`,
      { waitUntil: "networkidle" },
    );
    assert.equal(linkedHeadingResponse?.status(), 200);
    assert.ok(
      await page.locator("h3 > a:not(.heading-anchor)").count() >= 12,
      "linked headings should retain their inline links without nested permalink anchors",
    );
    await page.reload({ waitUntil: "networkidle" });
    assert.deepEqual(pageErrors, []);
    assert.deepEqual(consoleErrors, []);

    const mermaidResponse = await page.goto(
      `${origin}/guide/02-design/07-governance-policy-and-risk-proportional-approval`,
      { waitUntil: "networkidle" },
    );
    assert.equal(mermaidResponse?.status(), 200);
    await page.locator(".mermaid-diagram svg").first().waitFor({ timeout: 15_000 });
    assert.equal(await page.locator(".mermaid-fallback").count(), 0);
    assert.ok(loadedManagedAssets.some((asset) => asset.resourceType === "script"));
    assert.ok(loadedManagedAssets.some((asset) => asset.resourceType === "stylesheet"));
    assert.deepEqual(pageErrors, []);
    assert.deepEqual(consoleErrors, []);
    assert.deepEqual(failedManagedAssets, []);

    const response = await page.goto(`${origin}/guide/not-a-real-page`, { waitUntil: "networkidle" });
    assert.equal(response?.status(), 404);
    assert.equal(await page.locator("h1").textContent(), "That page is not in the guide.");
    assert.match(await page.locator("body").innerText(), /Search the guide/);
    assert.notEqual(await page.locator("html").getAttribute("id"), "__next_error__");
    await page.getByRole("button", { name: "Use light theme" }).click();
    assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
    assert.deepEqual(pageErrors, []);
    assert.deepEqual(
      consoleErrors.filter(
        (message) => message !== "Failed to load resource: the server responded with a status of 404 (Not Found)",
      ),
      [],
    );
    assert.deepEqual(failedManagedAssets, []);
  } finally {
    await browser.close();
  }
}

const compatibilityRuntime = await startNext();

try {
  const guide = await compatibilityRuntime.request("/guide");
  assert.equal(guide.status, 200);
  const guideHtml = await guide.text();
  assert.ok(
    guideHtml.includes(`rel="canonical" href="${expectedGuideCanonical}"`),
    `Guide canonical should be ${expectedGuideCanonical}`,
  );

  const nextAssets = managedNextAssets(guideHtml);
  assert.ok(nextAssets.length > 1, "Guide HTML should reference compiled JS and CSS");
  assert.ok(nextAssets.some((asset) => /\.js(?:\?|$)/.test(asset)), "Guide HTML should reference JS");
  assert.ok(nextAssets.some((asset) => /\.css(?:\?|$)/.test(asset)), "Guide HTML should reference CSS");
  for (const asset of nextAssets) {
    assert.match(asset, /^\/vc-ap-dd2962\/_next\//, asset);
    assert.equal((await compatibilityRuntime.request(asset)).status, 200, asset);
  }

  assert.equal((await compatibilityRuntime.request("/guide/01-understand/02-the-factory-in-one-view")).status, 200);

  const redirect = await compatibilityRuntime.request("/docs/03-build/10-the-agent-factory?role=buyer&role=seller&q=a%2Fb");
  assert.equal(redirect.status, 308);
  assert.equal(
    redirect.headers.get("location"),
    "/guide/03-build/11-the-agent-factory?role=buyer&role=seller&q=a%2Fb",
  );

  assert.equal((await compatibilityRuntime.request("/guide/not-a-real-page")).status, 404);
  await verifyBrowserRuntime(compatibilityRuntime.origin);
  assert.equal(
    (await compatibilityRuntime.requestAsLegacyHost("/guide/architecture?token=secret")).status,
    200,
  );
  assert.equal(
    (await compatibilityRuntime.requestAsLegacyHost("/guide/not-a-real-page?token=secret")).status,
    404,
  );

  for (const asset of [
    "/guide/search-index.json",
    "/guide/icon.svg",
    "/guide/og-v2.png",
    "/guide/infographics/factory-configuration.png",
  ]) {
    assert.equal((await compatibilityRuntime.request(asset)).status, 200, asset);
  }
} finally {
  await compatibilityRuntime.stop();
}

const retirementRuntime = await startNext({ legacyRedirectsEnabled: true });

try {
  for (const method of ["GET", "HEAD"]) {
    const legacyHostRedirect = await retirementRuntime.requestAsLegacyHost(
      "/architecture?token=secret&return=%2Fguide%3Ftab%3Dproof",
      method,
    );
    assert.equal(legacyHostRedirect.status, 308);
    assert.equal(legacyHostRedirect.headers.get("location"), "https://www.fdlc.ai/guide/architecture");
  }
  assert.equal(
    (await retirementRuntime.requestAsLegacyHost("/guide/not-a-real-page?token=secret")).status,
    404,
  );
} finally {
  await retirementRuntime.stop();
}

console.log("Native Next runtime smoke passed (prefixed assets, hydration, search, Mermaid, compatibility serving, opt-in retirement, redirects, and 404s).");
