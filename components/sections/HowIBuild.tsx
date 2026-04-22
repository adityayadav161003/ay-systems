"use client"

import { motion, Variants } from "framer-motion"
import SectionWrapper from "@/components/SectionWrapper"

export default function HowIBuild() {
  const philosophies = [
    {
      title: "Systems, Not Scripts",
      description: "Every project I build has a defined pipeline, config-driven stages, and a clear evaluation harness. Not notebooks. Not one-offs. Architecture.",
      color: "from-cyan-500/20",
      borderColor: "border-cyan-500/30",
      accentColor: "bg-cyan-500/20",
    },
    {
      title: "Metrics Or It Didn't Happen",
      description: "Claims without numbers are noise. Every model I ship has a baseline comparison, performance benchmarks, and measurable improvements tracked end-to-end.",
      color: "from-amber-500/20",
      borderColor: "border-amber-500/30",
      accentColor: "bg-amber-500/20",
    },
    {
      title: "Ship. Measure. Iterate.",
      description: "A working v1 deployed beats a perfect v0 in a notebook. Real systems teach you what matters. I ship early, measure precisely, and iterate on real data.",
      color: "from-violet-500/20",
      borderColor: "border-violet-500/30",
      accentColor: "bg-violet-500/20",
    },
  ]

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 * i,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  return (
    <SectionWrapper id="how-i-build" plain noPadding>
      <div className="space-y-12 md:space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-4"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-tight">
            How I Build.
          </h2>
          <div className="h-1.5 w-20 bg-cyan-500 rounded-full" />
        </motion.div>

        {/* Philosophy Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {philosophies.map((philosophy, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="group relative"
            >
              {/* Subtle gradient background */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${philosophy.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur`}
              />

              <div
                className={`relative bg-white/[0.03] backdrop-blur-xl border ${philosophy.borderColor} rounded-2xl p-6 md:p-8 space-y-4 transition-all duration-500 group-hover:bg-white/[0.08] group-hover:border-white/20 group-hover:shadow-lg group-hover:-translate-y-1`}
              >
                {/* Top accent border */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${philosophy.accentColor} rounded-t-2xl`}
                />

                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight pt-2">
                  {philosophy.title}
                </h3>

                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                  {philosophy.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
