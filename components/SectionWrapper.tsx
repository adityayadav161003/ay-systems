"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
  id: string
  className?: string
  innerClassName?: string
}

export default function SectionWrapper({ children, id, className = "", innerClassName = "" }: Props) {
  return (
    <section
      id={id}
      className={`relative min-h-screen px-4 md:px-8 lg:px-12 py-20 md:py-32 flex items-center justify-center overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ 
          duration: 1, 
          ease: [0.16, 1, 0.3, 1], 
          delay: 0.1 
        }}
        viewport={{ once: true, margin: "-100px" }}
        className={`
          w-full max-w-[1440px]
          bg-white/[0.02]
          backdrop-blur-2xl
          border border-white/10
          rounded-[2.5rem] md:rounded-[4rem]
          p-6 md:p-16 lg:p-24
          shadow-[0_0_80px_rgba(255,255,255,0.02)]
          relative z-10
          ${innerClassName}
        `}
      >
        {children}
      </motion.div>
      
      {/* Subtle background glow for each section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full max-h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10 opacity-30" />
    </section>
  )
}
