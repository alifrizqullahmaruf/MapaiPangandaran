import Image from "next/image"
import Link from "next/link"
import { Cluster } from "@/app/data/clusters"

interface ClusterCardProps {
  cluster: Cluster
}

export default function ClusterCard({ cluster }: ClusterCardProps) {
  return (
    <Link
      href={`/tim?kluster=${cluster.id}`}
      className="group relative rounded-2xl overflow-hidden aspect-[3/4] block"
    >
      <Image
        src={cluster.image}
        alt={cluster.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="border-t border-white/30 pt-3">
          <p className="text-white text-xs tracking-widest font-semibold uppercase opacity-70 mb-1">Klaster</p>
          <h3 className="text-white text-lg font-bold uppercase tracking-wide leading-tight">
            {cluster.name}
          </h3>
        </div>
      </div>
    </Link>
  )
}
