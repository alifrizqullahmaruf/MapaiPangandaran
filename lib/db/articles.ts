import { supabase } from "@/lib/supabase"
import { Article } from "@/app/data/articles"

// Map Supabase row → Article shape yang sudah dipakai di seluruh app
function mapRow(row: Record<string, unknown>): Article {
  return {
    slug: row.slug as string,
    title: row.title as string,
    excerpt: row.excerpt as string,
    category: row.category as string,
    village: row.village as "kertayasa" | "batukaras",
    kluster: row.kluster as "SAINTEK" | "SOSHUM" | "AGRO" | "MEDIKA",
    author: {
      nama: row.author_nama as string,
      image: row.author_image as string,
      jabatan: row.author_jabatan as string,
    },
    cover: row.cover as string,
    body: row.body as string[],
    date: row.date as string,
    related: row.related as string[],
  }
}

export async function getAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("date", { ascending: false })

  if (error) {
    console.error("Error fetching articles:", error)
    return []
  }
  return data.map(mapRow)
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !data) return null
  return mapRow(data)
}

export async function getArticlesByVillage(village: string): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("village", village)
    .order("date", { ascending: false })

  if (error) return []
  return data.map(mapRow)
}

export async function createArticle(article: Omit<Article, "related"> & { related?: string[] }) {
  const { data, error } = await supabase.from("articles").insert({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    village: article.village,
    kluster: article.kluster,
    author_nama: article.author.nama,
    author_image: article.author.image,
    author_jabatan: article.author.jabatan,
    cover: article.cover,
    body: article.body,
    date: article.date,
    related: article.related ?? [],
  })
  return { data, error }
}

export async function updateArticle(slug: string, fields: Partial<{
  title: string
  excerpt: string
  category: string
  village: string
  kluster: string
  cover: string
  body: string[]
  date: string
}>) {
  const { data, error } = await supabase
    .from("articles")
    .update(fields)
    .eq("slug", slug)
  return { data, error }
}

export async function deleteArticle(slug: string) {
  const { error } = await supabase.from("articles").delete().eq("slug", slug)
  return { error }
}
