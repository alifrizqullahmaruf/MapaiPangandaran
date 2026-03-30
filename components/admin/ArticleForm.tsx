"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Article } from "@/app/data/articles"
import { TeamMember } from "@/lib/db/team"
import { supabase } from "@/lib/supabase"

type FormData = {
  slug: string
  title: string
  excerpt: string
  category: string
  village: "kertayasa" | "batukaras"
  kluster: "SAINTEK" | "SOSHUM" | "AGRO" | "MEDIKA"
  author_nama: string
  author_image: string
  author_jabatan: string
  cover: string
  body: string
  date: string
  related: string
}

function articleToForm(a: Article): FormData {
  return {
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    village: a.village,
    kluster: a.kluster,
    author_nama: a.author.nama,
    author_image: a.author.image,
    author_jabatan: a.author.jabatan,
    cover: a.cover,
    body: a.body.join("\n\n"),
    date: a.date,
    related: a.related.join(", "),
  }
}

function toSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

const EMPTY: FormData = {
  slug: "",
  title: "",
  excerpt: "",
  category: "",
  village: "kertayasa",
  kluster: "SAINTEK",
  author_nama: "",
  author_image: "",
  author_jabatan: "",
  cover: "",
  body: "",
  date: new Date().toISOString().slice(0, 10),
  related: "",
}

export default function ArticleForm({
  article,
  mode,
}: {
  article?: Article
  mode: "create" | "edit"
}) {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(article ? articleToForm(article) : EMPTY)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCoverUpload = useCallback(async (file: File) => {
    setUploading(true)
    const ext = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { error } = await supabase.storage
      .from("covers")
      .upload(fileName, file, { contentType: file.type, upsert: false })

    if (!error) {
      const { data } = supabase.storage.from("covers").getPublicUrl(fileName)
      setForm((prev) => ({ ...prev, cover: data.publicUrl }))
    }
    setUploading(false)
  }, [])

  // Author picker state
  const [members, setMembers] = useState<TeamMember[]>([])
  const [authorSearch, setAuthorSearch] = useState(article?.author.nama ?? "")
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch("/api/tim")
      .then((r) => r.json())
      .then((data: TeamMember[]) => setMembers(data))
      .catch(() => {})
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const filteredMembers = members.filter((m) =>
    m.Nama.toLowerCase().includes(authorSearch.toLowerCase())
  )

  function selectMember(m: TeamMember) {
    setAuthorSearch(m.Nama)
    setForm((prev) => ({
      ...prev,
      author_nama: m.Nama,
      author_jabatan: m.Jabatan,
      author_image: m.Image,
    }))
    setShowDropdown(false)
  }

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function setTitle(value: string) {
    setForm((prev) => ({
      ...prev,
      title: value,
      // Auto-generate slug hanya saat create dan slug belum diubah manual
      ...(mode === "create" ? { slug: toSlug(value) } : {}),
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const payload = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      category: form.category.trim(),
      village: form.village,
      kluster: form.kluster,
      author: {
        nama: form.author_nama.trim(),
        image: form.author_image.trim(),
        jabatan: form.author_jabatan.trim(),
      },
      cover: form.cover.trim(),
      body: form.body.split("\n\n").map((p) => p.trim()).filter(Boolean),
      date: form.date,
      related: form.related.split(",").map((s) => s.trim()).filter(Boolean),
    }

    let res: Response
    if (mode === "create") {
      res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    } else {
      // PATCH pakai flat columns sesuai schema Supabase
      const patchPayload = {
        title: payload.title,
        excerpt: payload.excerpt,
        category: payload.category,
        village: payload.village,
        kluster: payload.kluster,
        author_nama: form.author_nama.trim(),
        author_image: form.author_image.trim(),
        author_jabatan: form.author_jabatan.trim(),
        cover: payload.cover,
        body: payload.body,
        date: payload.date,
      }
      res = await fetch(`/api/articles/${article!.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patchPayload),
      })
    }

    if (res.ok) {
      router.push("/admin")
      router.refresh()
    } else {
      const json = await res.json()
      setError(json.error ?? "Terjadi kesalahan.")
    }
    setLoading(false)
  }

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-border bg-background text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
  const labelClass = "block text-sm font-medium text-text mb-1"

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-xl font-bold text-text mb-6">
        {mode === "create" ? "Tambah Artikel Baru" : "Edit Artikel"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelClass}>Judul</label>
          <input className={inputClass} value={form.title} onChange={(e) => setTitle(e.target.value)} required />
        </div>


        <div>
          <label className={labelClass}>Excerpt <span className="text-muted font-normal">(ringkasan singkat)</span></label>
          <textarea className={inputClass} rows={2} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Desa</label>
            <select className={inputClass} value={form.village} onChange={(e) => set("village", e.target.value as FormData["village"])}>
              <option value="kertayasa">Kertayasa</option>
              <option value="batukaras">Batukaras</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Kluster</label>
            <select className={inputClass} value={form.kluster} onChange={(e) => set("kluster", e.target.value as FormData["kluster"])}>
              <option value="SAINTEK">SAINTEK</option>
              <option value="SOSHUM">SOSHUM</option>
              <option value="AGRO">AGRO</option>
              <option value="MEDIKA">MEDIKA</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Kategori</label>
          <select className={inputClass} value={form.category} onChange={(e) => set("category", e.target.value)} required>
            <option value="">-- Pilih Kategori --</option>
            <option value="Literasi">Literasi</option>
            <option value="Teknologi">Teknologi</option>
            <option value="Kesehatan">Kesehatan</option>
            <option value="Ekonomi">Ekonomi</option>
            <option value="Lingkungan">Lingkungan</option>
            <option value="Pendidikan">Pendidikan</option>
            <option value="Sosial">Sosial</option>
            <option value="Pertanian">Pertanian</option>
            <option value="Pariwisata">Pariwisata</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Cover</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleCoverUpload(file)
            }}
          />

          {/* Drop zone / preview */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              const file = e.dataTransfer.files?.[0]
              if (file) handleCoverUpload(file)
            }}
            className="relative cursor-pointer rounded-xl border-2 border-dashed border-border hover:border-primary transition overflow-hidden"
          >
            {form.cover ? (
              <div className="relative w-full h-48">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.cover} alt="Cover preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                  <p className="text-white text-sm font-medium">Klik untuk ganti</p>
                </div>
              </div>
            ) : (
              <div className="h-36 flex flex-col items-center justify-center gap-2 text-muted">
                {uploading ? (
                  <p className="text-sm">Mengupload...</p>
                ) : (
                  <>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <p className="text-sm">Klik atau drag foto cover di sini</p>
                    <p className="text-xs">Maks. 5 MB</p>
                  </>
                )}
              </div>
            )}
            {uploading && form.cover === "" && (
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                <p className="text-sm text-primary font-medium">Mengupload...</p>
              </div>
            )}
          </div>

          {form.cover && (
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, cover: "" }))}
              className="mt-2 text-xs text-red-500 hover:underline"
            >
              Hapus foto
            </button>
          )}
        </div>

        {/* Penulis — searchable dropdown */}
        <fieldset className="border border-border rounded-lg p-4 space-y-3">
          <legend className="text-sm font-medium text-text px-1">Penulis</legend>

          <div ref={dropdownRef} className="relative">
            <label className={labelClass}>Cari dari Tim</label>
            <input
              type="text"
              className={inputClass}
              value={authorSearch}
              onChange={(e) => {
                setAuthorSearch(e.target.value)
                setShowDropdown(true)
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Ketik nama anggota tim..."
              autoComplete="off"
            />

            {showDropdown && filteredMembers.length > 0 && (
              <ul className="absolute z-20 mt-1 w-full bg-surface border border-border rounded-lg shadow-lg max-h-52 overflow-y-auto">
                {filteredMembers.map((m) => (
                  <li key={m.id ?? m.Nama}>
                    <button
                      type="button"
                      onClick={() => selectMember(m)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-background transition text-left"
                    >
                      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 bg-border">
                        {m.Image && (
                          <Image src={m.Image} alt={m.Nama} fill className="object-cover" sizes="32px" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text">{m.Nama}</p>
                        <p className="text-xs text-muted">{m.Jabatan} · {m.Kluster}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {showDropdown && authorSearch.length > 0 && filteredMembers.length === 0 && (
              <div className="absolute z-20 mt-1 w-full bg-surface border border-border rounded-lg shadow px-4 py-3 text-sm text-muted">
                Tidak ada anggota ditemukan.
              </div>
            )}
          </div>

          {/* Preview anggota yang dipilih */}
          {form.author_nama && (
            <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
              <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 bg-border">
                {form.author_image && (
                  <Image src={form.author_image} alt={form.author_nama} fill className="object-cover" sizes="36px" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text">{form.author_nama}</p>
                <p className="text-xs text-muted">{form.author_jabatan}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAuthorSearch("")
                  setForm((prev) => ({ ...prev, author_nama: "", author_jabatan: "", author_image: "" }))
                }}
                className="text-muted hover:text-text transition text-xs"
              >
                ✕
              </button>
            </div>
          )}
        </fieldset>

        <div>
          <label className={labelClass}>
            Isi Artikel <span className="text-muted font-normal">(pisahkan paragraf dengan baris kosong)</span>
          </label>
          <textarea
            className={inputClass}
            rows={8}
            value={form.body}
            onChange={(e) => set("body", e.target.value)}
            placeholder={"Paragraf pertama...\n\nParagraf kedua..."}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Tanggal</label>
          <input type="date" className={inputClass} value={form.date} onChange={(e) => set("date", e.target.value)} />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition disabled:opacity-60"
          >
            {loading ? "Menyimpan..." : mode === "create" ? "Tambah Artikel" : "Simpan Perubahan"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="px-6 py-2.5 rounded-lg border border-border text-text text-sm hover:bg-background/80 transition"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}
