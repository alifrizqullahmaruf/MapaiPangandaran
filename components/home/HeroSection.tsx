"use client"

import Link from "next/link"
import { motion } from "motion/react"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://picsum.photos/seed/mapai-hero/1920/1080')" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-black/20" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-white font-medium text-sm md:text-base tracking-widest uppercase mb-4">
            KKN-PPM UGM · Kecamatan Cijulang · Pangandaran
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-none mb-8 drop-shadow-lg">
            Mapai Pangandaran
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-white/85 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Website resmi Tim KKN Mapai Pangandaran — memperkenalkan tim, desa pengabdian,
          program kerja, dan kisah-kisah bermakna dari Desa Kertayasa dan Desa Batukaras.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#proker"
            className="rounded-full bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 text-sm transition-colors shadow-lg"
          >
            Jelajahi Proker
          </Link>
          
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  )
}
