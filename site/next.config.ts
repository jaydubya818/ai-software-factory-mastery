import { withMicrofrontends } from "@vercel/microfrontends/next/config";
import type { NextConfig } from "next";
import {
  isVercelBuild,
  verifyTrustedMicrofrontendsSnapshot,
} from "./lib/microfrontends-config.ts";

const nextConfig: NextConfig = {
  /* config options here */
};

const isStandaloneVinext = process.env.GUIDE_STANDALONE_VINEXT === "1";
const isNativeLocal = process.env.GUIDE_NATIVE_LOCAL === "1";
const isDeploymentBuild = isVercelBuild();
const hasDeploymentMarker = process.env.GUIDE_VERCEL_BUILD === "1";
const isVercelEnvironment = process.env.VERCEL === "1";
const selectedModes = [isStandaloneVinext, isNativeLocal, isDeploymentBuild]
  .filter(Boolean).length;

if (isVercelEnvironment && !isDeploymentBuild) {
  throw new Error(
    "[Guide microfrontends] A Vercel environment must use the repository deployment entrypoint.",
  );
}

if (hasDeploymentMarker && !isVercelEnvironment) {
  throw new Error(
    "[Guide microfrontends] GUIDE_VERCEL_BUILD is valid only when VERCEL=1.",
  );
}

if (isStandaloneVinext && isDeploymentBuild) {
  throw new Error(
    "[Guide microfrontends] GUIDE_STANDALONE_VINEXT cannot disable Microfrontends on Vercel.",
  );
}

if (selectedModes !== 1) {
  throw new Error(
    "[Guide microfrontends] Select exactly one reviewed build mode: standalone Vinext, native local, or Vercel deployment.",
  );
}

const { configFilename } = verifyTrustedMicrofrontendsSnapshot();
if (!isStandaloneVinext) process.env.VC_MICROFRONTENDS_CONFIG_FILE_NAME = configFilename;

export default isStandaloneVinext
  ? nextConfig
  : withMicrofrontends(nextConfig, { appName: "ai-software-factory-mastery" });
