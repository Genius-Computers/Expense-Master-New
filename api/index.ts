export const config = { runtime: 'nodejs' }

let cached: Promise<any> | null = null

export default async function handler(req: Request): Promise<Response> {
  try {
    // Fast probe without importing the huge app
    const url = new URL(req.url)
    if (url.pathname === '/api/__probe' || url.pathname === '/__probe') {
      return new Response('OK', { status: 200 })
    }

    if (!cached) cached = import('../src/index')
    const mod = await cached
    const app = (mod as any).default
    if (!app?.fetch) return new Response('BOOT_ERROR: default export has no fetch()', { status: 500 })

    return await app.fetch(req)
  } catch (e: any) {
    const msg = e?.stack || e?.message || String(e)
    return new Response(`BOOT_ERROR:\n${msg}`, {
      status: 500,
      headers: { 'content-type': 'text/plain; charset=utf-8' }
    })
  }
}


