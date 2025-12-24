import { Hono } from 'hono'
import { neon } from '@neondatabase/serverless'

// Force Node runtime.
export const config = { runtime: 'nodejs' }

let cachedAppPromise: Promise<any> | null = null

function convertQMarksToDollarParams(sql: string): string {
  let out = ''
  let paramIndex = 0
  let inSingle = false
  let inDouble = false

  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i]

    if (inSingle) {
      out += ch
      if (ch === "'" && sql[i + 1] === "'") {
        out += sql[i + 1]
        i++
        continue
      }
      if (ch === "'") inSingle = false
      continue
    }

    if (inDouble) {
      out += ch
      if (ch === '"') inDouble = false
      continue
    }

    if (ch === "'") {
      inSingle = true
      out += ch
      continue
    }
    if (ch === '"') {
      inDouble = true
      out += ch
      continue
    }

    if (ch === '?') {
      paramIndex++
      out += `$${paramIndex}`
      continue
    }

    out += ch
  }

  return out
}

function stripTrailingSemicolon(sql: string): string {
  return sql.replace(/;\s*$/, '')
}

function isInsert(sql: string) {
  return /^\s*insert\b/i.test(sql)
}
function isUpdate(sql: string) {
  return /^\s*update\b/i.test(sql)
}
function isDelete(sql: string) {
  return /^\s*delete\b/i.test(sql)
}
function hasReturning(sql: string) {
  return /\breturning\b/i.test(sql)
}
function isDdl(sql: string) {
  return /^\s*(create|alter|drop)\b/i.test(sql)
}

function createNeonD1Database(databaseUrl: string) {
  const sqlClient = neon(databaseUrl)
  return {
    prepare(sqlText: string) {
      const rawSql = sqlText
      const state: { params: any[] } = { params: [] }
      return {
        bind(...params: any[]) {
          state.params = params
          return this
        },
        async all() {
          const text = convertQMarksToDollarParams(rawSql)
          const results = (await sqlClient(text, state.params)) as any[]
          return { results }
        },
        async first() {
          const { results } = await this.all()
          return results[0] ?? null
        },
        async run() {
          let text = stripTrailingSemicolon(rawSql)
          if (!hasReturning(text) && !isDdl(text)) {
            if (isInsert(text)) text = `${text} RETURNING id`
            else if (isUpdate(text) || isDelete(text)) text = `${text} RETURNING 1 AS __changed`
          }
          const converted = convertQMarksToDollarParams(text)
          const rows = (await sqlClient(converted, state.params)) as any[]
          const meta: any = {}
          if (isInsert(text)) {
            const id = rows?.[0]?.id
            if (typeof id === 'number') meta.last_row_id = id
          }
          if (isUpdate(text) || isDelete(text)) meta.changes = Array.isArray(rows) ? rows.length : 0
          return { meta }
        }
      }
    }
  }
}

function normalizeForPages(request: Request): Request {
  const proto = request.headers.get('x-forwarded-proto') ?? 'https'
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? 'localhost'
  const url = new URL(request.url, `${proto}://${host}`)
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
    // In Vercel, import the pre-bundled app to avoid ESM resolution issues with src/*.ts files.
    if (!cachedAppPromise) {
      cachedAppPromise = process.env.VERCEL
        ? import('./_app.bundle.cjs')
        : import('../src/index')
    }
    const mod = await cachedAppPromise
    // When importing a CJS bundle via ESM `import()`, Vercel/Node returns `{ default: module.exports }`.
    // Our bundle exports `{ default: app }`, so the Hono app ends up at `mod.default.default`.
    const app = (mod as any)?.default?.fetch
      ? (mod as any).default
      : (mod as any)?.default?.default
    if (!app?.fetch) return c.text('BOOT_ERROR: src/index default export has no fetch()', 500)

    // Ensure bindings exist so `c.env` is defined throughout the app.
    const databaseUrl = process.env.DATABASE_URL
    if (!databaseUrl) return c.text('Missing env var: DATABASE_URL', 500)
    const env = { DB: createNeonD1Database(databaseUrl) }

    return await app.fetch(req, env as any)
  } catch (e: any) {
    const msg = e?.stack || e?.message || String(e)
    console.error('BOOT_ERROR:', msg)
    return c.text(`BOOT_ERROR:\n${msg}`, 500)
  }
})

export default boot


