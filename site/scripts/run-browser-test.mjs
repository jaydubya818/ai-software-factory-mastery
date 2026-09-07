import { spawn } from "node:child_process";

const port = 4187;
const origin = `http://127.0.0.1:${port}`;
const useProcessGroup = process.platform !== "win32";
const server = spawn("npm", ["run", "start", "--", "--port", String(port)], { cwd: process.cwd(), env: process.env, detached: useProcessGroup, stdio: ["ignore", "pipe", "pipe"] });
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

async function runBrowserChecks() {
  return await new Promise((resolve, reject) => {
    const checks = spawn(process.execPath, ["tests/reader-browser.mjs"], { cwd: process.cwd(), env: { ...process.env, GUIDE_TEST_ORIGIN: origin }, stdio: "inherit" });
    checks.once("error", reject);
    checks.once("exit", (status) => resolve(status ?? 1));
  });
}

async function stopServer() {
  if (server.exitCode !== null) return;
  const exited = new Promise((resolve) => server.once("exit", resolve));
  const signal = (name) => {
    try {
      if (useProcessGroup && server.pid) process.kill(-server.pid, name);
      else server.kill(name);
    } catch (error) {
      if (error?.code !== "ESRCH") throw error;
    }
  };
  signal("SIGTERM");
  await Promise.race([exited, new Promise((resolve) => setTimeout(resolve, 3000))]);
  if (server.exitCode === null) {
    signal("SIGKILL");
    await exited;
  }
}

try {
  await waitUntilReady();
  process.exitCode = await runBrowserChecks();
} finally {
  await stopServer();
}
