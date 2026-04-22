import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import GalaxyBackground from "@/components/GalaxyBackground"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Aditya Yadav — I Build Things That Think",
  description: "AI engineer, systems architect, and AutoML builder. Engineering intelligent systems at the intersection of code and intelligence. Based in Mathura, India. Open to AI/ML internships 2026.",
  keywords: "AI engineer, machine learning, systems architect, AutoML, data analyst, Python, deep learning, GLA University",
  openGraph: {
    title: "Aditya Yadav — I Build Things That Think",
    description: "Engineering intelligent systems — pipelines, models, metrics, and real outputs.",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased`}
      >
        <Navbar />
        <GalaxyBackground />

        <main className="min-h-screen">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
