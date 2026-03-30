import { notFound } from "next/navigation"
import { getMemberById } from "@/lib/db/team"
import MemberForm from "@/components/admin/MemberForm"

export default async function EditMemberPage(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params
  const member = await getMemberById(id)
  if (!member) notFound()

  return <MemberForm member={member} mode="edit" />
}
