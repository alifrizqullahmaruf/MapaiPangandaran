import { notFound } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ArticleHeader from "@/components/artikel/ArticleHeader"
import ArticleBody from "@/components/artikel/ArticleBody"
import RelatedArticles from "@/components/artikel/RelatedArticles"
import { articles, getArticleBySlug, getRelatedArticles } from "@/app/data/articles"

// Next.js 16: params is a Promise — must be awaited
export default async function ArticlePage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const article = getArticleBySlug(slug)

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
  return articles.map((a) => ({ slug: a.slug }))
}
