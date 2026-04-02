export const revalidate = 0

import { notFound } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import MemberDetail from "@/components/tim/MemberDetail"
import { getMemberByNama } from "@/lib/db/team"
import { getArticlesByAuthor } from "@/lib/db/articles"

interface Props {
  params: Promise<{ nama: string }>
}

export default async function MemberDetailPage(props: Props) {
  const { nama } = await props.params
  const decoded = decodeURIComponent(nama)

  const [member, articles] = await Promise.all([
    getMemberByNama(decoded),
    getArticlesByAuthor(decoded),
  ])

  if (!member) notFound()

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <MemberDetail member={member} articles={articles} />
      </main>
      <Footer />
    </>
  )
}
