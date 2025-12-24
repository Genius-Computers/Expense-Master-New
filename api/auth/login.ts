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

function isWebRequest(x: any): x is Request {
  return !!x && typeof x === 'object' && typeof x.url === 'string' && typeof x.method === 'string'
}

function getHeaderFromNodeReq(nodeReq: any, name: string): string | undefined {
  const headers = nodeReq?.headers
  if (!headers) return undefined
  const key = name.toLowerCase()
  const v = headers[key]
  if (Array.isArray(v)) return v.join(', ')
  if (typeof v === 'string') return v
  return undefined
}

function toHeadersFromNode(nodeReq: any): Headers {
  const h = new Headers()
  const src = nodeReq?.headers ?? {}
  for (const [k, v] of Object.entries(src)) {
    if (v == null) continue
    if (Array.isArray(v)) h.set(k, v.join(', '))
    else h.set(k, String(v))
  }
  return h
}

async function readNodeBody(nodeReq: any): Promise<Uint8Array | undefined> {
  // If some framework already parsed it, use that.
  if (nodeReq?.body != null) {
    if (typeof nodeReq.body === 'string') return new TextEncoder().encode(nodeReq.body)
    if (nodeReq.body instanceof Uint8Array) return nodeReq.body
    if (Buffer.isBuffer(nodeReq.body)) return new Uint8Array(nodeReq.body)
    // object -> JSON
    return new TextEncoder().encode(JSON.stringify(nodeReq.body))
  }

  // Otherwise, read the raw stream.
  const chunks: Uint8Array[] = []
  await new Promise<void>((resolve, reject) => {
    nodeReq.on('data', (chunk: any) => chunks.push(chunk))
    nodeReq.on('end', () => resolve())
    nodeReq.on('error', (err: any) => reject(err))
  })
  if (!chunks.length) return undefined
  const total = chunks.reduce((n, c) => n + c.length, 0)
  const out = new Uint8Array(total)
  let off = 0
  for (const c of chunks) {
    out.set(c, off)
    off += c.length
  }
  return out
}

function getAbsoluteUrlFromNodeReq(nodeReq: any): string {
  const proto = getHeaderFromNodeReq(nodeReq, 'x-forwarded-proto') ?? 'https'
  const host =
    getHeaderFromNodeReq(nodeReq, 'x-forwarded-host') ??
    getHeaderFromNodeReq(nodeReq, 'host') ??
    'localhost'
  // Vercel Node req has `url` like `/api/auth/login`
  const path = typeof nodeReq?.url === 'string' ? nodeReq.url : '/'
  return new URL(path, `${proto}://${host}`).toString()
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

async function handleWebRequest(request: Request): Promise<Response> {
  const t0 = Date.now()
  let step = 'start'

  try {
    if (request.method === 'OPTIONS') return new Response('', { status: 204 })

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

    const out = new Response(res.body, res)
    out.headers.set('x-expense-debug', `auth-login;status=${res.status};ms=${ms}`)
    return out
  } catch (e: any) {
    const msg = e?.stack || e?.message || String(e)
    const ms = Date.now() - t0
    console.error('[api/auth/login] crash', step, msg)
    return Response.json(
      { success: false, error: msg, step, ms },
      {
        status: /TIMEOUT\(/.test(String(msg)) ? 504 : 500,
        headers: { 'x-expense-debug': `auth-login;step=${step};ms=${ms}` }
      }
    )
  }
}

async function sendNodeResponse(nodeRes: any, response: Response) {
  nodeRes.statusCode = response.status
  response.headers.forEach((value, key) => {
    try {
      nodeRes.setHeader(key, value)
    } catch {
      // ignore invalid headers
    }
  })
  const ab = await response.arrayBuffer()
  nodeRes.end(Buffer.from(ab))
}

// Vercel Node Functions call default export as (req, res).
// But some runtimes/tools can call it as a Fetch handler (Request -> Response).
export default async function handler(req: any, res?: any): Promise<any> {
  if (res && req && typeof req?.on === 'function') {
    const url = getAbsoluteUrlFromNodeReq(req)
    const method = req.method || 'GET'
    const headers = toHeadersFromNode(req)
    const bodyBytes =
      method === 'GET' || method === 'HEAD'
        ? undefined
        : await withTimeout(readNodeBody(req), 10_000, 'read_body')
    const body = bodyBytes ? Buffer.from(bodyBytes) : undefined
    const webReq = new Request(url, { method, headers, body })
    const webRes = await handleWebRequest(webReq)
    await sendNodeResponse(res, webRes)
    return
  }

  // Fetch-style invocation
  if (isWebRequest(req)) return await handleWebRequest(req)
  return Response.json({ success: false, error: 'Unsupported handler invocation' }, { status: 500 })
}


