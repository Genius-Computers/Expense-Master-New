import { del, put } from '@vercel/blob'

function requireBlobToken(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    throw new Error('Missing env var: BLOB_READ_WRITE_TOKEN')
  }
  return token
}

export async function putBlob(pathname: string, data: Blob) {
  const token = requireBlobToken()
  return put(pathname, data, {
    access: 'public',
    addRandomSuffix: false,
    token
  })
}

export async function deleteBlob(blobUrl: string) {
  const token = requireBlobToken()
  await del(blobUrl, { token })
}


