export const revalidate = 0

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import HeroSection from "@/components/home/HeroSection"
import ArticleHighlights from "@/components/home/ArticleHighlights"
import QuoteSection from "@/components/home/QuoteSection"
import ClusterGrid from "@/components/home/ClusterGrid"
import { getAllArticles } from "@/lib/db/articles"
import { articles as staticArticles } from "@/app/data/articles"
import { clusters } from "@/app/data/clusters"

export default async function HomePage() {
  const dbArticles = await getAllArticles()
  const articles = dbArticles.length > 0 ? dbArticles : staticArticles

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ArticleHighlights articles={articles.slice(0, 4)} />
        <QuoteSection />
        <ClusterGrid clusters={clusters} />
      </main>
      <Footer />
    </>
  )
}
