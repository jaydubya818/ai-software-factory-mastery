/**
 * Smoke-test the native Next.js runtime after `npm run vercel-build`.
 * This complements the fast Vinext render suite with real Next route,
 * redirect, not-found, and public-asset semantics.
 */
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
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

const port = await availablePort();
const origin = `http://${host}:${port}`;
const nextEnvironment = { ...process.env };
delete nextEnvironment.NEXT_PUBLIC_SITE_URL;
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

async function waitUntilReady() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (next.exitCode !== null) throw new Error(`Next exited before becoming ready.\n${output}`);
    try {
      const response = await request("/guide");
      if (response.status === 200) return;
    } catch {
      // The server socket is not ready yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Timed out waiting for Next.\n${output}`);
}

try {
  await waitUntilReady();

  const guide = await request("/guide");
  assert.equal(guide.status, 200);
  assert.match(
    await guide.text(),
    /rel="canonical" href="https:\/\/ai-software-factory-mastery\.vercel\.app\/guide"/,
  );

  assert.equal((await request("/guide/01-understand/02-the-factory-in-one-view")).status, 200);

  const redirect = await request("/docs/03-build/10-the-agent-factory?role=buyer&role=seller&q=a%2Fb");
  assert.equal(redirect.status, 308);
  assert.equal(
    redirect.headers.get("location"),
    "/guide/03-build/11-the-agent-factory?role=buyer&role=seller&q=a%2Fb",
  );

  assert.equal((await request("/guide/not-a-real-page")).status, 404);

  for (const asset of [
    "/guide/search-index.json",
    "/guide/icon.svg",
    "/guide/og-v2.png",
    "/guide/infographics/factory-configuration.png",
  ]) {
    assert.equal((await request(asset)).status, 200, asset);
  }

  console.log("Native Next runtime smoke passed (Guide 200/deep route/308/query/404/public assets).");
} finally {
  next.kill("SIGTERM");
  if (next.exitCode === null) {
    await Promise.race([once(next, "exit"), new Promise((resolve) => setTimeout(resolve, 5_000))]);
  }
  if (next.exitCode === null) next.kill("SIGKILL");
}
