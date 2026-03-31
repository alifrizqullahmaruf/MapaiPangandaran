"use client"

import Link from "next/link"
import { motion } from "motion/react"

const floatingShapes = [
  { size: 120, x: "8%", y: "20%", delay: 0, duration: 8 },
  { size: 60, x: "85%", y: "15%", delay: 1.5, duration: 10 },
  { size: 80, x: "75%", y: "65%", delay: 0.8, duration: 9 },
  { size: 40, x: "20%", y: "70%", delay: 2, duration: 7 },
  { size: 50, x: "50%", y: "85%", delay: 0.3, duration: 11 },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Cover.jpeg')" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/40 to-black/30" />

      {/* Floating organic shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
          animate={{
            y: [-12, 12, -12],
            x: [-6, 6, -6],
            scale: [1, 1.08, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.p
          className="text-white/70 font-medium text-xs md:text-sm tracking-[0.3em] uppercase mb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          KKN-PPM UGM · Kecamatan Cijulang · Pangandaran
        </motion.p>

        <motion.h1
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-none mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Mapai Pangandaran
        </motion.h1>

        <motion.div
          className="w-16 h-0.5 bg-white/30 mx-auto mb-7"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-white/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10"
        >
          Website resmi Tim KKN Mapai Pangandaran — memperkenalkan tim, desa pengabdian,
          program kerja, dan kisah-kisah bermakna dari Desa Kertayasa dan Desa Batukaras.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#proker"
            className="rounded-full bg-white text-primary font-semibold px-8 py-3 text-sm hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200"
          >
            Jelajahi Proker
          </Link>
          <Link
            href="/tim"
            className="rounded-full border border-white/40 text-white font-medium px-8 py-3 text-sm hover:bg-white/10 transition-all duration-200"
          >
            Kenali Tim Kami
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        {/* Animated pill */}
        <div className="w-5 h-8 rounded-full border border-white/30 flex justify-center pt-1.5">
          <motion.div
            className="w-1 h-1.5 rounded-full bg-white/60"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  )
}
