import { neon } from '@neondatabase/serverless'

export const config = { runtime: 'nodejs' }

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

let cachedAppPromise: Promise<any> | null = null

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  let t: any
  const timeout = new Promise<T>((_resolve, reject) => {
    t = setTimeout(() => reject(new Error(`TIMEOUT(${label}) after ${ms}ms`)), ms)
  })
  return Promise.race([p, timeout]).finally(() => clearTimeout(t))
}

async function ensureAbsoluteRequest(request: Request): Promise<Request> {
  try {
    // If this succeeds, it's already absolute.
    new URL(request.url)
    return request
  } catch {
    const proto = request.headers.get('x-forwarded-proto') ?? 'https'
    const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? 'localhost'
    const absUrl = new URL(request.url, `${proto}://${host}`).toString()
    // IMPORTANT: don't "clone" via `new Request(absUrl, request)` because it can behave badly with
    // streaming bodies in Node runtimes (leading to hanging `req.json()` downstream).
    const method = request.method
    const headers = request.headers
    let body: ArrayBuffer | undefined
    if (method !== 'GET' && method !== 'HEAD') {
      body = await withTimeout(request.arrayBuffer(), 10_000, 'read_body')
    }
    return new Request(absUrl, { method, headers, body })
  }
}

export default async function handler(request: Request): Promise<Response> {
  const t0 = Date.now()
  let step = 'start'
  try {
    if (request.method === 'OPTIONS') {
      return new Response('', { status: 204 })
    }

    console.log('[api/auth/login] start', request.method, request.url)

    const databaseUrl = process.env.DATABASE_URL
    if (!databaseUrl) return new Response('Missing env var: DATABASE_URL', { status: 500 })
    const env = { DB: createNeonD1Database(databaseUrl) }

    step = 'abs_url'
    const req = await ensureAbsoluteRequest(request)

    step = 'import_bundle'
    const appModPromise: Promise<any> = cachedAppPromise ?? (cachedAppPromise = import('../_app.bundle.cjs'))
    const mod: any = await withTimeout<any>(appModPromise, 10_000, 'import_bundle')
    const app = (mod as any)?.default?.fetch ? (mod as any).default : (mod as any)?.default?.default
    if (!app?.fetch) return new Response('BOOT_ERROR: bundled app has no fetch()', { status: 500 })

    step = 'app_fetch'
    const res: Response = await withTimeout<Response>(
      (app.fetch(req, env as any) as Promise<Response>),
      20_000,
      'app_fetch'
    )

    const ms = Date.now() - t0
    console.log('[api/auth/login] end', res.status, `${ms}ms`)

    // Ensure we can see *something* from the browser Network tab even when logs are flaky.
    const out = new Response(res.body, res)
    out.headers.set('x-expense-debug', `auth-login;status=${res.status};ms=${ms}`)
    return out
  } catch (e: any) {
    const msg = e?.stack || e?.message || String(e)
    const ms = Date.now() - t0
    console.error('[api/auth/login] crash', step, msg)
    return Response.json(
      { success: false, error: msg, step, ms },
      { status: /TIMEOUT\(/.test(String(msg)) ? 504 : 500, headers: { 'x-expense-debug': `auth-login;step=${step};ms=${ms}` } }
    )
  }
}


