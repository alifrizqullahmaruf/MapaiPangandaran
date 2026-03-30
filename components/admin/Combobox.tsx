"use client"

import { useState, useRef, useEffect } from "react"

interface ComboboxProps {
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder?: string
  label?: string
}

export default function Combobox({
  value,
  onChange,
  options,
  placeholder = "Ketik atau pilih...",
  label,
}: ComboboxProps) {
  const [query, setQuery] = useState(value)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Sync query with external value changes
  useEffect(() => {
    setQuery(value)
  }, [value])

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        // Commit typed value even if not in list
        if (query !== value) onChange(query)
      }
    }
    document.addEventListener("mousedown", handle)
    return () => document.removeEventListener("mousedown", handle)
  }, [query, value, onChange])

  const filtered = query
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
    : options

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-border bg-background text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"

  return (
    <div ref={ref} className="relative">
      {label && <label className="block text-sm font-medium text-text mb-1">{label}</label>}
      <input
        type="text"
        className={inputClass}
        value={query}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e) => {
          setQuery(e.target.value)
          onChange(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
      />

      {open && filtered.length > 0 && (
        <ul className="absolute z-30 mt-1 w-full bg-surface border border-border rounded-lg shadow-lg max-h-52 overflow-y-auto">
          {filtered.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()} // prevent blur before click
                onClick={() => {
                  setQuery(opt)
                  onChange(opt)
                  setOpen(false)
                }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-background transition ${
                  opt === value ? "text-primary font-medium" : "text-text"
                }`}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && query.length > 0 && filtered.length === 0 && (
        <div className="absolute z-30 mt-1 w-full bg-surface border border-border rounded-lg shadow px-3 py-2.5 text-sm text-muted">
          Tidak ada pilihan — nilai &quot;{query}&quot; akan digunakan.
        </div>
      )}
    </div>
  )
}
