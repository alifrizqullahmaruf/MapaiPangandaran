"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"

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

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
}

export default function TeamGrid({ members }: TeamGridProps) {
  const [activeFilter, setActiveFilter] = useState("ALL")
  const [angkatanFilter, setAngkatanFilter] = useState("ALL")
  const [search, setSearch] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => setIsAdmin(d.admin === true))
      .catch(() => {})
  }, [])

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
        {isAdmin && (
          <div className="flex justify-end mb-4">
            <Link
              href="/admin"
              className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition"
            >
              Admin Panel
            </Link>
          </div>
        )}

        {/* Page title */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
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
        </motion.div>

        {/* Search bar */}
        <motion.div
          className="relative max-w-md mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
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
        </motion.div>

        {/* Filter tabs + angkatan dropdown */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
        >
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

          <div className="w-px h-6 bg-border hidden sm:block" />

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
        </motion.div>

        {/* Count */}
        <p className="text-center text-muted text-sm mb-8">
          Menampilkan {filtered.length} anggota{search && ` untuk "${search}"`}
        </p>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence mode="popLayout">
          {filtered.map((member) => (
            <motion.div
              key={member.Nama}
              variants={cardVariants}
              layout
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            >
              <Link
                href={`/tim/${encodeURIComponent(member.Nama)}`}
                className="group block bg-surface rounded-2xl border border-border p-4 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="relative w-full aspect-3/4 rounded-xl overflow-hidden mb-3">
                  <Image
                    src={member.Image}
                    alt={member.Nama}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>

                <p className="font-semibold text-text text-sm leading-snug group-hover:text-primary transition-colors">{member.Nama}</p>
                <p className="text-primary text-xs mt-1 font-medium">{member.Jabatan}</p>
                <p className="text-muted text-xs mt-0.5">{member.Divisi} · {member.Kluster}</p>
                <p className="text-muted text-xs mt-0.5">{member.Prodi}</p>
              </Link>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
