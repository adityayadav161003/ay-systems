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

  // Individual letter animation for name
  const nameLetters = "ADITYA YADAV".split("")
  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1], // spring easing
      },
    }),
  }

  // Typewriter effect for tagline
  const taglineText = "I build things that think."
  const taglineLetters = taglineText.split("")
  const taglineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: 0.8 + i * 0.045,
        duration: 0.1,
      },
    }),
  }

  // Role pills animation
  const pillVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: 1.8 + i * 0.2,
        duration: 0.4,
      },
    }),
  }

  // Status badge pulse
  const badgePulseVariants: Variants = {
    animate: prefersReducedMotion
      ? {}
      : {
          scale: [1, 1.02, 1],
          boxShadow: [
            "0 0 20px rgba(34, 211, 238, 0)",
            "0 0 30px rgba(34, 211, 238, 0.5)",
            "0 0 20px rgba(34, 211, 238, 0)",
          ],
          transition: {
            duration: 3,
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
          y: [0, 8, 0],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        },
      }

  return (
    <section className="relative min-h-screen flex items-center px-4 md:px-8 lg:px-24 overflow-hidden pt-[120px] md:pt-[160px] lg:pt-[180px]">
      {/* Animated background grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        animate={prefersReducedMotion ? {} : { y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center w-full max-w-[1240px] mx-auto relative z-10"
      >
        {/* LEFT SIDE — ICONIC IDENTITY */}
        <div className="space-y-6 md:space-y-10 relative z-10 order-2 lg:order-1 text-center lg:text-left">
          <div className="space-y-4">
            <motion.h2 variants={itemVariants} className="text-lg md:text-xl lg:text-2xl font-medium text-gray-400 tracking-tight">
              Hi, I&apos;m
            </motion.h2>
            {/* Animated name with individual letters */}
            <div className="leading-[0.85] tracking-tighter">
              <h1 className="text-[clamp(60px,12vw,120px)] font-black bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                {nameLetters.map((letter, i) => (
                  <motion.span key={i} custom={i} variants={letterVariants} initial="hidden" animate="visible">
                    {letter}
                  </motion.span>
                ))}
              </h1>
            </div>
            <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-2 text-gray-500 mt-2">
              <MapPin size={16} />
              <span className="text-sm font-medium tracking-wide">Mathura, Uttar Pradesh, India</span>
            </motion.div>
          </div>

          {/* Typewriter tagline and role pills */}
          <motion.div className="space-y-4 md:space-y-6">
            {/* Typewriter tagline */}
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/90 leading-tight max-w-2xl mx-auto lg:mx-0">
              {taglineLetters.map((letter, i) => (
                <motion.span key={i} custom={i} variants={taglineVariants} initial="hidden" animate="visible">
                  {letter}
                </motion.span>
              ))}
              <motion.span
                animate={prefersReducedMotion ? {} : { opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.2 }}
                className="text-cyan-400"
              >
                {"|"}
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
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/20 text-xs md:text-sm font-medium text-white/80"
                >
                  {role}
                </motion.div>
              ))}
            </div>

            {/* Status badge with pulse */}
            <motion.div
              variants={badgePulseVariants}
              animate={prefersReducedMotion ? "initial" : "animate"}
              className="inline-flex items-center justify-center lg:justify-start"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Open to AI/ML Internships — 2026
              </div>
            </motion.div>

            <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              I engineer systems at the intersection of code and intelligence. Built to process, think, and ship. AutoML pipelines. Data architectures. Real outputs.
            </p>
          </motion.div>

          {/* ACTION BUTTONS */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 pt-4">
            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white text-black text-sm md:text-base font-bold rounded-full transition-all duration-500 hover:pr-10 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Resume
                <ArrowRight size={18} />
              </span>
              <div className="absolute right-4 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                <ArrowRight size={18} />
              </div>
            </a>
            
            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com/adityayadav161003", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/aditya-yadav-570846289", label: "LinkedIn" },
                { icon: Mail, href: "mailto:adity6946@gmail.com", label: "Email" },
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                  className="p-3 md:p-4 border border-white/10 bg-white/[0.03] rounded-full text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Animated scroll arrow */}
          <motion.div
            variants={arrowVariants}
            animate={prefersReducedMotion ? "initial" : "animate"}
            className="text-[10px] text-gray-600 tracking-[0.3em] uppercase pt-8 md:pt-12 font-bold flex items-center justify-center lg:justify-start"
          >
            {"Scroll to explore ↓"}
          </motion.div>
        </div>

        {/* RIGHT SIDE — CIRCULAR AVATAR */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="flex justify-center lg:justify-end order-1 lg:order-2"
        >
          <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] lg:w-[460px] lg:h-[460px] rounded-full p-2 border border-white/10 bg-white/[0.02] shadow-[0_0_100px_rgba(255,255,255,0.03)] animate-float group transition-transform duration-700">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/5">
              <Image
                src="/meta-avatar.png"
                alt="Aditya Yadav"
                fill
                sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 400px, 460px"
                priority
                className="object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-1000"
              />
            </div>
            
            {/* Status badge */}
            <motion.div
              className="absolute -top-4 -right-4 p-4 bg-black/80 backdrop-blur-xl border border-cyan-400/30 rounded-2xl shadow-2xl group-hover:-translate-y-2 transition-transform duration-500 hidden md:block"
              animate={prefersReducedMotion ? {} : { scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-bold text-cyan-300 tracking-widest uppercase">AI/ML Internships</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
