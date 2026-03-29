import Image from "next/image"
import { Village } from "@/app/data/villages"

interface VillageHeroProps {
  village: Village
}

export default function VillageHero({ village }: VillageHeroProps) {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="font-heading text-5xl md:text-7xl">
            <span
              style={{
                backgroundImage: "linear-gradient(135deg, #ED941D, #F7D149)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Desa{" "}
            </span>
            <span
              style={{
                backgroundImage: "linear-gradient(135deg, #133F63, #1a5280)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {village.name}
            </span>
          </h1>
          <p className="text-muted mt-3 text-base md:text-lg max-w-xl mx-auto">{village.tagline}</p>
        </div>

        {/* 3-photo grid: side | center (wider) | side */}
        <div className="grid grid-cols-4 gap-3 h-64 md:h-80">
          <div className="col-span-1 relative rounded-2xl overflow-hidden">
            <Image
              src={village.photos[0]}
              alt={`${village.name} foto 1`}
              fill
              className="object-cover"
              sizes="25vw"
            />
          </div>
          <div className="col-span-2 relative rounded-2xl overflow-hidden">
            <Image
              src={village.photos[1]}
              alt={`${village.name} foto 2`}
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="col-span-1 relative rounded-2xl overflow-hidden">
            <Image
              src={village.photos[2]}
              alt={`${village.name} foto 3`}
              fill
              className="object-cover"
              sizes="25vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
