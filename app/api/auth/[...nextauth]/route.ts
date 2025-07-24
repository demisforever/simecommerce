import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// Simulamos una base de datos de usuarios
const users = [
  {
    id: "1",
    email: "admin@simecommerce.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qK", // "admin123"
    name: "Administrador SIM",
    role: "admin",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qK", // "user123"
    name: "Usuario Demo",
    role: "customer",
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña requeridos" }, { status: 400 })
    }

    const user = users.find((u) => u.email === email)

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 })
    }

    // Crear token simple (en producción usarías JWT)
    const token = Buffer.from(
      JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }),
    ).toString("base64")

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })

    // Establecer cookie de sesión
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ user: null })
    }

    const userData = JSON.parse(Buffer.from(token, "base64").toString())
    return NextResponse.json({ user: userData })
  } catch (error) {
    return NextResponse.json({ user: null })
  }
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ message: "Sesión cerrada" })
  response.cookies.delete("auth-token")
  return response
}
