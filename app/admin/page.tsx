export const revalidate = 0

import { getAllArticles } from "@/lib/db/articles"
import AdminDashboard from "@/components/admin/AdminDashboard"

export default async function AdminPage() {
  const articles = await getAllArticles()
  return <AdminDashboard articles={articles} />
}
