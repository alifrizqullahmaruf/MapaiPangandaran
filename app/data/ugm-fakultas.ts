export interface Fakultas {
  nama: string
  prodi: string[]
}

export const fakultasUGM: Fakultas[] = [
  {
    nama: "Fakultas Teknik",
    prodi: [
      "Teknik Sipil",
      "Teknik Mesin",
      "Teknik Elektro",
      "Teknik Kimia",
      "Teknik Industri",
      "Teknik Fisika",
      "Teknik Nuklir dan Teknik Fisika",
      "Teknik Geodesi",
      "Teknik Arsitektur",
      "Teknik Infrastruktur Lingkungan",
      "Teknik Biomedis",
      "Teknik Informasi",
    ],
  },
  {
    nama: "Fakultas Kedokteran, Kesehatan Masyarakat, dan Keperawatan",
    prodi: [
      "Pendidikan Dokter",
      "Ilmu Keperawatan",
      "Gizi Kesehatan",
      "Kesehatan Masyarakat",
    ],
  },
  {
    nama: "Fakultas Kedokteran Gigi",
    prodi: ["Pendidikan Dokter Gigi"],
  },
  {
    nama: "Fakultas Kedokteran Hewan",
    prodi: ["Kedokteran Hewan"],
  },
  {
    nama: "Fakultas Farmasi",
    prodi: ["Farmasi"],
  },
  {
    nama: "Fakultas Matematika dan Ilmu Pengetahuan Alam",
    prodi: [
      "Matematika",
      "Statistika",
      "Fisika",
      "Kimia",
      "Ilmu Komputer",
      "Elektronika dan Instrumentasi",
      "Geofisika",
      "Ilmu Aktuaria",
    ],
  },
  {
    nama: "Fakultas Biologi",
    prodi: ["Biologi"],
  },
  {
    nama: "Fakultas Pertanian",
    prodi: [
      "Agronomi",
      "Ilmu Tanah",
      "Perlindungan Tanaman",
      "Proteksi Tanaman",
      "Manajemen Sumberdaya Akuatik",
      "Perikanan",
      "Teknologi Pangan dan Hasil Pertanian",
      "Mikrobiologi Pertanian",
    ],
  },
  {
    nama: "Fakultas Peternakan",
    prodi: ["Ilmu dan Industri Peternakan"],
  },
  {
    nama: "Fakultas Teknologi Pertanian",
    prodi: [
      "Teknologi Pangan",
      "Teknik Pertanian",
      "Teknologi Industri Pertanian",
    ],
  },
  {
    nama: "Fakultas Kehutanan",
    prodi: [
      "Kehutanan",
      "Manajemen Hutan",
      "Teknologi Hasil Hutan",
      "Konservasi Sumberdaya Hutan",
      "Silvikultur",
    ],
  },
  {
    nama: "Fakultas Ekonomika dan Bisnis",
    prodi: [
      "Ilmu Ekonomi",
      "Manajemen",
      "Akuntansi",
    ],
  },
  {
    nama: "Fakultas Hukum",
    prodi: ["Ilmu Hukum"],
  },
  {
    nama: "Fakultas Ilmu Budaya",
    prodi: [
      "Sastra Indonesia",
      "Sastra Inggris",
      "Sastra Arab",
      "Sastra Jepang",
      "Sastra Jawa",
      "Sastra Perancis",
      "Sastra Korea",
      "Bahasa dan Kebudayaan Korea",
      "Bahasa dan Kebudayaan Jepang",
      "Arkeologi",
      "Sejarah",
      "Antropologi Budaya",
      "Pariwisata",
      "Bahasa dan Sastra Indonesia",
    ],
  },
  {
    nama: "Fakultas Ilmu Sosial dan Ilmu Politik",
    prodi: [
      "Ilmu Politik",
      "Sosiologi",
      "Komunikasi",
      "Ilmu Hubungan Internasional",
      "Manajemen dan Kebijakan Publik",
      "Pembangunan Sosial dan Kesejahteraan",
    ],
  },
  {
    nama: "Fakultas Psikologi",
    prodi: ["Psikologi"],
  },
  {
    nama: "Fakultas Filsafat",
    prodi: ["Filsafat"],
  },
  {
    nama: "Fakultas Geografi",
    prodi: [
      "Geografi dan Ilmu Lingkungan",
      "Kartografi dan Penginderaan Jauh",
      "Pembangunan Wilayah",
    ],
  },
  {
    nama: "Sekolah Vokasi",
    prodi: [
      "Teknologi Rekayasa Perangkat Lunak",
      "Teknologi Rekayasa Elektro",
      "Teknologi Rekayasa Instrumentasi dan Kontrol",
      "Teknologi Rekayasa Mesin",
      "Teknologi Rekayasa Kimia",
      "Teknik Pengelolaan dan Pemeliharaan Infrastruktur Sipil",
      "Manajemen dan Penilaian Properti",
      "Akuntansi Sektor Publik",
      "Manajemen Informasi",
      "Pengelolaan Arsip dan Rekaman Informasi",
      "Bahasa Inggris",
      "Bahasa Jepang",
      "Pengembangan Produk Agroindustri",
      "Pengelolaan Hutan",
      "Perkebunan",
      "Agribisnis",
      "Paramedik Veteriner",
      "Fisioterapi",
      "Radiologi",
      "Rekam Medis",
    ],
  },
]

export const allFakultas = fakultasUGM.map((f) => f.nama)

export function getProdiByFakultas(fakultasNama: string): string[] {
  const f = fakultasUGM.find((f) => f.nama === fakultasNama)
  return f?.prodi ?? []
}
