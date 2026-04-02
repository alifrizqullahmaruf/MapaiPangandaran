"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { TeamMember } from "@/lib/db/team"
import DeleteModal from "@/components/admin/DeleteModal"

const KLUSTER_COLOR: Record<string, string> = {
  SAINTEK: "bg-blue-100 text-blue-700",
  SOSHUM: "bg-green-100 text-green-700",
  AGRO: "bg-yellow-100 text-yellow-700",
  MEDIKA: "bg-red-100 text-red-700",
}

export default function AdminTimDashboard({ members }: { members: TeamMember[] }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  const [search, setSearch] = useState("")
  const [klusterFilter, setKlusterFilter] = useState("ALL")
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null)

  const filtered = members.filter((m) => {
    const matchSearch = m.Nama.toLowerCase().includes(search.toLowerCase())
    const matchKluster = klusterFilter === "ALL" || m.Kluster === klusterFilter
    return matchSearch && matchKluster
  })

  async function handleDelete() {
    if (!deleteTarget?.id) return
    setDeleting(true)
    await fetch(`/api/tim/${deleteTarget.id}`, { method: "DELETE" })
    setDeleteTarget(null)
    setDeleting(false)
    router.refresh()
  }

  return (
    <>
      <DeleteModal
        open={!!deleteTarget}
        title={deleteTarget?.Nama ?? ""}
        description="Data anggota akan dihapus permanen dari database."
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text">Tim</h1>
            <p className="text-muted text-sm mt-0.5">{members.length} anggota terdaftar</p>
          </div>
          <Link
            href="/admin/tim/baru"
            className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition"
          >
            + Tambah Anggota
          </Link>
        </div>

        <div className="flex gap-3 mb-5 flex-wrap">
          <input
            type="text"
            placeholder="Cari nama anggota..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-48 px-4 py-2.5 rounded-lg border border-border bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
          />
          <select
            value={klusterFilter}
            onChange={(e) => setKlusterFilter(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-border bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
          >
            <option value="ALL">Semua Kluster</option>
            <option value="SAINTEK">SAINTEK</option>
            <option value="SOSHUM">SOSHUM</option>
            <option value="AGRO">AGRO</option>
            <option value="MEDIKA">MEDIKA</option>
          </select>
        </div>

        <div className="bg-surface rounded-2xl border border-border overflow-x-auto">
          <table className="w-full text-sm min-w-120">
            <thead className="border-b border-border bg-background">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted">Anggota</th>
                <th className="text-left px-4 py-3 font-medium text-muted hidden sm:table-cell">Kluster</th>
                <th className="text-left px-4 py-3 font-medium text-muted hidden md:table-cell">Jabatan</th>
                <th className="text-left px-4 py-3 font-medium text-muted hidden lg:table-cell">Angkatan</th>
                <th className="px-4 py-3 text-right font-medium text-muted">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-8">
                    Tidak ada anggota ditemukan.
                  </td>
                </tr>
              )}
              {filtered.map((member) => (
                <tr key={member.id ?? member.Nama} className="hover:bg-background/50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 bg-border">
                        {member.Image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={member.Image} alt={member.Nama} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-text">{member.Nama}</div>
                        <div className="text-muted text-xs">{member.Prodi}</div>
                        {/* Kluster badge visible on mobile only */}
                        <span className={`sm:hidden inline-block mt-0.5 text-xs px-2 py-0.5 rounded-full font-medium ${KLUSTER_COLOR[member.Kluster] ?? "bg-gray-100 text-gray-600"}`}>
                          {member.Kluster}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${KLUSTER_COLOR[member.Kluster] ?? "bg-gray-100 text-gray-600"}`}>
                      {member.Kluster}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text hidden md:table-cell">{member.Jabatan}</td>
                  <td className="px-4 py-3 text-muted hidden lg:table-cell">{member.Angkatan ?? "2022"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      {member.id ? (
                        <>
                          <Link
                            href={`/admin/tim/${member.id}/edit`}
                            className="px-3 py-1 text-xs rounded-lg border border-border text-text hover:border-primary hover:text-primary transition whitespace-nowrap"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => setDeleteTarget(member)}
                            className="px-3 py-1 text-xs rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition whitespace-nowrap"
                          >
                            Hapus
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-muted italic">data statis</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
