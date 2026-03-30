import { notFound } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ArticleHeader from "@/components/artikel/ArticleHeader"
import ArticleBody from "@/components/artikel/ArticleBody"
import RelatedArticles from "@/components/artikel/RelatedArticles"
import { getArticleBySlug, getAllArticles } from "@/lib/db/articles"
import {
  articles as staticArticles,
  getArticleBySlug as getStaticArticle,
  getRelatedArticles,
} from "@/app/data/articles"

export default async function ArticlePage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params

  // Coba Supabase dulu, fallback ke data statis
  const article = (await getArticleBySlug(slug)) ?? getStaticArticle(slug)
  if (!article) notFound()

  const related = getRelatedArticles(article.related)

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background">
        <ArticleHeader article={article} />
        <ArticleBody article={article} />
        <RelatedArticles articles={related} />
      </main>
      <Footer />
    </>
  )
}

export async function generateStaticParams() {
  const dbArticles = await getAllArticles()
  const slugs = dbArticles.length > 0
    ? dbArticles.map((a) => ({ slug: a.slug }))
    : staticArticles.map((a) => ({ slug: a.slug }))
  return slugs
}
