import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import {
  CButton,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
} from '@coreui/react'

import { useAuth } from '../context/AuthContext'

type MainHeaderProps = {
  onToggleSidebar: () => void
}

const MainHeader = ({ onToggleSidebar }: MainHeaderProps) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    logout()
    navigate('/login', { replace: true })
  }, [logout, navigate])

  return (
    <CHeader className="bg-white shadow-sm py-2 px-3 align-items-center">
      <CHeaderToggler
        className="me-3"
        onClick={onToggleSidebar}
        aria-label="Contraer menú lateral"
      >
        <CIcon icon={cilMenu} size="lg" />
      </CHeaderToggler>
      <CHeaderNav className="ms-auto d-flex align-items-center gap-3">
        <CNavItem className="d-none d-md-block text-end">
          <div className="small text-secondary">Bienvenido</div>
          <div className="fw-semibold">
            {user?.full_name ?? user?.username ?? 'Usuario'}
          </div>
        </CNavItem>
        {/* Avatar temporalmente deshabilitado
        <CAvatar src={avatarPlaceholder} size="md" />
        */}
        <CButton color="primary" variant="outline" onClick={handleLogout}>
          Cerrar sesión
        </CButton>
      </CHeaderNav>
    </CHeader>
  )
}

export default MainHeader

