import { Hono } from 'hono'

// This file exists to avoid Vercel "FUNCTION_INVOCATION_FAILED" masking the real error.
// We keep a tiny app in `api/` (which Vercel definitely runs), then lazy-load the big app.

let cachedAppPromise: Promise<any> | null = null

function normalizeForPages(request: Request): Request {
  // Vercel rewrites non-`/api/*` to `/api/...` (see vercel.json).
  // Our "page" routes are at `/`, `/admin/*`, etc. and API routes are at `/api/*`.
  // If the request path is `/api/<page>`, strip the prefix for routing.
  const url = new URL(request.url)
  const path = url.pathname
  if (path === '/api' || path.startsWith('/api/')) {
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
      return new Request(url.toString(), request)
    }
  }
  return request
}

export function createBootstrapApp() {
  const boot = new Hono()

  // Always-available probe to confirm the function is running.
  boot.get('/api/__probe', (c) => c.text('OK'))
  boot.get('/__probe', (c) => c.text('OK'))

  // Delegate everything else to the real app.
  boot.all('*', async (c) => {
    try {
      const req = normalizeForPages(c.req.raw)

      if (!cachedAppPromise) cachedAppPromise = import('../src/index')
      const mod = await cachedAppPromise
      const app = (mod as any).default
      if (!app?.fetch) return c.text('BOOT_ERROR: src/index default export has no fetch()', 500)

      return await app.fetch(req)
    } catch (e: any) {
      const msg = e?.stack || e?.message || String(e)
      return c.text(`BOOT_ERROR:\n${msg}`, 500)
    }
  })

  return boot
}


