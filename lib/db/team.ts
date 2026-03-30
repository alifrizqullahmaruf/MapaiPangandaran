import { supabase } from "@/lib/supabase"

export interface TeamMember {
  id?: string
  Nama: string
  Kluster: string
  Fakultas: string
  Prodi: string
  Divisi: string
  Jabatan: string
  Instagram: string
  Image: string
  Angkatan?: string
}

function mapRow(row: Record<string, unknown>): TeamMember {
  return {
    id: row.id as string,
    Nama: row.nama as string,
    Kluster: row.kluster as string,
    Fakultas: row.fakultas as string,
    Prodi: row.prodi as string,
    Divisi: row.divisi as string,
    Jabatan: row.jabatan as string,
    Instagram: row.instagram as string,
    Image: row.image as string,
    Angkatan: row.angkatan as string,
  }
}

export async function getAllMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("nama")

  if (error) {
    console.error("Error fetching team members:", error)
    return []
  }
  return data.map(mapRow)
}

export async function getMemberById(id: string): Promise<TeamMember | null> {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !data) return null
  return mapRow(data)
}

export async function createMember(member: Omit<TeamMember, "id">) {
  const { data, error } = await supabase.from("team_members").insert({
    nama: member.Nama,
    kluster: member.Kluster,
    fakultas: member.Fakultas,
    prodi: member.Prodi,
    divisi: member.Divisi,
    jabatan: member.Jabatan,
    instagram: member.Instagram,
    image: member.Image,
    angkatan: member.Angkatan ?? "2022",
  }).select().single()
  return { data: data ? mapRow(data) : null, error }
}

export async function updateMember(id: string, fields: Partial<{
  nama: string
  kluster: string
  fakultas: string
  prodi: string
  divisi: string
  jabatan: string
  instagram: string
  image: string
  angkatan: string
}>) {
  const { error } = await supabase
    .from("team_members")
    .update(fields)
    .eq("id", id)
  return { error }
}

export async function deleteMember(id: string) {
  const { error } = await supabase.from("team_members").delete().eq("id", id)
  return { error }
}
