import { createNeonD1Database } from '../src/platform/db/neon-d1-compat.ts'

export const config = { runtime: 'nodejs' }

let cachedAppPromise: Promise<any> | null = null

export default async function handler(request: Request): Promise<Response> {
  try {
    ;(globalThis as any).atob ??= (b64: string) =>
      Buffer.from(b64, 'base64').toString('binary')
    ;(globalThis as any).btoa ??= (bin: string) =>
      Buffer.from(bin, 'binary').toString('base64')

    const databaseUrl = process.env.DATABASE_URL
    if (!databaseUrl) {
      return new Response('Missing env var: DATABASE_URL', { status: 500 })
    }

    // Undo `/api` prefix rewrite for page routes only.
    const url = new URL(request.url)
    const path = url.pathname
    const isRewritten = path === '/api' || path.startsWith('/api/')
    if (isRewritten) {
      const after = path === '/api' ? '' : path.slice('/api/'.length)
      const firstSeg = after.split('/')[0]
      const pageSegs = new Set([
        '',
        'admin',
        'login',
        'forgot-password',
        'calculator',
        'calculator-old',
        'packages',
        'subscribe',
        'test',
        'c'
      ])
      if (pageSegs.has(firstSeg)) {
        url.pathname = path.replace(/^\/api(?=\/|$)/, '') || '/'
        request = new Request(url.toString(), request)
      }
    }

    if (!cachedAppPromise) cachedAppPromise = import('../src/index')
    const mod = await cachedAppPromise
    const app = (mod as any).default
    if (!app?.fetch) {
      return new Response('App import failed: default export missing `fetch`', { status: 500 })
    }

    const env = {
      DB: createNeonD1Database(databaseUrl)
    }

    const timeoutMs = 9000
    const timeout = new Promise<Response>((resolve) =>
      setTimeout(
        () =>
          resolve(
            new Response(
              `TIMEOUT after ${timeoutMs}ms (request may be stuck on DB/network).`,
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


