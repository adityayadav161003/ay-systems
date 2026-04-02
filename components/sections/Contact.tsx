"use client"

import SectionWrapper from "@/components/SectionWrapper"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Phone, Send, MessageCircle } from "lucide-react"

export default function Contact() {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "adity6946@gmail.com",
      href: "mailto:adity6946@gmail.com",
      wrapClass: "p-4 md:p-5 rounded-[1.25rem] md:rounded-[1.5rem] bg-white/5 border border-white/10 group-hover/item:bg-blue-500/10 group-hover/item:border-blue-500/20 transition-all duration-500",
      iconClass: "text-gray-400 group-hover/item:text-blue-400 transition-colors",
      valueClass: "text-white text-base md:text-lg font-bold group-hover/item:text-blue-400 transition-colors",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8318570426",
      href: "tel:+918318570426",
      wrapClass: "p-4 md:p-5 rounded-[1.25rem] md:rounded-[1.5rem] bg-white/5 border border-white/10 group-hover/item:bg-emerald-500/10 group-hover/item:border-emerald-500/20 transition-all duration-500",
      iconClass: "text-gray-400 group-hover/item:text-emerald-400 transition-colors",
      valueClass: "text-white text-base md:text-lg font-bold group-hover/item:text-emerald-300 transition-colors",
    },
  ] as const

  return (
    <SectionWrapper id="contact" plain noPadding>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="max-w-[1240px] w-full mx-auto bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden group flex flex-col lg:flex-row"
      >
        
        {/* Background Glow */}
        <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[140px] group-hover:bg-blue-500/20 transition-all duration-1000 pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-[140px] group-hover:bg-purple-500/20 transition-all duration-1000 pointer-events-none" />

        {/* LEFT COLUMN: Main Text & Contact Info */}
        <div className="relative z-10 w-full lg:w-[55%] xl:w-[60%] p-8 md:p-14 lg:p-20 flex flex-col justify-between">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-blue-400 font-bold tracking-[0.2em] uppercase text-xs">
                <MessageCircle size={16} />
                <span>Get in Touch</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-tight">
                Let’s <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 italic">Build.</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg">
                Open to internships, collaborations, and ML/data opportunities. If you’re hiring or building, I’d love to talk.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
              {contactMethods.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex items-center gap-5 group/item"
                >
                  <div className={item.wrapClass}>
                    <item.icon size={24} className={item.iconClass} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black mb-1">{item.label}</p>
                    <p className={item.valueClass}>{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-12 sm:mt-16">
            {[
              { icon: Github, href: "https://github.com/adityayadav161003", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/aditya-yadav-570846289/", label: "LinkedIn" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-500 hover:scale-110"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Quick Action */}
        <div className="relative z-10 w-full lg:w-[45%] xl:w-[40%] bg-white/[0.03] border-t lg:border-t-0 lg:border-l border-white/10 p-8 md:p-14 lg:p-20 flex flex-col justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
          <div className="relative space-y-10">
            <div className="space-y-4">
              <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tight">Quick Intro</h3>
              <p className="text-gray-400 text-base lg:text-lg leading-relaxed">
                The fastest way to reach me is email. Include the role, timeline, and a short context — I’ll reply with next steps.
              </p>
            </div>
            
            <a 
              href="mailto:adity6946@gmail.com"
              className="flex items-center justify-center gap-3 w-full py-5 lg:py-6 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] group/btn relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Send size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                Email Me
              </span>
            </a>
            
            <div className="flex items-center gap-3 bg-white/5 w-fit px-4 py-2.5 rounded-full border border-white/5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <p className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-[0.1em] font-bold">
                Based in Mathura, India
              </p>
            </div>
          </div>
        </div>

      </motion.div>
    </SectionWrapper>
  )
}
