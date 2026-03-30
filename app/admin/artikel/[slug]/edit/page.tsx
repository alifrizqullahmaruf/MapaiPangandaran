import { notFound } from "next/navigation"
import { getArticleBySlug } from "@/lib/db/articles"
import { getArticleBySlug as getStaticArticle } from "@/app/data/articles"
import ArticleForm from "@/components/admin/ArticleForm"

export default async function EditArticlePage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const article = (await getArticleBySlug(slug)) ?? getStaticArticle(slug)
  if (!article) notFound()

  return <ArticleForm article={article} mode="edit" />
}
