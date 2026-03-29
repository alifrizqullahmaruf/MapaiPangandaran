"use client"

import Image from "next/image"
import { useState } from "react"

interface TeamMember {
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

interface TeamGridProps {
  members: TeamMember[]
}

const klusterFilters = ["ALL", "SAINTEK", "SOSHUM", "AGRO", "MEDIKA"]

export default function TeamGrid({ members }: TeamGridProps) {
  const [activeFilter, setActiveFilter] = useState("ALL")
  const [angkatanFilter, setAngkatanFilter] = useState("ALL")
  const [search, setSearch] = useState("")

  // Collect unique angkatan values from data, fallback to "2023"
  const angkatanOptions = [
    "ALL",
    ...Array.from(new Set(members.map((m) => m.Angkatan ?? "2022"))).sort(),
  ]

  const filtered = members.filter((m) => {
    const matchKluster = activeFilter === "ALL" || m.Kluster === activeFilter
    const matchAngkatan = angkatanFilter === "ALL" || (m.Angkatan ?? "2022") === angkatanFilter
    const matchSearch = m.Nama.toLowerCase().includes(search.toLowerCase())
    return matchKluster && matchAngkatan && matchSearch
  })

  return (
    <div className="py-16 bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page title */}
        <div className="text-center mb-10">
          <h1
            className="font-heading text-5xl md:text-6xl leading-tight"
            style={{
              backgroundImage: "linear-gradient(135deg, #ED941D, #F7D149)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              paddingBottom: "1.25rem",
            }}
          >
            Tim Mapai Pangandaran
          </h1>
          <p className="text-muted mt-3 max-w-lg mx-auto">
            {members.length} mahasiswa dari berbagai klaster yang bersatu mengabdi di Kecamatan Cijulang.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted w-4 h-4 pointer-events-none"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Cari nama anggota..."
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

        {/* Filter tabs + angkatan dropdown */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
          {klusterFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-primary text-white"
                  : "border border-border text-muted hover:border-primary hover:text-primary"
              }`}
            >
              {filter === "ALL" ? "Semua" : filter}
            </button>
          ))}

          {/* Divider */}
          <div className="w-px h-6 bg-border hidden sm:block" />

          {/* Angkatan dropdown */}
          <div className="relative">
            <select
              value={angkatanFilter}
              onChange={(e) => setAngkatanFilter(e.target.value)}
              className={`rounded-full pl-4 pr-8 py-2 text-sm font-medium border transition-colors appearance-none cursor-pointer focus:outline-none ${
                angkatanFilter !== "ALL"
                  ? "bg-primary text-white border-primary"
                  : "border-border text-muted hover:border-primary hover:text-primary bg-surface"
              }`}
            >
              {angkatanOptions.map((a) => (
                <option key={a} value={a} className="text-text bg-surface">
                  {a === "ALL" ? "Semua Angkatan" : `Angkatan ${a}`}
                </option>
              ))}
            </select>
            <svg
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none ${angkatanFilter !== "ALL" ? "text-white" : "text-muted"}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Count */}
        <p className="text-center text-muted text-sm mb-8">
          Menampilkan {filtered.length} anggota{search && ` untuk "${search}"`}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filtered.map((member) => (
            <div
              key={member.Nama}
              className="bg-surface rounded-2xl border border-border p-4 hover:border-primary/40 hover:shadow-md transition-all"
            >
              {/* Portrait */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3">
                <Image
                  src={member.Image}
                  alt={member.Nama}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>

              {/* Info */}
              <p className="font-semibold text-text text-sm leading-snug">{member.Nama}</p>
              <p className="text-primary text-xs mt-1 font-medium">{member.Jabatan}</p>
              <p className="text-muted text-xs mt-0.5">{member.Divisi} · {member.Kluster}</p>

              {/* Instagram */}
              {member.Instagram && (
                <a
                  href={`https://instagram.com/${member.Instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-xs mt-2 inline-block hover:underline"
                >
                  {member.Instagram}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
