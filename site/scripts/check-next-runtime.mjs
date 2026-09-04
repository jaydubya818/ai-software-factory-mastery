/**
 * Smoke-test the native Next.js runtime after `npm run vercel-build`.
 * This complements the fast Vinext render suite with real Next route,
 * redirect, not-found, and public-asset semantics.
 */
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { request as httpRequest } from "node:http";
import { createServer } from "node:net";

const host = "127.0.0.1";
const root = new URL("..", import.meta.url);

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
  delete nextEnvironment.GUIDE_LEGACY_REDIRECTS_ENABLED;
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

const compatibilityRuntime = await startNext();

try {
  const guide = await compatibilityRuntime.request("/guide");
  assert.equal(guide.status, 200);
  assert.match(
    await guide.text(),
    /rel="canonical" href="https:\/\/ai-software-factory-mastery\.vercel\.app\/guide"/,
  );

  assert.equal((await compatibilityRuntime.request("/guide/01-understand/02-the-factory-in-one-view")).status, 200);

  const redirect = await compatibilityRuntime.request("/docs/03-build/10-the-agent-factory?role=buyer&role=seller&q=a%2Fb");
  assert.equal(redirect.status, 308);
  assert.equal(
    redirect.headers.get("location"),
    "/guide/03-build/11-the-agent-factory?role=buyer&role=seller&q=a%2Fb",
  );

  assert.equal((await compatibilityRuntime.request("/guide/not-a-real-page")).status, 404);
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

console.log("Native Next runtime smoke passed (compatibility serving, opt-in retirement, Guide routes/assets, redirects, and 404s).");
