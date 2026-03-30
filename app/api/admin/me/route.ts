import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!)

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value
  if (!token) return NextResponse.json({ admin: false })

  try {
    await jwtVerify(token, JWT_SECRET)
    return NextResponse.json({ admin: true })
  } catch {
    return NextResponse.json({ admin: false })
  }
}
