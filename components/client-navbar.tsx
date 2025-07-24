"use client"

import dynamic from "next/dynamic"

// Cargar el Navbar dinámicamente para evitar problemas de hidratación
const Navbar = dynamic(() => import("./navbar"), {
  ssr: false,
  loading: () => (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sim-SmWeHnjTFeofcPKp765250avM3ZAUa.jpeg"
                alt="SIM Logo"
                className="h-12 w-12 object-contain"
              />
              <span className="ml-3 text-xl font-semibold text-gray-800">SimEcommerce</span>
            </div>
          </div>
          <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
        </div>
      </div>
    </nav>
  ),
})

export default function ClientNavbar() {
  return <Navbar />
}
