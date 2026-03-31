import { Outlet } from 'react-router-dom'

import slideOne from '../assets/images/1_IA.webp'
import slideTwo from '../assets/images/2_Ubicacion.webp'
import slideThree from '../assets/images/3_Ahorro.webp'
import slideFour from '../assets/images/4_Portfolio.webp'
import slideFive from '../assets/images/5_Geo.webp'
import slideSix from '../assets/images/6_Cobranza.webp'
import slideSeven from '../assets/images/7_Chatbot.webp'
import slideEight from '../assets/images/8_Telecredito.webp'
import slideNine from '../assets/images/9_wsp.webp'
import LoginSlider from '../components/LoginSlider'

const slides = [
  {
    image: slideOne,
    title: 'Inteligencia artificial',
    description: 'Modelos predictivos que impulsan la toma de decisiones.',
  },
  {
    image: slideTwo,
    title: 'Smart enrichment',
    description: 'Ubicabilidad inteligente para optimizar tus estrategias.',
  },
  {
    image: slideThree,
    title: 'Digitalización de expedientes',
    description: 'Incrementa eficiencia y reduce costos operativos.',
  },
  {
    image: slideFour,
    title: 'Monitor de portafolio',
    description: 'Gestiona cobranzas y negocios con un solo panel.',
  },
  {
    image: slideFive,
    title: 'Geo analytics',
    description: 'Datos geográficos estratégicos listos para actuar.',
  },
  {
    image: slideSix,
    title: 'Cobranza inteligente',
    description: 'Optimiza pagos con flujos automatizados e IA.',
  },
  {
    image: slideSeven,
    title: 'Voice & chat bots',
    description: 'Asistentes virtuales que automatizan la atención.',
  },
  {
    image: slideEight,
    title: 'CreditSmart',
    description: 'Impulsa colocaciones y gestiona tus oportunidades.',
  },
  {
    image: slideNine,
    title: 'SMS & WhatsApp',
    description: 'Comunicación omnicanal con máxima efectividad.',
  },
]

const AuthLayout = () => {
  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <Outlet />
      </div>
      <div className="login-slider-container d-none d-lg-block">
        <LoginSlider slides={slides} />
      </div>
    </div>
  )
}

export default AuthLayout

