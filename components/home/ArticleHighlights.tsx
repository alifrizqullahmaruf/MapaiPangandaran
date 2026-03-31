"use client"

import Link from "next/link"
import { motion } from "motion/react"
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
        <motion.div
          className="flex items-start justify-between mb-10 gap-4 flex-wrap"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <SectionTitle title="Dari Mapai Pangandaran" />
          <Link
            href="/proker"
            className="shrink-0 rounded-full border border-primary text-primary text-sm font-medium px-5 py-2 hover:bg-primary hover:text-white transition-colors"
          >
            Lihat Selengkapnya
          </Link>
        </motion.div>

        {/* Grid: 1 large + 3 small */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Featured large card */}
          {featured && (
            <motion.div
              className="md:col-span-3"
              initial={{ opacity: 0, x: -32, scale: 0.97 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <ArticleCard article={featured} size="large" />
            </motion.div>
          )}

          {/* 3 small cards stacked */}
          <div className="md:col-span-2 flex flex-col gap-4 justify-between">
            {rest.slice(0, 3).map((article, i) => (
              <motion.div
                key={article.slug}
                className="bg-surface rounded-2xl border border-border p-4 hover:border-primary/40 transition-colors"
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 + i * 0.1 }}
              >
                <ArticleCard article={article} size="small" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
