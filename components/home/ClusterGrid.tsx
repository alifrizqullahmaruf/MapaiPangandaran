"use client"

import { motion } from "motion/react"
import { Cluster } from "@/app/data/clusters"
import ClusterCard from "@/components/ui/ClusterCard"
import SectionTitle from "@/components/ui/SectionTitle"

interface ClusterGridProps {
  clusters: Cluster[]
}

export default function ClusterGrid({ clusters }: ClusterGridProps) {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <SectionTitle
            title="Profil Klaster"
            subtitle="Tim Mapai Pangandaran terdiri dari empat klaster keilmuan yang bersinergi dalam mengabdi."
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {clusters.map((cluster, i) => (
            <motion.div
              key={cluster.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <ClusterCard cluster={cluster} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
