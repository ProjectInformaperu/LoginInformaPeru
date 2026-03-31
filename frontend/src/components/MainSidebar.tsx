import { NavLink } from 'react-router-dom'

import {
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer } from '@coreui/icons'

import logo from '../assets/images/logo.png'
import iconCollapsed from '../assets/images/icono.jpg'

type MainSidebarProps = {
  collapsed: boolean
}

const MainSidebar = ({ collapsed }: MainSidebarProps) => {
  return (
    <CSidebar
      className={`main-sidebar border-end ${collapsed ? 'collapsed' : ''}`}
      colorScheme="light"
      narrow={collapsed}
    >
      <CSidebarHeader className="border-bottom d-flex align-items-center justify-content-center">
        <CSidebarBrand className="sidebar-brand m-0 p-0">
          <img
            src={collapsed ? iconCollapsed : logo}
            alt="Informa Perú"
            className="sidebar-logo"
          />
        </CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav className="py-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `nav-link px-3 py-2 d-flex align-items-center rounded-3 ${isActive ? 'active' : ''}`
          }
        >
          <CIcon icon={cilSpeedometer} size="lg" className="me-2 text-primary" />
          <span className="nav-label">Dashboard</span>
        </NavLink>
      </CSidebarNav>
    </CSidebar>
  )
}

export default MainSidebar

