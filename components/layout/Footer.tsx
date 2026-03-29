import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile: stacked centered | Desktop: row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3 max-w-xs">
            <Image
              src="/Logo-panjang.png"
              alt="Mapai Pangandaran"
              width={150}
              height={50}
              className="object-contain"
            />
            <p className="text-white/70 text-xs text-center md:text-left">
              Tim KKN UGM 2025 · Desa Kertayasa &amp; Batukaras, Cijulang, Pangandaran.
            </p>
          </div>

          {/* Links — horizontal on mobile, vertical on desktop */}
          <nav className="flex flex-row md:flex-col flex-wrap justify-center gap-x-4 gap-y-2">
            <Link href="/" className="text-white/70 hover:text-white text-sm transition-colors">Beranda</Link>
            <Link href="/desa/kertayasa" className="text-white/70 hover:text-white text-sm transition-colors">Kertayasa</Link>
            <Link href="/desa/batukaras" className="text-white/70 hover:text-white text-sm transition-colors">Batukaras</Link>
            <Link href="/tim" className="text-white/70 hover:text-white text-sm transition-colors">Tim Kami</Link>
          </nav>
        </div>

        <div className="border-t border-white/20 mt-6 pt-4 text-center">
          <p className="text-white/50 text-xs">© 2025 Mapai Pangandaran · KKN UGM 2025</p>
        </div>
      </div>
    </footer>
  )
}
