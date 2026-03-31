"use client"

import { useState, useCallback } from "react"
import Cropper from "react-easy-crop"

interface Area {
  x: number
  y: number
  width: number
  height: number
}

interface Props {
  imageSrc: string
  aspect: number // e.g. 16/9 or 3/4
  onCancel: () => void
  onConfirm: (blob: Blob) => void
}

async function getCroppedBlob(imageSrc: string, pixelCrop: Area): Promise<Blob> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.addEventListener("load", () => resolve(img))
    img.addEventListener("error", reject)
    img.src = imageSrc
  })

  const canvas = document.createElement("canvas")
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext("2d")!

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error("Canvas toBlob failed"))
    }, "image/jpeg", 0.9)
  })
}

export default function ImageCropModal({ imageSrc, aspect, onCancel, onConfirm }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [processing, setProcessing] = useState(false)

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  async function handleConfirm() {
    if (!croppedAreaPixels) return
    setProcessing(true)
    const blob = await getCroppedBlob(imageSrc, croppedAreaPixels)
    onConfirm(blob)
    setProcessing(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-text text-sm">Crop Gambar</h2>
          <p className="text-xs text-muted mt-0.5">Geser dan zoom untuk memilih area yang diinginkan</p>
        </div>

        {/* Crop area */}
        <div className="relative w-full bg-black" style={{ height: 340 }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* Zoom slider */}
        <div className="px-5 py-3 border-t border-border flex items-center gap-3">
          <span className="text-xs text-muted w-8">Zoom</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="flex-1 accent-primary"
          />
          <span className="text-xs text-muted w-8 text-right">{zoom.toFixed(1)}x</span>
        </div>

        {/* Actions */}
        <div className="px-5 py-4 border-t border-border flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-border text-text text-sm hover:bg-background/80 transition"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={processing}
            className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition disabled:opacity-60"
          >
            {processing ? "Memproses..." : "Gunakan Foto Ini"}
          </button>
        </div>
      </div>
    </div>
  )
}
