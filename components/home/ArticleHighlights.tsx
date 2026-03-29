import Link from "next/link"
import { Article } from "@/app/data/articles"
import ArticleCard from "@/components/ui/ArticleCard"
import SectionTitle from "@/components/ui/SectionTitle"

interface ArticleHighlightsProps {
  articles: Article[]
}

export default function ArticleHighlights({ articles }: ArticleHighlightsProps) {
  const [featured, ...rest] = articles

  return (
    <section id="proker" className="py-20 bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-10 gap-4 flex-wrap">
          <SectionTitle title="Dari Mapai Pangandaran" />
          <Link
            href="/proker"
            className="flex-shrink-0 rounded-full border border-primary text-primary text-sm font-medium px-5 py-2 hover:bg-primary hover:text-white transition-colors"
          >
            Lihat Selengkapnya
          </Link>
        </div>

        {/* Grid: 1 large + 3 small */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Featured large card */}
          {featured && (
            <div className="md:col-span-3">
              <ArticleCard article={featured} size="large" />
            </div>
          )}

          {/* 3 small cards stacked */}
          <div className="md:col-span-2 flex flex-col gap-4 justify-between">
            {rest.slice(0, 3).map((article) => (
              <div key={article.slug} className="bg-surface rounded-2xl border border-border p-4 hover:border-primary/40 transition-colors">
                <ArticleCard article={article} size="small" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
