"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import Hero from '@/components/Hero'
import About from '@/components/sections/About'
import HowIBuild from '@/components/sections/HowIBuild'
import Projects from '@/components/sections/Projects'
import WhatIBuild from '@/components/sections/WhatIBuild'

import Skills from '@/components/sections/Skills'
import Metrics from '@/components/sections/Metrics'
import Timeline from '@/components/sections/Timeline'
import Blog from '@/components/sections/Blog'
import Contact from '@/components/sections/Contact'

export default function Home() {
  // Scroll to top on page load/reload
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <main className="relative text-white overflow-hidden">
        <Hero />
        <About />
        <HowIBuild />
        <Metrics />
        <WhatIBuild />
        <Timeline />
        <Projects />
        <Skills />

        <Blog />
        <Contact />
        
        {/* LARGE BOTTOM BRANDING TEXT — PREMIUM */}
        <section className="relative py-32 md:py-48 lg:py-56 flex justify-center items-center overflow-hidden pointer-events-none select-none">
          <motion.div 
            initial={{ opacity: 0, y: 80, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-200px" }}
            className="relative z-10 text-center"
          >
            <h2 className="text-[clamp(80px,20vw,240px)] font-black tracking-[-0.02em] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/8 via-white/5 to-transparent">
              ADITYA YADAV
            </h2>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20" />
        </section>
      </main>
    </>
  )
}
