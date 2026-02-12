"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
  id: string
}

export default function SectionWrapper({ children, id }: Props) {
  return (
    <section
      id={id}
      className="relative min-h-screen px-10 py-24 flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="
          w-full max-w-5xl
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          rounded-3xl
          p-12
          shadow-[0_0_40px_rgba(255,255,255,0.03)]
        "
      >
        {children}
      </motion.div>
    </section>
  )
}
