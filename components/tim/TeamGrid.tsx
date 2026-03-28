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
}

interface TeamGridProps {
  members: TeamMember[]
}

const klusterFilters = ["ALL", "SAINTEK", "SOSHUM", "AGRO", "MEDIKA"]

export default function TeamGrid({ members }: TeamGridProps) {
  const [activeFilter, setActiveFilter] = useState("ALL")

  const filtered =
    activeFilter === "ALL" ? members : members.filter((m) => m.Kluster === activeFilter)

  return (
    <div className="py-16 bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page title */}
        <div className="text-center mb-10">
          <h1 className="font-heading text-5xl md:text-6xl text-primary">Tim Mapai Pangandaran</h1>
          <p className="text-muted mt-3 max-w-lg mx-auto">
            {members.length} mahasiswa dari berbagai klaster yang bersatu mengabdi di Kecamatan Cijulang.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
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
        </div>

        {/* Count */}
        <p className="text-center text-muted text-sm mb-8">
          Menampilkan {filtered.length} anggota
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
