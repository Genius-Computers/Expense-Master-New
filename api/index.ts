import { createBootstrapApp } from './_bootstrap'

// Force Node runtime. (Edge runtime will crash when importing Node-only deps from src/.)
export const config = { runtime: 'nodejs' }

export default createBootstrapApp()


