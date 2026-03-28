import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import HeroSection from "@/components/home/HeroSection"
import ArticleHighlights from "@/components/home/ArticleHighlights"
import QuoteSection from "@/components/home/QuoteSection"
import ClusterGrid from "@/components/home/ClusterGrid"
import { articles } from "@/app/data/articles"
import { clusters } from "@/app/data/clusters"

export default function HomePage() {
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
