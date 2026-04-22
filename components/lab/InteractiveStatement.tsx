"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const STATEMENTS = [
  "End-to-end ML pipelines with measurable outcomes.",
  "Computer vision systems that run at 20+ FPS.",
  "AutoML workflows that eliminate repetitive setup.",
  "Generative AI tooling for real production use cases.",
  "Architectures that other engineers can actually run.",
]

const TAGS = ["scikit-learn", "OpenCV", "Python", "LLMs", "Pandas"]

export default function InteractiveStatement() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % STATEMENTS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="bg-gradient-to-b from-[#1a1a2e] to-[#111111] border border-white/10 rounded-2xl p-7 space-y-8 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Main Statement */}
      <div className="space-y-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-black tracking-tight text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          I build things that think.
        </motion.h2>

        {/* Animated Underline */}
        <motion.div
          className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ maxWidth: "200px", originX: 0.5 }}
        />

        {/* Rotating Statement */}
        <div className="h-12 flex items-center justify-center">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-white/70 text-base md:text-lg font-medium"
          >
            {STATEMENTS[currentIndex]}
          </motion.p>
        </div>
      </div>

      {/* Tech Tags */}
      <motion.div
        className="flex flex-wrap justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, staggerChildren: 0.1, delayChildren: 0.3 }}
      >
        {TAGS.map((tag, i) => (
          <motion.div
            key={tag}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="px-3 py-1.5 rounded-full border border-white/20 text-white/70 text-xs font-medium bg-white/5 hover:bg-white/10 hover:border-white/40 hover:text-white transition-all duration-300"
          >
            {tag}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
