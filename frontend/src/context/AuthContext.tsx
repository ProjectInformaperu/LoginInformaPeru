import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { PropsWithChildren } from 'react'

import authService from '../services/authService'
import type { TokenResponse, UserProfile } from '../services/authService'
import env from '../config/env'

type AuthState = {
  isAuthenticated: boolean
  token?: string
  user?: UserProfile
}

type AuthContextValue = AuthState & {
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  setAuthenticatedUser: (user: UserProfile, token: string) => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
  })

  const persistToken = useCallback((token?: string) => {
    if (token) {
      localStorage.setItem(env.storageTokenKey, token)
    } else {
      localStorage.removeItem(env.storageTokenKey)
    }
  }, [])

  const setAuthenticatedUser = useCallback(
    (user: UserProfile, token: string) => {
      persistToken(token)
      setState({
        isAuthenticated: true,
        token,
        user,
      })
    },
    [persistToken],
  )

  const logout = useCallback(() => {
    persistToken(undefined)
    setState({
      isAuthenticated: false,
    })
  }, [persistToken])

  const login = useCallback(
    async (username: string, password: string) => {
      const tokenResponse: TokenResponse = await authService.login({
        username,
        password,
      })
      persistToken(tokenResponse.access_token)
      const profile = await authService.profile()
      setState({
        isAuthenticated: true,
        token: tokenResponse.access_token,
        user: profile,
      })
    },
    [persistToken],
  )

  useEffect(() => {
    const token = localStorage.getItem(env.storageTokenKey)
    if (!token) {
      return
    }

    const bootstrap = async () => {
      try {
        const profile = await authService.profile()
        setState({
          isAuthenticated: true,
          token,
          user: profile,
        })
      } catch (error) {
        logout()
      }
    }

    void bootstrap()
  }, [logout])

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      login,
      logout,
      setAuthenticatedUser,
    }),
    [state, login, logout, setAuthenticatedUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}

