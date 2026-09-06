import { spawnSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const nextEnvironmentPath = fileURLToPath(new URL("../next-env.d.ts", import.meta.url));

function localEnvironment(overrides = {}) {
  const environment = { ...process.env };
  for (const name of [
    "FDLC_MFE_CONFIG_SHA256",
    "FDLC_MFE_SOURCE_COMMIT",
    "GUIDE_LEGACY_REDIRECTS_ENABLED",
    "GUIDE_MFE_PREVIEW_ENABLED",
    "GUIDE_MFE_PRODUCTION_ENABLED",
    "GUIDE_NATIVE_LOCAL",
    "GUIDE_STANDALONE_VINEXT",
    "GUIDE_VERCEL_BUILD",
    "NEXT_PUBLIC_SITE_URL",
    "NX_TASK_TARGET_PROJECT",
    "VC_MICROFRONTENDS_CONFIG",
    "VC_MICROFRONTENDS_CONFIG_FILE_NAME",
    "VERCEL",
    "VERCEL_ENV",
    "VERCEL_PROJECT_NAME",
  ]) delete environment[name];

  return { ...environment, ...overrides };
}

function run(args, environment = localEnvironment()) {
  const result = spawnSync(process.execPath, args, {
    cwd: siteRoot,
    env: environment,
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`Native Next verification command exited with status ${result.status}.`);
  }
}

async function main() {
  const originalNextEnvironment = await readFile(nextEnvironmentPath, "utf8");

  try {
    run(["--experimental-strip-types", "scripts/generate-content.mjs"]);
    run(
      ["node_modules/next/dist/bin/next", "build", "--webpack"],
      localEnvironment({ GUIDE_NATIVE_LOCAL: "1" }),
    );
    run(["scripts/check-built-css.mjs"]);
    run(["scripts/check-next-runtime.mjs"]);
  } finally {
    await writeFile(nextEnvironmentPath, originalNextEnvironment, "utf8");
  }
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
