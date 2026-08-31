import assert from "node:assert/strict";

const workerUrl = new URL("../../dist/server/index.js", import.meta.url);

/**
 * Dispatch a request through a freshly imported copy of the built worker.
 *
 * The cache-busting search parameter forces a new module instance per call so
 * module-level state cannot leak between tests, which mirrors the cold isolate
 * a Cloudflare Worker starts from.
 */
export async function render(pathname = "/") {
  const url = new URL(workerUrl.href);
  url.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(url.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

/** Render `pathname`, assert it is a successful HTML response, return the body. */
export async function htmlFor(pathname) {
  const response = await render(pathname);
  assert.equal(response.status, 200, `${pathname} should render successfully`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}
