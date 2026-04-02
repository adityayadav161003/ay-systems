"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"
import LabDashboard from "@/components/sections/InteractiveLab"

export default function LabPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white px-4 md:px-8 lg:px-12 pt-[120px] md:pt-[160px] lg:pt-[180px] pb-16 overflow-x-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-black -z-50" />
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-500/10 to-transparent blur-[120px] pointer-events-none -z-40" />

      <div className="max-w-[1240px] mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest w-fit group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 max-w-2xl"
          >
            <div className="flex items-center gap-3 text-[rgb(var(--ay-accent-rgb))] font-black tracking-[0.2em] uppercase text-xs">
              <Sparkles size={16} />
              <span>Micro Interactions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
              Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 italic">Lab.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              A dedicated playground for micro-interactions, state feedback, and tools — built with the same care as product UI.
            </p>
          </motion.div>
        </div>

        {/* Dashboard Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <LabDashboard />
        </motion.div>
      </div>
    </main>
  )
}
