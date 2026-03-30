import { NextResponse } from "next/server"
import { SignJWT } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!)

export async function POST(req: Request) {
  const { username, password } = await req.json()

  const validUsername = username === process.env.ADMIN_USERNAME
  const validPassword = password === process.env.ADMIN_PASSWORD

  if (!validUsername || !validPassword) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const token = await new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h")
    .sign(JWT_SECRET)

  const res = NextResponse.json({ ok: true })
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 jam
    path: "/",
  })
  return res
}
