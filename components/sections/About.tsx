"use client"

import SectionWrapper from "@/components/SectionWrapper"
import { motion, useReducedMotion } from "framer-motion"
import { Variants } from "framer-motion"

export default function About() {
  const prefersReducedMotion = useReducedMotion()

  const rightNowVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const statusItems = [
    { icon: "🟢", label: "Building", value: "AY Systems AutoML Pipeline" },
    { icon: "🟡", label: "Exploring", value: "LLM reasoning, RAG pipelines, MLOps" },
    { icon: "🔵", label: "Reading", value: '"Designing ML Systems" — Chip Huyen' },
    { icon: "🟣", label: "Open to", value: "AI/ML Engineering internships (2026)" },
    { icon: "⚪", label: "Based in", value: "Mathura, India" },
  ]

  return (
    <SectionWrapper id="about" plain noPadding>
      <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* LEFT COLUMN — BIO */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-tight">
            Who I Am.
          </h2>
          <div className="h-1.5 w-20 bg-cyan-500 rounded-full" />
          
          <div className="space-y-6 text-gray-400 text-base md:text-lg leading-relaxed font-medium">
            <p>
              B.Tech Computer Science student at GLA University. Engineer systems at the intersection of code and intelligence.
            </p>
            <p>
              I build production-quality ML pipelines — data processing, feature engineering, model training, evaluation, export. Measurable results. Clean implementation. Shipping.
            </p>
            <p>
              Worked across AutoML tooling, fraud detection systems, and real-time computer vision. I care about architectures that scale, metrics that matter, and code that other people can run.
            </p>
          </div>
        </motion.div>

        {/* RIGHT COLUMN — RIGHT NOW STATUS CARD */}
        <motion.div
          variants={rightNowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative group"
        >
          {/* Animated gradient border */}
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : {
                    backgroundPosition: ["0% center", "100% center", "0% center"],
                  }
            }
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 opacity-30 blur"
            style={{ backgroundSize: "200% 200%" }}
          />

          <div className="relative bg-black/40 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/10 space-y-6">
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Right Now</h3>

            <div className="space-y-4 divide-y divide-white/10">
              {statusItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="py-4 first:pt-0 last:pb-0 space-y-1"
                >
                  <div className="flex items-center gap-2 text-sm md:text-base font-semibold text-white/80">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <p className="text-sm md:text-base text-gray-400 pl-6">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
