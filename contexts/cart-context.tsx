"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Product {
  id: string
  name: string
  price: number
  image: string
  description?: string
}

export interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  products: Product[]
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  getCartTotal: () => number
  getCartItemsCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  // Lista de productos disponibles
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Tomógrafo computado multicorte de cuerpo entero",
      price: 105000,
      image: "https://gemed.com.ar/wp-content/uploads/2021/07/Tomografo-Computado-Multicorte-de-Cuerpo-Entero.jpg",
      description: "Equipo médico de alta precisión para diagnóstico por imágenes",
    },
    
    {
      id: "2",
      name: "Mamografo",
      price: 60000,
      image: "https://www.intemed.com.ar/NuevaWeb/wp-content/uploads/2020/04/revelation_3.jpg",
      description: "Reloj inteligente con monitoreo de salud avanzado",
    },
    
    {
      id: "3",
      name: "Mamografo",
      price: 50000,
      image: "https://www.intemed.com.ar/NuevaWeb/wp-content/uploads/2020/04/revelation_1.jpg",
      description: "Reloj inteligente con monitoreo de salud avanzado",
    },
    {
      id: "4",
      name: "Smart Watch Pro",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      description: "Reloj inteligente con monitoreo de salud avanzado",
    },
    {
      id: "5",
      name: "Cargador Portátil 20000mAh",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1609592806596-4d8b5b3c4b3a?w=400&h=400&fit=crop",
      description: "Batería externa de alta capacidad con carga rápida",
    },
    {
      id: "6",
      name: "Auriculares Bluetooth Premium",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      description: "Sonido de alta calidad con cancelación de ruido",
    },
    {
      id: "7",
      name: "Laptop Gaming RGB",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
      description: "Laptop para gaming con iluminación RGB personalizable",
    },
    {
      id: "8",
      name: "Cámara Digital 4K",
      price: 599.99,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
      description: "Cámara profesional con grabación 4K y estabilización",
    },
  ])

  // Estado del carrito
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Agregar producto al carrito
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // Si ya existe, incrementar cantidad
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        // Si no existe, agregar nuevo item
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  // Remover producto del carrito
  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  // Actualizar cantidad
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return

    setCartItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  // Calcular total del carrito
  const getCartTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.08
    return subtotal + tax
  }

  // Contar items en el carrito
  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const value: CartContextType = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemsCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Hook personalizado para usar el contexto
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
