import { spawn, spawnSync } from "node:child_process";

const port = 4187;
const origin = `http://127.0.0.1:${port}`;
const server = spawn("npm", ["run", "start", "--", "--port", String(port)], { cwd: process.cwd(), env: process.env, stdio: ["ignore", "pipe", "pipe"] });
let output = "";
server.stdout.on("data", (chunk) => { output += chunk; });
server.stderr.on("data", (chunk) => { output += chunk; });

async function waitUntilReady() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (server.exitCode !== null) throw new Error(`Guide server exited before browser checks.\n${output}`);
    try { if ((await fetch(`${origin}/guide`)).ok) return; } catch { /* The server is still starting. */ }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Guide server did not become ready.\n${output}`);
}

try {
  await waitUntilReady();
  const result = spawnSync(process.execPath, ["tests/reader-browser.mjs"], { cwd: process.cwd(), env: { ...process.env, GUIDE_TEST_ORIGIN: origin }, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exitCode = result.status ?? 1;
} finally {
  server.kill("SIGTERM");
}
