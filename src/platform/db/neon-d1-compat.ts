import { neon } from '@neondatabase/serverless'

type Row = Record<string, any>

type D1AllResult = { results: Row[] }
type D1RunResult = { meta: { last_row_id?: number; changes?: number } }

type NeonSql = ReturnType<typeof neon>

function stripTrailingSemicolon(sql: string): string {
  return sql.replace(/;\s*$/, '')
}

/**
 * Convert D1/SQLite-style `?` placeholders to Postgres `$1..$n`.
 * This is a best-effort conversion that skips placeholders inside single/double quoted strings.
 */
function convertQMarksToDollarParams(sql: string): string {
  let out = ''
  let paramIndex = 0
  let inSingle = false
  let inDouble = false

  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i]

    // Handle escaping inside strings
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

class NeonD1PreparedStatement {
  private readonly rawSql: string
  private readonly boundParams: any[]
  private readonly sqlClient: NeonSql

  constructor(sqlClient: NeonSql, rawSql: string, boundParams: any[] = []) {
    this.sqlClient = sqlClient
    this.rawSql = rawSql
    this.boundParams = boundParams
  }

  bind(...params: any[]) {
    return new NeonD1PreparedStatement(this.sqlClient, this.rawSql, params)
  }

  async all(): Promise<D1AllResult> {
    const text = convertQMarksToDollarParams(this.rawSql)
    const results = (await this.sqlClient(text, this.boundParams)) as Row[]
    return { results }
  }

  async first(): Promise<Row | null> {
    const { results } = await this.all()
    return results[0] ?? null
  }

  async run(): Promise<D1RunResult> {
    let text = stripTrailingSemicolon(this.rawSql)

    // Ensure we can provide meta.changes / meta.last_row_id like D1.
    // - INSERT: RETURNING id (if the table has an `id` identity column)
    // - UPDATE/DELETE: RETURNING 1 (to count affected rows)
    // - DDL: execute as-is
    if (!hasReturning(text) && !isDdl(text)) {
      if (isInsert(text)) {
        text = `${text} RETURNING id`
      } else if (isUpdate(text) || isDelete(text)) {
        text = `${text} RETURNING 1 AS __changed`
      }
    }

    const converted = convertQMarksToDollarParams(text)
    const rows = (await this.sqlClient(converted, this.boundParams)) as Row[]

    const meta: D1RunResult['meta'] = {}
    if (isInsert(text)) {
      const id = rows?.[0]?.id
      if (typeof id === 'number') meta.last_row_id = id
    }
    if (isUpdate(text) || isDelete(text)) {
      meta.changes = Array.isArray(rows) ? rows.length : 0
    }

    return { meta }
  }
}

export function createNeonD1Database(databaseUrl: string) {
  const sqlClient = neon(databaseUrl)
  return {
    prepare(sqlText: string) {
      return new NeonD1PreparedStatement(sqlClient, sqlText)
    }
  }
}


