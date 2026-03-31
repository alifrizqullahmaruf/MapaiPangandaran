"use client"

import Image from "next/image"
import { useState } from "react"
import { Village } from "@/app/data/villages"

interface VillageHighlightsProps {
  village: Village
}

export default function VillageHighlights({ village }: VillageHighlightsProps) {
  const [current, setCurrent] = useState(0)
  const highlights = village.highlights
  const slide = highlights[current]

  const prev = () => setCurrent((c) => (c - 1 + highlights.length) % highlights.length)
  const next = () => setCurrent((c) => (c + 1) % highlights.length)

  return (
    <section className="py-20 bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-text text-center mb-10">
          Ada Apa di Desa {village.name}?
        </h2>

        <div className="relative border-2 border-border rounded-3xl overflow-hidden bg-surface">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[320px]">
            {/* Image */}
            <div className="relative h-56 md:h-auto min-h-[280px]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Text */}
            <div className="p-10 flex flex-col justify-center">
              <div className=" rounded-2xl p-6">
                <h3 className="text-xl font-bold text-text mb-3">{slide.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{slide.description}</p>
              </div>

              {/* Dots */}
              <div className="flex gap-2 mt-6 justify-center md:justify-start">
                {highlights.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current ? "bg-primary w-6" : "bg-border"
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Prev / Next */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center shadow-sm hover:bg-background transition-colors z-10"
            aria-label="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke="#C65A11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center shadow-sm hover:bg-background transition-colors z-10"
            aria-label="Next"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="#C65A11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
