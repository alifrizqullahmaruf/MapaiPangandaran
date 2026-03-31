import Image from "next/image"
import { Village } from "@/app/data/villages"
import SectionTitle from "@/components/ui/SectionTitle"

interface VillageOfficialsProps {
  village: Village
}

export default function VillageOfficials({ village }: VillageOfficialsProps) {
  const { kepalaDesa, kepalaDusun } = village.officials

  return (
    <section className="py-20 bg-gradient-to-br from-secondary to-primary">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-left items-start">Kepengurusan Desa</h2>
          <div className="h-1 w-12 bg-white/50 rounded-full  mt-3 text-left items-start"  />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          {/* Kepala Desa — left */}
          <div className="flex flex-col items-center">
            <div className="relative w-46 h-62">
              <Image
                src={kepalaDesa.image}
                alt={kepalaDesa.nama}
                fill
                className="object-cover rounded-3xl shadow-xl"
                sizes="224px"
              />
            </div>
            <div className="mt-4 bg-primary/80 backdrop-blur text-white rounded-2xl px-6 py-3 text-center border border-white/20 shadow-lg w-56">
              <p className="font-bold text-sm">{kepalaDesa.nama}</p>
              <p className="text-white/70 text-xs mt-0.5">{kepalaDesa.jabatan}</p>
            </div>
          </div>

          {/* Kepala Dusun grid — right */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {kepalaDusun.map((kd) => (
              <div
                key={kd.jabatan}
                className="flex items-center gap-3 bg-primary/70 backdrop-blur border border-white/20 rounded-2xl p-3"
              >
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={kd.image}
                    alt={kd.nama}
                    fill
                    className="object-cover rounded-xl"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{kd.nama}</p>
                  <p className="text-white/60 text-xs">{kd.jabatan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
