import { Article } from "@/app/data/articles"
import ArticleCard from "@/components/ui/ArticleCard"
import SectionTitle from "@/components/ui/SectionTitle"

interface RelatedArticlesProps {
  articles: Article[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null

  return (
    <section className="py-16 bg-surface border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <SectionTitle title="Artikel Terkait" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <div
              key={article.slug}
              className="bg-background rounded-2xl border border-border p-4 hover:border-primary/40 transition-colors"
            >
              <ArticleCard article={article} size="small" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
