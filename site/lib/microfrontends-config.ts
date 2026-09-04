import { existsSync } from "node:fs";
import path from "node:path";

type MicrofrontendsEnvironment = {
  [key: string]: string | undefined;
  VC_MICROFRONTENDS_CONFIG?: string;
  VC_MICROFRONTENDS_CONFIG_FILE_NAME?: string;
};

/**
 * The child application has no routing config of its own. Activate the Next.js
 * integration only when Vercel has pulled the default application's config or
 * an operator has supplied its path explicitly.
 */
export function hasMicrofrontendsConfig(
  directory = process.cwd(),
  environment: MicrofrontendsEnvironment = process.env,
) {
  if (typeof environment.VC_MICROFRONTENDS_CONFIG === "string") return true;

  const filename = environment.VC_MICROFRONTENDS_CONFIG_FILE_NAME ?? "microfrontends.json";
  return [path.resolve(directory, filename), path.resolve(directory, ".vercel", filename)].some(existsSync);
}
