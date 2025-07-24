import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Middleware simplificado que verifica cookies de sesión
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Verificar si existe cookie de sesión de NextAuth
  const sessionToken =
    req.cookies.get("next-auth.session-token")?.value || req.cookies.get("__Secure-next-auth.session-token")?.value

  // Rutas que requieren autenticación
  if (pathname.startsWith("/admin") || pathname.startsWith("/profile")) {
    if (!sessionToken) {
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
