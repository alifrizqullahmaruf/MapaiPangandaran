"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { Article } from "@/app/data/articles"

interface ArticleBodyProps {
  article: Article
}

export default function ArticleBody({ article }: ArticleBodyProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Cover image */}
      <motion.div
        className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-10"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <Image
          src={article.cover}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </motion.div>

      {/* Body paragraphs */}
      <div className="space-y-6">
        {article.body.map((paragraph, i) => (
          <motion.p
            key={i}
            className="text-text text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.06, ease: "easeOut" }}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </div>
  )
}
