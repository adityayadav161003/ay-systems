import { Inter } from "next/font/google"
import "./globals.css"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import GalaxyBackground from "@/components/GalaxyBackground"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata = {
  title: "Aditya Yadav | AI/ML Engineer | Generative AI Developer",
  description: "AI/ML Engineer specializing in Generative AI, Retrieval-Augmented Generation (RAG), NLP, Computer Vision, and intelligent document analysis systems.",
  keywords: "AI Engineer, Machine Learning, Generative AI, RAG, LangChain, LLM, NLP, Computer Vision, FAISS, Python, Artificial Intelligence, AI Developer",
  openGraph: {
    title: "Aditya Yadav | AI/ML Engineer | Generative AI Developer",
    description: "AI/ML Engineer specializing in Generative AI, Retrieval-Augmented Generation (RAG), NLP, Computer Vision, and intelligent document analysis systems.",
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
        className={`${inter.variable} font-sans bg-black text-white antialiased`}
      >
        <Navbar />
        <GalaxyBackground />

        <main className="min-h-screen">
          {children}
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
