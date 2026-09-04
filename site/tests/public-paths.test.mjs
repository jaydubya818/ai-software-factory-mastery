import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

import {
  absoluteGuideUrl,
  fdlcUrl,
  GUIDE_ROUTES,
  guideAssetPath,
  guideDocumentPath,
  standaloneDiscoveryFiles,
  STANDALONE_GUIDE_ORIGIN,
} from "../lib/paths.ts";

test("compatibility mode keeps Guide canonicals standalone and FDLC links absolute", () => {
  assert.equal(absoluteGuideUrl(GUIDE_ROUTES.home), `${STANDALONE_GUIDE_ORIGIN}/guide`);
  assert.equal(fdlcUrl("/framework"), "https://www.fdlc.ai/framework");
  assert.equal(guideDocumentPath("03-build/11-the-agent-factory"), "/guide/03-build/11-the-agent-factory");
  assert.equal(guideAssetPath("search-index.json"), "/guide/search-index.json");
  assert.match(standaloneDiscoveryFiles()?.sitemap ?? "", /<loc>https:\/\/ai-software-factory-mastery\.vercel\.app\/guide\/sitemap\.xml<\/loc>/);
});

test("an explicit composed-origin environment switches canonicals and cross-app links", () => {
  const script = `
    import { absoluteGuideUrl, fdlcUrl, GUIDE_ROUTES, standaloneDiscoveryFiles } from "./lib/paths.ts";
    process.stdout.write(JSON.stringify({ canonical: absoluteGuideUrl(GUIDE_ROUTES.home), framework: fdlcUrl("/framework"), rootDiscovery: standaloneDiscoveryFiles() }));
  `;
  const result = spawnSync(process.execPath, ["--experimental-strip-types", "--input-type=module", "--eval", script], {
    cwd: new URL("..", import.meta.url),
    encoding: "utf8",
    env: { ...process.env, NEXT_PUBLIC_SITE_URL: "https://www.fdlc.ai" },
  });

  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), {
    canonical: "https://www.fdlc.ai/guide",
    framework: "/framework",
    rootDiscovery: null,
  });
});
