"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { Village } from "@/app/data/villages"

interface VillageHeroProps {
  village: Village
}

export default function VillageHero({ village }: VillageHeroProps) {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
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
        </motion.div>

        {/* 3-photo grid */}
        <div className="grid grid-cols-4 gap-3 h-64 md:h-80">
          <motion.div
            className="col-span-1 relative rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <Image
              src={village.photos[0]}
              alt={`${village.name} foto 1`}
              fill
              className="object-cover"
              sizes="25vw"
            />
          </motion.div>
          <motion.div
            className="col-span-2 relative rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <Image
              src={village.photos[1]}
              alt={`${village.name} foto 2`}
              fill
              className="object-cover"
              sizes="50vw"
            />
          </motion.div>
          <motion.div
            className="col-span-1 relative rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <Image
              src={village.photos[2]}
              alt={`${village.name} foto 3`}
              fill
              className="object-cover"
              sizes="25vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
