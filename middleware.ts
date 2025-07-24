import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Middleware que verifica la autenticación personalizada
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Verificar si existe nuestra cookie de sesión personalizada
  const authToken = req.cookies.get("auth-token")?.value

  // Rutas que requieren autenticación
  if (pathname.startsWith("/admin") || pathname.startsWith("/profile")) {
    if (!authToken) {
      const signInUrl = new URL("/auth/signin", req.url)
      signInUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(signInUrl)
    }

    // Verificar si el token es válido y obtener el rol del usuario
    try {
      const userData = JSON.parse(Buffer.from(authToken, "base64").toString())

      // Si es una ruta de admin, verificar que sea admin
      if (pathname.startsWith("/admin") && userData.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url))
      }
    } catch (error) {
      // Token inválido, redirigir al login
      const signInUrl = new URL("/auth/signin", req.url)
      signInUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(signInUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
}
