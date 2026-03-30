import { NextResponse } from "next/server"
import { getAllMembers, createMember } from "@/lib/db/team"
import staticMembers from "@/app/data/data-tim.json"

export async function GET() {
  const dbMembers = await getAllMembers()
  const data = dbMembers.length > 0 ? dbMembers : staticMembers
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { data, error } = await createMember(body)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data, { status: 201 })
}
