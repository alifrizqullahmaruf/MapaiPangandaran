import { notFound } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import VillageHero from "@/components/desa/VillageHero"
import VillageDescription from "@/components/desa/VillageDescription"
import VillageTerritory from "@/components/desa/VillageTerritory"
import VillageOfficials from "@/components/desa/VillageOfficials"
import VillageHighlights from "@/components/desa/VillageHighlights"
import ProkerGrid from "@/components/desa/ProkerGrid"
import { getVillage } from "@/app/data/villages"
import { articles } from "@/app/data/articles"

export default function BatukarasPage() {
  const village = getVillage("batukaras")
  if (!village) notFound()

  const prokerArticles = village.prokerSlugs
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => a !== undefined)

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <VillageHero village={village} />
        <VillageDescription village={village} />
        <VillageTerritory village={village} />
        <VillageOfficials village={village} />
        <VillageHighlights village={village} />
        <ProkerGrid articles={prokerArticles} />
      </main>
      <Footer />
    </>
  )
}
