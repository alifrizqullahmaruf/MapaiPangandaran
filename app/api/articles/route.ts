import { NextResponse } from "next/server"
import { getAllArticles, createArticle } from "@/lib/db/articles"

// GET /api/articles
export async function GET() {
  const articles = await getAllArticles()
  return NextResponse.json(articles)
}

// POST /api/articles
export async function POST(req: Request) {
  const body = await req.json()
  const { data, error } = await createArticle(body)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  return NextResponse.json(data, { status: 201 })
}
