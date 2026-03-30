"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function AdminEditButton({ slug }: { slug: string }) {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => setIsAdmin(d.admin === true))
      .catch(() => {})
  }, [])

  if (!isAdmin) return null

  return (
    <Link
      href={`/admin/artikel/${slug}/edit`}
      className="absolute top-2 right-2 z-10 px-2 py-1 text-xs font-medium bg-primary text-white rounded-md opacity-80 hover:opacity-100 transition"
      onClick={(e) => e.stopPropagation()}
    >
      Edit
    </Link>
  )
}
