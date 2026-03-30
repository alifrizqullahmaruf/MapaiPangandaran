import { NextResponse } from "next/server"
import { getMemberById, updateMember, deleteMember } from "@/lib/db/team"

export async function GET(
  _req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params
  const member = await getMemberById(id)
  if (!member) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(member)
}

export async function PATCH(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params
  const body = await req.json()
  const { error } = await updateMember(id, body)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}

export async function DELETE(
  _req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params
  const { error } = await deleteMember(id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
