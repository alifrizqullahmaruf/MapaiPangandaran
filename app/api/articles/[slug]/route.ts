import { NextResponse } from "next/server"
import { getArticleBySlug, updateArticle, deleteArticle } from "@/lib/db/articles"

// GET /api/articles/:slug
export async function GET(
  _req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params
  const article = await getArticleBySlug(slug)
  if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(article)
}

// PATCH /api/articles/:slug
export async function PATCH(
  req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params
  const body = await req.json()
  const { error } = await updateArticle(slug, body)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}

// DELETE /api/articles/:slug
export async function DELETE(
  _req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params
  const { error } = await deleteArticle(slug)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
