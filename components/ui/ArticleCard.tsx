import Image from "next/image"
import Link from "next/link"
import { Article } from "@/app/data/articles"

interface ArticleCardProps {
  article: Article
  size: "large" | "small"
}

const villageLabel: Record<string, string> = {
  kertayasa: "Kertayasa",
  batukaras: "Batukaras",
}

export default function ArticleCard({ article, size }: ArticleCardProps) {
  if (size === "large") {
    return (
      <Link href={`/artikel/${article.slug}`} className="block group relative rounded-2xl overflow-hidden h-full min-h-[420px]">
        <Image
          src={article.cover}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium border border-secondary text-secondary rounded-full px-3 py-1">
              {article.category}
            </span>
            <span className="text-xs font-medium bg-secondary/20 text-secondary rounded-full px-3 py-1">
              {villageLabel[article.village]}
            </span>
          </div>
          <h3 className="text-xl font-bold leading-snug line-clamp-3">{article.title}</h3>
          <p className="text-sm text-white/70 mt-2 line-clamp-2">{article.excerpt}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/artikel/${article.slug}`} className="flex gap-3 group">
      <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
        <Image
          src={article.cover}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="96px"
        />
      </div>
      <div className="flex flex-col justify-center gap-1 min-w-0">
        <span className="text-xs font-medium text-primary">{article.category}</span>
        <h3 className="text-sm font-semibold text-text leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <span className="text-xs text-muted bg-secondary/10 rounded-full px-2 py-0.5 self-start">
          {villageLabel[article.village]}
        </span>
      </div>
    </Link>
  )
}
