import { spawn } from "node:child_process";

const port = 4187;
const origin = `http://127.0.0.1:${port}`;
const useProcessGroup = process.platform !== "win32";
const server = spawn("npm", ["run", "start", "--", "--port", String(port)], { cwd: process.cwd(), env: process.env, detached: useProcessGroup, stdio: ["ignore", "pipe", "pipe"] });
let browserChecks;
let interruptedSignal;
let stopServerPromise;
let output = "";
server.stdout.on("data", (chunk) => { output += chunk; });
server.stderr.on("data", (chunk) => { output += chunk; });

async function waitUntilReady() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (hasExited(server)) throw new Error(`Guide server exited before browser checks.\n${output}`);
    try { if ((await fetch(`${origin}/guide`)).ok) return; } catch { /* The server is still starting. */ }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Guide server did not become ready.\n${output}`);
}

async function runBrowserChecks() {
  return await new Promise((resolve, reject) => {
    browserChecks = spawn(process.execPath, ["tests/reader-browser.mjs"], { cwd: process.cwd(), env: { ...process.env, GUIDE_TEST_ORIGIN: origin }, detached: useProcessGroup, stdio: "inherit" });
    browserChecks.once("error", reject);
    browserChecks.once("exit", (status) => resolve(status ?? 1));
  });
}

function hasExited(child) {
  return child.exitCode !== null || child.signalCode !== null;
}

function signalProcess(child, name) {
  if (hasExited(child)) return;
  try {
    if (useProcessGroup && child.pid) process.kill(-child.pid, name);
    else child.kill(name);
  } catch (error) {
    if (error?.code !== "ESRCH") throw error;
  }
}

async function stopServer(signal = "SIGTERM") {
  if (stopServerPromise) return await stopServerPromise;
  stopServerPromise = (async () => {
    if (hasExited(server)) return;
    const exited = new Promise((resolve) => {
      if (hasExited(server)) resolve();
      else server.once("exit", resolve);
    });
    signalProcess(server, signal);
    await Promise.race([exited, new Promise((resolve) => setTimeout(resolve, 3000))]);
    if (!hasExited(server)) {
      signalProcess(server, "SIGKILL");
      await exited;
    }
  })();
  return await stopServerPromise;
}

function handleSignal(signal) {
  if (interruptedSignal) return;
  interruptedSignal = signal;
  if (browserChecks) {
    try {
      signalProcess(browserChecks, signal);
    } catch (error) {
      console.error(`Could not forward ${signal} to browser checks`, error);
    }
  }
  void stopServer(signal);
}

process.once("SIGINT", () => handleSignal("SIGINT"));
process.once("SIGTERM", () => handleSignal("SIGTERM"));

let status = 1;
try {
  await waitUntilReady();
  status = await runBrowserChecks();
} catch (error) {
  if (!interruptedSignal) throw error;
} finally {
  await stopServer(interruptedSignal ?? "SIGTERM");
}

process.exitCode = interruptedSignal === "SIGINT" ? 130 : interruptedSignal === "SIGTERM" ? 143 : status;
