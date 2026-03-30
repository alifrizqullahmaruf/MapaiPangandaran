import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ProkerList from "@/components/proker/ProkerList"
import { getAllArticles } from "@/lib/db/articles"
import { articles as staticArticles } from "@/app/data/articles"

export default async function ProkerPage() {
  // Coba fetch dari Supabase, fallback ke data statis jika gagal
  const dbArticles = await getAllArticles()
  const data = dbArticles.length > 0 ? dbArticles : staticArticles

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProkerList articles={data} />
      </main>
      <Footer />
    </>
  )
}
