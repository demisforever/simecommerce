"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { getCartItemsCount } = useCart()
  const cartItemsCount = getCartItemsCount()

  const navigationItems = [
    { name: "Inicio", href: "/" },
    { name: "Productos", href: "/products" },
    { name: "Categorías", href: "/categories" },
    { name: "Ofertas", href: "/deals" },
    { name: "Contacto", href: "/contact" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Buscando:", searchQuery)
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sim-SmWeHnjTFeofcPKp765250avM3ZAUa.jpeg"
                alt="SIM Logo"
                className="h-12 w-12 object-contain"
              />
              <span className="ml-3 text-xl font-semibold text-gray-800">SimEcommerce</span>
            </Link>
          </div>

          {/* Barra de búsqueda - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button type="submit" size="sm" className="absolute right-1 top-1 bottom-1 px-3">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* Navegación Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* Iconos de usuario y carrito */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>

              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs"
                    >
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden flex items-center space-x-2">
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Barra de búsqueda móvil */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2"
              />
              <Button type="submit" size="sm" className="absolute right-1 top-1 bottom-1 px-3">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-2">
                <Link
                  href="/profile"
                  className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-2" />
                  Mi Cuenta
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
