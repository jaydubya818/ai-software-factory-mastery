import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
  MICROFRONTENDS_DIGEST_ALGORITHM,
  MICROFRONTENDS_MANIFEST_PATH,
  MICROFRONTENDS_SNAPSHOT_PATH,
  fingerprintMicrofrontendsConfig,
  serializeMicrofrontendsManifest,
  serializeMicrofrontendsSnapshot,
  verifyTrustedMicrofrontendsSnapshot,
} from "../lib/microfrontends-config.ts";
import { synchronizeMicrofrontendsSnapshot } from "../scripts/sync-microfrontends-snapshot.mjs";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const nextConfigUrl = pathToFileURL(path.join(siteRoot, "next.config.ts")).href;
const expectedFingerprint = "e63f913563c1864feac38c7786e06d146892d34a4f0f74179999ff1d565e7e8b";
const expectedManifest = JSON.parse(await readFile(MICROFRONTENDS_MANIFEST_PATH, "utf8"));
const expectedSourceCommit = expectedManifest.sourceCommit;

function loadNextConfig(environment = {}) {
  const script = `
    import config from ${JSON.stringify(nextConfigUrl)};
    const rewrites = await config.rewrites?.();
    process.stdout.write("CONFIG_SHAPE=" + JSON.stringify({
      assetPrefix: config.assetPrefix ?? null,
      beforeFiles: rewrites?.beforeFiles ?? [],
      application: process.env.NEXT_PUBLIC_MFE_CURRENT_APPLICATION ?? null,
      applicationHash: process.env.NEXT_PUBLIC_MFE_CURRENT_APPLICATION_HASH ?? null,
      clientConfig: process.env.NEXT_PUBLIC_MFE_CLIENT_CONFIG
        ? JSON.parse(process.env.NEXT_PUBLIC_MFE_CLIENT_CONFIG)
        : null,
      configFilename: process.env.VC_MICROFRONTENDS_CONFIG_FILE_NAME ?? null,
    }));
  `;
  const env = { ...process.env };
  for (const key of [
    "FDLC_MFE_CONFIG_SHA256",
    "FDLC_MFE_SOURCE_COMMIT",
    "GUIDE_MFE_PREVIEW_ENABLED",
    "GUIDE_NATIVE_LOCAL",
    "GUIDE_STANDALONE_VINEXT",
    "GUIDE_MFE_PRODUCTION_ENABLED",
    "GUIDE_VERCEL_BUILD",
    "NX_TASK_TARGET_PROJECT",
    "VC_MICROFRONTENDS_CONFIG",
    "VC_MICROFRONTENDS_CONFIG_FILE_NAME",
    "VERCEL",
    "VERCEL_ENV",
    "VERCEL_PROJECT_NAME",
  ]) delete env[key];
  Object.assign(env, environment);

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

test("uses the generated FDLC snapshot for every native Next configuration", () => {
  const result = loadNextConfig({ GUIDE_NATIVE_LOCAL: "1" });

  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.shape.assetPrefix, "/vc-ap-dd2962");
  assert.equal(result.shape.application, "ai-software-factory-mastery");
  assert.equal(result.shape.applicationHash, "dd2962");
  assert.equal(result.shape.configFilename, "config/microfrontends.generated.json");
  assert.deepEqual(result.shape.beforeFiles[0], {
    source: "/vc-ap-dd2962/_next/:path+",
    destination: "/_next/:path+",
  });
  assert.deepEqual(result.shape.clientConfig.applications.dd2962.routing, [{
    paths: [
      "/guide",
      "/guide/:path*",
      "/docs/:path*",
      "/visuals",
      "/topics",
      "/coverage",
      "/search",
      "/glossary",
      "/atlas",
    ],
  }]);
});

test("pins Guide identity even when ambient build metadata names another application", () => {
  const result = loadNextConfig({
    GUIDE_NATIVE_LOCAL: "1",
    NX_TASK_TARGET_PROJECT: "fdlc",
  });

  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.shape.assetPrefix, "/vc-ap-dd2962");
  assert.equal(result.shape.application, "ai-software-factory-mastery");
});

test("keeps the explicitly standalone Vinext toolchain unwrapped", () => {
  const result = loadNextConfig({ GUIDE_STANDALONE_VINEXT: "1" });

  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.shape.assetPrefix, null);
  assert.equal(result.shape.application, null);
  assert.equal(result.shape.configFilename, null);
});

test("rejects standalone and native-local escape hatches in a Vercel environment", () => {
  for (const environment of [
    { GUIDE_STANDALONE_VINEXT: "1", VERCEL: "1", VERCEL_ENV: "production" },
    { GUIDE_NATIVE_LOCAL: "1", VERCEL: "1", VERCEL_ENV: "production" },
  ]) {
    const result = loadNextConfig(environment);
    assert.notEqual(result.status, 0);
    assert.match(`${result.stdout}\n${result.stderr}`, /must use the repository deployment entrypoint/);
  }
});

test("cannot use the standalone Vinext escape hatch on Vercel", () => {
  const result = loadNextConfig({
    FDLC_MFE_CONFIG_SHA256: expectedFingerprint,
    FDLC_MFE_SOURCE_COMMIT: expectedSourceCommit,
    GUIDE_MFE_PREVIEW_ENABLED: "true",
    GUIDE_STANDALONE_VINEXT: "1",
    GUIDE_VERCEL_BUILD: "1",
    VERCEL: "1",
    VERCEL_ENV: "preview",
    VERCEL_PROJECT_NAME: "ai-software-factory-mastery",
  });

  assert.notEqual(result.status, 0);
  assert.match(`${result.stdout}\n${result.stderr}`, /cannot disable Microfrontends on Vercel/);
});

test("accepts a Vercel Guide build only with the independently trusted FDLC digest", () => {
  const result = loadNextConfig({
    FDLC_MFE_CONFIG_SHA256: expectedFingerprint,
    FDLC_MFE_SOURCE_COMMIT: expectedSourceCommit,
    GUIDE_MFE_PREVIEW_ENABLED: "true",
    GUIDE_VERCEL_BUILD: "1",
    VERCEL: "1",
    VERCEL_ENV: "preview",
    VERCEL_PROJECT_NAME: "ai-software-factory-mastery",
  });

  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.shape.assetPrefix, "/vc-ap-dd2962");
});

test("rejects unmarked or conflicting native build modes", () => {
  for (const environment of [
    {},
    { GUIDE_NATIVE_LOCAL: "1", GUIDE_STANDALONE_VINEXT: "1" },
    { GUIDE_NATIVE_LOCAL: "1", GUIDE_VERCEL_BUILD: "1", VERCEL: "1" },
  ]) {
    const result = loadNextConfig(environment);
    assert.notEqual(result.status, 0);
    assert.match(`${result.stdout}\n${result.stderr}`, /exactly one reviewed build mode/);
  }
});

test("fails Vercel builds closed when the trusted digest is absent or stale", () => {
  for (const environment of [
    {
      FDLC_MFE_SOURCE_COMMIT: expectedSourceCommit,
      GUIDE_MFE_PREVIEW_ENABLED: "true",
      GUIDE_VERCEL_BUILD: "1",
      VERCEL: "1",
      VERCEL_ENV: "preview",
      VERCEL_PROJECT_NAME: "ai-software-factory-mastery",
    },
    {
      FDLC_MFE_CONFIG_SHA256: expectedFingerprint,
      GUIDE_MFE_PREVIEW_ENABLED: "true",
      GUIDE_VERCEL_BUILD: "1",
      VERCEL: "1",
      VERCEL_ENV: "preview",
      VERCEL_PROJECT_NAME: "ai-software-factory-mastery",
    },
    {
      FDLC_MFE_CONFIG_SHA256: expectedFingerprint,
      FDLC_MFE_SOURCE_COMMIT: "0".repeat(40),
      GUIDE_MFE_PREVIEW_ENABLED: "true",
      GUIDE_VERCEL_BUILD: "1",
      VERCEL: "1",
      VERCEL_ENV: "preview",
      VERCEL_PROJECT_NAME: "ai-software-factory-mastery",
    },
    {
      FDLC_MFE_CONFIG_SHA256: "0".repeat(64),
      FDLC_MFE_SOURCE_COMMIT: expectedSourceCommit,
      GUIDE_MFE_PREVIEW_ENABLED: "true",
      GUIDE_VERCEL_BUILD: "1",
      VERCEL: "1",
      VERCEL_ENV: "preview",
      VERCEL_PROJECT_NAME: "ai-software-factory-mastery",
    },
  ]) {
    const result = loadNextConfig(environment);
    assert.notEqual(result.status, 0);
    assert.match(
      `${result.stdout}\n${result.stderr}`,
      /requires FDLC_MFE_CONFIG_SHA256|requires FDLC_MFE_SOURCE_COMMIT|trusted digest mismatch|trusted source mismatch/i,
    );
  }
});

test("requires an exact Vercel target before accepting either deployment approval", () => {
  for (const vercelEnvironment of [undefined, "", "development", "staging"]) {
    const environment = {
      FDLC_MFE_CONFIG_SHA256: expectedFingerprint,
      FDLC_MFE_SOURCE_COMMIT: expectedSourceCommit,
      GUIDE_MFE_PREVIEW_ENABLED: "true",
      GUIDE_VERCEL_BUILD: "1",
      VERCEL: "1",
      VERCEL_PROJECT_NAME: "ai-software-factory-mastery",
    };
    if (vercelEnvironment !== undefined) environment.VERCEL_ENV = vercelEnvironment;

    const result = loadNextConfig(environment);
    assert.notEqual(result.status, 0);
    assert.match(`${result.stdout}\n${result.stderr}`, /VERCEL_ENV to be exactly preview or production/);
  }
});

test("requires a separate explicit gate for Production builds", () => {
  const blocked = loadNextConfig({
    FDLC_MFE_CONFIG_SHA256: expectedFingerprint,
    FDLC_MFE_SOURCE_COMMIT: expectedSourceCommit,
    GUIDE_VERCEL_BUILD: "1",
    VERCEL: "1",
    VERCEL_ENV: "production",
    VERCEL_PROJECT_NAME: "ai-software-factory-mastery",
  });
  assert.notEqual(blocked.status, 0);
  assert.match(`${blocked.stdout}\n${blocked.stderr}`, /GUIDE_MFE_PRODUCTION_ENABLED=true/);

  const allowed = loadNextConfig({
    FDLC_MFE_CONFIG_SHA256: expectedFingerprint,
    FDLC_MFE_SOURCE_COMMIT: expectedSourceCommit,
    GUIDE_MFE_PRODUCTION_ENABLED: "true",
    GUIDE_VERCEL_BUILD: "1",
    VERCEL: "1",
    VERCEL_ENV: "production",
    VERCEL_PROJECT_NAME: "ai-software-factory-mastery",
  });
  assert.equal(allowed.status, 0, allowed.stderr);

  const leakedToPreview = loadNextConfig({
    FDLC_MFE_CONFIG_SHA256: expectedFingerprint,
    FDLC_MFE_SOURCE_COMMIT: expectedSourceCommit,
    GUIDE_MFE_PRODUCTION_ENABLED: "true",
    GUIDE_VERCEL_BUILD: "1",
    VERCEL: "1",
    VERCEL_ENV: "preview",
    VERCEL_PROJECT_NAME: "ai-software-factory-mastery",
  });
  assert.notEqual(leakedToPreview.status, 0);
  assert.match(`${leakedToPreview.stdout}\n${leakedToPreview.stderr}`, /Preview build requires GUIDE_MFE_PREVIEW_ENABLED=true/);
});

test("rejects an ambiguous config source or mislinked Vercel project", () => {
  for (const environment of [
    { GUIDE_NATIVE_LOCAL: "1", VC_MICROFRONTENDS_CONFIG: "" },
    { GUIDE_NATIVE_LOCAL: "1", VC_MICROFRONTENDS_CONFIG: "/tmp/other.json" },
    { GUIDE_NATIVE_LOCAL: "1", VC_MICROFRONTENDS_CONFIG_FILE_NAME: "other.json" },
    { GUIDE_NATIVE_LOCAL: "1", VERCEL_PROJECT_NAME: "wrong-project" },
  ]) {
    const result = loadNextConfig(environment);
    assert.notEqual(result.status, 0);
    assert.match(`${result.stdout}\n${result.stderr}`, /conflicts|must be/i);
  }
});

test("validates the schema-pure canonical snapshot and deterministic digest", async () => {
  const snapshot = await readFile(MICROFRONTENDS_SNAPSHOT_PATH, "utf8");
  const parsed = JSON.parse(snapshot);
  const reordered = JSON.stringify({
    version: "1",
    applications: parsed.applications,
    $schema: "https://openapi.vercel.sh/microfrontends.json",
  });

  assert.equal(fingerprintMicrofrontendsConfig(snapshot), expectedFingerprint);
  assert.equal(fingerprintMicrofrontendsConfig(reordered), expectedFingerprint);
  assert.equal(serializeMicrofrontendsSnapshot(reordered), snapshot);
  assert.match(await readFile(MICROFRONTENDS_MANIFEST_PATH, "utf8"), new RegExp(expectedFingerprint));
  assert.equal(MICROFRONTENDS_DIGEST_ALGORITHM, "sha256-recursive-key-sort-json-v1");
});

test("fails closed when the generated snapshot or manifest is absent or modified", async (t) => {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), "guide-mfe-validation-"));
  t.after(() => rm(temporaryRoot, { force: true, recursive: true }));
  const snapshotPath = path.join(temporaryRoot, "snapshot.json");
  const manifestPath = path.join(temporaryRoot, "manifest.json");
  const snapshot = await readFile(MICROFRONTENDS_SNAPSHOT_PATH, "utf8");
  const manifest = await readFile(MICROFRONTENDS_MANIFEST_PATH, "utf8");

  assert.throws(
    () => verifyTrustedMicrofrontendsSnapshot({ snapshotPath, manifestPath, environment: {} }),
    /Missing generated config snapshot/,
  );

  await writeFile(snapshotPath, `${snapshot}\n`);
  await writeFile(manifestPath, manifest);
  assert.throws(
    () => verifyTrustedMicrofrontendsSnapshot({ snapshotPath, manifestPath, environment: {} }),
    /not the canonical sanitized snapshot/,
  );

  await writeFile(snapshotPath, snapshot);
  await writeFile(
    manifestPath,
    serializeMicrofrontendsManifest("0".repeat(64), "9e0f913c83d3a9fddfe0fffaae6a53d46c62b5ab"),
  );
  assert.throws(
    () => verifyTrustedMicrofrontendsSnapshot({ snapshotPath, manifestPath, environment: {} }),
    /Snapshot fingerprint mismatch/,
  );

  await writeFile(
    manifestPath,
    serializeMicrofrontendsManifest(expectedFingerprint, "0".repeat(40)),
  );
  assert.throws(
    () => verifyTrustedMicrofrontendsSnapshot({
      snapshotPath,
      manifestPath,
      environment: { FDLC_MFE_SOURCE_COMMIT: expectedSourceCommit },
    }),
    /trusted source mismatch/,
  );
});

test("syncs and verifies a snapshot only from committed FDLC authority", async (t) => {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), "guide-mfe-sync-"));
  t.after(() => rm(temporaryRoot, { force: true, recursive: true }));
  const sourceRepository = path.join(temporaryRoot, "FDLC");
  const sourcePath = path.join(sourceRepository, "microfrontends.json");
  const snapshotPath = path.join(temporaryRoot, "guide", "snapshot.json");
  const manifestPath = path.join(temporaryRoot, "guide", "manifest.json");
  const source = await readFile(MICROFRONTENDS_SNAPSHOT_PATH, "utf8");

  assert.equal(spawnSync("git", ["init", "-q", sourceRepository]).status, 0);
  assert.equal(spawnSync("git", [
    "-C", sourceRepository,
    "remote", "add", "origin", "https://github.com/jaydubya818/FDLC.git",
  ]).status, 0);
  await writeFile(sourcePath, source);
  assert.equal(spawnSync("git", ["-C", sourceRepository, "add", "microfrontends.json"]).status, 0);
  assert.equal(spawnSync("git", [
    "-C", sourceRepository,
    "-c", "commit.gpgSign=false",
    "-c", "core.hooksPath=/dev/null",
    "-c", "user.name=Guide Snapshot Test",
    "-c", "user.email=guide-snapshot@example.invalid",
    "commit", "-q", "-m", "test: add authoritative config",
  ]).status, 0);

  await assert.rejects(
    synchronizeMicrofrontendsSnapshot({ sourcePath, snapshotPath, manifestPath }),
    /not reachable from an origin remote-tracking branch/,
  );
  const configCommitResult = spawnSync("git", ["-C", sourceRepository, "rev-parse", "HEAD"], {
    encoding: "utf8",
  });
  assert.equal(configCommitResult.status, 0, configCommitResult.stderr);
  const configCommit = configCommitResult.stdout.trim();
  assert.equal(spawnSync("git", [
    "-C", sourceRepository,
    "update-ref", "refs/remotes/origin/codex/test", configCommit,
  ]).status, 0);

  const generated = await synchronizeMicrofrontendsSnapshot({
    sourcePath,
    snapshotPath,
    manifestPath,
  });
  assert.equal(generated.fingerprint, expectedFingerprint);
  assert.match(generated.sourceCommit, /^[a-f0-9]{40}$/);
  assert.equal(await readFile(snapshotPath, "utf8"), source);
  assert.match(await readFile(manifestPath, "utf8"), new RegExp(generated.sourceCommit));

  await writeFile(path.join(sourceRepository, "README.md"), "Unrelated documentation change.\n");
  assert.equal(spawnSync("git", ["-C", sourceRepository, "add", "README.md"]).status, 0);
  assert.equal(spawnSync("git", [
    "-C", sourceRepository,
    "-c", "commit.gpgSign=false",
    "-c", "core.hooksPath=/dev/null",
    "-c", "user.name=Guide Snapshot Test",
    "-c", "user.email=guide-snapshot@example.invalid",
    "commit", "-q", "-m", "docs: unrelated change",
  ]).status, 0);

  const beforeCheck = await readFile(manifestPath, "utf8");
  const verified = await synchronizeMicrofrontendsSnapshot({
    sourcePath,
    snapshotPath,
    manifestPath,
    check: true,
  });
  assert.equal(verified.action, "verified");
  assert.equal(verified.sourceCommit, generated.sourceCommit);
  assert.equal(await readFile(manifestPath, "utf8"), beforeCheck);

  await writeFile(snapshotPath, `${source}\n`);
  await assert.rejects(
    synchronizeMicrofrontendsSnapshot({
      sourcePath,
      snapshotPath,
      manifestPath,
      check: true,
    }),
    /canonical sanitized snapshot|stale relative to FDLC/,
  );

  const credential = "super-secret-token";
  assert.equal(spawnSync("git", [
    "-C", sourceRepository,
    "remote", "set-url", "origin", `https://oauth2:${credential}@github.com/not-authoritative/FDLC.git`,
  ]).status, 0);
  await assert.rejects(
    synchronizeMicrofrontendsSnapshot({ sourcePath, snapshotPath, manifestPath }),
    (error) => {
      assert.match(error.message, /checkout origin does not match/);
      assert.doesNotMatch(error.message, new RegExp(credential));
      return true;
    },
  );
});
