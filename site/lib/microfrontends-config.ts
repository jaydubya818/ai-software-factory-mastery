import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { validateSchema } from "@vercel/microfrontends/validation";

export const MICROFRONTENDS_CONFIG_FILENAME = "config/microfrontends.generated.json";
export const MICROFRONTENDS_DIGEST_ALGORITHM = "sha256-recursive-key-sort-json-v1";
export const MICROFRONTENDS_SNAPSHOT_PATH = fileURLToPath(
  new URL(`../${MICROFRONTENDS_CONFIG_FILENAME}`, import.meta.url),
);
export const MICROFRONTENDS_MANIFEST_PATH = fileURLToPath(
  new URL("../config/microfrontends.generated.manifest.json", import.meta.url),
);

type MicrofrontendsEnvironment = {
  [key: string]: string | undefined;
  FDLC_MFE_CONFIG_SHA256?: string;
  FDLC_MFE_SOURCE_COMMIT?: string;
  GUIDE_MFE_PREVIEW_ENABLED?: string;
  GUIDE_MFE_PRODUCTION_ENABLED?: string;
  GUIDE_VERCEL_BUILD?: string;
  VC_MICROFRONTENDS_CONFIG?: string;
  VC_MICROFRONTENDS_CONFIG_FILE_NAME?: string;
  VERCEL?: string;
  VERCEL_ENV?: string;
  VERCEL_PROJECT_NAME?: string;
};

type SnapshotPaths = {
  snapshotPath?: string;
  manifestPath?: string;
  environment?: MicrofrontendsEnvironment;
};

type SnapshotManifest = {
  algorithm: typeof MICROFRONTENDS_DIGEST_ALGORITHM;
  generatedBy: string;
  source: string;
  sourceCommit: string;
  authoritativeSourceSha256: string;
};

const expectedApplications = {
  fdlc: {
    packageName: "fdlc-site",
    development: { fallback: "https://www.fdlc.ai" },
  },
  "ai-software-factory-mastery": {
    packageName: "ai-software-factory-mastery-site",
    development: { fallback: "https://ai-software-factory-mastery.vercel.app" },
    routing: [
      { group: "guide", paths: ["/guide", "/guide/:path*"] },
      {
        group: "guide-legacy",
        paths: [
          "/docs/:path*",
          "/visuals",
          "/topics",
          "/coverage",
          "/search",
          "/glossary",
          "/atlas",
        ],
      },
    ],
  },
};

const expectedSchema = "https://openapi.vercel.sh/microfrontends.json";

function sortJson(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortJson);
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value)
      .sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
      .map(([key, entry]) => [key, sortJson(entry)]),
  );
}

function assertExpectedGuideContract(config: ReturnType<typeof validateSchema>) {
  if (config.$schema !== expectedSchema) {
    throw new Error(
      `[Guide microfrontends] FDLC config must declare $schema as ${expectedSchema}.`,
    );
  }

  if (config.version !== "1") {
    throw new Error("[Guide microfrontends] FDLC config must use schema version 1.");
  }

  const actual = JSON.stringify(sortJson(config.applications));
  const expected = JSON.stringify(sortJson(expectedApplications));
  if (actual !== expected) {
    throw new Error(
      "[Guide microfrontends] FDLC config does not match the reviewed two-application Guide routing contract.",
    );
  }
}

function canonicalizeMicrofrontendsConfig(source: string) {
  const validated = validateSchema(source);
  assertExpectedGuideContract(validated);
  return sortJson(validated);
}

/** Validate FDLC's source and remove comments, formatting, and unstable key order. */
export function serializeMicrofrontendsSnapshot(source: string) {
  return `${JSON.stringify(canonicalizeMicrofrontendsConfig(source), null, 2)}\n`;
}

/**
 * Hash the full parsed config after recursively sorting object keys. Arrays keep
 * their source order; no schema-valid fields are projected out of the digest.
 */
export function fingerprintMicrofrontendsConfig(source: string) {
  const canonicalJson = JSON.stringify(canonicalizeMicrofrontendsConfig(source));
  return createHash("sha256").update(canonicalJson, "utf8").digest("hex");
}

function readRequiredFile(filename: string, label: string) {
  try {
    return readFileSync(filename, "utf8");
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`[Guide microfrontends] Missing ${label}: ${filename}. ${detail}`);
  }
}

function parseManifest(source: string, filename: string): SnapshotManifest {
  let value: unknown;
  try {
    value = JSON.parse(source);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`[Guide microfrontends] Invalid generated manifest ${filename}. ${detail}`);
  }

  if (!value || typeof value !== "object") {
    throw new Error(`[Guide microfrontends] Invalid generated manifest ${filename}; expected an object.`);
  }

  const manifest = value as Partial<SnapshotManifest>;
  const keys = Object.keys(manifest).sort();
  if (
    JSON.stringify(keys) !== JSON.stringify([
      "algorithm",
      "authoritativeSourceSha256",
      "generatedBy",
      "source",
      "sourceCommit",
    ])
    || manifest.algorithm !== MICROFRONTENDS_DIGEST_ALGORITHM
    || manifest.generatedBy !== "npm run microfrontends:sync"
    || manifest.source !== "FDLC/microfrontends.json"
    || typeof manifest.sourceCommit !== "string"
    || !/^[a-f0-9]{40}$/.test(manifest.sourceCommit)
    || typeof manifest.authoritativeSourceSha256 !== "string"
    || !/^[a-f0-9]{64}$/.test(manifest.authoritativeSourceSha256)
  ) {
    throw new Error(`[Guide microfrontends] Invalid generated manifest contract in ${filename}.`);
  }

  return manifest as SnapshotManifest;
}

export function serializeMicrofrontendsManifest(
  authoritativeSourceSha256: string,
  sourceCommit: string,
) {
  if (!/^[a-f0-9]{64}$/.test(authoritativeSourceSha256)) {
    throw new Error("[Guide microfrontends] Cannot serialize a manifest with an invalid SHA-256.");
  }
  if (!/^[a-f0-9]{40}$/.test(sourceCommit)) {
    throw new Error("[Guide microfrontends] Cannot serialize a manifest with an invalid source commit.");
  }

  return `${JSON.stringify(sortJson({
    algorithm: MICROFRONTENDS_DIGEST_ALGORITHM,
    authoritativeSourceSha256,
    generatedBy: "npm run microfrontends:sync",
    source: "FDLC/microfrontends.json",
    sourceCommit,
  }), null, 2)}\n`;
}

function assertUnambiguousConfigSource(environment: MicrofrontendsEnvironment) {
  if (typeof environment.VC_MICROFRONTENDS_CONFIG === "string") {
    throw new Error(
      "[Guide microfrontends] VC_MICROFRONTENDS_CONFIG conflicts with the checked-in generated snapshot.",
    );
  }

  const configuredFilename = environment.VC_MICROFRONTENDS_CONFIG_FILE_NAME;
  if (configuredFilename && configuredFilename !== MICROFRONTENDS_CONFIG_FILENAME) {
    throw new Error(
      `[Guide microfrontends] VC_MICROFRONTENDS_CONFIG_FILE_NAME must be ${MICROFRONTENDS_CONFIG_FILENAME}; received ${configuredFilename}.`,
    );
  }

  const projectName = environment.VERCEL_PROJECT_NAME;
  if (projectName && projectName !== "ai-software-factory-mastery") {
    throw new Error(
      `[Guide microfrontends] VERCEL_PROJECT_NAME must be ai-software-factory-mastery; received ${projectName}.`,
    );
  }

}

export function isVercelBuild(environment: MicrofrontendsEnvironment = process.env) {
  return environment.GUIDE_VERCEL_BUILD === "1" && environment.VERCEL === "1";
}

function assertDeploymentApproval(environment: MicrofrontendsEnvironment) {
  const previewGate = environment.GUIDE_MFE_PREVIEW_ENABLED;
  const productionGate = environment.GUIDE_MFE_PRODUCTION_ENABLED;

  for (const [name, value] of [
    ["GUIDE_MFE_PREVIEW_ENABLED", previewGate],
    ["GUIDE_MFE_PRODUCTION_ENABLED", productionGate],
  ]) {
    if (typeof value === "string" && value !== "true") {
      throw new Error(`[Guide microfrontends] ${name} must be the exact value true when set.`);
    }
  }

  if (!isVercelBuild(environment)) {
    if (typeof previewGate === "string" || typeof productionGate === "string") {
      throw new Error(
        "[Guide microfrontends] Deployment approval flags are valid only during the repo-controlled Vercel build.",
      );
    }
    return;
  }

  if (environment.VERCEL_ENV !== "preview" && environment.VERCEL_ENV !== "production") {
    throw new Error(
      "[Guide microfrontends] Vercel build requires VERCEL_ENV to be exactly preview or production.",
    );
  }

  if (environment.VERCEL_ENV === "preview") {
    if (previewGate !== "true" || typeof productionGate === "string") {
      throw new Error(
        "[Guide microfrontends] Preview build requires GUIDE_MFE_PREVIEW_ENABLED=true and GUIDE_MFE_PRODUCTION_ENABLED unset.",
      );
    }
    return;
  }

  if (productionGate !== "true" || typeof previewGate === "string") {
    throw new Error(
      "[Guide microfrontends] Production build requires GUIDE_MFE_PRODUCTION_ENABLED=true and GUIDE_MFE_PREVIEW_ENABLED unset.",
    );
  }
}

/**
 * Return the only config path the Guide's Next build may consume.
 * Vercel additionally requires an independently configured trusted digest.
 */
export function verifyTrustedMicrofrontendsSnapshot({
  snapshotPath = MICROFRONTENDS_SNAPSHOT_PATH,
  manifestPath = MICROFRONTENDS_MANIFEST_PATH,
  environment = process.env,
}: SnapshotPaths = {}) {
  assertUnambiguousConfigSource(environment);
  assertDeploymentApproval(environment);
  const snapshot = readRequiredFile(snapshotPath, "generated config snapshot");
  const manifest = parseManifest(
    readRequiredFile(manifestPath, "generated config manifest"),
    manifestPath,
  );
  const actualFingerprint = fingerprintMicrofrontendsConfig(snapshot);

  if (actualFingerprint !== manifest.authoritativeSourceSha256) {
    throw new Error(
      `[Guide microfrontends] Snapshot fingerprint mismatch: manifest trusts ${manifest.authoritativeSourceSha256}, snapshot is ${actualFingerprint}. Run the reviewed sync command from an FDLC checkout.`,
    );
  }

  const canonicalSnapshot = serializeMicrofrontendsSnapshot(snapshot);
  if (snapshot !== canonicalSnapshot) {
    throw new Error(
      `[Guide microfrontends] ${snapshotPath} is not the canonical sanitized snapshot. Run the reviewed sync command.`,
    );
  }

  const externalFingerprint = environment.FDLC_MFE_CONFIG_SHA256;
  const externalSourceCommit = environment.FDLC_MFE_SOURCE_COMMIT;
  if (isVercelBuild(environment) && !externalFingerprint) {
    throw new Error(
      "[Guide microfrontends] Vercel build requires FDLC_MFE_CONFIG_SHA256.",
    );
  }
  if (isVercelBuild(environment) && !externalSourceCommit) {
    throw new Error(
      "[Guide microfrontends] Vercel build requires FDLC_MFE_SOURCE_COMMIT.",
    );
  }
  if (externalFingerprint && externalFingerprint !== manifest.authoritativeSourceSha256) {
    throw new Error(
      `[Guide microfrontends] Vercel trusted digest mismatch: environment trusts ${externalFingerprint}, generated manifest records ${manifest.authoritativeSourceSha256}.`,
    );
  }
  if (externalSourceCommit && externalSourceCommit !== manifest.sourceCommit) {
    throw new Error(
      `[Guide microfrontends] Vercel trusted source mismatch: environment trusts ${externalSourceCommit}, generated manifest records ${manifest.sourceCommit}.`,
    );
  }

  return {
    configFilename: MICROFRONTENDS_CONFIG_FILENAME,
    configPath: snapshotPath,
    fingerprint: actualFingerprint,
  };
}
