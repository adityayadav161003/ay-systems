"use client"

import Image from "next/image"
import { motion, useReducedMotion, Variants } from "framer-motion"
import { Github, Linkedin, Mail, MapPin, ArrowRight } from "lucide-react"

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  // Premium name animation with tracking
  const nameVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
    },
  }

  // Typewriter effect for tagline
  const taglineText = "I build things that think."
  const taglineLetters = taglineText.split("")
  const taglineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: 0.9 + i * 0.035,
        duration: 0.08,
      },
    }),
  }

  // Role pills animation
  const pillVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1.6 + i * 0.15,
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
      },
    }),
  }

  // Status badge pulse
  const badgePulseVariants: Variants = {
    animate: prefersReducedMotion
      ? {}
      : {
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 20px rgba(34, 211, 238, 0)",
            "0 0 40px rgba(34, 211, 238, 0.6)",
            "0 0 20px rgba(34, 211, 238, 0)",
          ],
          transition: {
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        },
  }

  // Scroll arrow bounce
  const arrowVariants: Variants = prefersReducedMotion
    ? {}
    : {
        animate: {
          y: [0, 12, 0],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        },
      }

  return (
    <section className="relative min-h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 overflow-hidden pt-[140px] sm:pt-[160px] md:pt-[180px] lg:pt-[200px]">
      {/* Animated background grid - premium subtle */}
      <motion.div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        animate={prefersReducedMotion ? {} : { y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(circle, white 0.5px, transparent 0.5px)",
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      {/* Subtle accent glow */}
      <motion.div
        className="absolute top-1/4 -left-96 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"
        animate={prefersReducedMotion ? {} : { 
          x: [0, 30, 0],
          y: [0, -20, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center w-full max-w-[1320px] mx-auto relative z-10"
      >
        {/* LEFT SIDE — PREMIUM TEXT IDENTITY */}
        <div className="space-y-6 md:space-y-8 relative z-10 order-2 lg:order-1 text-center lg:text-left flex flex-col justify-center">
          <div className="space-y-3">
            <motion.h2 
              variants={itemVariants} 
              className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-400 tracking-[0.15em] uppercase"
            >
              Welcome
            </motion.h2>
            
            {/* Premium name with CSS tracking */}
            <motion.h1 
              variants={nameVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent leading-none tracking-[-0.02em]"
            >
              Aditya Yadav
            </motion.h1>
            
            <motion.div 
              variants={itemVariants} 
              className="flex items-center justify-center lg:justify-start gap-2 text-gray-500 pt-2"
            >
              <MapPin size={18} className="flex-shrink-0" />
              <span className="text-sm md:text-base font-medium tracking-wide">Mathura, Uttar Pradesh</span>
            </motion.div>
          </div>

          {/* Premium tagline and role pills */}
          <motion.div className="space-y-5 md:space-y-7">
            {/* Typewriter tagline */}
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white/95 leading-tight tracking-[-0.01em] max-w-3xl">
              {taglineLetters.map((letter, i) => (
                <motion.span key={i} custom={i} variants={taglineVariants} initial="hidden" animate="visible">
                  {letter}
                </motion.span>
              ))}
              <motion.span
                animate={prefersReducedMotion ? {} : { opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.4 }}
                className="text-cyan-400 ml-1"
              >
                |
              </motion.span>
            </div>

            {/* Role pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {["Engineer", "Builder", "Thinker"].map((role, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={pillVariants}
                  initial="hidden"
                  animate="visible"
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/15 backdrop-blur-sm text-xs md:text-sm font-semibold text-white/80 hover:bg-white/10 hover:border-white/25 hover:text-white transition-all duration-300"
                >
                  {role}
                </motion.div>
              ))}
            </div>

            {/* Status badge with premium pulse */}
            <motion.div
              variants={badgePulseVariants}
              animate={prefersReducedMotion ? "initial" : "animate"}
              className="inline-block"
            >
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-cyan-400/40 bg-cyan-400/8 backdrop-blur-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs md:text-sm font-bold text-cyan-300 tracking-[0.1em] uppercase">Open to Internships 2026</span>
              </div>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed tracking-[-0.005em]"
            >
              I engineer systems at the intersection of code and intelligence. Built to process, think, and ship. AutoML pipelines. Data architectures. Real outputs.
            </motion.p>
          </motion.div>

          {/* ACTION BUTTONS — Premium styling */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4 pt-2">
            <motion.a 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(34, 211, 238, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center gap-2 px-7 md:px-9 py-3.5 md:py-4 bg-white text-black text-sm md:text-base font-bold rounded-full transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Resume
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={18} />
                </motion.span>
              </span>
            </motion.a>
            
            <div className="flex gap-3">
              {[
                { icon: Github, href: "https://github.com/adityayadav161003", label: "GitHub", color: "hover:border-white/40 hover:bg-white/8" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/aditya-yadav-570846289", label: "LinkedIn", color: "hover:border-cyan-400/40 hover:bg-cyan-400/8" },
                { icon: Mail, href: "mailto:adity6946@gmail.com", label: "Email", color: "hover:border-white/40 hover:bg-white/8" },
              ].map((social, i) => (
                <motion.a 
                  key={i}
                  href={social.href} 
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 md:p-4 border border-white/15 bg-white/5 backdrop-blur-sm rounded-full text-white/70 transition-all duration-300 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 md:w-6 md:h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Animated scroll arrow — premium */}
          <motion.div
            variants={arrowVariants}
            animate={prefersReducedMotion ? "initial" : "animate"}
            className="text-[11px] text-gray-500 tracking-[0.25em] uppercase pt-8 md:pt-12 font-bold flex items-center justify-center lg:justify-start gap-2"
          >
            <span>Scroll to explore</span>
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ↓
            </motion.span>
          </motion.div>
        </div>

        {/* RIGHT SIDE — PREMIUM AVATAR */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.85, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="flex justify-center lg:justify-end order-1 lg:order-2"
        >
          <div className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[360px] md:h-[360px] lg:w-[420px] lg:h-[420px]">
            {/* Outer glow rings */}
            <motion.div 
              className="absolute inset-0 rounded-full border border-cyan-500/20"
              animate={prefersReducedMotion ? {} : { rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-4 rounded-full border border-white/10"
              animate={prefersReducedMotion ? {} : { rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Main avatar container */}
            <div className="absolute inset-0 group p-3 bg-white/[0.03] rounded-full border border-white/15 backdrop-blur-sm shadow-2xl">
              {/* Hover gradient overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-transparent to-blue-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
              
              {/* Image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/meta-avatar.png"
                  alt="Aditya Yadav — AI Engineer"
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, (max-width: 1024px) 360px, 420px"
                  priority
                  quality={95}
                  className="object-cover object-top scale-110 group-hover:scale-120 transition-transform duration-1000"
                />
              </div>
            </div>
            
            {/* Premium status badge */}
            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/70 backdrop-blur-xl border border-cyan-400/40 rounded-full shadow-2xl"
              animate={prefersReducedMotion ? {} : { scale: [1, 1.05, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-3 whitespace-nowrap">
                <motion.div 
                  className="w-2.5 h-2.5 rounded-full bg-cyan-400"
                  animate={prefersReducedMotion ? {} : { scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs md:text-sm font-bold text-cyan-300 tracking-[0.08em] uppercase">AI/ML Internships</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
