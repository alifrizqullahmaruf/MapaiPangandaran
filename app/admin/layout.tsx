"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="bg-surface border-b border-border px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <span className="font-heading text-2xl text-primary">Mapai</span>

          {/* Nav tabs */}
          <nav className="flex items-center gap-1">
            {tabs.map((tab) => {
              const active =
                tab.href === "/admin"
                  ? pathname === "/admin" || pathname.startsWith("/admin/artikel")
                  : pathname.startsWith(tab.href)
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:text-text"
                  }`}
                >
                  {tab.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-sm text-muted hover:text-text transition"
          >
            ← Lihat Website
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1.5 rounded-lg border border-border text-muted hover:text-text hover:border-text transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  )
}
