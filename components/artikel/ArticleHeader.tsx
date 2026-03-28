import Image from "next/image"
import Link from "next/link"
import { Article } from "@/app/data/articles"

interface ArticleHeaderProps {
  article: Article
}

const villageLabel: Record<string, string> = {
  kertayasa: "Desa Kertayasa",
  batukaras: "Desa Batukaras",
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-primary text-white text-sm font-medium px-5 py-2 hover:bg-primary/90 transition-colors mb-8"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 4L6 8l4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Kembali
      </Link>

      {/* Category & cluster badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-xs font-medium border border-primary text-primary rounded-full px-3 py-1">
          {article.category}
        </span>
        <span className="text-xs font-medium border border-secondary text-secondary rounded-full px-3 py-1">
          {article.kluster}
        </span>
        <span className="text-xs font-medium bg-secondary/10 text-primary rounded-full px-3 py-1">
          {villageLabel[article.village]}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-text leading-tight mb-6">
        {article.title}
      </h1>

      {/* Author */}
      <div className="flex items-center gap-3 pb-8 border-b border-border">
        <div className="relative w-11 h-11 flex-shrink-0">
          <Image
            src={article.author.image}
            alt={article.author.nama}
            fill
            className="object-cover rounded-full"
            sizes="44px"
          />
        </div>
        <div>
          <p className="font-semibold text-text text-sm">{article.author.nama}</p>
          <p className="text-muted text-xs">
            {article.author.jabatan} · {villageLabel[article.village]}
          </p>
        </div>
        <span className="ml-auto text-muted text-xs">
          {new Date(article.date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  )
}
