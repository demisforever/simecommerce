"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, user } = useAuth()

  const callbackUrl = searchParams.get("callbackUrl") || "/"

  // Si ya está logueado, redirigir
  useEffect(() => {
    if (user) {
      if (user.role === "admin" && callbackUrl.startsWith("/admin")) {
        router.push(callbackUrl)
      } else if (user.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push(callbackUrl === "/admin/dashboard" ? "/" : callbackUrl)
      }
    }
  }, [user, router, callbackUrl])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await login(email, password)

      if (success) {
        // Esperar un poco para que el contexto se actualice
        setTimeout(() => {
          // Verificar el rol del usuario para redirigir correctamente
          const response = fetch("/api/auth/session")
            .then((res) => res.json())
            .then((data) => {
              if (data.user?.role === "admin") {
                if (callbackUrl.startsWith("/admin")) {
                  router.push(callbackUrl)
                } else {
                  router.push("/admin/dashboard")
                }
              } else {
                router.push(callbackUrl === "/admin/dashboard" ? "/" : callbackUrl)
              }
            })
        }, 100)
      } else {
        setError("Credenciales inválidas. Verifica tu email y contraseña.")
      }
    } catch (error) {
      setError("Error al iniciar sesión. Intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  // Función para llenar credenciales de prueba
  const fillTestCredentials = (type: "admin" | "user") => {
    if (type === "admin") {
      setEmail("admin@simecommerce.com")
      setPassword("admin123")
    } else {
      setEmail("user@example.com")
      setPassword("user123")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sim-SmWeHnjTFeofcPKp765250avM3ZAUa.jpeg"
            alt="SIM Logo"
            className="mx-auto h-16 w-16"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Iniciar Sesión</h2>
          <p className="mt-2 text-sm text-gray-600">Accede a tu cuenta de SimEcommerce</p>
          {callbackUrl !== "/" && (
            <p className="mt-1 text-xs text-blue-600">Necesitas iniciar sesión para acceder a esta página</p>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bienvenido</CardTitle>
            <CardDescription>Ingresa tus credenciales para continuar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@simecommerce.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>

            {/* Credenciales de demo con botones */}
            <div className="bg-blue-50 p-4 rounded-lg mt-6">
              <h4 className="font-medium text-blue-900 mb-3">Credenciales de Demo:</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-blue-800">
                    <strong>Admin:</strong> admin@simecommerce.com / admin123
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fillTestCredentials("admin")}
                    className="text-xs"
                  >
                    Usar
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-blue-800">
                    <strong>Cliente:</strong> user@example.com / user123
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fillTestCredentials("user")}
                    className="text-xs"
                  >
                    Usar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-500">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
