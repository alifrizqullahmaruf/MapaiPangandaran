"use client"

import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { TeamMember } from "@/lib/db/team"
import { supabase } from "@/lib/supabase"
import Combobox from "@/components/admin/Combobox"
import { allFakultas, getProdiByFakultas } from "@/app/data/ugm-fakultas"

type FormData = {
  Nama: string
  Kluster: string
  Fakultas: string
  Prodi: string
  Divisi: string
  Jabatan: string
  Instagram: string
  Image: string
  Angkatan: string
}

const EMPTY: FormData = {
  Nama: "",
  Kluster: "SAINTEK",
  Fakultas: "",
  Prodi: "",
  Divisi: "",
  Jabatan: "",
  Instagram: "",
  Image: "",
  Angkatan: "2022",
}

function memberToForm(m: TeamMember): FormData {
  return {
    Nama: m.Nama,
    Kluster: m.Kluster,
    Fakultas: m.Fakultas,
    Prodi: m.Prodi,
    Divisi: m.Divisi,
    Jabatan: m.Jabatan,
    Instagram: m.Instagram,
    Image: m.Image,
    Angkatan: m.Angkatan ?? "2022",
  }
}

export default function MemberForm({
  member,
  mode,
}: {
  member?: TeamMember
  mode: "create" | "edit"
}) {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(member ? memberToForm(member) : EMPTY)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoUpload = useCallback(async (file: File) => {
    setUploading(true)
    const ext = file.name.split(".").pop()
    const fileName = `members/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage
      .from("covers")
      .upload(fileName, file, { contentType: file.type, upsert: false })
    if (!error) {
      const { data } = supabase.storage.from("covers").getPublicUrl(fileName)
      setForm((prev) => ({ ...prev, Image: data.publicUrl }))
    }
    setUploading(false)
  }, [])

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function setFakultas(val: string) {
    setForm((prev) => ({ ...prev, Fakultas: val, Prodi: "" }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    let res: Response
    if (mode === "create") {
      res = await fetch("/api/tim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
    } else {
      res = await fetch(`/api/tim/${member!.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: form.Nama,
          kluster: form.Kluster,
          fakultas: form.Fakultas,
          prodi: form.Prodi,
          divisi: form.Divisi,
          jabatan: form.Jabatan,
          instagram: form.Instagram,
          image: form.Image,
          angkatan: form.Angkatan,
        }),
      })
    }

    if (res.ok) {
      router.push("/admin/tim")
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

  const prodiOptions = getProdiByFakultas(form.Fakultas)

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-xl font-bold text-text mb-6">
        {mode === "create" ? "Tambah Anggota Baru" : `Edit: ${member?.Nama}`}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Foto */}
        <div>
          <label className={labelClass}>Foto</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handlePhotoUpload(file)
            }}
          />
          <div className="flex items-center gap-4">
            {/* Preview */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative w-24 h-24 rounded-xl border-2 border-dashed border-border hover:border-primary transition cursor-pointer overflow-hidden bg-background flex items-center justify-center shrink-0"
            >
              {form.Image ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.Image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                    <p className="text-white text-xs font-medium">Ganti</p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1 text-muted">
                  {uploading ? (
                    <p className="text-xs">Upload...</p>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      <p className="text-xs text-center">Upload foto</p>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="text-sm text-muted space-y-1">
              <p>Klik kotak untuk upload foto.</p>
              <p className="text-xs">Format: JPG, PNG. Maks 5 MB.</p>
              {form.Image && (
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, Image: "" }))}
                  className="text-xs text-red-500 hover:underline"
                >
                  Hapus foto
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Nama */}
        <div>
          <label className={labelClass}>Nama Lengkap</label>
          <input className={inputClass} value={form.Nama} onChange={(e) => set("Nama", e.target.value)} required />
        </div>

        {/* Kluster + Angkatan */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Kluster</label>
            <select className={inputClass} value={form.Kluster} onChange={(e) => set("Kluster", e.target.value)}>
              <option value="SAINTEK">SAINTEK</option>
              <option value="SOSHUM">SOSHUM</option>
              <option value="AGRO">AGRO</option>
              <option value="MEDIKA">MEDIKA</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Angkatan</label>
            <select className={inputClass} value={form.Angkatan} onChange={(e) => set("Angkatan", e.target.value)}>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>

        {/* Fakultas */}
        <Combobox
          label="Fakultas"
          value={form.Fakultas}
          onChange={setFakultas}
          options={allFakultas}
          placeholder="Ketik atau pilih fakultas..."
        />

        {/* Prodi */}
        <Combobox
          label="Program Studi"
          value={form.Prodi}
          onChange={(val) => set("Prodi", val)}
          options={prodiOptions}
          placeholder={form.Fakultas ? "Ketik atau pilih prodi..." : "Pilih fakultas dulu..."}
        />

        {/* Divisi + Jabatan */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Divisi</label>
            <select className={inputClass} value={form.Divisi} onChange={(e) => set("Divisi", e.target.value)}>
              <option value="">-- Pilih Divisi --</option>
              <option value="Logistik">Logistik</option>
              <option value="CC">CC</option>
              <option value="PSDM">PSDM</option>
              <option value="Sponsor">Sponsor</option>
              <option value="Desain">Desain</option>
              <option value="Humas">Humas</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Jabatan</label>
            <select className={inputClass} value={form.Jabatan} onChange={(e) => set("Jabatan", e.target.value)}>
              <option value="">-- Pilih Jabatan --</option>
              <option value="KORMANIT">KORMANIT</option>
              <option value="KORMASIT BK 1">KORMASIT BK 1</option>
              <option value="KORMASIT BK 2">KORMASIT BK 2</option>
              <option value="KORMASIT KY 1">KORMASIT KY 1</option>
              <option value="KORMASIT KY 2">KORMASIT KY 2</option>
              <option value="KORMATER">KORMATER</option>
              <option value="Sekretaris">Sekretaris</option>
              <option value="Bendahara">Bendahara</option>
              <option value="Anggota">Anggota</option>
            </select>
          </div>
        </div>

        {/* Instagram */}
        <div>
          <label className={labelClass}>Instagram</label>
          <input className={inputClass} value={form.Instagram} onChange={(e) => set("Instagram", e.target.value)} placeholder="@username" />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition disabled:opacity-60"
          >
            {loading ? "Menyimpan..." : mode === "create" ? "Tambah Anggota" : "Simpan Perubahan"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/tim")}
            className="px-6 py-2.5 rounded-lg border border-border text-text text-sm hover:bg-background/80 transition"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}
