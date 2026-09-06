// Keep catch-all misses inside the Guide route tree so Next can hydrate the
// custom 404 without falling back to its document-level error shell.
export { default } from "../../not-found";
