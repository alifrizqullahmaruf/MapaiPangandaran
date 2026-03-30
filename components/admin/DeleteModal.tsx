"use client"

interface DeleteModalProps {
  open: boolean
  title: string
  description?: string
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteModal({
  open,
  title,
  description,
  loading,
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-surface rounded-2xl shadow-xl border border-border w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-150">
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto mb-4">
          <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>

        <h2 className="text-center font-bold text-text text-lg mb-1">Hapus Data</h2>
        <p className="text-center text-muted text-sm mb-1">
          Yakin ingin menghapus:
        </p>
        <p className="text-center font-semibold text-text text-sm mb-2 line-clamp-2">
          "{title}"
        </p>
        {description && (
          <p className="text-center text-muted text-xs mb-4">{description}</p>
        )}
        {!description && (
          <p className="text-center text-muted text-xs mb-4">
            Tindakan ini tidak dapat dibatalkan.
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl border border-border text-text text-sm font-medium hover:bg-background transition disabled:opacity-60"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition disabled:opacity-60"
          >
            {loading ? "Menghapus..." : "Ya, Hapus"}
          </button>
        </div>
      </div>
    </div>
  )
}
