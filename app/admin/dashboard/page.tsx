"use client"

import { AdminGuard } from "@/components/admin-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Package, ShoppingCart, TrendingUp, Settings, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function AdminDashboard() {
  const { user } = useAuth()

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="text-gray-600">Bienvenido {user?.name}, al panel de control de SimEcommerce</p>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground">+2 desde el mes pasado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pedidos Totales</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">+8 nuevos este mes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventas</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,450</div>
                <p className="text-xs text-muted-foreground">+15% desde el mes pasado</p>
              </CardContent>
            </Card>
          </div>

          {/* Acciones rápidas */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Productos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/admin/products">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                    <div>
                      <h3 className="font-medium">Ver Todos los Productos</h3>
                      <p className="text-sm text-gray-600">Gestionar inventario y precios</p>
                    </div>
                    <Eye className="h-8 w-8 text-blue-600" />
                  </div>
                </Link>

                <Link href="/admin/products/new">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                    <div>
                      <h3 className="font-medium">Agregar Producto</h3>
                      <p className="text-sm text-gray-600">Crear nuevo producto</p>
                    </div>
                    <Package className="h-8 w-8 text-green-600" />
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gestión de Pedidos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/admin/orders">
                  <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer">
                    <div>
                      <h3 className="font-medium">Ver Pedidos</h3>
                      <p className="text-sm text-gray-600">Revisar y actualizar estados</p>
                    </div>
                    <ShoppingCart className="h-8 w-8 text-orange-600" />
                  </div>
                </Link>

                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Configuración</h3>
                    <p className="text-sm text-gray-600">Ajustes del sistema</p>
                  </div>
                  <Settings className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actividad Reciente */}
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nuevo pedido #1234</p>
                    <p className="text-xs text-gray-500">Tomógrafo computado - $129.99</p>
                    <p className="text-xs text-gray-400">Hace 2 horas</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver
                  </Button>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Producto actualizado</p>
                    <p className="text-xs text-gray-500">Smart Watch Pro - Precio modificado</p>
                    <p className="text-xs text-gray-400">Hace 4 horas</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver
                  </Button>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Usuario registrado</p>
                    <p className="text-xs text-gray-500">Nuevo cliente: juan@email.com</p>
                    <p className="text-xs text-gray-400">Hace 6 horas</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminGuard>
  )
}
