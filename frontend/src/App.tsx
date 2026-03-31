import { RouterProvider } from 'react-router-dom'
import { useEffect } from 'react'

import '@coreui/coreui/dist/css/coreui.min.css'
import './styles/global.scss'

import { AuthProvider } from './context/AuthContext'
import router from './routes'
import { warmupBackend } from './services/health'

const App = () => {
  useEffect(() => {
    // Ping al backend para evitar cold start al primer login
    warmupBackend()
  }, [])

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
