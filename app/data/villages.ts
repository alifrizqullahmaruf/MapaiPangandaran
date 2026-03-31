export interface VillageOfficial {
  nama: string
  jabatan: string
  image: string
}

export interface VillageHighlight {
  title: string
  description: string
  image: string
}

export interface Village {
  id: "kertayasa" | "batukaras"
  name: string
  tagline: string
  description: string
  area: string
  population: number
  photos: [string, string, string]
  maps: string[]
  dusun: string[]
  officials: {
    kepalaDesa: VillageOfficial
    kepalaDusun: VillageOfficial[]
  }
  highlights: VillageHighlight[]
  prokerSlugs: string[]
}

export const villages: Village[] = [
  {
    id: "kertayasa",
    name: "Kertayasa",
    tagline: "Desa Wisata dengan Potensi Alam dan Budaya yang Kaya",
    description:
      "Desa Wisata Kertayasa memiliki luas **1.355,61 Ha** dengan penduduk **4.124 jiwa**. Perekonomiannya bertumpu pada pertanian, budidaya ikan, dan pariwisata alam, terutama **Green Canyon**. Melalui BUMDes Guha Bau yang resmi berdiri sejak 2013, desa ini terus mengembangkan pariwisata berkelanjutan guna menjaga aset wilayah sekaligus meningkatkan ekonomi masyarakat. Desa Kertayasa terletak di Kecamatan Cijulang, Kabupaten Pangandaran, Jawa Barat, berbatasan langsung dengan kawasan hutan lindung dan aliran Sungai Cijulang.",
    area: "1.355,61 Ha",
    population: 4124,
    photos: [
      "/desa/kertayasa/Kesenian.png",
      "/desa/kertayasa/Canyon.png",
      "/desa/kertayasa/Guano.jpg",
    ],
    maps: [
      "/desa/kertayasa/Map.png",
    ],
    dusun: [
      "Dusun Karangpaci",
      "Dusun Bantarkawung",
      "Dusun Bugel",
      "Dusun Tenjolaya",
      "Dusun Cibuluh",
      "Dusun Merjan",
      "Dusun Margaluyu",
    ],
    officials: {
      kepalaDesa: {
        nama: "Drs. Abdul Rohman",
        jabatan: "Kepala Desa Kertayasa",
        image: "/desa/kertayasa/Kades.png",
      },
      kepalaDusun: [
        { nama: "Bpk. Koidin", jabatan: "Kepala Dusun Karangpaci", image: "/desa/kertayasa/Olog-Karangpaci.png" },
        { nama: "Bpk. Dadang", jabatan: "Kepala Dusun Bantarkawung", image: "/desa/kertayasa/Olog-Bantarkawung.png" },
        { nama: "Bpk. Yayat", jabatan: "Kepala Dusun Bugel", image: "https://picsum.photos/seed/kadus3/200/200" },
        { nama: "Bpk. Abdul", jabatan: "Kepala Dusun Tenjolaya", image: "/desa/kertayasa/Olog-Tenjolaya.png" },
        { nama: "Bpk. Adi Suryadi", jabatan: "Kepala Dusun Cibuluh", image: "/desa/kertayasa/Olog-Cibuluh.png" },
        { nama: "Bpk. Didin", jabatan: "Kepala Dusun Merjan", image: "/desa/kertayasa/Olog-Merjan.png" },
        { nama: "Bpk. Rasid", jabatan: "Kepala Dusun Margaluyu", image: "https://picsum.photos/seed/kadus7/200/200" },
      ],
    },
    highlights: [
      {
        title: "Milangkala Desa",
        description:
          "Milangkala Desa, yang diperingati setiap tanggal 12 Juli, merupakan perayaan hari jadi desa dan menjadi momen penting untuk mengenang sejarah berdirinya desa sekaligus memperkuat rasa kebersamaan. Kegiatan ini biasanya diisi dengan kesenian tradisional, doa bersama, serta kegiatan sosial dan hiburan yang melibatkan seluruh lapisan masyarakat.",
        image: "/desa/kertayasa/Milangkala.png",
      },
      {
        title: "Green Canyon",
        description:
          "Green Canyon atau Cukang Taneuh adalah objek wisata alam ikonik di Desa Kertayasa. Aliran sungai hijau yang membelah tebing batu kapur menciptakan pemandangan yang memukau. Wisatawan dapat menikmati perjalanan perahu menyusuri sungai dan berenang di kolam alami yang jernih.",
        image: "/desa/kertayasa/Green.png",
      },
      {
        title: "Curug Taringgul",
        description:
          "Curug Taringgul adalah objek wisata alam yang terletak di Desa Kertayasa. Air terjun alami dengan aliran sungai menjadikannya destinasi yang populer untuk melakukan body rafting dan wisata petualangan alam.",
        image: "/desa/kertayasa/Curug.png",
      },
      {
        title: "Kesenian Tradisional",
        description:
          "Desa Kertayasa masih menjaga kelestarian seni tradisional seperti calung, badud, dan benjang bathok. Grup kesenian desa rutin tampil pada perayaan hari besar dan acara adat, menjaga warisan budaya Sunda tetap hidup di tengah modernisasi.",
        image: "/desa/kertayasa/Badud.jpeg",
      },
    ],
    prokerSlugs: ["pupuk-guano-kelelawar", "revitalisasi-pojok-baca", "pelatihan-digital-umkm"],
  },
  {
    id: "batukaras",
    name: "Batukaras",
    tagline: "Desa Pesisir dengan Keindahan Pantai dan Kekayaan Bahari",
    description:
      "Desa Batukaras memiliki luas **823,4 Ha** dengan penduduk **3.812 jiwa**. Desa ini terletak di pesisir selatan Kecamatan Cijulang, Kabupaten Pangandaran, dan dikenal sebagai destinasi **surfing** kelas dunia sekaligus surganya wisata bahari. Perekonomian masyarakat didukung oleh sektor perikanan tangkap, pariwisata, dan usaha kerajinan tangan lokal. Keindahan **Pantai Batukaras** yang tenang dan ombaknya yang bersahabat menjadikan desa ini magnet bagi wisatawan domestik maupun mancanegara.",
    area: "823,4 Ha",
    population: 3812,
    photos: [
      "/desa/batukaras/Surfing2.png",
      "/desa/batukaras/Pantai2.png",
      "/desa/batukaras/Pantai3.png",
    ],
        maps: [
      "/desa/batukaras/Map.png",
    ],
    dusun: [
      "Dusun Batukaras",
      "Dusun Sanghiangkalang",
      "Dusun Cidahu",
      "Dusun Pasuketan",
      "Dusun Nagrog",
      "Dusun Mandala",
    ],
    officials: {
      kepalaDesa: {
        nama: "Hadi Somantri",
        jabatan: "Kepala Desa Batukaras",
        image: "/desa/batukaras/Kades.png",
      },
      kepalaDusun: [
        { nama: "Bpk. Amung", jabatan: "Kepala Dusun Batukaras", image: "https://picsum.photos/seed/bkadus1/200/200" },
        { nama: "Bpk. Toni", jabatan: "Kepala Dusun Sanghiangkalang", image: "https://picsum.photos/seed/bkadus2/200/200" },
        { nama: "Bpk. Suparlan", jabatan: "Kepala Dusun Cidahu", image: "https://picsum.photos/seed/bkadus3/200/200" },
        { nama: "Bpk. Ai Kustiwa", jabatan: "Kepala Dusun Pasuketan", image: "https://picsum.photos/seed/bkadus4/200/200" },
        { nama: "Bpk. Ending", jabatan: "Kepala Dusun Nagrog", image: "https://picsum.photos/seed/bkadus5/200/200" },
        { nama: "Bpk. Ending", jabatan: "Kepala Dusun Mandala", image: "https://picsum.photos/seed/bkadus6/200/200" },
      ],
    },
    highlights: [
      {
        title: "Pantai Batukaras",
        description:
          "Pantai Batukaras terkenal dengan ombaknya yang tenang dan berpasir putih bersih, menjadikannya salah satu pantai terbaik di Pangandaran. Pengunjung dapat menikmati berenang, berselancar, atau sekadar bersantai menikmati sunset yang memukau.",
        image: "/desa/batukaras/Pantai.png",
      },
      {
        title: "Syukuran Nelayan",
        description:
          "Syukuran Nelayan yang digelar setiap tahun merupakan ungkapan rasa syukur masyarakat nelayan Batukaras atas hasil laut yang melimpah. Acara ini dimeriahkan dengan lomba perahu hias, pertunjukan seni, dan ritual adat melarung sesaji ke laut.",
        image: "/desa/batukaras/Syukuran.png",
      },
      {
        title: "Surfing Batukaras",
        description:
          "Ombak di Batukaras dikenal ramah bagi peselancar pemula hingga mahir. Setiap tahun, desa ini menjadi tuan rumah kompetisi surfing regional yang menarik peserta dari berbagai penjuru Indonesia. Beberapa sekolah surfing lokal siap memandu wisatawan yang ingin belajar.",
        image: "/desa/batukaras/Surfing.png",
      },
    ],
    prokerSlugs: ["konservasi-terumbu-karang", "posyandu-balita-batukaras", "pemetaan-wisata-batukaras"],
  },
]

export function getVillage(id: string): Village | undefined {
  return villages.find((v) => v.id === id)
}
