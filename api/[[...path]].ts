import app from '../src/index.tsx'
import { createNeonD1Database } from '../src/platform/db/neon-d1-compat'

// Vercel Edge Function runtime (fetch-based), ideal for Hono.
export const config = { runtime: 'edge' }

export default async function handler(request: Request): Promise<Response> {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    return new Response('Missing env var: DATABASE_URL', { status: 500 })
  }

  // Provide Cloudflare-like `c.env` bindings expected by `src/index.tsx`.
  const env = {
    DB: createNeonD1Database(databaseUrl)
    // ATTACHMENTS is replaced by Vercel Blob in `src/index.tsx` routes (see blob-adapter todo).
  }

  return app.fetch(request, env as any)
}


