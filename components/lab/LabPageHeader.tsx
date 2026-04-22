"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function LabPageHeader() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const path = svg.querySelector("path")
    if (!path) return

    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`

    const animation = path.animate(
      [{ strokeDashoffset: length }, { strokeDashoffset: 0 }],
      {
        duration: 800,
        easing: "ease-out",
        fill: "forwards",
      }
    )

    return () => animation.cancel()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6 text-center"
    >
      {/* Tag */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center justify-center gap-2"
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-cyan-400"
        />
        <span className="text-xs font-bold text-cyan-400 tracking-[0.3em] uppercase">Experiments</span>
      </motion.div>

      {/* Main Title */}
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
          Interactive{" "}
          <span className="relative inline-block">
            <svg
              ref={svgRef}
              viewBox="0 0 150 50"
              className="absolute -inset-2 w-full h-auto"
              style={{ overflow: "visible" }}
            >
              <path
                d="M 10 45 Q 50 5, 140 45"
                stroke="#22d3ee"
                strokeWidth="3"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span className="relative">Lab.</span>
          </span>
        </h1>
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
      >
        A playground for micro-interactions, ML tooling simulations, and systems thinking — built with the same care as production UI.
      </motion.p>

      {/* Stats Pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-3 pt-2"
      >
        {["7 Components", "All Interactive", "Built with Framer Motion"].map((stat, i) => (
          <motion.div
            key={stat}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/70 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            {stat}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
