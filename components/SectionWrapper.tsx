"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
  id: string
  className?: string
  fullHeight?: boolean
  plain?: boolean
  noPadding?: boolean
}

export default function SectionWrapper({
  children,
  id,
  className = "",
  fullHeight = false,
  plain = false,
  noPadding = false,
}: Props) {
  const sectionMinHeight = fullHeight ? "min-h-screen" : "min-h-0"
  const sectionAlign = fullHeight ? "items-center" : "items-start"
  const sectionPaddingY = fullHeight ? "py-24 md:py-36 lg:py-40" : "py-16 md:py-28 lg:py-32"
  const panelShell = plain
    ? "bg-transparent border-none backdrop-blur-none shadow-none"
    : "bg-white/[0.025] backdrop-blur-2xl border border-white/12 shadow-[0_0_80px_rgba(255,255,255,0.03)] hover:border-white/16 transition-colors duration-500"
  const panelPadding = noPadding ? "p-0" : "p-6 sm:p-10 md:p-16 lg:p-24 xl:p-28"

  return (
    <section
      id={id}
      className={`relative ${sectionMinHeight} px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ${sectionPaddingY} flex ${sectionAlign} justify-center overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ 
          duration: 1, 
          ease: [0.16, 1, 0.3, 1], 
          delay: 0.05 
        }}
        viewport={{ once: true, margin: "-150px" }}
        className={[
          "w-full max-w-[1320px]",
          "rounded-2xl md:rounded-3xl lg:rounded-4xl",
          panelShell,
          panelPadding,
          "relative z-10",
        ].join(" ")}
      >
        {children}
      </motion.div>
      
      {/* Premium subtle background glow for each section */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full max-h-[500px] bg-blue-500/4 blur-3xl rounded-full pointer-events-none -z-10 opacity-40"
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  )
}
