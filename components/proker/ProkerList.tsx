"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Article } from "@/app/data/articles"
import AdminEditButton from "@/components/admin/AdminEditButton"

interface ProkerListProps {
  articles: Article[]
}

const villageFilters = [
  { value: "ALL", label: "Semua Desa" },
  { value: "kertayasa", label: "Desa Kertayasa" },
  { value: "batukaras", label: "Desa Batukaras" },
]

const klusterFilters = ["ALL", "SAINTEK", "SOSHUM", "AGRO", "MEDIKA"]

const villageLabel: Record<string, string> = {
  kertayasa: "Kertayasa",
  batukaras: "Batukaras",
}

const klusterColor: Record<string, string> = {
  SAINTEK: "bg-blue-100 text-blue-700",
  SOSHUM: "bg-purple-100 text-purple-700",
  AGRO: "bg-green-100 text-green-700",
  MEDIKA: "bg-red-100 text-red-700",
}

export default function ProkerList({ articles }: ProkerListProps) {
  const [villageFilter, setVillageFilter] = useState("ALL")
  const [klusterFilter, setKlusterFilter] = useState("ALL")
  const [search, setSearch] = useState("")

  const filtered = articles.filter((a) => {
    const matchVillage = villageFilter === "ALL" || a.village === villageFilter
    const matchKluster = klusterFilter === "ALL" || a.kluster === klusterFilter
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase())
    return matchVillage && matchKluster && matchSearch
  })

  return (
    <div className="py-16 bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page title */}
        <div className="text-center mb-12">
          <h1
            className="font-heading text-5xl md:text-6xl"
            style={{
              backgroundImage: "linear-gradient(135deg, #ED941D, #F7D149)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              paddingBottom: "0.45em",
            }}
          >
            Program Kerja
          </h1>
          <p className="text-muted mt-3 max-w-lg mx-auto">
            Kegiatan dan program pengabdian yang kami jalankan di Desa Kertayasa dan Desa Batukaras.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted w-4 h-4 pointer-events-none"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Cari program kerja..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full border border-border bg-surface text-text text-sm placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-text"
              aria-label="Hapus pencarian"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Village filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {villageFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setVillageFilter(f.value)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                villageFilter === f.value
                  ? "bg-primary text-white"
                  : "border border-border text-muted hover:border-primary hover:text-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Kluster filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {klusterFilters.map((f) => (
            <button
              key={f}
              onClick={() => setKlusterFilter(f)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                klusterFilter === f
                  ? "bg-secondary text-white"
                  : "border border-border text-muted hover:border-secondary hover:text-secondary"
              }`}
            >
              {f === "ALL" ? "Semua Klaster" : f}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-center text-muted text-sm mb-8">
          Menampilkan {filtered.length} program kerja{search && ` untuk "${search}"`}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium">Tidak ada program kerja yang ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <div key={article.slug} className="relative group">
                <AdminEditButton slug={article.slug} />
              <Link
                href={`/artikel/${article.slug}`}
                className="group bg-surface rounded-2xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all block"
              >
                {/* Cover image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.cover}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Kluster badge overlay */}
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-semibold rounded-full px-3 py-1 ${klusterColor[article.kluster]}`}>
                      {article.kluster}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs border border-primary/40 text-primary rounded-full px-2.5 py-0.5">
                      {article.category}
                    </span>
                    <span className="text-xs bg-secondary/10 text-secondary rounded-full px-2.5 py-0.5">
                      {villageLabel[article.village]}
                    </span>
                  </div>

                  <h3 className="font-bold text-text text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-3">
                    {article.title}
                  </h3>

                  <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-2 pt-3 border-t border-border">
                    <div className="relative w-7 h-7 flex-shrink-0">
                      <Image
                        src={article.author.image}
                        alt={article.author.nama}
                        fill
                        className="object-cover rounded-full"
                        sizes="28px"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-text">{article.author.nama}</p>
                      <p className="text-xs text-muted">{article.author.jabatan}</p>
                    </div>
                    <span className="ml-auto text-xs text-muted">
                      {new Date(article.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                </div>
              </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
