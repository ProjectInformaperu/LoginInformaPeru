import type { FormEvent, ChangeEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import logo from '../assets/images/logo_informa.png'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const redirectPath = useMemo(() => {
    const state = location.state as { from?: { pathname: string } } | undefined
    return state?.from?.pathname ?? '/dashboard'
  }, [location.state])

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true })
    }
  }, [isAuthenticated, navigate, redirectPath])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(null)
    setIsSubmitting(true)

    try {
      await login(formValues.username, formValues.password)
      navigate(redirectPath, { replace: true })
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('No se pudo iniciar sesión. Verifique sus credenciales.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formValues.username.trim() !== '' && formValues.password.trim() !== ''

  return (
    <CCard className="auth-card border-0 rounded-4 bg-white bg-opacity-95 w-100">
      <CCardHeader className="bg-white border-0 pb-0 text-center text-md-start">
        <img src={logo} alt="InformaPeru" className="login-logo mb-3" />
        <h1 className="fw-bold" style={{ color: '#32508E' }}>
          Somos tu mejor aliado en desarrollo
        </h1>
        <p className="text-muted fs-6">
          Inicia sesión con tus credenciales para acceder al panel de soluciones inteligentes.
        </p>
      </CCardHeader>
      <CCardBody className="px-4 pb-4">
        <CForm className="mt-3" onSubmit={handleSubmit}>
          <CRow className="g-3">
            {errorMessage && (
              <CCol xs={12}>
                <CAlert color="danger" className="mb-2">
                  {errorMessage}
                </CAlert>
              </CCol>
            )}
            <CCol xs={12}>
              <CFormLabel htmlFor="username" className="fw-semibold">
                Usuario
              </CFormLabel>
              <CInputGroup size="lg">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  id="username"
                  name="username"
                  placeholder="Ingrese su nombre de usuario"
                  required
                  autoComplete="username"
                  value={formValues.username}
                  onChange={handleChange}
                />
              </CInputGroup>
            </CCol>
            <CCol xs={12}>
              <CFormLabel htmlFor="password" className="fw-semibold">
                Contraseña
              </CFormLabel>
              <CInputGroup size="lg">
                <CInputGroupText>
                  <CIcon icon={cilLockLocked} />
                </CInputGroupText>
                <CFormInput
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  required
                  autoComplete="current-password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </CInputGroup>
            </CCol>
            <CCol xs={12} className="text-end">
              <a className="small text-primary fw-semibold" href="#recuperar">
                ¿Problemas para ingresar?
              </a>
            </CCol>
            <CCol xs={12}>
              <CButton
                color="primary"
                size="lg"
                className="w-100 py-3 fw-semibold"
                type="submit"
                disabled={isSubmitting || !isFormValid}
              >
                {isSubmitting ? 'Validando...' : 'INGRESAR'}
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default LoginPage

