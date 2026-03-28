import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Image
              src="/Logo-panjang.png"
              alt="Mapai Pangandaran"
              width={180}
              height={60}
              className="object-contain brightness-0 invert"
            />
            <p className="text-white/70 text-sm text-center md:text-left max-w-xs">
              Tim KKN UGM 2025 yang mengabdi di Desa Kertayasa dan Desa Batukaras, Kecamatan Cijulang, Kabupaten Pangandaran, Jawa Barat.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="font-semibold text-white/90 text-sm uppercase tracking-wider">Halaman</h3>
            <ul className="flex flex-col gap-2">
              <li><Link href="/" className="text-white/70 hover:text-white text-sm transition-colors">Beranda</Link></li>
              <li><Link href="/desa/kertayasa" className="text-white/70 hover:text-white text-sm transition-colors">Desa Kertayasa</Link></li>
              <li><Link href="/desa/batukaras" className="text-white/70 hover:text-white text-sm transition-colors">Desa Batukaras</Link></li>
              <li><Link href="/tim" className="text-white/70 hover:text-white text-sm transition-colors">Tim Kami</Link></li>
            </ul>
          </div>

          {/* Location */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="font-semibold text-white/90 text-sm uppercase tracking-wider">Lokasi</h3>
            <p className="text-white/70 text-sm text-center md:text-left">
              Desa Kertayasa &amp; Desa Batukaras<br />
              Kecamatan Cijulang<br />
              Kabupaten Pangandaran<br />
              Jawa Barat
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-6 text-center">
          <p className="text-white/50 text-xs">
            © 2025 Mapai Pangandaran. KKN UGM 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
