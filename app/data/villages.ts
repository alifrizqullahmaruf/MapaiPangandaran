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
      "https://picsum.photos/seed/kertayasa1/800/500",
      "https://picsum.photos/seed/kertayasa2/800/500",
      "https://picsum.photos/seed/kertayasa3/800/500",
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
        { nama: "Bpk. Sujarwo", jabatan: "Kepala Dusun Karangpaci", image: "https://picsum.photos/seed/kadus1/200/200" },
        { nama: "Bpk. Hendra", jabatan: "Kepala Dusun Bantarkawung", image: "https://picsum.photos/seed/kadus2/200/200" },
        { nama: "Bpk. Yusuf", jabatan: "Kepala Dusun Bugel", image: "https://picsum.photos/seed/kadus3/200/200" },
        { nama: "Bpk. Asep", jabatan: "Kepala Dusun Tenjolaya", image: "https://picsum.photos/seed/kadus4/200/200" },
        { nama: "Bpk. Wahyu", jabatan: "Kepala Dusun Cibuluh", image: "https://picsum.photos/seed/kadus5/200/200" },
        { nama: "Bpk. Dadan", jabatan: "Kepala Dusun Merjan", image: "https://picsum.photos/seed/kadus6/200/200" },
        { nama: "Bpk. Ridwan", jabatan: "Kepala Dusun Margaluyu", image: "https://picsum.photos/seed/kadus7/200/200" },
      ],
    },
    highlights: [
      {
        title: "Milangkala Desa",
        description:
          "Milangkala Desa, yang diperingati setiap tanggal 12 Juli, merupakan perayaan hari jadi desa dan menjadi momen penting untuk mengenang sejarah berdirinya desa sekaligus memperkuat rasa kebersamaan. Kegiatan ini biasanya diisi dengan kesenian tradisional, doa bersama, serta kegiatan sosial dan hiburan yang melibatkan seluruh lapisan masyarakat.",
        image: "https://picsum.photos/seed/milangkala/800/500",
      },
      {
        title: "Green Canyon",
        description:
          "Green Canyon atau Cukang Taneuh adalah objek wisata alam ikonik di Desa Kertayasa. Aliran sungai hijau yang membelah tebing batu kapur menciptakan pemandangan yang memukau. Wisatawan dapat menikmati perjalanan perahu menyusuri sungai dan berenang di kolam alami yang jernih.",
        image: "https://picsum.photos/seed/greencanyon/800/500",
      },
      {
        title: "Budidaya Ikan Air Tawar",
        description:
          "Potensi sungai dan irigasi yang melimpah menjadikan Desa Kertayasa cocok untuk budidaya ikan air tawar seperti nila, lele, dan mas. Kelompok tani ikan desa aktif mengembangkan usaha ini sebagai sumber pendapatan alternatif yang menjanjikan.",
        image: "https://picsum.photos/seed/budidayaikan/800/500",
      },
      {
        title: "Kesenian Tradisional",
        description:
          "Desa Kertayasa masih menjaga kelestarian seni tradisional seperti calung, wayang golek, dan jaipongan. Grup kesenian desa rutin tampil pada perayaan hari besar dan acara adat, menjaga warisan budaya Sunda tetap hidup di tengah modernisasi.",
        image: "https://picsum.photos/seed/kesenian/800/500",
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
      "https://picsum.photos/seed/batukaras1/800/500",
      "https://picsum.photos/seed/batukaras2/800/500",
      "https://picsum.photos/seed/batukaras3/800/500",
    ],
    dusun: [
      "Dusun Batukaras",
      "Dusun Legokjawa",
      "Dusun Ciparay",
      "Dusun Ciawitali",
      "Dusun Ciharuman",
    ],
    officials: {
      kepalaDesa: {
        nama: "H. Ade Kusnadi",
        jabatan: "Kepala Desa Batukaras",
        image: "https://picsum.photos/seed/kadesbatukaras/300/400",
      },
      kepalaDusun: [
        { nama: "Bpk. Tarya", jabatan: "Kepala Dusun Batukaras", image: "https://picsum.photos/seed/bkadus1/200/200" },
        { nama: "Bpk. Surya", jabatan: "Kepala Dusun Legokjawa", image: "https://picsum.photos/seed/bkadus2/200/200" },
        { nama: "Bpk. Nanang", jabatan: "Kepala Dusun Ciparay", image: "https://picsum.photos/seed/bkadus3/200/200" },
        { nama: "Bpk. Ujang", jabatan: "Kepala Dusun Ciawitali", image: "https://picsum.photos/seed/bkadus4/200/200" },
        { nama: "Bpk. Ending", jabatan: "Kepala Dusun Ciharuman", image: "https://picsum.photos/seed/bkadus5/200/200" },
      ],
    },
    highlights: [
      {
        title: "Pantai Batukaras",
        description:
          "Pantai Batukaras terkenal dengan ombaknya yang tenang dan berpasir putih bersih, menjadikannya salah satu pantai terbaik di Pangandaran. Pengunjung dapat menikmati berenang, berselancar, atau sekadar bersantai menikmati sunset yang memukau.",
        image: "https://picsum.photos/seed/pantai/800/500",
      },
      {
        title: "Festival Nelayan",
        description:
          "Festival Nelayan yang digelar setiap tahun merupakan ungkapan rasa syukur masyarakat nelayan Batukaras atas hasil laut yang melimpah. Acara ini dimeriahkan dengan lomba perahu hias, pertunjukan seni, dan ritual adat melarung sesaji ke laut.",
        image: "https://picsum.photos/seed/festivalnelayan/800/500",
      },
      {
        title: "Surfing Batukaras",
        description:
          "Ombak di Batukaras dikenal ramah bagi peselancar pemula hingga mahir. Setiap tahun, desa ini menjadi tuan rumah kompetisi surfing regional yang menarik peserta dari berbagai penjuru Indonesia. Beberapa sekolah surfing lokal siap memandu wisatawan yang ingin belajar.",
        image: "https://picsum.photos/seed/surfing/800/500",
      },
      {
        title: "Kuliner Seafood Lokal",
        description:
          "Batukaras surga kuliner seafood segar. Warung-warung di tepi pantai menyajikan ikan bakar, cumi goreng, dan kepiting bumbu khas Pangandaran dengan harga terjangkau. Ikan yang disajikan merupakan hasil tangkapan nelayan lokal di pagi hari yang sama.",
        image: "https://picsum.photos/seed/seafood/800/500",
      },
    ],
    prokerSlugs: ["konservasi-terumbu-karang", "posyandu-balita-batukaras", "pemetaan-wisata-batukaras"],
  },
]

export function getVillage(id: string): Village | undefined {
  return villages.find((v) => v.id === id)
}
