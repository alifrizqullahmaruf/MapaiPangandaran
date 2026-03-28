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
    slug: "pupuk-guano-kelelawar",
    title: "Pupuk Guano: Potensi Ekonomi dari Feses Kelelawar untuk Usaha Berkelanjutan",
    excerpt:
      "Timbunan guano di gua-gua sekitar Desa Kertayasa ternyata menyimpan potensi besar sebagai pupuk organik berkualitas tinggi yang dapat meningkatkan pendapatan masyarakat.",
    category: "Pertanian",
    village: "kertayasa",
    kluster: "AGRO",
    author: {
      nama: "Desy Wulandari",
      image: "/picture/Desy Wulandari.png",
      jabatan: "KORMASIT KY 2",
    },
    cover: "https://picsum.photos/seed/guano/1200/600",
    body: [
      "Desa Kertayasa memiliki potensi alam yang luar biasa, salah satunya adalah keberadaan gua-gua kapur yang menjadi habitat ribuan kelelawar. Selama ini, feses kelelawar atau yang dikenal sebagai guano hanya dianggap sebagai limbah yang tidak berguna oleh masyarakat setempat.",
      "Tim KKN Klaster Agronomi Mapai Pangandaran melakukan serangkaian edukasi dan pelatihan kepada warga Desa Kertayasa mengenai pengolahan guano menjadi pupuk organik berkualitas tinggi. Kandungan nitrogen, fosfor, dan kalium yang tinggi dalam guano menjadikannya alternatif pupuk yang ramah lingkungan sekaligus bernilai ekonomi.",
      "Dalam program kerja ini, tim bekerja sama dengan Kelompok Tani Sari Bumi untuk melakukan uji coba pengomposan guano dengan bahan tambahan seperti sekam padi dan dedak. Hasilnya menunjukkan bahwa pupuk guano olahan dapat meningkatkan hasil panen sayuran lokal hingga 30 persen dibandingkan tanpa pemupukan.",
      "Selain aspek teknis pertanian, tim juga mendampingi warga dalam proses pengemasan dan pemasaran pupuk guano. Dengan label yang menarik dan strategi pemasaran melalui media sosial, produk ini berhasil menarik minat pembeli dari luar kecamatan Cijulang.",
      "Program ini diharapkan menjadi cikal bakal usaha berkelanjutan yang dikelola oleh BUMDes Guha Bau Desa Kertayasa. Potensi gua yang sebelumnya tidak dimanfaatkan kini menjadi sumber pendapatan baru yang ramah lingkungan dan berkesinambungan bagi masyarakat desa.",
    ],
    date: "2025-08-10",
    related: ["revitalisasi-pojok-baca", "pelatihan-digital-umkm", "konservasi-terumbu-karang"],
  },
  {
    slug: "revitalisasi-pojok-baca",
    title: "Revitalisasi Pojok Baca di SD Negeri 1 Kertayasa",
    excerpt:
      "Tim KKN Mapai Pangandaran membenahi pojok baca yang terbengkalai di SD Negeri 1 Kertayasa menjadi ruang literasi yang menarik dan nyaman bagi siswa.",
    category: "Literasi",
    village: "kertayasa",
    kluster: "SOSHUM",
    author: {
      nama: "Fatimah Azzahra",
      image: "/picture/Fatimah Azzahra.png",
      jabatan: "Anggota",
    },
    cover: "https://picsum.photos/seed/pojokbaca/1200/600",
    body: [
      "Budaya membaca di kalangan siswa sekolah dasar di Desa Kertayasa masih perlu ditingkatkan. Melihat kondisi pojok baca di SD Negeri 1 Kertayasa yang penuh debu dan kurang diminati, tim KKN Klaster Sosial Humaniora Mapai Pangandaran tergerak untuk melakukan revitalisasi.",
      "Proses revitalisasi dimulai dengan pembersihan dan pengecatan ulang rak buku yang sudah usang. Tim kemudian menata ulang koleksi buku dengan sistem pengelompokan berdasarkan genre dan usia pembaca, sehingga siswa lebih mudah menemukan buku yang sesuai dengan minat mereka.",
      "Selain pembenahan fisik, tim juga menggelar program Jam Membaca Ceria setiap Selasa dan Kamis. Dalam sesi ini, anggota tim bergantian membacakan cerita kepada siswa kelas 1 hingga 3, sementara siswa kelas atas didampingi untuk membaca mandiri dan membuat ringkasan.",
      "Donasi buku dari berbagai pihak, termasuk dari mahasiswa dan alumni UGM, berhasil menambah koleksi pojok baca hingga lebih dari 200 eksemplar baru. Buku-buku tersebut mencakup cerita rakyat nusantara, buku sains populer, dan buku aktivitas anak.",
      "Antusiasme siswa terlihat nyata. Dalam dua minggu pertama setelah revitalisasi, pojok baca dikunjungi rata-rata oleh 40 siswa setiap harinya. Guru-guru SD Negeri 1 Kertayasa berkomitmen untuk melanjutkan program literasi ini setelah masa KKN berakhir.",
    ],
    date: "2025-08-18",
    related: ["pupuk-guano-kelelawar", "pelatihan-digital-umkm", "posyandu-balita-batukaras"],
  },
  {
    slug: "pelatihan-digital-umkm",
    title: "Pelatihan Literasi Digital untuk UMKM Desa Kertayasa",
    excerpt:
      "Sebanyak 25 pelaku UMKM Desa Kertayasa mengikuti pelatihan memasarkan produk secara online melalui marketplace dan media sosial yang dipandu tim KKN Saintek.",
    category: "Teknologi",
    village: "kertayasa",
    kluster: "SAINTEK",
    author: {
      nama: "Alif Rizqullah Maruf",
      image: "/picture/Alif Rizqullah.png",
      jabatan: "KORMANIT",
    },
    cover: "https://picsum.photos/seed/digitalumkm/1200/600",
    body: [
      "Di era digital ini, kemampuan memasarkan produk secara online menjadi kunci keberhasilan UMKM. Namun di Desa Kertayasa, banyak pelaku usaha kecil yang belum memanfaatkan platform digital karena keterbatasan pengetahuan dan kepercayaan diri.",
      "Tim KKN Klaster Sains dan Teknologi Mapai Pangandaran menyelenggarakan Pelatihan Literasi Digital UMKM selama tiga hari di Balai Desa Kertayasa. Sebanyak 25 peserta yang merupakan pelaku usaha mikro dan kecil antusias mengikuti setiap sesi pelatihan.",
      "Materi pelatihan mencakup cara membuat akun toko di platform Shopee dan Tokopedia, teknik fotografi produk menggunakan smartphone, penulisan deskripsi produk yang menarik, serta pengelolaan media sosial Instagram untuk promosi usaha.",
      "Peserta yang menonjol adalah Ibu Sartini, pemilik usaha keripik singkong rumahan yang langsung berhasil mengunggah produknya ke Shopee pada hari kedua pelatihan. Dalam waktu seminggu, Ibu Sartini mendapat pesanan pertamanya dari pembeli di Bandung.",
      "Tim juga membentuk grup WhatsApp sebagai wadah konsultasi pasca pelatihan. Anggota tim siap membantu peserta yang mengalami kesulitan teknis selama masa KKN berlangsung. Diharapkan pelatihan ini menjadi awal dari transformasi digital UMKM Desa Kertayasa.",
    ],
    date: "2025-08-25",
    related: ["pupuk-guano-kelelawar", "revitalisasi-pojok-baca", "pemetaan-wisata-batukaras"],
  },
  {
    slug: "konservasi-terumbu-karang",
    title: "Edukasi Konservasi Terumbu Karang di Pesisir Batukaras",
    excerpt:
      "Tim KKN bersama nelayan lokal melakukan penanaman terumbu karang buatan dan sosialisasi pentingnya menjaga ekosistem laut di perairan Desa Batukaras.",
    category: "Lingkungan",
    village: "batukaras",
    kluster: "AGRO",
    author: {
      nama: "Prasasti Rektaning Soebekti",
      image: "/picture/Prasasti Rektaning.png",
      jabatan: "Anggota",
    },
    cover: "https://picsum.photos/seed/terumbu/1200/600",
    body: [
      "Perairan Batukaras dikenal memiliki keindahan bawah laut yang memukau. Namun aktivitas penangkapan ikan yang tidak ramah lingkungan dan dampak perubahan iklim mengancam keberlangsungan terumbu karang di wilayah ini.",
      "Tim KKN Klaster Agronomi Mapai Pangandaran menginisiasi program edukasi dan aksi nyata konservasi terumbu karang. Bekerjasama dengan Kelompok Nelayan Batukaras dan Dinas Kelautan Kabupaten Pangandaran, tim merancang program transplantasi terumbu karang buatan.",
      "Sebanyak 50 unit terumbu karang buatan dari bahan ramah lingkungan berhasil ditanam di titik-titik strategis perairan Batukaras. Nelayan lokal dilibatkan aktif dalam proses penanaman dan diberi pemahaman mengenai pentingnya menjaga zona konservasi.",
      "Selain aksi lapangan, tim juga menggelar sosialisasi di sekolah-sekolah dan balai desa tentang ekosistem laut dan cara menjaga kelestariannya. Anak-anak di Batukaras diajak membuat poster kreatif tentang laut yang kemudian dipajang di sepanjang jalan utama desa.",
      "Program ini mendapat respons positif dari masyarakat dan pemerintah desa. Kepala Desa Batukaras berkomitmen untuk mengajukan anggaran konservasi laut dalam APBDes tahun berikutnya, sebagai kelanjutan dari program yang dimulai oleh tim KKN.",
    ],
    date: "2025-08-12",
    related: ["posyandu-balita-batukaras", "pemetaan-wisata-batukaras", "pupuk-guano-kelelawar"],
  },
  {
    slug: "posyandu-balita-batukaras",
    title: "Revitalisasi Posyandu Balita dan Lansia Desa Batukaras",
    excerpt:
      "Tim KKN Medika mendampingi kader posyandu dalam meningkatkan layanan kesehatan balita dan lansia di Desa Batukaras melalui pelatihan dan penyediaan alat kesehatan.",
    category: "Kesehatan",
    village: "batukaras",
    kluster: "MEDIKA",
    author: {
      nama: "Fira Natalin Omega Difa",
      image: "/picture/Fira Natalin.png",
      jabatan: "KORMATER",
    },
    cover: "https://picsum.photos/seed/posyandu/1200/600",
    body: [
      "Posyandu merupakan ujung tombak pelayanan kesehatan dasar di tingkat desa. Namun posyandu di Desa Batukaras menghadapi tantangan berupa keterbatasan alat ukur kesehatan dan minimnya pelatihan bagi kader posyandu.",
      "Tim KKN Klaster Medika Mapai Pangandaran hadir untuk mendampingi dan memperkuat posyandu di Desa Batukaras. Program dimulai dengan asesmen kondisi posyandu, termasuk inventarisasi alat yang tersedia dan wawancara dengan kader dan bidan desa.",
      "Berdasarkan hasil asesmen, tim mengadakan pelatihan bagi 12 kader posyandu mengenai cara pengukuran antropometri yang benar, interpretasi KMS (Kartu Menuju Sehat), dan deteksi dini tanda-tanda gizi buruk pada balita.",
      "Tim juga mengorganisir kegiatan posyandu gabungan balita dan lansia dengan menghadirkan tenaga medis dari Puskesmas Cijulang. Lebih dari 60 balita dan 40 lansia terlayani dalam satu hari kegiatan, termasuk pemeriksaan tekanan darah, gula darah, dan konsultasi gizi.",
      "Sebagai bentuk keberlanjutan, tim menyerahkan satu set alat ukur anthropometri baru dan lembar panduan pemantauan tumbuh kembang kepada posyandu. Kader posyandu kini lebih percaya diri dan terampil dalam menjalankan tugasnya.",
    ],
    date: "2025-08-20",
    related: ["konservasi-terumbu-karang", "pemetaan-wisata-batukaras", "revitalisasi-pojok-baca"],
  },
  {
    slug: "pemetaan-wisata-batukaras",
    title: "Pemetaan Potensi Wisata Digital Desa Batukaras",
    excerpt:
      "Tim KKN Saintek membuat peta wisata digital interaktif Desa Batukaras yang memuat informasi lengkap objek wisata, kuliner lokal, dan akomodasi untuk mendukung pariwisata.",
    category: "Teknologi",
    village: "batukaras",
    kluster: "SAINTEK",
    author: {
      nama: "Shyra Athaya",
      image: "/picture/Shyra Athaya.png",
      jabatan: "KORMASIT BK 2",
    },
    cover: "https://picsum.photos/seed/wisatadigital/1200/600",
    body: [
      "Desa Batukaras memiliki kekayaan wisata yang luar biasa: pantai berpasir putih, ombak yang disukai peselancar, kuliner seafood segar, dan kerajinan tangan lokal yang unik. Sayangnya, informasi mengenai potensi ini belum terdokumentasi dengan baik dan mudah diakses wisatawan.",
      "Tim KKN Klaster Saintek Mapai Pangandaran mengambil inisiatif untuk membuat peta wisata digital Desa Batukaras yang komprehensif. Selama dua minggu, tim melakukan survei lapangan ke seluruh penjuru desa untuk mendokumentasikan setiap titik wisata, kuliner, penginapan, dan fasilitas umum.",
      "Data yang terkumpul mencakup lebih dari 30 titik lokasi, masing-masing dilengkapi dengan foto, deskripsi, jam operasional, dan kisaran harga. Informasi ini kemudian diunggah ke platform Google My Maps yang dapat diakses secara gratis oleh siapa pun.",
      "Selain peta digital, tim juga membantu pelaku wisata lokal dalam membuat konten media sosial yang menarik. Workshop fotografi wisata digelar untuk pemilik homestay dan warung makan agar mereka dapat mempromosikan usahanya secara mandiri.",
      "Hasilnya, peta wisata digital Batukaras berhasil diakses oleh lebih dari 500 pengguna dalam dua minggu pertama peluncurannya. Beberapa wisatawan mengaku menemukan informasi tentang homestay tersembunyi di pedalaman desa melalui peta tersebut, yang sebelumnya tidak pernah mereka ketahui.",
    ],
    date: "2025-08-28",
    related: ["konservasi-terumbu-karang", "posyandu-balita-batukaras", "pelatihan-digital-umkm"],
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
