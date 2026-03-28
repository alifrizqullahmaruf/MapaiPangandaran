# Brainstorm: Mapai Pangandaran Landing Page

**Date:** 2026-03-28
**Status:** Ready for planning

---

## What We're Building

A warm, editorial, and professional landing page website for **Mapai Pangandaran** — a KKN (community service) team from Universitas Gadjah Mada serving in Desa Kertayasa and Desa Batukaras, Kecamatan Cijulang, Kabupaten Pangandaran, Jawa Barat.

The site introduces the team, the two villages, the cluster program divisions, and the work programs (proker) carried out during the KKN period.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@theme` in CSS, no config file) |
| Animation | Framer Motion (to be installed) |
| Runtime | React 19 |

> **Important:** Next.js 16 and Tailwind v4 have breaking changes from training data. Read `node_modules/next/dist/docs/` before writing routing or image code. Tailwind v4 uses `@import "tailwindcss"` and `@theme {}` — no `tailwind.config.js` needed.

---

## Pages & Routes

| Route | Description |
|---|---|
| `/` | Homepage: hero, artikel highlights, quote, cluster profiles |
| `/desa/kertayasa` | Desa Kertayasa profile |
| `/desa/batukaras` | Desa Batukaras profile |
| `/artikel/[slug]` | Article / proker detail |
| `/tim` | All 29 team members, filterable by klaster or divisi |

---

## Design System

### Color Palette (defined in `@theme` block)

```css
--color-background: #F5F0EA;
--color-surface:    #FFF8F1;
--color-primary:    #C65A11;
--color-secondary:  #E8A15B;
--color-accent:     #D4A339;
--color-text:       #1F1F1F;
--color-muted:      #6E6A67;
--color-border:     #D8B8A0;
```

### Typography

- **Pacifico** — brand title "Mapai Pangandaran" only (via `next/font/google`)
- **Poppins** — all other text (via `next/font/google`)

### Visual Language

- Rounded corners: `rounded-2xl` / `rounded-3xl` on images
- Buttons: `rounded-full`
- Whitespace: generous section padding (`py-20` to `py-24`)
- Max content width: `max-w-screen-xl` (~1280px), centered
- Border: thin `border-border` (`#D8B8A0`)
- Shadow: `shadow-sm` to `shadow-md`

---

## Logo Assets

Two files available in `/public/`:

| File | Usage |
|---|---|
| `Logo-icon.png` | Navbar (compact, left side) |
| `Logo-panjang.png` | Footer (wider horizontal layout) |

---

## Photo Strategy

- **Hero, desa, artikel images:** Placeholder via `picsum.photos` or solid colored blocks with labels — easy to swap when real photos are ready
- **Team member portraits:** Already available at `/picture/[name].png` for all 29 members

---

## Component Architecture

### Shared / Layout
- `Navbar` — sticky, logo-left, nav links, hamburger mobile menu
- `Footer` — logo-panjang, team name, location, copyright

### Homepage (`/`)
- `HeroSection` — full-bleed background, gradient overlay, Pacifico title, 2 CTA buttons
- `ArticleHighlights` — 1 large card left + 3 small cards right (5-column grid)
- `QuoteSection` — gradient orange bg, large coordinator photo left, quote right
- `ClusterGrid` — 4 large cards: SAINTEK, SOSHUM, AGRO, MEDIKA

### Desa Pages (`/desa/[slug]`)
- `VillageHero` — large title + 3 top photos
- `VillageDescription` — rich text with bold highlights
- `VillageTerritory` — text + image + dusun button chips
- `VillageOfficials` — orange bg, kepala desa photo left, dusun heads grid right
- `VillageHighlights` — slider/carousel "Ada Apa di Desa X?"
- `ProkerGrid` — grid of proker cards for that village

### Article (`/artikel/[slug]`)
- `ArticleHeader` — back button, title, author info with photo, cluster badge
- `ArticleBody` — cover image + long-form prose typography
- `RelatedArticles` — grid of 3 related article cards

### Team (`/tim`)
- `TeamGrid` — 29 member cards with photo, name, jabatan, divisi, instagram
- Filter tabs by `Kluster` (SAINTEK, SOSHUM, AGRO, MEDIKA) or `Divisi`

### Reusable Atoms
- `SectionTitle` — bold heading with optional subtitle
- `ArticleCard` — used in highlights and related articles
- `ClusterCard` — 4 cluster cards on homepage

---

## Data Layer

All content stored in `app/data/`:

| File | Contents |
|---|---|
| `data-tim.json` | 29 team members (already exists) |
| `articles.ts` | Dummy articles/proker with slug, title, category, village, author, cover, body |
| `villages.ts` | Kertayasa and Batukaras profile data, dusun list, officials, highlights |
| `clusters.ts` | 4 cluster definitions with name, description, image |

---

## Key Decisions

1. **Tailwind v4 — CSS-first config.** All design tokens go in `app/globals.css` under `@theme {}`. No `tailwind.config.js`. Utility classes reference tokens directly (e.g., `bg-primary`, `text-muted`).

2. **Next.js `next/font/google` for fonts.** Both Pacifico and Poppins loaded via `next/font/google` in `layout.tsx`, injected as CSS variables (`--font-pacifico`, `--font-poppins`), then applied in `@theme`.

3. **`/tim` page added.** The 29 members in `data-tim.json` have full data + photos ready. Build a filterable grid page since assets exist.

4. **Logo-icon.png for navbar, Logo-panjang.png for footer.** Use `next/image` with proper `alt` text and `width`/`height`.

5. **Framer Motion for animations.** Install `framer-motion`. Use `motion.div` with `initial/animate/whileInView` — fade + slide only, no heavy transitions.

6. **Image placeholders via picsum.photos.** Until real photos are supplied, use `https://picsum.photos/seed/[name]/[w]/[h]` with consistent seeds per article/section. Swap with `next/image` pointing to `/public/images/` when ready.

7. **Article slugs are dummy.** Generate 5–6 realistic dummy articles split between Kertayasa and Batukaras with realistic proker titles.

---

## Resolved Questions

- ✅ Logo exists: `Logo-icon.png` + `Logo-panjang.png` in `/public/`
- ✅ Photos: Use placeholders for now, real photos added later
- ✅ `/tim` page: Yes, include with filter by klaster
- ✅ Framer Motion: Install and use minimally
