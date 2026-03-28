import Image from "next/image"
import { Article } from "@/app/data/articles"

interface ArticleBodyProps {
  article: Article
}

export default function ArticleBody({ article }: ArticleBodyProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Cover image */}
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
        <Image
          src={article.cover}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </div>

      {/* Body paragraphs */}
      <div className="space-y-6">
        {article.body.map((paragraph, i) => (
          <p key={i} className="text-text text-base md:text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}
