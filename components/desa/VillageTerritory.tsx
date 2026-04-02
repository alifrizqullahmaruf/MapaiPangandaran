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
              {village.name === "Kertayasa"
                ? "Sebagai jantung aktivitas wisata dan agraris, Desa Kertayasa mengintegrasikan 7 wilayah dusun. Lokasinya berbatasan langsung dengan Desa Margacinta (utara), Desa Batukaras (selatan), Desa Cijulang (timur), dan Desa Cibanten (barat)."
                : "Dikenal sebagai surga selancar, Desa Batukaras memiliki struktur wilayah unik yang mencakup 6 dusun. Letak geografisnya sangat strategis karena diapit oleh Desa Cijulang dan Masawah, serta berbatasan langsung dengan laut lepas di sisi timur dan Desa Kertayasa di sisi barat."}
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
