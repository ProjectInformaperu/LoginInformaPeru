import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import MainFooter from '../components/MainFooter'
import MainHeader from '../components/MainHeader'
import MainSidebar from '../components/MainSidebar'

const MainLayout = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div
      className={`app-shell d-flex min-vh-100 bg-light ${
        isSidebarCollapsed ? 'sidebar-collapsed' : ''
      }`}
    >
      <MainSidebar collapsed={isSidebarCollapsed} />
      <div className="flex-grow-1 d-flex flex-column main-content">
        <MainHeader onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)} />
        <div className="main-content-body flex-grow-1">
          <Outlet />
        </div>
        <MainFooter />
      </div>
    </div>
  )
}

export default MainLayout

