import { useEffect, useMemo, useState } from 'react'

import { CBadge } from '@coreui/react'

type Slide = {
  image: string
  title: string
  description: string
}

type LoginSliderProps = {
  slides: Slide[]
  interval?: number
}

const LoginSlider = ({ slides, interval = 2000 }: LoginSliderProps) => {
  const normalizedSlides = useMemo(() => (slides.length > 0 ? slides : []), [slides])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!normalizedSlides.length) {
      return
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % normalizedSlides.length)
    }, interval)

    return () => window.clearInterval(timer)
  }, [normalizedSlides, interval])

  if (!normalizedSlides.length) {
    return null
  }

  return (
    <div className="login-slider">
      <div className="login-slider__track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {normalizedSlides.map((slide) => (
          <div
            key={slide.title}
            className="login-slider__slide"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>
      <div className="login-slider__overlay" />
      <div className="login-slider__content text-white text-center">
        <CBadge color="light" className="px-3 py-2 fw-semibold text-uppercase text-primary mb-3">
          Soluciones InformaPeru
        </CBadge>
        <h2 className="display-6 fw-bold text-uppercase mb-2">
          {normalizedSlides[activeIndex]?.title}
        </h2>
        <p className="fs-5 mb-0">{normalizedSlides[activeIndex]?.description}</p>
      </div>
    </div>
  )
}

export default LoginSlider

