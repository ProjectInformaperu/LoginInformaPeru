import env from '../config/env'

const withTimeout = async (promise: Promise<Response>, ms: number): Promise<Response> => {
  const timeout = new Promise<Response>((_, reject) =>
    setTimeout(() => reject(new Error('timeout')), ms),
  )
  return Promise.race([promise, timeout]) as Promise<Response>
}

export const warmupBackend = async (): Promise<void> => {
  try {
    const base = env.apiBaseUrl.replace(/\/+$/, '')
    const healthUrl = `${base.replace(/\/api$/, '')}/health`
    await withTimeout(fetch(healthUrl, { method: 'GET', cache: 'no-store' }), 3000)
  } catch {
    // Silencioso: no bloquear la UI si falla
  }
}

export default warmupBackend


