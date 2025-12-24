import esbuild from 'esbuild'
import fs from 'node:fs'
import path from 'node:path'

const entry = path.resolve('src', 'index.ts')
const outFile = path.resolve('api', '_app.bundle.mjs')

// Bundle the full Hono app (and its route/page modules) into a single ESM file
// that Vercel Node runtime can import reliably.
await esbuild.build({
  entryPoints: [entry],
  outfile: outFile,
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: ['node18'],
  sourcemap: true,
  // Keep the function small-ish by not bundling Node builtins.
  // Also keep dotenv external (we load it dynamically only for local dev).
  external: ['node:*', 'dotenv'],
  logLevel: 'info'
})

// Sanity check: file exists and is non-empty
const stat = fs.statSync(outFile)
if (!stat.isFile() || stat.size < 1000) {
  throw new Error(`Bundle output looks wrong: ${outFile} (${stat.size} bytes)`)
}

console.log(`✅ Vercel bundle written: ${outFile} (${stat.size} bytes)`)


