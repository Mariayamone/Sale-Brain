/** Bundle Vercel API handler (no Vite) into api/index.js — committed so deploy validation passes. */
const esbuild = require("esbuild");
const path = require("path");

const outFile = path.join(__dirname, "..", "api", "index.cjs");

esbuild.buildSync({
  entryPoints: [path.join(__dirname, "vercel-api-entry.ts")],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "cjs",
  outfile: outFile,
  packages: "external",
  sourcemap: true,
  logLevel: "info",
});

console.log("[build-vercel-api] Wrote", outFile);
