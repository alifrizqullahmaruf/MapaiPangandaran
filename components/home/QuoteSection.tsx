"use client"

import Image from "next/image"
import { motion } from "motion/react"

export default function QuoteSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-secondary to-primary overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Coordinator photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-80 md:w-72 md:h-96">
              <Image
                src="/Mohamad-Rachmadian-Narotama.webp"
                alt="Alif Rizqullah Maruf — Kormanit Mapai Pangandaran"
                fill
                className="object-cover rounded-3xl shadow-2xl"
                sizes="300px"
              />
              {/* Name badge */}
              {/* <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-max bg-primary/90 backdrop-blur text-white rounded-2xl px-6 py-3 text-center shadow-lg border border-white/20">
                <p className="font-semibold text-sm">Mohamad Rachmadian Narotama</p>
                <p className="text-white/70 text-xs">DPL Mapai Pangandaran 2025</p>
              </div> */}
            </div>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <span className="text-8xl font-heading text-white/20 leading-none block -mb-6">&ldquo;</span>
            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-white/90 italic pl-2">
              Mengabdi bukan sekadar tugas akademis — ini adalah kesempatan untuk benar-benar hadir bagi masyarakat, belajar dari kearifan lokal, dan meninggalkan sesuatu yang bermakna jauh setelah kami pergi.
            </blockquote>
            <span className="text-8xl font-heading text-white/20 leading-none block text-right mt-2">&rdquo;</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
