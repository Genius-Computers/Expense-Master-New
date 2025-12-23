import { Hono } from 'hono'

const app = new Hono()

app.get('*', (c) =>
  c.json({
    ok: true,
    runtime: 'hono',
    node: typeof process !== 'undefined' ? process.version : null,
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN
  })
)

export default app


