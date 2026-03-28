---
title: "feat: Build Mapai Pangandaran Landing Page"
type: feat
status: completed
date: 2026-03-28
origin: docs/brainstorms/2026-03-28-mapai-landing-page-brainstorm.md
---

# feat: Build Mapai Pangandaran Landing Page

## Overview

Build a full landing page website for the KKN team "Mapai Pangandaran" using Next.js 16 App Router, TypeScript, Tailwind CSS v4, and Motion (formerly Framer Motion). The site introduces the team, two villages (Kertayasa & Batukaras), cluster profiles, and work programs.

**Pages:** `/` (homepage), `/desa/kertayasa`, `/desa/batukaras`, `/artikel/[slug]`, `/tim`

---

## Critical Technical Context

> These are verified facts from Next.js 16 docs and framework research — do not rely on training data.

### Next.js 16 Breaking Changes

1. **`params` is now a `Promise`** — dynamic routes receive `props.params` as `Promise<{slug: string}>`. Must `await props.params` in server components, or use React `use(props.params)` in client components.
   ```tsx
   // CORRECT for /artikel/[slug]/page.tsx
   export default async function Page(props: { params: Promise<{ slug: string }> }) {
     const { slug } = await props.params
   }
   ```

2. **Turbopack is the default bundler** — `next dev` and `next build` both use Turbopack. No `webpack` config in `next.config.ts`.

3. **`next lint` is removed** — use `eslint` directly if linting is needed.

4. **`cookies()` and `headers()` are async** — not relevant for this project (no auth), but noted.

### Tailwind v4 Configuration

- **No `tailwind.config.js/ts`** — never create one. All tokens live in `app/globals.css`.
- **`@theme inline`** — use for CSS variables that reference runtime-injected values (i.e., `next/font` variables). They must be `inline` so Tailwind emits `var(--…)` references instead of resolving at build time.
- **`@theme` (without inline)** — use for static values (hex colors, numeric values).
- Token namespaces that auto-generate utilities:
  - `--color-*` → `bg-*`, `text-*`, `border-*`, `ring-*`
  - `--font-*` → `font-*` (font-family)

### Motion Package

- **Install `motion`**, not `framer-motion`. Import from `motion/react`.
  ```bash
  npm install motion
  ```
  ```tsx
  import { motion } from "motion/react"
  ```
- Every component file using `motion.*` must have `"use client"` at the top.

### Fonts

- Pacifico is **single-weight only** — pass `weight: '400'` as a string, not an array.
- Both fonts loaded via `next/font/google` in `layout.tsx`, exposed as CSS variables.
- Bridged to Tailwind via `@theme inline` in `globals.css`.

---

## File Structure

```
app/
├── layout.tsx                          # Replace: load Pacifico + Poppins fonts
├── globals.css                         # Replace: full design token system
├── page.tsx                            # Replace: Homepage
├── desa/
│   ├── kertayasa/
│   │   └── page.tsx                    # Desa Kertayasa profile page
│   └── batukaras/
│       └── page.tsx                    # Desa Batukaras profile page
├── artikel/
│   └── [slug]/
│       └── page.tsx                    # Article detail (async params!)
├── tim/
│   └── page.tsx                        # Full team page
└── data/
    ├── data-tim.json                   # Already exists (29 members)
    ├── articles.ts                     # New: article/proker data
    ├── villages.ts                     # New: village profile data
    └── clusters.ts                     # New: cluster definitions

components/
├── layout/
│   ├── Navbar.tsx                      # "use client" (hamburger state)
│   └── Footer.tsx                      # Server component
├── home/
│   ├── HeroSection.tsx                 # "use client" (motion animations)
│   ├── ArticleHighlights.tsx           # Server component
│   ├── QuoteSection.tsx                # "use client" (motion)
│   └── ClusterGrid.tsx                 # "use client" (motion)
├── desa/
│   ├── VillageHero.tsx                 # Server component
│   ├── VillageDescription.tsx          # Server component
│   ├── VillageTerritory.tsx            # Server component
│   ├── VillageOfficials.tsx            # Server component (orange bg)
│   ├── VillageHighlights.tsx           # "use client" (carousel state)
│   └── ProkerGrid.tsx                  # Server component
├── artikel/
│   ├── ArticleHeader.tsx               # Server component
│   ├── ArticleBody.tsx                 # Server component
│   └── RelatedArticles.tsx             # Server component
├── tim/
│   └── TeamGrid.tsx                    # "use client" (filter state)
└── ui/
    ├── SectionTitle.tsx                # Reusable heading block
    ├── ArticleCard.tsx                 # Used in highlights + related
    └── ClusterCard.tsx                 # Used in ClusterGrid
```

---

## Data Layer

### `app/data/articles.ts`

TypeScript interface and 6 dummy articles (3 Kertayasa, 3 Batukaras):

```ts
export interface Article {
  slug: string
  title: string
  excerpt: string
  category: string          // "Pertanian" | "Literasi" | "Kesehatan" | "Teknologi"
  village: "kertayasa" | "batukaras"
  kluster: "SAINTEK" | "SOSHUM" | "AGRO" | "MEDIKA"
  author: {
    nama: string
    image: string           // /picture/[name].png
    jabatan: string
  }
  cover: string             // picsum URL e.g. "https://picsum.photos/seed/proker1/1200/600"
  body: string[]            // array of paragraphs
  date: string              // "2025-08-15"
  related: string[]         // slugs of 3 related articles
}

export const articles: Article[] = [ /* 6 entries */ ]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}
```

**Dummy articles (realistic KKN proker topics):**

| Slug | Title | Village | Kluster |
|---|---|---|---|
| `pupuk-guano-kelelawar` | Pupuk Guano: Potensi Ekonomi dari Feses Kelelawar untuk Usaha Berkelanjutan | kertayasa | AGRO |
| `revitalisasi-pojok-baca` | Revitalisasi Pojok Baca di SD Negeri 1 Kertayasa | kertayasa | SOSHUM |
| `pelatihan-digital-umkm` | Pelatihan Literasi Digital untuk UMKM Desa Kertayasa | kertayasa | SAINTEK |
| `konservasi-terumbu-karang` | Edukasi Konservasi Terumbu Karang di Batukaras | batukaras | AGRO |
| `posyandu-balita-batukaras` | Revitalisasi Posyandu Balita dan Lansia Desa Batukaras | batukaras | MEDIKA |
| `pemetaan-wisata-batukaras` | Pemetaan Potensi Wisata Digital Desa Batukaras | batukaras | SAINTEK |

### `app/data/villages.ts`

```ts
export interface VillageOfficial {
  nama: string
  jabatan: string
  image: string   // picsum placeholder
}

export interface VillageHighlight {
  title: string
  description: string
  image: string   // picsum placeholder
}

export interface Village {
  id: "kertayasa" | "batukaras"
  name: string
  tagline: string
  description: string           // prose, uses **text** for bold highlights
  area: string                  // "1.355,61 Ha"
  population: number
  photos: [string, string, string]  // exactly 3 picsum URLs
  dusun: string[]
  officials: {
    kepalaDesa: VillageOfficial
    kepalaDusun: VillageOfficial[]
  }
  highlights: VillageHighlight[]
  prokerSlugs: string[]
}

export const villages: Village[] = [ /* kertayasa + batukaras */ ]

export function getVillage(id: string): Village | undefined {
  return villages.find(v => v.id === id)
}
```

**Kertayasa data:**
- Area: 1.355,61 Ha | Population: 4.124 jiwa
- Dusun: Karangpaci, Bantarkawung, Bugel, Tenjolaya, Cibuluh, Merjan, Margaluyu (7 dusun)
- Kepala Desa: Drs. Abdul Rohman
- Highlights: Milangkala Desa (12 Juli), Green Canyon, Budidaya Ikan, Kesenian Tradisional
- Proker slugs: `pupuk-guano-kelelawar`, `revitalisasi-pojok-baca`, `pelatihan-digital-umkm`

**Batukaras data:**
- Area: 823,4 Ha | Population: 3.812 jiwa
- Dusun: Batukaras, Legokjawa, Ciparay, Ciawitali, Ciharuman (5 dusun)
- Kepala Desa: H. Ade Kusnadi
- Highlights: Pantai Batukaras, Surfing, Festival Nelayan, Kesenian Calung
- Proker slugs: `konservasi-terumbu-karang`, `posyandu-balita-batukaras`, `pemetaan-wisata-batukaras`

### `app/data/clusters.ts`

```ts
export interface Cluster {
  id: "SAINTEK" | "SOSHUM" | "AGRO" | "MEDIKA"
  name: string
  description: string
  image: string     // picsum URL
  color: string     // Tailwind class for accent
}

export const clusters: Cluster[] = [
  { id: "SAINTEK", name: "Sains dan Teknologi", ... },
  { id: "SOSHUM",  name: "Sosial Humaniora",    ... },
  { id: "AGRO",    name: "Agronomi",             ... },
  { id: "MEDIKA",  name: "Medika",               ... },
]
```

---

## Implementation Phases

### Phase 1: Foundation Setup

**Files to modify:**

#### `app/globals.css` — Full replacement

```css
@import "tailwindcss";

/* Static design tokens — use plain @theme (not inline) */
@theme {
  --color-background: #F5F0EA;
  --color-surface:    #FFF8F1;
  --color-primary:    #C65A11;
  --color-secondary:  #E8A15B;
  --color-accent:     #D4A339;
  --color-text:       #1F1F1F;
  --color-muted:      #6E6A67;
  --color-border:     #D8B8A0;
}

/* Runtime font variables — MUST use @theme inline */
@theme inline {
  --font-heading: var(--font-pacifico);
  --font-body:    var(--font-poppins);
}

body {
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-poppins);
}
```

**Result:** Utility classes `bg-background`, `bg-surface`, `bg-primary`, `text-primary`, `text-muted`, `border-border`, `font-heading`, `font-body` are all available.

#### `app/layout.tsx` — Replace fonts

```tsx
import type { Metadata } from "next"
import { Pacifico, Poppins } from "next/font/google"
import "./globals.css"

const pacifico = Pacifico({
  weight: "400",          // single-weight — string, not array
  subsets: ["latin"],
  variable: "--font-pacifico",
  display: "swap",
})

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mapai Pangandaran — KKN UGM 2025",
  description: "Website resmi tim KKN Mapai Pangandaran di Desa Kertayasa dan Desa Batukaras, Kecamatan Cijulang, Kabupaten Pangandaran, Jawa Barat.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${pacifico.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col font-body">{children}</body>
    </html>
  )
}
```

#### Install Motion

```bash
npm install motion
```

---

### Phase 2: Data Files

Create all three data files in `app/data/` with realistic dummy content as specified in the Data Layer section above.

- `app/data/articles.ts` — 6 articles
- `app/data/villages.ts` — 2 villages (kertayasa + batukaras)
- `app/data/clusters.ts` — 4 clusters

Use `picsum.photos` with consistent seeds for images:
- `https://picsum.photos/seed/[slug]/1200/600` for article covers
- `https://picsum.photos/seed/[villageName][n]/800/500` for village photos
- `https://picsum.photos/seed/[clusterId]/600/400` for cluster photos
- `https://picsum.photos/seed/official[n]/200/200` for official portraits

---

### Phase 3: Shared UI Components

#### `components/ui/SectionTitle.tsx` — Server component

Props: `title: string`, `subtitle?: string`, `align?: "left" | "center"`

Renders a bold heading with optional subtitle and decorative accent line.

```tsx
// Example output structure:
// <div>
//   <h2 className="text-3xl font-bold text-text">Dari Mapai Pangandaran</h2>
//   <p className="text-muted">subtitle here</p>
// </div>
```

#### `components/ui/ArticleCard.tsx` — Server component

Two variants via `size` prop: `"large"` (tall card with full overlay) and `"small"` (horizontal thumbnail + text).

Props: `article: Article`, `size: "large" | "small"`

- Both variants: category badge (text-primary, border-primary), title bold, village badge (rounded-full bg-secondary/20 text-primary)
- Large: image fills card, text overlaid at bottom, `rounded-2xl`
- Small: 120px thumbnail left, text right

#### `components/ui/ClusterCard.tsx` — Server component

Props: `cluster: Cluster`

Full-height card with image background, dark gradient overlay at bottom, cluster name in all-caps bold white text. `rounded-2xl`. Hover effect handled via CSS (`group-hover`).

#### `components/layout/Navbar.tsx` — `"use client"` (hamburger menu state)

- Fixed/sticky at top, `bg-surface/95 backdrop-blur`
- Left: `Logo-icon.png` via `next/image` + "Mapai Pangandaran" text in `font-heading`
- Right: nav links — Beranda (`/`), Desa Kertayasa (`/desa/kertayasa`), Desa Batukaras (`/desa/batukaras`), Tim (`/tim`)
- Mobile: hamburger icon toggles dropdown menu
- Active link styling via `usePathname()`
- Height: ~64px, `border-b border-border`

#### `components/layout/Footer.tsx` — Server component

- Background `bg-primary` (burnt orange)
- `Logo-panjang.png` via `next/image` (white version or use `filter: brightness(0) invert(1)`)
- "Mapai Pangandaran" in `font-heading text-white`
- "Desa Kertayasa & Desa Batukaras, Kecamatan Cijulang, Kabupaten Pangandaran, Jawa Barat"
- Copyright line: `© 2025 Mapai Pangandaran. KKN UGM 2025.`

---

### Phase 4: Homepage (`app/page.tsx`)

#### `components/home/HeroSection.tsx` — `"use client"` (motion)

- Full-viewport height (`min-h-screen`)
- Background: `picsum.photos/seed/mapai-hero/1920/1080` as `next/image` fill object-cover
- Gradient overlay: `from-primary/70 via-primary/40 to-transparent` from bottom
- Center-aligned content:
  - `<h1>` in `font-heading` (~72px on desktop, 48px mobile) text-white: "Mapai Pangandaran"
  - Subtitle paragraph: "Website resmi Tim KKN Mapai Pangandaran..."
  - Two CTA buttons (both `rounded-full`):
    - Primary: `bg-primary text-white` → links to `#proker`
    - Outline: `border-2 border-white text-white` → links to `/desa/kertayasa`
- Motion: `initial={{ opacity:0, y:30 }}` `animate={{ opacity:1, y:0 }}` staggered

#### `components/home/ArticleHighlights.tsx` — Server component

- Section heading: "Dari Mapai Pangandaran" left, "Lihat Selengkapnya" button right (`rounded-full border border-primary text-primary`)
- Layout: 5-column grid on desktop (`grid-cols-5`), 2 cols on tablet, 1 col on mobile
  - Left 3 cols: 1 large `ArticleCard` (the featured article — first in list)
  - Right 2 cols: 3 stacked small `ArticleCard` components
- Show first 4 articles from `articles` array

#### `components/home/QuoteSection.tsx` — `"use client"` (motion)

- Full-width, gradient background `from-secondary to-primary` (warm orange)
- Two-column layout (desktop): left = large portrait photo, right = quote text
- Left: `next/image` of coordinator (`/picture/Alif Rizqullah.png`), `rounded-3xl`, slightly overflows top
- Right:
  - Large decorative `"` character in text-white/30 (top)
  - Quote text in white, italic, ~24px
  - Coordinator name bold: "Alif Rizqullah Maruf"
  - Title: "Kormanit Mapai Pangandaran 2025"
  - Large decorative `"` (bottom right)
- Motion: slide in from left/right

#### `components/home/ClusterGrid.tsx` — `"use client"` (motion)

- Section heading: "Profil Klaster"
- 4-column grid (desktop), 2-col (tablet), 2-col (mobile)
- Each `ClusterCard` links to `/tim?kluster=[id]`
- Motion: `whileInView` fade-up with stagger

#### `app/page.tsx` — Homepage assembly

```tsx
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import HeroSection from "@/components/home/HeroSection"
import ArticleHighlights from "@/components/home/ArticleHighlights"
import QuoteSection from "@/components/home/QuoteSection"
import ClusterGrid from "@/components/home/ClusterGrid"
import { articles } from "@/app/data/articles"
import { clusters } from "@/app/data/clusters"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ArticleHighlights articles={articles.slice(0, 4)} />
        <QuoteSection />
        <ClusterGrid clusters={clusters} />
      </main>
      <Footer />
    </>
  )
}
```

---

### Phase 5: Desa Pages

Both desa pages share the same component structure but receive different village data.

#### `app/desa/kertayasa/page.tsx` and `app/desa/batukaras/page.tsx`

Server components. Import `getVillage()` from data, pass to components.

#### `components/desa/VillageHero.tsx` — Server component

- Large centered title: "Desa" in `font-heading text-accent` + village name in `font-heading text-primary`
- 3 photos below in a grid: middle photo larger (`col-span-2`), flanked by two smaller (`col-span-1`)
- All images: `rounded-2xl`, use `village.photos[0,1,2]`

#### `components/desa/VillageDescription.tsx` — Server component

- Prose paragraph with `**bold**` markers rendered as `<strong className="text-primary">`
- Show: area, population, economic focus, location

#### `components/desa/VillageTerritory.tsx` — Server component

- Two-column layout: left = text + center photo (`rounded-2xl`), right = dusun chips
- Dusun chips: `border border-primary text-primary rounded-full px-4 py-2`
- Section heading: "Wilayah Desa"

#### `components/desa/VillageOfficials.tsx` — Server component

- Full-width, orange gradient background (`bg-gradient-to-br from-secondary to-primary`)
- Section heading centered: "Kepengurusan Desa"
- Two-column layout:
  - Left: Kepala Desa large photo (tall, `rounded-3xl`), name + title in box `bg-primary text-white rounded-2xl` below
  - Right: 2-column grid of kepala dusun cards — each card `bg-primary/80 rounded-2xl` with small photo, name, jabatan

#### `components/desa/VillageHighlights.tsx` — `"use client"` (carousel state)

- Bordered `rounded-3xl border-2 border-border` card containing the carousel
- Section title: "Ada Apa di Desa [Name]?"
- Each slide: image left + title + description right
- Prev/Next arrow buttons on sides (styled as circle `bg-white border border-border`)
- `useState` for current slide index, no external carousel library

#### `components/desa/ProkerGrid.tsx` — Server component

- Section heading: "Program Kerja"
- Grid of `ArticleCard` with size="small" for the village's proker articles
- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

---

### Phase 6: Article Detail (`/artikel/[slug]`)

#### `app/artikel/[slug]/page.tsx`

```tsx
// CRITICAL: params is a Promise in Next.js 16
export default async function ArticlePage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const article = getArticleBySlug(slug)
  if (!article) notFound()
  // ...
}

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}
```

#### `components/artikel/ArticleHeader.tsx` — Server component

- Back button: `← Kembali` (`rounded-full bg-primary text-white`) — `"use client"` for `router.back()` or just `<Link href="/">`
- Title: `text-4xl font-bold text-text` (max ~3 lines)
- Author info: avatar image `rounded-full`, nama bold, jabatan muted, village badge
- Cluster badge: `rounded-full border border-primary text-primary px-3 py-1`

#### `components/artikel/ArticleBody.tsx` — Server component

- Cover image full-width `rounded-2xl`
- Body paragraphs: `text-text leading-relaxed text-lg space-y-6`
- Max-width container `max-w-3xl mx-auto` (narrower for readability)

#### `components/artikel/RelatedArticles.tsx` — Server component

- Section heading: "Artikel Terkait"
- 3-column grid of `ArticleCard size="small"`

---

### Phase 7: Tim Page (`/tim`)

#### `app/tim/page.tsx`

Server component. Import `data-tim.json`. Pass to `TeamGrid`.

#### `components/tim/TeamGrid.tsx` — `"use client"` (filter state)

- Page title: "Tim Mapai Pangandaran" centered, `font-heading text-primary`
- Filter tabs: kluster buttons (ALL, SAINTEK, SOSHUM, AGRO, MEDIKA) `rounded-full`
  - Active: `bg-primary text-white`
  - Inactive: `border border-border text-muted hover:border-primary`
- Grid: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6`
- Member card: `bg-surface rounded-2xl border border-border p-4`
  - Portrait image `rounded-xl w-full aspect-square object-cover`
  - Name bold, Jabatan text-primary text-sm, Divisi + Kluster muted text-xs
  - Instagram link (if not empty): `@handle` text-primary text-xs
- Filter uses `useState<string>("ALL")`, filters `data-tim` array client-side

---

## Responsive Design

| Breakpoint | Navbar | Hero | Article Highlights | Cluster Grid | Tim Grid |
|---|---|---|---|---|---|
| Mobile (<640px) | Hamburger | Centered, 48px font | 1 column | 2 columns | 2 columns |
| Tablet (640-1024px) | Full links | Centered, 60px font | 2 columns | 2 columns | 3 columns |
| Desktop (>1024px) | Full links | Centered, 72px font | 5-col split | 4 columns | 4-5 columns |

---

## Acceptance Criteria

### Foundation
- [ ] Pacifico and Poppins fonts load via `next/font/google` with CSS variables
- [ ] All 8 design tokens defined in `@theme` in `globals.css`
- [ ] `font-heading` and `font-body` Tailwind classes work
- [ ] `bg-primary`, `text-primary`, `bg-surface`, etc. all work
- [ ] `motion` package installed from `npm install motion`

### Data Layer
- [ ] `articles.ts` exports 6 articles with correct TypeScript types
- [ ] `villages.ts` exports 2 village objects with correct structure
- [ ] `clusters.ts` exports 4 cluster objects
- [ ] `getArticleBySlug()` helper works correctly
- [ ] `getVillage()` helper works correctly

### Homepage
- [ ] Navbar sticky, logo visible, all 4 links work, hamburger works on mobile
- [ ] Hero section fills viewport, gradient overlay, Pacifico title visible
- [ ] Both CTA buttons render and link correctly
- [ ] Article highlights show 1 large + 3 small cards
- [ ] Quote section shows coordinator photo + quote on orange gradient
- [ ] Cluster grid shows 4 cards with images

### Desa Pages
- [ ] `/desa/kertayasa` and `/desa/batukaras` both render without error
- [ ] Village title shows correctly
- [ ] 3 photos render in correct layout
- [ ] 7 dusun chips render for Kertayasa, 5 for Batukaras
- [ ] Officials section shows kepala desa + kepala dusun list
- [ ] Carousel arrows navigate between highlights
- [ ] Proker grid shows village-specific articles

### Article Detail
- [ ] `/artikel/[slug]` renders for all 6 article slugs
- [ ] `await props.params` pattern used (no synchronous params access)
- [ ] `generateStaticParams()` exported
- [ ] `notFound()` called for unknown slugs
- [ ] Back button, author info, cover image, body, related articles all render

### Tim Page
- [ ] `/tim` shows all 29 members with correct photos
- [ ] Filter tabs filter by kluster correctly
- [ ] "ALL" tab shows all 29 members
- [ ] Portrait images use existing `/picture/[name].png` paths

### Quality
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No broken image links (all `next/image` have valid src + alt)
- [ ] Mobile layout renders cleanly at 375px viewport
- [ ] No console errors on any page

---

## Dependencies & Risks

| Risk | Mitigation |
|---|---|
| `params` sync access breaks Next.js 16 | Always `await props.params` in dynamic routes |
| `framer-motion` instead of `motion` | Only install `motion` package |
| `@theme` vs `@theme inline` confusion | Static hex values → `@theme`, next/font vars → `@theme inline` |
| `tailwind.config.js` accidentally created | Do not create — v4 is CSS-first |
| Pacifico weight as array | Use `weight: "400"` (string), not array |
| picsum.photos in production | Acceptable for now; real photos swap in by updating URLs in data files |
| Logo images not visible | Use `next/image` with explicit `width` and `height` props |

---

## Sources & References

### Origin
- **Brainstorm document:** [docs/brainstorms/2026-03-28-mapai-landing-page-brainstorm.md](../brainstorms/2026-03-28-mapai-landing-page-brainstorm.md)
- Key decisions carried forward: CSS-first Tailwind v4 tokens, `motion` package (not framer-motion), `/tim` page with 29 member filter grid

### Internal References
- Team data: [app/data/data-tim.json](../../app/data/data-tim.json)
- Logo icon: `public/Logo-icon.png`
- Logo wide: `public/Logo-panjang.png`
- Member portraits: `public/picture/*.png` (29 files)
- Current layout: [app/layout.tsx](../../app/layout.tsx)
- Current styles: [app/globals.css](../../app/globals.css)

### External References
- Next.js 16 upgrade guide: `node_modules/next/dist/docs/` (local)
- Motion docs: https://motion.dev/docs/react-installation
- Tailwind v4 `@theme`: https://tailwindcss.com/blog/tailwindcss-v4
- next/font + Tailwind v4 bridge: https://www.buildwithmatija.com/blog/how-to-use-custom-google-fonts-in-next-js-15-and-tailwind-v4
