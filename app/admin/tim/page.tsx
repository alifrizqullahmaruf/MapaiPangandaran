import { getAllMembers } from "@/lib/db/team"
import AdminTimDashboard from "@/components/admin/AdminTimDashboard"
import staticMembers from "@/app/data/data-tim.json"

export default async function AdminTimPage() {
  const dbMembers = await getAllMembers()
  const data = dbMembers.length > 0 ? dbMembers : staticMembers
  return <AdminTimDashboard members={data} />
}
