import { useMemo } from 'react'

import { CBadge } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'

import { useAuth } from '../context/AuthContext'

const periodDownloads = ['202502', '202503', '202504', '202505', '202506', '202507']

// Configuración base de dashboards
const huancayoDashboard = {
  url: 'https://app.powerbi.com/view?r=eyJrIjoiMjAwYTk2ZGEtZmI5YS00YjU0LThkMzAtZTU5NDYyNTJmMWQxIiwidCI6IjM1OWVmNTQ2LTA4YjMtNGVlMi1iNWQ2LWVjMDNkMTQwOTQyYSIsImMiOjR9',
  title: 'Dashboard Huancayo',
  disableDownloads: true,
}

const proempresaDashboard = {
  url: 'https://app.powerbi.com/view?r=eyJrIjoiZjdjNDg1YWUtYzEwMi00ZGM2LTgzZTgtYmI3YzU3YjIxNGQ1IiwidCI6IjM1OWVmNTQ2LTA4YjMtNGVlMi1iNWQ2LWVjMDNkMTQwOTQyYSIsImMiOjR9',
  title: 'Dashboard Proempresa',
  disableDownloads: true,
}

const specialDashboards: Record<
  string,
  {
    url: string
    title: string
    hideDownloads?: boolean
    disableDownloads?: boolean
  }
> = {
  maynas2025: {
    url: 'https://app.powerbi.com/view?r=eyJrIjoiN2YxM2U4ZDgtNGM4Yi00Mjg5LWJiM2UtODIwMWEwZjRlMjUwIiwidCI6IjM1OWVmNTQ2LTA4YjMtNGVlMi1iNWQ2LWVjMDNkMTQwOTQyYSIsImMiOjR9',
    title: 'Dashboard Maynas',
    disableDownloads: false, // Asegurar que estén habilitadas
  },
  // Huancayo - todas las variantes de usuario
  huancayo: huancayoDashboard,
  huancayo2025: huancayoDashboard,
  'huancayo.2025': huancayoDashboard,
  // Proempresa - todas las variantes de usuario
  proempresa: proempresaDashboard,
  proempresa2025: proempresaDashboard,
}

const defaultDashboard = {
  url: 'https://app.powerbi.com/view?r=eyJrIjoiOWRmNmVjYzktMThmNy00ZmM5LWEwNDUtYTNkZTk3YjkzZGFkIiwidCI6IjM1OWVmNTQ2LTA4YjMtNGVlMi1iNWQ2LWVjMDNkMTQwOTQyYSIsImMiOjR9',
  title: 'Dashboard General',
  hideDownloads: false,
  disableDownloads: false,
}

const DashboardPage = () => {
  const { user } = useAuth()
  const username = user?.username?.toLowerCase() ?? ''
  const dashboardType = user?.dashboard_type?.toLowerCase() ?? ''

  const dashboardConfig = useMemo(() => {
    // Primero verificar si tiene dashboard_type configurado
    if (dashboardType && dashboardType in specialDashboards) {
      return specialDashboards[dashboardType]
    }
    // Fallback a username para compatibilidad con usuarios existentes
    if (username in specialDashboards) {
      return specialDashboards[username]
    }
    return defaultDashboard
  }, [username, dashboardType])

  const handleDownload = (period: string) => {
    console.log(`Descargando reporte para el periodo: ${period}`)

    // Simulación de descarga (puedes reemplazar esto con una llamada real a API)
    // const filename = `reporte_${username}_${period}.xlsx`
    // const downloadUrl = `${import.meta.env.VITE_API_BASE_URL}downloads/report?period=${period}&user=${username}`
    // window.open(downloadUrl, '_blank')

    alert(`Preparando reporte de ${period} para ${username}... En esta versión local, la descarga real está en proceso de implementación.`)
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 mb-4">
        <div>
          <h1 className="dashboard-title mb-1">Dashboard</h1>
          <p className="dashboard-subtitle mb-0 text-secondary">
            Visualiza el rendimiento de tu cartera y accede a tus reportes en tiempo real.
          </p>
        </div>
        <div
          className={`download-buttons d-flex flex-wrap gap-2 ${dashboardConfig.hideDownloads ? 'download-buttons--hidden' : ''
            }`}
        >
          {periodDownloads.map((period) => (
            <button
              type="button"
              className={`download-button ${dashboardConfig.disableDownloads ? 'download-button--disabled' : ''
                }`}
              key={period}
              disabled={dashboardConfig.disableDownloads}
              onClick={() => handleDownload(period)}
            >
              <CIcon icon={cilCloudDownload} className="me-2" />
              {period}
            </button>
          ))}
        </div>
      </header>

      <section className="dashboard-embed card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
            <h2 className="mb-0 fs-5 fw-semibold text-primary">{dashboardConfig.title}</h2>
            <CBadge color="primary" className="px-3 py-2 rounded-pill bg-opacity-10 text-primary">
              Power BI
            </CBadge>
          </div>
          <div className="dashboard-iframe-wrapper">
            <iframe
              key={dashboardConfig.url}
              title={dashboardConfig.title}
              src={dashboardConfig.url}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashboardPage

