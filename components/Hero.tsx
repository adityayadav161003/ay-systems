"use client"

import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-10">

      {/* Content Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full items-center">

        {/* LEFT SIDE — TEXT */}
        <div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold tracking-tight leading-none
                       bg-gradient-to-b from-white to-gray-400
                       bg-clip-text text-transparent"
          >
            ADITYA
            <br />
            YADAV
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-lg text-gray-400 tracking-wide"
          >
            Engineering v1.0 • Building Systems That Evolve
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-6 max-w-xl text-gray-500 leading-relaxed"
          >
            A disciplined engineering journey documenting growth, structure,
            and iteration. Focused on building scalable systems, thoughtful
            interfaces, and meaningful software.
          </motion.p>

          <div className="mt-10 text-sm text-gray-600 tracking-widest">
            SCROLL ↓
          </div>
        </div>

        {/* RIGHT SIDE — META SPHERE */}
        <div className="flex justify-center md:justify-end">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.05 }}
            className="w-64 h-64 md:w-80 md:h-80 rounded-full
                       bg-gradient-to-br from-gray-700 to-gray-900
                       border border-white/10
                       shadow-[0_0_60px_rgba(255,255,255,0.05)]
                       transition-transform duration-300"
          />

        </div>
      </div>
    </section>
  )
}
