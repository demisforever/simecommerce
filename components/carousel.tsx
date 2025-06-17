"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CarouselSlide {
  id: string
  title: string
  subtitle: string
  image: string
  buttonText: string
  buttonLink: string
  backgroundColor: string
}

const slides: CarouselSlide[] = [
  {
    id: "1",
    title: "¡Ofertas Especiales!",
    subtitle: "Lorad M III - Equipos de mamografía de alta precisión con descuentos únicos",  
    image: "https://fisikamedika.com/wp-content/uploads/2024/04/sala-maquinas-tomografia-computarizada-alto-angulo-cover.jpg",
    buttonText: "Ver Ofertas",
    buttonLink: "/deals",
    backgroundColor: "from-red-500 to-pink-600",
  },
  {
    id: "2",
    title: "Tecnología Siemens",
    subtitle: "Mammomat - La última tecnología en diagnóstico por imágenes mamarias",    
    image: "https://www.intemed.com.ar/NuevaWeb/wp-content/uploads/2020/04/revelation_3.jpg",
    buttonText: "Explorar Siemens",
    buttonLink: "/products",
    backgroundColor: "from-blue-600 to-purple-600",
  },
  {
    id: "3",
    title: "Equipos Médicos Profesionales",
    subtitle: "Instrumentos de alta precisión para el sector salud y diagnóstico",
    image: "https://www.somatechnology.com/spanish/wp-content/uploads/sites/2/2016/07/philips_bv_212_c_arm.jpg",
    buttonText: "Ver Equipos",
    buttonLink: "/medical",
    backgroundColor: "from-green-500 to-teal-600",
  },
  {
    id: "4",
    title: "Envío Especializado",
    subtitle: "Tomógrafos - Logìstica, eistalación y envío en equipos de tomografía computada",
    image: "https://coloniamultimedia.uy/wp-content/uploads/2024/07/tomografo-3.jpg",
    buttonText: "Ver Tomógrafos",
    buttonLink: "/products",
    backgroundColor: "from-orange-500 to-yellow-500",
  },
]

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play del carrusel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Cambia cada 5 segundos

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const currentSlideData = slides[currentSlide]

  return (
    <div
      className="relative h-[500px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slide actual */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${currentSlideData.backgroundColor} transition-all duration-500`}
      >
        <div className="relative h-full flex items-center">
          {/* Imagen de fondo */}
          <div className="absolute inset-0 opacity-20">
            <img
              src={currentSlideData.image || "/placeholder.svg"}
              alt={currentSlideData.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contenido del slide */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Texto */}
              <div className="text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">{currentSlideData.title}</h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in-delay">
                  {currentSlideData.subtitle}
                </p>
                <Link href={currentSlideData.buttonLink}>
                  <Button size="lg" variant="secondary" className="animate-fade-in-delay-2">
                    {currentSlideData.buttonText}
                  </Button>
                </Link>
              </div>

              {/* Imagen principal */}
              <div className="hidden md:block">
                <div className="relative">
                  <img
                    src={currentSlideData.image || "/placeholder.svg"}
                    alt={currentSlideData.title}
                    className="w-full h-80 object-cover rounded-lg shadow-2xl animate-slide-in"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de navegación */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-20"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-20"
        onClick={goToNext}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Indicadores de puntos */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Barra de progreso */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{
            width: isAutoPlaying ? `${((currentSlide + 1) / slides.length) * 100}%` : "0%",
          }}
        />
      </div>
    </div>
  )
}
