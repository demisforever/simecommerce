import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ message: "Sesión cerrada" })
  response.cookies.delete("auth-token")
  return response
}
