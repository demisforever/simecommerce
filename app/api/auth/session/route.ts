import { type NextRequest, NextResponse } from "next/server"

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
