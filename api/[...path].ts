import { Hono } from 'hono'

// Force Node runtime.
export const config = { runtime: 'nodejs' }

let cachedAppPromise: Promise<any> | null = null

function normalizeForPages(request: Request): Request {
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

      // Safe clone: page routes are GET/HEAD (no body).
      const init: RequestInit = { method: request.method, headers: request.headers }
      return new Request(url.toString(), init)
    }
  }

  return request
}

const boot = new Hono()

boot.get('/api/__probe', (c) => c.text('OK'))
boot.get('/__probe', (c) => c.text('OK'))

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
    console.error('BOOT_ERROR:', msg)
    return c.text(`BOOT_ERROR:\n${msg}`, 500)
  }
})

export default boot


