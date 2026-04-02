"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  const isLogin = pathname === "/admin/login"
  if (isLogin) return <>{children}</>

  const tabs = [
    { href: "/admin", label: "Proker & Artikel" },
    { href: "/admin/tim", label: "Tim" },
  ]

  function isActive(tab: { href: string }) {
    return tab.href === "/admin"
      ? pathname === "/admin" || pathname.startsWith("/admin/artikel")
      : pathname.startsWith(tab.href)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="bg-surface border-b border-border px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="font-heading text-2xl text-primary">Mapai</span>

          {/* Nav tabs — desktop only */}
          <nav className="hidden sm:flex items-center gap-1">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(tab)
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:text-text"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop right actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/" className="text-sm text-muted hover:text-text transition">
            ← Lihat Website
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1.5 rounded-lg border border-border text-muted hover:text-text hover:border-text transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile burger */}
        <button
          className="sm:hidden p-2 rounded-lg text-muted hover:text-text hover:bg-background transition"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sm:hidden bg-surface border-b border-border px-4 py-3 flex flex-col gap-1">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(tab)
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:text-text hover:bg-background"
              }`}
            >
              {tab.label}
            </Link>
          ))}
          <div className="border-t border-border mt-2 pt-2 flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2.5 rounded-lg text-sm text-muted hover:text-text hover:bg-background transition"
            >
              ← Lihat Website
            </Link>
            <button
              onClick={handleLogout}
              className="text-left px-4 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      <main className="flex-1">{children}</main>
    </div>
  )
}
