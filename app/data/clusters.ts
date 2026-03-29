export interface Cluster {
  id: "SAINTEK" | "SOSHUM" | "AGRO" | "MEDIKA"
  name: string
  description: string
  image: string
}

export const clusters: Cluster[] = [
  {
    id: "SAINTEK",
    name: "Sains dan Teknologi",
    description:
      "Klaster Saintek berfokus pada penerapan teknologi dan inovasi digital untuk mendukung pemberdayaan masyarakat desa, pengembangan UMKM, dan pemetaan potensi wilayah.",
    image: "/clusters/Saintek.png",
  },
  {
    id: "SOSHUM",
    name: "Sosial Humaniora",
    description:
      "Klaster Soshum bergerak di bidang pendidikan, literasi, budaya, dan pemberdayaan sosial masyarakat dengan pendekatan humanis dan berbasis kearifan lokal.",
    image: "/clusters/Soshum.png",
  },
  {
    id: "AGRO",
    name: "Agronomi",
    description:
      "Klaster Agro mendampingi petani dan nelayan dalam mengoptimalkan hasil pertanian, perikanan, dan pengelolaan lingkungan hidup secara berkelanjutan.",
    image: "/clusters/Agro.png",
  },
  {
    id: "MEDIKA",
    name: "Medika",
    description:
      "Klaster Medika memberikan layanan dan edukasi kesehatan kepada masyarakat desa, mulai dari posyandu, penyuluhan gizi, hingga pemeriksaan kesehatan dasar.",
    image: "/clusters/Medika.png",
  },
]
