import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ProkerList from "@/components/proker/ProkerList"
import { articles } from "@/app/data/articles"

export default function ProkerPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProkerList articles={articles} />
      </main>
      <Footer />
    </>
  )
}
