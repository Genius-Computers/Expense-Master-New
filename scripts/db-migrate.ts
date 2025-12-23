import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { neon } from '@neondatabase/serverless'
import { existsSync } from 'node:fs'

function splitSqlStatements(sql: string): string[] {
  const out: string[] = []
  let buf = ''
  let inSingle = false
  let inDouble = false
  let i = 0

  while (i < sql.length) {
    const ch = sql[i]

    if (inSingle) {
      buf += ch
      if (ch === "'" && sql[i + 1] === "'") {
        buf += sql[i + 1]
        i += 2
        continue
      }
      if (ch === "'") inSingle = false
      i++
      continue
    }

    if (inDouble) {
      buf += ch
      if (ch === '"') inDouble = false
      i++
      continue
    }

    if (ch === "'") {
      inSingle = true
      buf += ch
      i++
      continue
    }
    if (ch === '"') {
      inDouble = true
      buf += ch
      i++
      continue
    }

    if (ch === ';') {
      const stmt = buf.trim()
      if (stmt) out.push(stmt)
      buf = ''
      i++
      continue
    }

    buf += ch
    i++
  }

  const last = buf.trim()
  if (last) out.push(last)
  return out
}

async function main() {
  // Load local env files if present (Vercel provides env vars automatically in deployment).
  // Try a few common filenames to reduce “Missing env var” surprises.
  const candidates = ['.env', '.env.local', '.env.development', '.env.production']
  for (const p of candidates) {
    if (existsSync(p)) {
      dotenv.config({ path: p })
    }
  }

  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    console.error('Missing env var: DATABASE_URL')
    console.error('Looked for env files:', candidates.join(', '))
    process.exit(1)
  }

  const sql = neon(databaseUrl)

  // Ensure we run everything in public schema (and print diagnostics so mis-pointed DATABASE_URL is obvious).
  try {
    const info = await sql(
      `SELECT current_database() as db, current_user as user, current_schema() as schema, current_setting('search_path') as search_path`,
      []
    )
    console.log('Connected to:', info?.[0] ?? info)
  } catch (e) {
    console.log('Connected (unable to read db info):', e)
  }

  // Optional hard reset for the connected database/schema.
  // Useful when reusing an existing Neon database that had a different schema.
  // Usage (PowerShell):
  //   $env:RESET_DB=1; npm run db:migrate
  if (process.env.RESET_DB === '1') {
    console.log('\n⚠️ RESET_DB=1: Dropping schema public CASCADE and recreating it...')
    await sql(`DROP SCHEMA IF EXISTS public CASCADE`, [])
    await sql(`CREATE SCHEMA public`, [])
  }

  await sql(`CREATE SCHEMA IF NOT EXISTS public`, [])
  await sql(`SET search_path TO public`, [])

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const migrationsDir = path.resolve(__dirname, '..', 'migrations_postgres')

  const entries = (await fs.readdir(migrationsDir))
    .filter((f) => f.endsWith('.sql'))
    .sort()

  for (const file of entries) {
    const fullPath = path.join(migrationsDir, file)
    const raw = await fs.readFile(fullPath, 'utf8')
    const statements = splitSqlStatements(raw)

    console.log(`\n==> Applying ${file} (${statements.length} statements)`)
    for (const stmt of statements) {
      // Strip line comments and whitespace so a statement that starts with comments
      // (e.g. a header block) doesn't get incorrectly skipped.
      const withoutLineComments = stmt
        .split('\n')
        .filter((line) => !line.trim().startsWith('--'))
        .join('\n')
        .trim()

      if (!withoutLineComments) continue
      // Neon serverless accepts (query, params) for dynamic strings
      try {
        await sql(withoutLineComments, [])
      } catch (err: any) {
        // Helpful debug for the common case: table exists but has different columns.
        if (String(err?.message || '').includes('slug') || String(err?.message || '').includes('tenants')) {
          try {
            const cols = await sql(
              `SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='tenants' ORDER BY ordinal_position`,
              []
            )
            console.log('DEBUG tenants columns:', cols.map((c: any) => c.column_name))
          } catch {
            // ignore
          }
        }
        throw err
      }
    }
  }

  console.log('\n✅ Migrations applied successfully')
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})


