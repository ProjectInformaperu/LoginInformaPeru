import { CFooter } from '@coreui/react'

const MainFooter = () => {
  return (
    <CFooter className="bg-transparent border-0 py-3 text-center">
      <div className="footer-text" style={{ color: '#32508E' }}>
        © {new Date().getFullYear()} InformaPeru. Todos los derechos reservados.
      </div>
    </CFooter>
  )
}

export default MainFooter

