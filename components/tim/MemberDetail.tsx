"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { TeamMember } from "@/lib/db/team"
import { Article } from "@/app/data/articles"

interface Props {
  member: TeamMember
  articles: Article[]
}

const klusterColor: Record<string, string> = {
  SAINTEK: "bg-blue-100 text-blue-700",
  SOSHUM: "bg-purple-100 text-purple-700",
  AGRO: "bg-green-100 text-green-700",
  MEDIKA: "bg-red-100 text-red-700",
}

const villageLabel: Record<string, string> = {
  kertayasa: "Kertayasa",
  batukaras: "Batukaras",
}

const fields = (member: TeamMember) => [
  { label: "Fakultas", value: member.Fakultas },
  { label: "Prodi", value: member.Prodi },
  { label: "Klaster", value: member.Kluster },
  { label: "Angkatan", value: member.Angkatan ?? "—" },
  { label: "Divisi", value: member.Divisi },
  { label: "Akun Instagram", value: member.Instagram || "—" },
]

export default function MemberDetail({ member, articles }: Props) {
  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Link
            href="/tim"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Kembali ke Tim
          </Link>
        </motion.div>

        {/* Profile section */}
        <div className="flex flex-col md:flex-row gap-8 mb-14">
          {/* Photo */}
          <motion.div
            className="shrink-0"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="relative w-52 h-72 rounded-2xl overflow-hidden shadow-lg mx-auto md:mx-0">
              <Image
                src={member.Image}
                alt={member.Nama}
                fill
                className="object-cover"
                sizes="208px"
              />
            </div>
          </motion.div>

          {/* Info card */}
          <motion.div
            className="flex-1 bg-surface rounded-2xl border border-border p-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <h1 className="text-2xl font-bold text-text mb-1">{member.Nama}</h1>
            <p className="text-primary text-sm font-medium mb-5">{member.Jabatan}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {fields(member).map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-muted uppercase tracking-wide mb-0.5">{label}</p>
                  {label === "Akun Instagram" && value && value !== "—" ? (
                    <a
                      href={`https://instagram.com/${value.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-text">{value || "—"}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related proker */}
        {articles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          >
            <h2 className="text-lg font-bold text-text mb-5">
              Program Kerja oleh {member.Nama.split(" ")[0]}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((article, i) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.07, ease: "easeOut" }}
                >
                  <Link
                    href={`/artikel/${article.slug}`}
                    className="group block bg-surface rounded-2xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={article.cover}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div className="absolute top-2 left-2">
                        <span className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${klusterColor[article.kluster]}`}>
                          {article.kluster}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs border border-primary/40 text-primary rounded-full px-2 py-0.5">
                          {article.category}
                        </span>
                        <span className="text-xs bg-secondary/10 text-secondary rounded-full px-2 py-0.5">
                          {villageLabel[article.village]}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-text line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {articles.length === 0 && (
          <motion.div
            className="text-center py-12 text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm">Belum ada program kerja yang terdaftar untuk anggota ini.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
