"use client"

import Image from "next/image"
import { motion, Variants } from "framer-motion"
import { Download, Github, Linkedin, Mail, MapPin } from "lucide-react"

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center px-4 md:px-8 lg:px-24 overflow-hidden pt-20 md:pt-0">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center w-full max-w-[1440px] mx-auto"
      >
        {/* LEFT SIDE — ICONIC IDENTITY */}
        <div className="space-y-6 md:space-y-10 relative z-10 order-2 lg:order-1 text-center lg:text-left">
          <div className="space-y-4">
            <motion.h2 variants={itemVariants} className="text-lg md:text-xl lg:text-2xl font-medium text-gray-400 tracking-tight">
              Greetings, I’m
            </motion.h2>
            <motion.div variants={itemVariants} className="leading-[0.85] tracking-tighter">
              <h1 className="text-[clamp(60px,12vw,120px)] font-black bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                ADITYA
              </h1>
              <h1 className="text-[clamp(60px,12vw,120px)] font-black bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                YADAV
              </h1>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-2 text-gray-500 mt-2">
              <MapPin size={16} />
              <span className="text-sm font-medium tracking-wide">Mathura, Uttar Pradesh, India</span>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/90 leading-tight max-w-2xl mx-auto lg:mx-0">
              Aspiring Machine Learning Engineer <br className="hidden md:block" />
              <span className="text-blue-400 italic font-medium">& Data Analyst</span>
            </h3>
            <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Building intelligent systems with ML, computer vision, and data-driven applications. 
              Focused on creating scalable architectures and automated workflows.
            </p>
          </motion.div>

          {/* ACTION BUTTONS */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 pt-4">
            <a 
              href="/resume.pdf" 
              download
              className="group relative flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white text-black text-sm md:text-base font-bold rounded-full transition-all duration-500 hover:pr-10 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Download size={18} />
                Download Resume
              </span>
              <div className="absolute right-4 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                <Download size={18} />
              </div>
            </a>
            
            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com/adityayadav161003", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/aditya-yadav-570846289", label: "LinkedIn" },
                { icon: Mail, href: "mailto:adity6946@gmail.com", label: "Email" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  className="p-3 md:p-4 border border-white/10 bg-white/[0.03] rounded-full text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="text-[10px] text-gray-600 tracking-[0.3em] uppercase pt-8 md:pt-12 animate-pulse font-bold"
          >
            Scroll to explore ↓
          </motion.p>
        </div>

        {/* RIGHT SIDE — CIRCULAR AVATAR */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="flex justify-center lg:justify-end order-1 lg:order-2"
        >
          <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] lg:w-[460px] lg:h-[460px] rounded-full p-2 border border-white/10 bg-white/[0.02] shadow-[0_0_100px_rgba(255,255,255,0.03)] animate-float group transition-transform duration-700">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/5">
              <Image
                src="/meta-avatar.png"
                alt="Aditya Yadav"
                fill
                priority
                className="object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-1000"
              />
            </div>
            
            {/* Floating badges/elements could go here if needed for more premium feel */}
            <div className="absolute -top-4 -right-4 p-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl group-hover:-translate-y-2 transition-transform duration-500 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-white tracking-widest uppercase">Available for roles</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
