const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api'

export const env = {
  apiBaseUrl,
  storageTokenKey: 'informa_token',
}

export default env

