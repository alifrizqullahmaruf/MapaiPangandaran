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
        <SectionTitle title="Wilayah Desa" />
        <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: map image */}
          <div className="shrink-0 w-full lg:w-96">
            <Image
              src={village.maps[0]}
              alt={`Wilayah Desa ${village.name}`}
              width={600}
              height={400}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Right: description + chips */}
          <div className="flex flex-col gap-6">
            <p className="text-text text-base md:text-lg leading-relaxed">
              Desa {village.name} terbagi dalam {village.dusun.length} dusun dan berbatasan dengan desa-desa tetangga di Kecamatan Cijulang. Wilayah ini memiliki karakteristik alam yang mendukung sektor pertanian, perkebunan, dan potensi wisata lokal.
            </p>
            <div className="flex flex-wrap gap-3">
              {village.dusun.map((dusun) => (
                <span
                  key={dusun}
                  className="border border-primary text-primary rounded-full px-5 py-2.5 text-sm font-medium  cursor-default"
                >
                  {dusun}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
