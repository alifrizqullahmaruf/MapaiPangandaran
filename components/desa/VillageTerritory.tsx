import Image from "next/image"
import { Village } from "@/app/data/villages"
import SectionTitle from "@/components/ui/SectionTitle"

interface VillageTerritoryProps {
  village: Village
}

export default function VillageTerritory({ village }: VillageTerritoryProps) {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left: text + image */}
          <div className="lg:col-span-1">
            <SectionTitle title="Wilayah Desa" />
            <p className="text-muted mt-4 text-sm leading-relaxed">
              Desa {village.name} terbagi dalam {village.dusun.length} dusun dan berbatasan dengan desa-desa tetangga di Kecamatan Cijulang. Wilayah ini memiliki karakteristik alam yang mendukung sektor pertanian, perkebunan, dan potensi wisata lokal.
            </p>
            <div className="relative mt-6 h-52 rounded-2xl overflow-hidden">
              <Image
                src={village.photos[0]}
                alt={`Wilayah Desa ${village.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
          </div>

          {/* Right: dusun chips */}
          <div className="lg:col-span-2 flex flex-wrap gap-3 content-start pt-2 lg:pt-14">
            {village.dusun.map((dusun) => (
              <span
                key={dusun}
                className="border border-primary text-primary rounded-full px-5 py-2.5 text-sm font-medium hover:bg-primary hover:text-white transition-colors cursor-default"
              >
                {dusun}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
