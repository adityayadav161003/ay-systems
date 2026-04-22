"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import LabDashboard from "@/components/lab/LabDashboard"

export default function LabPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white px-4 md:px-8 lg:px-12 pt-[120px] md:pt-[160px] lg:pt-[180px] pb-16 overflow-x-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-black -z-50" />
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-500/5 to-transparent blur-[120px] pointer-events-none -z-40" />

      <div className="max-w-[1240px] mx-auto space-y-16">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        {/* Dashboard Grid */}
        <LabDashboard />
      </div>
    </main>
  )
}
