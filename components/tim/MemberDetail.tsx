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
  { label: "Jabatan", value: member.Jabatan },
]

export default function MemberDetail({ member, articles }: Props) {
  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">

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
            {member.Instagram && (
              <a
                href={`https://instagram.com/${member.Instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-1.5 text-primary text-xs font-medium hover:underline"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                {member.Instagram}
              </a>
            )}
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
                  <p className="text-sm font-medium text-text">{value || "—"}</p>
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
