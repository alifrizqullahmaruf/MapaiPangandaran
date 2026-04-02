"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Article } from "@/app/data/articles"
import DeleteModal from "@/components/admin/DeleteModal"

const VILLAGE_LABEL: Record<string, string> = {
  kertayasa: "Kertayasa",
  batukaras: "Batukaras",
}

const KLUSTER_COLOR: Record<string, string> = {
  SAINTEK: "bg-blue-100 text-blue-700",
  SOSHUM: "bg-green-100 text-green-700",
  AGRO: "bg-yellow-100 text-yellow-700",
  MEDIKA: "bg-red-100 text-red-700",
}

export default function AdminDashboard({ articles }: { articles: Article[] }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  const [search, setSearch] = useState("")
  const [deleteTarget, setDeleteTarget] = useState<Article | null>(null)

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.village.includes(search.toLowerCase()) ||
      a.kluster.toLowerCase().includes(search.toLowerCase())
  )

  async function handleDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    await fetch(`/api/articles/${deleteTarget.slug}`, { method: "DELETE" })
    setDeleteTarget(null)
    setDeleting(false)
    router.refresh()
  }

  return (
    <>
      <DeleteModal
        open={!!deleteTarget}
        title={deleteTarget?.title ?? ""}
        description="Data artikel akan dihapus permanen dari database."
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text">Artikel & Proker</h1>
            <p className="text-muted text-sm mt-0.5">{articles.length} artikel tersimpan</p>
          </div>
          <Link
            href="/admin/artikel/baru"
            className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition"
          >
            + Tambah Artikel
          </Link>
        </div>

        <input
          type="text"
          placeholder="Cari artikel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-5 px-4 py-2.5 rounded-lg border border-border bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
        />

        <div className="bg-surface rounded-2xl border border-border overflow-x-auto">
          <table className="w-full text-sm min-w-120">
            <thead className="border-b border-border bg-background">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted">Judul</th>
                <th className="text-left px-4 py-3 font-medium text-muted hidden sm:table-cell">Desa</th>
                <th className="text-left px-4 py-3 font-medium text-muted hidden sm:table-cell">Kluster</th>
                <th className="text-left px-4 py-3 font-medium text-muted hidden md:table-cell">Tanggal</th>
                <th className="px-4 py-3 text-right font-medium text-muted">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-8">
                    Tidak ada artikel ditemukan.
                  </td>
                </tr>
              )}
              {filtered.map((article) => (
                <tr key={article.slug} className="hover:bg-background/50 transition">
                  <td className="px-4 py-3">
                    <div className="font-medium text-text leading-snug">{article.title}</div>
                    {/* Badges visible on mobile only */}
                    <div className="sm:hidden flex items-center gap-1.5 mt-1 flex-wrap">
                      <span className="text-xs text-muted">{VILLAGE_LABEL[article.village] ?? article.village}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${KLUSTER_COLOR[article.kluster] ?? "bg-gray-100 text-gray-600"}`}>
                        {article.kluster}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text hidden sm:table-cell">
                    {VILLAGE_LABEL[article.village] ?? article.village}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${KLUSTER_COLOR[article.kluster] ?? "bg-gray-100 text-gray-600"}`}>
                      {article.kluster}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted hidden md:table-cell">{article.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/admin/artikel/${article.slug}/edit`}
                        className="px-3 py-1 text-xs rounded-lg border border-border text-text hover:border-primary hover:text-primary transition whitespace-nowrap"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => setDeleteTarget(article)}
                        className="px-3 py-1 text-xs rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition whitespace-nowrap"
                      >
                        Hapus
                      </button>
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
