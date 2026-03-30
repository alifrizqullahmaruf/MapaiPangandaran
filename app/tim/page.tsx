export const revalidate = 0

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import TeamGrid from "@/components/tim/TeamGrid"
import { getAllMembers } from "@/lib/db/team"
import staticMembers from "@/app/data/data-tim.json"

export default async function TimPage() {
  const dbMembers = await getAllMembers()
  const data = dbMembers.length > 0 ? dbMembers : staticMembers

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <TeamGrid members={data} />
      </main>
      <Footer />
    </>
  )
}
