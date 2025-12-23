export const config = { runtime: 'nodejs' }

export default async function handler(_req: Request): Promise<Response> {
  return new Response(
    JSON.stringify(
      {
        ok: true,
        runtime: 'nodejs',
        node: process.version,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN
      },
      null,
      2
    ),
    { status: 200, headers: { 'content-type': 'application/json; charset=utf-8' } }
  )
}


