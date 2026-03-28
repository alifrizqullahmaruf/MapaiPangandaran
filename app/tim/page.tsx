import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import TeamGrid from "@/components/tim/TeamGrid"
import dataTim from "@/app/data/data-tim.json"

export default function TimPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <TeamGrid members={dataTim} />
      </main>
      <Footer />
    </>
  )
}
