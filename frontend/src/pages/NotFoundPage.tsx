import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-3 fw-bold text-primary mb-3">404</h1>
        <p className="fs-4 text-secondary mb-4">
          La página que buscas no está disponible.
        </p>
        <Link className="btn btn-primary btn-lg" to="/login">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage

