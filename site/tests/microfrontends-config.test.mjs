import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

import { hasMicrofrontendsConfig } from "../lib/microfrontends-config.ts";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const nextConfigUrl = pathToFileURL(path.join(siteRoot, "next.config.ts")).href;

function loadNextConfig(environment = {}) {
  const script = `
    import config from ${JSON.stringify(nextConfigUrl)};
    process.stdout.write("CONFIG_SHAPE=" + JSON.stringify({
      assetPrefix: config.assetPrefix ?? null,
    }));
  `;
  const env = { ...process.env, ...environment };
  delete env.VC_MICROFRONTENDS_CONFIG_FILE_NAME;
  if (!("VC_MICROFRONTENDS_CONFIG" in environment)) delete env.VC_MICROFRONTENDS_CONFIG;

  const result = spawnSync(
    process.execPath,
    ["--experimental-strip-types", "--input-type=module", "--eval", script],
    { cwd: siteRoot, encoding: "utf8", env },
  );
  const marker = result.stdout.lastIndexOf("CONFIG_SHAPE=");
  return {
    ...result,
    shape: marker === -1 ? null : JSON.parse(result.stdout.slice(marker + "CONFIG_SHAPE=".length)),
  };
}

test("keeps the standalone Next config operational when no shared config exists", () => {
  const result = loadNextConfig();

  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(result.shape, { assetPrefix: null });
});

test("activates withMicrofrontends using the default application's supplied config", async (t) => {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), "guide-mfe-config-"));
  t.after(() => rm(temporaryRoot, { force: true, recursive: true }));
  const configPath = path.join(temporaryRoot, "microfrontends.json");
  await writeFile(configPath, JSON.stringify({
    version: "1",
    applications: {
      fdlc: {
        packageName: "fdlc-site",
        development: { fallback: "https://www.fdlc.ai" },
      },
      "ai-software-factory-mastery": {
        packageName: "ai-software-factory-mastery-site",
        routing: [{ paths: ["/guide", "/guide/:path*"] }],
      },
    },
  }));

  const result = loadNextConfig({ VC_MICROFRONTENDS_CONFIG: configPath });

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.shape.assetPrefix, /^\/vc-ap-[a-f0-9]{6}$/);
});

test("detects explicit and Vercel-pulled default-app configurations", async (t) => {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), "guide-mfe-detection-"));
  t.after(() => rm(temporaryRoot, { force: true, recursive: true }));

  assert.equal(hasMicrofrontendsConfig(temporaryRoot, {}), false);
  assert.equal(hasMicrofrontendsConfig(temporaryRoot, { VC_MICROFRONTENDS_CONFIG: "../fdlc/microfrontends.json" }), true);

  await mkdir(path.join(temporaryRoot, ".vercel"));
  await writeFile(path.join(temporaryRoot, ".vercel", "microfrontends.json"), "{}");
  assert.equal(hasMicrofrontendsConfig(temporaryRoot, {}), true);
});
