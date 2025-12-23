import handler from './[...path]'

export const config = { runtime: 'nodejs' }

export default async function index(request: Request): Promise<Response> {
  return handler(request)
}


