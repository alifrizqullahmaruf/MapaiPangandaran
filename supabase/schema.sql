-- ============================================================
-- MAPAI PANGANDARAN — Supabase Schema
-- Jalankan file ini di Supabase Dashboard > SQL Editor
-- ============================================================

-- Tabel articles (program kerja / artikel)
create table if not exists articles (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  excerpt     text,
  category    text,
  village     text check (village in ('kertayasa', 'batukaras')),
  kluster     text check (kluster in ('SAINTEK', 'SOSHUM', 'AGRO', 'MEDIKA')),
  author_nama text,
  author_image text,
  author_jabatan text,
  cover       text,
  body        text[],         -- array of paragraphs
  date        date,
  related     text[],         -- array of slugs
  created_at  timestamptz default now()
);

-- Tabel team_members
create table if not exists team_members (
  id          uuid primary key default gen_random_uuid(),
  nama        text not null,
  kluster     text check (kluster in ('SAINTEK', 'SOSHUM', 'AGRO', 'MEDIKA')),
  fakultas    text,
  prodi       text,
  divisi      text,
  jabatan     text,
  instagram   text,
  image       text,
  angkatan    text default '2022',
  created_at  timestamptz default now()
);

-- Row Level Security — baca bebas, tulis hanya via service key
alter table articles enable row level security;
alter table team_members enable row level security;

create policy "Public read articles"
  on articles for select using (true);

create policy "Public read team_members"
  on team_members for select using (true);

-- Untuk insert/update/delete dari admin, gunakan service key
-- atau buat policy khusus dengan auth

-- ============================================================
-- SEED DATA — Articles
-- ============================================================
insert into articles (slug, title, excerpt, category, village, kluster, author_nama, author_image, author_jabatan, cover, body, date, related) values
(
  'klub-baca-pena',
  'Klub Baca PENA: Gerbang Literasi Anak SD',
  'Tim KKN Mapai Pangandaran mendirikan Klub Baca PENA sebagai ruang literasi kreatif bagi siswa sekolah dasar.',
  'Literasi', 'kertayasa', 'SOSHUM',
  'Alif Rizqullah Maruf', '/picture/Alif Rizqullah.png', 'KORMANIT',
  'https://picsum.photos/seed/klubbacapena/1200/600',
  ARRAY['Minat baca anak-anak di Desa Kertayasa masih tergolong rendah.', 'Klub Baca PENA hadir sebagai ruang yang menyenangkan bagi siswa.'],
  '2025-08-12',
  ARRAY['website-pariwisata-desa', 'pelatihan-desain-canva']
),
(
  'website-pariwisata-desa',
  'Build/maintenance website pariwisata desa',
  'Tim KKN Saintek membangun website pariwisata resmi Desa Batukaras sebagai media promosi digital.',
  'Teknologi', 'batukaras', 'SAINTEK',
  'Alif Rizqullah Maruf', '/picture/Alif Rizqullah.png', 'KORMANIT',
  'https://picsum.photos/seed/websitedesa/1200/600',
  ARRAY['Desa Batukaras dikenal sebagai destinasi wisata unggulan di Pangandaran.', 'Tim KKN Saintek membangun website pariwisata resmi.'],
  '2025-08-15',
  ARRAY['klub-baca-pena', 'pelatihan-desain-canva']
)
on conflict (slug) do nothing;
