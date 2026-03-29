export interface Article {
  slug: string
  title: string
  excerpt: string
  category: string
  village: "kertayasa" | "batukaras"
  kluster: "SAINTEK" | "SOSHUM" | "AGRO" | "MEDIKA"
  author: {
    nama: string
    image: string
    jabatan: string
  }
  cover: string
  body: string[]
  date: string
  related: string[]
}

export const articles: Article[] = [
  {
    slug: "klub-baca-pena",
    title: "Klub Baca PENA: Gerbang Literasi Anak SD",
    excerpt:
      "Tim KKN Mapai Pangandaran mendirikan Klub Baca PENA sebagai ruang literasi kreatif bagi siswa sekolah dasar untuk menumbuhkan minat baca sejak dini.",
    category: "Literasi",
    village: "kertayasa",
    kluster: "SOSHUM",
    author: {
      nama: "Alif Rizqullah Maruf",
      image: "/picture/Alif Rizqullah.png",
      jabatan: "KORMANIT",
    },
    cover: "https://picsum.photos/seed/klubbacapena/1200/600",
    body: [
      "Minat baca anak-anak di Desa Kertayasa masih tergolong rendah. Banyak siswa lebih memilih bermain gadget daripada membuka buku. Melihat kondisi ini, tim KKN Mapai Pangandaran berinisiatif mendirikan Klub Baca PENA (Pembaca Anak) sebagai upaya nyata mendekatkan anak-anak dengan dunia literasi.",
      "Klub Baca PENA hadir sebagai ruang yang menyenangkan dan inklusif bagi siswa kelas 1 hingga 6 sekolah dasar. Setiap pertemuan diisi dengan kegiatan membaca bersama, diskusi cerita, dan lomba mendongeng yang dipandu oleh anggota tim KKN secara bergantian.",
      "Program ini mendapat sambutan luar biasa dari pihak sekolah dan orang tua siswa. Kepala SDN 1 Kertayasa mengizinkan ruang kelas digunakan setiap Sabtu pagi sebagai tempat pertemuan rutin Klub Baca PENA. Dalam waktu singkat, lebih dari 50 siswa mendaftarkan diri sebagai anggota.",
      "Untuk memperkaya koleksi bacaan, tim melakukan penggalangan donasi buku dari berbagai komunitas literasi. Hasilnya, lebih dari 150 judul buku baru berhasil dikumpulkan, mulai dari buku cerita bergambar, komik edukasi, hingga ensiklopedia anak yang menarik dan informatif.",
      "Keberlanjutan Klub Baca PENA dirancang sejak awal dengan melibatkan guru-guru dan orang tua sebagai penggerak komunitas. Tim juga menyusun panduan operasional klub agar kegiatan literasi ini dapat terus berjalan mandiri setelah masa KKN berakhir.",
    ],
    date: "2025-08-12",
    related: ["website-pariwisata-desa", "pelatihan-desain-canva", "pelatihan-microsoft-office"],
  },
  {
    slug: "website-pariwisata-desa",
    title: "Build/maintenance website pariwisata desa",
    excerpt:
      "Tim KKN Saintek membangun dan mengelola website pariwisata resmi Desa Batukaras sebagai media promosi digital destinasi wisata lokal kepada wisatawan dari berbagai penjuru.",
    category: "Teknologi",
    village: "batukaras",
    kluster: "SAINTEK",
    author: {
      nama: "Alif Rizqullah Maruf",
      image: "/picture/Alif Rizqullah.png",
      jabatan: "KORMANIT",
    },
    cover: "https://picsum.photos/seed/websitedesa/1200/600",
    body: [
      "Desa Batukaras dikenal sebagai salah satu destinasi wisata unggulan di Pangandaran dengan pantai yang indah dan ombak yang sempurna untuk berselancar. Namun potensi besar ini belum didukung oleh kehadiran digital yang memadai, sehingga banyak informasi wisata yang tersebar tidak terstruktur di media sosial.",
      "Tim KKN Klaster Saintek Mapai Pangandaran mengambil langkah konkret dengan membangun website pariwisata resmi Desa Batukaras. Website ini dirancang sebagai sumber informasi terpusat yang memuat profil desa, daftar destinasi wisata, paket wisata, penginapan, kuliner lokal, serta galeri foto dan video.",
      "Proses pembangunan website melibatkan koordinasi intensif dengan pemerintah desa dan pelaku wisata setempat. Tim melakukan survei lapangan untuk mendokumentasikan setiap spot wisata, kemudian mengolahnya menjadi konten yang informatif dan menarik secara visual.",
      "Selain membangun dari nol, tim juga melatih dua orang staf desa sebagai admin website yang bertugas memperbarui konten secara berkala. Pelatihan mencakup cara mengunggah artikel, mengelola galeri foto, dan merespons pertanyaan dari pengunjung website.",
      "Sejak diluncurkan, website pariwisata Desa Batukaras berhasil menarik ribuan kunjungan dalam bulan pertamanya. Beberapa pengelola homestay melaporkan peningkatan reservasi yang signifikan berkat informasi yang kini mudah ditemukan secara online oleh calon wisatawan.",
    ],
    date: "2025-08-15",
    related: ["klub-baca-pena", "sosialisasi-financial-planning", "pelatihan-desain-canva"],
  },
  {
    slug: "sosialisasi-financial-planning",
    title: "Sosialisasi Financial Planing Untuk Generasi Muda",
    excerpt:
      "Tim KKN Mapai Pangandaran menggelar sosialisasi perencanaan keuangan bagi remaja dan pemuda desa untuk membekali mereka dengan literasi finansial sejak dini.",
    category: "Ekonomi",
    village: "kertayasa",
    kluster: "SOSHUM",
    author: {
      nama: "Alif Rizqullah Maruf",
      image: "/picture/Alif Rizqullah.png",
      jabatan: "KORMANIT",
    },
    cover: "https://picsum.photos/seed/financialplanning/1200/600",
    body: [
      "Rendahnya literasi keuangan di kalangan generasi muda menjadi permasalahan yang umum ditemui di daerah pedesaan. Banyak remaja yang belum memiliki kebiasaan menabung dan tidak memahami pentingnya perencanaan keuangan untuk masa depan mereka.",
      "Tim KKN Mapai Pangandaran menyelenggarakan Sosialisasi Financial Planning yang ditujukan bagi pemuda dan remaja Desa Kertayasa. Kegiatan ini dihadiri oleh lebih dari 40 peserta yang terdiri dari siswa SMA, mahasiswa, dan pemuda karang taruna setempat.",
      "Materi sosialisasi dikemas secara interaktif dan mudah dipahami, mencakup konsep dasar pengelolaan uang, perbedaan antara kebutuhan dan keinginan, cara membuat anggaran bulanan sederhana, serta pengenalan instrumen investasi yang aman bagi pemula seperti tabungan dan reksa dana.",
      "Sesi tanya jawab berlangsung sangat antusias. Para peserta aktif berbagi pengalaman dan permasalahan keuangan yang mereka hadapi sehari-hari. Tim juga membagikan buku kerja perencanaan keuangan sederhana yang dapat langsung dipraktikkan oleh peserta.",
      "Kegiatan ini diakhiri dengan tantangan menabung selama 30 hari yang disepakati bersama oleh seluruh peserta. Grup WhatsApp dibentuk sebagai sarana saling memotivasi dan berbagi progres. Diharapkan kebiasaan merencanakan keuangan ini menjadi gaya hidup positif yang tumbuh di kalangan generasi muda desa.",
    ],
    date: "2025-08-20",
    related: ["klub-baca-pena", "website-pariwisata-desa", "pelatihan-desain-canva"],
  },
  {
    slug: "pelatihan-desain-canva",
    title: "Pelatihan Desain Canva untuk Perangkat dan UMKM",
    excerpt:
      "Tim KKN Saintek melatih perangkat desa dan pelaku UMKM dalam menggunakan aplikasi Canva untuk menciptakan konten visual yang profesional dan menarik secara mandiri.",
    category: "Teknologi",
    village: "batukaras",
    kluster: "SAINTEK",
    author: {
      nama: "Alif Rizqullah Maruf",
      image: "/picture/Alif Rizqullah.png",
      jabatan: "KORMANIT",
    },
    cover: "https://picsum.photos/seed/pelatihancanva/1200/600",
    body: [
      "Kemampuan membuat konten visual yang menarik kini menjadi kebutuhan penting bagi perangkat desa maupun pelaku UMKM. Selama ini, banyak pengumuman desa dan promosi produk UMKM tampil seadanya karena keterbatasan akses terhadap desainer grafis profesional.",
      "Tim KKN Klaster Saintek Mapai Pangandaran menyelenggarakan pelatihan intensif penggunaan aplikasi Canva yang dihadiri oleh 30 peserta dari kalangan perangkat desa dan pelaku UMKM Desa Batukaras. Canva dipilih karena kemudahannya digunakan bahkan oleh pemula sekalipun.",
      "Pelatihan berlangsung selama dua hari penuh di Balai Desa Batukaras. Hari pertama difokuskan pada pengenalan antarmuka Canva, pemilihan template yang tepat, pengaturan elemen desain, dan tipografi dasar. Hari kedua peserta langsung mempraktikkan pembuatan desain untuk kebutuhan nyata mereka masing-masing.",
      "Hasilnya sangat memuaskan. Perangkat desa berhasil membuat banner pengumuman dan poster kegiatan desa yang tampak profesional, sementara pelaku UMKM mampu merancang kemasan produk, katalog menu, dan konten promosi untuk media sosial mereka.",
      "Setelah pelatihan, tim memberikan akun Canva Pro gratis selama satu tahun kepada kantor desa agar seluruh perangkat dapat terus berkreasi. Buku panduan penggunaan Canva dalam bahasa Indonesia yang disusun oleh tim juga dibagikan kepada setiap peserta sebagai referensi belajar mandiri.",
    ],
    date: "2025-08-23",
    related: ["website-pariwisata-desa", "pelatihan-microsoft-office", "sosialisasi-financial-planning"],
  },
  {
    slug: "pelatihan-microsoft-office",
    title: "Pelatihan Microsoft word dan Microsoft excel",
    excerpt:
      "Tim KKN Mapai Pangandaran mengadakan pelatihan Microsoft Word dan Excel bagi perangkat desa dan warga untuk meningkatkan kompetensi administrasi dan pengelolaan data secara digital.",
    category: "Teknologi",
    village: "kertayasa",
    kluster: "SAINTEK",
    author: {
      nama: "Alif Rizqullah Maruf",
      image: "/picture/Alif Rizqullah.png",
      jabatan: "KORMANIT",
    },
    cover: "https://picsum.photos/seed/microsoftoffice/1200/600",
    body: [
      "Administrasi desa yang rapi dan terdigitalisasi merupakan fondasi tata kelola pemerintahan desa yang baik. Namun kenyataannya, banyak perangkat Desa Kertayasa yang masih mengerjakan surat-menyurat dan pencatatan data secara manual karena kurang familiar dengan perangkat lunak perkantoran.",
      "Menjawab kebutuhan tersebut, tim KKN Mapai Pangandaran menyelenggarakan Pelatihan Microsoft Word dan Microsoft Excel selama tiga hari yang diikuti oleh 20 perangkat desa dan warga terpilih. Pelatihan dirancang secara berjenjang dari dasar hingga tingkat menengah.",
      "Pada sesi Microsoft Word, peserta mempelajari cara membuat surat resmi sesuai tata naskah dinas, mengatur format dokumen, membuat tabel sederhana, serta memanfaatkan fitur mail merge untuk surat massal. Praktik langsung dilakukan dengan menggunakan template surat yang umum digunakan oleh kantor desa.",
      "Sesi Microsoft Excel berfokus pada pembuatan tabel data kependudukan, penggunaan rumus-rumus dasar seperti SUM, AVERAGE, dan VLOOKUP, serta pembuatan grafik sederhana untuk pelaporan. Peserta juga dilatih membuat rekapitulasi data dengan format yang rapi dan mudah dibaca.",
      "Pelatihan ini mendapat apresiasi tinggi dari Kepala Desa Kertayasa yang langsung menyaksikan kemajuan perangkatnya. Seluruh peserta mendapat sertifikat keikutsertaan dan modul pelatihan sebagai bahan belajar lanjutan. Diharapkan kompetensi digital perangkat desa ini berdampak pada peningkatan kualitas pelayanan kepada masyarakat.",
    ],
    date: "2025-08-30",
    related: ["pelatihan-desain-canva", "sosialisasi-financial-planning", "klub-baca-pena"],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getRelatedArticles(slugs: string[]): Article[] {
  return slugs
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter((a): a is Article => a !== undefined)
}
