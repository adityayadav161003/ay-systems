"use client"

import { motion } from "framer-motion"
import Hero from '@/components/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import WhatIBuild from '@/components/sections/WhatIBuild'
import InteractiveLabSection from '@/components/sections/InteractiveLab'
import Skills from '@/components/sections/Skills'
import Metrics from '@/components/sections/Metrics'
import Timeline from '@/components/sections/Timeline'
import Blog from '@/components/sections/Blog'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <main className="relative text-white overflow-hidden">
        <Hero />
        <About />
        <Metrics />
        <WhatIBuild />
        <Timeline />
        <Projects />
        <Skills />
        <InteractiveLabSection />
        <Blog />
        <Contact />
        
        {/* LARGE BOTTOM BRANDING TEXT */}
        <section className="relative py-24 md:py-40 flex justify-center items-center overflow-hidden pointer-events-none select-none">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-[18vw] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent">
              ADITYA YADAV
            </h2>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20" />
        </section>
      </main>
    </>
  )
}
