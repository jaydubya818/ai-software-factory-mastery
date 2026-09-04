import { withMicrofrontends } from "@vercel/microfrontends/next/config";
import type { NextConfig } from "next";
import { hasMicrofrontendsConfig } from "./lib/microfrontends-config.ts";

const nextConfig: NextConfig = {
  /* config options here */
};

export default hasMicrofrontendsConfig() ? withMicrofrontends(nextConfig) : nextConfig;
