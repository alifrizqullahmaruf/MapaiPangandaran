import type { Metadata } from "next";
import { Pacifico, Poppins } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({
  weight: "400", // single-weight font — must be string, not array
  subsets: ["latin"],
  variable: "--font-pacifico",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/Logo-icon.png",
  },
  title: "Mapai Pangandaran — KKN-PPM UGM",
  description:
    "Website resmi tim KKN Mapai Pangandaran di Desa Kertayasa dan Desa Batukaras, Kecamatan Cijulang, Kabupaten Pangandaran, Jawa Barat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${pacifico.variable} ${poppins.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-body bg-background text-text">
        {children}
      </body>
    </html>
  );
}
