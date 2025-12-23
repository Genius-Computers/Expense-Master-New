import { createNeonD1Database } from '../src/platform/db/neon-d1-compat.ts'

export const config = { runtime: 'nodejs' }

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
    const mod = await import('../src/index')
    const app = (mod as any).default
    if (!app?.fetch) {
      return new Response('App import failed: default export missing `fetch`', { status: 500 })
    }

    // Provide Cloudflare-like `c.env` bindings expected by `src/index.ts`.
    const env = {
      DB: createNeonD1Database(databaseUrl)
      // ATTACHMENTS is replaced by Vercel Blob in `src/index.ts` routes.
    }

    return app.fetch(request, env as any)
  } catch (error: any) {
    const msg =
      (error && (error.stack || error.message)) ||
      String(error) ||
      'Unknown error'
    return new Response(`BOOT_ERROR:\n${msg}`, { status: 500 })
  }
}


