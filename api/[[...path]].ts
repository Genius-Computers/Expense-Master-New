import { createNeonD1Database } from '../src/platform/db/neon-d1-compat.ts'

export const config = { runtime: 'nodejs' }

let cachedAppPromise: Promise<any> | null = null

export default async function handler(request: Request): Promise<Response> {
  try {
    // Polyfill atob/btoa for Node runtime (used by src/index.ts token logic).
    ;(globalThis as any).atob ??= (b64: string) =>
      Buffer.from(b64, 'base64').toString('binary')
    ;(globalThis as any).btoa ??= (bin: string) =>
      Buffer.from(bin, 'binary').toString('base64')

    const databaseUrl = process.env.DATABASE_URL
    if (!databaseUrl) {
      return new Response('Missing env var: DATABASE_URL', { status: 500 })
    }

    // Lightweight health endpoint for production debugging (does not require rewrites).
    // Visit: /api/__health
    const url0 = new URL(request.url)
    if (url0.pathname === '/api/__health') {
      return new Response(
        JSON.stringify(
          {
            ok: true,
            runtime: 'nodejs',
            node: process.version,
            hasDatabaseUrl: !!process.env.DATABASE_URL,
            hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN
          },
          null,
          2
        ),
        { status: 200, headers: { 'content-type': 'application/json; charset=utf-8' } }
      )
    }

    // vercel.json rewrites route non-`/api/*` traffic through this function by prefixing `/api`.
    // Our Hono app routes are defined at `/`, `/admin/*`, etc. (not under `/api/*`),
    // while real API endpoints are at `/api/*`. So we strip the prefix ONLY for page routes.
    const url = new URL(request.url)
    const path = url.pathname
    const isRewritten = path === '/api' || path.startsWith('/api/')
    if (isRewritten) {
      const after = path === '/api' ? '' : path.slice('/api/'.length)
      const firstSeg = after.split('/')[0] // '' when "/api/"
      const pageSegs = new Set(['', 'admin', 'login', 'forgot-password', 'calculator', 'calculator-old', 'packages', 'subscribe', 'test', 'c'])
      if (pageSegs.has(firstSeg)) {
        url.pathname = path.replace(/^\/api(?=\/|$)/, '') || '/'
        request = new Request(url.toString(), request)
      }
    }

    // Lazy-load the app so a module-resolution failure doesn't crash the function.
    // Cache between invocations in the same lambda to reduce cold start cost.
    if (!cachedAppPromise) cachedAppPromise = import('../src/index')
    const mod = await cachedAppPromise
    const app = (mod as any).default
    if (!app?.fetch) {
      return new Response('App import failed: default export missing `fetch`', { status: 500 })
    }

    // Provide Cloudflare-like `c.env` bindings expected by `src/index.ts`.
    const env = {
      DB: createNeonD1Database(databaseUrl)
      // ATTACHMENTS is replaced by Vercel Blob in `src/index.ts` routes.
    }

    // Prevent “endless loading” if something stalls (DB connection, etc.).
    const timeoutMs = 9000
    const timeout = new Promise<Response>((resolve) =>
      setTimeout(
        () =>
          resolve(
            new Response(
              `TIMEOUT after ${timeoutMs}ms (request may be stuck on DB/network). Try /api/__health and check Vercel Function Logs.`,
              { status: 504 }
            )
          ),
        timeoutMs
      )
    )

    return await Promise.race([app.fetch(request, env as any), timeout])
  } catch (error: any) {
    const msg =
      (error && (error.stack || error.message)) ||
      String(error) ||
      'Unknown error'
    return new Response(`BOOT_ERROR:\n${msg}`, { status: 500 })
  }
}


