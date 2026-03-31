import { Village } from "@/app/data/villages"

interface VillageDescriptionProps {
  village: Village
}

function renderDescription(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-primary font-semibold">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export default function VillageDescription({ village }: VillageDescriptionProps) {
  return (
    <section className=" bg-background mx-auto">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-text text-base md:text-lg leading-relaxed ">
            {renderDescription(village.description)}
          </p>
          <div className="flex flex-wrap gap-6 mt-6 justify-center">
            <div className="bg-surface border border-border rounded-2xl px-5 py-4">
              <p className="text-xs text-muted uppercase tracking-wider font-medium">Luas Wilayah</p>
              <p className="text-lg font-bold text-primary mt-1">{village.area}</p>
            </div>
            <div className="bg-surface border border-border rounded-2xl px-5 py-4">
              <p className="text-xs text-muted uppercase tracking-wider font-medium">Jumlah Penduduk</p>
              <p className="text-lg font-bold text-primary mt-1">{village.population.toLocaleString("id-ID")} jiwa</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
