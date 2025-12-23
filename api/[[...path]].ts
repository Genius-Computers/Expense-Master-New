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


