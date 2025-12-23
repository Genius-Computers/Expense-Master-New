import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { neon } from '@neondatabase/serverless'

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
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    console.error('Missing env var: DATABASE_URL')
    process.exit(1)
  }

  const sql = neon(databaseUrl)

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
      const trimmed = stmt.trim()
      if (!trimmed || trimmed.startsWith('--')) continue
      // Neon serverless accepts (query, params) for dynamic strings
      await sql(trimmed, [])
    }
  }

  console.log('\n✅ Migrations applied successfully')
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})


