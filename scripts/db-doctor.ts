import dotenv from 'dotenv'
import { neon } from '@neondatabase/serverless'

dotenv.config()

function requireEnv(name: string) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env var: ${name}`)
  return v
}

async function main() {
  const url = requireEnv('DATABASE_URL')
  const sql = neon(url)

  const info = (await sql(`
    SELECT
      current_database() as db,
      current_user as "user",
      version() as version
  `)) as any[]

  console.log('✅ Connected')
  console.log(info[0])

  // Verify reads
  const tables = (await sql(`
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
    ORDER BY tablename
  `)) as any[]
  console.log(`📦 public tables: ${tables.length}`)
  console.log(tables.map((t) => t.tablename).slice(0, 50).join(', ') + (tables.length > 50 ? ', ...' : ''))

  // Verify writes (transaction rollback)
  await sql('BEGIN')
  try {
    const canWrite = tables.some((t) => t.tablename === 'notifications')
    if (!canWrite) {
      console.log('ℹ️ Skipping write test (no public.notifications table)')
    } else {
      const rows = (await sql(
        `INSERT INTO notifications (title, message, type, is_read, created_at)
         VALUES ('db-doctor', 'write test (rolled back)', 'info', 0, NOW())
         RETURNING id`,
        []
      )) as any[]
      console.log('✍️ Write test inserted id (will rollback):', rows?.[0]?.id)
    }
  } finally {
    await sql('ROLLBACK')
  }

  console.log('✅ DB doctor completed')
}

main().catch((e) => {
  console.error('❌ DB doctor failed:', e?.stack || e?.message || String(e))
  process.exit(1)
})


