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
  const sectionPaddingY = fullHeight ? "py-20 md:py-32" : "py-16 md:py-24"
  const panelShell = plain
    ? "bg-transparent border-none backdrop-blur-none shadow-none"
    : "bg-white/[0.02] backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.02)]"
  const panelPadding = noPadding ? "p-0" : "p-6 md:p-16 lg:p-24"

  return (
    <section
      id={id}
      className={`relative ${sectionMinHeight} px-4 md:px-8 lg:px-12 ${sectionPaddingY} flex ${sectionAlign} justify-center overflow-hidden ${className}`}
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
        className={[
          "w-full max-w-[1240px]",
          "rounded-[2.5rem] md:rounded-[4rem]",
          panelShell,
          panelPadding,
          "relative z-10",
        ].join(" ")}
      >
        {children}
      </motion.div>
      
      {/* Subtle background glow for each section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full max-h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10 opacity-30" />
    </section>
  )
}
