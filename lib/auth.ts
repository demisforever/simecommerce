import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"

// Simulamos una base de datos de usuarios (en producción usarías una DB real)
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

export const authOptions = {
  providers: [
    // Proveedor de Google para clientes
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    // Proveedor de credenciales para admins
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = users.find((u) => u.email === credentials.email)

        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user) {
        token.role = user.role || "customer"

        // Si es login con Google, asignar rol de customer por defecto
        if (account?.provider === "google") {
          token.role = "customer"
        }
      }
      return token
    },

    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },

    async signIn({ user, account, profile }: any) {
      // Permitir login con Google solo para clientes
      if (account?.provider === "google") {
        return true
      }

      // Permitir login con credenciales
      if (account?.provider === "credentials") {
        return true
      }

      return false
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt" as const,
  },

  secret: process.env.NEXTAUTH_SECRET,
}
