import axios from 'axios'

import api from './http'

type LoginPayload = {
  username: string
  password: string
}

export type TokenResponse = {
  access_token: string
  token_type: string
  expires_in: number
}

export type Role = {
  name: string
  description?: string | null
}

export type UserProfile = {
  id: number
  username: string
  email?: string | null
  full_name?: string | null
  is_active: boolean
  dashboard_type?: string | null
  roles: Role[]
}

const login = async (payload: LoginPayload): Promise<TokenResponse> => {
  try {
    const { data } = await api.post<TokenResponse>('/auth/login', payload)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { detail?: string })?.detail ??
        'Credenciales inválidas'
      throw new Error(message)
    }
    throw error
  }
}

const profile = async (): Promise<UserProfile> => {
  try {
    const { data } = await api.get<UserProfile>('/auth/me')
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { detail?: string })?.detail ??
        'No se pudo obtener la información del usuario'
      throw new Error(message)
    }
    throw error
  }
}

export const authService = {
  login,
  profile,
}

export default authService

