import { execFileSync } from "node:child_process";
import { realpathSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import {
  MICROFRONTENDS_MANIFEST_PATH,
  MICROFRONTENDS_SNAPSHOT_PATH,
  fingerprintMicrofrontendsConfig,
  serializeMicrofrontendsManifest,
  serializeMicrofrontendsSnapshot,
  verifyTrustedMicrofrontendsSnapshot,
} from "../lib/microfrontends-config.ts";

const authoritativeRemote = "https://github.com/jaydubya818/FDLC.git";

function normalizedRemote(remote) {
  return remote
    .replace(/^git@github\.com:/, "https://github.com/")
    .replace(/^ssh:\/\/git@github\.com\//, "https://github.com/")
    .replace(/\.git$/, "")
    .replace(/\/$/, "")
    .toLowerCase();
}

function gitOutput(repositoryRoot, args) {
  return execFileSync("git", ["-C", repositoryRoot, ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function resolveAuthoritativeSource(sourcePath) {
  const resolvedSource = realpathSync(path.resolve(sourcePath));
  const repositoryRoot = realpathSync(
    gitOutput(path.dirname(resolvedSource), ["rev-parse", "--show-toplevel"]),
  );
  const relativeSource = path.relative(repositoryRoot, resolvedSource).split(path.sep).join("/");

  if (relativeSource !== "microfrontends.json") {
    throw new Error(
      `Expected the authoritative FDLC repository root microfrontends.json; received ${resolvedSource}.`,
    );
  }

  const origin = gitOutput(repositoryRoot, ["remote", "get-url", "origin"]);
  if (normalizedRemote(origin) !== normalizedRemote(authoritativeRemote)) {
    throw new Error(
      `Expected the authoritative FDLC origin ${authoritativeRemote}; the checkout origin does not match.`,
    );
  }

  const sourceCommit = gitOutput(repositoryRoot, [
    "log", "-1", "--format=%H", "--", relativeSource,
  ]);
  if (!/^[a-f0-9]{40}$/.test(sourceCommit)) {
    throw new Error("The authoritative FDLC config has no committed source revision.");
  }

  const containingRemoteRefs = gitOutput(repositoryRoot, [
    "for-each-ref",
    `--contains=${sourceCommit}`,
    "--format=%(refname)",
    "refs/remotes/origin/",
  ]);
  if (!containingRemoteRefs) {
    throw new Error(
      "The authoritative FDLC config commit is not reachable from an origin remote-tracking branch. Fetch or push the reviewed FDLC branch before generating the Guide snapshot.",
    );
  }

  return { relativeSource, repositoryRoot, resolvedSource, sourceCommit };
}

export async function synchronizeMicrofrontendsSnapshot({
  sourcePath,
  snapshotPath = MICROFRONTENDS_SNAPSHOT_PATH,
  manifestPath = MICROFRONTENDS_MANIFEST_PATH,
  check = false,
}) {
  if (!sourcePath) throw new Error("An absolute path to FDLC/microfrontends.json is required.");

  const source = resolveAuthoritativeSource(sourcePath);
  const workingSource = await readFile(source.resolvedSource, "utf8");
  const committedSource = execFileSync(
    "git",
    ["-C", source.repositoryRoot, "show", `${source.sourceCommit}:${source.relativeSource}`],
    { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
  );
  const snapshot = serializeMicrofrontendsSnapshot(workingSource);
  const committedSnapshot = serializeMicrofrontendsSnapshot(committedSource);

  if (snapshot !== committedSnapshot) {
    throw new Error(
      "FDLC/microfrontends.json differs from its last committed revision. Commit the authoritative config before generating a Guide snapshot.",
    );
  }

  const fingerprint = fingerprintMicrofrontendsConfig(snapshot);
  const manifest = serializeMicrofrontendsManifest(fingerprint, source.sourceCommit);

  if (check) {
    const currentSnapshot = await readFile(snapshotPath, "utf8");
    const currentManifest = await readFile(manifestPath, "utf8");
    verifyTrustedMicrofrontendsSnapshot({ snapshotPath, manifestPath, environment: {} });
    if (currentSnapshot !== snapshot || currentManifest !== manifest) {
      throw new Error(
        "The committed Guide snapshot is stale relative to FDLC/microfrontends.json. Run npm run microfrontends:sync.",
      );
    }
  } else {
    await mkdir(path.dirname(snapshotPath), { recursive: true });
    await mkdir(path.dirname(manifestPath), { recursive: true });
    await writeFile(snapshotPath, snapshot, "utf8");
    await writeFile(manifestPath, manifest, "utf8");
  }

  return {
    action: check ? "verified" : "generated",
    fingerprint,
    sourceCommit: source.sourceCommit,
    snapshotPath,
  };
}

function usage() {
  return "Usage: npm run microfrontends:sync -- /absolute/path/to/FDLC/microfrontends.json";
}

async function main() {
  const args = process.argv.slice(2);
  const check = args[0] === "--check";
  const sourcePath = check ? args[1] : args[0];
  if (!sourcePath || args.length !== (check ? 2 : 1)) throw new Error(usage());

  const result = await synchronizeMicrofrontendsSnapshot({ sourcePath, check });
  process.stdout.write(
    `Microfrontends snapshot ${result.action}: source=${result.sourceCommit} sha256=${result.fingerprint} path=${result.snapshotPath}\n`,
  );
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
}
